<p align="center">
  <h1 align="center">🧟‍♀️</h1>
  <h3 align="center">Zombi</h3>
  <p align="center"><i>Dead simple, streaming scaffolding for people with braaains.</i></p>
</p>

## Introduction

[TODO: Write introduction content]

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
| `exec` | `PKG=$PACKAGE_NAME yarn exec ...` | Execute commands in the specified package. |
| `dev` | `PKG=$PACKAGE_NAME yarn dev` | Start the specified package in development mode. |
| `build` | `PKG=$PACKAGE_NAME yarn build` | Build the specified package for production. |
| `test` | `PKG=$PACKAGE_NAME yarn test` | Run tests for the specified package. |
| `test_watch` | `PKG=$PACKAGE_NAME yarn test_watch` | Watch tests for the specified package. |
| `lint` | `PKG=$PACKAGE_NAME yarn lint` | Run the linter for the specified package. |
| `clean` | `PKG=$PACKAGE_NAME yarn clean` | Run cleaning scripts for the specified package (NOTE: removes `node_modules`). |
| `release` | `yarn release` | Publishes all packages with unreleased versions. |
