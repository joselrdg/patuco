const readdirp = require("readdirp");

function filewalker(dir, type, fileFilter, depth, directoryFilter) {
  return new Promise((resolve) => {
    const data = [];
    readdirp(dir, {
      //   directoryFilter: ["!.git", "!*modules"],
      [directoryFilter ? "directoryFilter" : "myFilter"]: directoryFilter,
      [fileFilter ? "fileFilter" : "myFilter"]: fileFilter,
      [depth || depth === 0 ? "depth" : "myFilter"]: depth,
      [type ? "type" : "myFilter"]: type,
      //   type: type,
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

module.exports = filewalker;
