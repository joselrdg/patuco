const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const createMediaQ = {
  en: {
    c: common,
    query: {
      select: "Select by name or by media query: ",
      sname: "Select by name",
      smq: "Select by media query",
      iname:
        "\nThe name cannot be edited, this media query is used for the grid",
      name: "Enter a name so that you can add your classes to the media query: ",
      wname: "is already in use. Use another name.",
      inewmq: "Enter the new media query: ",
      worder:
        "\nThe media queries will appear in the final css file in the same order in which they are added.\n",
      saved: "\nMedia queries saved: \n",
      create: "Create media query",
      edit: "Editar media query",
    },
  },
  es: {
    c: common,
    query: {
      select: "Selecciona por nombre o por media query: ",
      sname: "Seleccionar por nombre",
      smq: "Seleccionar por media query",
      iname:
        "\nNo se puede editar el nombre, ya que está media query es utilizada para la cuadricula",
      name: "Introduce un nombre para que puedas añadir tus clases a la media query: ",
      wname: "ya está en uso. Utiliza otro nombre.",
      inewmq: "Introduce la nueva media query: ",
      worder:
        "\nLas media queries apareceran en el archivo css final en el mismo orden en el que se añadan\n",
      saved: "\nMedia queries guardadas: \n",
      create: "Crear media query",
      edit: "Editar media query",
    },
  },
};

module.exports = createMediaQ[language];
