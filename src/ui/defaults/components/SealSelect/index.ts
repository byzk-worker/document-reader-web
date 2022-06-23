import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import { SealInfo } from "../../../../types";
import {
  mulSelectB64Url,
  mulSlectNoB64Url,
  radioSelectB64Url,
  radioSelectNoB64Url,
} from "./common";
import Select from "../../../../components/Select";
import { OptionInfo } from "../../../../components/Options";
import InputNumber from "../../../../components/InputNumber";

interface SealSelectProps {}
interface SealSelectStates {
  mode: "seal" | "pages" | "qiFeng";
  sealList: SealInfo[];
  maskHideClassName: string;
  activeSeal: SealInfo | undefined;
  selectImg: string;
  selectNoImg: string;
  radioSelectImg: string;
  radioSelectNoImg: string;

  radioSelectStatus: "allPages" | "custom";
  checkboxOk: boolean;

  oddSwitchOption: OptionInfo[];

  customPageInputVal?: string;

  qiFenPageSealMode: "all" | "even" | "odd";
  oneSealInPageNumVal: string;
}
export interface SealSelectInterface {
  selectSeal(
    sealList: SealInfo[]
  ): Promise<{ cancel: boolean; sealInfo: SealInfo }>;
  selectSealMultipage(
    sealList: SealInfo[]
  ): Promise<{
    cancel: boolean;
    sealInfo: SealInfo;
    selectMode: "allPage" | "custom";
    customPageNos?: number[];
    manual: boolean;
  }>;
  selectSealQiFen(
    sealList: SealInfo[]
  ): Promise<{
    cancel: boolean;
    sealInfo: SealInfo;
    modSwitch: "all" | "even" | "odd";
    oneSealInPageNum?: number;
  }>;
}
type DataType = SealSelectProps & SealSelectStates;
type SealSelectComponent = Component<DataType> & {
  _waitResult:
    | { resolve: (data: any) => void; reject: (err: any) => void }
    | undefined;
  _selectSeal(
    sealList: SealInfo[],
    mode?: "seal" | "pages" | "qiFeng"
  ): Promise<any>;
};
export default defineComponent<DataType>({
  components: {
    "ui-select": Select,
    "ui-inputNumber": InputNumber,
  },
  template: templateParser(html)({ styles }),
  initData() {
    return {
      mode: "seal",
      sealList: [],
      customPageInputVal: "",
      maskHideClassName: styles.hide,
      selectImg: mulSelectB64Url,
      selectNoImg: mulSlectNoB64Url,
      radioSelectImg: radioSelectB64Url,
      radioSelectNoImg: radioSelectNoB64Url,
      radioSelectStatus: "allPages",
      checkboxOk: false,
      qiFenPageSealMode: "all",
      oddSwitchOption: [
        { val: "all", text: "所有页面" },
        { val: "odd", text: "奇数页面" },
        { val: "even", text: "偶数页面" },
      ],
    };
  },
  attached() {
    // console.log("初始化成功...");
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
    isQiFenSign() {
      return this.data.get("mode") === "qiFeng";
    },
  },
  _selectSeal(
    this: SealSelectComponent,
    sealList: SealInfo[],
    mode?: "seal" | "pages" | "qiFeng"
  ) {
    mode = mode || "seal";
    if (this.data.get("maskHideClassName") !== styles.hide) {
      throw new Error("选择器被锁定");
    }
    const res = new Promise<any>((resolve, reject) => {
      this._waitResult = { resolve, reject };
    });
    if (mode === "pages") {
      this.data.set("radioSelectStatus", "allPages");
      this.data.set("checkboxOk", false);
      this.data.set("customPageInputVal", "");
    } else if (mode === "qiFeng") {
      this.data.set("qiFenPageSealMode", "all");
      this.data.set("oneSealInPageNumVal", "");
    }
    this.data.set("maskHideClassName", undefined);
    this.data.set("activeSeal", undefined);
    this.data.set("sealList", [...sealList]);
    this.data.set("mode", mode);
    return res;
  },
  selectSeal(this: SealSelectComponent, sealList: SealInfo[]) {
    return this._selectSeal(sealList, "seal");
  },
  selectSealMultipage(this: SealSelectComponent, sealList: SealInfo[]) {
    return this._selectSeal(sealList, "pages");
  },
  selectSealQiFen(this: SealSelectComponent, sealList: SealInfo[]) {
    return this._selectSeal(sealList, "qiFeng");
  },
  events: {
    customPageInputKeyDown(event: KeyboardEvent) {
      const keyCode = event.keyCode;
      const allow =
        (keyCode >= 48 && keyCode <= 57) ||
        keyCode === 189 ||
        keyCode === 186 ||
        keyCode === 8 ||
        keyCode === 46 ||
        (keyCode >= 37 && keyCode <= 40);
      if (!allow) {
        event.preventDefault();
      }
    },
    checkboxChange(this: SealSelectComponent) {
      this.data.set("checkboxOk", !this.data.get("checkboxOk"));
    },
    radioSelectAllPages(
      this: SealSelectComponent,
      active: "allPages" | "custom"
    ) {
      this.data.set("radioSelectStatus", active);
    },
    sealClick(this: SealSelectComponent, sealInfo: SealInfo) {
      this.data.set("activeSeal", sealInfo);
    },
    okClick(this: SealSelectComponent) {
      const activeSeal = this.data.get("activeSeal");
      if (!activeSeal) {
        return;
      }
      const resultData: any = {
        cancel: false,
        sealInfo: activeSeal,
      };
      const mode = this.data.get("mode");
      if (mode === "pages") {
        resultData.manual = this.data.get("checkboxOk");
        const selectMode = this.data.get("radioSelectStatus");
        resultData.selectMode = selectMode;
        if (selectMode === "custom") {
          const customPageInputVal = this.data.get("customPageInputVal");
          if (customPageInputVal) {
            const customPageNoList: number[] = [];
            const valList = customPageInputVal.split(";");
            for (let i = 0; i < valList.length; i++) {
              const val = valList[i];
              const numValStr = val.split("-");
              for (let j = 0; j < numValStr.length; j++) {
                let numVal = parseInt(numValStr[j]);
                if (isNaN(numVal)) {
                  continue;
                }
                if (!customPageNoList.includes(numVal)) {
                  customPageNoList.push(numVal);
                }

                const nexVal = parseInt(numValStr[j + 1]);
                if (!isNaN(nexVal)) {
                  const val = nexVal - numVal;
                  if (val > 1) {
                    for (let k = 1; k <= val; k++) {
                      numVal += 1;
                      if (customPageNoList.includes(numVal)) {
                        continue;
                      }
                      customPageNoList.push(numVal);
                    }
                    continue;
                  }
                }
              }
            }
            resultData.customPageNos = customPageNoList.sort((a, b) => a - b);
          }
        }
      } else if (mode === "qiFeng") {
        resultData.modSwitch = this.data.get("qiFenPageSealMode");
        resultData.oneSealInPageNum = parseInt(
          this.data.get("oneSealInPageNumVal")
        );
      }
      this.data.set("sealList", []);
      this.data.set("maskHideClassName", styles.hide);
      this.data.set("activeSeal", undefined);
      this._waitResult &&
        this._waitResult.resolve &&
        this._waitResult.resolve(resultData);
      this._waitResult = undefined;
    },
    closeClick(this: SealSelectComponent) {
      this.data.set("sealList", []);
      this.data.set("maskHideClassName", styles.hide);
      this.data.set("activeSeal", undefined);
      this._waitResult &&
        this._waitResult.resolve &&
        this._waitResult.resolve({ cancel: true });
      this._waitResult = undefined;
    },
  },
});
