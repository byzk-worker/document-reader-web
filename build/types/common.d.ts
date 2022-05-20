import { Component } from "san";
import { AppInterface } from "./app";
/**
 * dom元素节点信息
 */
export declare interface NodeInfo {
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

/**
 * 工具信息
 */
export declare interface ToolInfo {
  /**
   * 工具类型:
   * default: 默认（自定义元素）,
   * separate: 分割线
   */
  type: "default" | "separate";
  /**
   * 当{@type}==="separate"时生效
   */
  nodeInfo?: NodeInfo;
  /**
   * 是否需要已经打开阅读器在显示
   */
  needReader?: true;
}

/**
 * 工具栏配置
 */
export declare interface ToolbarConfig {
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

/**
 * 工具栏激活事切换事件信息
 */
export declare interface ToolbarConfigActiveChangeEvent {
  /**
   * 是否激活
   */
  active: boolean;
  /**
   * 当前索引
   */
  currentIndex: number;
  /**
   * 当前工具配置信息
   */
  nowInfo: ToolbarConfig;
  /**
   * 更新当前工具信息
   */
  update: (newInfo: ToolbarConfig) => void;
}
