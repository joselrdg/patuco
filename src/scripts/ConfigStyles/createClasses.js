const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const config = require("../config.js");
const animations = require("./animationsdata.js");
const pathUser = require("../constants/patucoConfig.js").path.userTemplate;
const setClasses = require("./setClasses");
const txt = require("./translations/createClasses.js");

const continueCreate = (name) =>
  chalk.bold.italic.magentaBright(`${txt.query.addmstyles} ${name}`);
const endCreate = chalk.bold.italic.magentaBright(txt.query.finisproj);

const back = txt.c.back;

const queryParams = (type, msm) => {
  const message = {
    input: {
      name: "type",
      type: "input",
      message: msm,
    },
    addProp: {
      name: "type",
      type: "list",
      message: txt.c.select,
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
  if (queryInit === back) {
    createClasses();
  } else if (queryInit === txt.query.addCSS) {
    const templateName = await queryParams("input", txt.query.inname);
    if (templateName.type !== "") {
      data.name = templateName.type;
      const template = await queryParams("input", txt.query.incss);
      if (template.type !== "") {
        data.template = template.type;
        writeData(data, oldDataProyect);
      } else {
        console.log(txt.c.haveadd);
        createClasses();
      }
    } else {
      console.log(txt.c.haveadd);
      createClasses();
    }
  } else if (queryInit === txt.query.addclass) {
    data.items = [];
    const name = await queryParams("input", txt.query.incssms);
    if (name.type === "") {
      console.log(txt.c.haveadd);
      createClasses();
    } else {
      if (name.type[0] !== "_") {
        name.type = "_" + name.type;
      }
      const children = await queryParams("input", txt.query.inchild);
      const pseudoClass = await queryParams("input", txt.query.inpsudo);
      while (!endProp) {
        const addProp = await queryParams("addProp", [
          txt.query.addprop,
          txt.c.continue,
        ]);
        if (addProp.type === txt.c.continue) {
          // if (data.items.length === 0) {
          //   console.log(chalk.red.italic(txt.query.iaddprop));
          // } else {
            endProp = true;
          // }
        } else {
          const items = await queryParams("input", txt.query.entercss);
          if (items.type === "") {
            console.log(txt.c.haveadd);
          } else {
            data.items.push(items.type);
          }
        }
      }

      endProp = false;
      while (!endProp) {
        const addPsudoClass = await queryParams("addProp", [
          txt.query.addpsudo,
          txt.c.continue,
        ]);
        if (addPsudoClass.type === txt.c.continue) {
          endProp = true;
        } else {
          if (!data.pseudoElement) {
            data.pseudoElement = [];
          }
          cont++;
          let end = true;
          const pseudoElement = await queryParams(
            "input",
            txt.query.addpsudoms
          );
          if (pseudoElement.type !== "") {
            data.pseudoElement[cont] = { type: pseudoElement.type, items: [] };
            while (end) {
              const endQuery = await queryParams("addProp", [
                txt.query.addprop,
                txt.c.continue,
              ]);
              if (endQuery.type === txt.c.continue) {
                if (data.pseudoElement[cont].items.length === 0) {
                  console.log(chalk.red.italic(txt.query.iaddprop));
                } else {
                  end = false;
                }
              } else {
                const pseudoElementProp = await queryParams(
                  "input",
                  txt.query.entercss
                );
                if (pseudoElementProp.type === "") {
                  console.log(txt.c.haveadd);
                } else {
                  data.pseudoElement[cont].items.push(pseudoElementProp.type);
                }
              }
            }
          } else {
            cont--;
            console.log(txt.c.haveadd);
          }
        }
      }

      const animation = await queryParams("addProp", [
        txt.query.createanima,
        txt.c.continue,
      ]);
      if (animation.type !== txt.c.continue) {
        const anima = await animations.animations();
        data.animation = anima.animation;
        data.items.push(...anima.items);
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
    const queryInit = await queryParams("addProp", [
      txt.query.addclass,
      txt.query.addCSS,
      back,
    ]);
    if (queryInit.type !== back) {
      initData(queryInit.type, oldDataProyect);
    } else {
      const configStyles = require("./index.js");
      configStyles.configStyles();
    }
  } else if (pathUser && !exists) {
    console.log(chalk.bold.italic.red(txt.query.pathdir));
    config.config();
  } else {
    console.log(chalk.bold.italic.red(txt.c.ipath));
    config.config();
  }
  // const direcPath = await queryParams("typeClass");
};

module.exports = { createClasses };
