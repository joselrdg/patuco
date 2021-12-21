const language = require("../../constants/patucoConfig.js");
const common = require("../../translations/common.js");
const createClasses = {
  en: {
    c: common,
    query: {
      addclass: "Add a new class: ",
      addCSS: "Add CSS: ",
      //   path: "\nNo stored path found.\nPlease configure the path to your templates\n",
      pathdir:
        "\nThe directory was not found in the stored path.\nConfigure the path of your templates\n",
      entercss:
        "Enter a css property and its value. For example: 'display: none': ",
      addprop: "Add property",
      addpsudo: "Add psudo-element",
      addpsudoms:
        "Enter a pseudo-element, such as: ':: after' ':: first-line'. Or pseudo-classes if you want to add properties to it. Example:': hover ': ",
      addmstyles: "Add more styles to the project ->",
      finisproj: "Finish the project for now",
      inname: "Enter a name to identify it: ",
      iexname: "has already been used to name another class",
      incss: "Enter CSS: ",
      incssms:
        "Enter the name of the class. The name must start with '_'. If the first character is not '_' it will be added automatically: ",
      inchild:
        "Enter the children on which the class will have an effect. For example: 'h1' 'div> span'.\nIf you don't need it, leave it blank: ",
      inpsudo:
        "Enter pseudo-class, like for example: 'hover'.\nIf you don't need it you can leave it blank: ",
      iaddprop: "\nYou have to enter at least one property.\n",
      createanima: "Create animation",
      saveObj: "Save as object",
      saveStr: "Save as string",
    },
  },
  es: {
    c: common,
    query: {
      addclass: "Añadir una nueva clase: ",
      addCSS: "Añadir CSS: ",
      //   path: "\nNo se encotro ruta almacenada.\nConfigura la ruta a tus plantillas\n",
      pathdir:
        "\nNo se encotro el direcctorio el el path almacenado.\nConfigura el path de tus plantillas\n",
      entercss:
        "Introduce una propiedad css y su valor. Como por ejemplo: 'display: none': ",
      addprop: "Añadir propiedad",
      addpsudo: "Añadir psudo-elemento",
      addpsudoms:
        "Introduce un pseudo-elemento, como por ejemplo: '::after' '::first-line'.O pseudo-clases si quieres añadirle propiedades. Ejemplo: ':hover': ",
      addmstyles: "Añadir más estilos al proyecto ->",
      finisproj: "Terminar el proyecto por ahora",
      inname: "Introduce un nombre para identificarlo: ",
      iexname: "ya ha sido utilizado para nombrar otra clase",
      incss: "Introduce CSS: ",
      incssms:
        "Introduce el nombre de la clase. El nombre tiene que comenzar por '_'. Si el primer caracter no es '_' se añadira automaticamente: ",
      inchild:
        "Introduce los hijos sobre los que tendra efecto la clase. Por ejemplo: 'h1' 'div > span'.\nSi no lo necesitas, dejalo en blanco: ",
      inpsudo:
        "Introduce pseudo-clase, como por ejemplo: 'hover'.\nSi no lo necesitas puedes dejarlo en blanco: ",
      iaddprop: "\nTienes que introducir al menos una propiedad.\n",
      createanima: "Crear animación",
      saveObj: "Guardar como objeto",
      saveStr: "Guardar como string",
    },
  },
};

module.exports = createClasses[language.language];
