import { AppInterface } from "./app";
import { ReaderInterface } from "./reader";
import {
  SealDragResult,
  SealDrgaOption,
  SealInfo,
  SealPositionInfo,
  SealVerifyResult,
} from "./seal";

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
   * 是否支持缩放
   */
  scale: boolean;
  /**
   * 是否支持旋转
   */
  rotation: boolean;
  /**
   * 是否支持此文件的加载
   * @param file 要加载的文件
   */
  isSupportFile(file: FileInfo): boolean;
  /**
   * 是否支持缩率图
   */
  thumbnail: boolean;
  /**
   * 是否支持导航
   */
  outline: boolean;
  /**
   * 是否支持注释
   */
  annotations: boolean;
  /**
   * 是否支持全屏
   */
  full:
    | false
    | {
        /**
         * 内容区域全屏
         */
        content: boolean;
        /**
         * 宽度撑满内容区,高度自适应
         */
        width: boolean;
      };
  /**
   * 是否支持页数控制
   */
  pages:
    | false
    | {
        /**
         * 是否支持跳转页数
         */
        jump: boolean;
        /**
         * 是否支持模式选择
         * move: 移动
         * select: 选择
         */
        moduleSwitch: {
          select: boolean;
          move: boolean;
        };
        /**
         * 是否支持查找
         */
        find: boolean;
        /**
         * 是否支持自适应页面
         */
        adaptiveView: boolean;
        /**
         * 是否支持页码显示
         */
        showPageNo: boolean;
      };
  /**
   * 印章相关配置
   */
  seal:
    | false
    | {
        /**
         * 是否支持获取印章列表
         */
        sealList: boolean;
        /**
         * 是否支持坐标签章
         */
        positionSeal: boolean;
        /**
         * 是否支持验章
         */
        verifySeal: boolean;
      };
  /**
   * 是否支持事件监听
   */
  listener:
    | false
    | {
        /**
         * 当前页码变换监听
         */
        pageNoChange: boolean;
        /**
         * 缩放改变监听
         */
        scaleChange: boolean;
      };
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
   * 获取印章列表
   */
  sealList?(): Promise<SealInfo[] | undefined>;
  /**
   * 拖拽一个印章
   * @param sealInfo 要拖拽的印章信息
   * @param options 选项
   */
  sealDrag?(
    sealInfo: SealInfo,
    options?: SealDrgaOption
  ): Promise<SealDragResult[]>;
  /**
   * 位置签章
   * @param sealInfo 签章信息
   * @param positionInfo 位置信息
   * @throws Error 签章添加失败抛出异常
   */
  signSealPosition?(
    sealInfo: SealInfo,
    positionInfo: SealPositionInfo
  ): Promise<void>;
  /**
   * 坐标签章
   * @param sealInfo 签章信息
   * @param positionInfoList 位置列表信息
   * @throws Error 签章添加失败抛出异常
   */
  signSealPositionList?(
    sealInfo: SealInfo,
    ...positionInfoList: SealPositionInfo[]
  ): Promise<void>;
  /**
   * 验证印章通过表单名称
   * @param sealFieldName 印章表单名称
   */
  signSealVerify?(sealFieldName: string): Promise<SealVerifyResult>;
  /**
   * 验证全文印章
   */
  signSealVerifyAll?(): Promise<SealVerifyResult[]>;
  /**
   * 渲染注释
   * @param domEle 要加载到的dom元素
   */
  renderAnnotations?(domEle: HTMLElement): Promise<void> | void;
  /**
   * 渲染导航菜单
   * @param domEle 目标元素
   */
  renderOutline?(domEle: HTMLElement): Promise<void> | void;
  /**
   * 渲染缩略图
   * @param domEle dom元素
   * @param options 选项
   */
  renderThumbnail?(
    domEle: HTMLElement,
    options?: {
      width?: number;
      height?: number;
      widthUnit?: "px" | "%";
      heightUnit?: "px" | "%";
    }
  ): Promise<void> | void;
  /**
   * 将阅读器内容附加到dom元素
   * @param domEle dom元素节点
   */
  render(domEle: HTMLDivElement): Promise<void> | void;
  /**
   * 加载文件
   * @param file 要加载的文件
   * @throws {Error} 加载失败返回异常
   */
  loadFile(file: FileInfo): Promise<void>;
  /**
   * 获取缩放
   */
  getScale?(): number;
  /**
   * 设置缩放
   */
  setScale?(scale: number): void;
  /**
   * 获取旋转的角度
   */
  getRotation?(): number;
  /**
   * 设置旋转角度
   * @param deg 角度
   */
  setRotation?(deg: number): void;
  /**
   * 获取当前模式
   * @returns 模式
   */
  getMode?(): "select" | "move";
  /**
   * 设置内容当前模式
   * @param mode 模式选择
   */
  setMode?(mode: "move" | "select"): void;
  /**
   * 设置全屏
   * @param mode 模式，content: 内容区域真正全屏， width: 宽度撑满内容区，高度等比例缩放
   */
  setFull?(
    mode: "content" | "width",
    options?: {
      /**
       * 提示信息
       */
      prompt?: string | HTMLElement;
      /**
       * 超时关闭, 默认3000(ms), 小于0不关闭
       */
      timeout?: number;
    }
  ): void;
  /**
   * 内容区是否为全屏
   */
  contentIsFull?(): boolean;
  /**
   * 内容区退出全屏
   */
  contentExitFull?(): void;
  /**
   * 自适应页面
   */
  adaptiveView?(): void;
  /**
   * 获取总页数
   * @returns 页数
   */
  getNumPages(): number;
  /**
   * 跳转到指定页数
   * @param page 要跳转到的页数
   */
  jumpTo?(page: number): void;
  /**
   * 添加当前页码变更事件
   * @param eventName 监听名称
   * @param callback 回调
   */
  addListener?(eventName: "pageNoChange", callback: (pageNo: number) => void);
  /**
   * 添加缩放改变事件
   * @param eventName 事件名称
   * @param callback 回调
   */
  addListener?(eventName: "scaleChange", callback: (scale: number) => void);
  /**
   * 添加模式选择事件
   * @param eventName 事件名称
   * @param callback 回调
   */
  addListener?(
    eventName: "moduleSwitchChange",
    callback: (mode: "move" | "select") => void
  );
  /**
   * 移除监听
   * @param eventName 名称
   * @param callback 回调
   */
  removeListener?(
    eventName: "pageNoChange",
    callback: (pageNo: number) => void
  );
  /**
   * 移除缩放事件监听
   * @param eventName 事件名称
   * @param callback 回调
   */
  removeListener?(eventName: "scaleChange", callback: (scale: number) => void);
  /**
   * 移除模式选择切换事件
   * @param eventName 事件名称
   * @param callback 回调
   */
  removeListener?(
    eventName: "moduleSwitchChange",
    callback: (mode: "move" | "select") => void
  );
  /**
   * 当前页码
   */
  nowPageNo?(): number;
  /**
   * 显示页码
   * 需要pages.showPageNo为true生效
   */
  showPageNo?(): void;
  /**
   * 隐藏页码
   */
  hidePageNo?(): void;
}

/**
 * 解析器基础抽象类
 */
export declare abstract class ReaderParserAbstract
  implements ReaderParserInterface {
  /**
   * 缩放值, 默认读取 window.devicePixelRatio || 1
   */
  protected scale: number;
  /**
   * 应用信息
   */
  protected declare app: AppInterface;

  /**
   * 所有都支持， 默认的支持项为所有都不支持, 用来解构减轻工作量
   */
  public declare static supportAll: ReaderParserSupport;
  /**
   * 事件绑定通知
   * @param eventName 事件名称
   * @param mod 事件模式: add: 添加  del: 删除( 事件回调全部移除之后会调用 )
   * @returns 是/否已经处理通知, true: 此事件名称不会再次进行通知, false: 此事件后续会进行通知
   */
  protected _listenerBindNotice(eventName: string, mod: "add" | "del"): boolean;
  /**
   * 事件是否存在
   * @param eventName 事件名称
   */
  protected eventExist(eventName: "pageNoChange"): boolean;
  protected eventExist(eventName: "scaleChange"): boolean;
  protected eventExist(eventName: "moduleSwitchChange"): boolean;
  /**
   * 派发pageNoChange事件
   * @param eventName 事件名称
   * @param currentPageNo 当前页码
   */
  protected fire(eventName: "pageNoChange", currentPageNo: number): void;
  protected fire(eventName: "scaleChange", scale: number): void;
  protected fire(eventName: "moduleSwitchChange", mode: "move" | "select");

  /**
   * 获取印章列表
   */
  public sealList(): Promise<SealInfo[] | undefined>;

  /**
   * 拖拽印章
   * @param sealInfo 要拖拽的印章信息
   * @param options 选项
   */
  public sealDrag(
    sealInfo: SealInfo,
    options?: SealDrgaOption
  ): Promise<SealDragResult[]>;

  /**
   * 位置签章
   * @param sealInfo 签章信息
   * @param positionInfo 位置信息
   * @throws Error 签章添加失败抛出异常
   */
  public signSealPosition(
    sealInfo: SealInfo, 
    positionInfo: SealPositionInfo
  ): Promise<void>;

  /**
   * 坐标签章
   * @param sealInfo 签章信息
   * @param positionInfoList 位置列表信息
   * @throws Error 签章添加失败抛出异常
   */
  public signSealPositionList(
    sealInfo: SealInfo,
    ...positionInfoList: SealPositionInfo[]
  ): Promise<void>;
  /**
   * 验证印章通过表单名称
   * @param sealFieldName 印章表单名称
   */
  public signSealVerify(sealFieldName: string): Promise<SealVerifyResult>;

  /**
   * 验证全文印章
   */
  public signSealVerifyAll(): Promise<SealVerifyResult[]>;

  /**
   * 渲染注释
   * @param domEle 要加载到的dom元素
   */
  public renderAnnotations(domEle: HTMLElement): Promise<void> | void;

  /**
   * 渲染目录导航
   * @param domEle 目标元素
   */
  public renderOutline(domEle: HTMLElement): void | Promise<void>;

  /**
   * 渲染缩略图
   * @param domEle dom元素
   * @param options 选项
   */
  public renderThumbnail(
    domEle: HTMLElement,
    options?: {
      width?: number;
      height?: number;
      widthUnit?: "px" | "%";
      heightUnit?: "px" | "%";
    }
  ): Promise<void> | void;
  /**
   * 获取当前缩放值
   */
  public getScale(): number;
  /**
   * 设置缩放值
   * @param scale 缩放比率
   */
  public setScale(scale: number): void;
  /**
   * 获取旋转的角度
   */
  public getRotation(): number;
  /**
   * 设置旋转角度
   * @param deg 角度
   */
  public setRotation(deg: number): void;
  /**
   * 获取当前模式
   * @returns 模式
   */
  public getMode(): "select" | "move";
  /**
   * 设置内容当前模式
   * @param mode 模式选择
   */
  public setMode(mode: "move" | "select"): void;
  /**
   * 设置全屏
   * @param mode 模式，content: 内容区域真正全屏， width: 宽度撑满内容区，高度等比例缩放
   */
  public setFull(
    mode: "content" | "width",
    options?: {
      /**
       * 提示信息
       */
      prompt?: string | HTMLElement;
      /**
       * 超时关闭, 默认3000(ms), 小于0不关闭
       */
      timeout?: number;
    }
  ): void;
  /**
   * 内容区是否为全屏
   */
  public contentIsFull(): boolean;
  /**
   * 内容区退出全屏
   */
  public contentExitFull(): void;
  /**
   * 自适应页面
   */
  public adaptiveView(): void;

  /**
   * 跳转到指定页数
   * @param page 要跳转到的页数
   */
  public jumpTo(page: number): void;
  /**
   * 添加事件监听
   * @param eventName 事件名称
   * @param callback 回调
   */
  /**
   * 添加当前页码变更事件
   * @param eventName 监听名称
   * @param callback 回调
   */
  public addListener(
    eventName: "pageNoChange",
    callback: (pageNo: number) => void
  );
  /**
   * 添加缩放改变事件
   * @param eventName 事件名称
   * @param callback 回调
   */
  public addListener(
    eventName: "scaleChange",
    callback: (scale: number) => void
  );
  /**
   * 添加模式选择事件
   * @param eventName 事件名称
   * @param callback 回调
   */
  public addListener(
    eventName: "moduleSwitchChange",
    callback: (mode: "move" | "select") => void
  );
  /**
   * 移除监听
   * @param eventName 名称
   * @param callback 回调
   */
  public removeListener(
    eventName: "pageNoChange",
    callback: (pageNo: number) => void
  );
  /**
   * 移除缩放事件监听
   * @param eventName 事件名称
   * @param callback 回调
   */
  public removeListener(
    eventName: "scaleChange",
    callback: (scale: number) => void
  );
  /**
   * 移除模式选择切换事件
   * @param eventName 事件名称
   * @param callback 回调
   */
  public removeListener(
    eventName: "moduleSwitchChange",
    callback: (mode: "move" | "select") => void
  );
  /**
   * 当前页码
   */
  public nowPageNo(): number;
  /**
   * 显示页码
   * 需要pages.showPageNo为true生效
   */
  public showPageNo?(): void;
  /**
   * 隐藏页码
   */
  public hidePageNo?(): void;
  /**
   * 加载文件
   * @param file 文件
   */
  abstract loadFile(file: FileInfo): Promise<void>;
  /**
   * 渲染到指定元素
   * @param domEle dom元素
   */
  abstract render(domEle: HTMLDivElement): void;

  /**
   * 获取总页数
   * @returns 页数
   */
  abstract getNumPages(): number;
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
    currentParserInterface?: ReaderParserInterface
  ): ReaderParserSupport;
}

/**
 * 解析器默认支持选项，通常用来解构此值实现快速构建
 */
export declare const readerParserSupportDefault: ReaderParserSupport;
