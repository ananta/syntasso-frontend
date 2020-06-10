import { atom } from "recoil";

const ThemeState = atom({
  key: "themeState",
  default: {
    light: false,
  },
});

export default ThemeState;
