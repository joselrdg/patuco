const language = require("../../constants/patucoConfig.js").language;
const common = require("./common.js");
const animation = {
  en: {
    c: common,
    query: {
      create: "Create animation",
      name: "Enter the name of the animation: ",
      duration: "Enter the duration of the animation:",
      delay: "Enter the animation delay:",
      iteration: "Set How Many Times an Animation Should Run:",
      direction: "Run Animation in Reverse Direction or Alternate Cycles:",
      timing: "Specify the Speed Curve of the Animation",
      fillmode: "Specify the fill-mode for an Animation:",
    },
  },
  es: {
    c: common,
    query: {
      create: "Crear animación",
      name: "Introduce el nombre de la animación: ",
      duration: "Introduce la duración de la animación:",
      delay: "Introduce el retraso de la animación:",
      iteration: "Establecer cuántas veces debe ejecutarse una animación:",
      direction:
        "Ejecutar animación en dirección inversa o ciclos alternativos:",
      timing: "Especificar la curva de velocidad de la animación:",
      fillmode: "Especificar el modo de relleno para una animación:",
    },
  },
};

module.exports = animation[language];
