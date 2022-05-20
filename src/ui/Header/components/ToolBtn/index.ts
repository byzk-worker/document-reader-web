import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "../../index.module.less";

interface ToolBtnProps {
  
}
interface ToolBtnStates {

}
export interface ToolBtnInterface {
 
}
type DataType = ToolBtnProps & ToolBtnStates;
type ToolBtnComponent = Component<DataType>
export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  
});