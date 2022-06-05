import {
  AppBookmarkInfo,
  AppBookmarkInfoWithIndex,
  AppInterface,
  NodeInfoThis,
} from "../../types";

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
  callback: Function,
  self: any
): any {
  eventListenerInterface.removeListener(name, callback);
  callback = callback.bind(self);
  eventListenerInterface.addListener(name, callback);
  return callback;
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
