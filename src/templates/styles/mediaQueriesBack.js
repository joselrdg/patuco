// higher above --> mayor por encima
// higher below --> mayor por debajo

const mediaQueries = [
  {
    name: "min-width 600px",
    str: "@media only screen and (min-width: 600px)",
    template: true,
  },
  {
    name: "min-width 768px",
    str: "@media only screen and (min-width: 768px)",
    template: true,
  },
  {
    name: "min-width 1200px",
    str: "@media only screen and (min-width: 1200px)",
    template: true,
  },
  {
    name: "max-width 768px",
    str: "@media only screen and (max-width: 768px)",
    template: true,
  },
  {
    name: "max-width 1200px",
    str: "@media only screen and (max-width: 1200px)",
    template: true,
  },
];

//Para separar y ordenar por posicion

// const allMediaQueries = () => {
//   const queriesStr = [];
//   for (let index = 0; index < mediaQueries.length; index++) {
//     const element = mediaQueries[index];
//     queriesStr.push({ name: element.query, str: element.item });
//   }
//   return queriesStr
// };

module.exports = mediaQueries;
