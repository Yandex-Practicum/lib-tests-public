/**
 * Runs W3C validation on HTML files in the given directory.
 * @async
 * @param {string} source - Path to the directory to scan.
 * @param {string} [pattern] - Glob pattern to match the HTML files to validate.
 * @returns {Promise<Error[]>} Array of error objects, with each object containing the validation error details.
 */
export declare const w3c: (source: string, pattern?: string) => Promise<any[]>;
