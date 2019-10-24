module.exports = {
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: "module"
    },
    extends: [
        "standard",
        "plugin:prettier/recommended",
        "plugin:react/recommended"
    ],
    plugins: ["react", "prettier"],
    rules: {
        "prettier/prettier": 2,
        "react/prop-types": 0,
        "react/display-name": 0,
        "eqeqeq": 0,
        // "no-undef": 0,
        "camelcase": 0,
        "no-unused-expressions": 0,
        "no-new": 0
    },
    globals: {
        MI: "readonly",
        routes: "readonly"
    },
    settings: {
        "react": {
            "version": "detect", // React version. "detect" automatically picks the version you 
        }
    }
};