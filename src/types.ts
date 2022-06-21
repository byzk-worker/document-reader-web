import { Component } from "san";
import { DataStore } from "./dataStore";
import { MessageInterface } from "./ui/utils/message";

export type Diasble = boolean | ((app: AppInterface) => boolean) | string;

/**
 * 标签页配置
 */
export interface TabPagesConfig {
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
 * 标签页按钮分组配置
 */
export interface TabBtnGroupConfig {
  /**
   * 按钮列表
   */
  btns?: NodeInfo[];
}

/**
 * HTML节点信息
 */
export interface NodeInfo {
  /**
   * 是否显示, 默认显示
   */
  isShow?(app: AppInterface): void;
  _isShowId?: string;
  /**
   * 按钮Id
   */
  id?: string;
  /**
   * 按钮className名称
   */
  className?: string;
  /**
   * 按钮文本
   */
  text?: string;
  /**
   * html文本
   */
  html?: string;
  /**
   * 设置title.
   */
  title?: string;
  /**
   * 宽度, 单位px，默认为 30px
   */
  width?: number;
  active?: boolean;
  /**
   * 事件ID.
   */
  readonly evenIdList?: string[];
  /**
   * render函数的id.
   */
  readonly renderId?: string;
  /**
   * 手动渲染，如果存在其他将全部失效, 包括事件
   */
  render?(
    app: AppInterface,
    nodeIno: NodeInfo,
    target: HTMLElement
  ): void | Promise<void>;
  _renderId?: string;
  /**
   * 加载完成
   * @param app 应用接口
   */
  attached?(this: NodeInfoThis, app: AppInterface): void;
  _attachedId?: string;
  /**
   * 单击事件
   */
  click?(this: NodeInfoThis, app: AppInterface, event: MouseEvent): void;
  /**
   * 事件绑定
   * @param bind 事件绑定器
   */
  eventBind?<EventT>(
    bind: (
      eventName: string,
      callback: (
        this: NodeInfoThis,
        app: AppInterface,
        nodeInfo: NodeInfo,
        event: EventT
      ) => void
    ) => void
  ): void;
}

export interface NodeInfoThis extends NodeInfo {
  selector: NodeInfoSelector;
  update: (nodeInfo?: NodeInfo) => void;
}

export interface NodeInfoSelector {
  prev(): NodeInfoThis | undefined;
  next(): NodeInfoThis | undefined;
  index(): number;
  listSize(): number;
  get(index: number): NodeInfoThis | undefined;
  list(): NodeInfoThis[];
}

export interface AppUpdateOptions {
  /**
   * 标签页信息配置
   */
  tabPages?: TabPagesConfig | false;
  /**
   * class的名称
   */
  classNames?: string[] | string;
  /**
   * 应用最小宽度, 默认: 1280px
   */
  minWidth?: number;
  /**
   * 应用最小高度, 默认: 800px
   */
  minHeight?: number;
  /**
   * 头部
   */
  header?: HeaderConfig | false;
  /**
   * 尾部
   */
  footer?: any;
  /**
   * 内容区域
   */
  content?: ContentConfig;
  /**
   * 侧边栏
   */
  sidebars?:
  | {
    /**
     * 左侧边栏
     */
    left?: SlidebarLeftConfig | false;
    /**
     * 右侧边栏
     */
    right?: any | false;
  }
  | false;
}

/**
 * 阅读器选项参数
 */
export interface AppOptions extends AppUpdateOptions {
  /**
   * 字体配置, 目前只支持更改一次不支持修改
   */
  fontConfig?: WebFontConfig;
}

export interface WebFontConfig {
  /**
   * 所在目录
   */
  dir?: string;
  /**
   * eot字体文件路径
   */
  eotFile?: string;
  /**
   * woff字体文件路径
   */
  woffFile?: string;
  /**
   * woff2字体文件路径
   */
  woff2File?: string;
  /**
   * ttf字体文件路径
   */
  ttfFile?: string;
  /**
   * svg字体文件路径
   */
  svgFile?: string;
}

export interface ToolInfo {
  type: "default" | "separate";
  nodeInfo?: NodeInfo;
  needReader?: true;
  // disabled?: Diasble;
}

/**
 * 工具栏配置
 */
export interface ToolbarConfig {
  /**
   * id
   */
  id?: string;
  /**
   * 类名称
   */
  className?: string | string[];
  /**
   * 是否需要已经打开阅读器
   */
  needLoadFileOK?: boolean;
  /**
   * 文本
   */
  text?: string;
  /**
   * 图标html
   */
  iconHtml?: string;
  /**
   * 工具信息
   */
  tools?: ToolInfo[];
  /**
   * 是否禁用.
   */
  disabled?: Diasble;
  /**
   * 激活切换事件ID
   */
  _activeChangeFnId?: string;
  /**
   * 选中状态变更
   * @param active 是/否选中
   */
  activeChange?(app: AppInterface, event: ToolbarConfigActiveChangeEvent): void;
  /**
   * 渲染子元素
   * @param app 当前应用信息
   * @param domEle 挂载的dom节点
   */
  renderChildren?(app: AppInterface, domEle: HTMLElement): Promise<void> | void;
  _renderChildrenId?: string;
}

export interface ToolbarConfigActiveChangeEvent {
  active: boolean;
  currentIndex: number;
  nowInfo: ToolbarConfig;
  update: (newInfo: ToolbarConfig) => void;
}

/**
 * 头部配置.
 */
export interface HeaderConfig {
  /**
   * id名称
   */
  id?: string;
  /**
   * 类名称
   */
  className?: string | string[];
  /**
   * 工具栏
   */
  toolbars?: ToolbarConfig[];
}

export interface SlidebarLeftConfig {
  id?: string;
  className?: string;
  toolbars?: ToolbarConfig[];
}

/**
 * 应用接口
 */
export interface AppInterface {
  getDataStore(): DataStore;
  /**
   * 获取根节点元素
   */
  getRootEle(): HTMLElement | undefined;
  /**
   * 第一次显示元素必须填写
   * @param ele 要显示在的元素
   */
  show(): void;
  /**
   * 隐藏显示
   */
  hide(): void;
  /**
   * 销毁
   */
  destroy(): void;
  /**
   * 更新视图内的数据
   * @param options 要更新的数据
   */
  update(options: AppUpdateOptions): void;
  updateByExpr(expr: "tabPages", options: TabPagesConfig | false): void;
  updateByExpr(expr: "tabPages.btnGroup", options: TabBtnGroupConfig): void;
  updateByExpr(expr: "tabPages.btnGroup.btns", options: NodeInfo[]): void;
  updateByExpr(expr: "header.toolbars", options: ToolbarConfig[]): void;
  updateByExpr(expr: "sidebars.left.toolbars", options: ToolbarConfig[]): void;

  /**
   * 获取初始化参数.
   */
  getInitConfig(): AppUpdateOptions | undefined;
  /**
   *
   * @param expr 表达式，默认为{@link AppUpdateOptions}全部, 示例:
   * 1. 获取标签页配置: tabPages
   * 2. 获取标签页按钮组配置: tabPages.btnGroup
   * 3. 获取标签页中按钮组的按钮列表第一项: tabPages.btnGroup.btns[0]
   */
  getNowData(): AppUpdateOptions;
  getNowData(expr: "tabPages"): TabPagesConfig | false | undefined;
  getNowData(expr: "tabPages.btnGroup"): TabBtnGroupConfig | undefined;
  getNowData(expr: "tabPages.btnGroup.btns"): NodeInfo[] | undefined;
  getNowData(expr: "header.toolbars"): ToolbarConfig[] | undefined;
  getNowData(expr: "sidebars.left.toolbars"): ToolbarConfig[] | undefined;

  getReader(): ReaderInterface;

  /**
   * 当前页信息.
   */
  currentBookmark(): AppBookmarkInfoWithIndex | undefined;
  /**
   * 切换页
   * @param pageId 页id
   */
  convertBookmark(pageIndex: number): void;
  /**
   * 通过id切换
   * @param id id
   */
  convertBookmarkById(id: string): void;
  bookmarkList(): AppBookmarkInfoWithIndex[] | [];
  /**
   * 获取app总页签数页数
   */
  bookmarkNum(): number;
  /**
   * 页签信息
   * @param index 索引
   */
  getBookmarkInfo(index: number): AppBookmarkInfoWithIndex | undefined;
  getBookmarkInfoById(id: string): AppBookmarkInfoWithIndex | undefined;
  /**
   * 添加页
   * @param name 名称
   */
  addBookmark(bookmarkInfo: AppBookmarkInfo): void;
  removeBookmark(index: number): void;
  removeBookmarkById(id: string): void;

  /**
   * 添加监听器
   * @param eventName 事件名称
   * @param callback 回调
   */
  addListener(
    eventName: "bookmarkChange",
    callback: (
      app: AppInterface,
      currentBookmark: AppBookmarkInfoWithIndex
    ) => void
  );

  /**
   * 移除监听器
   * @param eventName 事件名称
   * @param callback 回调函数
   */
  removeListener(
    eventName: "bookmarkChange",
    callback: (
      app: AppInterface,
      currentBookmark: AppBookmarkInfoWithIndex
    ) => void
  );

  message: MessageInterface,
}

export interface ReaderInterface {
  /**
   * 附加一个解析器
   * @param parser 解析器
   */
  attach(parserInfo: ReaderParserInfo): void;
  /**
   * 获取支持的文件后缀
   * @returns 文件后缀列表
   */
  supportFileSuffix(): string[];
  /**
   * 当前解析器信息
   */
  currentParser(): ParserWrapperInfo | undefined;
  /**
   * 加载文件
   * @param file 要加载的文件
   * @throws {Error} 加载失败返回异常
   */
  loadFile(file: FileInfo): Promise<void>;
  /**
   * 选择一个文件并打开
   */
  selectFile(): Promise<SelectFileResult | undefined>;
  /**
   * 添加当前页码变更事件
   * @param eventName 监听名称
   * @param callback 回调
   */
  addListener(eventName: "pageNoChange", callback: (pageNo: number) => void);
  /**
   * 添加缩放改变事件
   * @param eventName 事件名称
   * @param callback 回调
   */
  addListener(eventName: "scaleChange", callback: (scale: number) => void);
  /**
   * 移除监听
   * @param eventName 名称
   * @param callback 回调
   */
  removeListener(eventName: "pageNoChange", callback: (pageNo: number) => void);
  /**
   * 移除缩放事件监听
   * @param eventName 事件名称
   * @param callback 回调
   */
  removeListener(eventName: "scaleChange", callback: (pageNo: number) => void);
}

export interface SelectFileResult {
  fileInfo: FileInfo;
  loadFile(): Promise<void>;
}

export interface ReaderParserSupport {
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
    moduleSwitch:
    | false
    | {
      select: boolean;
      move: boolean;
    };
    /**
     * 是否支持查找
     */
    find: boolean;
    /**
     * 是否支持自适应大小
     */
    adaptiveView: boolean;
    /**
     * 是否支持页面显示
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
    /**
     * 模式选择切换
     */
    moduleSwitchChange: boolean;
  };
}

export interface ReaderParserConstructor {
  new(app: AppInterface): ReaderParserInterface;
}

export interface FileInfo {
  name: string;
  path?: string;
  rawHtmlEle: HTMLInputElement;
}

export interface SealInfo {
  id: string;
  name?: string;
  title?: string;
  imgUrl: string;
  width: number;
  height: number;
}

export interface SealVerifyResult {
  error: boolean;
  name: string;
  page: number;
  errMsg?: string;
  signTime?: string;
  signerName?: string;
}

export interface SealDrgaOption {
  pageNo?: number[];
  maxPageNo?: number;
  minPageNo?: number;
  cernterPositionMode?: "center" | "leftBottom";
}

export interface SealDragResult {
  pageNo: number;
  sealInfo: SealInfo;
  x: number;
  y: number;
  cernterPositionMode?: "center" | "leftBottom";
}

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
  sealDragOne?(
    sealInfo: SealInfo,
    options?: SealDrgaOption
  ): Promise<SealDragResult>;
  /**
   * 坐标签章
   */
  sealPositionAdd?(
    sealInfo: SealInfo,
    position: { x: number; y: number }
  ): Promise<void>;
  /**
   * 验证印章通过表单名称
   * @param sealFieldName 印章表单名称
   */
  sealVerify?(sealFieldName: string): Promise<SealVerifyResult>;
  /**
   * 验证全文印章
   */
  sealVerifyAll?(): Promise<SealVerifyResult[]>;
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
   * @param width 宽度
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
  setScale?(scale?: number): void;
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
  removeListener?(eventName: "scaleChange", callback: (pageNo: number) => void);
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

const _parserEventList = ["pageNoChange", "scaleChange", "moduleSwitchChange"];
export abstract class ReaderParserAbstract implements ReaderParserInterface {
  protected scale = window.devicePixelRatio || 1;
  private _dataStore: any = {};
  public static supportAll: ReaderParserSupport = {
    nowBrowser: true,
    fileSuffix: [],
    isSupportFile: function (file: FileInfo): boolean {
      return true;
    },
    scale: true,
    rotation: true,
    thumbnail: true,
    outline: true,
    annotations: true,
    full: {
      width: true,
      content: true,
    },
    pages: {
      jump: true,
      moduleSwitch: {
        select: true,
        move: true,
      },
      find: true,
      adaptiveView: true,
      showPageNo: true,
    },
    seal: {
      sealList: true,
      positionSeal: true,
      verifySeal: true,
    },
    listener: {
      pageNoChange: true,
      scaleChange: true,
      moduleSwitchChange: true,
    },
  };
  public constructor(protected app: AppInterface) { }
  abstract getNumPages(): number;
  public getScale(): number {
    return this.scale;
  }
  abstract loadFile(file: FileInfo): Promise<void>;
  abstract render(domEle: HTMLDivElement): void;
  setScale(scale?: number): number {
    return (this.scale = scale);
  }
  adaptiveView(): void { }
  jumpTo(page: number): void { }

  private _getEventList(eventName: string): any[] {
    eventName = "__event_" + eventName;
    this._dataStore[eventName] = this._dataStore[eventName] || [];
    return this._dataStore[eventName];
  }
  addListener(eventName: string, callback: any) {
    if (typeof callback !== "function") {
      return;
    }
    if (!_parserEventList.includes(eventName)) {
      return;
    }
    const eventList = this._getEventList(eventName);
    for (let i = 0; i < eventList.length; i++) {
      if (eventList[i] === callback) {
        return;
      }
    }
    eventList.push(callback);
    if (eventList.length === 1) {
      this._listenerBindNotice(eventName, "add");
    }
  }
  removeListener(eventName: string, callback: any) {
    if (typeof callback !== "function") {
      return;
    }
    if (!_parserEventList.includes(eventName)) {
      return;
    }
    const eventList = this._getEventList(eventName);
    for (let i = eventList.length; i >= 0; i--) {
      if (eventList[i] === callback) {
        eventList.splice(i, 1);
        break;
      }
    }
    if (eventList.length === 0) {
      this._eventNoticBind(eventName, "del");
    }
  }

  private _eventNoticBind(eventName: string, mod: "add" | "del") {
    const eventBindKeyName = "_event_bind_" + eventName;
    if (this._dataStore[eventBindKeyName]) {
      return;
    }

    if (this._listenerBindNotice(eventName, mod)) {
      this._dataStore[eventBindKeyName] = true;
    }
  }

  protected fire(eventName: string, ...args) {
    const eventList = this._getEventList(eventName);
    for (let i = 0; i < eventList.length; i++) {
      eventList[i](...args);
    }
  }

  protected eventExist(event: string): boolean {
    return this._getEventList(event).length !== 0;
  }

  /**
   * 事件绑定通知
   * @param eventName 事件名称
   * @param mod 事件模式: add: 添加  del: 删除( 事件回调全部移除之后会调用 )
   * @returns 是/否已经处理通知, true: 此事件名称不会再次进行通知, false: 此事件后续会进行通知
   */
  protected _listenerBindNotice(
    eventName: string,
    mod: "add" | "del"
  ): boolean {
    return false;
  }
  showPageNo(): void { }
  hidePageNo(): void { }
  setMode(mode: "move" | "select"): void { }
  getMode(): "select" | "move" {
    return "select";
  }
  setFull(
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
  ): void { }
  contentExitFull(): void { }
  contentIsFull(): boolean {
    return false;
  }
  renderThumbnail(
    domEle: HTMLElement,
    options?: {
      width?: number;
      height?: number;
      widthUnit?: "px" | "%";
      heightUnit?: "px" | "%";
    }
  ): void | Promise<void> { }
  renderOutline(domEle: HTMLElement): void | Promise<void> {
    throw ErrNoSupportFunction;
  }
  renderAnnotations(domEle: HTMLElement): void | Promise<void> {
    throw ErrNoSupportFunction;
  }
  sealList(): Promise<SealInfo[] | undefined> {
    throw ErrNoSupportFunction;
  }
  sealPositionAdd(
    sealInfo: SealInfo,
    position: { x: number; y: number }
  ): Promise<void> {
    throw ErrNoSupportFunction;
  }
  sealVerify(sealFieldName: string): Promise<SealVerifyResult> {
    throw ErrNoSupportFunction;
  }
  sealVerifyAll(): Promise<SealVerifyResult[]> {
    throw ErrNoSupportFunction;
  }
  setRotation(deg: number): void {
    throw ErrNoSupportFunction;
  }
  getRotation(): number {
    throw ErrNoSupportFunction;
  }
  sealDragOne(
    sealInfo: SealInfo,
    options?: SealDrgaOption
  ): Promise<SealDragResult> {
    throw ErrNoSupportFunction;
  }
}

/**
 * 阅读器解析信息
 */
export interface ReaderParserInfo {
  /**
   * 解析器构造方法
   */
  Parser: ReaderParserConstructor;
  /**
   * 支持的内容
   * @param app 应用接口
   * @param currentParserInterface 当前解析器的实例对象, 可能不存在，当首次调用时不存在
   */
  support(
    app: AppInterface,
    currentParserInterface?: ReaderParserInterface
  ): ReaderParserSupport;
}

export const readerParserSupportDefault: ReaderParserSupport = {
  nowBrowser: false,
  fileSuffix: [],
  thumbnail: false,
  outline: false,
  annotations: false,
  isSupportFile: function (file: FileInfo): boolean {
    return false;
  },
  scale: false,
  rotation: false,
  full: false,
  pages: false,
  seal: false,
  listener: false,
};

/**
 * 应用构造器
 */
export interface AppConstructor {
  /**
   * 传入参数，返回接口
   */
  new(attachEle: HTMLElement, options?: AppOptions): AppInterface;
}

export * as ieUtil from "./utils/ie";

export interface AppBookmarkInfo {
  id: string;
  name: string;
  parserWrapperInfo: ParserWrapperInfo;
}

export interface AppBookmarkInfoWithIndex extends AppBookmarkInfo {
  index: number;
}

export interface ParserWrapperInfo {
  fileInfo: FileInfo;
  parserInterface: ReaderParserInterface;
  parserInfo: {
    support: ReaderParserSupport;
    Parser: ReaderParserConstructor;
  };
}

export interface ContentConfig {
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

export const ErrFileNotParsed = new Error("文件无法被解析, 请添加对应解析器");
export const ErrNoSupportFileSuffix = new Error(
  "没有可被解析的文件后缀，请尝试添加解析器"
);
export const ErrFeilSelectWait = new Error("文件选择已被锁定，请稍后重试");
export const ErrLackOfParser = new Error("缺失解析器信息");
export const ErrNoSupportFunction = new Error("未实现的方法");
