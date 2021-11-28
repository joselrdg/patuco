const inquirer = require("inquirer");
const fs = require("fs");
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

const enterData = async () => {
  const query = {};
  let end = false;
  while (!end) {
    const name = await queryParams("input", txt.query.name);
    if (name.type !== "") {
      query.name = name.type;
      end = true;
    } else {
      console.log(txt.c.haveadd);
    }
  }
  end = false;
  while (condition) {
    const duration = await queryParams("input", txt.query.duration);
    if (duration.type !== "") {
      query.duration = duration.type;
      end = true;
    } else {
      console.log(txt.c.haveadd);
    }
  }
  const timing = await queryParams("input", txt.query.timing);
  if (timing.type !== "") {
    query.timing = timing.type;
  }
  const delay = await queryParams("input", txt.query.delay);
  if (delay.type !== "") {
    query.delay = delay.type;
  }
  const iteration = await queryParams("input", txt.query.iteration);
  if (iteration.type !== "") {
    iteration.delay = iteration.type;
  }
  const direction = await queryParams("input", txt.query.direction);
  if (direction.type !== "") {
    direction.delay = direction.type;
  }
  const fillmode = await queryParams("input", txt.query.direction);
  if (fillmode.type !== "") {
    fillmode.delay = fillmode.type;
  }
  return query;
};

const animations = (async () => {
  const option = await queryParams("addProp", txt.c.select, [txt.query.create]);
  if (option.type === txt.query.create) {
    const queries = await enterData();
    const opp = queryParams("addProp");
  }
})();

module.exports.animations = animations;
