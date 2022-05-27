import { AppInterface } from "./app";
import { Component } from "san";
import { ReaderInterface } from "./reader";

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
  path?: string;
  /**
   * 原始HTML文件节点
   */
  rawHtmlEle: HTMLInputElement;
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
  new (app: AppInterface): ReaderInterface;
}

/**
 * 解析器功能接口
 */
export interface ReaderParserInterface {
  /**
   * 将阅读器内容附加到dom元素
   * @param domEle dom元素节点
   */
  renderToEle?(domEle: HTMLDivElement): void;
  /**
   * 将阅读器内容附加到san组件节点上
   * @param paremtComponent san组件节点
   */
  renderToSanComponent?(paremtComponent: Component);
  /**
   * 加载文件
   * @param file 要加载的文件
   * @throws {Error} 加载失败返回异常
   */
  loadFile(file: FileInfo): Promise<void>;
}

/**
 * 解析器基础抽象类
 */
export declare abstract class ReaderParserAbstract
  implements ReaderParserInterface {
  /**
   * 应用信息
   */
  protected declare app: AppInterface;

  /**
   * 所有都支持， 默认的支持项为所有都不支持, 用来解构减轻工作量
   */
  public declare static supportAll: ReaderParserSupport;

  /**
   * 渲染解析器内容到HTML节点上
   * @param domEle 附加到指定元素
   */
  renderToEle?(domEle: HTMLDivElement): void;
  /**
   * 渲染解析器内容到san节点上
   * @param paremtComponent san节点
   */
  renderToSanComponent?(paremtComponent: Component<{}>);
  /**
   * 加载文件
   * @param file 文件
   */
  abstract loadFile(file: FileInfo): Promise<void>;
}

/**
 * 解析器信息
 */
export interface ReaderParserInfo {
  /**
   * 解析器构造方法
   */
  Parser: ReaderParserConstructor;
  /**
   * 支持的内容
   * @param app 应用接口
   * @param currentParserInterface 当前解析器的实例对象, 可能不存在，当未初始化阅读器内容时为空
   */
  support(
    app: AppInterface,
    currentParserInterface?: ReaderInterface
  ): ReaderParserSupport;
}

/**
 * 解析器默认支持选项，通常用来解构此值实现快速构建
 */
export declare const readerParserSupportDefault: ReaderParserSupport;
