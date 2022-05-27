import { AppInterface, Diasble, NodeInfo } from "../../types";
import { Component } from "san";
import { createId } from "../id";
import { DataStore } from "../../dataStore";

/**
 * 派发DOM事件消息
 * @param ele 要派发事件的Dom元素
 * @param eventId 事件ID
 * @param dispatch 派发函数
 */
export function dispatchDomEvent(
  ele: HTMLElement,
  eventIdList: string[],
  component: Component
) {
  for (let i = 0; i < eventIdList.length; i++) {
    const eventId = eventIdList[i];
    const idSplit = eventId.split("_");
    if (idSplit.length != 2) {
      console.warn(
        "事件id: ",
        eventId,
        "格式错误，请检查参数如数, 此事件的绑定将被跳过"
      );
      return;
    }
    (ele as any)["on" + idSplit[1].toLowerCase()] = (event: any) => {
      event = event || window.event;
      component.dispatch("HTML::ELE::EVENT", {
        id: eventId,
        event,
      });
    };
  }
}

interface NodeEventInfo {
  id: string;
  name: string;
  callback: (...arg: any) => void;
}

interface NodeEventMap {
  [key: string]: NodeEventInfo;
}

let _nodeEventMap: NodeEventMap = {};
let _nodeRenderMap: { [key: string]: NodeInfo } = {};

/**
 * 绑定事件
 * @param eventName 事件名称
 * @param callback 回调函数
 * @returns 事件id
 */
function nodeEvenBindEvent(
  eventName: string,
  callback: (...args: any) => void
) {
  const id = createId() + "_" + eventName;
  _nodeEventMap[id] = {
    id,
    name: eventName,
    callback,
  };
  return id;
}

/**
 * 获取节点的事件信息
 * @param eventId 事件id
 * @returns 事件信息
 */
export function nodeEventInfoGet(eventId: string): NodeEventInfo | undefined {
  return _nodeEventMap[eventId];
}

export function handleDisabled(
  disabledInfo: Diasble,
  datas: DataStore
): boolean | string {
  const disabledType = typeof disabledInfo;
  if (disabledType !== "function") {
    return disabledInfo as boolean;
  }

  const disableFnId = createId();
  datas.set(disableFnId, disabledInfo);
  return disableFnId;
}

/**
 * 处理节点信息
 * @param nodeInfo 节点信息
 * @returns 处理之后的节点信息
 */
export function handleNodeInfo(nodeInfo: NodeInfo): NodeInfo {
  const srcEventIdList = nodeInfo.evenIdList || [];
  const eventIdList = [];
  const tempEventMap: NodeEventMap = {};

  if (nodeInfo.click) {
    const id = nodeEvenBindEvent("click", nodeInfo.click);
    eventIdList.push(id);
    tempEventMap["click"] = {
      id,
    } as any;
  }

  if (nodeInfo.eventBind) {
    nodeInfo.eventBind((eventName, callback) => {
      const srcEvent = tempEventMap[eventName];
      if (srcEvent) {
        nodeEventDestroy(srcEvent.id);
      }
      const id = nodeEvenBindEvent(eventName, callback);
      eventIdList.push(id);
      tempEventMap[eventName] = { id } as any;
    });
  }

  for (let i = 0; i < srcEventIdList.length; i++) {
    const srcId = srcEventIdList[i];
    const srcNodeInfo = _nodeEventMap[srcId];
    if (!srcNodeInfo) {
      continue;
    }
    if (tempEventMap[srcNodeInfo.name]) {
      nodeEventDestroy(srcNodeInfo.id);
    }
  }

  let renderId: string | undefined = nodeInfo.id;
  if (nodeInfo.render) {
    if (renderId) {
      delete _nodeRenderMap[renderId];
    }
    renderId = createId();
    _nodeRenderMap[renderId] = nodeInfo;
  }

  nodeInfo = {
    ...nodeInfo,
    renderId,
    evenIdList: eventIdList,
  };

  return JSON.parse(JSON.stringify(nodeInfo));
}

export function nodeRender(
  renderId: string,
  app: AppInterface,
  parent: Component,
  renderToDom?: any
): HTMLElement | Component {
  if (!renderId) {
    throw new Error("未获取到renderId");
  }

  const nodeInfo = _nodeRenderMap[renderId];
  if (!nodeInfo || !nodeInfo.render) {
    throw new Error("获取节点render方法失败");
  }

  const ele = nodeInfo.render(app, nodeInfo, parent);
  if (renderToDom) {
    if (typeof (ele as any).attach !== "function") {
      renderToDom.innerHTML = "";
      renderToDom.appendChild(ele as any);
    } else {
      (ele as any).attach(renderToDom);
    }
  }

  return ele;
}

/**
 * 节点事件调用
 * @param eventId 事件ID
 * @param args 参数
 */
export function nodeEventCall(eventId: string, ...args: any): void {
  const nodeEventInfo = _nodeEventMap[eventId];
  if (!nodeEventInfo) {
    return;
  }
  nodeEventInfo.callback(...args);
}

/**
 * 节点元素事件注销
 * @param eventId 事件id
 */
export function nodeEventDestroy(...eventIds: string[]): void {
  const eventIdLen = eventIds.length;
  if (eventIdLen === 0) {
    return;
  }
  for (let i = 0; i < eventIdLen; i++) {
    delete _nodeEventMap[eventIds[i]];
  }
}

/**
 * 节点事件销毁全部
 */
export function nodeEventDestroyAll(): void {
  _nodeEventMap = {};
}

export function nodeRenderDestroy(...renderId: string[]) {
  const renderIdLen = renderId.length;
  if (renderIdLen === 0) {
    return;
  }
  for (let i = 0; i < renderIdLen; i++) {
    delete _nodeRenderMap[renderId[i]];
  }
}

export function nodeRenderDestroyAll(): void {
  _nodeRenderMap = {};
}
