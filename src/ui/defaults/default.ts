import { NodeInfo, ToolbarConfig, ToolInfo } from "../../types";
import { dom, id } from "../../utils";
import { Component } from "san";
import styles from "./index.module.less";
import ToolJump from "./components/ToolJump";
import ToolScale from "./components/ToolScale";

const fileInput = dom.createElement("input") as HTMLInputElement;
fileInput.style.display = "none";

function initDom() {
  (document.body || document.getElementsByTagName("body")[0]).appendChild(
    fileInput
  );
  window.removeEventListener("load", initDom);
}

window.addEventListener("load", initDom);

const fullBtnId = id.createId();

const headerTabsBtns = {
  open: {
    type: "default",
    nodeInfo: {
      text: "打开",
      html: "&#xe65e;",
      title: "打开文件",
      async click(app) {
        const fileSuffixList = app.getReader().supportFileSuffix();
        if (fileSuffixList.length === 0) {
          throw new Error("没有可以支持的阅读解析器");
        }

        const accpet = fileSuffixList.join(",");
        fileInput.type = "file";
        fileInput.accept = accpet;
        fileInput.onchange = async (event) => {
          const file = fileInput.files[0];
          fileInput.value = "";
          app.getReader().loadFile({
            name: file.name,
            path: dom.createBlobUrlByFile(file),
          });
          console.log(event);
          console.log("触发...", file.name);
        };
        fileInput.dispatchEvent(new MouseEvent("click"));
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
      render(app, nodeInfo, parent): HTMLElement | Component {
        return new ToolJump({
          owner: parent,
          source: "<tool-jump></-jump>",
        });
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
    },
  } as ToolInfo,
  move: {
    type: "default",
    needReader: true,
    nodeInfo: {
      text: "移动",
      title: "移动",
      html: "&#xe660;",
    },
  } as ToolInfo,
  ActualSize: {
    type: "default",
    needReader: true,
    nodeInfo: {
      text: "实际大小",
      title: "实际大小",
      html: "&#xe661;",
    },
  } as ToolInfo,
  SuitableWidth: {
    type: "default",
    needReader: true,
    nodeInfo: {
      text: "适合宽度",
      title: "适合宽度",
      html: "&#xe662;",
    },
  } as ToolInfo,
  SuitablePage: {
    type: "default",
    needReader: true,
    nodeInfo: {
      text: "适合页面",
      title: "适合页面",
      html: "&#xe663;",
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
      // render(app, nodeInfo, parent): Component {
      //   return new ToolEnlargeComponent({
      //     owner: parent,
      //     source: "<tool-enlarge></tool-enlarge>"
      //   })

      // }
    },
  } as ToolInfo,
  scale: {
    type: "default",
    needReader: true,
    nodeInfo: {
      title: "缩放比率",
      width: 82,
      render(app, nodeInfo, parent): Component {
        return new ToolScale({
          owner: parent,
          source: "<tool-select style='width:80px;'></tool-select>",
        });
      },
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
    },
  } as ToolInfo,
  preferenc: {
    type: "default",
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
    } as ToolbarConfig,
    comment: {
      text: "注释",
      iconHtml: "&#xe650;",
    } as ToolbarConfig,
    thumbnail: {
      text: "缩图",
      iconHtml: "&#xe651;",
    } as ToolbarConfig,
  },
};
