const margin = [
  {
    name: "_f_l",
    items: ["float: left"],
  },
  {
    name: "_f_r",
    items: ["float: right"],
  },
  {
    name: "_mx_a",
    items: ["margin: 0 auto"],
  },
  {
    name: "_mx_a",
    items: ["margin-right: auto", "margin-left: auto"],
  },
  {
    name: "_m",
    recursivevar: true,
    items: ["margin: var(|spacer_-0, spacer-K-s_-0|)"],
  },
  {
    name: "_mt",
    recursivevar: true,
    items: ["margin-top: var(|spacer_-0, spacer-K-s_-0|)"],
  },
  {
    name: "_mb",
    recursivevar: true,
    items: ["margin-bottom: var(|spacer_-0, spacer-K-s_-0|)"],
  },
  {
    name: "_ml",
    recursivevar: true,
    items: ["margin-left: var(|spacer_-0, spacer-K-s_-0|)"],
  },
  {
    name: "_mr",
    recursivevar: true,
    items: ["margin-right: var(|spacer_-0, spacer-K-s_-0|)"],
  },
  {
    name: "_my",
    recursivevar: true,
    items: [
      "margin-bottom: var(|spacer_-0, spacer-K-s_-0|)",
      "margin-top: var(|spacer_-0, spacer-K-s_-0|)",
    ],
  },
  {
    name: "_mx",
    recursivevar: true,
    items: [
      "margin-left: var(|spacer_-0, spacer-K-s_-0|)",
      "margin-right: var(|spacer_-0, spacer-K-s_-0|)",
    ],
  },
];

module.exports = margin;
