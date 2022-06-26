/**
 * 印章信息
 */
export interface SealInfo {
  /**
   * id, 唯一标识
   */
  id: string;
  /**
   * 签名域名称
   */
  name?: string;
  /**
   * 印章显示的名称
   */
  title?: string;
  /**
   * 印章图片路径
   */
  imgUrl: string;
  /**
   * 印章宽度
   */
  width: number;
  /**
   * 印章高度
   */
  height: number;
}

/**
 * 印章验证结果
 */
export interface SealVerifyResult {
  /**
   * 是否有错
   */
  error: boolean;
  /**
   * 签名域名称
   */
  name: string;
  /**
   * 印章所在页
   */
  page: number;
  /**
   * 错误信息
   */
  errMsg?: string;
  /**
   * 签名时间
   */
  signTime?: string;
  /**
   * 签名者时间
   */
  signerName?: string;
}

/**
 * 印章拖拽选项
 */
export interface SealDrgaOption {
  /**
   * 可拖拽的页面
   */
  pageNo?: number[];
  /**
   * 可拖拽的最大页码
   */
  maxPageNo?: number;
  /**
   * 可拖拽的最小页码
   */
  minPageNo?: number;
  /**
   * 中心定位模式
   * 1. center: 中心为起点
   * 2. leftBottom: 左下角为中心
   */
  cernterPositionMode?: "center" | "leftBottom";
}

/**
 * 印章拖拽结果
 */
export interface SealDragResult {
  /**
   * 页码
   */
  pageNo: number;
  /**
   * 印章信息
   */
  sealInfo: SealInfo;
  /**
   * x坐标
   */
  x: number;
  /**
   * y坐标
   */
  y: number;
  /**
   * 中心定位模式
   * 1. center: 中心为起点
   * 2. leftBottom: 左下角为中心
   */
  cernterPositionMode?: "center" | "leftBottom";
}

/**
 * 签章定位信息
 */
export interface SealPositionInfo {
  /**
   * x 位置
   */
  x: number;
  /**
   * y位置
   */
  y: number;
  /**
   * 页码
   */
  pageNo: number;
}
