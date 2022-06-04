import { defineComponent, Component } from "san";
import { app, dom } from "../../../../../../utils";
import styles from "./index.module.less";
import { NodeInfo } from "../../../../../../types";

const template = `<div s-ref="btn-wrapper">
    <div s-if="!eleId" s-ref="btn" class="${styles.btn}" title="{{title}}">
        <span class="{{className}}">{{text}}{{(html||"") | raw}}</span>
    </div>
</div>`;

export default defineComponent({
  template,
  attached: function (this: Component & { eventBind: Function }) {
    if (this.ref("btn")) {
      this.eventBind();
    }

    if (!this.el) {
      return;
    }

    const eleId = this.data.get("eleId");
    if (!eleId) {
      return;
    }

    this.el.appendChild(document.getElementById(eleId)!);
  },
  eventBind(this: Component & { eventHandle: Function }) {
    const eventIdList = this.data.get("evenIdList") as string[];
    if (!eventIdList || eventIdList.length === 0) {
      return;
    }
    const btnEle = (this.ref("btn") as any) as HTMLElement;
    dom.dispatchDomEvent(btnEle, eventIdList, this);
  },
  detached(this: Component<NodeInfo>) {
    const dataStore = app.getApp(this.data.get("appId")).getDataStore();
    const eventIdList = this.data.get("evenIdList");
    dom.nodeEventDestroy(dataStore, ...eventIdList);
  },
});
