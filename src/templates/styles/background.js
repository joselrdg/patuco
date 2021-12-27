const background = [
  {
    name: "_ls_n",
    target: "li",
    items: ["list-style: none", "list-style-position: outside"],
  },
  {
    name: "_bgP_c",
    items: ["background-position: center"],
  },
  {
    name: "_bgS_c",
    items: ["background-size: cover"],
  },
  {
    name: "_bg_c_body",
    items: ["background-color:  var(--background-colorBody);"],
  },
  {
    name: "_bg_c",
    recursivevar: true,
    items: ["background-color: var(--background-color_-0)"],
  },
  {
    name: "_bg_c_p",
    recursivevar: true,
    items: ["background-color: var(|primary-color_-0|)"],
  },
  {
    name: "bg_lg_p1",
    items: ["background: linear-gradient(to bottom, #cac6c3, #e9eaea)"],
  },
  {
    name: "bg_lg_p2",
    items: ["background: linear-gradient(to bottom, #dfdddd, #e9eaea)"],
  },
  {
    name: "_bg_c_w",
    items: ["background-color: var(--color-white)"],
  },
  {
    name: "_bg_c_r",
    items: ["background-color: var(--color-red)"],
  },
];

module.exports = background;
