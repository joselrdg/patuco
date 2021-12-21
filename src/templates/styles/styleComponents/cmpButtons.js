const cmpButtons = [
  {
    name: "_btn_bg",
    recursivevar: true,
    items: ["background-color: var(|button-background-color_-0|)"],
  },
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
    name: "_btn2",
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
    name: "_btn1",
    items: [
      "appearance: none",
      "font-family: -apple-system,system-ui,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
      "backface-visibility: hidden",
      "border-radius: 10px",
      "width: 100%",
      // "background-color: var(--button-background-color_-1)",
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
        type: ":disabled",
        items: ["background-color: var(button-background-color_-0)"],
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
        type: ":hover:after",
        items: ["opacity: 0.5"],
      },
    ],
  },
  {
    recursivevar: true,
    name: "_btn1c",
    items: ["background-color: var(|button-background-color_-0|)"],
    pseudoElement: [
      {
        type: ":hover",
        items: [
          "background-color: ((_cVP, darker, example, var(|button-background-color_-0|), 20))",
          "box-shadow: rgba(0, 0, 0, 0.05) 0 5px 30px, rgba(0, 0, 0, 0.05) 0 1px 4px",
          "opacity: 1",
          "transform: translateY(0)",
          "transition-duration: 0.35s",
        ],
      },
    ],
  },
  {
    name: "_btnRs1",
    template: `._btnRs1 {
  font-size: 18px;
  white-space: nowrap;
  width: 100%;
  padding: 0.8em 1.5em;
  font-family: Open Sans, Helvetica, Arial, sans-serif;
  line-height: 18px;
  display: inline-block;
  zoom: 1;
  color: #fff;
  text-align: center;
  position: relative;
  -webkit-transition: border 0.25s linear, color 0.25s linear,
    background-color 0.25s linear;
  transition: border 0.25s linear, color 0.25s linear,
    background-color 0.25s linear;
}
`,
  },
  {
    name: "_btnRs1_google",
    template: `._btnRs1_google {
  background-color: #be3b26;
  border-color: #be3b26;
  -webkit-box-shadow: 0 3px 0 #842719;
  box-shadow: 0 3px 0 #842719;
}
._btnRs1_google:active {
  top: 3px;
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
  `,
  },
  {
    name: "_btnRs1_facebook",
    template: `._btnRs1_facebook {
  background-color: #2479b6;
  border-color: #2479b6;
  -webkit-box-shadow: 0 3px 0 #1c6394;
  box-shadow: 0 3px 0 #1c6394;
}
._btnRs1_facebook:active {
  top: 3px;
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
  `,
  },
  {
    name: "_btnRs1_sea",
    template: `._btnRs1_sea {
  background-color: #08bc9a;
  border-color: #08bc9a;
  -webkit-box-shadow: 0 3px 0 #088d74;
  box-shadow: 0 3px 0 #088d74;
}
._btnRs1_sea:hover {
  background-color: #01a183;
}
._btnRs1_sea:active {
  top: 3px;
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
._btnRs1_sea:disabled {
  background-color: var(--button-background-color_-0);
  border-color: var(--button-background-color_-0);
  -webkit-box-shadow: var(--button-background-color_-0);
  box-shadow: var(--button-background-color_-0);
}
`,
  },
];

module.exports = cmpButtons;
