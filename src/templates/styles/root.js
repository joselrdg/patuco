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
}

/* Custom CSS reset by @alindeveloper */

/* Use a more-intuitive box-sizing model. */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin all elements */
* {
  margin: 0;
}

/* Prevent adjustments of font size after orientation changes in iOS */
html {
  -webkit-text-size-adjust: 100%;
}

/* Allow percentage-based heights */
html,
body {
  height: 100%;
}

/* Typographic tweaks */
body {
  line-height: calc(1em + 0.5rem);
  text-rendering: optimizeSpeed;
  -webkit-font-smoothing: antialiased;
}

/* Avoid text overflows */
h1,
h2,
h3,
h4,
h5,
h6,
p {
  overflow-wrap: break-word;
}

/* Remove list styles on ul, ol elements with a list role */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Improve media defaults */
img,
picture,
video,
canvas,
svg,
iframe {
  display: block;
  max-width: 100%;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Single taps are dispatched immediately on clickable elements */
a,
area,
button,
input,
label,
select,
summary,
textarea,
[tabindex] {
  -ms-touch-action: manipulation;
  touch-action: manipulation;
}

/* Remove built-in form typography styles */
input,
button,
textarea,
select {
  font: inherit;
}

/* Add the correct font weight in Chrome, Edge, and Safari. */
strong {
  font-weight: bolder;
}

/* Correct the inability to style buttons in iOS and Safari. */
:where(button, [type='button' i], [type='reset' i], [type='submit' i]) {
  -webkit-appearance: button;
}

/* Correct small font size in all browsers. */
small {
  font-size: 80%;
}

/* Table adjustments */
table {
  border-collapse: collapse;
  border-spacing: 0;
  caption-side: bottom;
}

/* revert the 'white-space' property for textarea elements on Safari */
textarea {
  white-space: revert;
}

@media (prefers-reduced-motion: no-preference) {
  html:focus-within {
    scroll-behavior: smooth;
  }
}

/*  Remove all animations, transitions and smooth scroll */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`,


  },
];

module.exports = root;
