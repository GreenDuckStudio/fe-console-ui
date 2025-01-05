import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Base configuration for all files
  {
    ignores: ['**/node_modules/**', 'public/**', 'dist/**', 'build/**'],
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  },

  // Source files configuration
  {
    files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },

  // JavaScript configurations
  {
    files: ['src/**/*.{js,mjs,cjs,jsx}'],
    ...pluginJs.configs.recommended
  },

  // TypeScript configurations
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      ...typescript.configs['recommended'].rules,
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },

  // React configurations
  {
    files: ['src/**/*.{jsx,tsx}'],
    plugins: {
      react: pluginReact
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/react-in-jsx-scope': ['error', { import: 'react' }],
      ...pluginReact.configs.recommended.rules
    }
  },

  // Prettier configurations
  {
    files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      'prettier/prettier': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off'
    }
  }
];
