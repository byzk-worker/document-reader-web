import { defineComponent, Component } from "san";
import { app } from "../../../../../../utils";
import styles from "./index.module.less";
const template = `
    <div on-click="events.tabClick()" class="${styles.tab} {{active?'${styles.active}':''}}">
      <div title="{{name}}" class="${styles.fileName}">
        <sapn>{{name}}</sapn>
      </div>
      <div on-click="events.tabClose()" class="${styles.closeBtn}">
        <span title="关闭" class="iconfont">&#xe600;</span>
      </div>
    </div>
`;
export default defineComponent({
  template,
  events: {
    tabClick(this: Component<{ id: string; appId: string }>) {
      const appInterface = app.getApp(this.data.get("appId"));
      if (!appInterface) {
        return;
      }
      const currentBookmark = appInterface.currentBookmark();
      const bookmarkId = this.data.get("id");
      if (currentBookmark && currentBookmark.id === bookmarkId) {
        return;
      }
      appInterface.convertBookmarkById(bookmarkId);
    },
    tabClose(this: Component<{ id: string; appId: string }>) {
      const appInterface = app.getApp(this.data.get("appId"));
      if (!appInterface) {
        return;
      }
      appInterface.removeBookmarkById(this.data.get("id"));
    },
  },
});
