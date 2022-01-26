const grid = [
  // {
  //   comment: "/* For tablets: */",
  //   query: "min-width 600px",
  // },
  {
    name: "grind",
    template: `      
[class*="_col_"] {
  float: left;
  /* padding: 15px; */
}

[class*="floatCl_"] {
  float: left;
  /* padding: 15px; */
}
      
/* For mobile phones: */
[class*="_col_"] {
  width: 100%;
}
      
[class*="floatCl_"] {
  width: 90%;
  left: calc(50% - (90% / 2));
} 

@media (min-width: 640px) {
  .container {
    max-width: 640px
  }

.sm\:flex {
  display: flex;
}

.sm\:w-1\/3 {
  width: 33%;
}

.sm\:w-2\/3 {
  width: 66%;
}
}

@media (min-width: 768px) {
.container {
  max-width: 768px;
}

.md\:w-1\/3 {
  width: 33%;
}

.md\:w-2\/3 {
  width: 66%;
}

.md\:w-770 {
  width: 770px;
}
}
`,
  },
  {
    name: "_vh1",
    items: ["height: 100vh"],
  },
  {
    name: "_vw1",
    items: ["width: 100vw"],
  },
  {
    name: "_cont",
    items: ["margin: 0 var(--container)"],
    query: "min-width 768px",
    pseudoElement: [
      {
        type: '',
        items: ["margin: 0 20px"]
      },
    ],
  },
  {
    name: "_row",
    items: ["display: flex", "flex-wrap: wrap", "justify-content: center"],
    pseudoElement: [
      {
        type: "after",
        items: ["content: ''", "clear: both", "display: table"],
      },
    ],
  },

  {
    name: "_col_s_1",
    items: ["width: 8.33%"],
    query: "min-width 600px",
  },
  {
    name: "_col_s_2",
    items: ["width: 16.66%"],
    query: "min-width 600px",
  },
  {
    name: "_col_s_3",
    items: ["width: 25%"],
    query: "min-width 600px",
  },
  {
    name: "_col_s_4",
    items: ["width: 33.33%"],
    query: "min-width 600px",
  },
  {
    name: "_col_s_5",
    items: ["width: 41.66%"],
    query: "min-width 600px",
  },
  {
    name: "_col_s_6",
    items: ["width: 50%"],
    query: "min-width 600px",
  },
  {
    name: "_col_s_7",
    items: ["width: 58.33%"],
    query: "min-width 600px",
  },
  {
    name: "_col_s_8",
    items: ["width: 66.66%"],
    query: "min-width 600px",
  },
  {
    name: "_col_s_9",
    items: ["width: 75%"],
    query: "min-width 600px",
  },
  {
    name: "_col_s_10",
    items: ["width: 83.33%"],
    query: "min-width 600px",
  },
  {
    name: "_col_s_11",
    items: ["width: 91.66%"],
    query: "min-width 600px",
  },
  {
    name: "_col_s_12",
    items: ["width: 16.66%"],
    query: "min-width 600px",
  },

  {
    name: "floatCl_s_1",
    items: ["width: 8.33%", "left: calc(50% - (8.33% / 2))"],
    query: "min-width 600px",
  },
  {
    name: "floatCl_s_2",
    items: ["width: 16.66%", "left: calc(50% - (16.66% / 2))"],
    query: "min-width 600px",
  },
  {
    name: "floatCl_s_3",
    items: ["width: 25%", "left: calc(50% - (25% / 2))"],
    query: "min-width 600px",
  },
  {
    name: "floatCl_s_4",
    items: ["width: 33.33%", "left: calc(50% - (33.33% / 2))"],
    query: "min-width 600px",
  },
  {
    name: "floatCl_s_5",
    items: ["width: 41.66%", "left: calc(50% - (41.66% / 2))"],
    query: "min-width 600px",
  },
  {
    name: "floatCl_s_6",
    items: ["width: 50%", "left: calc(50% - (50% / 2))"],
    query: "min-width 600px",
  },
  {
    name: "floatCl_s_7",
    items: ["width: 58.33%", "left: calc(50% - (58.33% / 2))"],
    query: "min-width 600px",
  },
  {
    name: "floatCl_s_8",
    items: ["width: 66.66%", "left: calc(50% - (66.66% / 2))"],
    query: "min-width 600px",
  },
  {
    name: "floatCl_s_9",
    items: ["width: 75%", "left: calc(50% - (75% / 2))"],
    query: "min-width 600px",
  },
  {
    name: "floatCl_s_10",
    items: ["width: 83.33%", "left: calc(50% - (83.33% / 2))"],
    query: "min-width 600px",
  },
  {
    name: "floatCl_s_11",
    items: ["width: 91.66%", "left: calc(50% - (91.66% / 2))"],
    query: "min-width 600px",
  },
  {
    name: "floatCl_s_12",
    items: ["width: 100%", "left: calc(50% - (100% / 2))"],
    query: "min-width 600px",
  },
  /* For desktop: */
  {
    name: "_col_1",
    items: ["width: 8.33%"],
    query: "min-width 768px",
  },
  {
    name: "_col_2",
    items: ["width: 16.66%"],
    query: "min-width 768px",
  },
  {
    name: "_col_3",
    items: ["width: 25%"],
    query: "min-width 768px",
  },
  {
    name: "_col_4",
    items: ["width: 33.33%"],
    query: "min-width 768px",
  },
  {
    name: "_col_5",
    items: ["width: 41.66%"],
    query: "min-width 768px",
  },
  {
    name: "_col_6",
    items: ["width: 50%"],
    query: "min-width 768px",
  },
  {
    name: "_col_7",
    items: ["width: 58.33%"],
    query: "min-width 768px",
  },
  {
    name: "_col_8",
    items: ["width: 66.66%"],
    query: "min-width 768px",
  },
  {
    name: "_col_9",
    items: ["width: 75%"],
    query: "min-width 768px",
  },
  {
    name: "_col_10",
    items: ["width: 83.33%"],
    query: "min-width 768px",
  },
  {
    name: "_col_11",
    items: ["width: 91.66%"],
    query: "min-width 768px",
  },
  {
    name: "_col_12",
    items: ["width: 16.66%"],
    query: "min-width 768px",
  },

  {
    name: "floatCl_12",
    items: ["width: 100%", "left: calc(50% - (100% / 2))"],
    query: "min-width 768px",
  },

  {
    name: "media_mr_0",
    items: ["margin-right: 0rem"],
    query: "min-width 768px",
  },
  {
    name: "media_mr_1",
    items: ["margin-right: 1rem"],
    query: "min-width 768px",
  },
  {
    name: "media_mr_2",
    items: ["margin-right: 2rem"],
    query: "min-width 768px",
  },
  {
    name: "media_mr_3",
    items: ["margin-right: 3rem"],
    query: "min-width 768px",
  },
  {
    name: "media_mr_4",
    items: ["margin-right: 4rem"],
    query: "min-width 768px",
  },
  {
    name: "media_mr_5",
    items: ["margin-right: 5rem"],
    query: "min-width 768px",
  },

  {
    name: "_col_l_1",
    items: ["width: 8.33%"],
    query: "min-width 1200px",
  },
  {
    name: "_col_l_2",
    items: ["width: 8.33%"],
    query: "min-width 1200px",
  },
  {
    name: "_col_l_3",
    items: ["width: 25%"],
    query: "min-width 1200px",
  },
  {
    name: "_col_l_4",
    items: ["width: 33.33%"],
    query: "min-width 1200px",
  },
  {
    name: "_col_l_5",
    items: ["width: 41.66%"],
    query: "min-width 1200px",
  },
  {
    name: "_col_l_6",
    items: ["width: 50%"],
    query: "min-width 1200px",
  },
  {
    name: "_col_l_7",
    items: ["width: 58.33%"],
    query: "min-width 1200px",
  },
  {
    name: "_col_l_8",
    items: ["width: 66.66%"],
    query: "min-width 1200px",
  },
  {
    name: "_col_l_9",
    items: ["width: 75%"],
    query: "min-width 1200px",
  },
  {
    name: "_col_l_10",
    items: ["width: 83.33%"],
    query: "min-width 1200px",
  },
  {
    name: "_col_l_11",
    items: ["width: 91.66%"],
    query: "min-width 1200px",
  },
  {
    name: "_col_l_12",
    items: ["width: 16.66%"],
    query: "min-width 1200px",
  },

  {
    name: "floatCl_l_1",
    items: ["width: 8.33%", "left: calc(50% - (8.33% / 2))"],
    query: "min-width 1200px",
  },
  {
    name: "floatCl_l_2",
    items: ["width: 16.66%", "left: calc(50% - (16.66% / 2))"],
    query: "min-width 1200px",
  },
  {
    name: "floatCl_l_3",
    items: ["width: 25%", "left: calc(50% - (25% / 2))"],
    query: "min-width 1200px",
  },
  {
    name: "floatCl_l_4",
    items: ["width: 33.33%", "left: calc(50% - (33.33% / 2))"],
    query: "min-width 1200px",
  },
  {
    name: "floatCl_l_5",
    items: ["width: 41.66%", "left: calc(50% - (41.66% / 2))"],
    query: "min-width 1200px",
  },
  {
    name: "floatCl_l_6",
    items: ["width: 50%", "left: calc(50% - (50% / 2))"],
    query: "min-width 1200px",
  },
  {
    name: "floatCl_l_7",
    items: ["width: 58.33%", "left: calc(50% - (58.33% / 2))"],
    query: "min-width 1200px",
  },
  {
    name: "floatCl_l_8",
    items: ["width: 66.66%", "left: calc(50% - (66.66% / 2))"],
    query: "min-width 1200px",
  },
  {
    name: "floatCl_l_9",
    items: ["width: 75%", "left: calc(50% - (75% / 2))"],
    query: "min-width 1200px",
  },
  {
    name: "floatCl_l_10",
    items: ["width: 83.33%", "left: calc(50% - (83.33% / 2))"],
    query: "min-width 1200px",
  },
  {
    name: "floatCl_l_11",
    items: ["width: 91.66%", "left: calc(50% - (91.66% / 2))"],
    query: "min-width 1200px",
  },
  {
    name: "floatCl_l_12",
    items: ["width: 100%", "left: calc(50% - (100% / 2))"],
    query: "min-width 1200px",
  },

  {
    name: "media_l_mr_0",
    items: ["margin-right: 0rem"],
    query: "min-width 1200px",
  },
  {
    name: "media_l_mr_1",
    items: ["margin-right: 1rem"],
    query: "min-width 1200px",
  },
  {
    name: "media_l_mr_2",
    items: ["margin-right: 2rem"],
    query: "min-width 1200px",
  },
  {
    name: "media_l_mr_3",
    items: ["margin-right: 3rem"],
    query: "min-width 1200px",
  },
  {
    name: "media_l_mr_4",
    items: ["margin-right: 4rem"],
    query: "min-width 1200px",
  },
  {
    name: "media_l_mr_5",
    items: ["margin-right: 5rem"],
    query: "min-width 1200px",
  },
];

module.exports = grid;
