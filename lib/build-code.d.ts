/**
 * Builds the source code and writes the build report to a file.
 * @param {string} command - The command to execute to build the code.
 * @param {string} source - The path to the source code directory.
 * @return {number} The exit code of the shell command.
 */
export declare const buildCode: (command: string, source: string) => number;
