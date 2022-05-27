import { Component } from "san";

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
    parent: Component
  ): HTMLElement | Component;
  /**
   * 单击事件
   */
  click?(app: AppInterface, event: MouseEvent): void;
  /**
   * 事件绑定
   * @param bind 事件绑定器
   */
  eventBind?<EventT>(
    bind: (
      eventName: string,
      callback: (app: AppInterface, event: EventT) => void
    ) => void
  ): void;
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
  disabled?: Diasble;
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
  _activeChangeFnId: string;
  /**
   * 选中状态变更
   * @param active 是/否选中
   */
  activeChange?(app: AppInterface, event: ToolbarConfigActiveChangeEvent): void;
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
   * 是否支持此文件的加载
   * @param file 要加载的文件
   */
  isSupportFile(file: FileInfo): boolean;
}

export interface ReaderParserConstructor {
  new (app: AppInterface): ReaderInterface;
}

export interface FileInfo {
  name: string;
  path?: string;
  rawHtmlEle: HTMLInputElement;
}

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

export abstract class ReaderParserAbstract implements ReaderParserInterface {
  public static supportAll: ReaderParserSupport = {
    nowBrowser: true,
    fileSuffix: [],
    isSupportFile: function (file: FileInfo): boolean {
      return true;
    },
  };
  public constructor(protected app: AppInterface) {}
  renderToEle?(domEle: HTMLDivElement): void {
    throw new Error("Method not implemented.");
  }
  renderToSanComponent?(paremtComponent: Component<{}>) {
    throw new Error("Method not implemented.");
  }
  abstract loadFile(file: FileInfo): Promise<void>;
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
    currentParserInterface?: ReaderInterface
  ): ReaderParserSupport;
}

export const readerParserSupportDefault: ReaderParserSupport = {
  nowBrowser: false,
  fileSuffix: [],
  isSupportFile: function (file: FileInfo): boolean {
    return false;
  },
};

/**
 * 应用构造器
 */
export interface AppConstructor {
  /**
   * 传入参数，返回接口
   */
  new (attachEle: HTMLElement, options?: AppOptions): AppInterface;
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
  parserInfo: ReaderParserInfo;
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
