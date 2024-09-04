/** @type {import("prettier").Config} */
const config = {
  // default options (explicitly set options)
  printWidth: 80,
  trailingComma: "all",
  singleQuote: false,
  semi: true,
  arrowParens: "always",

  // plugins
  plugins: ["@ianvs/prettier-plugin-sort-imports"],

  importOrder: [
    "<BUILTIN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^@test/(.*)$",
    "^[./]",
    "^public/(.*)$",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};

export default config;
