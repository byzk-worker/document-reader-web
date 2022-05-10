import { NodeInfo, ToolbarConfig, ToolInfo } from "../../types";
import { dom, id } from "../../utils";
import { Component } from "san";
import styles from "./index.module.less";
import ToolJump from "./components/ToolJump";
import ToolScale from "./components/ToolScale";

const fullBtnId = id.createId();

const headerTabsBtns = {
  open: {
    type: "default",
    nodeInfo: {
      text: "打开",
      html: "&#xe658;",
      title: "打开文件",
    },
  } as ToolInfo,
  save: {
    type: "default",
    nodeInfo: {
      text: "保存",
      html: "&#xe627;",
      title: "保存",
    },
  } as ToolInfo,
  saveAs: {
    type: "default",
    nodeInfo: {
      text: "另存为",
      html: "&#xe64a;",
      title: "另存为",
    },
  } as ToolInfo,
  print: {
    type: "default",
    nodeInfo: {
      text: "打印",
      html: "&#xe609;",
      title: "打印",
    },
  } as ToolInfo,
  jump: {
    type: "default",
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
    nodeInfo: {
      text: "选择",
      title: "选择",
      html: "&#xe623;",
    },
  } as ToolInfo,
  move: {
    type: "default",
    nodeInfo: {
      text: "移动",
      title: "移动",
      html: "&#xe62d;",
    },
  } as ToolInfo,
  ActualSize: {
    type: "default",
    nodeInfo: {
      text: "实际大小",
      title: "实际大小",
      html: "&#xe636;",
    },
  } as ToolInfo,
  SuitableWidth: {
    type: "default",
    nodeInfo: {
      text: "适合宽度",
      title: "适合宽度",
      html: "&#xe69a;",
    },
  } as ToolInfo,
  SuitablePage: {
    type: "default",
    nodeInfo: {
      text: "适合页面",
      title: "适合页面",
      html: "&#xe693;",
    },
  } as ToolInfo,
  narrow: {
    type: "default",
    nodeInfo: {
      html: "&#xe67b;",
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
    nodeInfo: {
      html: "&#xe65a;",
      title: "放大",
      width: 24,
      className: styles.toolIconBtn,
    },
  } as ToolInfo,
  find: {
    type: "default",
    nodeInfo: {
      html: "&#xe6ac;",
      title: "查找",
      text: "查找",
    },
  } as ToolInfo,
  full: {
    type: "default",
    nodeInfo: {
      html: "&#xe613;",
      title: "全屏",
      text: "全屏",
    },
  } as ToolInfo,
  preferenc: {
    type: "default",
    nodeInfo: {
      html: "&#xe6df;",
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
        { type: "separate" },
        headerTabsBtns.jump,
        headerTabsBtns.select,
        headerTabsBtns.move,
        headerTabsBtns.ActualSize,
        headerTabsBtns.SuitableWidth,
        headerTabsBtns.SuitablePage,
        { type: "separate" },
        headerTabsBtns.scale,
        headerTabsBtns.narrow,
        headerTabsBtns.enlarge,
        { type: "separate" },
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
};
