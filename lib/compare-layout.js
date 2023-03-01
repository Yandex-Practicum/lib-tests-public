"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComparedImageUrl = void 0;
const fs_1 = __importDefault(require("fs"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const imgbb_uploader_1 = __importDefault(require("imgbb-uploader"));
const compareImages_1 = __importDefault(require("resemblejs/compareImages"));
const url_1 = require("url");
const utils_1 = require("./utils/utils");
const pageImagePATH = 'layout.jpg';
const outputImagePATH = 'output.jpg';
const compareOptions = {
    output: {
        errorColor: {
            red: 255,
            green: 0,
            blue: 255,
        },
        errorType: 'movement',
        transparency: 0.3,
        largeImageThreshold: 0,
        useCrossOrigin: false,
    },
    scaleToSameSize: true,
    ignore: 'antialiasing',
};
const isUrl = (url) => {
    try {
        const myURL = new url_1.URL(url);
        return !!myURL;
    }
    catch {
        return false;
    }
};
const initPuppeteer = async (url) => {
    const browser = await puppeteer_1.default.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(isUrl(url) ? url : (0, utils_1.fileUrl)(url), { waitUntil: 'load' });
    return { browser, page };
};
const compareLayout = async (projectUrl, canonicalImageUrl) => {
    var _a;
    const { browser, page } = await initPuppeteer(projectUrl);
    await page.screenshot({ path: pageImagePATH, fullPage: true });
    const data = await (0, compareImages_1.default)(fs_1.default.readFileSync(canonicalImageUrl), fs_1.default.readFileSync(pageImagePATH), compareOptions);
    fs_1.default.writeFileSync(outputImagePATH, data.getBuffer ? (_a = data.getBuffer) === null || _a === void 0 ? void 0 : _a.call(data, true) : '');
    await browser.close();
    return data.misMatchPercentage;
};
/**
 * Get the compared image url and return an array of errors if the required percentage isn't met.
 * @async
 * @param {string} pageUrl - The URL of the page to compare.
 * @param {string} canonicalImageUrl - The URL of the reference image to compare to.
 * @param {number} [reqPercentage] - The required percentage of similarity between the compared images, defaults to 10.
 * @returns {Promise<Array<Error>>} An array of errors if the required percentage isn't met, otherwise an empty array.
 */
const getComparedImageUrl = async (pageUrl, canonicalImageUrl, reqPercentage = 10) => {
    const studentsPercentage = await compareLayout(pageUrl, canonicalImageUrl);
    if (studentsPercentage > reqPercentage) {
        const response = await (0, imgbb_uploader_1.default)({
            apiKey: process.env.IMAGE_API_KEY,
            imagePath: outputImagePATH,
        });
        return [{
                id: 'layout.error',
                values: {
                    imageUrl: response.url,
                    reqPercentage,
                    studentsPercentage,
                },
            }];
    }
    return [];
};
exports.getComparedImageUrl = getComparedImageUrl;
//# sourceMappingURL=compare-layout.js.map