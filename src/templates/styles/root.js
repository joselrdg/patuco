const root = [
  {
    other: `
    @import url("https://fonts.googleapis.com/css2?family=Ranchers&family=Roboto:wght@100&family=Vast+Shadow&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Spartan:wght@300&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@800&display=swap");
    @import url("https://fonts.googleapis.com/css?family=Bentham|Playfair+Display|Raleway:400,500|Suranna|Trocchi");
    @import url("https://fonts.googleapis.com/css2?family=Ranchers&family=Vast+Shadow&display=swap");
    
    :root {
      --primaryfontFamily1: "Spartan";
      --primaryfontFamily2: "'Bentham', serif";
      --primaryfontFamily3: "Vast Shadow";
      --primaryfontFamily4: "Spartan";
      --primaryfontFamily5: "Spartan";
      --secundaryfontFamily1: "Fira Sans";
      --secundaryfontFamily2: "'Raleway', sans-serif";
      --secundaryfontFamily3: "'Playfair Display', serif";
      --secundaryfontFamily4: "Fira Sans";
      --secundaryfontFamily5: "'Trocchi', serif";
      --primary-color1: #666569;
      --color-icon: #8b8b8b;
      --dark-grey: #929292;
      --ligth-grey: #c8c7c7;
      --color-white: white;
      --color-red: #de5246;
      --background-colorBody: #e9eaea;
      --background-color1: #e9eaea;
      --background-color2: #e9eaea;
      --container: 0 9% 0 9%;
    }
    
    
    body {
      font-family: var(--primaryfontFamily1);
      background-color:  var(--background-colorBody);
    }
    
    /* Change the white to any color ;) */
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
    }
    
    /*Change text in autofill textbox*/
    input:-webkit-autofill {
      -webkit-text-fill-color: var(--primary-color1) !important;
    }
    
    .sticky {
      position: fixed;
      top: 0;
      width: 100%;
    }`,
  },
];

module.exports = root;
