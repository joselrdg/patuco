const buttons = [
  {
    name: "_btn_bg",
    recursivevar: "button-background-color_-",
    items: ["padding: var(--button-background-color_-0)"],
  },
  {
    name: "_btn_1",
    items: [
      "appearance: none",
      "backface-visibility: hidden",
      "background-color: #2f80ed",
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

module.exports = buttons;
