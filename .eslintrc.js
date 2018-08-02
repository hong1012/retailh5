// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    
    "arrow-parens": [2, "as-needed"],
    "space-before-function-paren": ["error", "never"],
    "semi": 0,
    "no-undef": ["error", { "typeof": false }],
    "one-var": 0,
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "eol-last": 0,
    "no-eval": 0,
    "no-throw-literal": 0,
    "no-unused-vars": 0,
    "spaced-comment": 0,
    "no-constant-condition": 0,
    "no-tabs": 0,
    "block-spacing": 0
  }
}
