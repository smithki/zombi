// --- Types ---------------------------------------------------------------- //

export interface RefineOptions {
  ignoreNil?: boolean;
  ignoreNull?: boolean;
  ignoreUndefined?: boolean;
  ignoreEmpty?: boolean;
  ignoreEmptyArrays?: boolean;
  ignoreEmptyObjects?: boolean;
  ignoreEmptyStrings?: boolean;
}

// --- Logic ---------------------------------------------------------------- //

const filterObj = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((result, key) => Object.assign(result, { [key]: obj[key] }), {});

function getObjectTag(value: any) {
  return Object.prototype.toString.call(value);
}

function assertObjectTag(check: string, value: any) {
  const tagRegExp = /\[object (\w+)\]/;
  const tag = tagRegExp.test(check) ? check.replace(tagRegExp, '$1') : check;
  return getObjectTag(value) === `[object ${tag}]`;
}

const isArray = Array.isArray;
const isIterable = value =>
  assertObjectTag('Function', value && value[Symbol.iterator]);
const isFunction = value => assertObjectTag('Function', value);
const isString = value => assertObjectTag('String', value);
const isNull = value => assertObjectTag('Null', value);
const isUndefined = value => assertObjectTag('Undefined', value);
const isNil = value => isNull(value) || isUndefined(value);
const isObject = value => typeof value === 'object';
const isPlainObject = value => {
  if (!isObject(value) || !assertObjectTag('Object', value)) return false;
  if (isNull(Object.getPrototypeOf(value))) return true;

  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
};

function isEmpty(value) {
  if (isNil(value)) return true;
  if (isIterable(value)) return value[Symbol.iterator]().next().done;
  if (isObject(value)) return !Object.keys(value).length;
  return !value;
}

function predicate(options: RefineOptions) {
  return value => {
    // Ignore functions
    if (isFunction(value)) return true;

    // Types
    const string = isString(value);
    const array = isArray(value);
    const object = isPlainObject(value);

    // Test for nil values
    const nullVal = !options.ignoreNull && isNull(value);
    const undefinedVal = !options.ignoreUndefined && isUndefined(value);
    const nil = !options.ignoreNil && (nullVal || undefinedVal);

    // Test for empty values
    const empty = isEmpty(value);
    const emptyString = !options.ignoreEmptyStrings && (empty && string);
    const emptyArray = !options.ignoreEmptyArrays && (empty && array);
    const emptyObject = !options.ignoreEmptyObjects && (empty && object);
    const emptyAny =
      !options.ignoreEmpty && (emptyString || emptyArray || emptyObject);

    // Result of nil / empty tests
    return !(nil || emptyAny);
  };
}

/**
 * Create a streamlined object free of null, undefined, empty strings, empty
 * arrays, or empty objects.
 *
 * @param collection The collection (object or array) to clean.
 * @param options Customize which nil or empty values will be omitted.
 */
export function refine<T extends object>(
  collection: T,
  options: RefineOptions = {},
): Partial<T> {
  // If collection is function, return as is.
  if (isFunction(collection)) {
    return collection;
  }

  // If collection is array, return omitted values in a new array.
  if (isArray(collection)) {
    return collection.filter(predicate(options)) as any;
  }

  // If collection is object (and not array), return values in a new object.
  if (isPlainObject(collection)) {
    return filterObj(collection, predicate(options));
  }

  // If collection is any other type, return as is. In TypeScript, this should
  // be unreachable unless a collection is cast to 'any'.
  return collection;
}

/**
 * Recursively create a streamlined object free of null, undefined, empty
 * strings, empty arrays, or empty objects.
 *
 * @param collection The collection (object or array) to refine deeply.
 * @param options Customize which nil or empty values will be omitted.
 */
export function refineDeep<T extends object>(
  collection: T,
  options: RefineOptions = {},
): Partial<T> {
  const result: any = collection;

  for (const i in result) {
    let value = result[i]; // Save a reference to the current value.
    // Execute refine() on current value.
    value = refine(value, options);
    // If value is object (including array), recurse deeply.
    if (isObject(value)) {
      value = refineDeep(value, options);
    }
    result[i] = value; // Apply the transformed value.
  }

  // Execute refine() at the top level and return result.
  return refine(result, options) as Partial<T>;
}
