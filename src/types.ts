import { dom, id } from "./utils";
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
   * 将页面内的元素添加至组件内部, 如有此项，其他参数将全部失效
   */
  // el?: {
  //   /**
  //    * 将id对应id名称的元素移动到按钮组内
  //    */
  //   id?: string;
  //   /**
  //    * html文本
  //    */
  //   html?: string;
  // };
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
   * 区域设置
   */
  areas?: Areas;
  /**
   * class的名称
   */
  classNames?: string[] | string;
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

export interface Areas {
  /**
   * 头部
   */
  header?: HeaderConfig;
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
  sidebars?: {
    /**
     * 左侧边栏
     */
    left?: any;
    /**
     * 右侧边栏
     */
    right?: any;
  };
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
