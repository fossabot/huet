import React from "react";
import _ from "lodash";
import Block from "../Block.jsx";
import __ from "../atoms";

function ColorPicker({ color, onChange }) {
  return (
    <input
      type="color"
      value={color}
      onChange={e => onChange(e.target.value)}
      style={{
        ...__.w100.h1.pa0,
        backgroundColor: color || "transparent"
      }}
    />
  );
}

export default function Pallet({ colors, onColorsChange }) {
  return (
    <Block style={__.flex.ba} colors="b:20">
      {_.map(colors, (color, key) => (
        <ColorPicker
          key={key}
          color={color}
          onChange={c => onColorsChange({ ...colors, [key]: c })}
        />
      ))}
    </Block>
  );
}
