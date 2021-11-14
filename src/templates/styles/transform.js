const transform = [
  {
    name: "_tt_u",
    items: ["text-transform: uppercase"],
  },
  {
    name: "rotate90",
    items: [
      "-webkit-transform: rotate(90deg)",
      "-moz-transform: rotate(90deg)",
      "-o-transform: rotate(90deg)",
      "-ms-transform: rotate(90deg)",
      "transform: rotate(90deg)",
    ],
  },
  {
    name: "rotate-90",
    items: [
      "-webkit-transform: rotate(-90deg)",
      "-moz-transform: rotate(-90deg)",
      "-o-transform: rotate(-90deg)",
      "-ms-transform: rotate(-90deg)",
      "transform: rotate(-90deg)",
    ],
  },
];

module.exports = transform;
