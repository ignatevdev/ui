module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:jest/recommended'
    ],
    'plugins': ['jest'],
    'env': {
        'jest/globals': true
    },
    rules: {
        'quotes': [2, 'single', { 'avoidEscape': true }],
        'react/jsx-indent': 0,
        'react/jsx-closing-tag-location': 0,
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-indent-props': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-curly-newline': 0,
        'react/button-has-type': 0,
        'react/prop-types': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        "@typescript-eslint/no-namespace": 0,
        "@typescript-eslint/no-explicit-any": 0
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    settings: {
        react: {
          version: 'detect'
        }
    }
};