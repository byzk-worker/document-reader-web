import { ToolbarConfig } from "./common";

/**
 * 左侧边栏配置
 */
export declare interface SlidebarLeftConfig {
  /**
   * 节点id
   */
  id?: string;
  /**
   * 节点className
   */
  className?: string;
  /**
   * 工具栏配置
   */
  toolbars?: ToolbarConfig[];
}
