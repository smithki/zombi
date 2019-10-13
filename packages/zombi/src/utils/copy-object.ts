// --- Imports -------------------------------------------------------------- //

import { merge } from 'lodash';

// --- Business logic ------------------------------------------------------- //

export const copyObject = <T>(source: T): T => merge({}, source);
