const inquirer = require("inquirer");
const chalk = require("chalk");
const start = require("../../index.js");
// const readClasses = require("./readClasses.js");
const setVariables = require("./setVariables");
// const updateCssSchema = require("./updateCssSchema.js");
// const createCSS = require("./createCss.js");
const createClasses = require("./createClasses.js");
const createMediaQ = require("./createMediaQ.js");

const txt = require("./translations/index.js");

const patucoModulePath = require("../constants/patucoConfig.js").path
  .patucoModule;
const readClassesPath = `${patucoModulePath}/src/scripts/ConfigStyles/readClasses.js`;
const updateCssSchemaPath = `${patucoModulePath}/src/scripts/ConfigStyles/updateCssSchema.js`;
const createCSSPath = `${patucoModulePath}/src/scripts/ConfigStyles/createCss.js`;
const requireUncached = require("../requireUncached.js");

const back = txt.c.back;

const queryParams = () => {
  const qs = [
    {
      name: "type",
      type: "list",
      message: txt.c.select,
      choices: [
        txt.query.choices.view,
        txt.query.choices.classes,
        txt.query.choices.setvar,
        txt.query.choices.setanim,
        txt.query.choices.setmq,
        txt.query.choices.setTp,
        txt.query.choices.createCss,       
        back,
      ],
    },
  ];
  return inquirer.prompt(qs);
};

const setOptions = (data) => {
  switch (data.type) {
    case txt.query.choices.setvar:
      setVariables.setVariables();
      break;
    case txt.query.choices.classes:
      createClasses.createClasses();
      break;
    case txt.query.choices.view:
      const readClasses = requireUncached(readClassesPath);
      readClasses.readClasses();
      break;
    case txt.query.choices.setTp:
      const updateCssSchema = requireUncached(updateCssSchemaPath);
      updateCssSchema.updateCssSchema();
      break;
    case txt.query.choices.createCss:
      const createCSS = requireUncached(createCSSPath);
      createCSS.createCSS();
      break;
    case txt.query.choices.setmq:
      createMediaQ.createMediaQ();
      break;
    case txt.query.choices.setanim:
      require("./animations.js");
      break;
    case back:
      start.start();
      break;
    default:
      break;
  }
};

const configStyles = async () => {
  setOptions(await queryParams());
};

module.exports = { configStyles };
