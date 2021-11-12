import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { matchPath } from "react-router";

export const Anima = ({
  anima = false,
  on,
  start: animationStart,
  end: animationEnd,
  styleCss = false,
  styleStart = {},
  styleEnd = {},
  delayTime = 500,
  timing = "ease",
  router = false,
  opposite = false,
  oppDirection = "D",
  children,
}) => {
  const [pvChildren, setPvChildren] = useState(children);
  const [stateAnima, setstateAnima] = useState(animationStart);
  const [stateStyle, setstateStyle] = useState(styleCss ? styleStart : {});

  const prevId = useRef(
    router
      ? children.props.children.find((child) =>
          matchPath(children.key, { path: child.props.path, exact: true })
        ).props.animaid
      : children.props.animaid
      ? children.props.animaid
      : 0
  );

  const greater = () => {
    let direction = oppDirection === "D" ? "D" : "I";
    if (router) {
      const key = children.key;
      const animaid = children.props.children.find((child) =>
        matchPath(key, { path: child.props.path, exact: true })
      ).props.animaid;
      if (animaid < prevId.current) {
        direction = oppDirection === "D" ? "I" : "D";
      }
      prevId.current = animaid;
    } else {
      if (children.props.animaid < prevId.current) {
        direction = oppDirection === "D" ? "I" : "D";
      }
      prevId.current = children.props.animaid;
      //   return children.animaid;
    }
    return direction;
  };

  const controlStart = useRef(false);

  useEffect(() => {
    console.log(
      "effect, on: " , on , "controlStart.current: " , controlStart.current
    );

    let animaReverse = opposite ? greater() : 0;

    let timeoutId = delayTime;

    if (!controlStart.current) {
      timeoutId = setTimeout(
        () => {
          console.log("setTimeout controlStart.current");
          anima &&
            setstateAnima(
              opposite ? animationStart + animaReverse : animationStart
            );
          styleCss && setstateStyle(styleStart);
          setPvChildren(children);
        },
        on ? 0 : delayTime
      );
    } else {
      console.log("setTimeout else controlStart", "on: " , on , "controlStart.current: " , controlStart.current);
      timeoutId = setTimeout(() => {
        setPvChildren(children);
      }, on ? 0 : delayTime);
    }

    anima &&
      !on &&
      setstateAnima(opposite ? animationEnd + animaReverse : animationEnd);

    styleCss && !on && setstateStyle(styleEnd);

    on ? (controlStart.current = true) : (controlStart.current = false);
    return () => clearTimeout(timeoutId);
  }, [children, delayTime, animationEnd, anima,on]);

  const animation = anima
    ? {
        animationName: stateAnima,
        animationDuration: `${delayTime}ms`,
        animationTimingFunction: timing,
        // animationDirection: 'reverse',
        animationIterationCount: 1,
      }
    : {};

  return <div style={{ ...animation, ...stateStyle }}>{pvChildren}</div>;
};
