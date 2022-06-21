import { defineComponent, Component } from "san";
import styles from "./index.module.less";
import htmlTemplate from "./index.html";
import { HeaderConfig, NodeInfo, ToolbarConfig, ToolInfo } from "../../types";

import { template as templateParser } from "lodash";
import { app, dom } from "../../utils";
import {
  headerToolMarginRight,
  headerToolPanelHeight,
} from "../../styles/common";
import ToolBtn from "./components/ToolBtn";

type DataType = HeaderConfig & {
  selectTabKey: number;
  expand: boolean;
  appId: string;
  panelWidthList: number[];
  marginLeft: number;
  tabPanelsWidth: number;
  toolsPanelWidth: number;
  marginEnd: boolean;
};
type HeaderComponent = Component<DataType> & {
  events: { resize(): void };
  fns: {
    showTool(toolInfo: ToolInfo);
  };
};
const template = templateParser(htmlTemplate)({
  styles,
});

export default defineComponent<DataType>({
  template,
  components: {
    "ui-toolbtn": ToolBtn,
  },
  initData() {
    return {
      selectTabKey: 0,
      expand: true,
      panelWidthList: [],
      marginLeft: 0,
      tabPanelsWidth: 0,
      toolsPanelWidth: 0,
      marginEnd: false,
    };
  },
  attached(this: HeaderComponent) {
    this.events.resize = this.events.resize.bind(this);
    dom.eventUtil.addHandler(window as any, "resize", this.events.resize);
    this.events.resize();
  },
  detached(this: HeaderComponent) {
    dom.eventUtil.removeHandler(window as any, "resize", this.events.resize);
  },
  updated(this: HeaderComponent) {
    this.events.resize();
    // setTimeout(() => {
    this.dispatch("app::resize", {});
    // }, 300);
  },
  computed: {
    showControlBreak(this: HeaderComponent) {
      const result: string[] = ["", ""];
      const width = this.data.get("toolsPanelWidth");
      if (width <= 0) {
        return result;
      }

      const pannelsWidth = this.data.get("tabPanelsWidth");
      const marginLeft = this.data.get("marginLeft");
      if (pannelsWidth >= width) {
        return result;
      }

      if (marginLeft > 0) {
        result[0] = "prev";
      }

      if (marginLeft + pannelsWidth < width) {
        result[1] = "next";
      }

      return result;
    },
    handlePanelWidth() {
      const selectTabKey = this.data.get("selectTabKey");
      const toolsConfig = this.data.get(`toolbars[${selectTabKey}]`);
      if (
        !toolsConfig ||
        !toolsConfig.tools ||
        toolsConfig.tools.length === 0
      ) {
        return;
      }

      const tools = toolsConfig.tools;

      let sumWidth = 0;
      for (let i = 0; i < tools.length; i++) {
        const tool = tools[i];
        sumWidth += headerToolMarginRight;
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
          sumWidth += headerToolPanelHeight;
        }
      }

      return sumWidth;
      // return "width: " + sumWidth + "px;";
    },
    handlePanelTools(this: HeaderComponent) {
      const selectTabKey = this.data.get("selectTabKey");
      const toolsConfig = this.data.get(`toolbars[${selectTabKey}]`);
      if (
        !toolsConfig ||
        !toolsConfig.tools ||
        toolsConfig.tools.length === 0
      ) {
        return;
      }

      return toolsConfig.tools;
    },
  },
  fns: {
    showToolBar(this: HeaderComponent, toolbarConfig: ToolbarConfig) {
      if (!toolbarConfig) {
        return false;
      }

      if (!toolbarConfig.tools || toolbarConfig.tools.length === 0) {
        return false;
      }

      let len = 0;
      const showToolFn = this.fns.showTool.bind(this);
      for (let i = 0; i < toolbarConfig.tools.length; i++) {
        const tool = toolbarConfig.tools[i];
        if (showToolFn(tool)) {
          len += 1;
          break;
        }
      }

      return len != 0;
    },
    showTool(this: HeaderComponent, toolInfo: ToolInfo | undefined) {
      if (toolInfo.type !== "separate" && (!toolInfo || !toolInfo.nodeInfo)) {
        return false;
      }

      const appInterface = app.getApp(this.data.get("appId"));
      if (toolInfo.needReader && !appInterface.getReader()?.currentParser()) {
        return false;
      }

      if (toolInfo.nodeInfo?._isShowId) {
        try {
          const appInterface = app.getApp(this.data.get("appId"));
          // return dom.nodeEventCall(
          return dom.nodeEventCallBindThis(
            toolInfo.nodeInfo,
            appInterface,
            toolInfo.nodeInfo._isShowId as any,
            appInterface
          );
          // return toolInfo.nodeInfo.isShow(appInterface);
        } catch (e) {
          return false;
        }
      }

      return true;
    },
    showControlBreakWrapper(
      this: HeaderComponent,
      show: string[],
      isNext: boolean
    ) {
      if (!show || show.length != 2 || (!show[0] && !show[1])) {
        this.data.set("marginLeft", 0);
        return;
      }

      if (show[0] === "prev" && !show[1]) {
        this.data.set("marginEnd", true);
      } else {
        if (this.data.get("marginEnd")) {
          this.data.set("marginEnd", false);
        }
      }

      if (isNext) {
        return show[1] === "next";
      }

      return show[0] === "prev";
    },
    handleNodeInfoWidth(nodeInfo: NodeInfo) {
      if (!nodeInfo || typeof nodeInfo.width === "undefined") {
        return undefined;
      }

      return "width: " + nodeInfo.width + "px";
    },
    settingToolsPanelWidthReturnStyle(this: HeaderComponent, width: number) {
      width = width || 0;
      this.data.set("toolsPanelWidth", width);
      return "width: " + width + "px;";
    },
  },
  events: {
    resize(this: HeaderComponent) {
      if (!this.data.get("appShow")) {
        return;
      }
      const tabPanelsEle = (this.ref("tabPanels") as any) as HTMLElement;
      if (!tabPanelsEle) {
        return;
      }
      const tabPanelsWidth = tabPanelsEle.clientWidth;
      this.data.set("tabPanelsWidth", tabPanelsWidth);
      let marginLeft = this.data.get("marginLeft");
      if (marginLeft === 0) {
        return;
      }
      const toolPanelWidth = this.data.get("toolsPanelWidth");
      let width = toolPanelWidth - marginLeft - tabPanelsWidth;

      const marginEnd = this.data.get("marginEnd");
      if (marginEnd) {
        this.data.set("marginLeft", toolPanelWidth - tabPanelsWidth + 24);
        return;
      }

      if (width < 0) {
        width = -width - 24;
        marginLeft -= width;
        this.data.set("marginLeft", marginLeft);
      }
    },
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
    handleRender(
      this: HeaderComponent,
      toolInfo: ToolInfo,
      i: number,
      index: number
    ) {
      const toolEle = (this.ref(
        "ref-tool-" + i + "-" + index
      ) as any) as HTMLDivElement;
      if (!toolEle || !toolInfo || !toolInfo.nodeInfo) {
        return undefined;
      }

      if (toolInfo.nodeInfo.renderId) {
        dom.nodeRender(
          this,
          toolInfo.nodeInfo.renderId,
          app.getApp(this.data.get("appId")),
          this,
          toolEle
        );
        return undefined;
      } else if (toolInfo.nodeInfo._attachedId) {
        const appInterface = app.getApp(this.data.get("appId"));
        // dom.nodeEventCall(
        dom.nodeEventCallBindThis(
          toolInfo.nodeInfo,
          appInterface,
          toolInfo.nodeInfo._attachedId as any,
          appInterface
        );
      }

      if (
        !toolInfo.nodeInfo.evenIdList ||
        toolInfo.nodeInfo.evenIdList.length === 0
      ) {
        return undefined;
      }

      dom.dispatchDomEvent(
        toolEle,
        toolInfo.nodeInfo.evenIdList,
        this,
        toolInfo.nodeInfo
      );

      return undefined;
    },
    prevAndNextToolClick(this: HeaderComponent, isNext: boolean) {
      if (!this.data.get("appShow")) {
        return;
      }
      const toolsPanelWidth = this.data.get("toolsPanelWidth");
      const tabPanelsWidth = this.data.get("tabPanelsWidth");
      let marginLeft = this.data.get("marginLeft");

      if (isNext) {
        let width = toolsPanelWidth - tabPanelsWidth - marginLeft;
        if (width <= 0) {
          return;
        }

        while (width > tabPanelsWidth) {
          width -= tabPanelsWidth;
        }

        marginLeft += width + 24;
      } else {
        marginLeft -= tabPanelsWidth;
        if (marginLeft <= 0) {
          marginLeft = 0;
        }
      }

      this.data.set("marginLeft", marginLeft);
    },
  },
});
