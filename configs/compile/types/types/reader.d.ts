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

