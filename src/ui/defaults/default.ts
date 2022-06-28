import { cloneDeep } from "lodash";
import {
  AppInterface,
  NodeInfo,
  NodeInfoThis,
  SealPositionInfo,
  ToolbarConfig,
  ToolInfo,
} from "../../types";
import { dom, id } from "../../utils";
import { Component } from "san";
import styles from "./index.module.less";
import ToolJump from "./components/ToolJump";
import ToolScale from "./components/ToolScale";
import TempReaderContent from "./components/TempReaderContent";
import {
  actualSizeAttached,
  jumpBtnGroupCheckAttached,
  selectOrMoveAttached,
  showSupportFull,
  showSupportScale,
  suitablePageAttached,
  supportJumpPage,
} from "./common";
import SealSelect, { SealSelectInterface } from "./components/SealSelect";
//@ts-ignore
import AsyncLock from "async-lock";
import VerifySealWindow, {
  VerifySealWindowInterface,
} from "./components/VerifySealWindow";
import Finder, { FinderInterface } from "./components/Finder";
import GetKeyword from "./components/GetKeyword";



const lock = new AsyncLock();

let sealSelectInterface: SealSelectInterface;
let verifySealWindowInterface: VerifySealWindowInterface;
let finderInterface: FinderInterface;

function getSealSelectInterface(app: AppInterface): SealSelectInterface {
  if (!sealSelectInterface) {
    const sealSelectComponent = new SealSelect() as any;
    sealSelectComponent.attach(app.getRootEle() || document.body);
    sealSelectInterface = sealSelectComponent as any;
  }
  return sealSelectInterface;
}

function getFinderInterface(app: AppInterface): FinderInterface {
  if (!finderInterface) {
    const finderComponent = new Finder();
    (finderComponent as any).app = app;
    finderComponent.attach(app.getRootEle() || document.body);
    finderInterface = finderComponent as any;
  }
  return finderInterface;
}

// window.addEventListener("load", async () => {
//   lock.acquire("initSealSelectInterface", (done) => {
//     try {
//       // if (!verifySealWindowInterface) {
//       //   const verifySealWindowComponent = new VerifySealWindow();
//       //   verifySealWindowComponent.attach(document.body);
//       //   verifySealWindowInterface = verifySealWindowComponent as any;
//       // }
//       // sealSelectInterface
//       //   .selectSealQiFen([
//       //     {
//       //       id: 1,
//       //       imgUrl:
//       //         "https://img0.baidu.com/it/u=3205828459,1269096295&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=513",
//       //     } as any,
//       //     {
//       //       id: 2,
//       //       imgUrl:
//       //         "https://img0.baidu.com/it/u=3205828459,1269096295&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=513",
//       //     } as any,
//       //     {
//       //       id: 3,
//       //       imgUrl:
//       //         "https://img0.baidu.com/it/u=3205828459,1269096295&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=513",
//       //     } as any,
//       //   ])
//       //   .then((res) => console.log(res));
//     } finally {
//       done();
//     }
//   });
// });

const fullBtnId = id.createId();

function narrowDisabledHandler(
  this: NodeInfo & {
    update: (nodeInfo: NodeInfo) => void;
  },
  app: AppInterface
) {
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
// let _narrowScaleChange = narrowOrEnlargeScaleChange;
// let _EnlargeScaleChange = narrowOrEnlargeScaleChange;

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
        // const finder = getFinderInterface(app);
        // finder.show();
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
        console.log("jump初始化");
        if (this._toolJump) {
          this._toolJump.dispose();
        }

        this._toolJump = new ToolJump();
        (this._toolJump as any).app = app;
        this._toolJump.attach(parent);
      },
      isShow: supportJumpPage,
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
      html: "&#xe670;",
      needReader: true,
      title: "缩小",
      width: 24,
      className: styles.toolIconBtn,
      isShow: showSupportScale,
      attached(app) {
        const self = this as any;
        if (self._narrowDisabledHandler) {
          app.removeListener("bookmarkChange", self._narrowDisabledHandler);
        }
        self._narrowDisabledHandler = narrowDisabledHandler.bind(this);
        app.addListener("bookmarkChange", self._narrowDisabledHandler);

        if (self._narrowScaleChange) {
          app
            .getReader()
            .removeListener("scaleChange", self._narrowScaleChange);
        }
        self._narrowScaleChange = narrowOrEnlargeScaleChange.bind(this);
        app.getReader().addListener("scaleChange", self._narrowScaleChange);
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
        } catch (e) { }
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
      html: "&#xe671;",
      title: "放大",
      width: 24,
      className: styles.toolIconBtn,
      isShow: showSupportScale,
      attached(app) {
        const self = this as any;
        if (self._enlargeDisabledHandle) {
          app.removeListener("bookmarkChange", self._enlargeDisabledHandle);
        }
        self._enlargeDisabledHandle = enlargeDisabledHandle.bind(this);
        app.addListener("bookmarkChange", self._enlargeDisabledHandle);

        if (self._EnlargeScaleChange) {
          app
            .getReader()
            .removeListener("scaleChange", self._EnlargeScaleChange);
        }
        self._EnlargeScaleChange = narrowOrEnlargeScaleChange.bind(this);
        app.getReader().addListener("scaleChange", self._EnlargeScaleChange);
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
        } catch (e) { }
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
      isShow(app) {
        const pagesConfig = app.currentBookmark().parserWrapperInfo.parserInfo
          .support.pages;
        return pagesConfig && pagesConfig.find;
      },
      click(app) {
        const finder = getFinderInterface(app);
        finder.show();
      },
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
  sealDragAdd: {
    type: "default",
    needReader: true,
    nodeInfo: {
      html: "&#xe610;",
      title: "手工签章",
      text: "手工签章",
      isShow(app) {
        const sealSupport = app.currentBookmark().parserWrapperInfo.parserInfo
          .support.seal;
        if (
          !sealSupport ||
          !sealSupport.sealList ||
          !sealSupport.positionSeal
        ) {
          return false;
        }
        return true;
      },
      async click(app, event) {
        const currentBookmark = app.currentBookmark();
        if (!currentBookmark || !currentBookmark.id) {
          return;
        }
        try {
          const sealListResult = await currentBookmark.parserWrapperInfo.parserInterface.sealList();
          if (!sealListResult) {
            return;
          }
          const pwd = sealListResult.password;
          const sealList = sealListResult.sealList;
          app.loading.hide();
          const res = await getSealSelectInterface(app).selectSeal(sealList);
          if (res.cancel) {
            return;
          }
          const dragRes = await currentBookmark.parserWrapperInfo.parserInterface.sealDrag(
            res.sealInfo
          );
          if (!dragRes || dragRes.length === 0) {
            app.message.success("签章操作已取消!", { timeout: 3000 });
            return;
          }
          app.loading.show("正在签署印章...");
          const sealPositionList: SealPositionInfo[] = dragRes.map((res) => {
            return {
              x: res.x,
              y: res.y,
              pageNo: res.pageNo,
            };
          });
          await currentBookmark.parserWrapperInfo.parserInterface.signSealPositionList(
            res.sealInfo,
            pwd,
            ...sealPositionList
          );
          app.message.success("手动签章成功");
        } catch (e) {
          app.message.error(e.message || e);
        } finally {
          app.loading.hide();
        }
      },
    },
  } as ToolInfo,
  sealPagesDragAdd: {
    type: "default",
    needReader: true,
    nodeInfo: {
      html: "&#xe677;",
      title: "多页签章",
      text: "多页签章",
      isShow(app) {
        const sealSupport = app.currentBookmark().parserWrapperInfo.parserInfo
          .support.seal;
        if (
          !sealSupport ||
          !sealSupport.sealList ||
          !sealSupport.positionSeal
        ) {
          return false;
        }
        return true;
      },
      async click(app, event) {
        const currentBookmark = app.currentBookmark();
        if (!currentBookmark || !currentBookmark.id) {
          return;
        }

        try {
          const sealListResult = await currentBookmark.parserWrapperInfo.parserInterface.sealList();
          if (!sealListResult) {
            return;
          }
          const pwd = sealListResult.password;
          const sealList = sealListResult.sealList;
          app.loading.hide();
          const res = await getSealSelectInterface(app).selectSealMultipage(
            sealList
          );
          if (res.cancel) {
            return;
          }

          const dragRes = await currentBookmark.parserWrapperInfo.parserInterface.sealDrag(
            res.sealInfo,
            {
              pageNo: res.customPageNos,
              mode: "multipage",
              allowManualPosition: res.manual,
            }
          );
          app.loading.show("正在签署印章...");
          const sealPositionList: SealPositionInfo[] = dragRes.map((res) => {
            return {
              x: res.x,
              y: res.y,
              pageNo: res.pageNo,
            };
          });
          await currentBookmark.parserWrapperInfo.parserInterface.signSealPositionList(
            res.sealInfo,
            pwd,
            ...sealPositionList
          );
          app.message.success("多页签章成功!");
        } catch (e) {
          app.message.error(e.message || e);
        } finally {
          app.loading.hide();
        }
      },
    },
  } as ToolInfo,
  sealKeyword: {
    type: 'default',
    needReader: true,
    nodeInfo: {
      html: "&#xe610;",
      title: "关键字签章",
      text: "关键字签章",
      width: 60,
      isShow(app) {
        const sealSupport = app.currentBookmark().parserWrapperInfo.parserInfo
          .support.seal;
        if (
          !sealSupport ||
          !sealSupport.sealList ||
          !sealSupport.positionSeal ||
          !sealSupport.keywordSeal
        ) {
          return false;
        }
        return true;
      },
      async click(app, event) {
        const currentBookmark = app.currentBookmark();
        if (!currentBookmark || !currentBookmark.id) {
          return;
        }

        try {
          const sealListResult = await currentBookmark.parserWrapperInfo.parserInterface.sealList();
          if (!sealListResult) {
            return;
          }
          const pwd = sealListResult.password;
          const sealList = sealListResult.sealList;
          app.loading.hide();
          const res = await getSealSelectInterface(app).selectSeal(
            sealList
          );
          if (res.cancel) {
            return;
          }

          const keywordRsp = await GetKeyword(app.getRootEle());
          const { opt, keyword } = keywordRsp;
          if (opt === 'cancel') {
            return;
          }

          app.loading.show("正在签署印章...");
          await currentBookmark.parserWrapperInfo.parserInterface.signSealKeyword(res.sealInfo.id, pwd, keyword);

          app.message.success("关键字签章成功!");
        } catch (e) {
          app.message.error(e.message || e);
        } finally {
          app.loading.hide();
        }
      }
    }
  } as ToolInfo,
  rotation: {
    type: "default",
    needReader: true,
    nodeInfo: {
      html: "&#xe667;",
      title: "顺时针旋转",
      className: styles.toolIconBtn,
      width: 24,
      isShow(app) {
        return app.currentBookmark().parserWrapperInfo.parserInfo.support
          .rotation;
      },
      click(app) {
        const currentBookmark = app.currentBookmark();
        if (
          !currentBookmark ||
          !currentBookmark.id ||
          !currentBookmark.parserWrapperInfo.parserInfo.support.rotation
        ) {
          return;
        }
        const rotation =
          currentBookmark.parserWrapperInfo.parserInterface.getRotation() + 90;
        currentBookmark.parserWrapperInfo.parserInterface.setRotation(rotation);
      },
    },
  } as ToolInfo,
  anticlockwiseRotation: {
    type: "default",
    needReader: true,
    nodeInfo: {
      html: "&#xe669;",
      title: "逆时针旋转",
      className: styles.toolIconBtn,
      width: 24,
      isShow(app) {
        return app.currentBookmark().parserWrapperInfo.parserInfo.support
          .rotation;
      },
      click(app) {
        const currentBookmark = app.currentBookmark();
        if (
          !currentBookmark ||
          !currentBookmark.id ||
          !currentBookmark.parserWrapperInfo.parserInfo.support.rotation
        ) {
          return;
        }
        const rotation =
          currentBookmark.parserWrapperInfo.parserInterface.getRotation() - 90;
        currentBookmark.parserWrapperInfo.parserInterface.setRotation(rotation);
      },
    },
  } as ToolInfo,
  jumpToHead: {
    type: "default",
    needReader: true,
    nodeInfo: {
      html: "&#xe719;",
      title: "跳转到首页",
      className: styles.toolIconBtn,
      width: 24,
      attached: jumpBtnGroupCheckAttached,
      isShow: supportJumpPage,
      click(app) {
        if (this.className.includes(" " + styles.disabled)) {
          return;
        }
        const currentBookmark = app.currentBookmark();
        if (!currentBookmark || !currentBookmark.id) {
          return;
        }
        if (!this.className.includes(" " + styles.disabled)) {
          this.className += " " + styles.disabled;
          this.update();
        }
        currentBookmark.parserWrapperInfo.parserInterface.jumpTo(1);
      },
    },
  } as ToolInfo,
  jumpToPrev: {
    type: "default",
    needReader: true,
    nodeInfo: {
      html: "&#xe615;",
      title: "上一页",
      className: styles.toolIconBtn,
      width: 24,
      attached: jumpBtnGroupCheckAttached,
      isShow: supportJumpPage,
      click(app) {
        if (this.className.includes(" " + styles.disabled)) {
          return;
        }
        const currentBookmark = app.currentBookmark();
        if (!currentBookmark || !currentBookmark.id) {
          return;
        }

        const nowPageNo =
          currentBookmark.parserWrapperInfo.parserInterface.nowPageNo() - 1;
        if (nowPageNo <= 1 && this.className.includes(" " + styles.disabled)) {
          this.className += " " + styles.disabled;
          this.update();
        }

        if (nowPageNo >= 1) {
          currentBookmark.parserWrapperInfo.parserInterface.jumpTo(nowPageNo);
        }
      },
    },
  } as ToolInfo,
  jumpToNext: {
    type: "default",
    needReader: true,
    nodeInfo: {
      html: "&#xe718;",
      title: "下一页",
      className: styles.toolIconBtn,
      width: 24,
      attached: jumpBtnGroupCheckAttached,
      isShow: supportJumpPage,
      click(app, event) {
        if (this.className.includes(" " + styles.disabled)) {
          return;
        }
        const currentBookmark = app.currentBookmark();
        if (!currentBookmark || !currentBookmark.id) {
          return;
        }

        const nowPageNo =
          currentBookmark.parserWrapperInfo.parserInterface.nowPageNo() + 1;
        const numPages = currentBookmark.parserWrapperInfo.parserInterface.getNumPages();
        if (
          nowPageNo >= numPages &&
          this.className.includes(" " + styles.disabled)
        ) {
          this.className += " " + styles.disabled;
          this.update();
        }
        if (nowPageNo <= numPages) {
          currentBookmark.parserWrapperInfo.parserInterface.jumpTo(nowPageNo);
        }
      },
    },
  } as ToolInfo,
  jumpToEnd: {
    type: "default",
    needReader: true,
    nodeInfo: {
      html: "&#xe690;",
      title: "跳转到尾页",
      className: styles.toolIconBtn,
      width: 24,
      attached: jumpBtnGroupCheckAttached,
      isShow: supportJumpPage,
      click(app) {
        if (this.className.includes(" " + styles.disabled)) {
          return;
        }
        const currentBookmark = app.currentBookmark();
        if (!currentBookmark || !currentBookmark.id) {
          return;
        }

        const numPages = currentBookmark.parserWrapperInfo.parserInterface.getNumPages();
        if (!this.className.includes(" " + styles.disabled)) {
          this.className += " " + styles.disabled;
          this.update();
        }
        currentBookmark.parserWrapperInfo.parserInterface.jumpTo(numPages);
      },
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
        // headerTabsBtns.preferenc,
      ],
    } as ToolbarConfig,
    tools: {
      text: "工具",
      tools: [{ ...headerTabsBtns.find }],
    } as ToolbarConfig,
    view: {
      text: "视图",
      tools: [
        cloneDeep(headerTabsBtns.ActualSize),
        cloneDeep(headerTabsBtns.SuitableWidth),
        cloneDeep(headerTabsBtns.SuitablePage),
        cloneDeep(headerTabsBtns.full),
      ],
    } as ToolbarConfig,
    reader: {
      text: "阅读",
      tools: [
        cloneDeep(headerTabsBtns.narrow),
        cloneDeep(headerTabsBtns.enlarge),
        headerTabsBtns.rotation,
        headerTabsBtns.anticlockwiseRotation,
        headerTabsBtns.jumpToHead,
        headerTabsBtns.jumpToPrev,
        headerTabsBtns.jumpToNext,
        headerTabsBtns.jumpToEnd,
      ],
    } as ToolbarConfig,
    safety: {
      text: "安全",
      tools: [headerTabsBtns.sealDragAdd, headerTabsBtns.sealPagesDragAdd, headerTabsBtns.sealKeyword],
    } as ToolbarConfig,
    help: {
      text: "帮助",
    } as ToolbarConfig,
  },
  sildebarLeftTabs: {
    outline: {
      text: "书签",
      iconHtml: "&#xe67b;",
      // iconHtml: "&#xe64f;",
      disabled: slidebarLeftToolbarDisabled,
      renderChildren(app, dom) {
        const currentBookmark = app.currentBookmark();
        if (!currentBookmark || !currentBookmark.id) {
          dom.innerHTML = "";
          return;
        }
        dom.style.padding = "30px 9px 0 9px";
        currentBookmark.parserWrapperInfo.parserInterface.renderOutline(dom);
      },
    } as ToolbarConfig,
    sign: {
      text: "签章",
      iconHtml: "&#xe64f;",
      disabled: slidebarLeftToolbarDisabled,
    } as ToolbarConfig,
    comment: {
      text: "注释",
      iconHtml: "&#xe650;",
      disabled: slidebarLeftToolbarDisabled,
      renderChildren(app, dom) {
        const currentBookmark = app.currentBookmark();
        if (!currentBookmark || !currentBookmark.id) {
          dom.innerHTML = "";
          return;
        }
        dom.style.paddingTop = "27px";
        currentBookmark.parserWrapperInfo.parserInterface.renderAnnotations(
          dom
        );
      },
    } as ToolbarConfig,
    thumbnail: {
      text: "缩图",
      iconHtml: "&#xe651;",
      disabled: slidebarLeftToolbarDisabled,
      renderChildren(app, dom) {
        const currentBookmark = app.currentBookmark();
        if (!currentBookmark || !currentBookmark.id) {
          dom.innerHTML = "";
          return;
        }
        dom.style.paddingTop = "27px";
        currentBookmark.parserWrapperInfo.parserInterface.renderThumbnail(dom, {
          width: 106,
        });
      },
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
