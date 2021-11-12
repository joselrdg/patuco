const inquirer = require("inquirer");
const readdirp = require("readdirp");

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
      message: "Selecciona el tipo de elemento a crear: ",
      choices: [...choices.map((d) => d.path), "Añadir ruta manualmente"],
    },
    typeFile: {
      name: "fileName",
      type: "input",
      message: "Escribe la extension del fichero del fichero: ",
    },
  };
  const qs = [message[type]];
  return inquirer.prompt(qs);
};

const analyzeRoute = async (path) => {
  const typeFile = await queryParams("typeFile");
  let filter = "";
  if (typeFile.fileName !== "") {
    console.log(typeFile);
  }
  const files = await filewalker(
    path.type,
    "files",
    typeFile.fileName === "" ? undefined : "js"
  );
  console.log(files);
};

const createCSS = (async () => {
  const direcctories = await filewalker(".", "directories");
  const path = await queryParams("direcctories", direcctories);
  const data = await analyzeRoute(path);
})();

module.exports.createCSS = createCSS;
