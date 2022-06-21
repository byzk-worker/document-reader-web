import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "../../index.module.less";
import InputNumber, {
  InputNumberComponent,
} from "../../../../components/InputNumber";
import { AppInterface } from "../../../../types";

interface ToolJumpProps {}
interface ToolJumpStates {
  maxValue: number | undefined;
  value: number | string;
}
type DataType = ToolJumpProps & ToolJumpStates;
type ToolJumpComponent = Component<DataType> & {
  app: AppInterface;
  events: {
    bookmarkChange();
    pageNoChange(pageNo: number);
  };
};
export default defineComponent<DataType>({
  components: {
    "input-number": InputNumber,
  },
  template: templateParser(html)({ styles }),
  initData() {
    return {
      maxValue: undefined,
      value: 1,
    };
  },
  attached(this: ToolJumpComponent) {
    this.events.bookmarkChange = this.events.bookmarkChange.bind(this);
    this.events.pageNoChange = this.events.pageNoChange.bind(this);
    this.app.addListener("bookmarkChange", this.events.bookmarkChange);
  },
  disposed(this: ToolJumpComponent) {
    this.app.removeListener("bookmarkChange", this.events.bookmarkChange);
  },
  computed: {
    prevDisableClass() {
      const val = this.data.get("value");
      if (val == 1) {
        return styles.disabled;
      }
    },
    nextDisableClass() {
      const val = this.data.get("value");
      const maxVal = this.data.get("maxValue");
      if (val >= maxVal) {
        return styles.disabled;
      }
    },
  },
  events: {
    pageNoChange(this: ToolJumpComponent, pageNo: number) {
      this.data.set("value", pageNo);
    },
    bookmarkChange(this: ToolJumpComponent) {
      const currentBookmark = this.app.currentBookmark();
      if (
        !currentBookmark ||
        !currentBookmark.id ||
        !currentBookmark.parserWrapperInfo ||
        !currentBookmark.parserWrapperInfo.parserInterface
      ) {
        this.data.set("maxValue", 1);
        return;
      }
      this.data.set(
        "value",
        currentBookmark.parserWrapperInfo.parserInterface.nowPageNo()
      );
      currentBookmark.parserWrapperInfo.parserInterface.addListener(
        "pageNoChange",
        this.events.pageNoChange
      );
      this.data.set(
        "maxValue",
        currentBookmark.parserWrapperInfo.parserInterface.getNumPages()
      );
    },
    valueChange(this: ToolJumpComponent, val: number) {
      if (val < 1) {
        return;
      }
      if (val > this.data.get("maxValue")) {
        return;
      }
      try {
        this.app
          .currentBookmark()
          .parserWrapperInfo.parserInterface.jumpTo(val);
      } catch (e) {}
    },
    prevOrNextClick(this: ToolJumpComponent, isNext: boolean) {
      const inputNumber = this.ref("input-number") as InputNumberComponent;
      if (isNext) {
        inputNumber.add();
      } else {
        inputNumber.sub();
      }
    },
  },
});
