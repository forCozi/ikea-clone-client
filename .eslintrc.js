module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['react-app', 'airbnb'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
        endOfLine: 'auto',
        // arrowParens: 'avoid',
      },
    ],
    'react/jsx-filename-extension': 0,
    'comma-dangle': 0,
    'no-console': 0,
    'operator-linebreak': 0,
    'implicit-arrow-linebreak': 0,
    'linebreak-style': 0,
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    indent: 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-nested-ternary': 0,
  },
};
