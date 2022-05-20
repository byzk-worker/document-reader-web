// import * as pdfjsLib from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry.js";
import { Component } from "san/types";
import { FileInfo, ReaderParserInterface, ReaderParserSupport } from "../types";
import { ie } from "../utils";
import ReaderUi, {
  ReaderUiComponent,
  ReaderUiInterface,
} from "./components/ReaderUi";

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export class PdfjsReaderImpl implements ReaderParserInterface {
  private _readerUiInterface: ReaderUiInterface | undefined;
  private _readerUi: ReaderUiComponent | undefined;
  private static _support: ReaderParserSupport = {
    nowBrowser: PdfjsReaderImpl._supportNowBrowser(),
    fileSuffix: [".pdf"],
    isSupportFile(file) {
      return file.name.endsWith(".pdf") && typeof file.path !== "undefined";
    },
  };

  public constructor() {}

  public static support() {
    return PdfjsReaderImpl._support;
  }

  public async loadFile(file: FileInfo): Promise<void> {
    debugger;
    // const document = await pdfjsLib.getDocument(file.path).promise;
    // console.log(document.numPages);
  }

  public attachToSanComponent(paremtComponent: Component<{}>) {
    this._readerUi = new ReaderUi({
      owner: paremtComponent,
      source: "<ui-pdfjs-reader></ui-pdfjs-reader>",
    });
    this._readerUi.attach(paremtComponent.el);
    this._readerUiInterface = this._readerUi as ReaderUiInterface;
  }

  private static _supportNowBrowser(): boolean {
    return !ie.isIe() && typeof ArrayBuffer !== "undefined";
  }
}

export default new PdfjsReaderImpl();
