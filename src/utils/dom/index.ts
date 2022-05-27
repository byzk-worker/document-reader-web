import { lessThan } from "../ie";

export function createBlobUrlByFile(file: File) {
  if ((window as any).createObjectURL) {
    return (window as any).createObjectURL(file);
  } else if (window.URL.createObjectURL) {
    return window.URL.createObjectURL(file);
  } else if (window.webkitURL) {
    return window.webkitURL.createObjectURL(file);
  }
  return "";
}

export function createElement(targetName: string, name: string = ""): any {
  if (lessThan(9)) {
    return document.createElement(
      `<${targetName} name="${name}"></${targetName}>`
    );
  }
  return document.createElement(targetName);
}

export function styleInject(css: string, id: string) {
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  style.id = id;
  head.appendChild(style);

  if ((style as any).styleSheet) {
    (style as any).styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

/**
 * 全屏
 * @param ele 要全屏的元素
 */
export function full(ele: any) {
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  }
}

/**
 * 退出全屏
 */
export function exitFullscreen() {
  const doc = document as any;
  if (doc.exitFullScreen) {
    doc.exitFullScreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen();
  } else if (
    (window as any).element &&
    (window as any).element.msExitFullscreen
  ) {
    (window as any).element.msExitFullscreen();
  }
}

/**
 * 获取全屏元素
 * @returns 全屏的元素
 */
export function getFullscreenElement(): HTMLElement | null {
  const doc = document as any;
  return (
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullScreenElement ||
    doc.webkitFullscreenElement ||
    null
  );
}

/**
 * 是否可进入全屏
 * @returns 是/否
 */
export function isFullScreen() {
  const doc = document as any;
  return !!(
    doc.fullscreen ||
    doc.mozFullScreen ||
    doc.webkitIsFullScreen ||
    doc.webkitFullScreen ||
    doc.msFullScreen
  );
}

export const eventUtil = {
  once(
    ele: HTMLElement | Window,
    type: string,
    handler: (...args: any) => void
  ) {
    const tempFn = function (...args) {
      handler(...args);
      eventUtil.removeHandler(ele, type, tempFn);
    };
    eventUtil.addHandler(ele, type, tempFn);
  },
  addHandler: function (
    element: HTMLElement | Window,
    type: string,
    handler: (...args: any) => void
  ) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if ((element as any).attachEvent) {
      (element as any).attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: function (
    element: HTMLElement | Window,
    type: string,
    handler: (...args: any) => void
  ) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if ((element as any).detachEvent) {
      (element as any).detachEvent("on" + type, handler);
    } else {
      element[" on" + type] = null;
    }
  },
  //获取事件对象
  getEvent: function (event: any) {
    return event ? event : window.event;
  },
  //获取目标对象，即绑定事件的DOM
  getTarget: function (event: any) {
    return event.target || event.srcElement;
  },
  //阻止默认行为
  preventDefault: function (event: any) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  stopPropagation: function (event: any) {
    if (event.stopPropagation) {
      event.stopPropagation(); //阻止捕获和冒泡
    } else {
      event.cancelBubble = true; //只会阻止冒泡
    }
  },
  //mouseover 和 mouseout 事件 获取相关元素
  getRelatedTarget: function (event: any) {
    if (event.relatedTarget) {
      return event.relatedTarget;
    } else if (event.toElement) {
      //兼容IE的mouseout
      return event.toElement;
    } else if (event.fromElement) {
      //兼容IE的mouseover
      return event.fromElement;
    } else {
      return null;
    }
  },
  //keypress获取键码
  getCharCode: function (event: any) {
    if (typeof event.charCode == "number") {
      //早期IE和Opera
      return event.charCode;
    } else {
      return event.keyCode;
    }
  },
};

function getEleWindowTop(ele: HTMLElement) {
  let offset = ele.offsetTop;
  if (ele.offsetParent != null) {
    offset += getEleWindowTop(ele.offsetParent as any);
  }

  return offset;
}

function getEleWindowLeft(ele: HTMLElement) {
  var offset = ele.offsetLeft;
  if (ele.offsetParent != null) {
    offset += getEleWindowLeft(ele.offsetParent as any);
  }
  return offset;
}

function getEleWindowScollLeft(ele: HTMLElement) {
  if (ele === document.body || !ele) {
    return 0;
  }

  return ele.scrollLeft + (getEleWindowScollLeft(ele.parentElement) || 0);
}

function getEleWindowScollTopt(ele: HTMLElement) {
  if (ele === document.body || !ele) {
    return 0;
  }

  return ele.scrollTop + (getEleWindowScollTopt(ele.parentElement) || 0);
}

export function getBoundingClientRect(ele: HTMLElement): DOMRect {
  // if (ele.getBoundingClientRect) {
  //   return ele.getBoundingClientRect();
  // }
  const top = getEleWindowTop(ele) - getEleWindowScollTopt(ele);
  const left = getEleWindowLeft(ele) - getEleWindowScollLeft(ele);
  return {
    top,
    left,
    width: ele.clientWidth,
    height: ele.clientHeight,
    x: left,
    y: top,
  } as DOMRect;
}

export * from "./san";
