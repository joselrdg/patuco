const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const configStyles = require("./index.js");

const pathBase = process.cwd();
const baseCss = require("../../templates/styles/baseCss.js");

const variables = require("../../templates/styles/variables.js");

const pathSchemaUser = `${pathBase}/patuco/style/patucoSchema.css`;
const patucoConfig = require("../constants/patucoConfig.js").path.patucoModule;
const pathStyleCfg = `${patucoConfig}/style/patucoSchema.css`;

const userTemplatePath = require("../constants/patucoConfig.js").path
  .userTemplate;
const mediaQueriesArr = require(fs.existsSync(
  `${userTemplatePath}/mediaQueries/mediaQueries.js`
)
  ? `${userTemplatePath}/mediaQueries/mediaQueries.js`
  : "../../templates/styles/mediaQueries.js");

const querysUsed = [];
const groupQureryStr = [];

const txt = require("./translations/updateCssSchema.js");
const back = txt.c.back;

const reqPatuVar = require("../../templates/styles/requestPatuVar.js");

const queryParams = (item) => {
  const message = {
    option: {
      name: "type",
      type: "list",
      message: txt.query.upgrade,
      choices: [txt.c.update, back],
    },
    // pathConfig: {
    //   name: "type",
    //   type: "list",
    //   message:
    //     "¿Quieres guardar el archivo 'patucoSchema.css' en tu proyecto?: ",
    //   choices: ["Guardar", "Ir a configuraciones"],
    // },
    pathConfig: {
      name: "type",
      type: "list",
      message: txt.query.updateon,
      choices: [
        `${txt.query.updateonpath} ${pathBase}`,
        txt.query.updateonmodule,
      ],
    },
  };
  const qs = [message[item]];
  return inquirer.prompt(qs);
};

const includesVarName = async (element, recursivevar, recursiname) => {
  if (element.includes("var(|")) {
    const replace = element.slice(
      element.indexOf("(|"),
      element.indexOf("|)") + 2
    );
    newVar = element.replace(replace, "(--" + recursiname + ")");
  } else {
    newVar = element.replace(recursivevar, recursiname);
  }
  if (newVar.includes("_cVP")) {
    newVar = await reqPatuVar(newVar);
  }
  return newVar;
};

const prepareStylesStr = async (arr, recursivevar, recursiname) => {
  let str = "";
  for (let index = 0; index < arr.length; index++) {
    let element = arr[index];
    if (element.includes(recursivevar)) {
      const newVar = await includesVarName(element, recursivevar, recursiname);
      // console.log("\n   New var: " + newVar);
      str = str + `${newVar};\n`;
    } else {
      if (element.includes("_cVP")) {
        element = await reqPatuVar(element);
      }
      str = str + `${element};\n`;
    }
  }
  return str;
};

const createQueryCss = (query) => {
  let str = "";
  if (query.hover) {
    str = ":hover";
  }
  //  else if (query.after) {
  //   str = "::after";
  // } else if (query.before) {
  //   str = "::before";
  // }
  return str;
};

const recuVarCheck = [];
const rVarCheck = async (variab) => {
  if (!recuVarCheck.some((v) => v === variab)) {
    console.log("\n   - Variable: " + chalk.blue.bold(variab));
    recuVarCheck.push(variab);
  }
};
const numIterationsRecuVar = async (uniqueClass) => {
  let maxNum = 1;
  let pseudoelements = uniqueClass.items
    ? await recursiveVariablesCount(uniqueClass.items)
    : [];
  if (uniqueClass.pseudoElement) {
    for (let index = 0; index < uniqueClass.pseudoElement.length; index++) {
      const element = uniqueClass.pseudoElement[index];
      pseudoelements = await recursiveVariablesCount(
        element.items,
        pseudoelements
      );
    }
  }
  for (let i = 0; i < pseudoelements.length; i++) {
    const num = pseudoelements[i].length;
    if (num > maxNum) {
      maxNum = num;
    }
  }
  return maxNum;
};

const createPseudoElements = async (uniqueClass) => {
  const pseudoElements = uniqueClass.pseudoElement;
  let pseudoElementsStr = "";
  const maxNumIteration = await numIterationsRecuVar(uniqueClass);
  for (let index = 0; index < pseudoElements.length; index++) {
    const element = pseudoElements[index];
    let recursiveCount = uniqueClass.recursivevar
      ? await recursiveVariablesCount(element.items)
      : null;
    // if (recursiveCount !== null && recursiveCount.length === 0) {
    //   recursiveCount.push([]);
    // }
    if (recursiveCount !== null && recursiveCount.length === 0) {
      recursiveCount = null;
    }
    const itera = recursiveCount === null ? 1 : recursiveCount.length;
    // console.log(element.items[0]);
    for (let recurI = 0; recurI < itera; recurI++) {
      // const iteration =
      //   recursiveCount === null ? 1 : recursiveCount[recurI].length;
      // console.log('\n   - Pseudo-element: ' + chalk.bold.magenta(element.type));
      for (let recurIndex = 0; recurIndex < maxNumIteration; recurIndex++) {
        if (recursiveCount !== null) {
          await rVarCheck(recursiveCount[recurI][recurIndex]);
        }
        let stylesS = await prepareStylesStr(
          element.items ? element.items : [],
          recursiveCount !== null && recursiveCount[recurI][0],
          recursiveCount !== null && recursiveCount[recurI][recurIndex]
        );
        let keyP = "";
        if (
          uniqueClass.recursivevar &&
          recursiveCount !== null &&
          recursiveCount[recurI][0].includes("-K-")
        ) {
          keyP = recursiveCount[recurI][0]
            .replace("_-0", "")
            .split("-K-")
            .pop();
        }
        const recurClassName = uniqueClass.recursivevar
          ? recurIndex + keyP
          : "";
        let typePs = element.type.replace(
          uniqueClass.name,
          uniqueClass.name + recurClassName
        );
        let stylesStr =
          `${
            element.unique ? '' : "." + uniqueClass.name
          }${recurClassName}${typePs} {\n` +
          stylesS +
          "}\n\n";

        if (element.query) {
          await prepareClassesQueryStr(element.query, stylesStr);
        } else {
          pseudoElementsStr += stylesStr;
        }
      }
    }
  }

  // let stylesStr = `.${uniqueClass.name}${element.type} {\n`;
  //   for (let index = 0; index < element.items.length; index++) {
  //     let styleElement = element.items[index];
  //     if (styleElement.includes("_cVP")) {
  //       styleElement = await reqPatuVar(styleElement);
  //     }
  //     stylesStr = stylesStr + `  ${styleElement};\n`;
  //   }
  //   stylesStr = stylesStr + "}\n\n";
  //   if (element.query) {
  //     await prepareClassesQueryStr(element.query, stylesStr);
  //   } else {
  //     pseudoElementsStr = pseudoElementsStr + stylesStr;
  //   }
  // }

  return pseudoElementsStr;
};

const prepareClassesQueryStr = async (query, classStr) => {
  mediaQueriesArr.forEach((element) => {
    if (element.name === query) {
      const isQuerySaved = querysUsed.findIndex((e) => e === query);
      if (isQuerySaved > -1) {
        groupQureryStr[isQuerySaved].str =
          groupQureryStr[isQuerySaved].str + classStr;
      } else {
        console.log(`\n   - Media query: ${chalk.blue.bold(query)}`);
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
    mediaQueriesStr = mediaQueriesStr + `${element.str}\n}\n`;
  });
  return mediaQueriesStr;
};

const recursiveVariablesCount = async (items, count = []) => {
  // const count = [];
  let varNames = [];

  const edit = async (element) => {
    if (element.includes("var(|")) {
      const varData = element
        .slice(element.indexOf("(|") + 2, element.indexOf("|)"))
        .replace(" ", "");
      // if(varNames.some(e => e))
      return varData.split(",").map((e) => e.slice(0, e.indexOf("_-") + 2));
    } else return [];
  };
  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    const names = await edit(element);

    names.forEach((name) => {
      const is = varNames.some((e) => e === name);
      if (!is) {
        varNames.push(name);
      }
    });
  }

  for (let i = 0; i < varNames.length; i++) {
    const data = [];
    for (const key in variables) {
      const is = key.includes(varNames[i]);
      if (is) {
        // console.log(count)
        const isSaved = count.some((sav) => sav[0].includes(varNames[i]));
        if (!isSaved) {
          data.push(key);
        }
      }
    }
    count.push(data);
  }
  return count;
};

const prepareStr = async () => {
  let str = "";
  for (const key in baseCss) {
    str = str + `\n\n/* ${key} */\n\n`;
    const arr = baseCss[key];
    for (let index = 0; index < arr.length; index++) {
      const uniqueClass = arr[index];

      const target = uniqueClass.target ? ` ${uniqueClass.target}` : "";
      const pseudoClass = uniqueClass.pseudoClass
        ? `:${uniqueClass.pseudoClass}`
        : "";

      const pseudoElementsStr = uniqueClass.pseudoElement
        ? await createPseudoElements(uniqueClass)
        : "";
      let stylesStr = "";
      const recursiveCount = uniqueClass.recursivevar
        ? await recursiveVariablesCount(uniqueClass.items)
        : null;

      if (uniqueClass.template) {
        str = str + uniqueClass.template;
      }
      // if (uniqueClass.items)
      else {
        const itera = recursiveCount === null ? 1 : recursiveCount.length;
        for (let recurI = 0; recurI < itera; recurI++) {
          const iteration =
            recursiveCount === null ? 1 : recursiveCount[recurI].length;
          for (let recurIndex = 0; recurIndex < iteration; recurIndex++) {
            if (recursiveCount !== null) {
              await rVarCheck(recursiveCount[recurI][recurIndex]);
            }
            stylesStr = await prepareStylesStr(
              uniqueClass.items ? uniqueClass.items : [],
              recursiveCount !== null && recursiveCount[recurI][0],
              recursiveCount !== null && recursiveCount[recurI][recurIndex]
            );
            let keyP = "";
            if (
              uniqueClass.recursivevar &&
              recursiveCount[recurI][0].includes("-K-")
            ) {
              keyP = recursiveCount[recurI][0]
                .replace("_-0", "")
                .split("-K-")
                .pop();
            }
            const recurClassName =
              recursiveCount === null ? "" : recurIndex + keyP;

            if (uniqueClass.query) {
              const classStr = `${
                uniqueClass.unique ? "" : "." + uniqueClass.name
              }${recurClassName}${target}${pseudoClass} {
${stylesStr}}\n\n`;
              await prepareClassesQueryStr(uniqueClass.query, classStr);
            } else {
              str += `${
                "." + uniqueClass.name
              }${recurClassName}${target}${pseudoClass} {
    ${stylesStr}}\n\n`;
            }
          }
        }
        str += pseudoElementsStr;
      }
    }
  }

  const mediaQueryStr = await createMediaQueriesStr();

  return str + mediaQueryStr;
};

const updateSchema = async (path) => {
  const fileStr = await prepareStr();
  try {
    fs.writeFileSync(path, fileStr, { mode: 0o777 });
  } catch (err) {
    console.error(err);
    updateCssSchema();
  } finally {
    console.log(`
   ${txt.c.createdOk}\n
   ${txt.c.created}\n
   - ${txt.c.file}: ${chalk.green.bold("patucoSchema.css")}\n
   - ${txt.c.path}: ${chalk.green.bold(path)}\n
   ----------------------------------\n`);
  }
  configStyles.configStyles();
};

const filterSelect = async () => {
  console.log(chalk.red.italic(txt.query.exists));
  const dat = await queryParams("pathConfig");
  dat.type !== txt.query.updateonmodule
    ? updateSchema(pathSchemaUser)
    : updateSchema(pathStyleCfg);
};

const createDirUser = async () => {
  !fs.existsSync(`${pathBase}/patuco`) &&
    (await fs.mkdirSync(`${pathBase}/patuco`, 0777));
  !fs.existsSync(`${pathBase}/patuco/style`) &&
    (await fs.mkdirSync(`${pathBase}/patuco/style`, 0777));
  updateSchema(pathSchemaUser);
};

const updateCssSchema = async () => {
  const option = await queryParams("option");
  if (option.type === txt.c.update) {
    const pathConfig = await queryParams("pathConfig");
    if (pathConfig.type !== txt.query.updateonmodule) {
      // const newSavePr = fs.existsSync(pathSchemaUser) ? false : true;
      // newSavePr ? createDirUser() : await updateSchema(pathSchemaUser);
      !fs.existsSync(`${pathBase}/patuco`) &&
        (await fs.mkdirSync(`${pathBase}/patuco`, 0777));
      !fs.existsSync(`${pathBase}/patuco/style`) &&
        (await fs.mkdirSync(`${pathBase}/patuco/style`, 0777));
      updateSchema(pathSchemaUser);
    } else {
      const savePr = fs.existsSync(pathSchemaUser) ? true : false;
      savePr ? filterSelect(savePr) : updateSchema(pathStyleCfg);
    }
  } else {
    configStyles.configStyles();
  }
};

module.exports = { updateCssSchema };
