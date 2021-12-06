const cards = [
  {
    name: "card1_cont",
    items: [
      "box-shadow: 0 0.2em 1em rgba(0, 0, 0, 0.1), 0 1em 2em rgba(0, 0, 0, 0.1)",
      "background: rgb(255, 255, 255)",
      "color: rgb(10, 5, 7)",
      "border-radius: 1em",
      "overflow: hidden",
      "display: grid",
      "grid-template-areas: 'text img'",
      "grid-template-columns: 1fr 1fr;",
      "grid-template-rows: auto",
      "align-items: stretch",
      "outline: var(--card-outline-width) solid lime",
    ],
    pseudoElement: [
      {
        type: " > div",
        items: [
          "grid-area: text",
          "width: 80%",
          "place-self: center",
          "text-align: left",
          "display: grid",
          "gap: 1em",
          "place-items: start",
        ],
      },
      {
        type: " > figure > img",
        items: ["width: 100%", "height: 100%", "object-fit: cover"],
      },
    ],
  },
];

module.exports = cards;
