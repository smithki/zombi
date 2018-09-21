import { join } from 'path';
import { licenseFile } from './generators/license-file';
import { zombi } from './src';

const g1 = zombi({
  destinationRoot: join(__dirname, 'test'),
});

g1.compose(licenseFile);
g1.run();
