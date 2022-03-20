/* eslint-disable no-bitwise */

import React, { ReactElement } from 'react';
import path from 'path';
import fs from 'fs';
import { assign, isBoolean } from 'lodash';
import { Data as EjsData } from 'ejs';
import { usePathContext } from './directory';
import { useZombiContext, ZombiFsOptions } from './zombi';
import { Effect, EffectModifier } from './effect';
import { Maybe, Resolveable } from '../types';
import { resolveData } from '../utils/resolve-data';

export interface TemplateComponent {
  <T extends EjsData>(
    props: Template<T> & { children?: (filepath: string, data: T) => EffectModifier | Promise<EffectModifier> },
  ): ReactElement | null;
}

export interface Template<T extends EjsData = EjsData> extends ZombiFsOptions<T> {
  name?: Resolveable<string, T>;
  source: Resolveable<string, T>;
  permission?:
    | 'r'
    | 'rs'
    | 'sr'
    | 'r+'
    | 'rs+'
    | 'sr+'
    | 'w'
    | 'wx'
    | 'xw'
    | 'w+'
    | 'wx+'
    | 'xw+'
    | 'a'
    | 'ax'
    | 'xa'
    | 'a+'
    | 'ax+'
    | 'xa+';
}

const TemplateImpl: TemplateComponent = (props) => {
  const { name, source, clobber, data, permission, children } = props;

  const ctx = useZombiContext();

  const optionsWithOverrides: Effect<any>['options'] = {
    ...ctx,
    clobber: clobber ?? ctx?.clobber,
    data: assign({}, ctx?.data, data),
    ejs: data !== false,
    symlink: false,
    modifier: children ?? ((filepath) => filepath),
    permission: getPermissionsConstant(permission),
  };

  const { from, to } = useFromToValues(source, name, optionsWithOverrides);

  return <Effect from={from} to={to} options={optionsWithOverrides} />;
};

export interface TemplateSymlinkComponent {
  <T extends EjsData>(
    props: TemplateSymlink<T> & { children?: (filepath: string, data: T) => Maybe<string> | Promise<Maybe<string>> },
  ): ReactElement | null;
}

export interface TemplateSymlink<T extends EjsData = EjsData> extends Omit<Template<T>, 'data'> {}

const TemplateSymlink: TemplateSymlinkComponent = (props) => {
  const { name, source, clobber, permission, children } = props;

  const ctx = useZombiContext();

  const optionsWithOverrides: Effect<any>['options'] = {
    ...ctx,
    clobber: clobber ?? ctx?.clobber,
    data: assign({}, ctx?.data),
    ejs: false,
    symlink: true,
    modifier: children ?? ((filepath) => filepath),
    permission: getPermissionsConstant(permission),
  };

  const { from, to } = useFromToValues(source, name, optionsWithOverrides);

  return <Effect from={from} to={to} options={{ ...optionsWithOverrides }} />;
};

function useFromToValues(
  source: Resolveable<string, any>,
  name: Resolveable<string, any> | undefined,
  options: Effect['options'],
) {
  const pathCtx = usePathContext();
  const resolvedSource = resolveData(source, options.data);
  const resolvedName = resolveData(name, options.data);

  return {
    from: resolvedSource,
    to: path.join(...pathCtx, resolvedName ?? resolvedSource),
  };
}

/**
 * @see https://github.com/nodejs/node/blob/40366df885ec75c7eeee5e7e7626212ae1a6e770/lib/internal/fs.js#L30-L52
 */
function getPermissionsConstant(permission: Template['permission']) {
  switch (permission) {
    case 'r':
      return fs.constants.O_RDONLY;

    case 'rs':
    case 'sr':
      return fs.constants.O_RDONLY | fs.constants.O_SYNC;
    case 'r+':
      return fs.constants.O_RDWR;

    case 'rs+':
    case 'sr+':
      return fs.constants.O_RDWR | fs.constants.O_SYNC;

    case 'w':
      return fs.constants.O_TRUNC | fs.constants.O_CREAT | fs.constants.O_WRONLY;

    case 'wx':
    case 'xw':
      return fs.constants.O_TRUNC | fs.constants.O_CREAT | fs.constants.O_WRONLY | fs.constants.O_EXCL;

    case 'w+':
      return fs.constants.O_TRUNC | fs.constants.O_CREAT | fs.constants.O_RDWR;

    case 'wx+':
    case 'xw+':
      return fs.constants.O_TRUNC | fs.constants.O_CREAT | fs.constants.O_RDWR | fs.constants.O_EXCL;

    case 'a':
      return fs.constants.O_APPEND | fs.constants.O_CREAT | fs.constants.O_WRONLY;

    case 'ax':
    case 'xa':
      return fs.constants.O_APPEND | fs.constants.O_CREAT | fs.constants.O_WRONLY | fs.constants.O_EXCL;

    case 'a+':
      return fs.constants.O_APPEND | fs.constants.O_CREAT | fs.constants.O_RDWR;

    case 'ax+':
    case 'xa+':
      return fs.constants.O_APPEND | fs.constants.O_CREAT | fs.constants.O_RDWR | fs.constants.O_EXCL;

    default:
      return undefined;
  }
}

export const Template = assign(TemplateImpl, { Symlink: TemplateSymlink });
