import { Error } from './types/global';
/**
 * This function extracts all HTML files in a given directory and validates them.
 * @async
 * @param {string} source - The directory to search for HTML files in.
 * @param {string} [pattern] - The pattern to match file paths against.
 * @returns {Promise<Array<Error>>} An array of Error objects representing the validation errors found in the HTML files.
 */
export declare const bem: (source: string, pattern?: string) => Promise<Error[]>;
