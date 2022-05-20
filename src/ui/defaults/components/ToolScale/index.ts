import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "../../index.module.less";
import Select from "../../../../components/Select";
import { OptionInfo } from "../../../../components/Options";

interface ToolScaleProps {}
interface ToolScaleStates {
  activeVal: number;
  options: OptionInfo[];
}
type DataType = ToolScaleProps & ToolScaleStates;
type ToolScaleComponent = Component<DataType>;
export default defineComponent<DataType>({
  components: {
    "c-select": Select,
  },
  template: templateParser(html)({ styles }),
  initData() {
    return {
      activeVal: 100,
      options: [
        {
          val: 20,
          text: "20%",
        },
        {
          val: 50,
          text: "50%",
        },
        {
          val: 100,
          text: "100%",
        },
        {
          val: 200,
          text: "200%",
        },
        {
          val: 400,
          text: "400%",
        },
      ],
    };
  },
});
