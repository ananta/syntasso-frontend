import { Theme } from "@material-ui/core";
import { lightTheme } from "./light";
import { darkTheme } from "./dark";

export function getThemeByName(theme: string): Theme {
  console.log(themeMap[theme]);
  return Object.assign({}, themeMap[theme]);
}

const themeMap: { [key: string]: Theme } = {
  lightTheme,
  darkTheme,
};
