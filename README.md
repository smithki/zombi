<p align="center">
  <h1 align="center">🧟‍♀️</h1>
  <h3 align="center">Zombi</h3>
  <p align="center"><i>Task runner and scaffolding tool for people with braaains.</i></p>
</p>

## Introduction

Zombi is a task runner and scaffolding tool that makes bootstrapping new projects a cinch! It has an easy-to-learn, pipe-style API. It is still a **Work-in-progress**, but will be ready for prime-time soon. In the meanwhile, please refer to the source code as a reference for how the library works. Zombi shares a few concepts with [RxJS](https://rxjs-dev.firebaseapp.com/), so if you're familiar with Observables, this library will feel familiar, too.

## Ecosystem

Zombi is managed as a monorepo so that core functionality and common scaffolds are distributed separately.

| Package directory | Package Name | Version | Description |
| ----------------- | ------------ | ------- | ----------- |
| [`/generators`](./packages/generators) | [`@zombi/generators`](https://www.npmjs.com/package/@zombi/generators) | ![npm](https://img.shields.io/npm/v/@zombi/generators.svg?style=flat-square) | Core scaffolds built using Zombi! |
| [`/zombi`](./packages/zombi) | [`zombi`](https://www.npmjs.com/package/@tsunagi/core) | ![npm](https://img.shields.io/npm/v/zombi.svg?style=flat-square) | Core functionality that makes Zombi work! |

## Development Scripts

| NPM Script | Usage | Description |
| ---------- | ----- | ----------- |
| `bootstrap` | `yarn bootstrap` | Install dependencies/set up a local development environment. |
| `bump_version` | `yarn bump_version` | Bump the version using Lerna's utility. |
| `exec` | `PKG=$PACKAGE_NAME yarn exec ...` | Execute commands in the specified package. |
| `dev` | `PKG=$PACKAGE_NAME yarn dev` | Start the specified package in development mode. |
| `build` | `PKG=$PACKAGE_NAME yarn build` | Build the specified package for production. |
| `lint` | `PKG=$PACKAGE_NAME yarn lint` | Run the linter for the specified package. |
| `clean` | `PKG=$PACKAGE_NAME yarn clean` | Run cleaning scripts for the specified package. |
| `clean_node_modules` | `yarn clean_node_modules` | Remove all node modules. |
