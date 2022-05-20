import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";

interface ReaderUiProps {
  
}
interface ReaderUiStates {

}
export interface ReaderUiInterface {
 
}
type DataType = ReaderUiProps & ReaderUiStates;
export type ReaderUiComponent = Component<DataType>
export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  
});