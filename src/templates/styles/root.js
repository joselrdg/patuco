const variables = require("./variables.js");

console.log(variables);

const fonts = () => {
  let str = "";
  variables.fonts.forEach((element) => {
    str = str + `${element}; `;
  });
  return str;
};

const root = [
  {
    other: `
    ${fonts()};
    
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
