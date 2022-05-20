import { FileInfo, ReaderParserConstructor, ReaderParserInterface } from "./parser";

/**
 * 阅读器接口
 */
export declare interface ReaderInterface {
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

