const cmpButtons = [
  // {
  //   name: "_btn_bg",
  //   recursivevar: ["button-background-color_-"],
  //   items: ["background-color: var(|--button-background-color_-0|)"],
  // },
  // {
  //   name: "_btn_bgg",
  //   recursivevar: ["button-background-gradient_-"],
  //   items: ["background: var(|--button-background-gradient_-0|)"],
  // },
  // const d = await reqPatuVar(
  //   "color: (_cVP, contrastYiq, example, (_cVP, store, example, theme-primary))"
  // );
  // background: linear-gradient(to bottom right, #EF4765, #FF9A5A);

  // console.log(d)
  {
    name: "_btn_2",
    items: [
      "cursor: pointer",
      "border: 0",
      "border-radius: 12px",
      "color: #fff",
      "background: linear-gradient(to bottom right, ((_cVP, store, example, colors-theme-primary)), ((_cVP, lighter, example,((_cVP, store, example, colors-theme-primary)), 20)))",
      "display: inline-block",
      "font-family: -apple-system,system-ui,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
      "font-size: 16px",
      "font-weight: 500",
      "line-height: 2.5",
      "outline: transparent",
      "padding: 0 1rem",
      "text-align: center",
      "text-decoration: none",
      "transition: box-shadow .2s ease-in-out",
      "user-select: none",
      "-webkit-user-select: none",
      "touch-action: manipulation",
      "white-space: nowrap",
    ],
    pseudoElement: [
      {
        type: ":active",
        items: [
          "box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem ((_cVP, darker, example,((_cVP, store, example, colors-theme-primary)), 20)), .125rem .125rem 1rem ((_cVP, lighter, example,((_cVP, store, example, colors-theme-primary)), 20))",
          "transform: translateY(2px)",
          "transition-duration: 0.35s",
        ],
      },
      {
        type: ":not([disabled]):hover",
        items: [
          "box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem ((_cVP, darker, example,((_cVP, store, example, colors-theme-primary)), 20)), .125rem .125rem 1rem ((_cVP, lighter, example,((_cVP, store, example, colors-theme-primary)), 20))",
        ],
      },
    ],
  },
  {
    name: "_btn_1",
    items: [
      "appearance: none",
      "font-family: -apple-system,system-ui,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
      "backface-visibility: hidden",
      "border-radius: 10px",
      "border-style: none",
      "box-shadow: none",
      "box-sizing: border-box",
      "color: #fff",
      "cursor: pointer",
      "display: inline-block;",
      "font-size: 15px",
      "font-weight: 500",
      "height: 50px",
      "letter-spacing: normal",
      "line-height: 1.5",
      "outline: none",
      "overflow: hidden",
      "padding: 14px 30px",
      "position: relative",
      "text-align: center",
      "text-decoration: none",
      "transform: translate3d(0, 0, 0)",
      "transition: all 0.3s",
      "user-select: none",
      "-webkit-user-select: none",
      "touch-action: manipulation",
      "vertical-align: top",
      "white-space: nowrap",
    ],
    pseudoElement: [
      {
        type: ":hover",
        items: [
          "filter: brightness(85%)",
          "box-shadow: rgba(0, 0, 0, 0.05) 0 5px 30px, rgba(0, 0, 0, 0.05) 0 1px 4px",
          "opacity: 1",
          "transform: translateY(0)",
          "transition-duration: 0.35s",
        ],
      },
      {
        type: ":hover:after",
        items: ["opacity: 0.5"],
      },
      {
        type: ":active",
        items: [
          "box-shadow: rgba(0, 0, 0, 0.1) 0 3px 6px 0, rgba(0, 0, 0, 0.1) 0 0 10px 0, rgba(0, 0, 0, 0.1) 0 1px 4px -1px",
          "transform: translateY(2px)",
          "transition-duration: 0.35s",
        ],
      },
      {
        type: ":active:after",
        items: ["opacity: 1"],
      },
      {
        type: "",
        items: ["padding: 14px 22px", "width: 176px"],
        query: "min-width 768px",
      },
    ],
  },
];

module.exports = cmpButtons;
