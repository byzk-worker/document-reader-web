import { defineComponent, Component } from "san";
import styles from "./index.module.less";
import htmlTemplate from "./index.html";
import { HeaderConfig, NodeInfo, ToolbarConfig } from "../../types";

import { template as templateParser } from "lodash";
import { app, dom } from "../../utils";

type DataType = HeaderConfig & {
  selectTabKey: number;
  expand: boolean;
  appId: string;
};
type HeaderComponent = Component<DataType>;
const template = templateParser(htmlTemplate)({
  styles,
});

export default defineComponent<DataType>({
  template,
  initData() {
    return {
      selectTabKey: 0,
      expand: true,
    };
  },
  updated() {
    setTimeout(() => {
      this.dispatch("app::resize", {});
    }, 500);
  },
  fns: {
    handleNodeInfoWidth(nodeInfo: NodeInfo) {
      if (!nodeInfo || typeof nodeInfo.width === "undefined") {
        return undefined;
      }

      return "width: " + nodeInfo.width + "px";
    },
    handleTabPanelWidth(toolbarConfig: ToolbarConfig) {
      const tools = toolbarConfig.tools;
      if (!tools || tools.length === 0) {
        return undefined;
      }

      let sumWidth = 0;
      for (let i = 0; i < tools.length; i++) {
        const tool = tools[i];
        sumWidth += 30;
        if (tool.type === "separate") {
          sumWidth += 2;
          continue;
        }

        if (!tool.nodeInfo) {
          continue;
        }

        if (typeof tool.nodeInfo.width !== "undefined") {
          sumWidth += tool.nodeInfo.width;
        } else {
          sumWidth += 50;
        }
      }
      return "width: " + sumWidth + "px";
    },
  },
  events: {
    tabClick(this: HeaderComponent, index: number) {
      const selectTabKey = this.data.get("selectTabKey");
      if (index === selectTabKey) {
        return;
      }
      this.data.set("selectTabKey", index);
    },
    tabPanExpandClick(this: HeaderComponent) {
      const expand = this.data.get("expand");
      this.data.set("expand", !expand);
    },
    handleRender(this: HeaderComponent, renderId: string) {
      if (!renderId) {
        return undefined;
      }

      const toolEle = (this.ref(
        "ref-tool-" + renderId
      ) as any) as HTMLDivElement;
      if (!toolEle) {
        return undefined;
      }
      const appId = this.data.get("appId");
      const ele = dom.nodeRender(renderId, app.getApp(appId), this);
      if (ele instanceof HTMLElement) {
        toolEle.innerHTML = "";
        toolEle.appendChild(ele);
      } else {
        ele.attach(toolEle);
      }
    },
  },
});
