import { defineComponent, Component } from "san";
import { template as templateParser } from "lodash";
import html from "./index.html";
import styles from "./index.module.less";
import { app, dom, id } from "../../utils";
import { defaultContentTemp } from "../defaults/default";
import { AppBookmarkInfo } from "../../types";
//@ts-ignore
import AsyncLock from "async-lock";

const lock = new AsyncLock();

interface ReaderProps {
  noOpenFileRender?: string;
}

interface ErrorInfo {
  desc: string;
  haveErr: boolean;
}

interface ErrorInfoMap {
  [key: string]: ErrorInfo;
}

interface ReaderEleMap {
  [key: string]: HTMLElement;
}

interface ReaderStates {
  bookmarkLoadErrors: ErrorInfoMap;
}

type DataType = ReaderProps & ReaderStates;
type ReaderComponent = Component<DataType> & {
  _tempContentComponent: Component;
  _tempContentHtmlEle: HTMLElement;
  destoryTempContent(): void;
  loadTempContent(): void;
  readerEleList: ReaderEleMap;
  lastReaderId: string;
};
export default defineComponent<DataType>({
  template: templateParser(html)({ styles }),
  initData() {
    return {
      bookmarkLoadErrors: { __length: 0 as any },
    };
  },
  attached(this: ReaderComponent) {
    this.loadTempContent();
  },
  disposed(this: ReaderComponent) {
    this.destoryTempContent();
  },
  computed: {
    errMsg() {
      const currentBookmarkId = this.data.get("bookmarkInfos.id");
      const bookmarkLoadErrors = this.data.get("bookmarkLoadErrors") || {};

      const errInfo = bookmarkLoadErrors[currentBookmarkId];
      if (errInfo && errInfo.haveErr) {
        return errInfo.desc || "未知异常";
      }
      return "";
    },
  },
  loadTempContent(this: ReaderComponent) {
    const tempContentEle = (this.ref("tempContent") as any) as HTMLDivElement;
    if (!tempContentEle) {
      return;
    }
    const renderId = this.data.get("noOpenFileRender");
    let renderFn = defaultContentTemp;
    const appInterface = app.getApp(this.data.get("appId"));
    if (renderId) {
      const datas = app.getAppDataStore(this.data.get("appId"));
      const rFn = datas.get(renderId) as any;
      if (rFn) {
        renderFn = rFn;
      }
    }

    this.destoryTempContent();

    const renderEle = renderFn(appInterface, this);
    if (typeof (renderEle as any).attach !== "function") {
      this._tempContentHtmlEle = renderEle as any;
      tempContentEle.innerHTML = "";
      tempContentEle.appendChild(this._tempContentHtmlEle);
    } else {
      this._tempContentComponent = renderEle as any;
      this._tempContentComponent.attach(tempContentEle);
    }
  },
  destoryTempContent(this: ReaderComponent) {
    if (this._tempContentComponent) {
      this._tempContentComponent.dispose();
    }

    if (this._tempContentHtmlEle) {
      this._tempContentHtmlEle.remove();
    }
  },
  async renderReaders(this: ReaderComponent, bookmarId: string) {
    const nowBookmarkLoadErrors = JSON.parse(
      JSON.stringify(this.data.get(`bookmarkLoadErrors`) || {})
    ) as ErrorInfoMap;
    this.readerEleList = this.readerEleList || {};

    if (!bookmarId) {
      if (nowBookmarkLoadErrors["__length"]) {
        this.data.set("bookmarkLoadErrors", { _length: 0 as any });
      }
      for (let key in this.readerEleList) {
        this.readerEleList[key].remove();
        delete this.readerEleList[key];
      }
      return;
    }

    if (this.lastReaderId && this.readerEleList[this.lastReaderId]) {
      this.readerEleList[this.lastReaderId].style.display = "none";
    }
    this.lastReaderId = bookmarId;

    if (this.readerEleList[bookmarId]) {
      this.readerEleList[bookmarId].removeAttribute("style");
      return;
    }

    try {
      const rootEle = this.el;
      const appInterface = app.getAppBySanComponent(this);
      const bookmark = appInterface.getBookmarkInfoById(bookmarId);

      if (
        !bookmark ||
        !bookmark.parserWrapperInfo ||
        !bookmark.parserWrapperInfo.parserInterface
      ) {
        throw new Error("页签中缺失解析器器信息");
      }

      const parserInterface = bookmark.parserWrapperInfo.parserInterface;
      if (!parserInterface.render) {
        throw new Error("解析器未实现渲染方法");
      }

      const readerEle = dom.createElement("div") as HTMLDivElement;
      readerEle.className = styles.readerContent;
      this.readerEleList[bookmark.id] = readerEle;
      rootEle.appendChild(readerEle);
      const res = parserInterface.render(readerEle);
      if (res instanceof Promise) {
        await res;
      }
    } catch (e) {
      nowBookmarkLoadErrors[bookmarId] = {
        haveErr: true,
        desc: (e as any).message,
      };
      (nowBookmarkLoadErrors["__length"] as any) += 1;
      this.data.set("bookmarkLoadErrors", nowBookmarkLoadErrors);
    }
  },
  async handleContent(this: ReaderComponent, id: string) {
    const nowBookmarkLoadErrors = JSON.parse(
      JSON.stringify(this.data.get(`bookmarkLoadErrors`) || {})
    );

    const appInterface = app.getApp(this.data.get("appId"));
    const bookmark = appInterface.getBookmarkInfoById(id);
    if (nowBookmarkLoadErrors[bookmark.id]) {
      return;
    }
    const err: ErrorInfo = {
      desc: "",
      haveErr: false,
    };
    try {
      const readerContentEle = (this.ref(
        "ref-readerContent-" + id
      ) as any) as HTMLDivElement;
      if (!readerContentEle) {
        throw new Error("缺失被渲染元素");
      }

      if (
        !bookmark ||
        !bookmark.parserWrapperInfo ||
        !bookmark.parserWrapperInfo.parserInterface
      ) {
        throw new Error("页签中缺失解析器器信息");
      }

      const parserInterface = bookmark.parserWrapperInfo.parserInterface;
      if (parserInterface.render) {
        readerContentEle.innerHTML = "";
        const backContent = parserInterface.render(readerContentEle);
        if (backContent instanceof Promise) {
          await backContent;
        }
      } else {
        throw new Error("解析器未实现渲染方法");
      }
    } catch (e) {
      err.haveErr = true;
      err.desc = (e as Error).message;
    } finally {
      nowBookmarkLoadErrors[bookmark.id] = err;
      this.data.set(`bookmarkLoadErrors`, nowBookmarkLoadErrors);
    }
  },
});
