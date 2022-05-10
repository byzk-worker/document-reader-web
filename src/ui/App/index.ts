import { defineComponent, Component } from "san";
import { AppOptions } from "../../types";
import { dom } from "../../utils";
import Header from "../Header";

import styles from "./index.module.less";
import TabPages from "./ui/TabPages";

const template = `
<div id="${styles.app}" on-contextmenu="events.contextmenu($event)">
    <div id="${styles.header}" s-ref="header">
        <ui-tabs s-if={{tabPages!==false}} s-bind={{{...(tabPages||{})}}} appId="{{appId}}" />
        <ui-header s-bind={{{...areas.header}}} appId="{{appId}}" />
    </div>
    <div id="${styles.content}" style="height: {{contentHeight}}px">
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
    resize(): void;
  };
};

export default defineComponent<DataType>({
  components: {
    "ui-tabs": TabPages,
    "ui-header": Header,
  },
  template,
  messages: {
    "app::resize"(this: AppComponent) {
      this.events.resize();
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
    resize(this: AppComponent) {
      if (!this.ref) {
        return;
      }
      const headerEle = (this.ref("header") as any) as HTMLDivElement;
      const fotterEle = (this.ref("fotter") as any) as HTMLDivElement;
      const root = this.el;
      if (!headerEle || !fotterEle || !root) {
        return;
      }

      const contentHeight =
        root.clientHeight - headerEle.clientHeight - fotterEle.clientHeight;
      this.data.set("contentHeight", contentHeight);
    },
  },
});
