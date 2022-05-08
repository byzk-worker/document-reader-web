import { defineComponent, DataTypes, Component } from "san";
import styles from "./index.module.less";
import BookmarkTab from "../BookmarkTab";
import TabBtn from "../TabBtn";
import { TabBtnGroupConfig } from "../../../../../../types";
import { TabPagesProps } from "../..";
import { dom } from "../../../../../../utils";

import { template as templateParser } from 'lodash';
import html from "./index.html";

const template = templateParser(html) ({
  styles,
});

export default defineComponent({
  components: {
    "h-tab": BookmarkTab,
    "tab-btn": TabBtn,
  },
  template,
  attached: function (
    this: Component<TabPagesProps> & {
      watchTabGroup(): void;
      events: { resize(): void };
    }
  ) {
    const fn = this.events.resize.bind(this);
    this.events.resize = fn;
    dom.eventUtil.addHandler(window as any, "resize", fn);
    this.watchTabGroup();
  },
  detached(
    this: Component<TabPagesProps> & {
      watchTabGroup(): void;
      events: { resize(): void };
    }
  ) {
    dom.eventUtil.removeHandler(window as any, "resize", this.events.resize);
  },
  events: {
    resize(this: Component<TabPagesProps> & { watchTabGroup(): void }) {
      this.watchTabGroup();
    },
    add(this: Component) {
      this.dispatch("TABS::ADD", {});
    },
  },
  watchTabGroup(this: Component<TabPagesProps>) {
    const tabGroupEle = (this.ref("tab-group") as any) as HTMLElement;
    const tabWrapperEle = (this.ref("tab-wrapper") as any) as HTMLElement;
    const tabWrapperScrollEle = (this.ref(
      "tab-wrapper-scroll"
    ) as any) as HTMLElement;
    if (!tabGroupEle || !tabWrapperEle || !tabWrapperScrollEle) {
      return;
    }

    const tabs = this.data.get("tabsInfo") || [];
    const tabWrapperWidth = tabs.length * (166 + 20);
    tabWrapperEle.style.width = tabWrapperWidth + "px";

    const width = tabGroupEle.clientWidth;
    if (tabWrapperWidth > width) {
      tabWrapperScrollEle.style.width = width - 60 + "px";
    } else {
      tabWrapperScrollEle.style.width = "";
    }
  },
  dataTypes: {
    tabs: DataTypes.arrayOf(
      DataTypes.shape({
        id: DataTypes.string,
        name: DataTypes.string,
      })
    ),
  },
  initData: function () {
    return {
      tabs: [],
    };
  },
  computed: {
    btnGroupWidth() {
      let num = 0;
      const btnGroup = this.data.get("btnGroup") as TabBtnGroupConfig;
      if (
        typeof btnGroup === "boolean" ||
        !btnGroup ||
        !btnGroup.btns ||
        btnGroup.btns.length === 0
      ) {
        return num;
      }

      for (let i = 0; i < btnGroup.btns.length; i++) {
        const width = btnGroup.btns[i].width || 30;
        num += width;
      }

      return num;
    },
  },
});
