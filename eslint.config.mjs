// @ts-check

import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  {
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      prettierConfig,
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_' },
      ],
    },
  },
]);
