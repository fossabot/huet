import chroma from "chroma-js";
import Theme from "./Theme";

/*
  Rationale:
  We want colors to context-dependent. This means there's really no such thing
  as "red" with a specific hex value. Instead, we want to be able to say we want
  a red that *stands out* from the background color by a certain amount. The properties
  of how to make a red stand out, and what "red" really means is defined by the theme.

  In the theme, the "red" would be defined as a "ramp" that specifies the boundaries
  of what's allowed for the color. However, this doesn't mean we'll always pick one of these
  colors. We'll pick a color that's on the plane between the ramp of the color you want and the
  ramp of the parent color.
*/

// ---

export class BaseColor {
  constructor(hex) {
    if (!hex) {
      throw new Error("`hex` is required");
    }
    this.hex = hex;
  }

  alpha(a) {
    return chroma(this.hex)
      .alpha(a)
      .hex();
  }

  toString() {
    return this.hex;
  }
}

export default class Color extends BaseColor {
  constructor({
    theme,
    bgColor = null,
    hex,
    ramp = null,
    baseRamp = null,
    lightness = getLightness(hex)
  }) {
    super(hex);
    if (!theme) {
      throw new Error("`theme` is required");
    }

    if (baseRamp && (!("startL" in baseRamp) || !("endL" in baseRamp))) {
      throw new Error("`baseRamp` can't be a direct ramp");
    } else if (
      !baseRamp &&
      !(bgColor && !bgColor.baseRamp) &&
      !theme.ramps.gray
    ) {
      throw new Error("No baseRamp");
    }
    // TODO: consider making this private so there aren't two ways of getting a theme:
    // 1) From a color
    // 2) From a useContext(ThemeContext)
    // Also consider making `ThemeContext` only available internally to Huet
    this.theme = theme;
    this.bgColor = bgColor;
    this.ramp = ramp;
    this.baseRamp =
      baseRamp || (bgColor && bgColor.baseRamp) || theme.ramps.gray;
    this.lightness = lightness;
  }

  // TODO: consider removing `bgRamp` and `bgRampValue from theme
  static fromTheme(theme) {
    if (!(theme instanceof Theme)) {
      throw new Error('Need to give me a Theme instance, not a "theme config"');
    }
    const ramp = theme.ramps[theme.bgRamp];
    const hex = ramp(theme.bgRampValue).hex;
    return new Color({
      theme,
      bgColor: null,
      hex,
      ramp,
      baseRamp: ramp
    });
  }

  contrast(contrastAmount = 100, ramp = this.baseRamp) {
    if (ramp.config.mode === "direct") {
      console.warn(
        'You should be using the "direct" method instead since the "contrast" parameter won\'t do anything here'
      );
      return this.direct(ramp);
    }

    const { theme } = this;
    const isRootBaseRamp = ramp === theme.ramps[theme.bgRamp];

    const [min, max] = this._getMinMax(ramp);
    const [bgMin, bgMax] = this._getMinMax(this.ramp);
    const normalizedLightness = (this.lightness - bgMin) / (bgMax - bgMin); // __0 _.5 __1

    // BASICS ---

    const basicMultiplier = (() => {
      const midpoint = (min + max) / 2;
      const direction = this.lightness < midpoint ? 1 : -1;
      const contrastRescale = (max - min) / 100;
      return direction * contrastRescale;
    })();

    // ADVANCED ---

    const advancedMultiplier = (() => {
      let contrastMultiplier = 1;
      let contrastNormalizer = 1;
      let colorContrastMinMax = 1;

      if (isRootBaseRamp || theme.contrastMultiplier < 1) {
        contrastMultiplier = theme.contrastMultiplier;
      }

      if (
        (theme.rescaleContrastToGrayRange && isRootBaseRamp) ||
        (theme.rescaleContrastToSignalRange && !isRootBaseRamp)
      ) {
        contrastNormalizer = Math.abs(normalizedLightness - 0.5) + 0.5; // __1 _.5 __1
      }

      if (!isRootBaseRamp) {
        const midpoint = (min + max) / 2;
        colorContrastMinMax =
          this.lightness < midpoint
            ? theme.maxColorLightness
            : 1 - theme.minColorLightness;
      }

      return contrastMultiplier * contrastNormalizer * colorContrastMinMax;
    })();

    // PUT IT ALL TOGETHER ---

    let targetLightness =
      this.lightness + contrastAmount * basicMultiplier * advancedMultiplier;

    // Rescale targetLightness from ramp range to 0-1
    let scaleValue =
      (targetLightness - ramp.startL) / (ramp.endL - ramp.startL);

    let hex = ramp(scaleValue).hex;

    const [bgL, bgA, bgB] = chroma(this.hex).lab();
    const [fgL, fgA, fgB] = chroma(hex).lab();
    const colorContrastNormalizer = Math.abs(normalizedLightness - 0.5) * 2; // __1 __0 __1

    const abContrastMultiplier =
      isRootBaseRamp || theme.contrastMultiplier > 1
        ? 1
        : theme.contrastMultiplier;

    const abSaturationMultiplier =
      isRootBaseRamp || theme.saturationMultiplier > 1
        ? 1
        : theme.saturationMultiplier;
    // `ab` in abContrast refers to the A and B axes of the LAB color space
    const abContrast =
      ((colorContrastNormalizer + contrastAmount) / 100) *
      abContrastMultiplier *
      abSaturationMultiplier;

    const saturationMultiplier =
      theme.saturationMultiplier > 1 && !isRootBaseRamp
        ? Math.max(
            1,
            theme.saturationMultiplier *
              (contrastAmount / 100) *
              Math.min(theme.contrastMultiplier, 1)
          )
        : 1;

    const l = bgL + (fgL - bgL) * 1; // Read this as just `fgL`
    const a = (bgA + (fgA - bgA) * abContrast) * saturationMultiplier;
    const b = (bgB + (fgB - bgB) * abContrast) * saturationMultiplier;

    hex = chroma.lab(l, a, b).hex();

    return new Color({
      theme,
      bgColor: this,
      hex,
      ramp
    });
  }

  direct(ramp) {
    if (ramp.config.mode !== "direct") throw new Error("Not allowed");

    const { theme, baseRamp } = this;
    let hex = ramp(
      (this.lightness - baseRamp.startL) / (baseRamp.endL - baseRamp.startL)
    ).hex;
    hex = chroma
      .mix(this.hex, hex, Math.min(theme.contrastMultiplier, 1), "lab")
      .hex();

    return new Color({
      theme,
      bgColor: this,
      hex,
      ramp
    });
  }

  base(ramp) {
    return new Color({
      theme: this.theme,
      bgColor: this.bgColor,
      hex: this.hex,
      ramp: this.ramp,
      baseRamp: ramp
    });
  }

  alpha(amount) {
    return chroma(this.hex)
      .alpha(amount * this.theme.contrastMultiplier)
      .hex();
  }

  _getMinMax(ramp) {
    const rootBaseRamp = this.theme.ramps[this.theme.bgRamp];
    // We're not requiring a ramp because we want the `contrast` method to work
    // even if the parent Color instance has just a hex and a theme. This allows us to
    // use our ramps on top of any background color.
    if (!ramp || ramp.config.mode === "direct") {
      return [rootBaseRamp.startL, rootBaseRamp.endL];
    }

    // if (ramp === rootBaseRamp) {
    //   return [ramp.startL, ramp.endL];
    // }

    const min = Math.max(ramp.startL, rootBaseRamp.startL);
    const max = Math.min(ramp.endL, rootBaseRamp.endL);
    return [min, max];
  }
}

export function getLightness(color) {
  // Sometimes we get small negative numbers, so we clamp with Math.max
  return Math.max(0, chroma(color).get("lab.l"));
}
