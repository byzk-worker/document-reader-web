import classNames from "classnames";
import { defineComponent, Component } from "san";
import { AppBookmarkInfo, TabPagesConfig } from "../../../../types";
import Bookmark from "./components/Bookmark";
const template = `<h-bookmark appShow="{{appShow}}" class="{{classNames}}" style="{{styles}}" btnGroup="{{btnGroup}}" appId="{{appId}}" bookmarks="{{bookmarkInfos.list}}" currentIndex="{{bookmarkInfos.index}}" ></h-bookmark>`;

export interface TabPagesProps extends TabPagesConfig {
  bookmarkInfos: {
    index: number;
    list: AppBookmarkInfo[];
  };
}

export default defineComponent<TabPagesProps>({
  components: {
    "h-bookmark": Bookmark,
  },
  template,
  attached(this: Component) {
    // setTimeout(() => {
    this.dispatch("app::resize", {});
    // }, 300);
  },
  computed: {
    classNames() {
      const className = this.data.get("className");
      if (!className) {
        return undefined;
      }
      return classNames(className);
    },
    styles() {
      let autoHide = this.data.get("autoHide");
      if (typeof autoHide === "undefined") {
        autoHide = "noPage";
      }

      if (!autoHide) {
        return undefined;
      }
      const tabsInfos = (this.data.get("bookmarkInfos") || {
        index: -1,
        list: [],
      }).list;

      if (
        tabsInfos.length === 0 ||
        (tabsInfos.length === 1 && autoHide == "onePage")
      ) {
        return "height: 0";
      }
      return undefined;
    },
  },
});
