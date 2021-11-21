const inquirer = require("inquirer");
const readdirp = require("readdirp");
const chalk = require("chalk");
const fs = require("fs");
const pathBase = `${process.cwd()}/patuco/patucoSchema.css`;
const start = require("../index");
const patucoConfig = require("./constants/patucoConfig.js");

const back = chalk.bold.italic.magentaBright("Volver");

function filewalker(
  dir = "/home/jose/.nvm/versions/node/v16.2.0/lib/node_modules",
  dirFilter = ["!.git"],
  type = "files",
  filFilter = "patucoConfig.js"
) {
  if (dir === "") {
    dir = "/home/jose/.nvm/versions/node/v16.2.0/lib/node_modules";
  }
  return new Promise((resolve) => {
    const data = [];
    readdirp(dir, {
      directoryFilter: dirFilter,
      fileFilter: filFilter,
      type: type,
      alwaysStat: true,
    })
      .on("data", (entry) => {
        const {
          path,
          stats: { size },
        } = entry;
        data.push(`${dir}/${path}`);
      })
      //   .on("warn", (error) => console.error("non-fatal error"))
      .on("error", (error) => console.error("fatal error", error))
      .on("end", () => resolve(data));
  });
}

const queryParams = (type, choices = []) => {
  const message = {
    dat: {
      name: "type",
      type: "list",
      message:
        "Quieres actualizar el archivo patucoSchema.css en tu proyecto o el modulo patucostrap: ",
      choices: [
        `Actualizar en ${pathBase}`,
        "Actualizar el modulo patucostrap",
      ],
    },
    pathOk: {
      name: "type",
      type: "list",
      message: "Selecciona ruta: ",
      choices: choices,
    },
    typeClass: {
      name: "type",
      type: "list",
      message: "Selecciona para configurar: ",
      choices: [
        "Configurar path modulo patucostrap",
        "Configurar path de las plantillas del usuario",
        "Configurar idioma",
        back,
      ],
    },
    language: {
      name: "type",
      type: "list",
      message: "Selecciona idioma: ",
      choices: ["Ingles", "Español", back],
    },
    configPaths: {
      name: "type",
      type: "list",
      message: "Selecciona una opción: ",
      choices: [
        "Buscar directorio 'patucostrap' automaticamente",
        "Introducir el path manualmente",
        back,
      ],
    },
    path: {
      name: "type",
      type: "input",
      message:
        "Escribe el path a la carpeta node_modules global donde se encuentra el directorio 'patucostrap': ",
    },
    patucoPath: {
      name: "type",
      type: "input",
      message:
        "Escribe el path que creas más cercano a la carpeta node_modules global donde se encuentra el directorio 'patucostrap'.\nPuedes probar con '/home/tuNombre/.nvm/versions/node'.\nSi no introduces ningun valor se buscara desde '/home': ",
    },
    dirFilter: {
      name: "type",
      type: "input",
      message:
        "Introduce directorios con un '!' o '!*' delante, ejemplo '!.git', !*modules' en los que NO quieres buscar.\nO el de los direcctorios en los que SI buscar ejemplo '/tuNombre'.\nSeparados por comas!: ",
    },
    templatesPath: {
      name: "type",
      type: "input",
      message:
        "Escribe el path al directorio donde quieres guardar tus plantillas: ",
    },
  };
  const qs = [message[type]];
  return inquirer.prompt(qs);
};

const writeArr = async (data) => {
  if (
    !fs.existsSync(data.patucoConfigOk) ||
    !fs.existsSync(data.patucoModuleOk)
  ) {
    console.log(
      chalk.green
        .bold(`Algo salio mal... Comprueba que sean conrrectas las siguientes rutas:
 - ${data.patucoModuleOk}
 - ${data.patucoConfigOk}
 `)
    );
  } else {
    const fileStr = `const patucoConfig = {
  path: {
    patucoModule: "${data.patucoModuleOk}",
    patucoConfig: "${data.patucoConfigOk}",
    baseCss: "${data.patucoModuleOk}/src/templates/styles/baseCss.js",
    userTemplate: ${
      data.userTemplateOk === undefined ? undefined : `"${data.userTemplateOk}"`
    }
  },
  language: "${data.languageOk}",
};

module.exports = patucoConfig;`;
    try {
      fs.writeFileSync(data.patucoConfigOk, fileStr, { mode: 0o777 });
    } catch (err) {
      console.error(err);
      init();
    } finally {
      console.log(
        chalk.green.bold("\n------ ACTUALIZADO CORRECTAMENTE ------\n")
      );
    }
  }
};

const updateFile = async (key, path) => {
  const data = {
    patucoConfigOk: patucoConfig.path.patucoConfig,
    patucoModuleOk: patucoConfig.path.patucoModule,
    userTemplateOk:
      patucoConfig.path.userTemplate === "undefined"
        ? undefined
        : patucoConfig.path.userTemplate,
    languageOk: patucoConfig.language,
  };
  switch (key) {
    case "patucoConfig":
      const pathPatucoModuleOk = path.replace(
        "/src/scripts/constants/patucoConfig.js",
        ""
      );
      data.patucoConfigOk = path;
      data.patucoModuleOk = pathPatucoModuleOk;
      break;
    case "language":
      data.languageOk = path === "Ingles" || path === "English" ? "en" : "es";
      break;
    case "templatesPath":
      data.userTemplateOk = path;
      break;

    default:
      break;
  }

  // await
  writeArr(data);
  // init();
};

const createDirFilter = async (dirFilter) => {
  const filterArr = dirFilter.type.split(",");
  const arr = ["!.git"];
  for (let i = 0; i < filterArr.length; i++) {
    const element = filterArr[i].replace(/^ | $/, "");
    element !== "" && arr.push(element);
  }
  return arr;
};

const findPath = async () => {
  const path = await queryParams("patucoPath");
  console.log(path.type);
  if (!fs.existsSync(path.type) && path.type !== "") {
    console.error(chalk.red.bold("La ruta introducida no existe."));
    return configPaths();
  }
  const dirFilter = await createDirFilter(await queryParams("dirFilter"));
  console.log(chalk.bgCyan.bold("\nBuscando..."));
  const pathsArr = await filewalker(path.type, dirFilter);
  if (pathsArr.length > 0) {
    const pathOk = await queryParams("pathOk", pathsArr);
    // return pathOk.type;
    return updateFile("patucoConfig", pathOk.type);
  } else {
    console.log(chalk.red.bold("No se encontro el directorio patucostrap"));
    return configPaths();
  }
};

const configPaths = async () => {
  const options = await queryParams("configPaths");
  switch (options.type) {
    case back:
      init();
      break;
    case "Buscar directorio 'patucostrap' automaticamente":
      findPath();
      // await updateFile("patucoConfig", pathOk);
      break;
    case "Introducir el path manualmente":
      const pathQuery = await queryParams("path");
      const path = `${pathQuery}/patucostrap`;
      if (!fs.existsSync(path)) {
        console.error(
          chalk.red.bold(
            "No se encuetra el directorio 'patucostrap' en la ruta introducida."
          )
        );
        configPaths();
      }
      break;
    default:
      break;
  }
};

const configLanguage = async () => {
  const language = await queryParams("language");
  language.type === back ? init() : await updateFile("language", language.type);
};

const configTemplates = async () => {
  const templatesPath = await queryParams("templatesPath");
  if (fs.existsSync(templatesPath.type)) {
    const path = `${templatesPath.type}/patucoTemplates`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, 0777);
      console.log(
        chalk.green.bold("\nSe ha creado el directorio '/patucoTemplates'")
      );
    }
    await updateFile("templatesPath", path);
  } else {
    console.log(
      chalk.red.bold(
        `No se ha encontrado el directorio: '${templatesPath.type}'`
      )
    );
    init();
  }
};

const init = async () => {
  console.log(`
  ${chalk.cyan.bold("- Modulo:")} ${chalk.italic[
    patucoConfig.path.patucoModule ? "green" : "red"
  ](patucoConfig.path.patucoModule)}\n
  ${chalk.cyan.bold("- Plantillas:")} ${chalk.italic[
    patucoConfig.path.userTemplate ? "green" : "red"
  ](patucoConfig.path.userTemplate)}\n
  ${chalk.cyan.bold("- Idioma:")} ${chalk.green(
    patucoConfig.language === "es" ? "Español" : "Ingles"
  )}\n`);
  const mm = () => {
    if (!patucoConfig.path.patucoModule) {
      console.log(
        `${chalk.red.bold(
          "No se encontro el directorio del modulo patucostrap."
        )}\nConfigura el path del modulo patucostrap.`
      );
      return false;
    } else return true;
  };
  const options = await queryParams("typeClass");
  switch (options.type) {
    case "Configurar path modulo patucostrap":
      await configPaths();
      break;
    case "Configurar path de las plantillas del usuario":
      mm() ? await configTemplates() : init();
      break;
    case "Configurar idioma":
      mm() ? await configLanguage() : init();
      break;
    case back:
      start.start();
      break;
    default:
      break;
  }
};

const config = async () => {
  await init();
};

module.exports = { config };
