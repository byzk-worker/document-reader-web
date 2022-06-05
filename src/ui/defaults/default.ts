import {
  AppInterface,
  NodeInfo,
  NodeInfoThis,
  ToolbarConfig,
  ToolInfo,
} from "../../types";
import { dom, id } from "../../utils";
import { Component, debug } from "san";
import styles from "./index.module.less";
import ToolJump from "./components/ToolJump";
import ToolScale from "./components/ToolScale";
import TempReaderContent from "./components/TempReaderContent";
import {
  actualSizeAttached,
  selectOrMoveAttached,
  showSupportFull,
  showSupportScale,
  suitablePageAttached,
} from "./common";

const fullBtnId = id.createId();

function narrowDisabledHandler(
  this: NodeInfo & {
    update: (nodeInfo: NodeInfo) => void;
  },
  app: AppInterface
) {
  debugger;
  let isDisabled = false;
  try {
    const scale = parseInt(
      app.currentBookmark().parserWrapperInfo.parserInterface.getScale() * 100 +
        ""
    );
    const scalMinVal = scaleVals[0];
    if (scale <= scalMinVal) {
      isDisabled = true;
    }
  } catch (e) {
    isDisabled = false;
  }
  if (isDisabled && !this.className.includes("  " + styles.disabled)) {
    this.className += " " + styles.disabled;
    this.update(this);
  } else if (!isDisabled && this.className.includes(" " + styles.disabled)) {
    this.className = this.className.split(" ")[0];
    this.update(this);
  }
}

let _narrowDisabledHandler = narrowDisabledHandler;

function enlargeDisabledHandle(
  this: NodeInfo & {
    update: (nodeInfo: NodeInfo) => void;
  },
  app: AppInterface
) {
  let isDisabled = false;
  try {
    const appInterface = app.currentBookmark().parserWrapperInfo
      .parserInterface;
    const scale = parseInt(appInterface.getScale() * 100 + "");
    const scaleMaxVal = scaleVals[scaleVals.length - 1];
    if (scale >= scaleMaxVal) {
      isDisabled = true;
    }
  } catch (e) {
    isDisabled = false;
  }
  if (isDisabled && !this.className.includes("  " + styles.disabled)) {
    this.className += " " + styles.disabled;
    this.update(this);
  } else if (!isDisabled && this.className.includes(" " + styles.disabled)) {
    this.className = this.className.split(" ")[0];
    this.update(this);
  }
}

let _enlargeDisabledHandle = enlargeDisabledHandle;

function narrowOrEnlargeScaleChange(this: NodeInfoThis, scale: number) {
  scale = parseInt(scale * 100 + "");
  const isNarrow = this.title === "缩小";
  const val = scaleVals[isNarrow ? 0 : scaleVals.length - 1];
  const isDisabled = isNarrow ? scale <= val : scale >= val;
  if (isDisabled) {
    if (!this.className.includes(" " + styles.disabled)) {
      this.className += " " + styles.disabled;
      this.update(this);
    }
  } else if (this.className.includes(" " + styles.disabled)) {
    this.className = this.className.split(" ")[0];
    this.update(this);
  }
}
let _narrowScaleChange = narrowOrEnlargeScaleChange;
let _EnlargeScaleChange = narrowOrEnlargeScaleChange;

const scaleOptions = [
  {
    val: 20,
    text: "20%",
  },
  {
    val: 50,
    text: "50%",
  },
  {
    val: 100,
    text: "100%",
  },
  {
    val: 200,
    text: "200%",
  },
  {
    val: 400,
    text: "400%",
  },
];

const scaleVals = scaleOptions.map((v) => v.val);

const headerTabsBtns = {
  open: {
    type: "default",
    disabled: true,
    nodeInfo: {
      text: "打开",
      html: "&#xe65e;",
      title: "打开文件",
      async click(app) {
        const result = await app.getReader().selectFile();
        if (!result) {
          return;
        }
        await result.loadFile();
      },
    },
  } as ToolInfo,
  save: {
    type: "default",
    needReader: true,
    nodeInfo: {
      text: "保存",
      html: "&#xe65c;",
      title: "保存",
    },
  } as ToolInfo,
  saveAs: {
    type: "default",
    needReader: true,
    nodeInfo: {
      text: "另存为",
      html: "&#xe65c;",
      title: "另存为",
    },
  } as ToolInfo,
  print: {
    type: "default",
    needReader: true,
    nodeInfo: {
      text: "打印",
      html: "&#xe65d;",
      title: "打印",
    },
  } as ToolInfo,
  jump: {
    type: "default",
    needReader: true,
    nodeInfo: {
      width: 80,
      render(this: { _toolJump: Component }, app, nodeInfo, parent): void {
        if (this._toolJump) {
          this._toolJump.dispose();
        }

        this._toolJump = new ToolJump();
        (this._toolJump as any).app = app;
        this._toolJump.attach(parent);
      },
      isShow(app) {
        const supportPages = app.currentBookmark().parserWrapperInfo.parserInfo
          .support.pages;
        return supportPages && supportPages.jump;
      },
    },
  } as ToolInfo,
  select: {
    type: "default",
    needReader: true,
    nodeInfo: {
      text: "选择",
      title: "选择",
      html: "&#xe65f;",
      attached: selectOrMoveAttached,
      isShow(app) {
        const support = app.currentBookmark().parserWrapperInfo.parserInfo
          .support.pages;
        return support && support.moduleSwitch && support.moduleSwitch.select;
      },
      click(app) {
        const current = app.currentBookmark();
        if (!current || !current.id) {
          return;
        }
        current.parserWrapperInfo.parserInterface.setMode("select");
        const moveNodeInfo = this.selector.next();
        if (!this.active) {
          this.active = true;
          this.update();
        }
        if (moveNodeInfo.active) {
          moveNodeInfo.active = false;
          moveNodeInfo.update(moveNodeInfo);
        }
      },
    },
  } as ToolInfo,
  move: {
    type: "default",
    needReader: true,
    nodeInfo: {
      text: "移动",
      title: "移动",
      html: "&#xe660;",
      isShow(app) {
        const support = app.currentBookmark().parserWrapperInfo.parserInfo
          .support.pages;
        return support && support.moduleSwitch && support.moduleSwitch.move;
      },
      attached: selectOrMoveAttached,
      // attached: selectOrMoveAttached,
      click(app) {
        const current = app.currentBookmark();
        if (!current || !current.id) {
          return;
        }
        current.parserWrapperInfo.parserInterface.setMode("move");
        const selectNodeInfo = this.selector.prev();
        if (!this.active) {
          this.active = true;
          this.update();
        }
        if (selectNodeInfo.active) {
          selectNodeInfo.active = false;
          selectNodeInfo.update(selectNodeInfo);
        }
      },
    },
  } as ToolInfo,
  ActualSize: {
    type: "default",
    needReader: true,
    nodeInfo: {
      text: "实际大小",
      title: "实际大小",
      html: "&#xe661;",
      isShow: showSupportScale,
      attached: actualSizeAttached,
      click(app) {
        app.currentBookmark().parserWrapperInfo.parserInterface.setScale(1);
      },
    },
  } as ToolInfo,
  SuitableWidth: {
    type: "default",
    needReader: true,
    nodeInfo: {
      text: "适合宽度",
      title: "适合宽度",
      html: "&#xe662;",
      isShow: showSupportFull("width"),
      click(app) {
        app
          .currentBookmark()
          .parserWrapperInfo.parserInterface.setFull("width");
      },
    },
  } as ToolInfo,
  SuitablePage: {
    type: "default",
    needReader: true,
    nodeInfo: {
      text: "适合页面",
      title: "适合页面",
      html: "&#xe663;",
      attached: suitablePageAttached,
      click(app) {
        app.currentBookmark().parserWrapperInfo.parserInterface.setScale(0.8);
      },
    },
  } as ToolInfo,
  narrow: {
    type: "default",
    needReader: true,
    nodeInfo: {
      html: "&#xe67b;",
      needReader: true,
      title: "缩小",
      width: 24,
      className: styles.toolIconBtn,
      isShow: showSupportScale,
      attached(app) {
        app.removeListener("bookmarkChange", _narrowDisabledHandler);
        _narrowDisabledHandler = narrowDisabledHandler.bind(this);
        app.addListener("bookmarkChange", _narrowDisabledHandler);
        app.getReader().removeListener("scaleChange", _narrowScaleChange);
        _narrowScaleChange = narrowOrEnlargeScaleChange.bind(this);
        app.getReader().addListener("scaleChange", _narrowScaleChange);
      },
      click(app) {
        try {
          const nextNodeInfo = this.selector.next();
          if (nextNodeInfo.className.includes(" " + styles.disabled)) {
            nextNodeInfo.className = nextNodeInfo.className.split(" ")[0];
            nextNodeInfo.update(nextNodeInfo);
          }
          if (this.className.includes(" " + styles.disabled)) {
            return;
          }

          const parserInterface = app.currentBookmark().parserWrapperInfo
            .parserInterface;
          const nowScale = parseInt(parserInterface.getScale() * 100 + "");
          let index = scaleVals.indexOf(nowScale);
          if (index === -1) {
            for (let i = 1; i < scaleVals.length; i++) {
              const val = scaleVals[i];
              if (nowScale > val) {
                index = i - 1;
                break;
              }
            }
          } else {
            index -= 1;
          }

          if (index <= 0) {
            if (this.className.includes(" " + styles.disabled)) {
              return;
            }
            this.className += " " + styles.disabled;
            this.update(this);
            if (index === -1) {
              return;
            }
          } else if (this.className.includes(" " + styles.disabled)) {
            this.className = this.className.split(" ")[0];
            this.update(this);
          }
          parserInterface.setScale(scaleVals[index] / 100);
        } catch (e) {}
      },
    },
  } as ToolInfo,
  scale: {
    type: "default",
    needReader: true,
    nodeInfo: {
      title: "缩放比率",
      width: 82,
      render(this: { _toolscale?: Component }, app, nodeInfo, parent): void {
        if (this._toolscale) {
          this._toolscale.dispose();
        }
        this._toolscale = new ToolScale({
          data: {
            activeVal: 100,
            options: scaleOptions,
          },
        });
        (this._toolscale as any).app = app;
        this._toolscale.attach(parent as any);
      },
      isShow: showSupportScale,
    },
  } as ToolInfo,
  enlarge: {
    type: "default",
    needReader: true,
    nodeInfo: {
      html: "&#xe65a;",
      title: "放大",
      width: 24,
      className: styles.toolIconBtn,
      isShow: showSupportScale,
      attached(app) {
        app.removeListener("bookmarkChange", _enlargeDisabledHandle);
        _enlargeDisabledHandle = enlargeDisabledHandle.bind(this);
        app.addListener("bookmarkChange", _enlargeDisabledHandle);
        app.getReader().removeListener("scaleChange", _EnlargeScaleChange);
        _EnlargeScaleChange = narrowOrEnlargeScaleChange.bind(this);
        app.getReader().addListener("scaleChange", _EnlargeScaleChange);
      },
      click(app) {
        const prevNodeInfo = this.selector.prev();
        if (prevNodeInfo.className.includes(" " + styles.disabled)) {
          prevNodeInfo.className = prevNodeInfo.className.split(" ")[0];
          prevNodeInfo.update(prevNodeInfo);
        }
        if (this.className.includes(" " + styles.disabled)) {
          return;
        }

        try {
          const parserInterface = app.currentBookmark().parserWrapperInfo
            .parserInterface;
          const nowScale = parseInt(parserInterface.getScale() * 100 + "");
          let index = scaleVals.indexOf(nowScale);
          if (index === -1) {
            for (let i = 0; i < scaleVals.length; i++) {
              const val = scaleVals[i];
              if (val > nowScale) {
                index = i;
                break;
              }
            }
          } else {
            index += 1;
          }

          if (index >= scaleVals.length - 1 || index === -1) {
            if (this.className.includes(" " + styles.disabled)) {
              return;
            }

            this.className += " " + styles.disabled;
            this.update(this);
            if (index >= scaleVals.length) {
              return;
            }
          } else if (this.className.includes(" " + styles.disabled)) {
            this.className = this.className.split(" ")[0];
            this.update(this);
          }

          parserInterface.setScale(scaleVals[index] / 100);
        } catch (e) {}
      },
    },
  } as ToolInfo,
  find: {
    type: "default",
    needReader: true,
    nodeInfo: {
      html: "&#xe664;",
      title: "查找",
      text: "查找",
    },
  } as ToolInfo,
  full: {
    type: "default",
    needReader: true,
    nodeInfo: {
      html: "&#xe665;",
      title: "全屏",
      text: "全屏",
      isShow: showSupportFull("content"),
      click(app) {
        app
          .currentBookmark()
          .parserWrapperInfo.parserInterface.setFull("content");
      },
    },
  } as ToolInfo,
  preferenc: {
    type: "default",
    needReader: true,
    nodeInfo: {
      html: "&#xe666;",
      title: "首选项",
      text: "首选项",
    },
  } as ToolInfo,
};

export const defaultData = {
  tabBtns: {
    close: {
      className: "iconfont",
      // html: "&#xeaf2;",
      html: "&#xe600;",
      title: "关闭",
      click(app) {
        app.destroy();
      },
    } as NodeInfo,

    full: {
      id: fullBtnId,
      className: "iconfont",
      html: "&#xe600;",
      title: "全屏",
      click(app) {
        let title = "全屏";
        if (dom.isFullScreen()) {
          dom.exitFullscreen();
        } else {
          dom.full(app.getRootEle());
          title = "还原";
        }
        const btns = app.getNowData("tabPages.btnGroup.btns");
        for (let i in btns) {
          const btn = btns[i as any];
          if (btn.id === fullBtnId) {
            btn.title = title;
            app.updateByExpr("tabPages.btnGroup.btns", btns);
            return;
          }
        }
      },
    } as NodeInfo,
    hide: {
      className: "iconfont",
      html: "&#xe600;",
      title: "隐藏",
      click(app) {
        app.hide();
      },
    } as NodeInfo,
  },
  headerTabs: {
    start: {
      text: "开始",
      tools: [
        headerTabsBtns.open,
        headerTabsBtns.save,
        headerTabsBtns.saveAs,
        headerTabsBtns.print,
        { type: "separate", needReader: true },
        headerTabsBtns.jump,
        headerTabsBtns.select,
        headerTabsBtns.move,
        headerTabsBtns.ActualSize,
        headerTabsBtns.SuitableWidth,
        headerTabsBtns.SuitablePage,
        { type: "separate", needReader: true },
        headerTabsBtns.scale,
        headerTabsBtns.narrow,
        headerTabsBtns.enlarge,
        { type: "separate", needReader: true },
        headerTabsBtns.find,
        headerTabsBtns.full,
        headerTabsBtns.preferenc,
      ],
    } as ToolbarConfig,
    tools: {
      text: "工具",
    } as ToolbarConfig,
    view: {
      text: "视图",
    } as ToolbarConfig,
    reader: {
      text: "阅读",
    } as ToolbarConfig,
    safety: {
      text: "安全",
    } as ToolbarConfig,
    help: {
      text: "帮助",
    } as ToolbarConfig,
  },
  sildebarLeftTabs: {
    sign: {
      text: "签名",
      iconHtml: "&#xe64f;",
      disabled: slidebarLeftToolbarDisabled,
    } as ToolbarConfig,
    comment: {
      text: "注释",
      iconHtml: "&#xe650;",
      disabled: slidebarLeftToolbarDisabled,
    } as ToolbarConfig,
    thumbnail: {
      text: "缩图",
      iconHtml: "&#xe651;",
      disabled: slidebarLeftToolbarDisabled,
    } as ToolbarConfig,
  },
};

export const defaultContentTemp: (
  app: AppInterface,
  parent: Component
) => HTMLElement | Component = (app, parent) => {
  const tempReaderComponent = new TempReaderContent({
    owner: parent,
    source: "<content-temp></content-temp>",
  });
  (tempReaderComponent as any).app = app;
  return tempReaderComponent;
};

function slidebarLeftToolbarDisabled(app: AppInterface) {
  const currentBookmark = app.currentBookmark();
  return (
    !currentBookmark ||
    !currentBookmark.parserWrapperInfo ||
    !currentBookmark.parserWrapperInfo.parserInterface
  );
}
