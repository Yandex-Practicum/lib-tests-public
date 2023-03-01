"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslint = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const filepathFormatted = (source, filepath) => {
    const dir = path_1.default.join(source, path_1.default.relative(source, path_1.default.dirname(filepath)));
    return path_1.default.format({ root: source, dir, base: path_1.default.basename(filepath) });
};
/**
 * Runs eslint on the given source directory and returns a list of errors.
 * @param {string} source - The source directory to run eslint on.
 * @returns {Array} - An array of objects representing the errors found by eslint.
 */
const eslint = (source) => {
    const reportFilepath = `${process.cwd()}/eslint-report.txt`;
    shelljs_1.default.exec(`npx eslint -f json . > ${reportFilepath}`, { cwd: source });
    const report = JSON.parse(fs_1.default.readFileSync(reportFilepath, 'utf-8'));
    fs_1.default.unlinkSync(reportFilepath);
    return report
        .filter(({ errorCount }) => errorCount > 0)
        .map(({ filePath: filepath, messages }) => (messages
        .filter(({ severity }) => severity === 2)
        .map(({ ruleId, line, column, message, }) => ({
        filepath: filepathFormatted(source, filepath),
        ruleId,
        line,
        column,
        message,
    })))).flat();
};
exports.eslint = eslint;
//# sourceMappingURL=eslint.js.map