const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [tailwindcss("./tailwind.ts"), require("autoprefixer")],
};
