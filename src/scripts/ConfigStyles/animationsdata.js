const inquirer = require("inquirer");
const txt = require("./translations/animationsdata.js");

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

const animations = async () => {
  const query = { items: [] };
  let template = "";
  let end = false;
  while (!end) {
    const name = await queryParams("input", txt.query.name);
    if (name.type !== "") {
      query.animation = name.type;
      query.items.push(`animation-name: ${name.type}`);
      end = true;
    } else {
      console.log(txt.c.haveadd);
    }
  }
  end = false;
  while (!end) {
    const duration = await queryParams("input", txt.query.duration);
    if (duration.type !== "") {
      // query.duration = duration.type;
      query.items.push(`animation-duration: ${duration.type}`);
      end = true;
    } else {
      console.log(txt.c.haveadd);
    }
  }
  const timing = await queryParams("input", txt.query.timing);
  if (timing.type !== "") {
    // query.timing = timing.type;
    query.items.push(`animation-timing-function: ${timing.type}`);
  }
  const delay = await queryParams("input", txt.query.delay);
  if (delay.type !== "") {
    // query.delay = delay.type;
    query.items.push(`animation-delay: ${delay.type}`);
  }
  const iteration = await queryParams("input", txt.query.iteration);
  if (iteration.type !== "") {
    // iteration.iteration = iteration.type;
    query.items.push(`animation-iteration-count: ${iteration.type}`);
  }
  const direction = await queryParams("input", txt.query.direction);
  if (direction.type !== "") {
    // direction.delay = direction.type;
    query.items.push(`animation-direction: ${direction.type}`);
  }
  const fillmode = await queryParams("input", txt.query.fillmode);
  if (fillmode.type !== "") {
    // fillmode.delay = fillmode.type;
    query.items.push(`animation-fill-mode: ${fillmode.type}`);
  }
  const playstate = await queryParams("input", txt.query.playstate);
  if (fillmode.type !== "") {
    // fillmode.delay = fillmode.type;
    query.items.push(`animation-play-state: ${playstate.type}`);
  }
  return query;
};

// const animations = (async () => {
//   if (fs.existsSync(userPath)) {
//     const option = await queryParams("addProp", txt.c.select, [
//       txt.query.create,
//     ]);
//     if (option.type === txt.query.create) {
//       const query = await enterData();
//       console.log(query);
//       // const opp = queryParams("addProp");
//     }
//   } else {
//   }
// })();

module.exports = { animations };
