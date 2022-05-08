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
  addHandler: function (
    element: HTMLElement,
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
    element: HTMLElement,
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

export * from "./san";
