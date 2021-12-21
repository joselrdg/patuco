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
      // alwaysStat: true,
    })
      .on("data", (entry) => {
        const {
          path,
          // stats: { size },
        } = entry;
        data.push({ path });
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
    typeSearch: {
      name: "type",
      type: "list",
      message: txt.query.iupdate,
      choices: [txt.query.tsfile, txt.query.tsclass],
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
    if (!variablesUsed.some((e) => e === nameVariable)) {
      const regex = new RegExp(nameVariable, "g");
      if (regex.test(styleElement)) {
        console.log(`\n${txt.query.ivariable} ${chalk.green(nameVariable)}`);
        variablesUsed.push(nameVariable);
        rootStr =
          rootStr + `  --${nameVariable}: "${variables[nameVariable]}";\n`;
      }
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
    let stylesStr = `.${uniqueClass.name}${element.type} {\n`;
    for (let index = 0; index < element.items.length; index++) {
      const styleElement = element.items[index];
      stylesStr = stylesStr + `  ${styleElement};\n`;
    }
    stylesStr = stylesStr + "}\n\n";

    if (element.query) {
      await prepareClassesQueryStr(element.query, stylesStr);
    } else {
      pseudoElementsStr = pseudoElementsStr + stylesStr;
    }
    // pseudoElementsStr = pseudoElementsStr + stylesStr;
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
            const classStr = ` .${uniqueClass.name}${target}${pseudoClass} {
${stylesStr}  }\n\n ${pseudoElementsStr}`;
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
  // console.log(chalk.greenBright(rootStr));
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

const isRegex = async (regex, key) => {
  const is = regex.test(key);
  return is;
};

const searchVarArr = async (item, ir) => {
  let data = item.split("var(|");
  const regex = new RegExp();
  for (let i = 1; i < data.length; i++) {
    let varok = "";
    let totalStr = data[i].slice(0, data[i].indexOf("|)"));
    const varArr = totalStr.split(",");
    if (varArr.length > 1) {
      for (let index = 0; index < varArr.length; index++) {
        const element = varArr[index].trim();
        if (element.includes("-K-" + ir) || element.includes("-k-" + ir)) {
          varok = element;
        }
      }
    } else {
      varok = varArr[0].trim();
    }
    item = item.replaceAll("|" + totalStr + "|", "--" + varok);
    // for (let index = 0; index < varArr.length; index++) {

    // }
  }
  return item;
};

const createRecurVarItems = async (items, num, ir) => {
  let data = [];
  for (let index = 0; index < items.length; index++) {
    if (items[index].includes("var(|")) {
      items[index] = items[index].replaceAll("_-0", "_-" + num);
      data.push(await searchVarArr(items[index], ir));
    } else {
      data.push(items[index]);
    }
  }
  return data;
};

const createClassRecursive = async (
  savedClasses,
  key,
  file,
  classTemplate,
  counterTotal,
  counterEnd,
  classfile,
  keyname
) => {
  let filecut = file.slice(file.indexOf(keyname));
  filecut = filecut.slice(0, filecut.indexOf(" ")).trim();

  let ir = "";
  const indNumArr = [...filecut.matchAll(/[0-9]/g)];

  let recunum = "";
  if (indNumArr[indNumArr.length - 1] !== undefined) {
    recunum = indNumArr[indNumArr.length - 1][0];
    if (indNumArr[indNumArr.length - 1].index < filecut.length - 1) {
      const strfilt = filecut.slice(indNumArr[indNumArr.length - 1].index + 1);
      if (/[a-zA-Z]|-|_/g.test(strfilt)) {
        ir = strfilt;
      }
    }
  }

  const someClass = savedClasses[key].some((arrVal) => filecut === arrVal.name);
  if (!someClass) {
    counterEnd.push("");
    const data = JSON.parse(JSON.stringify(classTemplate));

    data.name = keyname + recunum + ir;
    const itms = await createRecurVarItems(data.items, recunum, ir);
    data.items = itms;
    if (classTemplate.pseudoElement) {
      const psudoelemnts = [];
      for (let index = 0; index < data.pseudoElement.length; index++) {
        const obj = data.pseudoElement[index];
        obj.items = await createRecurVarItems(
          data.pseudoElement[index].items,
          recunum,
          ir
        );
        psudoelemnts.push(obj);
      }
    }
    console.log(`    ${txt.query.foundclass} ${chalk.greenBright.italic(data.name)}`);
    savedClasses[key].push(data);
  }

  // console.log(classstring);
  // const createClassRecursive = async (
  //   savedClasses,
  //   key,
  //   file,
  //   classTemplate,
  //   counterTotal,
  //   counterEnd
  // ) => {
  // const regex = new RegExp(classTemplate.name);
  // const keysVariables = Object.keys(variables);
  // for (let i = 0; i < keysVariables.length; i++) {
  //   const keyVar = keysVariables[i];
  //   const isKeyVar = await isRegex(regex, keyVar);
  //   if (isKeyVar) {
  //       const name = keyVar.replace(
  //         classTemplate.recursivevar,
  //         `${classTemplate.name}`
  //       );
  //       const regexName = new RegExp(name, "g");
  //       const isVar = await isRegex(regexName, file);
  //       if (isVar) {
  //         console.log(chalk.bold.yellow("estaaaa: " + name));
  //         counterTotal.push("");
  //         const someClass = savedClasses[key].some(
  //           (arrVal) => name === arrVal.name
  //         );
  //         if (!someClass) {
  //           const data = JSON.parse(JSON.stringify(classTemplate));
  //           data.name = name;
  //           const regVar = new RegExp();
  //           const items = [];
  //           for (let index = 0; index < classTemplate.items.length; index++) {
  //             const element = classTemplate.items[index];
  //             const isRegVar = await isRegex(regVar, element);
  //             if (isRegVar) {
  //               const elementRepla = element.replace(
  //                 `${classTemplate.recursivevar}0`,
  //                 keyVar
  //               );
  //               items.push(elementRepla);
  //             } else {
  //               items.push(element);
  //             }
  //           }
  //           data.items = items;
  //           console.log(`    Encontrda clase: ${chalk.green.italic(name)}`);
  //           counterEnd.push("");
  //           savedClasses[key].push(data);
  //         }
  //       }
  // }
  // }
};

const readStyles = async (
  file,
  savedClasses,
  counterTotal,
  counterEnd,
  classfile
) => {
  for (const key in baseCss) {
    const arr = baseCss[key];
    for (let i = 0; i < arr.length; i++) {
      let name = arr[i].name;
      if (name) {
        const regex = new RegExp(name, "g");
        const is = regex.test(file);
        if (is) {
          counterTotal.push("");
          if (arr[i].recursivevar) {
            await createClassRecursive(
              savedClasses,
              key,
              file,
              arr[i],
              counterTotal,
              counterEnd,
              classfile,
              name
            );
          } else {
            const someClass = savedClasses[key].some(
              (arrVal) => name === arrVal.name
            );
            if (!someClass) {
              console.log(`    ${txt.query.foundclass} ${chalk.green.italic(name)}`);
              counterEnd.push("");
              savedClasses[key].push(arr[i]);
            }
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

const extractClasses = async (file, isClassName, namePath) => {
  let str = "";
  const itera = file.split(isClassName);
  let filecut = "";
  let indEnd = 0;
  for (let i = 1; i < itera.length; i++) {
    let elementStr = itera[i];
    let k = elementStr[0];

    elementStr = elementStr.slice(1);
    if (k === "{") {
      k = "}";
      let end = false;
      let indstr = elementStr.indexOf("{");
      indEnd = elementStr.indexOf("}");
      if (indstr === -1 || indstr > indEnd) {
        end = true;
      }
      let fin = elementStr;
      let count = indEnd;
      for (let index = 0; index < elementStr.length; index++) {
        // while (!end || indstr < indEnd) {
        fin = fin.slice(indEnd + 1);
        indstr = fin.indexOf("{");
        indEnd = fin.indexOf("}");
        count += indEnd + 1;
        if (indstr > indEnd || indEnd === 0) {
          indEnd = count;
          break;
        }
      }
    } else {
      indEnd = elementStr.indexOf(k);
    }

    // if (
    //   namePath ===
    //   "src/example1/components/screens/auth/login/LoginScreen copy.jsx"
    // ) {
    //   console.log(elementStr);
    //   console.log(chalk.yellow(elementStr.slice(0, indEnd) + " "));
    //   console.log(chalk.red.inverse(indEnd));
    // }
    filecut += elementStr.slice(0, indEnd) + " ";
  }
  filecut = filecut.replace(/ {1,}/g, " ").trim();
  return filecut;
};

const openFiles = async (direcPath, filePath) => {
  const typeSearch = await queryParams("typeSearch");

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
    const namePath = filePath[index].path;
    const file = fs.readFileSync(
      `${pathBase}/${direcPath}/${namePath}`,
      "utf-8"
    );
    if (/class=/g.test(file) || /className=/g.test(file)) {
      let isClassName = "class=";
      if (/className=/g.test(file)) {
        isClassName = "className=";
      }
      const classfile = await extractClasses(file, isClassName, namePath);
      console.log("\n   - Path: " + chalk.cyan.italic(namePath));
      console.log("   - Classes: " + chalk.blue(classfile) + "\n");

      await readStyles(
        typeSearch.type === txt.query.tsfile ? file : classfile,
        savedClasses,
        counterTotal,
        counterEnd,
        baseCss,
        classfile
      );
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
