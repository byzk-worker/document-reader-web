import { Component, defineComponent } from "san";
import styles from "./index.module.less";
import htmlStr from "./index.html";
import { template as templateParser } from "lodash";

export interface VerifySealWindowInterface {}

interface VerifySealWindowProps {}
interface VerifySealWindowStates {}

type DataType = VerifySealWindowProps & VerifySealWindowStates;
type VerifySealWindowComponent = Component<DataType>;

export default defineComponent<DataType>({
  template: templateParser(htmlStr)({ styles }),
});
