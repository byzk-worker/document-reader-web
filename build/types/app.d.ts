import { TabPagesConfig, TabBtnGroupConfig } from "./tabPages";
import { HeaderConfig } from "./header";
import { SlidebarLeftConfig } from "./slidebar";
import {
  LoadingInterface,
  MessageInterface,
  NodeInfo,
  ToolbarConfig,
} from "./common";
import { ReaderInterface } from "./reader";
import {
  FileInfo,
  ReaderParserConstructor,
  ReaderParserInterface,
  ReaderParserSupport,
} from "./parser";
import { ContentConfig } from "./content";

/**
 * Web字体库配置
 */
export declare interface WebFontConfig {
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

/**
 * 应用构造器
 */
export declare interface AppConstructor {
  /**
   * App构造参数
   */
  new (attachEle: HTMLElement, options?: AppOptions): AppInterface;
}

/**
 * 阅读器选项参数
 */
export declare interface AppOptions extends AppUpdateOptions {
  /**
   * 字体配置, 目前只支持更改一次不支持修改
   */
  fontConfig?: WebFontConfig;
}

/**
 * 应用更新参数
 */
export declare interface AppUpdateOptions {
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
 * 应用接口
 */
export declare interface AppInterface {
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
  /**
   * 更新指定表达式的选项内容
   * @param expr 表达式
   * @param options 要更新的参数
   */
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

  /**
   * 获取当前App中的阅读器信息
   */
  getReader(): ReaderInterface;

  /**
   * 获取app当前页签信息
   */
  currentBookmark(): AppBookmarkInfoWithIndex | undefined;

  /**
   * 切换app指定索引页签为当前页签
   * @param pageIndex 要切换到的索引
   */
  convertBookmark(pageIndex: number): void;
  /**
   * 切换app指定索引页签为当前页签
   * @param id 页签id
   */
  convertBookmarkById(id: string): void;
  /**
   * 当前APP中的页签数量
   */
  bookmarkNum(): number;
  /**
   * 根据页签索引获取页签信息
   * @param index 要获取的页签索引
   */
  getBookmarkInfo(index: number): AppBookmarkInfoWithIndex | undefined;
  /**
   * 根据页签ID获取页签信息
   * @param id 要获取的页签ID
   */
  getBookmarkInfoById(id: string): AppBookmarkInfoWithIndex | undefined;
  /**
   * 添加一个页签信息到当前APP
   * @param bookmarkInfo 页签信息
   */
  addBookmark(bookmarkInfo: AppBookmarkInfo): void;
  /**
   * 删除app页签通过页签索引
   * @param index 要删除的索引
   */
  removeBookmark(index: number): void;
  /**
   * 删除app页签通过页签ID
   * @param id 要删除的id
   */
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

  /**
   * 消息弹窗
   */
  message: MessageInterface;

  /**
   * 等待框
   */
  loading: LoadingInterface;
}

/**
 * 应用页签信息
 */
export interface AppBookmarkInfo {
  /**
   * id
   */
  id: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 解析器包装信息{@ParserWrapperInfo}
   */
  parserWrapperInfo: ParserWrapperInfo;
}

/**
 * App页签信息带有索引
 */
export interface AppBookmarkInfoWithIndex extends AppBookmarkInfo {
  index: number;
}

/**
 * 解析器包装信息
 */
export interface ParserWrapperInfo {
  /**
   * 文件信息
   */
  fileInfo: FileInfo;
  /**
   * 解析器接口
   */
  parserInterface: ReaderParserInterface;
  /**
   * 解析器信息
   */
  parserInfo: {
    /**
     * 解析器支持项
     */
    support: ReaderParserSupport;
    /**
     * 解析器构造器
     */
    Parser: ReaderParserConstructor;
  };
}
