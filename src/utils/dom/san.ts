import { AppInterface, Diasble, NodeInfo } from "../../types";
import { Component } from "san";
import { createId } from "../id";
import { DataStore } from "../../dataStore";
import { getApp } from "../app";

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

// let _nodeEventMap: NodeEventMap = {};
// let _nodeRenderMap: { [key: string]: NodeInfo } = {};

/**
 * 绑定事件
 * @param eventName 事件名称
 * @param callback 回调函数
 * @returns 事件id
 */
function nodeEvenBindEvent(
  dataStore: DataStore,
  eventName: string,
  callback: (...args: any) => void
) {
  const id = createId() + "_" + eventName;
  dataStore.set(id, {
    id,
    name: eventName,
    callback,
  });
  return id;
}

/**
 * 获取节点的事件信息
 * @param eventId 事件id
 * @returns 事件信息
 */
export function nodeEventInfoGet(
  app: AppInterface,
  eventId: string
): NodeEventInfo | undefined {
  return app.getDataStore().get(eventId);
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
export function handleNodeInfo(
  app: AppInterface,
  nodeInfo: NodeInfo
): NodeInfo {
  const srcEventIdList = nodeInfo.evenIdList || [];
  const eventIdList = [];
  const tempEventMap: NodeEventMap = {};

  const dataStore = app.getDataStore();
  if (nodeInfo.click) {
    const id = nodeEvenBindEvent(
      dataStore,
      "click",
      nodeInfo.click.bind(nodeInfo)
    );
    eventIdList.push(id);
    tempEventMap["click"] = {
      id,
    } as any;
  }

  if (nodeInfo.eventBind) {
    nodeInfo.eventBind((eventName, callback) => {
      const srcEvent = tempEventMap[eventName];
      if (srcEvent) {
        nodeEventDestroy(dataStore, srcEvent.id);
      }
      const id = nodeEvenBindEvent(
        dataStore,
        eventName,
        callback.bind(nodeInfo)
      );
      eventIdList.push(id);
      tempEventMap[eventName] = { id } as any;
    });
  }

  if (nodeInfo.attached) {
    if (nodeInfo._attachedId) {
      dataStore.remove(nodeInfo._attachedId);
    }
    nodeInfo._attachedId = createId();
    dataStore.set(nodeInfo._attachedId, nodeInfo.attached.bind(nodeInfo));
    nodeInfo.attached = nodeInfo.attached.bind(nodeInfo);
  }

  for (let i = 0; i < srcEventIdList.length; i++) {
    const srcId = srcEventIdList[i];
    const srcNodeInfo = dataStore.get(srcId) as any;
    if (!srcNodeInfo) {
      continue;
    }
    if (tempEventMap[srcNodeInfo.name]) {
      nodeEventDestroy(srcNodeInfo.id);
    }
  }

  let renderId: string | undefined = (nodeInfo as any)._renderId;
  if (nodeInfo.render) {
    if (renderId) {
      dataStore.remove(renderId);
      // delete _nodeRenderMap[renderId];
    }
    nodeInfo.render = nodeInfo.render.bind(nodeInfo);
    renderId = createId();
    dataStore.set(renderId, nodeInfo);
    nodeInfo._renderId = renderId;
    // _nodeRenderMap[renderId] = nodeInfo;
  }

  nodeInfo = {
    ...nodeInfo,
    renderId,
    evenIdList: eventIdList,
  };

  return JSON.parse(JSON.stringify(nodeInfo));
}

export async function nodeRender(
  component: Component,
  renderId: string,
  app: AppInterface,
  parent: Component,
  renderToDom?: any
) {
  if (!renderId) {
    throw new Error("未获取到renderId");
  }

  const dataStore = getApp(component.data.get("appId")).getDataStore();
  // const nodeInfo = _nodeRenderMap[renderId];
  const nodeInfo = dataStore.get(renderId) as NodeInfo;
  if (!nodeInfo || !nodeInfo.render) {
    throw new Error("获取节点render方法失败");
  }

  const res = nodeInfo.render(app, nodeInfo, renderToDom);
  if (res instanceof Promise) {
    await res;
  }
  if (nodeInfo.attached) {
    nodeEventCall(app, nodeInfo.attached as any, app);
  }
  // const ele = nodeInfo.render(app, nodeInfo, parent);
  // if (renderToDom) {
  // if (typeof (ele as any).attach !== "function") {
  // renderToDom.innerHTML = "";
  // renderToDom.appendChild(ele as any);
  // } else {
  // (ele as any).attach(renderToDom);
  // }
  // }

  // return ele;
}

/**
 * 节点事件调用
 * @param eventId 事件ID
 * @param args 参数
 */
export function nodeEventCall(
  app: AppInterface,
  eventId: string,
  ...args: any
): void {
  const nodeEventInfo = app.getDataStore().get(eventId) as any;
  if (!nodeEventInfo) {
    return;
  }
  if (typeof nodeEventInfo === "function") {
    return nodeEventInfo(...args);
  }
  nodeEventInfo.callback(...args);
}

/**
 * 节点元素事件注销
 * @param eventId 事件id
 */
export function nodeEventDestroy(
  dataStore: DataStore,
  ...eventIds: string[]
): void {
  const eventIdLen = eventIds.length;
  if (eventIdLen === 0) {
    return;
  }
  for (let i = 0; i < eventIdLen; i++) {
    dataStore.remove(eventIds[i]);
    // delete _nodeEventMap[eventIds[i]];
  }
}

// /**
//  * 节点事件销毁全部
//  */
// export function nodeEventDestroyAll(): void {
//   _nodeEventMap = {};
// }

// export function nodeRenderDestroy(...renderId: string[]) {
//   const renderIdLen = renderId.length;
//   if (renderIdLen === 0) {
//     return;
//   }
//   for (let i = 0; i < renderIdLen; i++) {
//     delete _nodeRenderMap[renderId[i]];
//   }
// }

// export function nodeRenderDestroyAll(): void {
//   _nodeRenderMap = {};
// }
