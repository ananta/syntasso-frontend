import { atom } from "recoil";

const ThemeState = atom({
  key: "themeState",
  default: {
    light: true,
  },
});

export default ThemeState;
