import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import { dom } from "../../utils";

const allowKeys = [8, 37, 39, 46];

interface InputNumberProps {
  value: string;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
}
export type InputNumberComponent = Component<InputNumberProps> & {
  add(num?: number): void;
  sub(num?: number): void;
  eventHandleLoading?: boolean;
};
export default defineComponent<InputNumberProps>({
  template: templateParser(html)(styles),
  initData() {
    return {
      value: "1",
      defaultValue: 1,
    };
  },
  events: {
    valueKeyDown(this: InputNumberComponent, event: KeyboardEvent) {
      if (
        (event.keyCode < 48 || event.keyCode > 57) &&
        !allowKeys.includes(event.keyCode)
      ) {
        dom.eventUtil.preventDefault(event);
        return;
      }
    },
    valueChange(this: InputNumberComponent, event: KeyboardEvent) {
      dom.eventUtil.stopPropagation(event);
      dom.eventUtil.preventDefault(event);

      const ele = event.target as HTMLInputElement;
      const valStr = ele.value;
      if (valStr === "") {
        return;
      }

      let val = parseInt(valStr);
      if (isNaN(val)) {
        return;
      }

      const minValue = this.data.get("minValue");
      const maxValue = this.data.get("maxValue");
      if (typeof minValue !== "undefined" && val < minValue) {
        val = minValue;
      }

      if (typeof maxValue !== "undefined" && val > maxValue) {
        val = maxValue;
      }
      this.data.set("value", val + "");
      this.fire("change", val);
    },
    valueBlur(this: InputNumberComponent, event: KeyboardEvent) {
      const ele = event.target as HTMLInputElement;
      const valStr = ele.value;
      if (valStr !== "") {
        return;
      }

      this.data.set("value", this.data.get("defaultValue") + "");
    },
  },
  add(this: InputNumberComponent, num = 1) {
    if (this.eventHandleLoading) {
      return;
    }
    this.eventHandleLoading = true;
    try {
      const srcVal = parseInt(this.data.get("value") as any);
      let val = (srcVal || 1) + num;
      const maxVal = parseInt(this.data.get("maxValue") + "");
      if (typeof maxVal !== "undefined" && val > maxVal) {
        val = maxVal;
      }
      if (srcVal === val) {
        return;
      }
      this.data.set("value", val + "");
      this.fire("change", val);
    } finally {
      this.eventHandleLoading = false;
    }
  },
  sub(this: InputNumberComponent, num = 1) {
    if (this.eventHandleLoading) {
      return;
    }
    this.eventHandleLoading = true;
    try {
      const srcVal = parseInt(this.data.get("value") as any);
      let val = (srcVal || 1) - num;
      const minValue = parseInt(this.data.get("minValue") + "");
      if (typeof minValue !== "undefined" && val < minValue) {
        val = minValue;
      }

      if (srcVal === val) {
        return;
      }
      console.log("value => ", val);
      this.data.set("value", val + "");
      this.fire("change", val);
    } finally {
      this.eventHandleLoading = false;
    }
  },
});
