const inquirer = require("inquirer");
const readdirp = require("readdirp");
const chalk = require("chalk");
const fs = require("fs");
const baseCss = require("../../templates/styles/baseCss.js");
const pathBase = process.cwd();

function filewalker(dir, type, myFilter) {
  return new Promise((resolve) => {
    const data = [];
    readdirp(dir, {
      directoryFilter: ["!.git", "!*modules"],
      [myFilter ? "fileFilter" : "myFilter"]: myFilter,
      type: type,
      alwaysStat: true,
    })
      .on("data", (entry) => {
        const {
          path,
          stats: { size },
        } = entry;
        data.push({ path, size });
      })
      .on("warn", (error) => console.error("non-fatal error", error))
      .on("error", (error) => console.error("fatal error", error))
      .on("end", () => resolve(data));
  });
}

const queryParams = (type, choices = []) => {
  const message = {
    direcctories: {
      name: "type",
      type: "list",
      message: "Selecciona el directorio a analizar: ",
      choices: [...choices.map((d) => d.path), "Añadir ruta manualmente"],
    },
    typeFile: {
      name: "file",
      type: "input",
      message:
        "Escribe las extensiones de los archivos separadas por ',' si no escribes nada se analizaran todos los archivos: ",
    },
    typeClass: {
      name: "type",
      type: "list",
      message: "Selecciona el directorio a analizar: ",
      choices: ["class", "className"],
    },
  };
  const qs = [message[type]];
  return inquirer.prompt(qs);
};

const analyzeRoute = async (path) => {
  const typeFile = await queryParams("typeFile");
  let filter = undefined;
  if (typeFile.file !== "") {
    filter = typeFile.file
      .replace(" ", "")
      .split(",")
      .map((item) => `*.${item}`);
  }
  const files = await filewalker(path.type, "files", filter);
  return files;
};

// const readStyles = (stylesPath) => {
//   return new Promise((resolve) => {
//     let stylesPatuco = [];
//     for (let index = 0; index < stylesPath.length; index++) {
//       const elementPath = `./style/${stylesPath[index].path}`;
//       const nameFile = stylesPath[index].path.slice(
//         0,
//         stylesPath[index].path.indexOf(".css")
//       );
//       const file = fs.readFileSync(elementPath, "utf-8");
//       console.log(elementPath);
//     }
//     // console.log(stylesPatuco);
//     resolve(stylesPatuco);
//   });
// };
const readStyles = async (file, savedClasses, counter) => {
  for (const key in baseCss) {
    const arr = baseCss[key];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name) {
        const regex = new RegExp(arr[i].name, "g");
        if (regex.test(file)) {
          counter.push('')
          const someClass = savedClasses.some(
            (arrVal) => arr[i].name === arrVal.name
          );
          !someClass && savedClasses.push(arr[i]);
        }
      }
    }
  }
};
const openFiles = async (direcPath, filePath) => {
  const savedClasses = [];
  const counter = [];
  for (let index = 0; index < filePath.length; index++) {
    const file = fs.readFileSync(
      `${pathBase}/${direcPath}/${filePath[index].path}`,
      "utf-8"
    );
    if (/class=/g.test(file) || /className=/g.test(file)) {
      await readStyles(file, savedClasses, counter);
    }
  }
  console.log(`- Total clases encontradas: ${chalk.red.bold(counter.length)}
- Total sin repetir: ${chalk.green.bold(savedClasses.length)}`);
};

const createCSS = (async () => {
  // console.log(baseCss)
  const direcctories = await filewalker(".", "directories");
  const direcPath = await queryParams("direcctories", direcctories);
  const filePath = await analyzeRoute(direcPath);
  const savedClasses = await openFiles(direcPath.type, filePath);
})();

module.exports.createCSS = createCSS;
