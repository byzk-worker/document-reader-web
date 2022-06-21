import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import { SealInfo } from "../../../../types";

interface SealSelectProps {}
interface SealSelectStates {
  mode: "seal" | "pages";
  sealList: SealInfo[];
  maskHideClassName: string;
  activeSeal: SealInfo | undefined;
}
export interface SealSelectInterface {
  selectSeal(
    sealList: SealInfo[],
    mode?: "seal" | "pages"
  ): Promise<{ cancel: boolean; sealInfo: SealInfo }>;
}
type DataType = SealSelectProps & SealSelectStates;
type SealSelectComponent = Component<DataType> & {
  _waitResult:
    | { resolve: (data: any) => void; reject: (err: any) => void }
    | undefined;
};
export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  initData() {
    return {
      mode: "seal",
      sealList: [],
      maskHideClassName: styles.hide,
    };
  },
  attached() {
    console.log("初始化成功...");
  },
  computed: {
    disabled() {
      return !this.data.get("activeSeal") ? styles.disabled : "";
    },
    sealSelectStyles() {
      let height = 601;
      const mode = this.data.get("mode");
      if (mode === "seal") {
        height = 360;
      }

      return `height: ${height}px;margin-top: ${-height / 2}px;`;
    },
    titleText() {
      let text = "多页签章";
      const mode = this.data.get("mode");
      if (mode === "seal") {
        text = "印章选择";
      }
      return text;
    },
    isPageSign() {
      return this.data.get("mode") === "pages";
    },
  },
  selectSeal(
    this: SealSelectComponent,
    sealList: SealInfo[],
    mode?: "seal" | "pages"
  ) {
    mode = mode || "seal";
    if (this.data.get("maskHideClassName") !== styles.hide) {
      throw new Error("选择器被锁定");
    }
    const res = new Promise<SealInfo>((resolve, reject) => {
      this._waitResult = { resolve, reject };
    });
    this.data.set("maskHideClassName", undefined);
    this.data.set("activeSeal", undefined);
    this.data.set("sealList", [...sealList]);
    this.data.set("mode", mode);
    return res;
  },
  events: {
    sealClick(this: SealSelectComponent, sealInfo: SealInfo) {
      this.data.set("activeSeal", sealInfo);
    },
    okClick(this: SealSelectComponent) {
      const activeSeal = this.data.get("activeSeal");
      if (!activeSeal) {
        return;
      }
      this.data.set("sealList", []);
      this.data.set("maskHideClassName", styles.hide);
      this.data.set("activeSeal", undefined);
      this._waitResult &&
        this._waitResult.resolve &&
        this._waitResult.resolve({ cancel: false, sealInfo: activeSeal });
    },
    closeClick(this: SealSelectComponent) {
      this.data.set("sealList", []);
      this.data.set("maskHideClassName", styles.hide);
      this.data.set("activeSeal", undefined);
      this._waitResult &&
        this._waitResult.resolve &&
        this._waitResult.resolve({ cancel: true });
    },
  },
});
