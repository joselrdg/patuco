const inquirer = require("inquirer");
const readdirp = require("readdirp");
const chalk = require("chalk");
const fs = require("fs");

const baseCss = require("../../templates/styles/baseCss.js");
const pathBase = process.cwd();

const variablesUser = `${pathBase}/patuco/variables.js`;

const variables = require(fs.existsSync(`${pathBase}/patuco/variables.js`)
  ? variablesUser
  : "../../templates/styles/baseCss.js");

const variablesUsed = [];
let rootStr = "\n\n:root {\n";

function filewalker(dir, type, myFilter) {
  return new Promise((resolve) => {
    const data = [];
    readdirp(dir, {
      directoryFilter: ["!.git", "!*modules"],
      [myFilter ? "fileFilter" : "myFilter"]: myFilter,
      type: type,
      alwaysStat: true,
    })
      .on("data", (entry) => {
        const {
          path,
          stats: { size },
        } = entry;
        data.push({ path, size });
      })
      .on("warn", (error) => console.error("non-fatal error", error))
      .on("error", (error) => console.error("fatal error", error))
      .on("end", () => resolve(data));
  });
}

const queryParams = (type, choices = [], messageSave = false) => {
  const messageStr = messageSave
    ? "Selecciona el directorio donde se guardara el archivo css optimizado para tu proyecto: "
    : "Selecciona un directorio para analizarlo: ";
  const message = {
    direcctories: {
      name: "type",
      type: "list",
      message: messageStr,
      choices: [...choices.map((d) => d.path)],
    },
    typeFile: {
      name: "file",
      type: "input",
      message:
        "Escribe las extensiones de los archivos separadas por ','.\nSi no escribes nada se analizaran todos los archivos: ",
    },
    typeClass: {
      name: "type",
      type: "list",
      message: "Selecciona el directorio a analizar: ",
      choices: ["class", "className"],
    },
    upgrade: {
      name: "type",
      type: "list",
      message: "Actualizar el archivo .css en tu proyecto?: ",
      choices: ["Actualizar", "Cancelar"],
    },
    deleteSchema: {
      name: "type",
      type: "list",
      message: `Eliminar el archivo ${chalk.red.bold(
        "patucoSchema.css"
      )} de tu proyecto?\nEl archivo ${chalk.green.bold(
        "variables.js"
      )} se mantendra para futuras modificaciones: `,
      choices: ["Eliminar", "Continuar sin borrar"],
    },
  };
  const qs = [message[type]];
  return inquirer.prompt(qs);
};

// comprueba si hay variables en los estilos
const searchVariables = async (styleElement) => {
  for (const nameVariable in variables) {
    const regex = new RegExp(nameVariable, "g");
    if (regex.test(styleElement)) {
      console.log(`\nEncontrada la variable ${chalk.yellow(nameVariable)}`);
      variablesUsed.push(nameVariable);
      rootStr =
        rootStr + `  --${nameVariable}: "${variables[nameVariable]}";\n`;
    }
  }
};

const prepareStylesStr = async (classStyles) => {
  let stylesStr = "";
  for (let index = 0; index < classStyles.length; index++) {
    const styleElement = classStyles[index];
    await searchVariables(styleElement);
    stylesStr = stylesStr + `${styleElement};\n`;
  }
  return stylesStr;
};

const createQueryCss = (query) => {
  let str = "";
  if (query.hover) {
    str = ":hover";
  }
  //  else if (query.after) {
  //   str = "::after";
  // } else if (query.before) {
  //   str = "::before";
  // }
  return str;
};

const fonts = async () => {
  let fontsStr = "";
  variables.fonts.forEach((element) => {
    fontsStr = fontsStr + `${element};\n`;
  });
  return fontsStr;
};

// Crea el string completo para crear el archivo css
const prepareStr = async (savedClasses) => {
  let fileStr = "";
  for (const key in savedClasses) {
    if (key !== "root" && savedClasses[key].length > 0) {
      fileStr = fileStr + `\n\n/* ${key} */\n\n`;
      const classGroup = savedClasses[key];
      for (let index = 0; index < classGroup.length; index++) {
        const uniqueClass = classGroup[index];
        const target = uniqueClass.target ? ` ${uniqueClass.target}` : "";
        const queryCss = createQueryCss(uniqueClass);
        let stylesStr = "";
        if (uniqueClass.template) {
          // escribre los templates de css puro
          fileStr = fileStr + uniqueClass.template;
          // Prepara el string con las clases y comprueba si hay variables
        } else if (uniqueClass.items) {
          stylesStr = await prepareStylesStr(uniqueClass.items);
          fileStr =
            fileStr +
            `.${uniqueClass.name}${target}${queryCss} {
  ${stylesStr}}\n\n`;
        }
      }
    }
  }
  // Añade las fuentes al comienzo del string root
  rootStr = `${await fonts()}` + rootStr + "}\n";
  fileStr = rootStr + fileStr;
  return fileStr;
};

const updateSchema = async (savedClasses, path) => {
  const pathSchema = `${path}/patuco.css`;
  const fileStr = await prepareStr(savedClasses);
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, 0777);
  }
  try {
    fs.writeFileSync(pathSchema, fileStr, { mode: 0o777 });
  } catch (err) {
    console.error(err);
  } finally {
    console.log(`
    ${chalk.green.bold("------ CREADO CORRECTAMENTE ------")}\n
 Se ha creado el siguiente elemento\n
 - Archivo: ${chalk.blue.bold("patuco.css")}\n
 - Ruta: ${chalk.blue.bold(pathSchema)}\n
 ----------------------------------\n`);
  }
};

const analyzeRoute = async (path) => {
  const typeFile = await queryParams("typeFile");
  let filter = undefined;
  if (typeFile.file !== "") {
    filter = typeFile.file
      .replace(" ", "")
      .split(",")
      .map((item) => `*.${item}`);
  }
  const files = await filewalker(path.type, "files", filter);
  return files;
};

const readStyles = async (file, savedClasses, counterTotal, counterEnd) => {
  for (const key in baseCss) {
    const arr = baseCss[key];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name) {
        const regex = new RegExp(arr[i].name, "g");
        if (regex.test(file)) {
          counterTotal.push("");
          const someClass = savedClasses[key].some(
            (arrVal) => arr[i].name === arrVal.name
          );
          if (!someClass) {
            counterEnd.push("");
            savedClasses[key].push(arr[i]);
          }
        }
      }
    }
  }
};

const createFile = async (savedClasses, direcSavePath) => {
  const path = `${pathBase}/${direcSavePath}/patucoStyles`;
  const option = await queryParams("upgrade");
  switch (option.type) {
    case "Actualizar":
      await updateSchema(savedClasses, path);
      break;
    case "Cancelar":
      break;
    default:
      break;
  }
};

const openFiles = async (direcPath, filePath) => {
  const savedClasses = {};
  for (const key in baseCss) {
    if (key === "root") {
      savedClasses[key] = baseCss[key];
    } else if (key === "grid") {
      savedClasses[key] = baseCss[key];
    } else {
      savedClasses[key] = [];
    }
  }
  const counterTotal = [];
  const counterEnd = [];
  for (let index = 0; index < filePath.length; index++) {
    const file = fs.readFileSync(
      `${pathBase}/${direcPath}/${filePath[index].path}`,
      "utf-8"
    );
    if (/class=/g.test(file) || /className=/g.test(file)) {
      await readStyles(file, savedClasses, counterTotal, counterEnd, baseCss);
    }
  }
  console.log(`- Total clases encontradas: ${chalk.red.bold(
    counterTotal.length
  )}
- Total sin repetir: ${chalk.green.bold(counterEnd.length)}`);
  return savedClasses;
};

const deleteCssSchema = async () => {
  const path = `${pathBase}/patuco/style/patucoSchema.css`;
  if (fs.existsSync(path)) {
    console.log(
      `Existe el archivo ${pathBase}/patuco/style/${chalk.red.bold(
        "patucoSchema.css."
      )}`
    );
    const options = await queryParams("deleteSchema");
    if (options.type === "Eliminar") {
      fs.unlinkSync(path);
      console.log(chalk.green.bold("\nArchivo borrado"));
    }
  }
  console.log(
    `No olvides importar el nuevo archivo ${chalk.green.bold(
      "patucoStyles/patuco.css"
    )}\n`
  );
};

const createCSS = async () => {
  const upgrade = await queryParams("upgrade");
  if (upgrade.type === "Actualizar") {
    const direcctories = await filewalker(".", "directories");
    const direcPath = await queryParams("direcctories", direcctories);
    const filePath = await analyzeRoute(direcPath);
    const savedClasses = await openFiles(direcPath.type, filePath, baseCss);
    const direcSavePath = await queryParams("direcctories", direcctories, true);
    await createFile(savedClasses, direcSavePath.type);
    await deleteCssSchema();
    createCSS();
  } else {
    const configStyles = require("./index.js");
    configStyles.configStyles();
  }
};

module.exports = { createCSS };
