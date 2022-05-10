import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "../../index.module.less";
import Select from "../../../../components/Select";

interface ToolScaleProps {}
interface ToolScaleStates {}
type DataType = ToolScaleProps & ToolScaleStates;
type ToolScaleComponent = Component<DataType>;
export default defineComponent<DataType>({
  components: {
    "c-select": Select,
  },
  template: templateParser(html)({ styles }),
});
