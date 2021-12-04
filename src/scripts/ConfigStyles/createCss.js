const inquirer = require("inquirer");
const readdirp = require("readdirp");
const chalk = require("chalk");
const fs = require("fs");

const baseCss = require("../../templates/styles/baseCss.js");
const userTemplatePath = require("../constants/patucoConfig.js").path
  .userTemplate;
const isUserTemplate = userTemplatePath ? userTemplatePath : "";
const mediaQueriesArr = require(fs.existsSync(
  `${userTemplatePath}/mediaQueries/mediaQueries.js`
)
  ? `${userTemplatePath}/mediaQueries/mediaQueries.js`
  : "../../templates/styles/mediaQueries.js");
const pathBase = process.cwd();

const variablesUser = `${pathBase}/patuco/variables.js`;

const variables = require(fs.existsSync(variablesUser)
  ? variablesUser
  : "../../templates/styles/variables.js");

const animations = require("../../templates/styles/animations.js");
const useAnimaPath = `${userTemplatePath}/animations/animations.js`;
const animationsUser = fs.existsSync(useAnimaPath) ? require(useAnimaPath) : [];
const animationsUsed = [];

const txt = require("./translations/createCss.js");

const variablesUsed = [];
let rootStr = "\n\n:root {\n";

// const mediaQueriesArr = allMediaQueries();
const querysUsed = [];
const groupQureryStr = [];

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
  const messageStr = messageSave ? txt.query.selectdir : txt.query.selctdirr;
  const message = {
    direcctories: {
      name: "type",
      type: "list",
      message: messageStr,
      choices: ["/", ...choices.map((d) => d.path)],
    },
    typeFile: {
      name: "file",
      type: "input",
      message: txt.query.iext,
    },
    // typeClass: {
    //   name: "type",
    //   type: "list",
    //   message: "Selecciona el directorio a analizar: ",
    //   choices: ["class", "className"],
    // },
    upgrade: {
      name: "type",
      type: "list",
      message: txt.query.iupdate,
      choices: [txt.c.update, txt.c.back],
    },
    deleteSchema: {
      name: "type",
      type: "list",
      message: `${txt.query.ideleteone} ${chalk.red.bold("patucoSchema.css")} ${
        txt.query.ideletetwo
      } ${chalk.green.bold("variables.js")} ${txt.query.ideletethree}`,
      choices: [txt.query.sdelete, txt.query.scontinue],
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
      console.log(`\n${txt.query.ivariable} ${chalk.green(nameVariable)}`);
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
    stylesStr = stylesStr + `  ${styleElement};\n`;
  }
  return stylesStr;
};

const fonts = async () => {
  let fontsStr = "";
  variables.fonts.forEach((element) => {
    fontsStr = fontsStr + `${element};\n`;
  });
  return fontsStr;
};

const prepareClassesQueryStr = async (query, classStr) => {
  mediaQueriesArr.forEach((element) => {
    if (element.name === query) {
      const isQuerySaved = querysUsed.findIndex((e) => e === query);
      if (isQuerySaved > -1) {
        groupQureryStr[isQuerySaved].str =
          groupQureryStr[isQuerySaved].str + classStr;
      } else {
        console.log(`\n${txt.query.imq} ${chalk.green(query)}`);
        querysUsed.push(element.name);
        groupQureryStr.push({
          name: element.name,
          str: `${element.str} {\n${classStr}`,
        });
      }
    }
  });
};

const createMediaQueriesStr = async () => {
  let mediaQueriesStr = "";
  groupQureryStr.forEach((element) => {
    mediaQueriesStr = mediaQueriesStr + `${element.str}}\n\n`;
  });
  return mediaQueriesStr;
};

const createPseudoElements = async (uniqueClass) => {
  const pseudoElements = uniqueClass.pseudoElement;
  let pseudoElementsStr = "";
  for (let index = 0; index < pseudoElements.length; index++) {
    const element = pseudoElements[index];
    let stylesStr = `.${uniqueClass.name}::${element.type} {\n`;
    for (let index = 0; index < element.items.length; index++) {
      const styleElement = element.items[index];
      stylesStr = stylesStr + `  ${styleElement};\n`;
    }
    stylesStr = stylesStr + "}\n\n";
    pseudoElementsStr = pseudoElementsStr + stylesStr;
  }

  return pseudoElementsStr;
};

const createAnimationsStr = async () => {
  let animationsStr = "";
  const animationsData = [...animations, ...animationsUser];
  for (let i = 0; i < animationsUsed.length; i++) {
    const animation = animationsUsed[i];
    const someAnima = animationsData.find((a) => animation === a.name);
    if (someAnima) {
      animationsStr += `${someAnima.template}\n\n`;
    }
  }
  return animationsStr;
};

// Crea el string completo para crear el archivo css
const prepareStr = async (savedClasses) => {
  let fileStr = "";
  let classesQueryStr = "";
  for (const key in savedClasses) {
    if (key !== "root" && savedClasses[key].length > 0) {
      fileStr = fileStr + `\n\n/* ${key} */\n\n`;
      const classGroup = savedClasses[key];
      for (let index = 0; index < classGroup.length; index++) {
        const uniqueClass = classGroup[index];
        const target = uniqueClass.target ? ` ${uniqueClass.target}` : "";
        const pseudoClass = uniqueClass.pseudoClass
          ? `:${uniqueClass.pseudoClass}`
          : "";
        const pseudoElementsStr = uniqueClass.pseudoElement
          ? await createPseudoElements(uniqueClass)
          : "";
        let stylesStr = "";
        if (uniqueClass.animation) {
          const someAnima = animationsUsed.some(
            (a) => uniqueClass.animation === a
          );
          if (!someAnima) {
            console.log(
              `\n${txt.query.animation} ${chalk.green(uniqueClass.animation)}`
            );
            animationsUsed.push(uniqueClass.animation);
          }
        }
        if (uniqueClass.template) {
          // escribre los templates de css puro
          fileStr = fileStr + uniqueClass.template;
          // Prepara el string con las clases y comprueba si hay variables
        } else if (uniqueClass.items) {
          stylesStr = await prepareStylesStr(uniqueClass.items);
          //$$ crear funcion para poner un . o # o nada segun el type que hay que añadir a las plantillas
          if (uniqueClass.query) {
            const classStr = `\n  .${uniqueClass.name}${target}${pseudoClass} {
${stylesStr}  }\n${pseudoElementsStr}`;
            await prepareClassesQueryStr(uniqueClass.query, classStr);
          } else {
            fileStr =
              fileStr +
              `.${uniqueClass.name}${target}${pseudoClass} {
${stylesStr}}\n\n`;
            // Añade los pseudoelementos con sus clases al arr del archivo ### mirar si tienen que elegir ir con mediaqueries
            fileStr = fileStr + pseudoElementsStr;
          }
        }
      }
    }
  }
  // Añade las fuentes al comienzo del string root
  rootStr = `${await fonts()}` + rootStr + "}\n" + classesQueryStr;
  const mediaQueryStr = await createMediaQueriesStr();
  const animationsStr = await createAnimationsStr();
  // Añade root, mediaqueries y el restor de clases usadas
  fileStr =
    rootStr +
    [baseCss.grid[0].template] +
    "\n\n/* Media Queries */\n\n" +
    mediaQueryStr +
    "\n\n/* Animations */\n\n" +
    animationsStr +
    fileStr;
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
    ${txt.c.createdOk}\n
${txt.c.created}\n
 - ${txt.c.file}: ${chalk.blue.bold("patuco.css")}\n
 - ${txt.c.path}: ${chalk.blue.bold(pathSchema)}\n
 ----------------------------------\n`);
  }
};

const analyzeRoute = async (route) => {
  const path = route.type === "/" ? pathBase : route.type;
  const typeFile = await queryParams("typeFile");
  let filter = undefined;
  if (typeFile.file !== "") {
    filter = typeFile.file
      .replace(" ", "")
      .split(",")
      .map((item) => `*.${item}`);
  }
  const files = await filewalker(path, "files", filter);
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
    case txt.c.update:
      await updateSchema(savedClasses, path);
      break;
    case txt.c.back:
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
      // } else if (key === "grid") {
      //   savedClasses.grid = [baseCss.grid[0].template];
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
  console.log(`- ${txt.query.total} ${chalk.red.bold(counterTotal.length)}
- ${txt.query.rest} ${chalk.green.bold(counterEnd.length)}`);
  return savedClasses;
};

const deleteCssSchema = async () => {
  const path = `${pathBase}/patuco/style/patucoSchema.css`;
  if (fs.existsSync(path)) {
    console.log(
      `${txt.query.exists} ${pathBase}/patuco/style/${chalk.red.bold(
        "patucoSchema.css."
      )}`
    );
    const options = await queryParams("deleteSchema");
    if (options.type === txt.query.sdelete) {
      fs.unlinkSync(path);
      console.log(chalk.green.bold(txt.query.deletedfile));
    }
  }
  console.log(
    `${txt.query.forget} ${chalk.green.bold("patucoStyles/patuco.css")}\n`
  );
};

const createCSS = async () => {
  const upgrade = await queryParams("upgrade");
  if (upgrade.type === txt.c.update) {
    const direcctories = await filewalker(".", "directories");
    const direcPath = await queryParams("direcctories", direcctories);
    const filePath = await analyzeRoute(direcPath);
    const savedClasses = await openFiles(direcPath.type, filePath, baseCss);
    const direcSavePath = await queryParams("direcctories", direcctories, true);
    await createFile(savedClasses, direcSavePath.type);
    // await deleteCssSchema();
    createCSS();
  } else {
    const configStyles = require("./index.js");
    configStyles.configStyles();
  }
};

module.exports = { createCSS };
