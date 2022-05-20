import { defineComponent, Component } from "san";

import AppUi, { AppUiInterface } from "./ui/App";
import {
  AppInterface,
  AppOptions,
  AppUpdateOptions,
  FileInfo,
  ReaderInterface,
  ReaderParserConstructor,
  ReaderParserInterface,
  ToolbarConfig,
  WebFontConfig,
} from "./types";
import { app, arrayuUique, datas, dom, id, id as idUtils } from "./utils";
import { defaultData } from "./ui/defaults/default";

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
      defaultData.headerTabs.safety,
      defaultData.headerTabs.help,
    ],
  },
  sidebars: {
    left: {
      toolbars: [
        defaultData.sildebarLeftTabs.sign,
        defaultData.sildebarLeftTabs.comment,
        defaultData.sildebarLeftTabs.thumbnail,
      ],
    },
    right: false,
  },
};

interface AppProps {
  appOptions: AppOptions;
  appId: string;
  show: boolean;
}

const App = defineComponent<AppProps>({
  components: {
    "ui-app": AppUi,
  },
  template: `<ui-app s-ref="ref-app" s-show="show" style="min-height: {{appOptions.minHeight || 800}}px;min-width: {{appOptions.minWidth || 1280}}px;" s-bind="{{{...appOptions}}}" appId="{{appId}}" ></<ui-app>`,
  initData: function () {
    return {
      show: true,
      appOptions: {},
    };
  },
  messages: {
    "HTML::ELE::EVENT"(args) {
      const val = args && (args.value as any);
      this.eventMapping(val.id, val.event);
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
  public constructor(private _uiAppInterface: AppUiInterface) {}

  loadFile(file: FileInfo): Promise<void> {
    debugger;
    return this._uiAppInterface.getReader().loadFile(file);
  }

  currentParser(): ReaderParserInterface {
    return this._uiAppInterface.getReader().currentParser();
  }
  supportFileSuffix(): string[] {
    const parserList = this._uiAppInterface.getReader().getParserList();
    const result: string[] = [];
    for (let i = 0; i < parserList.length; i++) {
      const fileSuffixList = parserList[i].support().fileSuffix;
      result.push(...fileSuffixList);
    }
    return arrayuUique(result);
  }

  attach(parser: ReaderParserConstructor): void {
    this._uiAppInterface.getReader().attachParser(parser);
  }
}

export class AppImpl implements AppInterface {
  private _appComponent: Component | undefined;
  private _attachEle: HTMLElement | undefined;
  private _isShow: boolean = false;
  private _fontConfig: WebFontConfig;
  private _appId: string | undefined;
  private _uiAppInterface: AppUiInterface | undefined;
  private _readerInterface: ReaderInterface | undefined;

  public constructor(private _initOptions?: AppOptions) {
    this._fontConfig =
      (this._initOptions && this._initOptions.fontConfig) || defaultFontConfig!;
    if (this._initOptions && this._initOptions.fontConfig) {
      delete this._initOptions.fontConfig;
    }
    if (!document.getElementById(fontfaceStyleId)) {
      this._createFontFaceStyle();
    }
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
        appOptions: {},
        appId: this._appId,
      },
    });
    (this._appComponent as any).eventMapping = (id: any, event: any) => {
      dom.nodeEventCall(id, this, event);
    };
    this.update(defaultOptions);
    this.update(this._initOptions!);
    this._appComponent.attach(this._attachEle!);
    this._uiAppInterface = (this._appComponent.ref(
      "ref-app"
    ) as any) as AppUiInterface;
    this._readerInterface = new ReaderImpl(this._uiAppInterface);
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

  private _handleToobarConfigs = (toolbarConfigs: ToolbarConfig[]) => {
    for (let i = 0; i < toolbarConfigs.length; i++) {
      const toolbar = toolbarConfigs[i];

      if (toolbar.activeChange) {
        const activeChangeFnId = id.createId();
        datas.dataStoreSet(activeChangeFnId, toolbar.activeChange);
        toolbar._activeChangeFnId = activeChangeFnId;
      }

      if (!toolbar.tools || toolbar.tools.length === 0) {
        continue;
      }

      for (let j = 0; j < toolbar.tools.length; j++) {
        const toolInfo = toolbar.tools[j];
        if (!toolInfo.nodeInfo) {
          continue;
        }
        toolInfo.nodeInfo = dom.handleNodeInfo(toolInfo.nodeInfo);
      }
    }
  };

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
    if (!this._appComponent) {
      return;
    }

    if (
      options.tabPages &&
      options.tabPages.btnGroup &&
      options.tabPages.btnGroup.btns
    ) {
      const btns = options.tabPages.btnGroup.btns;
      for (let i = 0; i < btns.length; i++) {
        btns[i] = dom.handleNodeInfo(btns[i]);
      }
    }

    if (options.header && options.header.toolbars) {
      this._handleToobarConfigs(options.header.toolbars);
      // for (let i = 0; i < options.header.toolbars.length; i++) {
      //   const toolbar = options.header.toolbars[i];
      //   if (!toolbar.tools || toolbar.tools.length === 0) {
      //     continue;
      //   }

      //   for (let j = 0; j < toolbar.tools.length; j++) {
      //     const toolInfo = toolbar.tools[j];
      //     if (!toolInfo.nodeInfo) {
      //       continue;
      //     }
      //     toolInfo.nodeInfo = dom.handleNodeInfo(toolInfo.nodeInfo);
      //   }
      // }
    }

    if (options.sidebars) {
      if (options.sidebars.left) {
        this._handleToobarConfigs(options.sidebars.left.toolbars);
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
  public show = (ele?: HTMLElement) => {
    if (ele && ele != this._attachEle) {
      this.destroy();
      this._attachEle = ele;
    }
    if (!this._attachEle) {
      console.warn("没有可以用来附加的DOM元素");
      return;
    }
    this._isShow = true;
    if (!this._appComponent) {
      this._initApp();
    }
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
}
