import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import {
  FileInfo,
  ReaderParserConstructor as ReaderParserClassDeclare,
  ReaderParserInterface,
} from "../../types";
import { PdfjsReaderImpl } from "../../readerParser";
import { app, datas } from "../../utils";

const defaultReaderConstructor: ReaderParserClassDeclare = PdfjsReaderImpl;

interface ReaderProps {}
interface ReaderStates {}
export interface ReaderUiInterface {
  attachParser(service: ReaderParserClassDeclare): void;
  disposeParser(service: ReaderParserClassDeclare): void;
  getParserList(): ReaderParserClassDeclare[];
  currentParser(): ReaderParserInterface | undefined;
  loadFile(file: FileInfo): Promise<void>;
}
type DataType = ReaderProps & ReaderStates;
type ReaderComponent = Component<DataType> &
  ReaderUiInterface & {
    getReaderrServiceId(): string;
    readerServiceIsHave(service: ReaderParserClassDeclare): boolean;
  };
export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  attached(this: ReaderComponent) {
    this.attachParser(defaultReaderConstructor);
  },
  loadFile(this: ReaderComponent, file: FileInfo) {
    const parserList = this.getParserList();
    debugger;
    let currentParser: ReaderParserInterface | undefined;
    for (let i = 0; i < parserList.length; i++) {
      const Parser = parserList[i];
      if (Parser.support().isSupportFile(file)) {
        currentParser = new Parser(app.getApp(this.data.get("appId")));
        break;
      }
    }
    if (!currentParser) {
      throw new Error("没有支持的解析器");
    }
    currentParser.loadFile(file);
  },
  currentParser() {
    return undefined;
  },
  attachParser(this: ReaderComponent, service: ReaderParserClassDeclare) {
    let services = this.getParserList();
    if (this.readerServiceIsHave(service) || !service.support().nowBrowser) {
      return;
    }
    // if (service.attachToSanComponent) {
    //   service.attachToSanComponent(this);
    // } else if (service.attachToEle) {
    //   service.attachToEle(this.el! as any);
    // } else {
    //   throw new Error("组件未实现attachToEle或attachToSanComponent方法");
    // }

    services.push(service);
  },
  disposeParser(this: ReaderComponent, service: ReaderParserClassDeclare) {
    const services = this.getParserList();
    if (!services) {
      return;
    }

    for (let i = 0; i < services.length; i++) {
      if (services[i] === service) {
        services.splice(i, 1);
        return;
      }
    }
  },
  getReaderrServiceId(this: ReaderComponent) {
    return this.data.get("appId") + "_reader";
  },
  getParserList(this: ReaderComponent) {
    let parserList = datas.dataStoreGet(
      this.getReaderrServiceId()
    ) as ReaderParserClassDeclare[];
    if (!parserList) {
      parserList = [];
      datas.dataStoreSet(this.getReaderrServiceId(), parserList);
      this.attachParser(defaultReaderConstructor);
    }
    return parserList;
  },
  readerServiceIsHave(
    this: ReaderComponent,
    service: ReaderParserClassDeclare
  ) {
    const services = this.getParserList();
    for (let i = 0; i < services.length; i++) {
      if (services[i] === service) {
        return true;
      }
    }
    return false;
  },
});
