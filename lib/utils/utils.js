"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUrl = void 0;
const path_1 = __importDefault(require("path"));
const fileUrl = (filePath, options = {}) => {
    if (typeof filePath !== 'string') {
        throw new TypeError(`Expected a string, got ${typeof filePath}`);
    }
    const { resolve = true } = options;
    let pathName = filePath;
    if (resolve) {
        pathName = path_1.default.resolve(filePath);
    }
    pathName = pathName.replace(/\\/g, '/');
    if (pathName[0] !== '/') {
        pathName = `/${pathName}`;
    }
    return encodeURI(`file://${pathName}`).replace(/[?#]/g, encodeURIComponent);
};
exports.fileUrl = fileUrl;
//# sourceMappingURL=utils.js.map