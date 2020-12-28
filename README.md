<p align="center">
  <h1 align="center">🧟‍♀️</h1>
  <h3 align="center">Zombi</h3>
  <p align="center"><i>Easy-to-use, declarative scaffolding tools.</i></p>
</p>

<p align="center">
  <a href="https://github.com/smithki/zombi/blob/master/LICENSE">License</a> ·
  <a href="https://github.com/smithki/zombi/blob/master/CONTRIBUTING.md">Contributing Guide</a>
</p>

## Introduction

Zombi is a task runner and scaffolding tool that makes bootstrapping new projects a cinch! It has an easy-to-learn, JSX-based API. It is still a **Work-in-progress**, but will be ready for prime-time soon. In the meanwhile, please refer to the source code as a reference for how the library works.

## Ecosystem

Zombi is managed as a monorepo so that core functionality and common scaffolds are distributed separately.

| Package directory | Package Name | Version | Description |
| ----------------- | ------------ | ------- | ----------- |
| [`/generators`](./packages/generators) | [`@zombi/generators`](https://www.npmjs.com/package/@zombi/generators) | ![npm](https://img.shields.io/npm/v/@zombi/generators.svg?style=flat-square) | Core scaffolds built using Zombi! |
| [`/zombi`](./packages/zombi) | [`zombi`](https://www.npmjs.com/package/@tsunagi/core) | ![npm](https://img.shields.io/npm/v/zombi.svg?style=flat-square) | Core functionality that makes Zombi work! |
