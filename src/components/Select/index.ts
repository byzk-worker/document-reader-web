import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import Options, { OptionInfo } from "../Options";
import { dom } from "../../utils";

interface SelectProps {
  options: OptionInfo[];
  activeVal?: any;
}
interface SelectStates {
  showOoptions: boolean;
  top: number;
  bottom: number;
}
type DataType = SelectProps & SelectStates;
type SelectComponent = Component<DataType>;
export default defineComponent<DataType>({
  components: {
    "c-options": Options,
  },
  template: templateParser(html)({ styles }),
  initData() {
    return {
      showOoptions: false,
      activeVal: 1,
      options: [
        {
          val: 1,
          text: "测试",
        },
        {
          val: 2,
          text: "测试2",
        },
        {
          val: 4,
          text: "测试3",
        },
      ],
    };
  },
  events: {
    selectClick(event: MouseEvent) {
      const ele = event.target as HTMLDivElement;
      //   console.log(ele.clientTop);
      //   console.log(ele.offsetTop);
      //   console.log(ele.scrollTop);
      //   console.log(ele.style.top);
      //   console.log("=====================");
      console.log("clientLeft=", ele.clientLeft);
      console.log("offsetLeft=", ele.offsetLeft);
      console.log("scrollLeft=", ele.scrollLeft);
      console.log("clientWidth", ele.clientWidth);
      console.log("offsetWidth", ele.offsetWidth);
      console.log("scrollWidth", ele.scrollWidth);
      console.log(ele.getBoundingClientRect());
      console.log(dom.getBoundingClientRect(ele));
    },
  },
});
