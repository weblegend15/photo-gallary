/**
 * ESLint config
 *
 * # Extending configs:
 *   - airbnb
 *   - prettier
 *   - jest
 *
 * # Customizations:
 * * Disabled camelcase: Because we use snake_case variables for the data that is fetched from api.
 * * Disabled enforcing default export when there is only 1 export
 * * Enabled extensions .js and .jsx
 * * Disable react/jsx-indent
 *   @see https://github.com/eslint/eslint/issues/9047
 * * Disabled jsx-a11y/heading-has-content because it seems to be throwing false positives
 * * Disabled jsx-a11y/anchor-has-content because it seems to be throwing false positives
 * * Customize jsx-indent-props to use 4 space
 */

module.exports = {
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
    parser: 'babel-eslint',
    extends: [
        'airbnb',
        'plugin:prettier/recommended',
        'plugin:jest/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            experimentalDecorators: true,
        },
        sourceType: 'module',
    },
    rules: {
        camelcase: 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        'jest/no-disabled-tests': 'off',
        'jsx-a11y/anchor-has-content': 'off',
        'jsx-a11y/heading-has-content': 'off',
        'no-param-reassign': ['error', { props: false }],
        'react/forbid-prop-types': ['error', { forbid: ['any'] }],
        'react/jsx-filename-extension': [
            'warn',
            { extensions: ['.js', '.jsx'] },
        ],
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': ['warn', 4],
        'react/no-array-index-key': 'off',
    },
    globals: {
        window: false,
        document: false,
        localStorage: false,
    },
}
