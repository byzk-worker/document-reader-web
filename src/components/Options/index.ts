import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import { app, dom, id } from "../../utils";

export interface OptionInfo {
  val: any;
  text: string;
}

const eventMap: { [key: string]: any } = {};

export interface OptionsProps {
  options: OptionInfo[];
  activeVal?: string;
  mod?: "contextmenu" | "options";
  x?: number;
  y?: number;
  offset?: {
    x?: number;
    y?: number;
  };
  // optionClick?: (
  //   event: MouseEvent,
  //   val: string,
  //   optionInfo: OptionInfo
  // ) => void;
}
interface OptionsStates {
  show: boolean;
  baseEleKey: string;
}
type DataType = OptionsProps & OptionsStates;
export interface OptionsInterface {
  setBaseEle(ele: HTMLElement | undefined): void;
  getBaseEle(): HTMLElement | undefined;
}
type OptionsComponent = Component<DataType> &
  OptionsInterface & {
    events: {
      documentClick: () => void;
    };
  };

export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  attached(this: OptionsComponent) {
    const id = (this as any).id;
    eventMap[id] = () => {
      this.events.documentClick.call(this);
    };
    // this.events.documentClick = this.events.documentClick.bind(this);
    dom.eventUtil.addHandler(document as any, "click", eventMap[id]);
    dom.eventUtil.addHandler(window as any, "resize", eventMap[id]);
  },
  detached() {
    const id = (this as any).id;
    dom.eventUtil.removeHandler(document as any, "click", eventMap[id]);
    dom.eventUtil.removeHandler(window as any, "resize", eventMap[id]);
  },
  initData() {
    return {
      options: [],
      show: false,
      top: 0,
      left: 0,
      baseEleKey: id.createId(),
    };
  },
  computed: {
    optionsStyle() {
      const show = this.data.get("show");
      if (!show) {
        return "display: none";
      }

      const mod = this.data.get("mod") || "contextmenu";
      const offset = this.data.get("offset") || {};
      if (typeof offset.x === "undefined") {
        offset.x = 0;
      }

      if (typeof offset.y === "undefined") {
        offset.y = 0;
      }

      let x = this.data.get("x");
      let y = this.data.get("y");
      const isHaveX = typeof x === "number";
      const isHaveY = typeof y === "number";
      switch (mod) {
        case "contextmenu":
          break;
        case "options":
          if (isHaveX && isHaveY) {
            break;
          }

          const datas = app.getAppDataStore(this.data.get("appId"));
          const baseEle = datas.get<HTMLElement>(this.data.get("baseEleKey"));
          const rect = dom.getBoundingClientRect(baseEle);
          if (!isHaveX) {
            x = rect.x + offset.x;
          }

          if (!isHaveY) {
            y = rect.y + rect.height + offset.y;
          }

          break;
        default:
          return "display: none";
      }

      return `left:${x}px;top:${y}px;`;
    },
  },
  events: {
    documentClick(this: OptionsComponent) {
      this.data.set("show", false);
    },
    optionClick(this: OptionsComponent, event: MouseEvent, option: OptionInfo) {
      // const optionsClickFn = this.data.get("optionClick");
      // if (optionsClickFn) {
      //   optionsClickFn(event, option.val, option);
      //   return;
      // }
      this.data.set("activeVal", option.val);
      this.fire("optionClick", option);
    },
  },
  setBaseEle(this: OptionsComponent, ele: HTMLElement | undefined) {
    const baseEleKey = this.data.get("baseEleKey");
    app
      .getAppDataStore(this.data.get("appId"))
      .set(baseEleKey, ele || document.body);
  },
  getBaseEle(this: OptionsComponent): HTMLElement {
    const baseEleKey = this.data.get("baseEleKey");
    let ele = app
      .getAppDataStore(this.data.get("appId"))
      .get<HTMLElement>(baseEleKey);
    if (!ele) {
      ele = document.body;
      this.setBaseEle(ele);
    }
    return ele;
  },
  disposed(this: OptionsComponent) {
    app
      .getAppDataStore(this.data.get("appId"))
      .remove(this.data.get("baseEleKey"));
    dom.eventUtil.removeHandler(
      document.body || document.getElementsByTagName("body")[0],
      "click",
      this.events.documentClick
    );
    dom.eventUtil.removeHandler(
      window as any,
      "resize",
      this.events.documentClick
    );
  },
});
