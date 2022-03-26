module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true,
  },
  extends: ["prettier", "airbnb-base", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier", "@typescript-eslint"],
  rules: {},
}
