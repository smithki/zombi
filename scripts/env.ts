#!/usr/bin/env ts-node-script

/*
  eslint-disable

  global-require,
  import/no-dynamic-require,
  @typescript-eslint/no-var-requires
*/

import { replaceInFile, To } from 'replace-in-file';
import { resolve, join } from 'path';
import mimimatch from 'minimatch';

const root = join(__dirname, '..');
const extensions = '{js,json,ts,tsx}';
const packages = process.argv.slice(2);
const files = packages.map(f => resolve(root, f, `dist/**/*.${extensions}`));

/**
 * Environment variables to be interpolated into the built files. Interpolations
 * occur where `"%VARIABLE_NAME%"` is found. For best results,
 */
const environment: { [key: string]: To | To[] } = {
  HYBRID_MAGIC_SDK_IMPORT: (match, filename) => {
    const isReactNative =
      filename && mimimatch(filename, join(root, 'packages/*', `dist/react-native/**/*.${extensions}`));
    return isReactNative ? '@magic-sdk/react-native' : 'magic-sdk';
  },
};

Object.keys(environment).forEach(async envVar => {
  const envResolver = environment[envVar];

  if (envResolver) {
    await replaceInFile({
      files,
      from: `%${envVar}%`,
      to: typeof envResolver === 'function' ? (...args) => envResolver(args[0], args.pop()!) : envResolver,
      allowEmptyPaths: true,
    }).catch(console.error);

    console.log(`Injected ENV variable \`${envVar}\``);
  }
});
