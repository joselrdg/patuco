const color = [
  {
    name: "_c_p1_l",
    items: [
      "color: color-mix(in lch, var(--primary-color1), rgb(255, 255, 255))",
    ],
  },
  {
    name: "_c_p",
    recursivevar: true,
    items: ["color: var(|primary-color_-0|)"],
  },
  {
    name: "_c_p1_b",
    items: ["color: color(var(--primary-color1) blackness(-80%))"],
  },
  {
    name: "_c_p1_s",
    items: ["color: color(var(--primary-color1) shade(+ 70%))"],
  },
  {
    name: "_c_p1_t",
    items: ["color: color(var(--primary-color1) tint(+ 70%))"],
  },
  {
    name: "_c_i1",
    items: ["color: var(--color-icon)"],
  },
  {
    name: "_c_w",
    items: ["color: var(--color-white)"],
  },
  {
    name: "_c_r",
    items: ["color: red"],
  },
  {
    name: "_c_g",
    items: ["color: rgb(2, 197, 2)"],
  },
  {
    name: "_c_dg",
    items: ["color: var(--dark-grey)"],
  },
  {
    name: "_c_lg",
    items: ["color: var(--ligth-grey)"],
  },
  {
    name: "_c_l",
    items: ["color: rgb(155, 155, 155)"],
  },
];

module.exports = color;
