import { NodeInfo } from "./common";

/**
 * 顶部标签页配置
 */
export declare interface TabPagesConfig {
  /**
   * 按钮组
   */
  btnGroup?: TabBtnGroupConfig;
  /**
   * 自动隐藏
   * false: 关闭自动隐藏
   * onePage: 没有或只有一个页签的时候隐藏
   * noPage: 没有页签的时候隐藏(默认)
   */
  autoHide?: false | "onePage" | "noPage";
  /**
   * className
   */
  className?: string | string[];
}

/**
 * 顶部标签页按钮分组配置
 */
export declare interface TabBtnGroupConfig {
  /**
   * 按钮列表
   */
  btns?: NodeInfo[];
}
