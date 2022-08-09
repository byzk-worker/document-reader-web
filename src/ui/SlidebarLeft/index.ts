import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import { Diasble, ToolbarConfig, ToolInfo } from "../../types";
import { app, dom, ie } from "../../utils";

interface SlidebarLeftProps {}
interface SlidebarLeftStates {
  expand: boolean;
  activeKey: number;
  openName: string;
  pannelDragWidth: number;
  appSize: {
    minWidth: number;
    minHeight: number;
  };
  toolbarChildrenRenderErrors: {
    error: boolean;
    msg: string;
  }[];
}

export interface SlidebarLeftInterface {}
type DataType = SlidebarLeftProps & SlidebarLeftStates;
type SlidebarLeftComponent = Component<DataType> & {
  dragX: number;
  maxDragWidth: number;
  events: {
    drageMove(event: MouseEvent): void;
    drageUp(event: MouseEvent): void;
  };
};
export default defineComponent<DataType>({
  components: {},
  template: templateParser(html)({ styles }),
  initData() {
    return {
      expand: false,
      pannelDragWidth: 0,
      dragX: 0,
      openName: "",
    };
  },
  attached(this: SlidebarLeftComponent) {
    this.events.drageMove = this.events.drageMove.bind(this);
    this.events.drageUp = this.events.drageUp.bind(this);
  },
  computed: {
    slideWrapperIeStyle() {
      const isLessThan9 = ie.lessThan(9);
      if (!isLessThan9) {
        return;
      }

      const activeKey = this.data.get("activeKey");
      if (typeof activeKey !== "number") {
        return;
      }

      let width = 40 + 16;
      const expand = this.data.get("expand");
      if (expand) {
        width = 40 + 160;
      }
      return "width: " + width + "px;";
    },
    tabPanelWidth() {
      const expand = this.data.get("expand");
      if (!expand) {
        return 0;
      }

      const appSize = this.data.get("appSize");
      const maxWidth = appSize.minWidth / 2 - 40;

      const width = this.data.get("pannelDragWidth");
      if (width < 0) {
        return 160;
      }
      let targetWidth = 160 + width;
      if (targetWidth > maxWidth) {
        targetWidth = maxWidth;
      }
      return targetWidth;
    },
  },
  events: {
    drageUp(this: SlidebarLeftComponent, event: MouseEvent) {
      this.dragX = 0;
      dom.eventUtil.removeHandler(window, "mousemove", this.events.drageMove);
      dom.eventUtil.removeHandler(window, "mouseup", this.events.drageUp);
      const pannelWrapperEle = (this.ref(
        "ref-pannelWrapper"
      ) as any) as HTMLDivElement;
      if (!pannelWrapperEle) {
        return;
      }
      pannelWrapperEle.style.transition = "";
    },
    drageMove(this: SlidebarLeftComponent, event: MouseEvent) {
      const pannelWrapperEle = (this.ref(
        "ref-pannelWrapper"
      ) as any) as HTMLDivElement;
      if (!pannelWrapperEle) {
        return;
      }
      const appSize = this.data.get("appSize");
      const maxWidth = appSize.minWidth / 2;
      const moveX = event.x - this.dragX;
      this.dragX = event.x;

      const width = parseInt(pannelWrapperEle.style.width || "160");
      let targetWidth = width + moveX;
      if (targetWidth < 160) {
        targetWidth = 160;
      } else if (targetWidth > maxWidth) {
        targetWidth = maxWidth;
      }
      pannelWrapperEle.style.width = targetWidth + "px";
    },
    drageDown(this: SlidebarLeftComponent, event: MouseEvent) {
      const pannelWrapperEle = (this.ref(
        "ref-pannelWrapper"
      ) as any) as HTMLDivElement;
      if (!pannelWrapperEle) {
        return;
      }
      pannelWrapperEle.style.transition = "unset";
      this.dragX = event.x;
      dom.eventUtil.removeHandler(window, "mousemove", this.events.drageMove);
      dom.eventUtil.removeHandler(window, "mouseup", this.events.drageUp);

      dom.eventUtil.addHandler(window, "mousemove", this.events.drageMove);
      dom.eventUtil.addHandler(window, "mouseup", this.events.drageUp);
    },
    tabClick(
      this: SlidebarLeftComponent,
      event: MouseEvent,
      key: number,
      toolbar: ToolbarConfig,
      disabled: string
    ) {
      if (disabled) {
        return;
      }
      this.data.set("openName", toolbar.text);
      const nowActiveKey = this.data.get("activeKey");
      this.data.set("activeKey", key);
      if (nowActiveKey !== key) {
        this.data.set("expand", true);
      }
    },
    expandChange(this: SlidebarLeftComponent) {
      this.data.set("expand", !this.data.get("expand"));
    },
  },
  fns: {
    handleToolbarRender(
      this: SlidebarLeftComponent,
      toolbarInfo: ToolbarConfig,
      index: number,
      id: string
    ) {
      if (!toolbarInfo._renderChildrenId) {
        return;
      }

      const pannelContentEle = (this.ref(
        "ref-pannelContent-" + index
      ) as any) as HTMLDivElement;
      if (!pannelContentEle) {
        return;
      }

      const appInterface = app.getAppBySanComponent(this);
      try {
        const res = dom.nodeEventCall(
          appInterface,
          toolbarInfo._renderChildrenId,
          appInterface,
          pannelContentEle
        ) as any;
        if (res instanceof Promise) {
          res
            .then(() => {
              this.data.set(`toolbarChildrenRenderErrors[${index}]`, {
                error: false,
                msg: "",
              });
            })
            .catch((err) => {
              this.data.set(`toolbarChildrenRenderErrors[${index}]`, {
                error: true,
                msg: err.message || err,
              });
            });
        } else {
          this.data.set(`toolbarChildrenRenderErrors[${index}]`, {
            error: false,
            msg: "",
          });
        }
      } catch (e) {
        this.data.set(`toolbarChildrenRenderErrors[${index}]`, {
          error: true,
          msg: e.message || e,
        });
        return;
      }
    },
    handleNodeRender(
      this: SlidebarLeftComponent,
      toolInfo: ToolInfo,
      index: number
    ) {
      const toolEle = (this.ref("ref-tool-" + index) as any) as HTMLDivElement;
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
    disabled(this: SlidebarLeftComponent, disabled: Diasble) {
      if (typeof disabled === "boolean") {
        return disabled ? styles.disabled : "";
      } else if (typeof disabled !== "string") {
        return "";
      }

      const appInterface = app.getApp(this.data.get("appId"));

      const datas = app.getAppDataStore(this.data.get("appId"));
      const fn = datas.get(disabled) as any;
      return fn(appInterface) ? styles.disabled : "";
    },
    showTab(this: SlidebarLeftComponent, toolbar: ToolbarConfig) {
      if (!toolbar.needLoadFileOK) {
        return true;
      }

      const appInterface = app.getApp(this.data.get("appId"));
      if (!appInterface) {
        return false;
      }

      const currentBookmark = appInterface.currentBookmark();
      if (
        !currentBookmark ||
        !currentBookmark.parserWrapperInfo ||
        !currentBookmark.parserWrapperInfo.parserInterface
      ) {
        return false;
      }

      return true;
    },
  },
});
