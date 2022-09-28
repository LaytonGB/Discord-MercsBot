module.exports = {
    "env": {
        "es2021": true,
        "node": true,
    },
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    "plugins": [
        "@typescript-eslint",
    ],
    "rules": {
        "comma-dangle": ["warn", "always-multiline"],
        "semi": ["warn", "always"],
    },
};
