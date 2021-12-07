const fs = require("fs");
const chalk = require("chalk");
const queryParams = require("../common/queryParams.js");
const filewalker = require("../common/filewalker.js");
const pathBase = process.cwd();
const layoutsUserPath =
  require("../constants/patucoConfig.js").path.userTemplate + "/layouts";
const layoutsPath =
  require("../constants/patucoConfig.js").path.patucoModule +
  "/src/templates/layouts";

const txt = require("./translations/injectComponentAutoTxt.js");

const writeFiles = async (file, component, fileComponentName, targetFile) => {
  console.log("Writing...");
  try {
    const dataFile = file.replace(fileComponentName, component);
    fs.writeFileSync(targetFile, dataFile);
  } catch (err) {
    console.error(err);
  } finally {
    console.log(txt.c.createdOk);
  }
};

const leadFilesTarget = async () => {
  const options = { type: "files", directoryFilter: ["!.git"] };
  const filter = await queryParams("input", txt.q.iextension);
  if (filter.type !== "") {
    options.fileFilter = filter.type;
  }
  const files = await filewalker(pathBase, options);
  return files.map((e) => e.path);
};

const leadTemplates = async (path, query) => {
  const options = { type: "files", directoryFilter: ["!.git"] };
  if (query) {
    const filter = await queryParams("input", txt.q.itemplates);
    if (filter.type !== "") {
      options.fileFilter = filter.type;
    }
  }
  const files = await filewalker(path, options);

  return files.map((e) => path + "/" + e.path);
};

const searchComponents = async (targetFile, componetKey) => {
  const file = await fs.readFileSync(targetFile, "utf-8");
  if (file.includes(`${`<_p(${componetKey})p_>`}`)) {
    console.log(
      txt.q.component +
        chalk.blue.bold(componetKey) +
        inject +
        chalk.blueBright(targetFile) +
        "\n"
    );
    return file;
  } else return false;
};

const injectComponent = async () => {
  let noComponent = true;
  const targetFiles = await leadFilesTarget();
  const componetsFiles = await leadTemplates(layoutsPath, true);
  if (fs.existsSync(layoutsUserPath)) {
    const componetsUser = await leadTemplates(layoutsUserPath);
    if (componetsUser[0]) {
      componetsFiles.push(...componetsUser);
    }
  }
  for (let i = 0; i < targetFiles.length; i++) {
    const targetFile = pathBase + "/" + targetFiles[i];
    for (let index = 0; index < componetsFiles.length; index++) {
      const componetKey = componetsFiles[index].split("/").pop();
      let end = false;
      while (!end) {
        const isComponent = await searchComponents(targetFile, componetKey);
        if (isComponent) {
          noComponent = false;
          const component = await fs.readFileSync(
            componetsFiles[index],
            "utf-8"
          );
          await writeFiles(
            isComponent,
            component,
            `<_p(${componetKey})p_>`,
            targetFile
          );
        } else end = true;
      }
    }
  }
  if (noComponent) {
    console.log(chalk.red.italic(txt.q.nocomponent));
  }
};

module.exports = injectComponent;
