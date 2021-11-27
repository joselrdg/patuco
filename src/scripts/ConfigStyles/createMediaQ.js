const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");

const userTemplatePath = require("../constants/patucoConfig.js").path
  .userTemplate;
const exists = fs.existsSync(userTemplatePath);
// const mediaQueries = require("../../templates/styles/mediaQueries.js");
const path = `${userTemplatePath}/mediaQueries/mediaQueries.js`;

const txt = require("./translations/createMediaQ.js");

const back = txt.c.back;

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
      message: msm,
      choices: choices,
    },
  };
  const qs = [message[type]];
  return inquirer.prompt(qs);
};

const prepareString = async (data) => {
  let str = "const mediaQueries = [\n";
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const template = element.template ? "template: true" : "";
    str += `  {
    name: "${element.name}",
    str: "${element.str}",
    ${template}
  },\n`;
  }
  str += "]\n\nmodule.exports = mediaQueries;";
  return str;
};

const checkEnteredValue = (value) => {
  if (value === "") {
    console.log(txt.c.haveadd);
    return false;
  } else return true;
};

const updateFile = async (file) => {
  const dirPath = `${userTemplatePath}/mediaQueries`;
  !fs.existsSync(dirPath) && (await fs.mkdirSync(dirPath, 0777));
  try {
    fs.writeFileSync(path, file, {
      mode: 0o777,
    });
  } catch (err) {
    console.error(err);
    updateCssSchema();
  } finally {
    console.log(`
  ${txt.c.createdOk}\n
  ${txt.c.created}\n
  - ${txt.c.file}: ${chalk.blue.bold("mediaQueries.js")}\n
  - ${txt.c.path}: ${chalk.blue.bold(path)}\n
  ----------------------------------\n`);
  }
  createMediaQ();
};

const editingOptions = async (mediaQueries) => {
  let select = "name";
  let selection = {};
  let data = {};
  const option = await queryParams(
    "addProp", //## mirar estos textos xq son iguales
    txt.query.select,
    [txt.query.sname, txt.query.smq]
  );
  if (option.type === txt.query.sname) {
    selection = await queryParams(
      "addProp",
      txt.c.select,
      mediaQueries.map((e) => e.name)
    );
  } else {
    select = "str";
    selection = await queryParams(
      "addProp",
      txt.c.select,
      mediaQueries.map((e) => e.str)
    );
  }
  for (let i = 0; i < mediaQueries.length; i++) {
    const element = mediaQueries[i];
    if (element[select] === selection.type) {
      if (element.template) {
        console.log(chalk.bold.italic.red(txt.query.iname));
      }
      data = await dataQuestions(element.template ? true : false, mediaQueries);
      if (element.template) {
        data.name = element.name;
        data.template = true;
      }
      mediaQueries[i] = data;
    }
  }
  const newMediaQFile = await prepareString(mediaQueries);
  updateFile(newMediaQFile);
};

const dataQuestions = async (end = false, mediaQueries) => {
  const data = {};
  while (!end) {
    const queryName = await queryParams("input", txt.query.name);
    if (checkEnteredValue(queryName.type)) {
      if (mediaQueries.some((e) => e.name === queryName.type)) {
        console.log(
          chalk.bold.italic.red(`\n ${queryName.type} ${txt.query.wname}`)
        );
      } else {
        data.name = queryName.type;
        end = true;
      }
    }
  }
  end = false;
  while (!end) {
    const query = await queryParams("input", txt.query.inewmq);
    if (checkEnteredValue(query.type)) {
      data.str = query.type;
      end = true;
    }
  }
  return data;
};

const create = async (mediaQueries) => {
  console.log(chalk.bold.italic.yellow(txt.query.worder));
  const data = await dataQuestions(false, mediaQueries);
  mediaQueries.push(data);
  const newMediaQFile = await prepareString(mediaQueries);
  updateFile(newMediaQFile);
};

const createMediaQ = async () => {
  const mediaQueries = require(fs.existsSync(path)
    ? path
    : "../../templates/styles/mediaQueries.js");

  console.log(chalk.bold.bgMagenta(txt.query.saved));
  for (let index = 0; index < mediaQueries.length; index++) {
    const element = mediaQueries[index];
    console.log(`- ${txt.c.name}: ${chalk.bold.blue(element.name)}
- Query: ${chalk.bold.green(element.str)}\n`);
  }
  const selection = await queryParams("addProp", txt.c.select, [
    txt.query.create,
    txt.query.edit,
    back,
  ]);
  if (selection.type === txt.query.create) {
    if (exists) {
      create(mediaQueries);
    } else {
      console.log(chalk.bold.italic.red(txt.c.ipath));
      const config = require("../config.js");
      config.config();
    }
  } else if (selection.type === txt.query.edit) {
    editingOptions(mediaQueries);
  } else {
    const configStyles = require("./index.js");
    configStyles.configStyles();
  }
};

module.exports = { createMediaQ };
