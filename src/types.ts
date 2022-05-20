import { Component } from "san";

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
  content?: any;
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
  show(ele?: HTMLElement): void;
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
}

export interface ReaderInterface {
  /**
   * 附加一个解析器
   * @param parser 解析器
   */
  attach(parser: ReaderParserConstructor): void;
  /**
   * 获取支持的文件后缀
   * @returns 文件后缀列表
   */
  supportFileSuffix(): string[];
  /**
   * 当前解析器
   */
  currentParser(): ReaderParserInterface | undefined;
  /**
   * 加载文件
   * @param file 要加载的文件
   * @throws {Error} 加载失败返回异常
   */
  loadFile(file: FileInfo): Promise<void>;
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
  new (app: AppInterface): ReaderParserInterface;
  /**
   * 当前支持项
   */
  support(): ReaderParserSupport;
}

export interface FileInfo {
  name: string;
  path: string;
}

export interface ReaderParserInterface {
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

/**
 * 应用构造器
 */
export interface AppConstructor {
  /**
   * 传入参数，返回接口
   */
  new (options?: AppOptions): AppInterface;
}
