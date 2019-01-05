import chroma from "chroma-js";
import mapValues from "lodash/mapValues";
import { getLightness, BaseColor } from "./color";

export function createTheme(themeConfig) {
  const ramps = mapValues(themeConfig.ramps, ramp =>
    createRamp(themeConfig, ramp)
  );
  return {
    ...themeConfig,
    ramps
  };
}

// ---

function createRamp(themeConfig, rampConfig) {
  const config = {
    ...defaultRampConfig,
    ...rampConfig
  };
  const hexColors = config.colors.map(
    colorName => themeConfig.pallet[colorName]
  );
  const scale = chroma.scale(hexColors);
  if (config.colorModel) scale.mode(config.colorModel);
  if (config.classes) scale.classes(config.classes);

  let ramp;
  switch (config.mode) {
    case "direct":
      ramp = createDirectRampWithScale(scale);
      break;
    case "colored":
    default:
      if (config.correctLightness) scale.correctLightness();
      ramp = createRampWithScale(scale);
      break;
  }
  ramp.config = config;
  return ramp;
}

function wrapScaleFunc(scale) {
  return n => new BaseColor(scale(n).hex());
}

function createRampWithScale(scale) {
  let scaleFunc = wrapScaleFunc(scale);
  scaleFunc.startL = getLightness(scale(0));
  scaleFunc.endL = getLightness(scale(1));
  return scaleFunc;
}

function createDirectRampWithScale(scale) {
  return wrapScaleFunc(scale);
}

const defaultRampConfig = {
  colors: ["black", "white"],
  colorModel: "lab", // lrgb, lab
  correctLightness: true,
  mode: "colored"
};
