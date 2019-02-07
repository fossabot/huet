import shared from "../private/baseThemeConfig.js";

const themes = [
  {
    ...shared
  },
  {
    ...shared,
    name: "Base Inverted",
    bgRampValue: 0
  },
  {
    ...shared,
    name: "High Contrast",
    pallet: {
      black: "#000000",
      white: "#ffffff",
      red: "#ff0030",
      yellow: "#b77a00",
      green: "#009700",
      blue: "#0099ff",
      purple: "#d400ff"
    },
    bgRampValue: 0,
    startSignalLightness: 0.3,
    endSignalLightness: 0.7,
    contrastMultiplier: 2,
    saturationMultiplier: 2
  },
  {
    ...shared,
    name: "Radioactive",
    pallet: {
      black: "#69707f",
      white: "#c1ff00",
      red: "#ff88a4",
      yellow: "#b1bd2d",
      green: "#59c866",
      blue: "#83beff",
      purple: "#d2a8ff"
    },
    bgRampValue: 0,
    startSignalLightness: 0.46,
    endSignalLightness: 0.61
  },
  {
    ...shared,
    name: "Terminal",
    pallet: {
      black: "#0d171d",
      white: "#7fff8b",
      red: "#f54f75",
      yellow: "#b1bd2d",
      green: "#13a624",
      blue: "#558cff",
      purple: "#d75eff"
    },
    bgRampValue: 0,
    startSignalLightness: 0.5,
    endSignalLightness: 0.63
  },
  {
    ...shared,
    name: "Deep Dive",
    pallet: {
      black: "#001b4f",
      white: "#b6e8e8",
      red: "#ff6669",
      yellow: "#a09c5c",
      green: "#319647",
      blue: "#496eff",
      purple: "#af5bff"
    },
    bgRampValue: 0,
    startSignalLightness: 0.44,
    endSignalLightness: 0.63
  },
  {
    ...shared,
    name: "Paperback",
    pallet: {
      black: "#3d3531",
      white: "#e2c1b1",
      red: "#e13639",
      yellow: "#c89455",
      green: "#238e5d",
      blue: "#366caa",
      purple: "#8e65bf"
    },
    bgRampValue: 1,
    startSignalLightness: 0.36,
    endSignalLightness: 0.55
  },
  // {
  //   ...shared,
  //   name: "Beach",
  //   pallet: {
  //     black: "#b9a194",
  //     white: "#f1f9ff",
  //     red: "#e13639",
  //     yellow: "#bd7f33",
  //     green: "#00878e",
  //     blue: "#3865da",
  //     purple: "#7630c8"
  //   },
  //   bgRampValue: 0,
  //   startSignalLightness: 0.15,
  //   endSignalLightness: 0.57
  // },
  {
    ...shared,
    name: "Dracula",
    pallet: {
      black: "#37233b",
      white: "#f0c9e7",
      red: "#e13639",
      yellow: "#bd7f33",
      green: "#00878e",
      blue: "#3865da",
      purple: "#7630c8"
    },
    bgRampValue: 0,
    startSignalLightness: 0.5,
    endSignalLightness: 0.5
  },
  {
    ...shared,
    name: "Orange",
    pallet: {
      black: "#4e556d",
      white: "#ff7c49",
      red: "#e32850",
      yellow: "#af7000",
      green: "#00974c",
      blue: "#2292cb",
      purple: "#d961d6"
    },
    bgRampValue: 0,
    startSignalLightness: 0.27,
    endSignalLightness: 0.76,
    contrastMultiplier: 1,
    saturationMultiplier: 0.83
  },
  {
    ...shared,
    name: "Fade",
    pallet: {
      black: "#3c3d43",
      white: "#b2bdff",
      red: "#ff3200",
      yellow: "#987a1d",
      green: "#459700",
      blue: "#0073ff",
      purple: "#aa5dff"
    },
    bgRamp: "gray",
    bgRampValue: 0,
    startSignalLightness: 0.36,
    endSignalLightness: 0.72,
    saturationMultiplier: 0.59
  },
  {
    ...shared,
    name: "Blueprint",
    pallet: {
      black: "#384cd2",
      white: "#ffffff",
      red: "#ff0030",
      yellow: "#988753",
      green: "#009700",
      blue: "#00a3ff",
      purple: "#af60ff"
    },
    startSignalLightness: 0.26,
    endSignalLightness: 0.47
  },
  {
    ...shared,
    name: "IKEA",
    pallet: {
      black: "#0d0086",
      white: "#ffc900",
      red: "#ff0034",
      yellow: "#8a6420",
      green: "#26b047",
      blue: "#6599ff",
      purple: "#d400ff"
    },
    startSignalLightness: 0.47,
    endSignalLightness: 0.75,
    contrastMultiplier: 1.5,
    saturationMultiplier: 1.5
  }
];

export default themes;
