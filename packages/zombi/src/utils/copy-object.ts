// --- Imports -------------------------------------------------------------- //

import { merge } from 'lodash';

// --- Business logic ------------------------------------------------------- //

export const copyObject = (source: any) => merge({}, source);
