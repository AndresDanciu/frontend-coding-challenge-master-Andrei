module.exports = {
  plugins: ['sonarjs', 'promise', 'unicorn', 'react', '@typescript-eslint'],
  extends: [
    'plugin:eslint-comments/recommended',
    'plugin:compat/recommended',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    // When extending, this must go last
    'prettier',
  ],
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [],
  rules: {
    // Use function hoisting to improve code readability
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],

    '@typescript-eslint/no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    /* Requires object keys to be sorted */
    // 'sort-keys': [
    //   'warn',
    //   'asc',
    //   { caseSensitive: true, natural: true, minKeys: 4 },
    // ],

    // This option enforces a specific function type for function components.
    'react/function-component-definition': 'off',

    /**  ****** Plugin:sonarjs ****** **/
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/cognitive-complexity': ['warn', 6],

    /**  ****** Plugin:unicorn ****** **/
    'unicorn/consistent-function-scoping': 'off',
    /* Common abbreviations are known and readable */
    'unicorn/prevent-abbreviations': 'off',
    /* Airbnb prefers forEach */
    'unicorn/no-array-for-each': 'off',
    /* allow cjs module */
    'unicorn/prefer-module': 'warn',
    'unicorn/prefer-node-protocol': 'off',
    /* name format file */
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        // ignore: ['react-app-env.d.ts', 'react-i18next.d.ts'],
      },
    ],
  },
};
