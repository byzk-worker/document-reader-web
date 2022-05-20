import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";

interface SlidebarRightProps {
  
}
interface SlidebarRightStates {

}
export interface SlidebarRightInterface {
 
}
type DataType = SlidebarRightProps & SlidebarRightStates;
type SlidebarRightComponent = Component<DataType>
export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  
});