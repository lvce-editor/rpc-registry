import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config.default,
  ...config.recommendedNode,
  ...actions.default,
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
]
