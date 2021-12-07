const fs = require("fs");

const modulePatucoPath =
  require("../../scripts/constants/patucoConfig.js").path;
const pathUser = modulePatucoPath.userTemplate;
const isPath = fs.existsSync(
  `${modulePatucoPath.userTemplate}/classes/base.js`
);

const root = require("./root.js");
const grid = require("./grid.js");
const background = require("./background.js");
const border = require("./border.js");
const boxshadow = require("./boxshadow.js");
const color = require("./color.js");
const cursor = require("./cursor.js");
const flex = require("./flex.js");
const font = require("./font.js");
const hover = require("./hover.js");
const letter = require("./letter.js");
const margin = require("./margin.js");
const padding = require("./padding.js");
const position = require("./position.js");
const size = require("./size.js");
const transform = require("./transform.js");
const transitions = require("./transitions");
const animation_classes = require("./animationClasses");
const Style_Components = require("./styleComponents/baseStyleComponents.js");

const Styles_User = require(pathUser && isPath
  ? `${pathUser}/classes/base.js`
  : "./stylesUser.js");

if (!isPath) {
  console.log(
    "\nNo existe el directorio 'patucoTemplates/classes'. Se creara al añadir una nueva clase\n"
  );
}

// console.log(chalk.bold.green("baseCss actualizado"));

const baseCss = {
  root,
  grid,
  // ...requireUncached(
  //   pathUser && isPath ? `${pathUser}/classes/base.js` : "./stylesUser.js"
  // ),
  ...Styles_User,
  background,
  border,
  boxshadow,
  color,
  cursor,
  flex,
  font,
  hover,
  letter,
  margin,
  padding,
  position,
  size,
  transform,
  transitions,
  animation_classes,
  ...Style_Components
};

module.exports = baseCss;
