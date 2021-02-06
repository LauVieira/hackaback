module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'semi': [2, 'always'],
    'object-curly-spacing': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'padded-blocks': ['error', 'never'],
    'quotes': ['error', 'single'],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'space-in-parens': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'space-before-function-paren': ['error', 'always']
  },
};
