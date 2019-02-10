import React from "react";
import __ from "./atoms";
import themeConfigs from "../demo/themeConfigs";
import Theme from "../Theme";
import Block from "../Block.jsx";
import Checkbox from "./Checkbox";
import useBrowserState from "./useBrowserState";

function Labeled({ title, children }) {
  return (
    <>
      <label style={__.i}>{title}</label>
      {children}
    </>
  );
}

function Arrow({ size = "1em", top = null, left = null, direction = "up" }) {
  const directionToAngle = {
    up: 45,
    right: 45 + 90,
    down: 45 + 180,
    left: 45 + 180 + 90
  };
  const angle = directionToAngle[direction];

  const positionStyle =
    top || left
      ? {
          ...__.absolute,
          top,
          left
        }
      : null;
  return (
    <div
      style={{
        width: size,
        height: size,
        background: "transparent",
        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
        borderColor: "transparent",
        borderWidth: `calc(${size} / 2)`,
        borderStyle: "solid",
        borderTopColor: "currentColor",
        borderLeftColor: "currentColor",
        ...positionStyle
      }}
    />
  );
}

const ThemePreview = React.memo(
  ({ config, showMiddle = false, onClick = () => {}, isSelected }) => {
    const theme = new Theme(config);
    return (
      <Block
        as="button"
        theme={theme}
        contrast={`bg=0 b=${isSelected ? 100 : 12}`}
        style={parentBg => ({
          ...__.w100.ba.relative,
          boxShadow: `0 2px 10px ${parentBg.contrast(100).alpha(0.2)}`
        })}
        onClick={() => onClick(config.name)}
      >
        {isSelected && <Arrow top="100%" left="50%" direction="up" />}
        <div style={{ ...__.flex, height: "0.5em" }}>
          {Object.keys(theme.pallet).map(palletKey => (
            <div
              key={palletKey}
              style={{
                ...__.w100.h100,
                backgroundColor: theme.pallet[palletKey]
              }}
            />
          ))}
        </div>
        <h1 style={__.mh2.pv2}>{theme.name}</h1>
        <Block
          style={parentBg => ({
            marginTop: "-.5rem",
            height: ".5rem",
            background: `linear-gradient(${parentBg}, ${parentBg.contrast(12)})`
          })}
        />
        <Block style={__.flex}>
          {(showMiddle ? [0, 49, 51, 100] : [0]).map(contrast => (
            <Block
              key={contrast}
              contrast={`bg=${contrast}`}
              style={__.pa2.w100.flex.flex_column}
            >
              {Object.keys(theme.ramps)
                .filter(
                  rampKey => theme.ramps[rampKey].config.mode === "colored"
                )
                .map(rampKey => (
                  <div key={rampKey} style={__.flex}>
                    {[100, 75, 50, 25].map((contrastInner, i) => (
                      <Block
                        key={contrastInner}
                        base={rampKey}
                        contrast={`bg=${contrastInner}`}
                        style={{
                          ...__.w100,
                          marginRight: i === 0 ? 1 : 0,
                          marginTop: 1,
                          height: rampKey === "gray" ? "1.5rem" : "0.5rem"
                        }}
                      />
                    ))}
                  </div>
                ))}
            </Block>
          ))}
        </Block>
      </Block>
    );
  }
);

export default function Themes({ onConfigSelect }) {
  const finalConfigs = themeConfigs;
  const [showMiddleGrays, setShowMiddleGrays] = useBrowserState(false);
  const [selectedConfigName, setSelectedConfigName] = useBrowserState(
    themeConfigs[0].name
  );
  return (
    <div>
      <div style={__.ma2.mb0}>
        <Labeled title="Themes" />
      </div>
      <div style={{ ...__.flex, overflowX: "scroll" }}>
        {finalConfigs.map(config => (
          <div
            key={config.name}
            style={{ ...__.ma2.relative, flexBasis: "70%", flexShrink: 0 }}
          >
            <ThemePreview
              config={config}
              showMiddle={showMiddleGrays}
              isSelected={config.name === selectedConfigName}
              onClick={() => {
                setSelectedConfigName(config.name);
                onConfigSelect(config);
              }}
            />
          </div>
        ))}
      </div>
      <div style={__.ma2}>
        <Checkbox
          label="Show middle grays"
          value={showMiddleGrays}
          onChange={setShowMiddleGrays}
        />
      </div>
    </div>
  );
}
