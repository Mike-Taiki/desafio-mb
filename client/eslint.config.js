import eslintConfigPrettier from 'eslint-config-prettier';
import pluginVue from 'eslint-plugin-vue'
import eslint from '@eslint/js';
import globals from 'globals'


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
    rules: {
      'vue/multi-word-component-names': 'off', // Permite nomes de componentes de uma palavra
      'vue/require-prop-types': 'warn', // Aviso em vez de erro para tipos de props
      'vue/attributes-order': 'warn', // Aviso em vez de erro para ordem de atributos
    }
  },
  eslintConfigPrettier
]