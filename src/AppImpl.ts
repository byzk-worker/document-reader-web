import { defineComponent, Component } from "san";

import AppUi from "./ui/App";
import {
  AppInterface,
  AppOptions,
  AppUpdateOptions,
  FileInfo,
  ReaderInterface,
  ToolbarConfig,
  WebFontConfig,
  ReaderParserInfo,
  readerParserSupportDefault,
  ReaderParserConstructor,
  ParserWrapperInfo,
  AppBookmarkInfo,
  AppBookmarkInfoWithIndex,
  SelectFileResult,
  ErrNoSupportFileSuffix,
  ErrFeilSelectWait,
  ErrFileNotParsed,
  ErrLackOfParser,
  NodeInfo,
  NodeInfoThis,
  ReaderParserInterface,
} from "./types";
import { app, dom, id, ie } from "./utils";
import { defaultData } from "./ui/defaults/default";
import { DataStore } from "./dataStore";
import { MessageImpl, MessageInterface } from "./ui/utils/message";
import { Loading, LoadingInterface } from "./ui/utils/loading";

const appEventBookmarkChange = "bookmarkChange";

const fontfaceStyleId = new Date().getTime() + "";

const defaultFontConfig: WebFontConfig = {
  dir: "./",
  eotFile: "icon.eot",
  woffFile: "icon.woff",
  woff2File: "icon.woff2",
  ttfFile: "icon.ttf",
  svgFile: "icon.svg",
};

const defaultOptions: AppUpdateOptions = {
  tabPages: {
    btnGroup: {
      btns: [],
    },
    autoHide: "noPage",
  },
  header: {
    toolbars: [
      defaultData.headerTabs.start,
      defaultData.headerTabs.tools,
      defaultData.headerTabs.view,
      defaultData.headerTabs.reader,
      defaultData.headerTabs.safety,
      defaultData.headerTabs.help,
    ],
  },
  sidebars: {
    left: {
      toolbars: [
        defaultData.sildebarLeftTabs.outline,
        defaultData.sildebarLeftTabs.sign,
        defaultData.sildebarLeftTabs.comment,
        defaultData.sildebarLeftTabs.thumbnail,
      ],
    },
    right: false,
  },
  content: {},
};

interface AppProps {
  appOptions: AppOptions;
  bookmarkInfos: {
    index: number;
    list: AppBookmarkInfo[];
  };
  appId: string;
  show: boolean;
}

const App = defineComponent<AppProps>({
  components: {
    "ui-app": AppUi,
  },
  template: `<ui-app s-ref="ref-app" s-show="show" appShow="{{show}}" style="min-height: {{appOptions.minHeight || 800}}px;min-width: {{appOptions.minWidth || 1280}}px;" s-bind="{{{...appOptions, bookmarkInfos, appSize: {minWidth: appOptions.minWidth || 1280, minHeight: appOptions.minHeight || 800}}}}" appId="{{appId}}" ></<ui-app>`,
  initData: function () {
    return {
      show: false,
      appOptions: {},
    };
  },
  messages: {
    "HTML::ELE::EVENT"(args) {
      const val = args && (args.value as any);
      this.eventMapping(val.id, val.event, val.thisInfo);
    },
    "TABS::ADD"() {
      console.log("标签新增被触发");
    },
    "EVENT::ID::HANDLE"(arg) {
      const val = arg.value as any;
      console.log(val);
    },
  },
});

class ReaderImpl implements ReaderInterface {
  private _eventList = new DataStore();
  private _fileInput: HTMLInputElement;
  private _fileInputLabel: HTMLLabelElement;
  private _fileInputWait:
    | {
        resovle: any;
        reject: any;
      }
    | undefined;

  public constructor(private _app: AppInterface) {
    this._fileInputLabel = dom.createElement("label");
    this._fileInputLabel.style.display = "none";
    (document.body || document.getElementsByTagName("body")[0]).appendChild(
      this._fileInputLabel
    );
    this._fileInputOnChange = this._fileInputOnChange.bind(this);
    this._createFileInput();
    this._windowOnFocus = this._windowOnFocus.bind(this);
  }

  private _parserList: ReaderParserInfo[] = [];
  private _supportFileSuffix: string[] = [];

  private _createFileInput() {
    if (this._fileInput) {
      this._fileInput.remove();
    }
    this._fileInput = dom.createElement("input");
    this._fileInput.style.display = "none";
    this._fileInput.type = "file";
    this._fileInput.id = id.createId();
    dom.eventUtil.once(this._fileInput, "change", this._fileInputOnChange);
    (document.body || document.getElementsByTagName("body")[0]).appendChild(
      this._fileInput
    );

    (this._fileInputLabel as any).for = this._fileInput.id;
  }

  /**
   * 是否已经存在指定的解析器
   * @param parser 解析器
   * @returns 是/否
   */
  private _isHaveParser(parser: ReaderParserConstructor): boolean {
    for (let i = 0; i < this._parserList.length; i++) {
      if (this._parserList[i].Parser === parser) {
        return true;
      }
    }
    return false;
  }

  private _windowOnFocus() {
    setTimeout(() => {
      if (!this._fileInputWait) {
        return;
      }
      const resovle = this._fileInputWait.resovle;
      this._fileInputWait = undefined;
      resovle(undefined);
    }, 1000);
  }

  private _loadFileByFileInfo(this: {
    reader: ReaderInterface;
    fileInfo: FileInfo;
  }) {
    return this.reader.loadFile(this.fileInfo);
  }

  private async _fileInputOnChange() {
    if (!this._fileInputWait) {
      this._fileInput.value = "";
      return;
    }
    const resovle = this._fileInputWait.resovle;
    const reject = this._fileInputWait.reject;
    this._fileInputWait = undefined;

    try {
      const file = (this._fileInput.files || [
        { name: this._fileInput.value } as any,
      ])[0] as File;

      const fileInfo: FileInfo = {
        rawHtmlEle: this._fileInput,
        name: file.name,
      };

      if (file.type) {
        fileInfo.path = dom.createBlobUrlByFile(file);
      }

      const result: SelectFileResult = {
        fileInfo,
        loadFile: this._loadFileByFileInfo.bind({
          reader: this,
          fileInfo,
        }),
      };

      resovle(result);
    } catch (e) {
      reject(e);
    }
    this._createFileInput();
  }

  private _parserInterfaceBindEvent(parser: ReaderParserInterface) {
    const eventMap = this._eventList.all();
    for (let key in eventMap) {
      const eventCallList = eventMap[key] as any[];
      for (let j = 0; j < eventCallList.length; j++) {
        parser.addListener(key as any, eventCallList[j]);
      }
    }
  }

  public addListener(eventName: string, callback: any): any {
    let eventList = this._eventList.get(eventName) as any[];
    if (!eventList) {
      eventList = [];
      this._eventList.set(eventName, eventList);
    }
    eventList.push(callback);
    const bookmarkList = this._app.bookmarkList();
    if (bookmarkList.length === 0) {
      return;
    }

    for (let i = 0; i < bookmarkList.length; i++) {
      bookmarkList[i].parserWrapperInfo.parserInterface.addListener(
        eventName as any,
        callback
      );
    }
  }

  public removeListener(eventName: string, callback: any): any {
    let eventList = this._eventList.get(eventName) as any[];
    if (!eventList) {
      eventList = [];
      this._eventList.set(eventName, eventList);
    }

    for (let i = eventList.length - 1; i >= 0; i--) {
      const event = eventList[i];
      if (callback === event) {
        eventList.splice(i, 1);
      }
    }

    const bookmarkList = this._app.bookmarkList();
    if (bookmarkList.length === 0) {
      return;
    }

    for (let i = 0; i < bookmarkList.length; i++) {
      bookmarkList[i].parserWrapperInfo.parserInterface.removeListener(
        eventName as any,
        callback
      );
    }
  }

  public async selectFile() {
    // const fileSuffixList = this.supportFileSuffix();
    const fileSuffixList = [".pdf"];
    if (fileSuffixList.length === 0) {
      throw ErrNoSupportFileSuffix;
    }

    if (this._fileInputWait) {
      throw ErrFeilSelectWait;
    }

    const result = new Promise<SelectFileResult | undefined>(
      (resovle, reject) => {
        this._fileInputWait = {
          resovle,
          reject,
        };
      }
    );

    const accpet = fileSuffixList.join(",");
    this._fileInput.accept = accpet;
    if (ie.isIe()) {
      this._fileInput.click();
    } else {
      this._fileInput.dispatchEvent(new MouseEvent("click"));
    }

    dom.eventUtil.once(window, "focus", this._windowOnFocus);
    try {
      return await result;
    } finally {
      this._fileInputWait = undefined;
    }
  }

  async loadFile(file: FileInfo): Promise<void> {
    if (this._app.getBookmarkInfoById(file.path)) {
      this._app.convertBookmarkById(file.path);
      return;
    }

    for (let i = 0; i < this._parserList.length; i++) {
      const parserInfo = this._parserList[i];
      if (!parserInfo.support(this._app).isSupportFile(file)) {
        continue;
      }

      let parser = new parserInfo.Parser(this._app);
      await parser.loadFile(file);
      this._parserInterfaceBindEvent(parser);
      this._app.addBookmark({
        id: file.path,
        name: file.name,
        parserWrapperInfo: {
          fileInfo: file,
          parserInfo: {
            support: parserInfo.support(this._app, parser),
            Parser: parserInfo.Parser,
          },
          parserInterface: parser,
        },
      });
      return;
    }
    throw ErrFileNotParsed;
  }

  currentParser(): ParserWrapperInfo {
    return this._app.currentBookmark()?.parserWrapperInfo;
  }
  supportFileSuffix(): string[] {
    return this._supportFileSuffix;
  }

  attach(parserInfo: ReaderParserInfo): void {
    if (!parserInfo) {
      return;
    }

    if (!parserInfo.Parser) {
      throw ErrLackOfParser;
    }

    parserInfo.support =
      parserInfo.support || (() => readerParserSupportDefault);
    const support = parserInfo.support(this._app);
    if (this._isHaveParser(parserInfo.Parser) || !support.nowBrowser) {
      return;
    }

    const fileSuffix = support.fileSuffix;
    for (let i = 0; i < fileSuffix.length; i++) {
      let suffix = fileSuffix[i];
      if (!suffix.startsWith(".")) {
        suffix = "." + suffix;
      }
      if (!this._supportFileSuffix.includes(suffix)) {
        this._supportFileSuffix.push(suffix);
      }
    }
    this._parserList.push(parserInfo);
  }
}

interface AppBookmarkIndexMap {
  [key: string]: number;
}

export class AppImpl implements AppInterface {
  private _appComponent: Component | undefined;
  private _isShow: boolean = false;
  private _fontConfig: WebFontConfig;
  private _appId: string | undefined;
  private _readerInterface: ReaderInterface = new ReaderImpl(this);
  private _bookmarkList: AppBookmarkInfoWithIndex[] = [];
  private _currentBookmarkIndex: number = -1;
  private _currentBookmarkId: string = "";
  private _bookmarkMap: AppBookmarkIndexMap = {};
  private _datastore: DataStore = new DataStore();
  private _messageUtils: MessageInterface = new MessageImpl(this);
  private _loading: LoadingInterface = new Loading(this);

  //#region 私有方法

  public constructor(
    private _attachEle: HTMLElement,
    private _initOptions?: AppOptions
  ) {
    this._fontConfig =
      (this._initOptions && this._initOptions.fontConfig) || defaultFontConfig!;
    if (this._initOptions && this._initOptions.fontConfig) {
      delete this._initOptions.fontConfig;
    }
    if (!document.getElementById(fontfaceStyleId)) {
      this._createFontFaceStyle();
    }
    this._initApp();
  }

  private _pathJoin = (...p: string[]) => {
    for (let i = 0; i < p.length; i++) {
      const v = p[i];
      if (v === "") {
        continue;
      }
      if (v.endsWith("/")) {
        p[i] = v.substring(0, v.length - 1);
      }
    }
    return p.join("/");
  };

  private _createFontFaceStyle = () => {
    const fontConfig = this._fontConfig!;
    if (!fontConfig.dir) {
      fontConfig.dir = defaultFontConfig.dir;
    }

    if (!fontConfig.eotFile) {
      fontConfig.eotFile = defaultFontConfig.eotFile;
    }

    if (!fontConfig.woffFile) {
      fontConfig.woffFile = defaultFontConfig.woffFile;
    }

    if (!fontConfig.woff2File) {
      fontConfig.woff2File = defaultFontConfig.woff2File;
    }

    if (!fontConfig.ttfFile) {
      fontConfig.ttfFile = defaultFontConfig.ttfFile;
    }

    if (!fontConfig.svgFile) {
      fontConfig.svgFile = defaultFontConfig.svgFile;
    }

    const fontConfigDir: string = fontConfig.dir!;
    const eotFilePath = this._pathJoin(fontConfigDir, fontConfig.eotFile!);
    const woffFilePath = this._pathJoin(fontConfigDir, fontConfig.woffFile!);
    const woff2FilePath = this._pathJoin(fontConfigDir, fontConfig.woff2File!);
    const ttfFilePath = this._pathJoin(fontConfigDir, fontConfig.ttfFile!);
    const svgFilePath = this._pathJoin(
      fontConfigDir,
      fontConfig.svgFile + "#iconfont"
    );
    dom.styleInject(
      `@font-face{font-family:'iconfont';src: url("${eotFilePath}");src:url("${eotFilePath}") format("embedded-opentype"),url("${woff2FilePath}") format("woff2"),url("${woffFilePath}") format("woff"),url("${ttfFilePath}") format("truetype"),url('${svgFilePath}') format('svg');}`,
      fontfaceStyleId
    );
  };

  /**
   * 初始化App
   */
  private _initApp = () => {
    this._appId = app.registryApp(this);
    this._appComponent = new App({
      data: {
        appOptions: {} as any,
        bookmarkInfos: {
          index: -1,
          list: [],
        },
        appId: this._appId,
      },
    });
    (this._appComponent as any).eventMapping = (
      id: any,
      event: any,
      thisInfo: any
    ) => {
      dom.nodeEventCallBindThis(thisInfo, this, id, this, event);
    };
    this.update(defaultOptions);
    this.update(this._initOptions!);
    this._appComponent.attach(this._attachEle);
    // this._uiAppInterface = (this._appComponent.ref(
    //   "ref-app"
    // ) as any) as AppUiInterface;
  };

  /**
   * 更新显示
   */
  private _updateShow = () => {
    if (!this._appComponent) {
      return;
    }
    this._appComponent.data.set("show", this._isShow);
  };

  private _handleNodeInfoThisSelectorData(
    app: AppInterface,
    nodeInfoThis: NodeInfoThis,
    nodeInfoList: NodeInfoThis[],
    currentIndex: number
  ) {
    nodeInfoThis.selector = {
      prev() {
        const prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
          return undefined;
        }
        return nodeInfoList[prevIndex];
      },
      next() {
        const nextIndex = currentIndex + 1;
        if (nextIndex > nodeInfoList.length - 1) {
          return undefined;
        }
        return nodeInfoList[nextIndex];
      },
      index() {
        return currentIndex;
      },
      list() {
        return nodeInfoList;
      },
      listSize() {
        return nodeInfoList.length;
      },
      get(index) {
        return nodeInfoList[index];
      },
    };
  }

  private _handleToobarConfigs = (
    toolbarConfigs: ToolbarConfig[],
    expr: string
  ) => {
    const app = this;
    for (let i = 0; i < toolbarConfigs.length; i++) {
      const toolbar = dom.handleToolBarInfo(app, toolbarConfigs[i]);
      // toolbar.disabled = dom.handleDisabled(toolbar.disabled, this._datastore);

      // if (toolbar.activeChange) {
      //   this._datastore.remove(toolbar._activeChangeFnId);
      //   toolbar._activeChangeFnId = id.createId();
      //   this._datastore.set(toolbar._activeChangeFnId, toolbar.activeChange);
      // }

      // if (toolbar.renderChildren) {
      //   this._datastore.remove(toolbar._renderChildrenId);
      //   toolbar._renderChildrenId = id.createId();
      //   this._datastore.set(toolbar._renderChildrenId, toolbar.renderChildren);
      // }

      if (!toolbar.tools || toolbar.tools.length === 0) {
        continue;
      }

      const nodeInfoList = toolbar.tools.map(
        (tool) => tool.nodeInfo as NodeInfoThis
      );
      for (let j = 0; j < toolbar.tools.length; j++) {
        const toolInfo = toolbar.tools[j];
        // toolInfo.disabled = dom.handleDisabled(
        //   toolInfo.disabled,
        //   this._datastore
        // );
        if (!toolInfo.nodeInfo) {
          continue;
        }
        const nodeInfoThis = toolInfo.nodeInfo as NodeInfoThis;
        const self = this;
        nodeInfoThis.update = function (nodeInfo?: NodeInfo) {
          // const toolbars = app.getNowData(expr as any) as ToolbarConfig[];
          // toolbars[i].tools[j].nodeInfo = nodeInfo;
          // debugger;
          // app.updateByExpr(expr as any, toolbars);
          // const srcNodeInfo = self._appComponent.data.get(
          //   expr + `[${i}].tools[${j}].nodeInfo`
          // ) as NodeInfo;
          nodeInfo = nodeInfo || this;
          nodeInfoList[j] = {
            ...nodeInfo,
            update: nodeInfoThis.update.bind(nodeInfo),
            selector: nodeInfoThis.selector,
          };
          nodeInfo = dom.handleNodeInfo(self, nodeInfo);
          self._appComponent.data.set(
            "appOptions." + expr + `[${i}].tools[${j}].nodeInfo`,
            nodeInfo
          );
        }.bind(nodeInfoThis);
        this._handleNodeInfoThisSelectorData(
          app,
          nodeInfoThis,
          nodeInfoList,
          j
        );
        toolInfo.nodeInfo = dom.handleNodeInfo(this, toolInfo.nodeInfo);
      }
    }
  };

  private _eventName(name: string): string {
    return `__event_` + name;
  }

  private _eventList(name: string): any[] {
    name = this._eventName(name);
    let eventList = this._datastore[name];
    if (!eventList) {
      eventList = [];
      this._datastore[name] = eventList;
    }
    return eventList;
  }

  private _callAppEvent(eventName: string, ...args: any) {
    const eventList = this._eventList(eventName);
    for (let i = 0; i < eventList.length; i++) {
      const callbackFn = eventList[i];
      if (typeof callbackFn === "function") {
        callbackFn(...args);
      }
    }
  }

  //#endregion

  bookmarkList() {
    return this._bookmarkList || [];
  }

  addListener(eventName: string, callback: any) {
    switch (eventName) {
      case appEventBookmarkChange:
        break;
      default:
        return;
    }

    this._eventList(eventName).push(callback);
  }

  removeListener(eventName: string, callback: any) {
    switch (eventName) {
      case appEventBookmarkChange:
        break;
      default:
        return;
    }
    const eventList = this._eventList(eventName);
    for (let i = eventList.length; i >= 0; i--) {
      if (eventList[i] === callback) {
        eventList.splice(i, 1);
      }
    }
  }

  public getDataStore(): DataStore {
    return this._datastore;
  }

  public removeBookmark(index: number): void {
    const bookmarkLength = this._bookmarkList.length - 1;
    if (index > bookmarkLength || index < 0) {
      return;
    }

    let currentIndex = this._currentBookmarkIndex;
    const currentBookmark = this.getBookmarkInfo(currentIndex);
    let isConvert = false;
    if (currentIndex === index) {
      currentIndex += 1;
      if (bookmarkLength <= currentIndex) {
        currentIndex = bookmarkLength - 1;
      }
      isConvert = true;
    }

    this._bookmarkList.splice(index, 1);
    this._bookmarkMap = {};
    for (let i = 0; i < this._bookmarkList.length; i++) {
      const bookmarkInfo = this._bookmarkList[i];
      bookmarkInfo.index = i;
      this._bookmarkMap[bookmarkInfo.id] = i;
    }

    this._appComponent.data.removeAt("bookmarkInfos.list", index);
    if (isConvert) {
      this.convertBookmark(currentIndex);
    } else {
      this.convertBookmarkById(currentBookmark.id);
    }
  }

  public removeBookmarkById(id: string): void {
    const bookmarkIndex = this._bookmarkMap[id];
    if (typeof bookmarkIndex === "undefined") {
      return;
    }
    this.removeBookmark(bookmarkIndex);
  }

  public convertBookmarkById(id: string): void {
    const bookmarkIndex = this._bookmarkMap[id];
    if (typeof bookmarkIndex === "undefined") {
      return;
    }

    this.convertBookmark(bookmarkIndex);
  }

  public getBookmarkInfoById(id: string): AppBookmarkInfoWithIndex {
    const bookmarkIndex = this._bookmarkMap[id];
    if (typeof bookmarkIndex === "undefined") {
      return;
    }

    return this.getBookmarkInfo(bookmarkIndex);
  }

  public bookmarkNum(): number {
    return this._bookmarkList.length;
  }

  public getBookmarkInfo(index: number): AppBookmarkInfoWithIndex | undefined {
    return this._bookmarkList[index];
  }

  public addBookmark(bookmarkInfo: AppBookmarkInfo): void {
    const current = this._bookmarkMap[bookmarkInfo.id];
    if (typeof current !== "undefined") {
      for (let i = 0; i < this._bookmarkList.length; i++) {
        const bookmarkInfo = this._bookmarkList[i];
        if (bookmarkInfo.id === bookmarkInfo.id) {
          this.convertBookmark(i);
          return;
        }
      }
      return;
    }
    const bookmark: AppBookmarkInfoWithIndex = {
      ...bookmarkInfo,
      index: -1,
    };
    this._bookmarkList.push(bookmark);
    bookmark.index = this._bookmarkList.length - 1;
    this._bookmarkMap[bookmarkInfo.id] = bookmark.index;
    this._appComponent.data.push("bookmarkInfos.list", {
      name: bookmark.name,
      id: bookmark.id,
    });
    this.convertBookmark(bookmark.index);
  }
  public currentBookmark(): AppBookmarkInfoWithIndex | undefined {
    if (this._currentBookmarkIndex === -1) {
      return undefined;
    }
    return this._bookmarkList[this._currentBookmarkIndex];
  }
  public convertBookmark(index: number): void {
    this._currentBookmarkIndex = index;
    let currentBookmarkId = "";
    if (index >= 0) {
      this._currentBookmarkId = this._bookmarkList[index].id;
      currentBookmarkId = this._currentBookmarkId;
    }
    this._appComponent.data.set("bookmarkInfos.index", index);
    this._appComponent.data.set("bookmarkInfos.id", currentBookmarkId);
    this._callAppEvent(appEventBookmarkChange, this, this._bookmarkList[index]);
  }

  public getReader(): ReaderInterface {
    return this._readerInterface;
  }

  public getRootEle(): HTMLElement | undefined {
    return this._attachEle;
  }

  public getInitConfig: () => AppUpdateOptions | undefined = () => {
    return this._initOptions;
  };

  public getNowData = (expr: string = "") => {
    if (!this._appComponent) {
      return;
    }
    if (expr && !expr.startsWith(".")) {
      expr = "." + expr;
    }
    const result = this._appComponent.data.get("appOptions" + expr);
    if (typeof result === "object") {
      return JSON.parse(JSON.stringify(result));
    }
    return result;
  };

  public updateByExpr = (expr: string, options: any) => {
    const data = this.getNowData();
    const split = expr.split(".");
    const endExpr = split.splice(split.length - 1, 1)[0];

    let temp: any = data;
    for (let i in split) {
      const str = split[i];
      temp = temp[str] || {};
    }
    temp[endExpr] = options;
    this.update(data);
  };

  /**
   *  更新参数并渲染视图
   * @param options 要更新的参数
   */
  public update = (options: AppUpdateOptions) => {
    if (!options || !this._appComponent) {
      return;
    }
    const app = this;
    if (
      options.tabPages &&
      options.tabPages.btnGroup &&
      options.tabPages.btnGroup.btns
    ) {
      const btns = options.tabPages.btnGroup.btns;
      for (let i = 0; i < btns.length; i++) {
        const nodeInfoThis = btns[i] as NodeInfoThis;
        nodeInfoThis.update = function (this: NodeInfo, nodeInfo?: NodeInfo) {
          // const btns = app.getNowData("tabPages.btnGroup.btns");
          // btns[i] = nodeInfo;
          nodeInfo = nodeInfo || this;
          btns[i] = nodeInfo;
          nodeInfo = dom.handleNodeInfo(app, nodeInfo);
          app.updateByExpr(`tabPages.btnGroup.btns[${i}]`, nodeInfo);
        }.bind(btns[i]);
        this._handleNodeInfoThisSelectorData(
          app,
          nodeInfoThis,
          btns as NodeInfoThis[],
          i
        );
        btns[i] = dom.handleNodeInfo(this, btns[i]);
      }
    }

    if (options.header && options.header.toolbars) {
      this._handleToobarConfigs(options.header.toolbars, "header.toolbars");
    }

    if (options.content) {
      if (options.content.noOpenFileRender) {
        const renderId = id.createId();
        this._datastore.set(renderId, options.content.noOpenFileRender);
        options.content.noOpenFileRender = renderId as any;
      }
    }

    if (options.sidebars) {
      if (options.sidebars.left) {
        this._handleToobarConfigs(
          options.sidebars.left.toolbars,
          "sidebars.left.toolbars"
        );
      }
    }

    this._appComponent.data.merge(
      "appOptions",
      JSON.parse(JSON.stringify(options)),
      { force: true }
    );
  };

  /**
   * 显示到某个元素上
   * @param ele 要显示到的元素
   */
  public show = () => {
    this._isShow = true;
    this._updateShow();
  };

  /**
   * 隐藏显示
   */
  public hide = () => {
    if (!this._isShow || !this._appComponent) {
      return;
    }
    this._isShow = false;
    this._updateShow();
  };

  /**
   * 销毁
   */
  public destroy() {
    if (!this._appComponent) {
      return;
    }
    this._appComponent.dispose();
    this._appComponent = undefined;
    this._attachEle = undefined;
    app.unRegistryApp(this._appId);
    this._appId = undefined;
  }

  public message = this._messageUtils;
  public loading = this._loading;
}
