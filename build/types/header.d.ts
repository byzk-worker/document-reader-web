import { ToolbarConfig } from "./common";

/**
 * 头部配置.
 */
export declare interface HeaderConfig {
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
