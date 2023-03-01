"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCode = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
/**
 * Builds the source code and writes the build report to a file.
 * @param {string} command - The command to execute to build the code.
 * @param {string} source - The path to the source code directory.
 * @return {number} The exit code of the shell command.
 */
const buildCode = (command, source) => shelljs_1.default
    .exec(`${command} > ${process.cwd()}/build-report.txt`, { cwd: source }).code;
exports.buildCode = buildCode;
//# sourceMappingURL=build-code.js.map