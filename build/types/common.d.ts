import { AppInterface } from "./app";

/**
 * 禁用信息
 */
export type Diasble = boolean | ((app: AppInterface) => boolean);
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
   * 手动渲染，如果存在其他将全部失效, 包括事件
   */
  render?(
    app: AppInterface,
    nodeIno: NodeInfo,
    target: HTMLElement
  ): void | Promise<void>;
  /**
   * 加载完成
   * @param app 应用接口
   */
  attached?(this: NodeInfoThis, app: AppInterface): void;
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

/**
 * nodeInfo this指向的内容
 */
export interface NodeInfoThis extends NodeInfo {
  /**
   * nodeInfo列表选择器
   */
  selector: NodeInfoSelector;
  /**
   * 更新当前nodeInfo
   */
  update(nodeInfo?: NodeInfo): void;
}

/**
 * nodeInfo选择器
 */
export interface NodeInfoSelector {
  /**
   * 上一个nodeInfo
   */
  prev(): NodeInfoThis | undefined;
  /**
   * 下一个nodeInfo
   */
  next(): NodeInfoThis | undefined;
  /**
   * nodeInfo当前索引
   */
  index(): number;
  /**
   * nodeInfo列表的长度
   */
  listSize(): number;
  /**
   * 要获取的nodeInfo的索引
   * @param index 索引
   */
  get(index: number): NodeInfoThis | undefined;
  /**
   * nodeInfo列表
   */
  list(): NodeInfoThis[];
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
  /**
   * 禁用信息
   */
  disabled?: Diasble;
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
   * 是否需要打开文件完成之后进行显示
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

/**
 * 消息按钮
 */
export interface MessageExBtn {
  /**
   * 按钮名
   */
  title: string;
  /**
   * 点击事件
   */
  callback?: (event: any) => void;
  /**
   * 样式名
   */
  className?: string;
}

/**
 * 消息选项
 */
export interface MessageOption {
  /**
   * 额外按钮
   */
  exBtn?: MessageExBtn[];
  /**
   * 提示主体 字符串 如果想传入html，也是字符串
   */
  content?: string;
  /**
   * 毫秒，关闭时间，默认为 5000，传入小于等于0的值，不自动关闭
   */
  hideTime?: number;
  /**
   * 是否展示提示图标，默认为true
   */
  showIcon?: boolean;
}

/**
 * 消息弹窗类型
 */
export interface MessageInterface {
  /**
   * 正确消息
   * @param opt 选项
   */
  success(title: string, opt?: MessageOption): void;
  /**
   * 警告消息
   * @param opt 选项
   */
  warn(title: string, opt?: MessageOption): void;
  /**
   * 错误消息
   * @param opt 选项
   */
  error(title: string, opt?: MessageOption): void;
}

/**
 * 等待框接口
 */
export interface LoadingInterface {
  /**
   * 显示等待消息
   * @param message 要显示的消息
   * @param parentEle 父元素
   */
  show(message: string, parentEle?: HTMLElement): void;
  /**
   * 隐藏
   */
  hide(): void;
}