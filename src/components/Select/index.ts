import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import Options, { OptionInfo, OptionsInterface } from "../Options";

// <c-options s-ref="optionsRef" mod="options" show="{= showOptions =}" activeVal={{activeVal}} options="{{options}}"></c-options>

interface SelectProps {
  options: OptionInfo[];
  activeVal?: any;
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
  attached(this: SelectComponent) {
    // const optionsInterface = (this.ref(
    //   "optionsRef"
    // ) as any) as OptionsInterface;
    // optionsInterface.setBaseEle(this.el as any);
    if (!this.OptionsComponent) {
      this.OptionsComponent = new Options({
        owner: this,
        source: `<c-options s-ref="optionsRef" offset={{{y:2}}} mod="options" show="{= showOptions =}" activeVal="{= activeVal =}" options="{{options}}"></c-options>`,
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
      // const ele = event.target as HTMLDivElement;
      //   console.log(ele.clientTop);
      //   console.log(ele.offsetTop);
      //   console.log(ele.scrollTop);
      //   console.log(ele.style.top);
      //   console.log("=====================");
      // console.log("clientLeft=", ele.clientLeft);
      // console.log("offsetLeft=", ele.offsetLeft);
      // console.log("scrollLeft=", ele.scrollLeft);
      // console.log("clientWidth", ele.clientWidth);
      // console.log("offsetWidth", ele.offsetWidth);
      // console.log("scrollWidth", ele.scrollWidth);
      // console.log(ele.getBoundingClientRect());
      // console.log(dom.getBoundingClientRect(ele));
    },
  },
});
