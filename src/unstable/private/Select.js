import React from "react";
import Contrast from "../Contrast.jsx";
import Icon from "./Icon";

const Select = ({ value, onChange, label, children, className }) => {
  const selectedChild =
    children &&
    React.Children.toArray(children).find(child => child.props.value === value);
  const text = selectedChild ? selectedChild.props.children : "None";
  const finalValue = selectedChild ? value : "";
  return (
    <div className={className}>
      <Contrast className="db mb1">{label}</Contrast>
      <Contrast
        bg={10}
        text={50}
        className="relative dib w-100 flex justify-between input"
      >
        <select
          value={finalValue}
          className="o-0 absolute w-100 h-100 top-0 left-0"
          onChange={e => onChange && onChange(e.target.value)}
        >
          {children}
          {!selectedChild && <option value="">None</option>}
        </select>
        {text}
        <div className="ml2">▿</div>
      </Contrast>
    </div>
  );
};

export default Select;
