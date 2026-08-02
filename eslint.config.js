import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config.default,
  ...config.recommendedNode,
  ...config.recommendedActions,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },
  {
    files: ['**/package.json'],
    rules: {
      'package-json/require-description': 'off',
    },
  },
  {
    rules: {
      'github-actions/ci-versions': 'off',
    },
  },
])
