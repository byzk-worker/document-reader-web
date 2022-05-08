import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "../../index.module.less";
import InputNumber, {
  InputNumberComponent,
} from "../../../../components/InputNumber";

interface ToolJumpProps {}
interface ToolJumpStates {
  maxValue: number | undefined;
  value: number | string;
}
type DataType = ToolJumpProps & ToolJumpStates;
type ToolJumpComponent = Component<DataType>;
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
  computed: {
    prevDisableClass() {
      const val = this.data.get("value");
      if (val == 1) {
        return styles.disabled;
      }
    },
  },
  events: {
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
