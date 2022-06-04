import { FileInfo, ReaderParserConstructor, ReaderParserInfo } from "./parser";

/**
 * 阅读器接口
 */
export declare interface ReaderInterface {
  /**
   * 附加一个解析器
   * @param parser 解析器信息
   */
  attach(parserInfo: ReaderParserInfo): void;
  /**
   * 获取支持的文件后缀
   * @returns 文件后缀列表
   */
  supportFileSuffix(): string[];
  /**
   * 当前解析器
   */
  currentParser(): ReaderParserInfo | undefined;
  /**
   * 加载文件
   * @param file 要加载的文件
   * @throws {Error} 加载失败返回异常
   */
  loadFile(file: FileInfo): Promise<void>;
  /**
   * 选择一个系统文件
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

/**
 * 文件选择结果
 */
export interface SelectFileResult {
  /**
   * 文件信息
   */
  fileInfo: FileInfo;
  /**
   * 加载当前选择的文件
   */
  loadFile(): Promise<void>;
}
