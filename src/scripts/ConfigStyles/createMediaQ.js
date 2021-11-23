const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");

const userTemplatePath = require("../constants/patucoConfig.js").path
  .userTemplate;
const exists = fs.existsSync(userTemplatePath);
// const mediaQueries = require("../../templates/styles/mediaQueries.js");
const back = chalk.bold.italic.magentaBright("Volver");
const path = `${userTemplatePath}/mediaQueries/mediaQueries.js`;

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
  console.log(data);
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
    console.log(chalk.bold.italic.red("\nTienes que introducir un valor"));
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
     ------ CREADO CORRECTAMENTE ------\n
     Se ha creado el siguiente elemento\n
     - Archivo: ${chalk.blue.bold("mediaQueries.js")}\n
     - Ruta: ${chalk.blue.bold(path)}\n
     ----------------------------------\n`);
  }
  createMediaQ();
};

const editingOptions = async (mediaQueries) => {
  let select = "name";
  let selection = {};
  let data = {};
  const option = await queryParams(
    "addProp",
    "Selecciona por nombre o por medy query: ",
    ["Seleccionar por nombre", "Seleccionar por media query"]
  );
  if (option.type === "Seleccionar por nombre") {
    selection = await queryParams(
      "addProp",
      "Selecciona por nombre o por media query: ",
      mediaQueries.map((e) => e.name)
    );
  } else {
    select = "str";
    selection = await queryParams(
      "addProp",
      "Selecciona por nombre o por media query: ",
      mediaQueries.map((e) => e.str)
    );
  }
  for (let i = 0; i < mediaQueries.length; i++) {
    const element = mediaQueries[i];
    if (element[select] === selection.type) {
      if (element.template) {
        console.log(
          chalk.bold.italic.red(
            "\nNo se puede editar el nombre, ya que está media query es utilizada para para el grid"
          )
        );
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
    const queryName = await queryParams(
      "input",
      "Introduce un nombre para que puedas añadir la media query a tus clases: "
    );
    if (checkEnteredValue(queryName.type)) {
      if (mediaQueries.some((e) => e.name === queryName.type)) {
        console.log(
          chalk.bold.italic.red(
            `\n El nombre ${queryName.type} ya está en uso. Utiliza otro nombre.`
          )
        );
      } else {
        data.name = queryName.type;
        end = true;
      }
    }
  }
  end = false;
  while (!end) {
    const query = await queryParams("input", "Introduce la nueva media query: ");
    if (checkEnteredValue(query.type)) {
      data.str = query.type;
      end = true;
    }
  }
  return data;
};

const create = async (mediaQueries) => {
  console.log(
    chalk.bold.italic.yellow(
      "\nLas media queries apareceran en el archivo css final, en el mismo orden en el que se añadan\n"
    )
  );
  const data = await dataQuestions(false, mediaQueries);
  mediaQueries.push(data);
  const newMediaQFile = await prepareString(mediaQueries);
  updateFile(newMediaQFile);
};

const createMediaQ = async () => {
  const mediaQueries = require(fs.existsSync(path)
    ? path
    : "../../templates/styles/mediaQueries.js");

  console.log(chalk.bold.bgMagenta("\nMedia queries guardadas: \n"));
  for (let index = 0; index < mediaQueries.length; index++) {
    const element = mediaQueries[index];
    console.log(`- Name: ${chalk.bold.blue(element.name)}
- Query: ${chalk.bold.green(element.str)}\n`);
  }
  const selection = await queryParams("addProp", "Selecciona: ", [
    "Crear media query",
    "Editar media query",
    back,
  ]);
  if (selection.type === "Crear media query") {
    if (exists) {
      create(mediaQueries);
    } else {
      console.log(
        chalk.bold.italic.red(
          "\nNo se encotro ruta almacenada.\nConfigura correctamente la ruta a tus plantillas\n"
        )
      );
      const config = require("../config.js");
      config.config();
    }
  } else if (selection.type === "Editar media query") {
    editingOptions(mediaQueries);
  } else {
    const configStyles = require("./index.js");
    configStyles.configStyles();
  }
};

module.exports = { createMediaQ };
