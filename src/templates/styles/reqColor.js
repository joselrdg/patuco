const fs = require("fs");
const templatesVarPath =
  require("./../../scripts/constants/patucoConfig.js").path.userTemplate +
  "/variables";
const PATUvariablesUser = fs.existsSync(templatesVarPath + "/PATUvariables.js")
  ? require(templatesVarPath + "/PATUvariables.js")
  : require("../../templates/styles/userpatuvar.js");
const CSSvariablesUser = fs.existsSync(templatesVarPath + "/PATUvariables.js")
  ? require(templatesVarPath + "/CSSvariables.js")
  : [];
const patucoVar = require("./patucoVariables");
const CssVar = require("./variables.js");
const variablesPatuco = [...patucoVar, ...PATUvariablesUser];
const cssVariables = { ...CssVar, ...CSSvariablesUser };

var color = {
  primary: "#4d8af0",
  secondary: "#7987a1",
  success: "#42b72a",
  info: "#68afff",
  warning: "#fbbc06",
  danger: "#ff3366",
};

function LightenColor(color, percent) {
  var num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00ff) + amt,
    G = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

var lighterColor = async function (color, store, ratio) {
  return await LightenColor(color, ratio);
};
var darkerColor = async function (color, store, ratio) {
  return await LightenColor(color, ratio * -1);
};

const storedColors = async (color, store) => {
  const storedColor = color.split("-");
  let data = store;
  for (let i = 0; i < storedColor.length; i++) {
    const element = storedColor[i];
    data = data[element];
  }
  return data;
};

function contrastYiq(color) {
  const r = (color >>> 16) & 0xff;
  const g = (color >>> 8) & 0xff;
  const b = color & 0xff;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 0x0 : 0xffffff;
}

const buildColors = async (store, prevcolors, action, props = []) => {
  const data = { prevcolors, newcolors: [] };
  for (let i = 0; i < prevcolors.length; i++) {
    const prevcolor = prevcolors[i];
    const newColor = await action(prevcolor, store, ...props);
    data.newcolors.push(newColor);
  }
  return data;
};

const searchCssVar = async (variable) => {
  let result = "";
  for (const key in cssVariables) {
    if (key === variable) {
      result = cssVariables[key];
      break;
    }
  }
  console.log("es iguaaaal", result);
  return result;
};

const cVP = async (id, colors = [{ id: "", colors: [], action, props }]) => {
  const newData = [];
  const store = variablesPatuco.find((v) => v._id === id);
  for (let i = 0; i < colors.length; i++) {
    const e = colors[i];
    switch (e.action) {
      case "store":
        const storeColors = await buildColors(store, e.colors, storedColors);
        newData.push(storeColors);
        break;
      case "cssVar":
        const cssV = await buildColors(store, e.colors, searchCssVar);
        newData.push(cssV);
        break;
      case "darker":
        const darkerC = await buildColors(
          store,
          e.colors,
          darkerColor,
          e.props
        );
        newData.push(darkerC);
        break;
      case "lighter":
        const lighterC = await buildColors(
          store,
          e.colors,
          lighterColor,
          e.props
        );
        newData.push(lighterC);
        break;
      case "contrastYiq":
        const contrastYiqColors = await buildColors(
          store,
          e.colors,
          contrastYiq
        );
        newData.push(contrastYiqColors);
        break;
      default:
        break;
    }
  }
  return newData;
};

module.exports = cVP;
