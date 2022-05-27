import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import { AppInterface } from "../../../../types";

interface TempReaderContentProps {}
interface TempReaderContentStates {}
export interface TempReaderContentInterface {}
type DataType = TempReaderContentProps & TempReaderContentStates;
type TempReaderContentComponent = Component<DataType> & {
  app: AppInterface;
};
export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  async openFile(this: TempReaderContentComponent) {
    const result = await this.app.getReader().selectFile();
    if (!result) {
      return;
    }
    await result.loadFile();
  },
});
