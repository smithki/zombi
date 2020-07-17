#!/usr/bin/env bash

echo
echo "+------------------------------------------------------------------------------+"
echo "  Building TypeScripts..."
echo

tsconfig_paths=$(echo -e $(yarn --silent paths tsconfig.json))

echo "Compiling TypeScripts for the following projects:"
node -pe "'$tsconfig_paths'.split(' ').reduce((prev, next) => prev + '\n  - ' + next, '')"
echo

tsc -b $tsconfig_paths
echo "TypeScripts compiled."
