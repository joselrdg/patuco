const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const config = require("../config.js");
const requireUncached = require("../common/requireUncached.js");

const userTemplatesPath = require("../constants/patucoConfig.js").path
  .userTemplate;

const templatesBaseJsPath = `${userTemplatesPath}/classes/base.js`;

const txt = require("./translations/setClasses.js");
const msmCreateProject = chalk.bold.italic.bgBlackBright(txt.query.create);

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
      txt.query.select,
      projectsKeys
    );
    nameProject = projectKeyQuery.type;
    if (nameProject === msmCreateProject) {
      const nameQuery = await queryParams("input", txt.query.collection);
      nameProject = nameQuery.type;
      if (nameProject === "") {
        console.log(chalk.red.italic(txt.query.inname));
      } else if (/[ 0-9$&+,:;=?@#|'<>.^*()%!-]/.test(nameProject)) {
        console.log(chalk.red.italic(txt.query.inum));
      } else {
        if (projectsKeys.some((e) => e === nameProject)) {
          console.log(chalk.red.italic(txt.query.iexists));
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
${txt.c.updated}\n
- ${txt.c.file}: ${chalk.blue.bold("base.js")}\n
- ${txt.c.path}: ${chalk.blue.green(baseJsPath)}\n
- ${txt.c.file}: ${chalk.blue.bold(`${nameProject}.js`)}\n
- ${txt.c.path}: ${chalk.blue.green(`${path}/${nameProject}.js`)}\n
${chalk.blue.cyan(`${txt.query.iadd} ${nameProject}`)}\n`);

    requireUncached(templatesBaseJsPath);

    return { nameProject, newProject: false };
  }
};

const setClasses = async (data, oldDataProyect) => {
  const path = await checkPath(userTemplatesPath);

  if (!path) {
    console.log(chalk.bold.italic.red(txt.c.ipath));
    config.config();
  } else {
    const userSavedClasses = fs.existsSync(templatesBaseJsPath)
      ? requireUncached(templatesBaseJsPath)
      : [];
    const optProject = oldDataProyect
      ? oldDataProyect
      : await groupName(userSavedClasses);
    const file = await prepareDataClass(userSavedClasses, optProject, data);
    const infoProyect = await writeDataBase(
      userSavedClasses,
      optProject,
      path,
      file
    );
    return infoProyect;
  }
};

module.exports = { setClasses };
