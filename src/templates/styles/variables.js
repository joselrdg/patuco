const fs = require("fs");
const color = require("./varColor");



const variables = {
  "fonts": [
    "@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap')",
    "@import url('https://fonts.googleapis.com/css2?family=Spartan:wght@300&display=swap')",
    "@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@800&display=swap')",
  ],
  "primaryfontFamily1": "Roboto",
  "primaryfontFamily2": "Spartan",
  "primaryfontFamily3": "Spartan",
  "primaryfontFamily4": "Spartan",
  "primaryfontFamily5": "Spartan",
  "secundaryfontFamily1": "Spartan",
  "secundaryfontFamily2": "Spartan",
  "secundaryfontFamily3": "Spartan",
  "secundaryfontFamily4": "Spartan",
  "secundaryfontFamily5": "Spartan",
  "primary-color1": "#666569",
  "color-icon": "#8b8b8b",
  "dark-grey": "#929292",
  "ligth-grey": "#c8c7c7",
  "color-white": color.colorWhite,
  "color-red": color.redGg,
  "background-colorBody": color.backgroundColor,
  "background-color1": "#45efb5",
  "background-color2": "#e9eaea",
  "container": "15%",
  "card-outline-width": "1px",
  "primary-color_-0": color.primaryVerde,
  "primary-color_-1": color.primaryMorado,
  "primary-color_-2":  color.primaryDorado,
  "primary-color_-3":  color.primaryRosa,
  "primary-color_-4":  color.primaryGris,
  "spacer_-0": '0',
  "spacer_-1": '1rem',
  "spacer_-2": '2rem',
  "spacer_-3": '3rem',
  "spacer_-4": '4rem',
  "spacer_-5": '5rem',
  "spacer-K-s_-0": '0',
  "spacer-K-s_-1": '0.2rem',
  "spacer-K-s_-2": '0.3rem',
  "spacer-K-s_-3": '0.4rem',
  "spacer-K-s_-4": '0.5rem',
  "spacer-K-s_-5": '0.8rem',
  "background-color_-0": color.primaryColor0,
  "background-color_-1": color.primaryColor1,
  "background-color_-2": color.primaryColor2,
  "background-color_-3": color.primaryColor3,
  "button-background-color_-0": color.primaryColor0,
  "button-background-color_-1": color.primaryColor1,
  "button-background-color_-2": color.primaryColor2,
  "button-background-color_-3": color.primaryColor3,
  "input-background-color_-0": color.primaryColor1,
  "input-background-color_-1": color.primaryColor2,
  "input-background-color_-2": color.primaryColor3,
  "input-border-bottom-color_-0": "#ccc",
  "input-border-bottom-color_-1": color.primaryColor1,
  "input-border-bottom-color_-2": color.primaryColor0,
  "button-background-gradient_-0": "linear-gradient(to bottom right, #EF4765, #FF9A5A)",
  "button-background-gradient_-1": "linear-gradient(to bottom right, #4766ef, #5ad0ff)",
  "button-box-shadow_-0": "0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5)",
};

module.exports = variables;
