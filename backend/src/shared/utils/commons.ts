
/**
 * @function cleanNullUndefinedFromArray
 * @description Cleans the array from NULL, UNDEFINED
 */
export const cleanNullUndefinedFromArray = <T>(array: T[]): T[] => [array].flat().filter((e) => e);

/**
 * @function cleanUndefinedFromObject
 * @description Cleans the object from UNDEFINED
 */
export const cleanUndefinedFromObject = <T>(object: T): T => JSON.parse(JSON.stringify(object));

/**
 * @description Compares 2 string with caseInSensitivity
 * @example
 *      1. compareString('S1', 'S2', false) -> false
 *      2. compareString('S1', 's1', true) -> true
 * @param string1 String 1 to compare
 * @param string2 String 2 to compare
 * @param caseInSensitvity To check with caseinsensitivity, default is case in sensitive comparison,
 *                          means it is 'true'
 * @returns boolean
 * @type {(string1: string, string2: string, caseInSensitvity: boolean) => boolean}
 */
export const compareString = (string1: string, string2: string, caseInSensitvity = true): boolean => {
  if (isEmpty(string1) || isEmpty(string2)) return false;

  caseInSensitvity = setDefaultValue(caseInSensitvity, true);

  if (caseInSensitvity) {
    string1 = string1?.toLowerCase();
    string2 = string2?.toLowerCase();
  }

  return string1 === string2;
};

/**
 * @function concat concats multiple strings
 * @description Concats the strings
 * @param {string[]} values Values to concat
 * @returns {string} concatenated values
 */
export const concat = (...values: string[]): string => concatWIthCustomSeparator('', ...values);

/**
 * @function concatWIthCustomSeparator concats multiple strings with customseparator
 * @description Concats the strings with a custom separator
 * @param {string} separator Separator to use
 * @param {string[]} values Values to concat
 * @returns {string} concatenated values with separator
 */
export const concatWIthCustomSeparator = (separator = '', ...values: string[]): string => {
  separator = setDefaultValue(separator, '');

  if (isEmpty(values)) return separator;

  values = [values].flat().filter((e) => e);

  return values.join(separator);
};

/**
 * @function convertObjectToUrlEncodedValues
 * @description To convert {{params}} in url encoded format
 * @param {object} params Key value pair
 * @returns {string} string as urlencoded values
 */
export const convertObjectToUrlEncodedValues = (params: any): string => {
  params = setDefaultValue(params, {});

  return new URLSearchParams(params).toString();
};

/**
 * @function decodeFromBase64
 * @description Decodes the given {{base64Source}}
 * @param {string} base64Source source string
 * @returns {string}
 */
export const decodeFromBase64 = (base64Source: string): string => {
  if (isEmpty(base64Source)) return '';

  return Buffer.from(base64Source, 'base64').toString('ascii');
};

/**
 * @function encodeToBase64
 * @description Encodes the given {{source}} to base64
 * @param {string} source source string
 * @returns {string}
 */
export const encodeToBase64 = (source: string): string => {
  if (isEmpty(source)) return '';

  return Buffer.from(source).toString('base64');
};

/**
 * @function isEmpty
 * @description To check whether the given string/object is empty
 * @param {string|object} value: Any object or string.
 * @returns {boolean} {{value}} is empty?
 */
export const isEmpty = (value: string | any): boolean => {
  if (!value) value = '';

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  return [Object, Array].includes((value || {}).constructor) && !Object.entries(value || {}).length;
};

/**
 * @function omit Omits 1 level keys only
 * @description To omit the {{blacklist}} keys from {{obj}} & returns the remaining object
 * @param {object} obj Object from which we want to omit/delete a key
 * @param {string[]} blackList Array of keys to be deleted from the Object
 * @returns {object} Object with {{blackList}} keys removed from {{oj}}
 */
export const omit = <T>(obj: any, blackList: string[]): T => {
  if (isEmpty(obj)) return obj;

  blackList = setDefaultValue(blackList, []);

  return Object.fromEntries(Object.entries(obj).filter(([key]) => !blackList.includes(key))) as unknown as T;
};

/**
 * @function pick Picks 1 level keys only
 * @description To pick the {{picklist}} keys from {{obj}} & returns the remaining object
 * @param {object} obj Object from which we want to pick/add a key
 * @param {string[]} pickList Array of keys to be included from the Object
 * @returns {object} Object with {{picked}} keys added to {{obj}}
 */
export const pick = <T>(obj: any, pickList: string[]): T => {
  if (isEmpty(obj)) return obj;

  pickList = setDefaultValue(pickList, []);

  return Object.fromEntries(Object.entries(obj).filter(([key]) => pickList.includes(key))) as unknown as T;
};

/**
 * @function setDefaultValue
 * @description Returns the default value, in case {{obj}} isEmpty
 * @param {T} obj anything
 * @returns {T}
 */
export const setDefaultValue = <T>(obj: T, defaultValue: T): T => {
  if (isEmpty(obj)) return defaultValue;

  return obj;
};

/**
 * @function startsWithIgnoreCase
 * @description To check whether {{source}} starts with {{patterns}}
 * @param {string} source   string in which we want to search
 * @param {string | string[]} patterns  {{patterns}} we are searching for in the {{source}} string
 * @returns {boolean}
 */
export const startsWithIgnoreCase = (source: string, ...patterns: string[]): boolean => {
  if (isEmpty(source)) return false;

  if (isEmpty(patterns)) return true;

  // Clean the array from null / undefined inputs
  patterns = cleanNullUndefinedFromArray(patterns);

  return patterns.filter((pattern) => source.toLowerCase().startsWith(pattern.toLowerCase())).length === patterns.length;
};

/**
 * @function findInArrayWithKeyValue
 * @description Returns the element in the array based on passed key value pair
 * @param {any[]} array Array in which we want to search
 * @param {string} key Key to search in the array
 * @param {any} value Value to search in the array
 * @returns {any} Element, index of the element in the array based on passed key value pair
 */
export const findInArrayWithKeyValue = (array: any[], key: string, value: any): any => {
  if (isEmpty(array) || isEmpty(key) || isEmpty(value)) return null;

  return array.find((element) => element[key] === value);
};

/**
 * @function formatDateTime
 * @description Formats the date time
 * @param {Date | string} value date we want to format
 * @returns {string} formatted date time string
 */
export const formatDateTime = (value: Date | string): string => {
  const date = new Date(value);

  const options: any = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };

  return date?.toLocaleDateString(undefined, options);
};

/**
 * @function generateRegexFromArrayForOr
 * @description generate regex from a array of strings to match any of the string
 * @param {string[]} values Array of strings to generate regex
 * @returns {RegExp} regex string
 */
export const generateRegexFromArrayForOr = (values: string[]): RegExp => {
  if (isEmpty(values)) return null;

  return new RegExp(values.join('|'));
};

/**
 * 
 * @function formatDate
 * @description Formats the date
 * @param {Date | string} value date we want to format
 * @returns {string} formatted date string
 */
export const formatDate = (value: Date | string, timeZone = 'America/New_York'): string => {
  // export const formatDate = (value: Date | string, timeZone = 'Pacific/Kiritimati'): string => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone,
  } as any;
  const date = new Date(value);

  return date.toLocaleDateString('en-US', options).replace(/,/g, '');
};
