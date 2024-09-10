import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-useless-escape': 'off',
      'no-undef': 'off',
      'no-prototype-builtins': 'off',
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
    },
  },
]
