import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import { ToolbarConfig } from "../../types";
import { ie } from "../../utils";

interface SlidebarLeftProps {}
interface SlidebarLeftStates {
  expand: boolean;
  activeKey: number;
}

export interface SlidebarLeftInterface {}
type DataType = SlidebarLeftProps & SlidebarLeftStates;
type SlidebarLeftComponent = Component<DataType>;
export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  initData() {
    return {
      expand: false,
    };
  },
  computed: {
    slideWrapperIeStyle() {
      const isLessThan9 = ie.lessThan(9);
      if (!isLessThan9) {
        return;
      }

      const activeKey = this.data.get("activeKey");
      if (typeof activeKey !== "number") {
        return;
      }

      let width = 40 + 16;
      const expand = this.data.get("expand");
      if (expand) {
        width = 40 + 160;
      }
      return "width: " + width + "px;";
    },
  },
  events: {
    tabClick(
      this: SlidebarLeftComponent,
      event: MouseEvent,
      key: number,
      toolbar: ToolbarConfig
    ) {
      const nowActiveKey = this.data.get("activeKey");
      this.data.set("activeKey", key);
      if (nowActiveKey !== key) {
        this.data.set("expand", true);
      }
    },
    expandChange(this: SlidebarLeftComponent) {
      this.data.set("expand", !this.data.get("expand"));
    },
  },
});
