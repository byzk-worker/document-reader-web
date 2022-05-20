export * as dom from "./dom";
export * as id from "./id";
export * as app from "./app";
export * as datas from "./data";
export * as ie from "./ie";
export function arrayuUique<T>(array: T[]): T[] {
  const tempMap: any = {};
  for (let i = 0; i < array.length; i++) {
    tempMap[array[i]] = true;
  }

  const res: T[] = [];
  for (let key in tempMap) {
    res.push(key as any);
  }
  return res;
}
