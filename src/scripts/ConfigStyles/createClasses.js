const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const pathBase = process.cwd();
const config = require("../config.js");
const animations = require("./animationsdata.js");
const pathUser = require("../constants/patucoConfig.js").path.userTemplate;
const setClasses = require("./setClasses");
const txt = require("./translations/createClasses.js");
const baseCss = require("../../templates/styles/baseCss.js");
const filewalker = require("../common/filewalker.js");

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

const existsName = async (name) => {
  for (const key in baseCss) {
    const existsClass = baseCss[key].find((element) => element.name === name);
    if (existsClass) {
      return true;
    }
  }
  return false;
};

const copyFile = async () => {
  const pathArr = await filewalker(pathBase, {
    directoryFilter: ["!.git", "!*modules"],
    type: "files",
    fileFilter: "*.css",
  });
  const paths = pathArr.map((p) => p.path);
  const path = await queryParams("addProp", paths);
  let data = fs.readFileSync(path.type, "utf-8");
  const startI = data.indexOf("/*<(patu)>*/");
  if (startI !== -1) {
    data = data.slice(startI + 12);
  }
  const endI = data.indexOf("/*<(/patu)>*/");
  if (endI !== -1) {
    data = data.slice(0, endI);
  }
  return data;
};

const isPseudoIndx = async (name) => {
  const keys = [",", " ", "~", ".", ":", "[", "+", "<", ">", "_-("];
  let index = 10000;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const num = name.indexOf(key);
    if (num > 1 && index > num) {
      index = num;
    }
  }
  if (index === 10000) {
    index = -1;
  }
  return index;
};

const saveAsObject = async (dataFile, clName) => {
  let data = dataFile.replace(/ {1,}/g, " ");
  const itera = dataFile.split("}");
  const classNames = [];
  // while (!end) {
  for (let index = 0; index < itera.length; index++) {
    let pseudo = false;
    let recursivevar = false;
    const i = data.indexOf(".");
    const istart = data.indexOf("{");
    const iend = data.indexOf("}") + 1;
    const str = data.slice(0, iend);
    let className = data.slice(0, istart - 1).trim();
    let unique = false;
    if (className[0] !== ".") {
      if (!classNames.some((e) => e.name === clName)) {
        classNames.push({ name: clName, pseudoElement: [] });
      }
      unique = true;
    } else {
      className = className.slice(1);
    }

    const isPseudo = await isPseudoIndx(className);
    const indexitem = str.indexOf("{") + 1;
    let itemsStr = str.slice(indexitem, iend).replace(/\n/g, "");
    if (itemsStr.includes("var(|")) {
      recursivevar = true;
    }

    const items = itemsStr.split(";").map((item) => item.trim());
    items.pop();

    if (isPseudo > -1) {
      pseudo = true;
    }
    //  else if (ispace !== -1 || ispace !== istart) {
    //   // let cut = isspace<
    //   const d = className.slice(ispace, istart);
    //   if (d.indexOf(/[a-z]/g) !== -1) {
    //     console.log("pesuedooooooooooooooooooooooo");
    //     pseudo = true;
    //   }
    // }
    let firstName = unique ? clName : className;
    if (!unique && className.includes("_-(")) {
      firstName = className.slice(
        className.indexOf("_-(") + 3,
        className.indexOf(")-_")
      );
      className = className.replace("_-(" + firstName + ")-_", "");
    }
    firstName = firstName.trim();
    // console.log((/[0-9]$/).test(firstName));
    // console.log(firstName[firstName.length - 1].test(/[0-9]/));
    // if ((/[0-9]$/).test(firstName)) {
    //   console.log(
    //     chalk.red.italic(
    //       "\nLos nombres de las clases no pueden terminar con un número: " +
    //         firstName +
    //         "\n"
    //     )
    //   );
    //   break;
    // }
    const is = classNames.some((e) => {
      let type = className;
      if (unique && e.name === firstName) {
        if (!e.pseudoElement) {
          e.pseudoElement = [];
        }
        if (recursivevar) {
          e.recursivevar = recursivevar;
        }
        // e.unique = true;
        e.pseudoElement.push({ type, unique: true, recursivevar, items });
        return true;
      } else if (e.name === firstName) {
        if (isPseudo > -1) {
          if (!e.pseudoElement) {
            e.pseudoElement = [];
          }
          if (className.indexOf("_-(") === 0) {
            type = type.replace(`_-(${e.name})-_`, "");
          }
          type = type.replaceAll(`_-(${e.name})-_`, e.name);
          if (recursivevar) {
            e.recursivevar = recursivevar;
          }
          e.pseudoElement.push({ type, recursivevar, items });
        }
        return true;
      } else return false;
    });

    if (!is) {
      data = data.replace(str, "");
      if (isPseudo > -1) {
        const n = firstName.slice(0, isPseudo).trim();
        data = data.replaceAll(n, `_-(${n})-_`);
        classNames.push({
          name: n,
          recursivevar,
          pseudoElement: [
            { type: firstName.replace(n, ""), recursivevar, items },
          ],
        });
      } else {
        if (className === "") {
        } else {
          className = className.replaceAll(" ", "");
          console.log(
            "   - Clase encontrada: " + chalk.green.inverse(className)
          );
          data = data.replaceAll(className, `_-(${className})-_`);
          // console.log(data)
          classNames.push({ name: className, recursivevar, items });
        }
      }
    } else {
      data = data.replace(str, "");
    }

    if (!data.includes(".") || !data.includes("{")) {
      // end = true;
      break;
    }
    count++;
  }
  return classNames;
};

const initData = async (queryInit, oldDataProyect) => {
  let endProp = false;
  let cont = -1;
  const data = { items: [] };
  if (queryInit === back) {
    createClasses();
  } else if (queryInit === txt.query.addCSS) {
    const templateName = await queryParams("input", txt.query.inname);
    if (templateName.type !== "") {
      data.name = templateName.type;
      const copyF = await queryParams("addProp", [
        "Copiar archivo",
        "Introducir manualmete",
      ]);
      if (copyF.type === "Copiar archivo") {
        console.log(
          chalk.yellow.bold.italic(
            "\n    Añada el marcadaor /*<(patu)>*/ para indicar desde donde copiar, el marcadaor /*<(/patu)>*/ para indicar el final o ambos. Si no hay marcadores se copiara el archivo completo\n"
          )
        );
        const dataFile = await copyFile();
        const saveAsObjectQ = await queryParams("addProp", [
          txt.query.saveObj,
          txt.query.saveStr,
        ]);
        if (saveAsObjectQ.type === txt.query.saveObj) {
          const dataFileCss = await saveAsObject(dataFile, templateName.type);
          console.log(
            chalk.bold.green.italic(
              `\n   - Clases encontradas: ${dataFileCss.length}\n`
            )
          );

          // comprobar que no se repite ningun nombre de clase obtenido con los que estan guardado en el archivo
          // en el que se guardara
          // console.log(JSON.stringify(dataFileCss, null, 2));
          let savePrj = false;
          for (let indexWrt = 0; indexWrt < dataFileCss.length; indexWrt++) {
            const elementCl = dataFileCss[indexWrt];
            console.log(`\n   - Clase: ${chalk.bold.blue(elementCl.name)}\n`);
            const infoProyect = await setClasses.setClasses(elementCl, savePrj);
            if (!savePrj) {
              const continueC = continueCreate(infoProyect.nameProject);
              const addProp = await queryParams("addProp", [
                continueC,
                endCreate,
              ]);
              if (addProp.type === continueC) {
                savePrj = infoProyect;
              } else savePrj = false;
            }
          }
          createClasses();
        } else {
          data.template = dataFile;
          writeData(data, oldDataProyect);
        }
      } else {
        const template = await queryParams("input", txt.query.incss);
        if (template.type !== "") {
          data.template = template.type;
          writeData(data, oldDataProyect);
        } else {
          console.log(txt.c.haveadd);
          createClasses();
        }
      }
    } else {
      console.log(txt.c.haveadd);
      createClasses();
    }
  } else if (queryInit === txt.query.addclass) {
    while (!endProp) {
      const name = await queryParams("input", txt.query.incssms);
      if (name.type === "") {
        console.log(txt.c.haveadd);
      } else {
        if (name.type[0] !== "_") {
          name.type = "_" + name.type;
        }
        if (await existsName(name.type)) {
          console.log(
            chalk.red.italic(`\n${name.type} ${txt.query.iexname}\n`)
          );
        } else {
          data.name = name.type;
          endProp = true;
        }
        // const found = baseCss.find(element => element.name === name.type)
      }
    }
    endProp = false;
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
        if (!data.items) {
          data.items = [];
        }
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
        const pseudoElement = await queryParams("input", txt.query.addpsudoms);
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

    if (children.type !== "") {
      data.target = children.type;
    }
    if (pseudoClass.type !== "") {
      data.pseudoClass = pseudoClass.type;
    }

    writeData(data, oldDataProyect);
    // }
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
