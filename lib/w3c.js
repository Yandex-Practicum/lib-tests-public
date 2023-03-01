"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.w3c = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const undici_1 = require("undici");
const glob_1 = __importDefault(require("glob"));
const validate = async (html) => {
    const { body } = await (0, undici_1.request)('https://validator.w3.org/nu/?out=json', {
        body: html,
        method: 'POST',
        headers: {
            'content-type': 'text/html; charset=utf-8',
            'user-agent': 'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion',
        },
    });
    const response = await body.json();
    return response.messages
        .filter((item) => item.type === 'error')
        .map(({ lastLine, message }) => {
        const line = lastLine || 0;
        return {
            id: 'w3c.error',
            values: {
                line,
                message,
            },
        };
    });
};
/**
 * Runs W3C validation on HTML files in the given directory.
 * @async
 * @param {string} source - Path to the directory to scan.
 * @param {string} [pattern] - Glob pattern to match the HTML files to validate.
 * @returns {Promise<Error[]>} Array of error objects, with each object containing the validation error details.
 */
const w3c = async (source, pattern = '**/*.html') => {
    const files = glob_1.default.sync(pattern, { cwd: source, ignore: ['**/node_modules/**'] });
    const result = (await Promise.all(files.map(async (filepath) => {
        const html = fs_1.default.readFileSync(path_1.default.join(source, filepath), 'utf-8');
        const errors = await validate(html);
        return errors.map((item) => {
            const newValues = { ...item.values, filepath: path_1.default.join(source, filepath) };
            return { ...item, values: newValues };
        });
    }))).flat();
    return result;
};
exports.w3c = w3c;
//# sourceMappingURL=w3c.js.map