import { FileInfo, ReaderParserInfo } from "./parser";

/**
 * http协议保存参数
 */
export interface SaveHttpOptions {
  /**
   * 上传方式
   */
  method?: "POST" | "PUT";
  /***
   * form字段中，文件字段的字段名
   */
  fieldName?: string;
  /**
   * 要保存成的文件名
   */
  filename?: string;
  /**
   * http请求头
   */
  headers?: any;
  /**
   * 表单数据
   */
  form?: FormData;
}

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
   * 当前文件信息
   */
  currentFileInfo(): Promise<FileInfo>;
  /**
   * 关闭当前文件
   */
  closeCurrentFile(): void;
  /**
   * 保存当前文件到Base64
   */
  saveCurrentFileToBase64(): Promise<string>;
  /**
   * 保存当前文件到本地磁盘中的路径
   * @param path 要保存到的路径
   */
  saveCurrentFileToLocalPath(path: string): Promise<void>;
  /**
   * 保存文件到http(s)服务
   * @param url 服务器地址
   * @param options 自定义选项
   */
  saveCurrentFileToHttp(url: string, options?: SaveHttpOptions): Promise<void>;
  /**
   * 重新加载当前页面
   */
  reloadCurrentFile(...pageNo: number[]): void;
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
