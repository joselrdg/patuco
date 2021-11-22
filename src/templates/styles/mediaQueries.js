// higher above --> mayor por encima
// higher below --> mayor por debajo

const mediaQueries = [
  {
    query: "min-width 600px",
    location: { loc: "higher below", num: 600 },
    item: "@media only screen and (min-width: 600px)",
  },
  {
    query: "min-width 768px",
    location: { loc: "higher below", num: 768 },
    item: "@media only screen and (min-width: 768px)",
  },
  {
    query: "min-width 1200px",
    location: { loc: "higher below", num: 1200 },
    item: "@media only screen and (min-width: 1200px)",
  },
  {
    query: "max-width 768px",
    location: { loc: "higher below", num: 768 },
    item: "@media only screen and (max-width: 768px)",
  },
  {
    query: "max-width 1200px",
    location: { loc: "higher below", num: 1200 },
    item: "@media only screen and (max-width: 1200px)",
  },
];

//Para separar y ordenar por posicion
const separateByName = async (separateQueries) => {};

const allMediaQueries = () => {
  const queriesStr = [];
  for (let index = 0; index < mediaQueries.length; index++) {
    const element = mediaQueries[index];
    queriesStr.push({ name: element.query, str: element.item });
  }
  return queriesStr
};

module.exports = allMediaQueries;
