import { defineComponent } from "san";
import styles from "./index.module.less";

const template = `
    <div class="${styles.tab}">
      <div title={{name}} class="${styles.fileName}">
        <sapn>{{name}}</sapn>
      </div>
      <div class="${styles.closeBtn}">
        <span title="关闭" class="iconfont">&#xe600;</span>
      </div>
    </div>
`;
export default defineComponent({
  template,
});
