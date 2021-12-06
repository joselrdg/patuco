const cVP = require("./reqColor.js");

// const regex = new RegExp(variableReg, "i");
// const isRegex = async (regex, key) => {
//   const is = regex.test(key);
//   return is;
// };

const organizeData = async (data) => {
  data = data.replace(/ /g, "").split(",");
  const type = data[0];
  const action = data[1];
  const collection = data[2];
  const color = data[3].split("|");
  const props = data[4] ? data[4].split("|") : undefined;
  if (type === "_cVP") {
    const resColor = await cVP(collection, [{ colors: color, action, props }]);
    return resColor[0].newcolors[0];
  }
};

const searchFunctions = async (str) => {
  const isOpen = [];
  for (let i = 0; i < str.length; i++) {
    const element = str[i] + str[i + 1];
    if (element === "((") {
      isOpen.push({ state: "open", index: i });
    } else if (element === "))") {
      isOpen.push({ state: "clouse", index: i });
    }
  }
};

// const requestVarPatu = async (request) => {
//   console.log(request);
//   const ind = request.indexOf("((");
//   let key = request.slice(0, ind);
//   await searchFunctions(request);
//   return key;
// };

const requestVarPatu = async (request) => {
  request = request.replace(/\(\(/g, "<").replace(/\)\)/g, ">");
  const key = request.slice(0, request.indexOf("<"));
  let property = request.slice(request.indexOf("<"));
  while (/[<>]/g.test(property)) {
    let data = property.slice(0, property.indexOf(">") + 1);
    data = data.slice(data.lastIndexOf("<"));
    const outcome = await organizeData(data.slice(1, data.length - 1));
    property = property.replace(data, outcome);
  }
  console.log(key + " = " + property);
  return key + property;
};

module.exports = requestVarPatu;

// cVP("example", ["theme-primary"], "store");

// const fun = async () => {
//   console.log(
//     await cVP("example", [
//       { id: 1, colors: ["theme-primary"], action: "store" },
//     ])
//   );
// };

// fun();
