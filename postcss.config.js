/* tslint:disable */
/* eslint-disable */
const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [require('postcss-import'), tailwindcss('./tailwind.ts'), require('autoprefixer')],
};
