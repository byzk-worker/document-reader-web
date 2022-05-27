import { Component } from "san";
import { AppInterface } from "./app";

/**
 * 内容区配置
 */
export declare interface ContentConfig {
  /**
   * 没有打开文件渲染的元素
   * @param app app操作对象
   * @param parent 父组件
   * @returns html元素或者san组件
   */
  noOpenFileRender?(
    app: AppInterface,
    parent: Component
  ): HTMLElement | Component;
}
