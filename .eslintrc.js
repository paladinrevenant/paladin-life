module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "plugin:vitest-globals/recommended"
    ],
    plugins: ["vitest"],
    parser: "vue-eslint-parser",
    parserOptions: {
        "ecmaVersion": 2022,
        "sourceType": "module"
    },
    env: {
        "browser": true,
        "commonjs": true,
        "node": true,
        "es6": true,
        "vitest-globals/env": true
    },
    rules: {
        "no-unused-vars": "warn",
        "quotes": ["error", "double"],
        "react/prop-types": "off",
        "semi": ["error", "always"],
        "vue/html-indent": ["warn", 4]
    }
};