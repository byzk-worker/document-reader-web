import {
  AppBookmarkInfo,
  AppBookmarkInfoWithIndex,
  AppInterface,
  NodeInfoThis,
} from "../../types";
import styles from "./index.module.less";

export function showSupportScale(app: AppInterface) {
  return app.currentBookmark().parserWrapperInfo.parserInfo.support.scale;
}

export function showSupportFull(mod: "content" | "width") {
  if (mod === "content") {
    return function (app: AppInterface) {
      const full = app.currentBookmark().parserWrapperInfo.parserInfo.support
        .full;
      return full && full.content;
    };
  }

  if (mod === "width") {
    return function (app: AppInterface) {
      const full = app.currentBookmark().parserWrapperInfo.parserInfo.support
        .full;
      return full && full.width;
    };
  }

  return function () {
    return false;
  };
}

function _bindListener(
  eventListenerInterface: {
    removeListener(name: string, call: any);
    addListener(name: string, call: any);
  },
  name: string,
  callback: any,
  self: any
): any {
  eventListenerInterface.removeListener(name, callback);
  callback = callback.srcFn || callback;
  const tempCallback = callback.bind(self);
  tempCallback.srcFn = callback;
  // const tempCallback = callback.bind(self);
  eventListenerInterface.addListener(name, tempCallback);
  return tempCallback;
}

let scaleBookmarkChange = function (
  this: NodeInfoThis & { scale: number },
  app: AppInterface,
  current: AppBookmarkInfo
) {
  if (!current || !current.id) {
    return;
  }
  if (
    current.parserWrapperInfo.parserInterface.getScale() === this.scale &&
    !this.active
  ) {
    this.active = true;
    this.update(this);
  } else if (this.active) {
    this.active = false;
    this.update(this);
  }
};

let scaleChange = function (
  this: NodeInfoThis & { scale: number },
  scale: number
) {
  if (scale === this.scale && !this.active) {
    this.active = true;
    this.update(this);
  } else if (this.active) {
    this.active = false;
    this.update(this);
  }
};

export function actualSizeAttached(
  this: NodeInfoThis & { scale: number },
  app: AppInterface
) {
  this.scale = 1;
  scaleBookmarkChange = _bindListener(
    app,
    "bookmarkChange",
    scaleBookmarkChange,
    this
  );

  scaleChange = _bindListener(
    app.getReader(),
    "scaleChange",
    scaleChange,
    this
  );
}

let suitableScaleBookmarkChange = scaleBookmarkChange;
let suitableScaleChange = scaleChange;
export function suitablePageAttached(
  this: NodeInfoThis & { scale: number },
  app: AppInterface
) {
  this.scale = 0.8;
  suitableScaleBookmarkChange = _bindListener(
    app,
    "bookmarkChange",
    suitableScaleBookmarkChange,
    this
  );

  suitableScaleChange = _bindListener(
    app.getReader(),
    "scaleChange",
    suitableScaleChange,
    this
  );
}

let selectOrMoveBookmarkChange = function (
  this: NodeInfoThis,
  app: AppInterface,
  current: AppBookmarkInfoWithIndex
) {
  if (!current || !current.id) {
    return;
  }
  if (this.text === "移动") {
    const pageSupport = current.parserWrapperInfo.parserInfo.support.pages;
    if (
      pageSupport &&
      pageSupport.moduleSwitch &&
      !pageSupport.moduleSwitch.select
    ) {
      if (!this.active) {
        this.active = true;
        this.update(this);
      }
    }
    return;
  }
  const mod = current.parserWrapperInfo.parserInterface.getMode();
  let selectNode = this;
  let moveNode = this.selector.next();
  let disabledNodeInfo: NodeInfoThis;
  let activeNodeInfo: NodeInfoThis;
  switch (mod) {
    case "move":
      disabledNodeInfo = selectNode;
      activeNodeInfo = moveNode;
      break;
    case "select":
      disabledNodeInfo = moveNode;
      activeNodeInfo = selectNode;
      break;
    default:
      return;
  }

  if (!activeNodeInfo.active) {
    activeNodeInfo.active = true;
    activeNodeInfo.update(activeNodeInfo);
  }

  if (disabledNodeInfo.active) {
    disabledNodeInfo.active = false;
    disabledNodeInfo.update(disabledNodeInfo);
  }
};

let _selectOrMoveAttached = selectOrMoveBookmarkChange;
export function selectOrMoveAttached(this: NodeInfoThis, app: AppInterface) {
  const callback = _bindListener(
    app,
    "bookmarkChange",
    this.text === "选择" ? _selectOrMoveAttached : selectOrMoveBookmarkChange,
    this
  );
  if (this.text === "选择") {
    _selectOrMoveAttached = callback;
  } else {
    selectOrMoveBookmarkChange = callback;
  }
}

// export function selectDisabledHandler(this: NodeInfoThis) {

// }

function jumpBtnGroupCheckFn(
  this: NodeInfoThis,
  app: AppInterface,
  currentBookmark: AppBookmarkInfoWithIndex
) {
  if (!currentBookmark || !currentBookmark.id) {
    return;
  }

  const parserInterface = currentBookmark.parserWrapperInfo.parserInterface;
  const numPages = parserInterface.getNumPages();
  const nowPageNo = parserInterface.nowPageNo();
  const haveDisabled = this.className.includes(" " + styles.disabled);

  if (this.title === "跳转到首页" || this.title === "上一页") {
    if (nowPageNo <= 1) {
      if (haveDisabled) {
        return;
      }
      this.className += " " + styles.disabled;
      this.update();
    } else if (haveDisabled) {
      this.className = this.className.split(" " + styles.disabled).join("");
      this.update();
    }
    return;
  }

  if (this.title === "下一页" || this.title === "跳转到尾页") {
    if (nowPageNo >= numPages) {
      if (haveDisabled) {
        return;
      }
      this.className += " " + styles.disabled;
      this.update();
    } else if (haveDisabled) {
      this.className = this.className.split(" " + styles.disabled).join("");
      this.update();
    }
    return;
  }
}

export function jumpBtnGroupCheckAttached(app: AppInterface) {
  const self = this as any;
  if (self._bookmarkChangeFn) {
    app.removeListener("bookmarkChange", self._bookmarkChangeFn);
  }

  self._bookmarkChangeFn = _bindListener(
    app,
    "bookmarkChange",
    jumpBtnGroupCheckFn,
    self
  );

  if (self._pageNoChangeFn) {
    app.getReader().removeListener("pageNoChange", self._pageNoChangeFn);
  }
  self._pageNoChangeFn = (pageNo: number) => {
    self._bookmarkChangeFn(app, app.currentBookmark());
  };
  app.getReader().addListener("pageNoChange", self._pageNoChangeFn);
}

export function supportJumpPage(app: AppInterface) {
  const supportPages = app.currentBookmark().parserWrapperInfo.parserInfo
    .support.pages;
  return supportPages && supportPages.jump;
}
