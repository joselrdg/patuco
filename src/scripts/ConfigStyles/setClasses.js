const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const config = require("../config.js");
const requireUncached = require("../requireUncached.js");

const userTemplatesPath = require("../constants/patucoConfig.js").path
  .userTemplate;

const templatesBaseJsPath = `${userTemplatesPath}/classes/base.js`;

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

const checkPath = async (path) => {
  const exists = fs.existsSync(path);
  if (exists) {
    const classesPath = `${path}/classes`;
    if (!fs.existsSync(classesPath)) {
      fs.mkdirSync(classesPath, 0777);
    }
    return classesPath;
  } else {
    return undefined;
  }
};

const groupName = async (userSavedClasses) => {
  let condition = true;
  let newProject = false;
  let nameProject = "_Styles_User_Example";
  let projectsKeys = [];
  if (fs.existsSync(templatesBaseJsPath)) {
    // const userSavedClasses = requireUncached(templatesBaseJsPath);
    projectsKeys = Object.keys(userSavedClasses);
  }

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
      } else if (/[ 0-9$&+,:;=?@#|'<>.^*()%!-]/.test(nameProject)) {
        console.log(
          chalk.red.italic(
            "\nNo se pueden utilizar números ni caracteres especiales. Javascript no lo permite en las importaciones.\n"
          )
        );
      } else {
        if (projectsKeys.some((e) => e === nameProject)) {
          console.log(
            chalk.red.italic("\nYa existe un proyecto con ese nombre\n")
          );
        } else {
          newProject = true;
          condition = false;
        }
      }
    } else condition = false;
  }
  return { nameProject, newProject };
};

const prepareNewFile = async (nameProject, data) => {
  const fileStr = `const ${nameProject} = ${JSON.stringify(data, null, 2)};
 
module.exports = ${nameProject};`;
  return fileStr;
};

const prepareDataClass = async (userSavedClasses, optProject, data) => {
  const { nameProject, newProject } = optProject;
  if (newProject) {
    const newFileOk = await prepareNewFile(nameProject, [data]);
    return newFileOk;
  } else {
    // const userSavedClasses = requireUncached(templatesBaseJsPath);
    const oldData = userSavedClasses[nameProject];
    oldData.push(data);
    const oldFileOk = await prepareNewFile(nameProject, oldData);
    return oldFileOk;
  }
};

const importName = async (names) => {
  let str = "";
  for (let i = 0; i < names.length; i++) {
    str += `const ${names[i]} = require("./${names[i]}.js");\n`;
  }
  return str;
};

const importProperties = async (names) => {
  let str = "";
  for (let i = 0; i < names.length; i++) {
    str += `  ${names[i]},\n`;
  }
  return str;
};

const baseJsStr = async (nameProject) =>
  `${await importName(nameProject)}

const stylesUser = {
${await importProperties(nameProject)}};
  
module.exports = stylesUser;`;

const writeDataBase = async (userSavedClasses, optProject, path, file) => {
  const { nameProject, newProject } = optProject;
  const baseJsPath = `${path}/base.js`;
  let names = nameProject;
  if (fs.existsSync(templatesBaseJsPath)) {
    if (newProject) {
      // const userSavedClasses = requireUncached(templatesBaseJsPath);
      names = Object.keys(userSavedClasses);
      names.push(nameProject);
    }
  } else {
    names = [nameProject];
  }
  try {
    if (newProject || !fs.existsSync(templatesBaseJsPath)) {
      const baseJs = await baseJsStr(names);
      fs.writeFileSync(baseJsPath, baseJs, { mode: 0o777 });
    }
    fs.writeFileSync(`${path}/${nameProject}.js`, file, { mode: 0o777 });
  } catch (err) {
    console.error(err);
  } finally {
    console.log(`
Se han creado/actualizado los siguientes elementos\n
- Archivo: ${chalk.blue.bold("base.js")}\n
- Ruta: ${chalk.blue.green(baseJsPath)}\n
- Archivo: ${chalk.blue.bold(`${nameProject}.js`)}\n
- Ruta: ${chalk.blue.green(`${path}/${nameProject}.js`)}\n
${chalk.blue.cyan(
  `Puedes seguir añadiendo stilos al proyecto ${nameProject}`
)}\n`);

    requireUncached(templatesBaseJsPath);

    return { nameProject, newProject: false };
  }
};

const setClasses = async (data, oldDataProyect) => {
  const path = await checkPath(userTemplatesPath);
  if (!path) {
    console.log(
      chalk.bold.italic.red(
        "\nNo se encotro ruta almacenada.\nConfigura correctamente la ruta a tus plantillas\n"
      )
    );
    config.config();
  } else {
    const userSavedClasses = requireUncached(templatesBaseJsPath);
    const optProject = oldDataProyect ? oldDataProyect : await groupName(userSavedClasses);
    const file = await prepareDataClass(userSavedClasses, optProject, data);
    const infoProyect = await writeDataBase(userSavedClasses, optProject, path, file);
    return infoProyect;
  }
};

module.exports = { setClasses };
