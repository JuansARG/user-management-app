import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  { ignores: ['dist', 'coverage'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { 
      react: { version: '18.3' } 
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'sort-destructure-keys': sortDestructureKeys,
      'unused-imports': unusedImports,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      
      // Solo reglas de calidad de código (no formato)
      'camelcase': 'error',
      'curly': ['error', 'multi'],
      'eqeqeq': ['error', 'always'],
      'func-style': 'error',
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true}],
      'no-alert': 'error',
      'no-console': ['warn', { allow: ['error'] }],
      'no-const-assign': 'error',
      'no-constant-binary-expression': 'error',
      'no-constant-condition': 'error',
      'no-duplicate-imports': 'error',
      'no-empty': 'error',
      'no-empty-pattern': 'error',
      'no-redeclare': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: 'next' }],
      'no-use-before-define': 'error',
      'no-useless-catch': 'warn',
      'prefer-const': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react/button-has-type': 'error',
      'react/jsx-key': 'error',
      'react/jsx-max-props-per-line': ['error', { maximum: 3 }],
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-sort-props': 'error',
      'react/no-multi-comp': 'error',
      'react/self-closing-comp': 'error',
      'sort-destructure-keys/sort-destructure-keys': ['warn', { caseSensitive: false }],
      'unused-imports/no-unused-imports': 'warn',
      
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]