const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const config = require("../config.js");
const userTemplatesPath = require("../constants/patucoConfig.js").path
  .userTemplate;
const exitsPathN = fs.existsSync(`${userTemplatesPath}/classes/base.js`);
const userSavedClasses = require(exitsPathN
  ? `${userTemplatesPath}/classes/base.js`
  : "../../templates/styles/stylesUser.js");

const back = chalk.bold.italic.magentaBright("Volver\n");

const msmCreateProject = chalk.bold.italic.bgBlackBright(
  "Crear un nuevo proyecto"
);

const queryParams = (type, msm, choices) => {
  const message = {
    input: {
      name: "type",
      type: "input",
      message: msm,
    },
    addProp: {
      name: "type",
      type: "list",
      message: `${msm}: `,
      choices: choices,
    },
  };
  const qs = [message[type]];
  return inquirer.prompt(qs);
};

const baseJs = `const stylesUser = {
  _Styles_User: [{ name: "Ejemplo", items: ["display: flex"] }],
  Styles_User: [{ name: "Ejemplo2", items: ["display: flex"] }],
};
  
module.exports = stylesUser;`;

const checkPath = async (path) => {
  const exists = fs.existsSync(path);
  if (exists) {
    const classesPath = `${path}/classes`;
    if (!fs.existsSync(classesPath)) {
      fs.mkdirSync(classesPath, 0777);
    }
    return `${classesPath}/base.js`;
    // const baseJsPath = `${classesPath}/base.js`;
    // if (!fs.existsSync(baseJsPath)) {
    //   try {
    //     fs.writeFileSync(baseJsPath, baseJs, { mode: 0o777 });
    //     console.log(`
    //      Se ha creado el siguiente elemento\n
    //      - Archivo: ${chalk.blue.bold("patuco.css")}\n
    //      - Ruta: ${chalk.blue.bold(baseJsPath)}\n`);
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     baseJsPath;
    //   }
    // }
  } else {
    return undefined;
  }
};

const groupName = async () => {
  let condition = true;
  let nameProject = "_Styles_User_Example";
  const projectsKeys = Object.keys(userSavedClasses);
  projectsKeys.unshift(msmCreateProject);
  while (condition) {
    const projectKeyQuery = await queryParams(
      "addProp",
      "Selecciona o crea un proyecto: ",
      projectsKeys
    );
    nameProject = projectKeyQuery.type;
    if (nameProject === msmCreateProject) {
      const nameQuery = await queryParams(
        "input",
        "Introduce el nombre del projecto/grupo de clases: "
      );
      nameProject = nameQuery.type;
      if (nameProject === "") {
        console.log(chalk.red.italic("\nEs necesario introducir un nombre\n"));
      } else {
        if (projectsKeys.some((e) => e === nameProject)) {
          console.log(
            chalk.red.italic("\nYa existe un proyecto con ese nombre\n")
          );
        } else condition = false;
      }
    } else condition = false;
  }
  return nameProject;
};

const writeFiles = async (nameProject) => {};

const setClasses = async (data) => {
  const baseJsPath = await checkPath(userTemplatesPath);
  if (!baseJsPath) {
    console.log(
      chalk.bold.italic.red(
        "\nNo se encotro ruta almacenada.\nConfigura correctamente la ruta a tus plantillas\n"
      )
    );
    config.config();
  } else {
    console.log(chalk.bold.green(baseJsPath));
    const nameProject = await groupName();
    console.log(data);
    console.log(nameProject);
  }
};

module.exports = { setClasses };
