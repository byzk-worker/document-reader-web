import { AppInterface } from "./app";
import { Component } from "san";

/**
 * 要解析的文件信息
 */
export declare interface FileInfo {
  /**
   * 名称
   */
  name: string;
  /**
   * 路径
   */
  path: string;
}

/**
 * 解析器支持项配置接口
 */
export declare interface ReaderParserSupport {
  /**
   * 是否支持当前浏览器
   * @returns 是/否
   */
  nowBrowser: boolean;
  /**
   * 支持的文件后缀
   * @returns 文件后缀列表，例如: ['pdf']
   */
  fileSuffix: string[];
  /**
   * 是否支持此文件的加载
   * @param file 要加载的文件
   */
  isSupportFile(file: FileInfo): boolean;
}

/**
 * 解析器构造参数
 */
export declare interface ReaderParserConstructor {
  /**
   * 实例化方法约束
   */
  new (app: AppInterface): ReaderParserInterface;
  /**
   * 静态方法，返回当前支持内容项
   */
  support(): ReaderParserSupport;
}

/**
 * 解析器公开接口
 */
export declare interface ReaderParserInterface {
  /**
   * 将阅读器内容附加到dom元素
   * @param domEle dom元素节点
   */
  attachToEle?(domEle: HTMLDivElement): void;
  /**
   * 将阅读器内容附加到san组件节点上
   * @param paremtComponent san组件节点
   */
  attachToSanComponent?(paremtComponent: Component);
  /**
   * 加载文件
   * @param file 要加载的文件
   * @throws {Error} 加载失败返回异常
   */
  loadFile(file: FileInfo): Promise<void>;
}
