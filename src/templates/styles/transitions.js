const transitions = [
  {
    name: "_grow",
    items: ["transition: all 0.4s ease-in-out"],
    pseudoElement: [
        {
          type: "hover",
          items: ["transform: scale(1.2)"],
        },
      ],
  },
];

module.exports = transitions;
