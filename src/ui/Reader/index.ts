import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";

interface RenderProps {
  
}
interface RenderStates {

}
export interface RenderInterface {
 
}
type DataType = RenderProps & RenderStates;
type RenderComponent = Component<DataType>
export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  
});