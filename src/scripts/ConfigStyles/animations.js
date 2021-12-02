const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");
const requireUncached = require("../common/requireUncached.js");
const config = require("../config.js");

const userPath = require("../constants/patucoConfig.js").path.userTemplate;
const animationsPredefined = require("../../templates/styles/animations.js");
const templateAnimaPath = `${userPath}/animations/animations.js`;
const txt = require("./translations/animations");

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

const prepareStr = async (animations) => {
  let fileStr = "const animations = [\n";
  for (let i = 0; i < animations.length; i++) {
    const element = animations[i];
    fileStr += `  {\n    name: "${element.animation}",\n    template: ${"`"}${
      element.template
    }${"`"}  },\n`;
  }
  fileStr += "]\n\nmodule.exports = animations;";
  return fileStr;
};

const updateSchema = async (animation) => {
  const pathSchema = `${userPath}/animations`;
  const fileStr = await prepareStr(animation);
  if (!fs.existsSync(pathSchema)) {
    fs.mkdirSync(pathSchema, 0777);
  }
  try {
    fs.writeFileSync(templateAnimaPath, fileStr, { mode: 0o777 });
  } catch (err) {
    console.error(err);
  } finally {
    console.log(`
    ${txt.c.createdOk}\n
${txt.c.created}\n
 - ${txt.c.file}: ${chalk.blue.bold("animations.js")}\n
 - ${txt.c.path}: ${chalk.blue.bold(templateAnimaPath)}\n
 ----------------------------------\n`);
  }
};

const enterData = async (animationsUser) => {
  const query = {};
  let template = "";
  let end = false;
  while (!end) {
    const name = await queryParams("input", txt.query.name);
    if (name.type !== "") {
      const data = [...animationsPredefined, ...animationsUser];
      if (!data.some((a) => a.name === name.type)) {
        query.animation = name.type;
        template += `@keyframes ${name.type} {\n`;
        end = true;
      } else {
        console.log(chalk.red.italic(`\n${name.type } ${txt.query.nameused}\n`));
      }
    } else {
      console.log(txt.c.haveadd);
    }
  }

  const option = await queryParams("addProp", txt.c.select, [
    txt.query.fronto,
    txt.query.timep,
  ]);

  end = false;
  if (option.type === txt.query.fronto) {
    let from = `  from {
`;
    let to = `  to {
`;
    while (!end) {
      const addpropFrom = await queryParams("addProp", txt.c.select, [
        txt.query.addpropFrom,
        txt.c.continue,
      ]);
      if (addpropFrom.type === txt.c.continue) {
        if (
          from ===
          `  from {
`
        ) {
          console.log(chalk.red.italic(txt.query.iaddprop));
        } else {
          end = true;
        }
      } else {
        const fromitems = await queryParams("input", txt.query.entercss);
        if (fromitems.type === "") {
          console.log(txt.c.haveadd);
        } else {
          from += `    ${fromitems.type};
`;
        }
      }
    }
    from += "  }\n";
    end = false;
    while (!end) {
      const addpropTo = await queryParams("addProp", txt.c.select, [
        txt.query.addpropTo,
        txt.c.continue,
      ]);
      if (addpropTo.type === txt.c.continue) {
        if (
          to ===
          `  to {
`
        ) {
          console.log(chalk.red.italic(txt.query.iaddprop));
        } else {
          end = true;
        }
      } else {
        const toitems = await queryParams("input", txt.query.entercss);
        if (toitems.type === "") {
          console.log(txt.c.haveadd);
        } else {
          to += `    ${toitems.type};
`;
        }
      }
    }
    to += "  }\n";
    query.template = template + from + to + "}\n";
    return query;
  } else {
    let properties = "";
    end = false;
    endprop = false;
    while (!end) {
      let percentageStr = "";
      endprop = false;
      const addpercentage = await queryParams("addProp", txt.c.select, [
        txt.query.addpercentage,
        txt.c.continue,
      ]);
      if (addpercentage.type === txt.c.continue) {
        if (properties === "") {
          console.log(chalk.red.italic(txt.query.iaddprop));
        } else {
          end = true;
        }
      } else {
        const percentage = await queryParams("input", txt.query.percentage);
        if (percentage.type === "") {
          console.log(txt.c.haveadd);
        } else {
          percentageStr += `  ${percentage.type}% {
`;
          while (!endprop) {
            const addpropFrom = await queryParams("addProp", txt.c.select, [
              txt.query.addprop,
              txt.c.continue,
            ]);
            if (addpropFrom.type === txt.c.continue) {
              if (
                percentageStr ===
                `  ${percentage.type}% {
`
              ) {
                console.log(chalk.red.italic(txt.query.iaddprop));
              } else {
                properties +=
                  percentageStr +
                  `  }
`;
                endprop = true;
              }
            } else {
              const fromitems = await queryParams("input", txt.query.entercss);
              if (fromitems.type === "") {
                console.log(txt.c.haveadd);
              } else {
                percentageStr += `    ${fromitems.type};
`;
              }
            }
          }
        }
      }
    }
    query.template = template + properties + "}\n";
    return query;
  }
};

const animations = async () => {
  if (fs.existsSync(userPath)) {
    const data = fs.existsSync(templateAnimaPath)
      ? requireUncached(templateAnimaPath)
      : [];
    const option = await queryParams("addProp", txt.c.select, [
      txt.query.create,
      txt.c.back,
    ]);
    if (option.type === txt.query.create) {
      const query = await enterData(data);
      data.unshift(query);
      await updateSchema(data);
      animations();
    } else {
      const configStyles = require("./index.js");
      configStyles.configStyles();
    }
  } else {
    console.log(chalk.bold.italic.red(txt.c.ipath));
    config.config();
  }
};

module.exports = { animations };
