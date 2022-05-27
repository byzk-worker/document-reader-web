import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import { app } from "../../utils";
import { AppInterface } from "../../types";
import { defaultContentTemp } from "../defaults/default";

interface ReaderProps {
  noOpenFileRender?: string;
}
interface ReaderStates {}
type DataType = ReaderProps & ReaderStates;
type ReaderComponent = Component<DataType> & {
  _tempContentComponent: Component;
  _tempContentHtmlEle: HTMLElement;
  destoryTempContent(): void;
  loadTempContent(): void;
};
export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  attached(this: ReaderComponent) {
    this.loadTempContent();
  },
  disposed(this: ReaderComponent) {
    this.destoryTempContent();
  },
  loadTempContent(this: ReaderComponent) {
    const tempContentEle = (this.ref("tempContent") as any) as HTMLDivElement;
    if (!tempContentEle) {
      return;
    }
    const renderId = this.data.get("noOpenFileRender");
    let renderFn = defaultContentTemp;
    const appInterface = app.getApp(this.data.get("appId"));
    if (renderId) {
      const datas = app.getAppDataStore(this.data.get("appId"));
      const rFn = datas.get(renderId) as any;
      if (rFn) {
        renderFn = rFn;
      }
    }

    this.destoryTempContent();

    const renderEle = renderFn(appInterface, this);
    if (typeof (renderEle as any).attach !== "function") {
      this._tempContentHtmlEle = renderEle as any;
      tempContentEle.innerHTML = "";
      tempContentEle.appendChild(this._tempContentHtmlEle);
    } else {
      this._tempContentComponent = renderEle as any;
      this._tempContentComponent.attach(tempContentEle);
    }
  },
  destoryTempContent(this: ReaderComponent) {
    if (this._tempContentComponent) {
      this._tempContentComponent.dispose();
    }

    if (this._tempContentHtmlEle) {
      this._tempContentHtmlEle.remove();
    }
  },
});
