// http://eslint.org/docs/user-guide/configuring

const IS_PRODUCTION = process.env.NODE_ENV === 'prod';

module.exports = {
  root: true,

  extends: ['eslint:recommended', 'google', 'plugin:react/recommended'],

  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    sourceType: 'module',
  },

  env: {
    es6: true,
    node: true,
    browser: true,
    commonjs: true,
    amd: true,
    jquery: true,
  },

  plugins: ['react'],

  globals: {
    __DEV__: false,
    __PROD__: false,
  },

  rules: {
    'strict': 'warn',
    'no-debugger': IS_PRODUCTION ? 'error' : 'off',
    'no-console': IS_PRODUCTION ? 'error' : 'off',
  },
};
