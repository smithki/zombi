import React, { isValidElement, ReactElement } from 'react';
import path from 'path';
import treeWalker from 'react-ssr-prepass';
import { Zombi } from './components/zombi';
import { Directory } from './components/directory';
import { Template } from './components/template';
import { Effect } from './components/effect';
import { copy } from './fs';

export async function scaffold<Props>(tree: ReactElement<Props>) {
  const effects: Effect[] = [];

  await treeWalker(tree, (element, instance) => {
    if (isValidElement(element) && element.type === Effect) {
      effects.push(element.props as Effect);
    }
  });

  await Promise.all(
    effects.map(e => {
      return copy(e.from, e.to, e.options);
    }),
  );
}

const testTree = (
  <Zombi templateRoot={path.resolve(__dirname, '../baz')} destinationRoot={path.resolve(__dirname, '../bar')}>
    <Directory name="foo">
      <Template template="foo-template.txt" />
    </Directory>
  </Zombi>
);

scaffold(testTree)
  .then(() => {
    console.log('done!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
