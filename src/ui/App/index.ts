import { defineComponent, Component } from "san";
import { AppOptions } from "../../types";
import { dom } from "../../utils";
import Header from "../Header";
import Reader from "../Reader";
import SlidebarLeft from "../SlidebarLeft";
import SlidebarRight from "../SlidebarRight";

import styles from "./index.module.less";
import TabPages from "./ui/TabPages";

let isFirst = true;

const template = `
<div id="${styles.app}" on-contextmenu="events.contextmenu($event)">
    <div id="${styles.header}" s-ref="header">
        <ui-tabs s-if={{tabPages!==false}} s-bind={{{...(tabPages||{})}}} appId="{{appId}}" ></ui-tabs>
        <ui-header s-if="{{header !== false}}" s-bind={{{...header}}} appId="{{appId}}" ></ui-header>
    </div>
    <div id="${styles.content}" style="height: {{contentHeight}}px">
      <div s-if="{{!sidebars || sidebars.left !== false}}" id="${styles.sidebarLeft}">
        <ui-slide-left appId="{{appId}}" s-bind="{{{...(sidebars.left||{})}}}"></ui-slide-left>
      </div>
      <div  s-if="{{!sidebars || sidebars.right !== false}}" id="${styles.sidebarRight}">
        <ui-slide-right appId="{{appId}}" s-bind="{{{...(sidebars.right||{})}}}"></ui-slide-right>
      </div>
      <div id="${styles.reader}">
        <ui-reader appId="{{appId}}" s-bind="{{{...(sidebars.reader||{})}}}"></ui-reader>
      </div>
    </div>
    <div id="${styles.fotter}" s-ref="fotter"></div>
</div>
`;

type DataType = AppOptions & {
  contentHeight: number;
};

type AppComponent = Component<DataType> & {
  events: {
    contextmenu(event: any): void;
    resize(currentHeight?: number): void;
  };
};

export default defineComponent<DataType>({
  components: {
    "ui-tabs": TabPages,
    "ui-header": Header,
    "ui-slide-left": SlidebarLeft,
    "ui-slide-right": SlidebarRight,
    "ui-reader": Reader,
  },
  template,
  messages: {
    "app::resize"(this: AppComponent) {
      this.events.resize(this.data.get("contentHeight"));
    },
  },
  attached(this: AppComponent) {
    const fn = this.events.resize.bind(this);
    this.events.resize = fn;
    dom.eventUtil.addHandler(window as any, "resize", fn);
    fn();
  },
  initData() {
    return {
      contentHeight: 0,
    };
  },
  events: {
    contextmenu(event: any) {
      dom.eventUtil.stopPropagation(event);
      dom.eventUtil.preventDefault(event);
    },
    resize(this: AppComponent, current?: number) {
      if (!this.ref) {
        return;
      }

      let i = 0;
      const intervalId = setInterval(() => {
        const headerEle = (this.ref("header") as any) as HTMLDivElement;
        const fotterEle = (this.ref("fotter") as any) as HTMLDivElement;
        const root = this.el;
        if (!headerEle || !fotterEle || !root) {
          return;
        }

        const contentHeight =
          root.clientHeight - headerEle.clientHeight - fotterEle.clientHeight;
        const currentContentHeight = this.data.get("contentHeight");
        if (currentContentHeight !== contentHeight) {
          if (typeof current !== "undefined" && isFirst) {
            isFirst = false;
            return;
          }
          this.data.set("contentHeight", contentHeight);
          i = 0;
          return;
        }
        if (i < 10) {
          i++;
          return;
        }
        clearInterval(intervalId);
      }, 5);
    },
  },
});
