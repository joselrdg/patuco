const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const config = require("../config.js");
const pathUser = require("../constants/patucoConfig.js").path.userTemplate;
const setClasses = require("./setClasses");

const back = chalk.bold.italic.magentaBright("Volver");
const msmEnd = chalk.bold.italic.green("Salir");
const continueCreate = (name) =>
  chalk.bold.italic.magentaBright(`Añadir más estilos al proyecto ${name}`);
const endCreate = chalk.bold.italic.magentaBright(
  "Terminar el proyecto por ahora"
);

const queryParams = (type, msm) => {
  const message = {
    init: {
      name: "type",
      type: "list",
      message: "Selecciona: ",
      choices: ["Añadir clase", back],
    },
    input: {
      name: "type",
      type: "input",
      message: msm,
    },
    addProp: {
      name: "type",
      type: "list",
      message: "Selecciona: ",
      choices: msm,
    },
  };
  const qs = [message[type]];
  return inquirer.prompt(qs);
};

const writeData = async (data, oldDataProyect) => {
  const infoProyect = await setClasses.setClasses(data, oldDataProyect);
  const continueC = continueCreate(infoProyect.nameProject);
  const addProp = await queryParams("addProp", [continueC, endCreate]);
  switch (addProp.type) {
    case continueC:
      createClasses(infoProyect);
      break;
    case endCreate:
      createClasses();
      break;
    default:
      break;
  }
};

const initData = async (queryInit, oldDataProyect) => {
  let endProp = false;
  let cont = -1;
  const data = {};
  // const add = await queryParams("addProp", [
  //   "Añadir clases patuco",
  //   "Añadir CSS puro",
  //   back,
  // ]);
  if (queryInit === back) {
    createClasses();
  } else if (queryInit === "Añadir CSS puro") {
    const templateName = await queryParams(
      "input",
      "Introduce un nombre para identificarlo:"
    );
    if (templateName.type !== "") {
      data.name = templateName.type;
      const template = await queryParams("input", "Introduce CSS: ");
      if (template.type !== "") {
        data.template = template.type;
        writeData(data, oldDataProyect);
      } else {
        console.log(chalk.red.italic("\nTienes que introducir un valor\n"));
        createClasses();
      }
    } else {
      console.log(chalk.red.italic("\nTienes que introducir un valor\n"));
      createClasses();
    }
  } else if (queryInit === "Añadir clases patuco") {
    data.items = [];
    const name = await queryParams(
      "input",
      "Introduce el nombre de la clase.\nEl nombre tiene que comenzar por '_'.\nSi el primer caracter no es '_' se añadira automaticamente."
    );
    if (name.type === "") {
      console.log(chalk.red.italic("\nTienes que introducir un valor\n"));
      createClasses();
    } else {
      if (name.type[0] !== "_") {
        name.type = "_" + name.type;
      }
      const children = await queryParams(
        "input",
        "Introduce los hijos sobre los que tendra efecto la clase.Por ejemplo: 'h1' 'div > span'.\n Si no lo necesitas dejalo en blanco"
      );
      const pseudoClass = await queryParams(
        "input",
        "Introduce pseudo-clase. Por ejemplo: 'hover'.\n Si no lo necesitas dejalo en blanco"
      );
      while (!endProp) {
        const addProp = await queryParams("addProp", [
          "Añadir propiedad CSS a la clase",
          "Continuar",
        ]);
        if (addProp.type === "Continuar") {
          if (data.items.length === 0) {
            console.log(
              chalk.red.italic(
                "\nTienes que introducir al menos una propiedad.\n"
              )
            );
          } else {
            endProp = true;
          }
        } else {
          const items = await queryParams(
            "input",
            "Introduce una propiedad css y su valor. Por ejemplo: 'display: none'."
          );
          if (items.type === "") {
            console.log(
              chalk.red.italic("\nTienes que introducir un valor.\n")
            );
          } else {
            data.items.push(items.type);
          }
        }
      }

      endProp = false;
      while (!endProp) {
        const addPsudoClass = await queryParams("addProp", [
          "Añadir psudo-elemento",
          "Continuar",
        ]);
        if (addPsudoClass.type === "Continuar") {
          endProp = true;
        } else {
          if (!data.pseudoElement) {
            data.pseudoElement = [];
          }
          cont++;
          let end = true;
          const pseudoElement = await queryParams(
            "input",
            "Introduce pseudo-elemento. Por ejemplo: 'after' 'first-line'."
          );
          if (pseudoElement.type !== "") {
            data.pseudoElement[cont] = { type: pseudoElement.type, items: [] };
            while (end) {
              const endQuery = await queryParams("addProp", [
                "Añadir propiedad",
                "Continuar",
              ]);
              if (endQuery.type === "Continuar") {
                if (data.pseudoElement[cont].items.length === 0) {
                  console.log(
                    chalk.red.italic(
                      "\nTienes que introducir al menos una propiedad.\n"
                    )
                  );
                } else {
                  end = false;
                }
              } else {
                const pseudoElementProp = await queryParams(
                  "input",
                  "Introduce una propiedad css y su valor. Por ejemplo: 'display: none'."
                );
                if (pseudoElementProp.type === "") {
                  console.log(
                    chalk.red.italic("\nTienes que introducir un valor\n")
                  );
                } else {
                  data.pseudoElement[cont].items.push(pseudoElementProp.type);
                }
              }
            }
          } else {
            cont--;
            console.log(chalk.red.italic("\nTienes que introducir un valor\n"));
          }
        }
      }

      data.name = name.type;
      if (children.type !== "") {
        data.target = children.type;
      }
      if (pseudoClass.type !== "") {
        data.pseudoClass = pseudoClass.type;
      }

      writeData(data, oldDataProyect);
    }
  }
};

const createClasses = async (oldDataProyect = false) => {
  const exists = fs.existsSync(pathUser);
  if (pathUser && exists) {
    // const queryInit = await queryParams("init");
    const queryInit = await queryParams("addProp", [
      "Añadir clases patuco",
      "Añadir CSS puro",
      back,
    ]);
    if (queryInit.type !== back) {
      initData(queryInit.type, oldDataProyect);
    } else {
      const configStyles = require("./index.js");
      configStyles.configStyles();
    }
  } else if (pathUser && !exists) {
    console.log(
      chalk.bold.italic.red(
        "\nNo se encotro el direcctorio el el path guardado.\nConfigura el path de tus plantillas\n"
      )
    );
    config.config();
  } else {
    console.log(
      chalk.bold.italic.red(
        "\nNo se encotro ruta almacenada.\nConfigura la ruta a tus plantillas\n"
      )
    );
    config.config();
  }
  // const direcPath = await queryParams("typeClass");
};

module.exports = { createClasses };
