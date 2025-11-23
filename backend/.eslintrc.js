module.exports = {
    root: true,
    env: {
        node: true,
        jest: true,
        browser: true,
        es2021: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended', // Base recommended rules
        'plugin:@typescript-eslint/recommended', // TypeScript best practices
        'plugin:import/recommended', // Import/export best practices
        'plugin:import/typescript', // TypeScript-specific import rules
        'plugin:security/recommended', // Security best practices
        'plugin:jsdoc/recommended', // Enforces JSDoc documentation
        'plugin:prettier/recommended', // Enforces Prettier formatting
        'plugin:node/recommended', // Node.js best practices
        'plugin:you-dont-need-lodash-underscore/compatible', // Lodash/Underscore best practices
    ],
    plugins: [
        '@typescript-eslint',
        'import',
        'unused-imports',
        'prettier',
        'security',
        'jsdoc',
        'header',
        'node',
        'compat',
    ],
    settings: {
        jsdoc: {
            mode: 'typescript',
        },
        'import/resolver': {
            typescript: {},
        },
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        /*** Code Style & Formatting ***/
        'prettier/prettier': 'error',
        quotes: [
            'error',
            'single',
            { avoidEscape: true, allowTemplateLiterals: true },
        ],
        semi: ['error', 'always', { omitLastInOneLineBlock: true }],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
        'eol-last': ['error', 'always'],
        'max-len': ['error', { code: 80, ignoreUrls: true }],
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
        'array-bracket-spacing': ['error', 'always'],
        'array-bracket-newline': ['error', { multiline: true, minItems: 6 }],
        'array-element-newline': ['error', { multiline: true, minItems: 6 }],
        'object-curly-spacing': ['error', 'always'],
        'newline-before-return': 'error',
        'space-before-blocks': 'error',
        'spaced-comment': [
            'error',
            'always',
            { line: { exceptions: ['-', '*', '+'] } },
        ],
        endOfLine: 'crlf',

        /*** TypeScript-Specific Rules ***/
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'none',
                argsIgnorePattern: '^_',
                caughtErrors: 'all',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/consistent-type-definitions': [
            'error',
            'interface',
        ],
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',

        /*** Import Rules ***/
        'import/order': [
            'error',
            {
                groups: [
                    ['builtin', 'external'],
                    'internal',
                    ['parent', 'sibling'],
                    'index',
                ],
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
        'import/no-duplicates': 'error',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: false },
        ],
        'import/no-mutable-exports': 'error',
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
                mjs: 'never',
                json: 'always',
            },
        ],
        'import/newline-after-import': ['error', { count: 1 }],

        /*** Best Practices & Security ***/
        'no-console': 'error',
        'no-debugger': 'error',
        'no-return-await': 'error',
        'no-duplicate-imports': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-template': 'error',
        'prefer-destructuring': ['error', { object: true, array: false }],
        'prefer-arrow-callback': 'error',
        'no-useless-return': 'error',
        'no-new-wrappers': 'error',
        'no-unsafe-optional-chaining': 'error',
        'default-param-last': 'error',
        'no-lone-blocks': 'error',
        'security/detect-object-injection': 'warn',
        'security/detect-unsafe-regex': 'warn',
        'security/detect-eval-with-expression': 'error',
        'no-else-return': ['error', { allowElseIf: true }],
        'no-return-assign': 'error',
        'space-before-blocks': 'error',
        'require-await': 'error',

        /*** SonarJS - Code Smell Detection ***/
        'sonarjs/no-duplicate-string': 'warn',
        'sonarjs/no-nested-template-literals': 'error',
        'sonarjs/no-small-switch': 'error',

        /*** Unicorn - Enforce Modern JS ***/
        'unicorn/prefer-module': 'off',
        'unicorn/no-array-callback-reference': 'error',
        'unicorn/no-useless-fallback-in-spread': 'error',
        'unicorn/prefer-node-protocol': 'error',

        /*** Others ***/

        'import/no-webpack-loader-syntax': ['error'],
        'semi-spacing': ['error', { before: false, after: true }],
        'switch-colon-spacing': ['error', { after: true, before: false }],

        'template-curly-spacing': ['error', 'never'],
        'wrap-iife': ['error', 'outside'],
        'wrap-regex': 'error',
        'yield-star-spacing': ['error', 'before'],
        yoda: 'error',
        eqeqeq: ['error', 'always'],
        'func-style': ['error', 'expression'],
        // 'max-params': ['error', 4],
        // 'no-await-in-loop': 'error',
        'no-dupe-else-if': 'error',
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: 'class', next: '*' },
        ],

        'no-template-curly-in-string': 'error',
        'no-duplicate-case': 'error',
        'no-extra-semi': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'default-case-last': 'error',
        'no-fallthrough': 'error',
        'no-import-assign': 'error',
        'no-new-object': 'error',
        'no-proto': 'error',
        'no-array-constructor': 'error',
        'no-inline-comments': 'error',
        'prefer-rest-params': 'error',

        /*** Header ***/
        'header/header': [
            'error',
            'block',
            [
                '*',
                " * Somesh's Project",
                ' * Copyright © ' + new Date().getFullYear(),
                ' ',
            ],
            { lineEndings: 'unix' },
        ],
    },
};

