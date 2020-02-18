module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2020,
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    },
    "sourceType": "module"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "plugins": [
    "react",
    "react-hooks",
  ],
  "extends": [
    "standard-jsx"
  ],
  "rules": {
    "react/jsx-no-bind": ["error", {
      "allowArrowFunctions": true,
      "allowBind": false,
      "ignoreRefs": true
    }],
    "quotes": ["error", "single"],
    "semi": ["error"],
    "jsx-quotes": ["error", "prefer-double"],
    "react/no-did-update-set-state": "error",
    "react/no-unknown-property": "error",
    "react/no-unused-prop-types": "error",
    "react/prop-types": "error",
    "react/display-name": 1,
    "react/react-in-jsx-scope": "error",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
};
