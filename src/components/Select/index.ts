import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import Options, { OptionInfo, OptionsInterface } from "../Options";
import InputNumber from "../InputNumber";

// <c-options s-ref="optionsRef" mod="options" show="{= showOptions =}" activeVal={{activeVal}} options="{{options}}"></c-options>

interface SelectProps {
  options: OptionInfo[];
  activeVal?: any;
  suffix?: string;
  isNumber?: number;
  optionsStyle?: string;
  "on-change"?: (val: any) => void;
}
interface SelectStates {
  showOptions: boolean;
  top: number;
  bottom: number;
}
type DataType = SelectProps & SelectStates;
type SelectComponent = Component<DataType> & {
  OptionsComponent: Component & OptionsInterface;
};
export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  components: {
    "input-number": InputNumber,
  },
  attached(this: SelectComponent) {
    // const optionsInterface = (this.ref(
    //   "optionsRef"
    // ) as any) as OptionsInterface;
    // optionsInterface.setBaseEle(this.el as any);
    console.log("初始化...");
    if (!this.OptionsComponent) {
      this.OptionsComponent = new Options({
        owner: this,
        source: `<c-options style={{optionsStyle}} on-optionClick="events.optionsClick($event)" s-ref="optionsRef" offset={{{y:2}}} mod="options" show="{= showOptions =}" activeVal="{= activeVal =}" options="{{options}}"></c-options>`,
      }) as any;
      this.OptionsComponent.attach(document.body);
    }
    this.OptionsComponent.setBaseEle(this.el as any);
  },
  initData() {
    return {
      showOptions: false,
      activeVal: 1,
      options: [],
      suffix: "&#xe71d;",
    };
  },
  computed: {
    activeText(this: SelectComponent) {
      const activeVal = this.data.get("activeVal");
      const options = this.data.get("options") || [];
      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (option.val === activeVal) {
          return option.text;
        }
      }
      return "";
    },
  },
  events: {
    selectClick(this: SelectComponent, event: MouseEvent) {
      this.data.set("showOptions", true);
    },
    optionsClick(this: SelectComponent, val: { val: any; text: string }) {
      this.fire("change", val.val);
    },
    inputChange(this: SelectComponent, val: any) {
      this.fire("change", val);
    },
  },
});
