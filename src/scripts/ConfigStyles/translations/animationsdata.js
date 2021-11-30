const language = require("../../constants/patucoConfig.js").language;
const common = require("./common.js");
const animation = {
  en: {
    c: common,
    query: {
      create: "Create animation",
      className:
        "Enter the name of the class. The name must start with '_'. If the first character is not '_' it will be added automatically: ",
      name: "Enter the name of the animation: ",
      duration: "Enter the duration of the animation:",
      delay: "Enter the animation delay:",
      iteration: "Set How Many Times an Animation Should Run:",
      direction: "Run Animation in Reverse Direction or Alternate Cycles:",
      timing: "Specify the Speed Curve of the Animation",
      fillmode: "Specify the fill-mode for an Animation:",
      addprop: "Add property",
      entercss:
        "Enter a css property and its value. For example: 'display: none': ",
      playstate: "Animation-play-state",
    },
  },
  es: {
    c: common,
    query: {
      create: "Crear animación",
      className:
        "Introduce el nombre de la clase. El nombre tiene que comenzar por '_'. Si el primer caracter no es '_' se añadira automaticamente: ",
      name: "Introduce el nombre de la animación: ",
      duration: "Introduce la duración de la animación:",
      delay: "Introduce el retraso de la animación:",
      iteration: "Establecer cuántas veces debe ejecutarse una animación:",
      direction:
        "Ejecutar animación en dirección inversa o ciclos alternativos:",
      timing: "Especificar la curva de velocidad de la animación:",
      fillmode: "Especificar el modo de relleno para una animación:",
      addprop: "Añadir propiedad",
      entercss:
        "Introduce una propiedad css y su valor. Como por ejemplo: 'display: none': ",
      playstate: "Animation-play-state",
    },
  },
};

module.exports = animation[language];
