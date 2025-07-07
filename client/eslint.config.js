import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';


export default [
  // Configuração base do ESLint
  eslint.configs.recommended,
  
  // Configurações do Vue.js
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/*.min.js']
  },
  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    },
    rules: {}
  },
  eslintConfigPrettier
]