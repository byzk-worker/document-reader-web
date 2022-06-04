import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "../../index.module.less";
import Select from "../../../../components/Select";
import { OptionInfo } from "../../../../components/Options";
import { AppBookmarkInfoWithIndex, AppInterface } from "../../../../types";

interface ToolScaleProps {}
interface ToolScaleStates {
  activeVal: number;
  options: OptionInfo[];
}
type DataType = ToolScaleProps & ToolScaleStates;
type ToolScaleComponent = Component<DataType> & {
  app: AppInterface;
  events: {
    bookmarkChange(
      app: AppInterface,
      currentBookmark: AppBookmarkInfoWithIndex
    ): void;
    scalChange(scale: number): void;
  };
};
export default defineComponent<DataType>({
  components: {
    "c-select": Select,
  },
  template: templateParser(html)({ styles }),
  attached(this: ToolScaleComponent) {
    this.events.bookmarkChange = this.events.bookmarkChange.bind(this);
    this.events.scalChange = this.events.scalChange.bind(this);
    this.app.addListener("bookmarkChange", this.events.bookmarkChange);
  },
  disposed(this: ToolScaleComponent) {
    this.app.removeListener("bookmarkChange", this.events.bookmarkChange);
  },
  initData(this: ToolScaleComponent) {
    return {};
  },
  events: {
    scalChange(this: ToolScaleComponent, scale: number) {
      const activeVal = this.data.get("activeVal");
      scale = parseInt(scale * 100 + "");
      if (activeVal === scale) {
        return;
      }
      // const options = this.data.get("options");
      // let optionsVals: number[] = [];
      // for (let i = 0; i < options.length; i++) {
      //   optionsVals.push(options[i].val);
      // }

      // if (optionsVals.includes(scale)) {
      //   this.data.set("activeVal", scale);
      //   return;
      // }

      // optionsVals = optionsVals.sort((a, b) => (a > b ? a : b));
      // for (let i = 0; i < optionsVals.length; i++) {
      //   if (scale < optionsVals[i]) {
      //     this.data.set("activeVal", scale);
      //     return;
      //   }
      // }
      this.data.set("activeVal", scale);
    },
    bookmarkChange(
      this: ToolScaleComponent,
      app: AppInterface,
      currentBookmark: AppBookmarkInfoWithIndex
    ) {
      if (currentBookmark.index === -1) {
        return;
      }
      currentBookmark.parserWrapperInfo.parserInterface.addListener(
        "scaleChange",
        this.events.scalChange
      );
      const scale = currentBookmark.parserWrapperInfo.parserInterface.getScale();
      this.data.set("activeVal", parseInt(scale * 100 + ""));
    },
    valChange(this: ToolScaleComponent, val: number) {
      debugger;
      this.app
        .currentBookmark()
        .parserWrapperInfo.parserInterface.setScale(val / 100);
    },
  },
});
