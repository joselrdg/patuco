// const variables = require("./variables.js");
const fs = require("fs");
const chalk = require("chalk");
const requireUncached = require("../../scripts/requireUncached.js");

const modulePatucoPath = require("../../scripts/constants/patucoConfig.js").path
  .patucoModule;
const pathBase = process.cwd();
const path = `${pathBase}/patuco/variables.js`;
const patucoPathVariables = `${modulePatucoPath}/src/templates/styles/variables.js`;
const variables = requireUncached(
  fs.existsSync(path) ? path : patucoPathVariables
);
// const variables = require(fs.existsSync(path) ?  path : './variables.js');

const fonts = () => {
  let str = "";
  variables.fonts.forEach((element) => {
    str = str + `${element};\n`;
  });
  return str;
};

console.log(chalk.bold.green("baseCss actualizado"));

const root = [
  {
    name: "root",
    variables: [
      "primaryfontFamily1",
      "primaryfontFamily2",
      "primaryfontFamily3",
      "primaryfontFamily4",
      "primaryfontFamily5",
      "secundaryfontFamily1",
      "secundaryfontFamily2",
      "secundaryfontFamily3",
      "secundaryfontFamily4",
      "secundaryfontFamily5",
      "primary-color1",
      "color-icon",
      "dark-grey",
      "ligth-grey",
      "color-white",
      "color-red",
      "background-colorBody",
      "background-color1",
      "background-color2",
      "container",
    ],
    template: `
${fonts()}
    
:root {
  --primaryfontFamily1: ${variables.primaryfontFamily1};
  --primaryfontFamily2: ${variables.primaryfontFamily2};
  --primaryfontFamily3: ${variables.primaryfontFamily3};
  --primaryfontFamily4: ${variables.primaryfontFamily4};
  --primaryfontFamily5: ${variables.primaryfontFamily5};
  --secundaryfontFamily1: ${variables.primaryfontFamily1};
  --secundaryfontFamily2: ${variables.primaryfontFamily2};
  --secundaryfontFamily3: ${variables.primaryfontFamily3};
  --secundaryfontFamily4: ${variables.primaryfontFamily4};
  --secundaryfontFamily5: ${variables.primaryfontFamily5};
  --primary-color1: ${variables.primaryColor1};
  --color-icon: ${variables.iconColor};
  --dark-grey: ${variables.darkGrey};
  --ligth-grey: ${variables.ligthGrey};
  --color-white: ${variables.colorWhite};
  --color-red: ${variables.colorRed};
  --background-colorBody: ${variables.backgroundColorBody};
  --background-color1: ${variables.backgroundColor1};
  --background-color2: ${variables.backgroundColor2};
  --container: ${variables.container};
}
    
    
body {
  font-family: var(--primaryfontFamily1);
  background-color:  var(--background-colorBody);
}
    
/* Change the white to any color ;) */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}
    
/*Change text in autofill textbox*/
input:-webkit-autofill {
  -webkit-text-fill-color: var(--primary-color1) !important;
}
    
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}`,
  },
];

module.exports = root;
