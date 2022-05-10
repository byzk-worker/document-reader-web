import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";

function getDataJoinStyle(dataSource: any, name: string, key?: string): string {
  key = key || name;
  const d = dataSource.data.get(name);
  if (typeof d === "undefined") {
    return "";
  }
  return key + ": " + d + "px;";
}

export interface OptionInfo {
  val: any;
  text: string;
}

export interface OptionsProps {
  options: OptionInfo[];
  activeVal?: string;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}
interface OptionsStates {
  show: boolean;
}
type DataType = OptionsProps & OptionsStates;
type OptionsComponent = Component<DataType>;
export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  initData() {
    return {
      options: [],
      show: false,
      top: 0,
      left: 0,
    };
  },
  computed: {
    optionsStyle() {
      const show = this.data.get("show");
      if (!show) {
        return "height: 0";
      }

      let styleStr =
        getDataJoinStyle(this, "left") +
        getDataJoinStyle(this, "right") +
        getDataJoinStyle(this, "top") +
        getDataJoinStyle(this, "bottom");

      return styleStr;
    },
  },
});
