const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const animation = {
  en: {
    c: common,
    query: {
      create: "Create animation",
      name: "Enter the name of the animation: ",
      nameused: "has already been used to name another animation.",
      fronto: "From - To",
      timep: "Time in percentage",
      addpropFrom: "Add property to: From",
      addpropTo: "Add property to: To",
      iaddprop: "\nYou have to enter at least one property.\n",
      entercss:
        "Enter a css property and its value. For example: 'display: none': ",
      addprop: "Add property",
      addpercentage: "Add percentage",
      percentage: "Enter a percentage:",

      className:
        "Enter the name of the class. The name must start with '_'. If the first character is not '_' it will be added automatically: ",
      duration: "Enter the duration of the animation:",
      delay: "Enter the animation delay:",
      iteration: "Set How Many Times an Animation Should Run:",
      direction: "Run Animation in Reverse Direction or Alternate Cycles:",
      timing: "Specify the Speed Curve of the Animation",
      fillmode: "Specify the fill-mode for an Animation:",
      addprop: "Add property",
      playstate: "Animation-play-state",
    },
  },
  es: {
    c: common,
    query: {
      create: "Crear animación",
      name: "Introduce el nombre de la animación: ",
      nameused: "ya ha sido utilizado para nombrar otra animación.",
      fronto: "Desde - A",
      timep: "Tiempo en porcentaje",
      addpropFrom: "Añadir propiedad a: From",
      addpropTo: "Añadir propiedad a: To",
      iaddprop: "\nTienes que introducir al menos una propiedad.\n",
      entercss:
        "Introduce una propiedad css y su valor. Como por ejemplo: 'display: none': ",
      addprop: "Añadir propiedad",
      addpercentage: "Añadir porcentaje",
      percentage: "Introduce un porcentaje:",

      className:
        "Introduce el nombre de la clase. El nombre tiene que comenzar por '_'. Si el primer caracter no es '_' se añadira automaticamente: ",
      duration: "Introduce la duración de la animación:",
      delay: "Introduce el retraso de la animación:",
      iteration: "Establecer cuántas veces debe ejecutarse una animación:",
      direction:
        "Ejecutar animación en dirección inversa o ciclos alternativos:",
      timing: "Especificar la curva de velocidad de la animación:",
      fillmode: "Especificar el modo de relleno para una animación:",
      addprop: "Añadir propiedad",
      playstate: "Animation-play-state",
    },
  },
};

module.exports = animation[language];
