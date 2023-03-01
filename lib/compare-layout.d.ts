/**
 * Get the compared image url and return an array of errors if the required percentage isn't met.
 * @async
 * @param {string} pageUrl - The URL of the page to compare.
 * @param {string} canonicalImageUrl - The URL of the reference image to compare to.
 * @param {number} [reqPercentage] - The required percentage of similarity between the compared images, defaults to 10.
 * @returns {Promise<Array<Error>>} An array of errors if the required percentage isn't met, otherwise an empty array.
 */
export declare const getComparedImageUrl: (pageUrl: string, canonicalImageUrl: string, reqPercentage?: number) => Promise<{
    id: string;
    values: {
        imageUrl: any;
        reqPercentage: number;
        studentsPercentage: number;
    };
}[]>;
