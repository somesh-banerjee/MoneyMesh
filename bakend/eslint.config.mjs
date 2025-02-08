import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-plugin-prettier";
import security from "eslint-plugin-security";
import jsdoc from "eslint-plugin-jsdoc";
import header from "eslint-plugin-header";
import node from "eslint-plugin-node";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    {
        ignores: ['**/.eslintrc.js'],
    },
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:import/recommended',
            'plugin:import/typescript',
            // 'plugin:security/recommended',
            'plugin:jsdoc/recommended',
            'plugin:prettier/recommended',
            'plugin:node/recommended',
            'plugin:you-dont-need-lodash-underscore/compatible',
        ),
    ),
    {
        plugins: {
            '@typescript-eslint': fixupPluginRules(typescriptEslint),
            import: fixupPluginRules(_import),
            'unused-imports': unusedImports,
            prettier: fixupPluginRules(prettier),
            // security: fixupPluginRules(security),
            jsdoc: fixupPluginRules(jsdoc),
            header,
            node: fixupPluginRules(node),
            compat,
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
                ...globals.browser,
            },

            parser: tsParser,
            ecmaVersion: 5,
            sourceType: 'module',

            parserOptions: {
                project: 'tsconfig.json',
            },
        },

        settings: {
            jsdoc: {
                mode: 'typescript',
            },

            'import/resolver': {
                typescript: {},
            },
        },

        rules: {
            'prettier/prettier': 'error',

            quotes: [
                'error',
                'single',
                {
                    avoidEscape: true,
                    allowTemplateLiterals: true,
                },
            ],

            semi: [
                'error',
                'always',
                {
                    omitLastInOneLineBlock: true,
                },
            ],

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

            'max-len': [
                'error',
                {
                    code: 150,
                    ignoreUrls: true,
                },
            ],

            'no-multiple-empty-lines': [
                'error',
                {
                    max: 1,
                    maxEOF: 1,
                },
            ],

            'array-bracket-spacing': ['error', 'always'],

            'array-bracket-newline': [
                'error',
                {
                    multiline: true,
                    minItems: 6,
                },
            ],

            'array-element-newline': [
                'error',
                {
                    multiline: true,
                    minItems: 6,
                },
            ],

            'object-curly-spacing': ['error', 'always'],
            'newline-before-return': 'error',
            'space-before-blocks': 'error',

            'spaced-comment': [
                'error',
                'always',
                {
                    line: {
                        exceptions: ['-', '*', '+'],
                    },
                },
            ],

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

                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],

            'import/no-duplicates': 'error',

            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: false,
                },
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

            'import/newline-after-import': [
                'error',
                {
                    count: 1,
                },
            ],

            'no-console': 'error',
            'no-debugger': 'error',
            'no-return-await': 'error',
            'no-duplicate-imports': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            'prefer-template': 'error',

            'prefer-destructuring': [
                'error',
                {
                    object: true,
                    array: false,
                },
            ],

            'prefer-arrow-callback': 'error',
            'no-useless-return': 'error',
            'no-new-wrappers': 'error',
            'no-unsafe-optional-chaining': 'error',
            'default-param-last': 'error',
            'no-lone-blocks': 'error',
            'security/detect-object-injection': 'warn',
            'security/detect-unsafe-regex': 'warn',
            'security/detect-eval-with-expression': 'error',

            'no-else-return': [
                'error',
                {
                    allowElseIf: true,
                },
            ],

            'no-return-assign': 'error',
            'require-await': 'error',
            'sonarjs/no-duplicate-string': 'warn',
            'sonarjs/no-nested-template-literals': 'error',
            'sonarjs/no-small-switch': 'error',
            'unicorn/prefer-module': 'off',
            'unicorn/no-array-callback-reference': 'error',
            'unicorn/no-useless-fallback-in-spread': 'error',
            'unicorn/prefer-node-protocol': 'error',
            'import/no-webpack-loader-syntax': ['error'],

            'semi-spacing': [
                'error',
                {
                    before: false,
                    after: true,
                },
            ],

            'switch-colon-spacing': [
                'error',
                {
                    after: true,
                    before: false,
                },
            ],

            'template-curly-spacing': ['error', 'never'],
            'wrap-iife': ['error', 'outside'],
            'wrap-regex': 'error',
            'yield-star-spacing': ['error', 'before'],
            yoda: 'error',
            eqeqeq: ['error', 'always'],
            'func-style': ['error', 'expression'],
            'no-dupe-else-if': 'error',

            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: 'class',
                    next: '*',
                },
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

            'header/header': [
                'error',
                'block',
                [
                    '*',
                    " * Somesh's Project",
                    ' * Copyright © ' + new Date().getFullYear(),
                    ' ',
                ],
                {
                    lineEndings: 'unix',
                },
            ],
        },
    },
];