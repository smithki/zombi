module.exports = {
  root: true,

  extends: ['@ikscodes/eslint-config'],

  rules: {
    // Core ESLint rules
    "no-alert": 2,
    "no-multi-assign": 0,
    "no-await-in-loop": 0,
    "no-return-assign": 0,
    "consistent-return": 0,
    "class-methods-use-this": 0,
    "no-useless-constructor": 0,
    "no-async-promise-executor": 0,

    // Import rules
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,

    // TypeScript rules
    "@typescript-eslint/await-thenable": 0,
    "@typescript-eslint/no-unsafe-call": 0,
    "@typescript-eslint/no-unsafe-return": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/no-useless-constructor": 0,
    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
  },

  settings: {
    'import/resolver': {
      typescript: {
        project: ['./**/tsconfig.json'],
      },
    },
  },
}
