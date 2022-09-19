module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: 'standard',
  rules: {
    semi: [2, 'always'],
    'space-before-function-paren': 0,
    'comma-dangle': [2, 'never']
  }
};
