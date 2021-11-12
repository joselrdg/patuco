import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { matchPath } from "react-router";

export const Anima = ({
  anima = false,
  firstTime = false,
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
  
  
  let controlStart = firstTime ? !on : false;
  
  useEffect(() => {
    console.log('efecct')
    
    let animaReverse = opposite ? greater() : 0;
    
    let timeoutId = delayTime;
    
    if (!controlStart) {
      timeoutId = setTimeout(
        () => {
          if (anima)
          setstateAnima(
            opposite ? animationStart + animaReverse : animationStart
            );
            if (styleCss) setstateStyle(styleStart);
            setPvChildren(children);
          },
          on ? 0 : delayTime
      );
    } else {
      if (anima)
        setstateAnima(
          opposite ? animationStart + animaReverse : animationStart
        );
      if (styleCss) setstateStyle(styleStart);
      timeoutId = setTimeout(
        () => {
          setPvChildren(children);
        },
        on ? 0 : delayTime
      );
    }

    if (anima && !on) {
      setstateAnima(opposite ? animationEnd + animaReverse : animationEnd);
    }

    if (styleCss && !on) {
      setstateStyle(styleEnd);
    }

    on ? (controlStart = true) : (controlStart = false);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [children, delayTime, animationEnd, anima]);

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
