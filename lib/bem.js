"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bem = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const bem_naming_1 = __importDefault(require("bem-naming"));
const parse5_1 = require("parse5");
const noop = () => { };
const getClasses = (attrs) => {
    const classAttr = attrs.find(({ name }) => name === 'class');
    return classAttr ? classAttr.value.split(' ') : [];
};
const checkName = (tag) => {
    const invalidClasses = tag.classes.filter((name) => bem_naming_1.default.parse(name) === undefined);
    return invalidClasses.map((name) => {
        var _a;
        return ({
            id: 'bem.invalidName',
            values: {
                line: (_a = tag.location) === null || _a === void 0 ? void 0 : _a.startLine,
                class: name,
            },
        });
    });
};
const checkBlockModifiers = (tag) => {
    const modifiers = tag.classes.filter(bem_naming_1.default.isBlockMod).map(bem_naming_1.default.parse);
    const blocks = tag.classes.filter(bem_naming_1.default.isBlock).map(bem_naming_1.default.parse);
    const invalidModifiers = modifiers
        .filter((element) => {
        if (blocks.length === 0) {
            return true;
        }
        return blocks.every((block) => (block === null || block === void 0 ? void 0 : block.block) !== (element === null || element === void 0 ? void 0 : element.block));
    })
        .map((value) => {
        if (value === undefined) {
            return undefined;
        }
        return bem_naming_1.default.stringify(value);
    });
    return invalidModifiers.map((name) => {
        var _a;
        return ({
            id: 'bem.block.invalidMod',
            values: {
                line: (_a = tag.location) === null || _a === void 0 ? void 0 : _a.startLine,
                class: name,
            },
        });
    });
};
const checkElementsInsideBlock = (parents, tag) => {
    const elements = tag.classes.filter(bem_naming_1.default.isElem).map(bem_naming_1.default.parse);
    const parentsBlocks = parents
        .map(({ classes }) => classes)
        .flat()
        .filter(bem_naming_1.default.isBlock).map(bem_naming_1.default.parse);
    const invalidElements = elements
        .filter((element) => {
        if (parentsBlocks.length === 0) {
            return true;
        }
        return parentsBlocks.every((block) => (block === null || block === void 0 ? void 0 : block.block) !== (element === null || element === void 0 ? void 0 : element.block));
    })
        .map((value) => {
        if (value === undefined) {
            return undefined;
        }
        return bem_naming_1.default.stringify(value);
    });
    return invalidElements.map((name) => {
        var _a;
        return ({
            id: 'bem.element.notInsideBlock',
            values: {
                line: (_a = tag.location) === null || _a === void 0 ? void 0 : _a.startLine,
                class: name,
            },
        });
    });
};
const checkElementsModifiers = (tag) => {
    const modifiers = tag.classes.filter(bem_naming_1.default.isElemMod).map(bem_naming_1.default.parse);
    const elements = tag.classes.filter(bem_naming_1.default.isElem).map(bem_naming_1.default.parse);
    const invalidModifiers = modifiers
        .filter((modifier) => {
        if (elements.length === 0) {
            return true;
        }
        return !elements.some((element) => ((element === null || element === void 0 ? void 0 : element.block) === (modifier === null || modifier === void 0 ? void 0 : modifier.block) && (element === null || element === void 0 ? void 0 : element.elem) === (modifier === null || modifier === void 0 ? void 0 : modifier.elem)));
    })
        .map((value) => {
        if (value === undefined) {
            return undefined;
        }
        return bem_naming_1.default.stringify(value);
    });
    return invalidModifiers.map((name) => {
        var _a;
        return ({
            id: 'bem.element.invalidMod',
            values: {
                line: (_a = tag.location) === null || _a === void 0 ? void 0 : _a.startLine,
                class: name,
            },
        });
    });
};
const checkClasses = (parents, tag) => {
    const nameErrors = checkName(tag);
    if (nameErrors.length > 0) {
        return nameErrors;
    }
    return [].concat(checkBlockModifiers(tag), checkElementsInsideBlock(parents, tag), checkElementsModifiers(tag));
};
const validate = (html) => {
    const parents = [];
    const errors = [];
    const tokenizer = new parse5_1.Tokenizer({ sourceCodeLocationInfo: true }, {
        onStartTag: (token) => {
            const classes = getClasses(token.attrs);
            const tag = { ...token, classes };
            const classesErrors = checkClasses(parents, tag);
            classesErrors.forEach((error) => errors.push(error));
            if (!tag.selfClosing && !tag.ackSelfClosing) {
                parents.push(tag);
            }
        },
        onEndTag: () => {
            parents.pop();
        },
        onComment: noop,
        onDoctype: noop,
        onEof: noop,
        onCharacter: noop,
        onNullCharacter: noop,
        onWhitespaceCharacter: noop,
    });
    tokenizer.write(html, true);
    return errors;
};
/**
 * This function extracts all HTML files in a given directory and validates them.
 * @async
 * @param {string} source - The directory to search for HTML files in.
 * @param {string} [pattern] - The pattern to match file paths against.
 * @returns {Promise<Array<Error>>} An array of Error objects representing the validation errors found in the HTML files.
 */
const bem = async (source, pattern = '**/*.html') => {
    const files = glob_1.default.sync(pattern, { cwd: source, ignore: ['**/node_modules/**'] });
    return files.map((filepath) => {
        const html = fs_1.default.readFileSync(path_1.default.join(source, filepath), 'utf-8');
        const errors = validate(html);
        return errors.map((item) => {
            const newValues = { ...item.values, filepath: path_1.default.join(source, filepath) };
            return { ...item, values: newValues };
        });
    }).flat();
};
exports.bem = bem;
//# sourceMappingURL=bem.js.map