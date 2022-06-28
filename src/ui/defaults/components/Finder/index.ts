import { Component, defineComponent } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import { getBoundingClientRect } from "../../../../utils/dom";

interface FinderProps {}
interface FinderStates {
  show: boolean;
}
export interface FinderInterface {
  show(): void;
}

type DataType = FinderProps & FinderStates;
type FinderComponent = Component<DataType> & {
  titleDragWidth: number;
  titleDragHeight: number;
  events: {
    titleMouseMove(event: MouseEvent): void;
  };
};

export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  initData() {
    return {
      show: false,
    };
  },
  attached(this: FinderComponent) {
    this.events.titleMouseMove = this.events.titleMouseMove.bind(this);
  },
  show(this: FinderComponent) {
    this.data.set("show", true);
  },
  hide(this: FinderComponent) {
    this.data.set("show", false);
  },
  events: {
    titleMouseDown(this: FinderComponent, event: MouseEvent) {
      const x = event.x;
      const y = event.y;
      const titleEle = (this.ref("ref-title") as any) as HTMLElement;
      const { left, top } = getBoundingClientRect(titleEle);
      this.titleDragWidth = x - left;
      this.titleDragHeight = y - top;
      document.addEventListener("mousemove", this.events.titleMouseMove);
    },
    titleMouseUp(this: FinderComponent) {
      document.removeEventListener("mousemove", this.events.titleMouseMove);
    },
    titleMouseMove(this: FinderComponent, event: MouseEvent) {
      const currentEl = this.el as HTMLElement;

      const { top, left } = getBoundingClientRect(currentEl.parentElement);
      currentEl.style.left = event.x - left - this.titleDragWidth + "px";
      currentEl.style.top = event.y - top - this.titleDragHeight + "px";
    },
  },
});
