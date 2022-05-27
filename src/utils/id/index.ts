/**
 * 创建唯一id
 * @returns 唯一id
 */
export function createId() {
  const win = window as any;
  if (typeof win._idNo !== "number") {
    win._idNo = 0;
  }
  win._idNo += 1;
  return `${new Date().getTime()}.${win._idNo}`;
}
