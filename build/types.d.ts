/**
 * HTML节点信息
 */
export declare interface NodeInfo {
  /**
   * 将页面内的元素添加至组件内部, 如有此项，其他参数将全部失效
   */
  el?: {
    /**
     * 将id对应id名称的元素移动到按钮组内
     */
    id?: string;
    /**
     * html文本
     */
    html?: string;
  };

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
   * 其他额外元素
   */
  attrs?: object;
  /**
   * 事件ID.
   */
  readonly evenIdList?: string[];
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
  );
}

/**
 * 标签页按钮组配置
 */
export declare interface TabBtnGroupConfig {
  /**
   * 按钮列表
   */
  btns?: NodeInfo[];
}

/**
 * 标签页配置
 */
export declare interface TabPagesConfig {
  /**
   * 按钮组
   */
  btnGroup?: TabBtnGroupConfig;
}

/**
 * 区域设置
 */
export declare interface Areas {
  /**
   * 头部
   */
  header?: any;
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
 * 应用更新参数
 */
export declare interface AppUpdateOptions {
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
 * 应用初始化选项
 */
export declare interface AppOptions extends AppUpdateOptions {
  /**
   * 字体配置, 目前只支持更改一次不支持修改
   */
  fontConfig?: WebFontConfig;
}

/**
 * web字体库配置
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
 * 应用操作接口
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
  updateByExpr(expr: "tabPages", options: TabPagesConfig | false);
  updateByExpr(expr: "tabPages.btnGroup", options: TabBtnGroupConfig);
  updateByExpr(expr: "tabPages.btnGroup.btns", options: NodeInfo[]): void;

  /**
   * 获取初始化参数.
   */
  getInitConfig(): AppUpdateOptions;
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
