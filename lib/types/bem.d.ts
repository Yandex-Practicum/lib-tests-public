import type { TagToken } from 'parse5/dist/common/token';
export type Attribute = {
    name: string;
    value: string;
};
export interface TagTokenExtend extends TagToken {
    classes: string[];
}
