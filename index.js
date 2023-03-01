"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComparedImageUrl = exports.buildCode = exports.eslint = exports.bem = exports.w3c = void 0;
const dotenv = __importStar(require("dotenv"));
const path_1 = __importStar(require("path"));
const curDirname = (0, path_1.dirname)(__filename);
dotenv.config({ path: path_1.default.join(curDirname, '..', '.env') });
var w3c_1 = require("./lib/w3c");
Object.defineProperty(exports, "w3c", { enumerable: true, get: function () { return w3c_1.w3c; } });
var bem_1 = require("./lib/bem");
Object.defineProperty(exports, "bem", { enumerable: true, get: function () { return bem_1.bem; } });
var eslint_1 = require("./lib/eslint");
Object.defineProperty(exports, "eslint", { enumerable: true, get: function () { return eslint_1.eslint; } });
var build_code_1 = require("./lib/build-code");
Object.defineProperty(exports, "buildCode", { enumerable: true, get: function () { return build_code_1.buildCode; } });
var compare_layout_1 = require("./lib/compare-layout");
Object.defineProperty(exports, "getComparedImageUrl", { enumerable: true, get: function () { return compare_layout_1.getComparedImageUrl; } });
//# sourceMappingURL=index.js.map