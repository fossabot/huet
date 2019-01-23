import React, { useContext } from "react";
import styled from "styled-components";
import { BackgroundContext, Contrast, Block } from "../../huet";
import __ from "../../unstable/atoms";

export default function Basic() {
  const parentBg = useContext(BackgroundContext);
  const theme = parentBg.theme;
  const red = parentBg.contrast(10, theme.ramps.red);
  const hundredContrast = parentBg.contrast(100);
  return (
    <div style={__.pa4}>
      Basic
      <div style={{ color: red }}>Red</div>
      <div style={{ color: hundredContrast }}>100 contrast</div>
      <Contrast text={100}>50 Contrast</Contrast>
      <Contrast bg={100} bgRamp="white" style={__.pa1.tc.w100.f4}>
        Button
      </Contrast>
      {Object.keys(theme.ramps).map(rampKey => (
        <Block
          key={rampKey}
          as="button"
          colors="b:80 bg:60 bg/fg:white"
          base={rampKey}
          style={p => ({
            ...__.pa1.tc.w100.f4.br2.mt2.ba,
            background: `linear-gradient(${p.contrast(60)}, ${p.contrast(70)})`
          })}
        >
          Button
        </Block>
      ))}
    </div>
  );
}
