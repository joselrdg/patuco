const inquirer = require("inquirer");

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

module.exports = queryParams;
