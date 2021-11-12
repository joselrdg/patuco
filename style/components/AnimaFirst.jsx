import React from "react";
import { Anima } from "./Anima";

const animaFirst = (on, styleCss, height = "500px", delay = 300) => ({
  start: "down_D",
  end: "up_D",
  delayTime: delay,
  firstTime: true,
  on: on,
  styleCss: true,
  styleStart: {
    maxHeight: height,
    animation: `down_D ${delay}ms ease-in`,
    transition: `max-height ${delay} ease-in`,
  },
  styleEnd: {
    maxHeight: "0px",
    // animation: `up_D ${delay}ms ease-in`,
    transition: `max-height ${delay}ms ease-in`,
  },
});

export const AnimaFirst = ({ on, delay = 300, styleStart, styleEnd, children }) => {
  return (
    <Anima
      on={on}
      delayTime={delay}
      firstTime={true}
      styleCss={true}
      styleStart={styleStart}
      styleEnd={styleEnd}
    >
      {children}
    </Anima>
  );
};
