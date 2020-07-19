#!/usr/bin/env bash

echo
echo "+------------------------------------------------------------------------------+"
echo "  Linting TypeScripts..."
echo

yarn wsrun --stages -r eslint --fix **/src/**/*.ts
