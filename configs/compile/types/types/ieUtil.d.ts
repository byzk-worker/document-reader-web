/**
 * 获取IE版本
 * @returns 如果非IE浏览器返回 -1
 */
export declare function ieVersion(): number | "edge";

/**
 * 判断当前IE版本是否小于传入版本
 * @param ieNumber 要判断的版本
 * @returns 是/否小于传入版本
 */
export declare function lessThan(ieNumber: number): boolean;

/**
 * 是否为IE浏览器
 * @returns 是/否
 */
export declare function isIe(): boolean;
