import { defineComponent } from 'san';
import { template as template$6, cloneDeep } from 'lodash';
import AsyncLock from 'async-lock';
import classNames from 'classnames';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function ieVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1; //判断是否IE11浏览器
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        }
        else if (fIEVersion == 8) {
            return 8;
        }
        else if (fIEVersion == 9) {
            return 9;
        }
        else if (fIEVersion == 10) {
            return 10;
        }
        else {
            return 6; //IE版本<=7
        }
    }
    else if (isEdge) {
        return "edge"; //edge
    }
    else if (isIE11) {
        return 11; //IE11
    }
    else {
        return -1; //不是ie浏览器
    }
}
function lessThan(ieNumber) {
    var version = ieVersion();
    if (version === -1 || version === "edge") {
        return false;
    }
    return version < ieNumber;
}
function isIe() {
    var version = ieVersion();
    return version !== -1 && version !== "edge";
}

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ieVersion: ieVersion,
    lessThan: lessThan,
    isIe: isIe
});

/**
 * 创建唯一id
 * @returns 唯一id
 */
function createId() {
    var win = window;
    if (typeof win._idNo !== "number") {
        win._idNo = 0;
    }
    win._idNo += 1;
    return "".concat(new Date().getTime(), ".").concat(win._idNo);
}

var DataStore = /** @class */ (function () {
    function DataStore() {
        this._dataStore = {};
    }
    DataStore.prototype.get = function (key) {
        return this._dataStore[key];
    };
    DataStore.prototype.set = function (key, val) {
        this._dataStore[key] = val;
    };
    DataStore.prototype.remove = function (key) {
        delete this._dataStore[key];
    };
    DataStore.prototype.all = function () {
        return this._dataStore;
    };
    return DataStore;
}());
var defaultDataStore = new DataStore();

var _appMap = {};
function registryApp(app) {
    var appId = createId();
    _appMap[appId] = app;
    return appId;
}
function unRegistryApp(id) {
    delete _appMap[id];
}
function getAppBySanComponent(component) {
    return getApp(component.data.get("appId"));
}
function getApp(id) {
    return _appMap[id];
}
function getAppDataStore(id) {
    var app = getApp(id);
    if (!app) {
        return defaultDataStore;
    }
    return app.getDataStore();
}

/**
 * 派发DOM事件消息
 * @param ele 要派发事件的Dom元素
 * @param eventId 事件ID
 * @param dispatch 派发函数
 */
function dispatchDomEvent(ele, eventIdList, component, thisInfo) {
    var _loop_1 = function (i) {
        var eventId = eventIdList[i];
        var idSplit = eventId.split("_");
        if (idSplit.length != 2) {
            console.warn("事件id: ", eventId, "格式错误，请检查参数如数, 此事件的绑定将被跳过");
            return { value: void 0 };
        }
        ele["on" + idSplit[1].toLowerCase()] = function (event) {
            event = event || window.event;
            component.dispatch("HTML::ELE::EVENT", {
                id: eventId,
                event: event,
                thisInfo: thisInfo
            });
        };
    };
    for (var i = 0; i < eventIdList.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
// let _nodeEventMap: NodeEventMap = {};
// let _nodeRenderMap: { [key: string]: NodeInfo } = {};
/**
 * 绑定事件
 * @param eventName 事件名称
 * @param callback 回调函数
 * @returns 事件id
 */
function nodeEvenBindEvent(dataStore, eventName, callback) {
    var id = createId() + "_" + eventName;
    dataStore.set(id, {
        id: id,
        name: eventName,
        callback: callback
    });
    return id;
}
/**
 * 获取节点的事件信息
 * @param eventId 事件id
 * @returns 事件信息
 */
function nodeEventInfoGet(app, eventId) {
    return app.getDataStore().get(eventId);
}
function handleDisabled(disabledInfo, datas) {
    var disabledType = typeof disabledInfo;
    if (disabledType !== "function") {
        return disabledInfo;
    }
    var disableFnId = createId();
    datas.set(disableFnId, disabledInfo);
    return disableFnId;
}
var nodeInfoCommonIds = ["attached", "isShow"];
function handleToolBarInfo(app, toolbarInfo) {
    var datastore = app.getDataStore();
    toolbarInfo.disabled = handleDisabled(toolbarInfo.disabled, datastore);
    if (toolbarInfo.activeChange) {
        datastore.remove(toolbarInfo._activeChangeFnId);
        toolbarInfo._activeChangeFnId = createId();
        datastore.set(toolbarInfo._activeChangeFnId, toolbarInfo.activeChange);
    }
    if (toolbarInfo.renderChildren) {
        datastore.remove(toolbarInfo._renderChildrenId);
        toolbarInfo._renderChildrenId = createId();
        datastore.set(toolbarInfo._renderChildrenId, toolbarInfo.renderChildren);
    }
    return toolbarInfo;
}
/**
 * 处理节点信息
 * @param nodeInfo 节点信息
 * @returns 处理之后的节点信息
 */
function handleNodeInfo(app, nodeInfo) {
    var srcEventIdList = nodeInfo.evenIdList || [];
    var eventIdList = [];
    var tempEventMap = {};
    var dataStore = app.getDataStore();
    if (nodeInfo.click) {
        var clickFn = nodeInfo.click.bind(nodeInfo);
        clickFn.srcFn = nodeInfo.click;
        clickFn.self = nodeInfo;
        var id = nodeEvenBindEvent(dataStore, "click", clickFn);
        eventIdList.push(id);
        tempEventMap["click"] = {
            id: id
        };
    }
    if (nodeInfo.eventBind) {
        nodeInfo.eventBind(function (eventName, callback) {
            var srcEvent = tempEventMap[eventName];
            if (srcEvent) {
                nodeEventDestroy(dataStore, srcEvent.id);
            }
            var id = nodeEvenBindEvent(dataStore, eventName, callback.bind(nodeInfo));
            eventIdList.push(id);
            tempEventMap[eventName] = { id: id };
        });
    }
    for (var i = 0; i < nodeInfoCommonIds.length; i++) {
        var fnName = nodeInfoCommonIds[i];
        if (!nodeInfo[fnName]) {
            continue;
        }
        var fnId = "_" + fnName + "Id";
        if (nodeInfo[fnId]) {
            dataStore.remove(fnId);
        }
        nodeInfo[fnId] = createId();
        // nodeInfo[fnName] = nodeInfo[fnName].bind(nodeInfo);
        var tempFn = nodeInfo[fnName].bind(nodeInfo);
        tempFn.srcFn = nodeInfo[fnName];
        tempFn.self = nodeInfo;
        dataStore.set(nodeInfo[fnId], tempFn);
    }
    // if (nodeInfo.attached) {
    //   if (nodeInfo._attachedId) {
    //     dataStore.remove(nodeInfo._attachedId);
    //   }
    //   nodeInfo._attachedId = createId();
    //   dataStore.set(nodeInfo._attachedId, nodeInfo.attached.bind(nodeInfo));
    //   nodeInfo.attached = nodeInfo.attached.bind(nodeInfo);
    // }
    // if (nodeInfo.isShow) {
    //   if (nodeInfo._isShowIc) {
    //     dataStore.remove();
    //   }
    // }
    for (var i = 0; i < srcEventIdList.length; i++) {
        var srcId = srcEventIdList[i];
        var srcNodeInfo = dataStore.get(srcId);
        if (!srcNodeInfo) {
            continue;
        }
        if (tempEventMap[srcNodeInfo.name]) {
            nodeEventDestroy(srcNodeInfo.id);
        }
    }
    var renderId = nodeInfo._renderId;
    if (nodeInfo.render) {
        if (renderId) {
            dataStore.remove(renderId);
            // delete _nodeRenderMap[renderId];
        }
        nodeInfo.render = nodeInfo.render.bind(nodeInfo);
        renderId = createId();
        dataStore.set(renderId, nodeInfo);
        nodeInfo._renderId = renderId;
        // _nodeRenderMap[renderId] = nodeInfo;
    }
    nodeInfo = __assign(__assign({}, nodeInfo), { renderId: renderId, evenIdList: eventIdList });
    delete nodeInfo["selector"];
    return JSON.parse(JSON.stringify(nodeInfo));
}
function nodeRender(component, renderId, app, parent, renderToDom) {
    return __awaiter(this, void 0, void 0, function () {
        var dataStore, nodeInfo, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!renderId) {
                        throw new Error("未获取到renderId");
                    }
                    dataStore = getApp(component.data.get("appId")).getDataStore();
                    nodeInfo = dataStore.get(renderId);
                    if (!nodeInfo || !nodeInfo.render) {
                        throw new Error("获取节点render方法失败");
                    }
                    res = nodeInfo.render(app, nodeInfo, renderToDom);
                    if (!(res instanceof Promise)) return [3 /*break*/, 2];
                    return [4 /*yield*/, res];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (nodeInfo._attachedId) {
                        nodeEventCall(app, nodeInfo._attachedId, app);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * 节点事件调用
 * @param eventId 事件ID
 * @param args 参数
 */
function nodeEventCall(app, eventId) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    //   const nodeEventInfo = app.getDataStore().get(eventId) as any;
    //   if (!nodeEventInfo) {
    //     return;
    //   }
    //   if (typeof nodeEventInfo === "function") {
    //     return nodeEventInfo(...args);
    //   }
    //   return nodeEventInfo.callback(...args);
    return nodeEventCallBindThis.apply(void 0, __spreadArray([undefined, app, eventId], args, false));
}
function nodeEventCallBindThis(self, app, eventId) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    var nodeEventInfo = app.getDataStore().get(eventId);
    if (!nodeEventInfo) {
        return;
    }
    var callback = nodeEventInfo;
    if (typeof callback !== "function") {
        callback = nodeEventInfo.callback;
        // return nodeEventInfo(...args);
    }
    if (callback.srcFn && typeof self !== "undefined") {
        Object.assign(callback.self, self);
        // callback = callback.srcFn.bind();
    }
    // if (typeof self !== "undefined") {
    //   callback = callback.bind(self);
    // }
    return callback.apply(void 0, args);
    // return nodeEventInfo.callback(...args);
}
/**
 * 节点元素事件注销
 * @param eventId 事件id
 */
function nodeEventDestroy(dataStore) {
    var eventIds = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        eventIds[_i - 1] = arguments[_i];
    }
    var eventIdLen = eventIds.length;
    if (eventIdLen === 0) {
        return;
    }
    for (var i = 0; i < eventIdLen; i++) {
        dataStore.remove(eventIds[i]);
        // delete _nodeEventMap[eventIds[i]];
    }
}
// /**
//  * 节点事件销毁全部
//  */
// export function nodeEventDestroyAll(): void {
//   _nodeEventMap = {};
// }
// export function nodeRenderDestroy(...renderId: string[]) {
//   const renderIdLen = renderId.length;
//   if (renderIdLen === 0) {
//     return;
//   }
//   for (let i = 0; i < renderIdLen; i++) {
//     delete _nodeRenderMap[renderId[i]];
//   }
// }
// export function nodeRenderDestroyAll(): void {
//   _nodeRenderMap = {};
// }

function createBlobUrlByFile(file) {
    if (window.createObjectURL) {
        return window.createObjectURL(file);
    }
    else if (window.URL.createObjectURL) {
        return window.URL.createObjectURL(file);
    }
    else if (window.webkitURL) {
        return window.webkitURL.createObjectURL(file);
    }
    return "";
}
function createElement(targetName, name) {
    if (name === void 0) { name = ""; }
    if (lessThan(9)) {
        return document.createElement("<".concat(targetName, " name=\"").concat(name, "\"></").concat(targetName, ">"));
    }
    return document.createElement(targetName);
}
function styleInject(css, id) {
    var head = document.head || document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.type = "text/css";
    style.id = id;
    head.appendChild(style);
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    }
    else {
        style.appendChild(document.createTextNode(css));
    }
}
/**
 * 全屏
 * @param ele 要全屏的元素
 */
function full(ele) {
    if (ele.requestFullscreen) {
        ele.requestFullscreen();
    }
    else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
    }
    else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen();
    }
    else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
    }
}
/**
 * 退出全屏
 */
function exitFullscreen() {
    var doc = document;
    if (doc.exitFullScreen) {
        doc.exitFullScreen();
    }
    else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
    }
    else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
    }
    else if (window.element &&
        window.element.msExitFullscreen) {
        window.element.msExitFullscreen();
    }
}
/**
 * 获取全屏元素
 * @returns 全屏的元素
 */
function getFullscreenElement() {
    var doc = document;
    return (doc.fullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullScreenElement ||
        doc.webkitFullscreenElement ||
        null);
}
/**
 * 是否可进入全屏
 * @returns 是/否
 */
function isFullScreen() {
    var doc = document;
    return !!(doc.fullscreen ||
        doc.mozFullScreen ||
        doc.webkitIsFullScreen ||
        doc.webkitFullScreen ||
        doc.msFullScreen);
}
var eventUtil = {
    once: function (ele, type, handler) {
        var tempFn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            handler.apply(void 0, args);
            eventUtil.removeHandler(ele, type, tempFn);
        };
        eventUtil.addHandler(ele, type, tempFn);
    },
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }
        else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        }
        else {
            element[" on" + type] = null;
        }
    },
    //获取事件对象
    getEvent: function (event) {
        return event ? event : window.event;
    },
    //获取目标对象，即绑定事件的DOM
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    //阻止默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation(); //阻止捕获和冒泡
        }
        else {
            event.cancelBubble = true; //只会阻止冒泡
        }
    },
    //mouseover 和 mouseout 事件 获取相关元素
    getRelatedTarget: function (event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        }
        else if (event.toElement) {
            //兼容IE的mouseout
            return event.toElement;
        }
        else if (event.fromElement) {
            //兼容IE的mouseover
            return event.fromElement;
        }
        else {
            return null;
        }
    },
    //keypress获取键码
    getCharCode: function (event) {
        if (typeof event.charCode == "number") {
            //早期IE和Opera
            return event.charCode;
        }
        else {
            return event.keyCode;
        }
    }
};
function getEleWindowTop(ele) {
    var offset = ele.offsetTop;
    if (ele.offsetParent != null) {
        offset += getEleWindowTop(ele.offsetParent);
    }
    return offset;
}
function getEleWindowLeft(ele) {
    var offset = ele.offsetLeft;
    if (ele.offsetParent != null) {
        offset += getEleWindowLeft(ele.offsetParent);
    }
    return offset;
}
function getEleWindowScollLeft(ele) {
    if (ele === document.body || !ele) {
        return 0;
    }
    return ele.scrollLeft + (getEleWindowScollLeft(ele.parentElement) || 0);
}
function getEleWindowScollTopt(ele) {
    if (ele === document.body || !ele) {
        return 0;
    }
    return ele.scrollTop + (getEleWindowScollTopt(ele.parentElement) || 0);
}
function getBoundingClientRect(ele) {
    // if (ele.getBoundingClientRect) {
    //   return ele.getBoundingClientRect();
    // }
    var top = getEleWindowTop(ele) - getEleWindowScollTopt(ele);
    var left = getEleWindowLeft(ele) - getEleWindowScollLeft(ele);
    return {
        top: top,
        left: left,
        width: ele.clientWidth,
        height: ele.clientHeight,
        x: left,
        y: top
    };
}

var dom = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createBlobUrlByFile: createBlobUrlByFile,
    createElement: createElement,
    styleInject: styleInject,
    full: full,
    exitFullscreen: exitFullscreen,
    getFullscreenElement: getFullscreenElement,
    isFullScreen: isFullScreen,
    eventUtil: eventUtil,
    getBoundingClientRect: getBoundingClientRect,
    dispatchDomEvent: dispatchDomEvent,
    nodeEventInfoGet: nodeEventInfoGet,
    handleDisabled: handleDisabled,
    handleToolBarInfo: handleToolBarInfo,
    handleNodeInfo: handleNodeInfo,
    nodeRender: nodeRender,
    nodeEventCall: nodeEventCall,
    nodeEventCallBindThis: nodeEventCallBindThis,
    nodeEventDestroy: nodeEventDestroy
});

var styles$h = {"common_font":"index-module_common_font__kzEJV","text_overflow":"index-module_text_overflow__8S-Xs","header":"index-module_header__bANPo","tollbar":"index-module_tollbar__GkMcX","tabFold":"index-module_tabFold__y-rrE","fileBtn":"index-module_fileBtn__ws1VT","tabs":"index-module_tabs__9LWcB","tab":"index-module_tab__RiFFH","active":"index-module_active__a-6ac","tabPanels":"index-module_tabPanels__FVo0y","prevTool":"index-module_prevTool__ac9hp","nextTool":"index-module_nextTool__6W3wq","tabPanel":"index-module_tabPanel__aeg7u","wrapper":"index-module_wrapper__alOl2","separate":"index-module_separate__rpKpN","tool":"index-module_tool__nu8f-","text":"index-module_text__XqzxF","icon":"index-module_icon__MnfZO"};

var htmlTemplate$1 = "<div id=\"{{id || undefined}}\" class=\"<%= styles.header %>{{className ? ' ' + className : ''}}\">\r\n    <div class=\"<%= styles.tollbar %>\">\r\n        <div class=\"<%= styles.fileBtn %>\">\r\n            <span class=\"iconfont\">&#xe655;\r\n                <span>文件</span>\r\n            </span>\r\n        </div>\r\n        <fragment s-for=\"toolbarConfig, i in toolbars\">\r\n            <div class=\"<%= styles.tabs %>\" on-click=\"events.tabClick(i)\" s-if=\"fns.showToolBar(toolbarConfig, bookmarkInfos.id)\">\r\n                <div title=\"{{toolbarConfig.text}}\" class=\"<%= styles.tab %> {{selectTabKey !== undefined && selectTabKey === i ? '<%= styles.active %>' : ''}}\">\r\n                    <span s-if=\"!!toolbarConfig.iconHtml\" class=\"iconfont\">{{toolbarConfig.iconHtml}}</span>\r\n                    <span>{{toolbarConfig.text}}</span>\r\n                </div>\r\n            </div>\r\n        </fragment>\r\n        <div class=\"<%= styles.tabFold %>\" title=\"{{expand ? '收起' : '展开'}}\" on-click=\"events.tabPanExpandClick()\">\r\n            <span class=\"iconfont\">{{expand?'&#xe656;':'&#xe71d;' | raw}}</span>\r\n        </div>\r\n    </div>\r\n    <div s-ref=\"tabPanels\" class=\"<%= styles.tabPanels %> {{expand ? '<%= styles.active %>' : ''}}\">\r\n        <div on-click=\"events.prevAndNextToolClick(false)\" class=\"<%= styles.prevTool %>\" s-show=\"fns.showControlBreakWrapper(showControlBreak, false)\"></div>\r\n        <div s-ref=\"toolsPanel\" class=\"<%= styles.tabPanel %>\" style=\"{{fns.settingToolsPanelWidthReturnStyle(handlePanelWidth)}}margin-left: {{-marginLeft}}px;\">\r\n            <fragment s-for=\"toolbarConfig, i in toolbars\">\r\n                <fragment s-for=\"toolInfo, index in toolbarConfig.tools\">\r\n                    <div s-show=\"selectTabKey === i && fns.showTool(toolInfo, bookmarkInfos.index)\" class=\"<%= styles.wrapper %>\">\r\n                        <div s-ref=\"ref-tool-{{i}}-{{index}}\" s-if=\"!!toolInfo.nodeInfo && toolInfo.type === 'default'\" class=\"<%= styles.tool %> {{toolInfo.nodeInfo.active?'<%= styles.active %>':''}}\" title=\"{{(toolInfo.nodeInfo && toolInfo.nodeInfo.title) || ''}}\" style=\"{{fns.handleNodeInfoWidth(toolInfo.nodeInfo)}}\">\r\n                            {{events.handleRender(toolInfo, i, index)}}\r\n                            <ui-toolbtn s-if=\"!toolInfo.nodeInfo.renderId\" s-bind=\"{{{...toolInfo.nodeInfo}}}\"></ui-toolbtn>\r\n                        </div>\r\n                        <div s-if=\"toolInfo.type === 'separate'\" class=\"<%= styles.separate %>\">\r\n                            <div></div>\r\n                        </div>\r\n                    </div>\r\n                </fragment>\r\n            </fragment>\r\n            \r\n        </div>\r\n        <div on-click=\"events.prevAndNextToolClick(true)\" class=\"<%= styles.nextTool %>\" s-show=\"fns.showControlBreakWrapper(showControlBreak, true)\"></div>\r\n    </div>\r\n</div>";

var headerToolMarginRight = 16;
var headerToolPanelHeight = 50;

var html$c = "<fragment>\r\n    <div s-if=\"html\" class=\"{{className || '<%= styles.icon %>'}}\">\r\n        <span class=\"iconfont\">{{html | raw}}</span>\r\n    </div>\r\n    <div s-if=\"text\" class=\"{{className || '<%= styles.text %>'}}\">\r\n        <span>{{text}}</span>\r\n    </div>\r\n</fragment>";

var ToolBtn = defineComponent({
    template: template$6(html$c)({ styles: styles$h })
});

var template$5 = template$6(htmlTemplate$1)({
    styles: styles$h
});
var Header = defineComponent({
    template: template$5,
    components: {
        "ui-toolbtn": ToolBtn
    },
    initData: function () {
        return {
            selectTabKey: 0,
            expand: true,
            panelWidthList: [],
            marginLeft: 0,
            tabPanelsWidth: 0,
            toolsPanelWidth: 0,
            marginEnd: false
        };
    },
    attached: function () {
        this.events.resize = this.events.resize.bind(this);
        eventUtil.addHandler(window, "resize", this.events.resize);
        this.events.resize();
    },
    detached: function () {
        eventUtil.removeHandler(window, "resize", this.events.resize);
    },
    updated: function () {
        this.events.resize();
        // setTimeout(() => {
        this.dispatch("app::resize", {});
        // }, 300);
    },
    computed: {
        showControlBreak: function () {
            var result = ["", ""];
            var width = this.data.get("toolsPanelWidth");
            if (width <= 0) {
                return result;
            }
            var pannelsWidth = this.data.get("tabPanelsWidth");
            var marginLeft = this.data.get("marginLeft");
            if (pannelsWidth >= width) {
                return result;
            }
            if (marginLeft > 0) {
                result[0] = "prev";
            }
            if (marginLeft + pannelsWidth < width) {
                result[1] = "next";
            }
            return result;
        },
        handlePanelWidth: function () {
            var selectTabKey = this.data.get("selectTabKey");
            var toolsConfig = this.data.get("toolbars[".concat(selectTabKey, "]"));
            if (!toolsConfig ||
                !toolsConfig.tools ||
                toolsConfig.tools.length === 0) {
                return;
            }
            var tools = toolsConfig.tools;
            var sumWidth = 0;
            for (var i = 0; i < tools.length; i++) {
                var tool = tools[i];
                sumWidth += headerToolMarginRight;
                if (tool.type === "separate") {
                    sumWidth += 2;
                    continue;
                }
                if (!tool.nodeInfo) {
                    continue;
                }
                if (typeof tool.nodeInfo.width !== "undefined") {
                    sumWidth += tool.nodeInfo.width;
                }
                else {
                    sumWidth += headerToolPanelHeight;
                }
            }
            return sumWidth;
            // return "width: " + sumWidth + "px;";
        },
        handlePanelTools: function () {
            var selectTabKey = this.data.get("selectTabKey");
            var toolsConfig = this.data.get("toolbars[".concat(selectTabKey, "]"));
            if (!toolsConfig ||
                !toolsConfig.tools ||
                toolsConfig.tools.length === 0) {
                return;
            }
            return toolsConfig.tools;
        }
    },
    fns: {
        showToolBar: function (toolbarConfig) {
            if (!toolbarConfig) {
                return false;
            }
            if (!toolbarConfig.tools || toolbarConfig.tools.length === 0) {
                return false;
            }
            var len = 0;
            var showToolFn = this.fns.showTool.bind(this);
            for (var i = 0; i < toolbarConfig.tools.length; i++) {
                var tool = toolbarConfig.tools[i];
                if (showToolFn(tool)) {
                    len += 1;
                    break;
                }
            }
            return len != 0;
        },
        showTool: function (toolInfo) {
            var _a, _b;
            if (toolInfo.type !== "separate" && (!toolInfo || !toolInfo.nodeInfo)) {
                return false;
            }
            var appInterface = getApp(this.data.get("appId"));
            if (toolInfo.needReader && !((_a = appInterface.getReader()) === null || _a === void 0 ? void 0 : _a.currentParser())) {
                return false;
            }
            if ((_b = toolInfo.nodeInfo) === null || _b === void 0 ? void 0 : _b._isShowId) {
                try {
                    var appInterface_1 = getApp(this.data.get("appId"));
                    // return dom.nodeEventCall(
                    return nodeEventCallBindThis(toolInfo.nodeInfo, appInterface_1, toolInfo.nodeInfo._isShowId, appInterface_1);
                    // return toolInfo.nodeInfo.isShow(appInterface);
                }
                catch (e) {
                    return false;
                }
            }
            return true;
        },
        showControlBreakWrapper: function (show, isNext) {
            if (!show || show.length != 2 || (!show[0] && !show[1])) {
                this.data.set("marginLeft", 0);
                return;
            }
            if (show[0] === "prev" && !show[1]) {
                this.data.set("marginEnd", true);
            }
            else {
                if (this.data.get("marginEnd")) {
                    this.data.set("marginEnd", false);
                }
            }
            if (isNext) {
                return show[1] === "next";
            }
            return show[0] === "prev";
        },
        handleNodeInfoWidth: function (nodeInfo) {
            if (!nodeInfo || typeof nodeInfo.width === "undefined") {
                return undefined;
            }
            return "width: " + nodeInfo.width + "px";
        },
        settingToolsPanelWidthReturnStyle: function (width) {
            width = width || 0;
            this.data.set("toolsPanelWidth", width);
            return "width: " + width + "px;";
        }
    },
    events: {
        resize: function () {
            if (!this.data.get("appShow")) {
                return;
            }
            var tabPanelsEle = this.ref("tabPanels");
            if (!tabPanelsEle) {
                return;
            }
            var tabPanelsWidth = tabPanelsEle.clientWidth;
            this.data.set("tabPanelsWidth", tabPanelsWidth);
            var marginLeft = this.data.get("marginLeft");
            if (marginLeft === 0) {
                return;
            }
            var toolPanelWidth = this.data.get("toolsPanelWidth");
            var width = toolPanelWidth - marginLeft - tabPanelsWidth;
            var marginEnd = this.data.get("marginEnd");
            if (marginEnd) {
                this.data.set("marginLeft", toolPanelWidth - tabPanelsWidth + 24);
                return;
            }
            if (width < 0) {
                width = -width - 24;
                marginLeft -= width;
                this.data.set("marginLeft", marginLeft);
            }
        },
        tabClick: function (index) {
            var selectTabKey = this.data.get("selectTabKey");
            if (index === selectTabKey) {
                return;
            }
            this.data.set("selectTabKey", index);
        },
        tabPanExpandClick: function () {
            var expand = this.data.get("expand");
            this.data.set("expand", !expand);
        },
        handleRender: function (toolInfo, i, index) {
            var toolEle = this.ref("ref-tool-" + i + "-" + index);
            if (!toolEle || !toolInfo || !toolInfo.nodeInfo) {
                return undefined;
            }
            if (toolInfo.nodeInfo.renderId) {
                nodeRender(this, toolInfo.nodeInfo.renderId, getApp(this.data.get("appId")), this, toolEle);
                return undefined;
            }
            else if (toolInfo.nodeInfo._attachedId) {
                var appInterface = getApp(this.data.get("appId"));
                // dom.nodeEventCall(
                nodeEventCallBindThis(toolInfo.nodeInfo, appInterface, toolInfo.nodeInfo._attachedId, appInterface);
            }
            if (!toolInfo.nodeInfo.evenIdList ||
                toolInfo.nodeInfo.evenIdList.length === 0) {
                return undefined;
            }
            dispatchDomEvent(toolEle, toolInfo.nodeInfo.evenIdList, this, toolInfo.nodeInfo);
            return undefined;
        },
        prevAndNextToolClick: function (isNext) {
            if (!this.data.get("appShow")) {
                return;
            }
            var toolsPanelWidth = this.data.get("toolsPanelWidth");
            var tabPanelsWidth = this.data.get("tabPanelsWidth");
            var marginLeft = this.data.get("marginLeft");
            if (isNext) {
                var width = toolsPanelWidth - tabPanelsWidth - marginLeft;
                if (width <= 0) {
                    return;
                }
                while (width > tabPanelsWidth) {
                    width -= tabPanelsWidth;
                }
                marginLeft += width + 24;
            }
            else {
                marginLeft -= tabPanelsWidth;
                if (marginLeft <= 0) {
                    marginLeft = 0;
                }
            }
            this.data.set("marginLeft", marginLeft);
        }
    }
});

var html$b = "<div class=\"<%= styles.reader %>\">\r\n    <div class=\"<%= styles.tempContent %>\" s-ref=\"tempContent\" s-show=\"bookmarkInfos.index < 0\"></div>\r\n    <!-- <fragment s-for=\"bookmark in bookmarkInfos.list\">\r\n        <div key=\"{{bookmark.id}}\" s-key=\"{{bookmark.id}}\" renderData=\"{{handleContent(bookmark.id)}}\" s-show=\"bookmarkInfos.id == bookmark.id\" class=\"<%= styles.readerContent %>\"\r\n            s-ref=\"ref-readerContent-{{bookmark.id}}\">\r\n        </div>\r\n    </fragment> -->\r\n    <div style=\"display: none\" key=\"{{renderReaders(bookmarkInfos.id)}}\"></div>\r\n    <div s-if=\"errMsg\" class=\"<%= styles.error %>\">\r\n        <h3>{{errMsg}}</h3>\r\n    </div>\r\n</div>";

var styles$g = {"reader":"index-module_reader__8JtQW","tempContent":"index-module_tempContent__lb78H","error":"index-module_error__updK0","readerContent":"index-module_readerContent__5qVGr"};

var styles$f = {"common_font":"index-module_common_font__1JO7K","text_overflow":"index-module_text_overflow__5IRoi","toolJump":"index-module_toolJump__1AnPZ","disabled":"index-module_disabled__hCCJ7","toolIconBtn":"index-module_toolIconBtn__99EQS","toolScale":"index-module_toolScale__GZ9IV","active":"index-module_active__SH6e7"};

var html$a = "<div class=\"<%= styles.toolJump %>\">\r\n    <span class=\"iconfont {{prevDisableClass}}\" on-click=\"events.prevOrNextClick(false)\" title=\"上一页\">&#xe615;</span>\r\n    <input-number on-change=\"events.valueChange($event)\" s-ref=\"input-number\" minValue=\"1\" maxValue=\"{{maxValue}}\" value=\"{= value =}\"></input-number>\r\n    <span class=\"iconfont {{nextDisableClass}}\" on-click=\"events.prevOrNextClick(true)\" title=\"下一页\">&#xe718;</span>\r\n</div>";

var html$9 = "<input on-keyup=\"events.valueChange($event)\" on-keydown=\"events.valueKeyDown($event)\" on-blur=\"events.valueBlur($event)\" value=\"{= value =}\">\r\n";

var styles$e = {};

var allowKeys = [8, 37, 39, 46];
var InputNumber = defineComponent({
    template: template$6(html$9)(styles$e),
    initData: function () {
        return {
            value: "1",
            defaultValue: 1
        };
    },
    events: {
        valueKeyDown: function (event) {
            if ((event.keyCode < 48 || event.keyCode > 57) &&
                !allowKeys.includes(event.keyCode)) {
                eventUtil.preventDefault(event);
                return;
            }
        },
        valueChange: function (event) {
            eventUtil.stopPropagation(event);
            eventUtil.preventDefault(event);
            var ele = event.target;
            var valStr = ele.value;
            if (valStr === "") {
                return;
            }
            var val = parseInt(valStr);
            if (isNaN(val)) {
                return;
            }
            var minValue = this.data.get("minValue");
            var maxValue = this.data.get("maxValue");
            if (typeof minValue !== "undefined" && val < minValue) {
                val = minValue;
            }
            if (typeof maxValue !== "undefined" && val > maxValue) {
                val = maxValue;
            }
            this.data.set("value", val + "");
            this.fire("change", val);
        },
        valueBlur: function (event) {
            var ele = event.target;
            var valStr = ele.value;
            if (valStr !== "") {
                return;
            }
            this.data.set("value", this.data.get("defaultValue") + "");
        }
    },
    add: function (num) {
        if (num === void 0) { num = 1; }
        if (this.eventHandleLoading) {
            return;
        }
        this.eventHandleLoading = true;
        try {
            var srcVal = parseInt(this.data.get("value"));
            var val = (srcVal || 1) + num;
            var maxVal = parseInt(this.data.get("maxValue") + "");
            if (typeof maxVal !== "undefined" && val > maxVal) {
                val = maxVal;
            }
            if (srcVal === val) {
                return;
            }
            this.data.set("value", val + "");
            this.fire("change", val);
        }
        finally {
            this.eventHandleLoading = false;
        }
    },
    sub: function (num) {
        if (num === void 0) { num = 1; }
        if (this.eventHandleLoading) {
            return;
        }
        this.eventHandleLoading = true;
        try {
            var srcVal = parseInt(this.data.get("value"));
            var val = (srcVal || 1) - num;
            var minValue = parseInt(this.data.get("minValue") + "");
            if (typeof minValue !== "undefined" && val < minValue) {
                val = minValue;
            }
            if (srcVal === val) {
                return;
            }
            console.log("value => ", val);
            this.data.set("value", val + "");
            this.fire("change", val);
        }
        finally {
            this.eventHandleLoading = false;
        }
    }
});

var ToolJump = defineComponent({
    components: {
        "input-number": InputNumber
    },
    template: template$6(html$a)({ styles: styles$f }),
    initData: function () {
        return {
            maxValue: undefined,
            value: 1
        };
    },
    attached: function () {
        this.events.bookmarkChange = this.events.bookmarkChange.bind(this);
        this.events.pageNoChange = this.events.pageNoChange.bind(this);
        this.app.addListener("bookmarkChange", this.events.bookmarkChange);
    },
    disposed: function () {
        this.app.removeListener("bookmarkChange", this.events.bookmarkChange);
    },
    computed: {
        prevDisableClass: function () {
            var val = this.data.get("value");
            if (val == 1) {
                return styles$f.disabled;
            }
        },
        nextDisableClass: function () {
            var val = this.data.get("value");
            var maxVal = this.data.get("maxValue");
            if (val >= maxVal) {
                return styles$f.disabled;
            }
        }
    },
    events: {
        pageNoChange: function (pageNo) {
            this.data.set("value", pageNo);
        },
        bookmarkChange: function () {
            var currentBookmark = this.app.currentBookmark();
            if (!currentBookmark ||
                !currentBookmark.id ||
                !currentBookmark.parserWrapperInfo ||
                !currentBookmark.parserWrapperInfo.parserInterface) {
                this.data.set("maxValue", 1);
                return;
            }
            this.data.set("value", currentBookmark.parserWrapperInfo.parserInterface.nowPageNo());
            currentBookmark.parserWrapperInfo.parserInterface.addListener("pageNoChange", this.events.pageNoChange);
            this.data.set("maxValue", currentBookmark.parserWrapperInfo.parserInterface.getNumPages());
        },
        valueChange: function (val) {
            if (val < 1) {
                return;
            }
            if (val > this.data.get("maxValue")) {
                return;
            }
            try {
                this.app
                    .currentBookmark()
                    .parserWrapperInfo.parserInterface.jumpTo(val);
            }
            catch (e) { }
        },
        prevOrNextClick: function (isNext) {
            var inputNumber = this.ref("input-number");
            if (isNext) {
                inputNumber.add();
            }
            else {
                inputNumber.sub();
            }
        }
    }
});

var html$8 = "<div class=\"<%= styles.toolScale %>\" style=\"width: 80px;\">\r\n  <c-select on-change=\"events.valChange($event)\" activeVal=\"{= activeVal =}\" options=\"{{options}}\" isNumber=\"{{true}}\" suffix=\"%\"></c-select>\r\n</div>\r\n";

var html$7 = "<div class=\"<%= styles.select %> {{showOptions ? '<%= styles.active %>':''}}\" on-click=\"events.selectClick($event)\">\r\n    <div class=\"<%= styles.value %>\">\r\n        <span s-show=\"!isNumber\">{{activeText}}</span>\r\n        <input-number s-show=\"isNumber\" on-change=\"events.inputChange($event)\" style=\"width:50px;border: none;outline: none;\" minValue=\"{{1}}\" maxValue=\"{{800}}\" value=\"{= activeVal =}\">\r\n        </input-number>\r\n        <!-- <span class=\"<%= styles.suffix %>\">%</span> -->\r\n    </div>\r\n    <!-- <span class=\"iconfont\">&#xe71d;</span> -->\r\n    <span class=\"iconfont\">{{suffix|raw}}</span>\r\n</div>";

var styles$d = {"common_font":"index-module_common_font__niHsZ","text_overflow":"index-module_text_overflow__COYLB","select":"index-module_select__2NwCG","value":"index-module_value__4778I","suffix":"index-module_suffix__bXZSl","active":"index-module_active__zruap"};

var html$6 = "<div class=\"<%= styles.options %>\" style=\"{{optionsStyle}}\">\r\n    <div s-for=\"option in options\" class=\"<%= styles.option %> {{activeVal===option.val ? '<%= styles.active %>':''}}\" on-click=\"events.optionClick($event,option)\">{{option.text}}</div>\r\n</div>";

var styles$c = {"common_font":"index-module_common_font__Sz-yv","text_overflow":"index-module_text_overflow__MHvJv","options":"index-module_options__BzSRC","option":"index-module_option__7PE8z","active":"index-module_active__Xn-PG"};

var eventMap = {};
var Options = defineComponent({
    template: template$6(html$6)({ styles: styles$c }),
    attached: function () {
        var _this = this;
        var id = this.id;
        eventMap[id] = function () {
            _this.events.documentClick.call(_this);
        };
        // this.events.documentClick = this.events.documentClick.bind(this);
        eventUtil.addHandler(document, "click", eventMap[id]);
        eventUtil.addHandler(window, "resize", eventMap[id]);
    },
    detached: function () {
        var id = this.id;
        eventUtil.removeHandler(document, "click", eventMap[id]);
        eventUtil.removeHandler(window, "resize", eventMap[id]);
    },
    initData: function () {
        return {
            options: [],
            show: false,
            top: 0,
            left: 0,
            baseEleKey: createId()
        };
    },
    computed: {
        optionsStyle: function () {
            var show = this.data.get("show");
            if (!show) {
                return "display: none";
            }
            var mod = this.data.get("mod") || "contextmenu";
            var offset = this.data.get("offset") || {};
            if (typeof offset.x === "undefined") {
                offset.x = 0;
            }
            if (typeof offset.y === "undefined") {
                offset.y = 0;
            }
            var x = this.data.get("x");
            var y = this.data.get("y");
            var isHaveX = typeof x === "number";
            var isHaveY = typeof y === "number";
            switch (mod) {
                case "contextmenu":
                    break;
                case "options":
                    if (isHaveX && isHaveY) {
                        break;
                    }
                    var datas = getAppDataStore(this.data.get("appId"));
                    var baseEle = datas.get(this.data.get("baseEleKey"));
                    var rect = getBoundingClientRect(baseEle);
                    if (!isHaveX) {
                        x = rect.x + offset.x;
                    }
                    if (!isHaveY) {
                        y = rect.y + rect.height + offset.y;
                    }
                    break;
                default:
                    return "display: none";
            }
            return "left:".concat(x, "px;top:").concat(y, "px;");
        }
    },
    events: {
        documentClick: function () {
            this.data.set("show", false);
        },
        optionClick: function (event, option) {
            // const optionsClickFn = this.data.get("optionClick");
            // if (optionsClickFn) {
            //   optionsClickFn(event, option.val, option);
            //   return;
            // }
            this.data.set("activeVal", option.val);
            this.fire("optionClick", option);
        }
    },
    setBaseEle: function (ele) {
        var baseEleKey = this.data.get("baseEleKey");
        getAppDataStore(this.data.get("appId"))
            .set(baseEleKey, ele || document.body);
    },
    getBaseEle: function () {
        var baseEleKey = this.data.get("baseEleKey");
        var ele = getAppDataStore(this.data.get("appId"))
            .get(baseEleKey);
        if (!ele) {
            ele = document.body;
            this.setBaseEle(ele);
        }
        return ele;
    },
    disposed: function () {
        getAppDataStore(this.data.get("appId"))
            .remove(this.data.get("baseEleKey"));
        eventUtil.removeHandler(document.body || document.getElementsByTagName("body")[0], "click", this.events.documentClick);
        eventUtil.removeHandler(window, "resize", this.events.documentClick);
    }
});

var Select = defineComponent({
    template: template$6(html$7)({ styles: styles$d }),
    components: {
        "input-number": InputNumber
    },
    attached: function () {
        // const optionsInterface = (this.ref(
        //   "optionsRef"
        // ) as any) as OptionsInterface;
        // optionsInterface.setBaseEle(this.el as any);
        console.log("初始化...");
        if (!this.OptionsComponent) {
            this.OptionsComponent = new Options({
                owner: this,
                source: "<c-options style={{optionsStyle}} on-optionClick=\"events.optionsClick($event)\" s-ref=\"optionsRef\" offset={{{y:2}}} mod=\"options\" show=\"{= showOptions =}\" activeVal=\"{= activeVal =}\" options=\"{{options}}\"></c-options>"
            });
            this.OptionsComponent.attach(document.body);
        }
        this.OptionsComponent.setBaseEle(this.el);
    },
    initData: function () {
        return {
            showOptions: false,
            activeVal: 1,
            options: [],
            suffix: "&#xe71d;"
        };
    },
    computed: {
        activeText: function () {
            var activeVal = this.data.get("activeVal");
            var options = this.data.get("options") || [];
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                if (option.val === activeVal) {
                    return option.text;
                }
            }
            return "";
        }
    },
    events: {
        selectClick: function (event) {
            this.data.set("showOptions", true);
        },
        optionsClick: function (val) {
            this.fire("change", val.val);
        },
        inputChange: function (val) {
            this.fire("change", val);
        }
    }
});

var ToolScale = defineComponent({
    components: {
        "c-select": Select
    },
    template: template$6(html$8)({ styles: styles$f }),
    attached: function () {
        this.events.bookmarkChange = this.events.bookmarkChange.bind(this);
        this.events.scalChange = this.events.scalChange.bind(this);
        this.app.addListener("bookmarkChange", this.events.bookmarkChange);
    },
    disposed: function () {
        this.app.removeListener("bookmarkChange", this.events.bookmarkChange);
    },
    initData: function () {
        return {};
    },
    events: {
        scalChange: function (scale) {
            var activeVal = this.data.get("activeVal");
            scale = parseInt(scale * 100 + "");
            if (activeVal === scale) {
                return;
            }
            // const options = this.data.get("options");
            // let optionsVals: number[] = [];
            // for (let i = 0; i < options.length; i++) {
            //   optionsVals.push(options[i].val);
            // }
            // if (optionsVals.includes(scale)) {
            //   this.data.set("activeVal", scale);
            //   return;
            // }
            // optionsVals = optionsVals.sort((a, b) => (a > b ? a : b));
            // for (let i = 0; i < optionsVals.length; i++) {
            //   if (scale < optionsVals[i]) {
            //     this.data.set("activeVal", scale);
            //     return;
            //   }
            // }
            this.data.set("activeVal", scale);
        },
        bookmarkChange: function (app, currentBookmark) {
            if (!currentBookmark || currentBookmark.index === -1) {
                return;
            }
            currentBookmark.parserWrapperInfo.parserInterface.addListener("scaleChange", this.events.scalChange);
            var scale = currentBookmark.parserWrapperInfo.parserInterface.getScale();
            this.data.set("activeVal", parseInt(scale * 100 + ""));
        },
        valChange: function (val) {
            this.app
                .currentBookmark()
                .parserWrapperInfo.parserInterface.setScale(val / 100);
        }
    }
});

var html$5 = "<div on-click=\"openFile\" class=\"<%= styles.content %>\">\r\n    <img src=\"data:image/png;base64,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\">\r\n</div>";

var styles$b = {"content":"index-module_content__2P82G"};

var TempReaderContent = defineComponent({
    template: template$6(html$5)({ styles: styles$b }),
    openFile: function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.app.getReader().selectFile()];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, result.loadFile()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
});

function showSupportScale(app) {
    return app.currentBookmark().parserWrapperInfo.parserInfo.support.scale;
}
function showSupportFull(mod) {
    if (mod === "content") {
        return function (app) {
            var full = app.currentBookmark().parserWrapperInfo.parserInfo.support
                .full;
            return full && full.content;
        };
    }
    if (mod === "width") {
        return function (app) {
            var full = app.currentBookmark().parserWrapperInfo.parserInfo.support
                .full;
            return full && full.width;
        };
    }
    return function () {
        return false;
    };
}
function _bindListener(eventListenerInterface, name, callback, self) {
    eventListenerInterface.removeListener(name, callback);
    callback = callback.srcFn || callback;
    var tempCallback = callback.bind(self);
    tempCallback.srcFn = callback;
    // const tempCallback = callback.bind(self);
    eventListenerInterface.addListener(name, tempCallback);
    return tempCallback;
}
var scaleBookmarkChange = function (app, current) {
    if (!current || !current.id) {
        return;
    }
    if (current.parserWrapperInfo.parserInterface.getScale() === this.scale &&
        !this.active) {
        this.active = true;
        this.update(this);
    }
    else if (this.active) {
        this.active = false;
        this.update(this);
    }
};
var scaleChange = function (scale) {
    if (scale === this.scale && !this.active) {
        this.active = true;
        this.update(this);
    }
    else if (this.active) {
        this.active = false;
        this.update(this);
    }
};
function actualSizeAttached(app) {
    this.scale = 1;
    scaleBookmarkChange = _bindListener(app, "bookmarkChange", scaleBookmarkChange, this);
    scaleChange = _bindListener(app.getReader(), "scaleChange", scaleChange, this);
}
var suitableScaleBookmarkChange = scaleBookmarkChange;
var suitableScaleChange = scaleChange;
function suitablePageAttached(app) {
    this.scale = 0.8;
    suitableScaleBookmarkChange = _bindListener(app, "bookmarkChange", suitableScaleBookmarkChange, this);
    suitableScaleChange = _bindListener(app.getReader(), "scaleChange", suitableScaleChange, this);
}
var selectOrMoveBookmarkChange = function (app, current) {
    if (!current || !current.id) {
        return;
    }
    if (this.text === "移动") {
        var pageSupport = current.parserWrapperInfo.parserInfo.support.pages;
        if (pageSupport &&
            pageSupport.moduleSwitch &&
            !pageSupport.moduleSwitch.select) {
            if (!this.active) {
                this.active = true;
                this.update(this);
            }
        }
        return;
    }
    var mod = current.parserWrapperInfo.parserInterface.getMode();
    var selectNode = this;
    var moveNode = this.selector.next();
    var disabledNodeInfo;
    var activeNodeInfo;
    switch (mod) {
        case "move":
            disabledNodeInfo = selectNode;
            activeNodeInfo = moveNode;
            break;
        case "select":
            disabledNodeInfo = moveNode;
            activeNodeInfo = selectNode;
            break;
        default:
            return;
    }
    if (!activeNodeInfo.active) {
        activeNodeInfo.active = true;
        activeNodeInfo.update(activeNodeInfo);
    }
    if (disabledNodeInfo.active) {
        disabledNodeInfo.active = false;
        disabledNodeInfo.update(disabledNodeInfo);
    }
};
var _selectOrMoveAttached = selectOrMoveBookmarkChange;
function selectOrMoveAttached(app) {
    var callback = _bindListener(app, "bookmarkChange", this.text === "选择" ? _selectOrMoveAttached : selectOrMoveBookmarkChange, this);
    if (this.text === "选择") {
        _selectOrMoveAttached = callback;
    }
    else {
        selectOrMoveBookmarkChange = callback;
    }
}
// export function selectDisabledHandler(this: NodeInfoThis) {
// }
function jumpBtnGroupCheckFn(app, currentBookmark) {
    if (!currentBookmark || !currentBookmark.id) {
        return;
    }
    var parserInterface = currentBookmark.parserWrapperInfo.parserInterface;
    var numPages = parserInterface.getNumPages();
    var nowPageNo = parserInterface.nowPageNo();
    var haveDisabled = this.className.includes(" " + styles$f.disabled);
    if (this.title === "跳转到首页" || this.title === "上一页") {
        if (nowPageNo <= 1) {
            if (haveDisabled) {
                return;
            }
            this.className += " " + styles$f.disabled;
            this.update();
        }
        else if (haveDisabled) {
            this.className = this.className.split(" " + styles$f.disabled).join("");
            this.update();
        }
        return;
    }
    if (this.title === "下一页" || this.title === "跳转到尾页") {
        if (nowPageNo >= numPages) {
            if (haveDisabled) {
                return;
            }
            this.className += " " + styles$f.disabled;
            this.update();
        }
        else if (haveDisabled) {
            this.className = this.className.split(" " + styles$f.disabled).join("");
            this.update();
        }
        return;
    }
}
function jumpBtnGroupCheckAttached(app) {
    var self = this;
    if (self._bookmarkChangeFn) {
        app.removeListener("bookmarkChange", self._bookmarkChangeFn);
    }
    self._bookmarkChangeFn = _bindListener(app, "bookmarkChange", jumpBtnGroupCheckFn, self);
    if (self._pageNoChangeFn) {
        app.getReader().removeListener("pageNoChange", self._pageNoChangeFn);
    }
    self._pageNoChangeFn = function (pageNo) {
        self._bookmarkChangeFn(app, app.currentBookmark());
    };
    app.getReader().addListener("pageNoChange", self._pageNoChangeFn);
}
function supportJumpPage(app) {
    var supportPages = app.currentBookmark().parserWrapperInfo.parserInfo
        .support.pages;
    return supportPages && supportPages.jump;
}

var html$4 = "<div class=\"<%= styles.sealSelectMask %> {{maskHideClassName}}\">\r\n  <div style=\"{{sealSelectStyles}}\" class=\"<%= styles.sealSelect %>\">\r\n    <div class=\"<%= styles.title %>\">\r\n      <div class=\"<%= styles.text %>\">{{titleText}}</div>\r\n      <span class=\"iconfont <%= styles.close %>\" on-click=\"events.closeClick()\">&#xe600;</span>\r\n    </div>\r\n    <div class=\"<%= styles.contents %>\">\r\n      <div class=\"<%= styles.label %>\">\r\n        印章选择\r\n      </div>\r\n      <div class=\"<%= styles.sealContent %>\">\r\n        <fragment s-for=\"sealInfo in sealList\">\r\n          <div on-click=\"events.sealClick(sealInfo)\" class=\"<%= styles.seal %> {{activeSeal.id === sealInfo.id ? '<%= styles.active %>' : ''}}\">\r\n            <img width=\"150\" src=\"{{sealInfo.imgUrl}}\">\r\n          </div>\r\n        </fragment>\r\n      </div>\r\n      <div s-show=\"isPageSign\" class=\"<%= styles.label %>\">\r\n        页面选项设置\r\n      </div>\r\n      <div s-show=\"isPageSign\" class=\"<%= styles.pageConfigSetting %>\">\r\n        <div class=\"<%= styles.radio %>\">\r\n          <img on-click=\"events.radioSelectAllPages('allPages')\" s-show=\"{{radioSelectStatus !== 'allPages'}}\" src=\"{{radioSelectNoImg}}\" width=\"14\" height=\"14\">\r\n          <img s-show=\"{{radioSelectStatus === 'allPages'}}\" src=\"{{radioSelectImg}}\" width=\"14\" height=\"14\">\r\n          <label on-click=\"events.radioSelectAllPages('allPages')\">全部页面</label>\r\n        </div>\r\n        <div class=\"<%= styles.radio %>\">\r\n          <img on-click=\"events.radioSelectAllPages('custom')\" s-show=\"{{radioSelectStatus !== 'custom'}}\" src=\"{{radioSelectNoImg}}\" width=\"14\" height=\"14\">\r\n          <img s-show=\"{{radioSelectStatus === 'custom'}}\" src=\"{{radioSelectImg}}\" width=\"14\" height=\"14\">\r\n          <label on-click=\"events.radioSelectAllPages('custom')\">自定义页面设置</label>\r\n          <input value=\"{= customPageInputVal =}\" on-keydown=\"events.customPageInputKeyDown($event)\" s-show=\"{{radioSelectStatus === 'custom'}}\" class=\"<%= styles.pageNumSelect %>\">\r\n          <span s-show=\"{{radioSelectStatus === 'custom'}}\" class=\"<%= styles.prompt %>\">格式示例：1-2;4;6</span>\r\n        </div>\r\n      </div>\r\n      <div s-show=\"isPageSign\" class=\"<%= styles.pageConfigSetting %>\">\r\n        <div class=\"<%= styles.checkbox %>\">\r\n          <img on-click=\"events.checkboxChange()\" s-show=\"{{checkboxOk}}\" width=\"14\" height=\"14\" src=\"{{selectImg}}\">\r\n          <img on-click=\"events.checkboxChange()\" s-show=\"{{!checkboxOk}}\" width=\"14\" height=\"14\" src=\"{{selectNoImg}}\">\r\n          <label on-click=\"events.checkboxChange()\">需手动对位置再调整</label>\r\n        </div>\r\n      </div>\r\n      <div s-show=\"isQiFenSign\" class=\"<%= styles.label %>\">\r\n        页面选择\r\n      </div>\r\n      <div s-show=\"isQiFenSign\" class=\"<%= styles.OddChoice %>\">\r\n        <div class=\"<%= styles.label %>\">\r\n          奇偶选择\r\n        </div>\r\n        <ui-select style=\"width: 249px; float: left;\" activeVal=\"{= qiFenPageSealMode =}\" options=\"{{oddSwitchOption}}\" optionsStyle=\"width: 249px;\"></ui-select>\r\n      </div>\r\n      <div s-show=\"isQiFenSign\" style=\"margin-top: 90px;\" class=\"<%= styles.label %>\">\r\n        印章显示设置\r\n      </div>\r\n      <div s-show=\"isQiFenSign\" class=\"<%= styles.sealShow %>\">\r\n        <div class=\"<%= styles.label %>\">\r\n          多少页显示一个印章\r\n        </div>\r\n        <ui-inputNumber defaultValue=\"{{1}}\" minValue=\"{{1}}\" maxValue=\"{{4}}\" value=\"{= oneSealInPageNumVal =}\" style=\"margin-left: 3px; height: 23px; line-height: 23px;\"></ui-inputNumber>\r\n      </div>\r\n    </div>\r\n    <div class=\"<%= styles.btnGroup %>\">\r\n      <div on-click=\"events.okClick()\" class=\"<%= styles.okBtn %> {{disabled}}\">\r\n        确定\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n";

var styles$a = {"sealSelectMask":"index-module_sealSelectMask__vmm9t","hide":"index-module_hide__mFEJS","sealSelect":"index-module_sealSelect__ne38o","title":"index-module_title__9-hxx","close":"index-module_close__5YfKo","text":"index-module_text__fZ6fQ","contents":"index-module_contents__BtrD8","label":"index-module_label__5Byyv","sealContent":"index-module_sealContent__JKVre","seal":"index-module_seal__961BL","active":"index-module_active__DHS0n","pageConfigSetting":"index-module_pageConfigSetting__Clay7","radio":"index-module_radio__IkG1h","pageNumSelect":"index-module_pageNumSelect__T9lMp","prompt":"index-module_prompt__oyAHw","checkbox":"index-module_checkbox__XQU04","OddChoice":"index-module_OddChoice__GtIUf","sealShow":"index-module_sealShow__9ZiBO","btnGroup":"index-module_btnGroup__I02WV","okBtn":"index-module_okBtn__WDAew","disabled":"index-module_disabled__CjHxO"};

function base64ToBlob(base64Data) {
    var arr = base64Data.split(","), fileType = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), l = bstr.length, u8Arr = new Uint8Array(l);
    while (l--) {
        u8Arr[l] = bstr.charCodeAt(l);
    }
    return new Blob([u8Arr], {
        type: fileType
    });
}
var mulSlectNoB64Url = window.URL.createObjectURL(base64ToBlob("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABoSURBVHgB7dKxDYAwDATAx8oAjMAKbESbDiaADSijTMMIrOARMoHhIzGAoUR56Tuf3HyXUppEZAfQwxdlt0C0mtkYY1SP4qOB5kTO+cLLVCP4mAb/A0udkRc8txq404XbOzgjLy7sfAMvcB922fU/cwAAAABJRU5ErkJggg=="));
var mulSelectB64Url = window.URL.createObjectURL(base64ToBlob("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAzSURBVHgBzc+rEQAwCATRhUpw6Sf9zwSXMvLxMFie3TMnY+4FGJGDaxo/wZRCl4Gn9d28etwHTv9XB30AAAAASUVORK5CYII="));
var radioSelectNoB64Url = window.URL.createObjectURL(base64ToBlob("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEZSURBVHgBnZLNbYNAEIV3l4hzSnAJuIKQDtJB2BNCHHAHsUvwBQQXSAfpIEoFbAmUkDMINu85uxKylJhkpLGHYb5h/qRYSdu29+M4HmA+Q3f0SSnNsizGWnvKsmzwscobVVUlgHqYFsFJmqaSOk2TVkoJaF+W5cHHS/7UdU1HgcyP66xrQeId4HeYRyR8lc7RA9r/BF3DYRjuVRAEL6j/7RZEcTEdWiruYETzPGuxUVDZB77asj8r/ihklPinEBzQdLwVaJomwp8h2KHmB7FdCgzTKIz2jIeEo75FMAbQE69Iaa0/MakT9/Mb7HcI6Mi1SP/CXc9lp1jPOc9z44AYQCy+7/dyNfTL66zuIDiAyLkHaMeWWJ2P/QLo55PerNdCZgAAAABJRU5ErkJggg=="));
var radioSelectB64Url = window.URL.createObjectURL(base64ToBlob("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACWSURBVHgBfZBNEcIwEIXf22HawAkcFAdYqAMcgAOQgATqoDioAyzEAZHQY+CQJcv0wPCT77YzX/L2LZFptrelE3dUYGcjFIHEJaZ4DsN6pAkV6yvJDT5QVf/QezubfvgSDHtY0R1kivgLgb28dijTmBSKSi5hcX3RUfSySK6D0v8WcjvETvywGudat5pweosONlt9u9MTLiw67xd19lYAAAAASUVORK5CYII="));

var SealSelect = defineComponent({
    components: {
        "ui-select": Select,
        "ui-inputNumber": InputNumber
    },
    template: template$6(html$4)({ styles: styles$a }),
    initData: function () {
        return {
            mode: "seal",
            sealList: [],
            customPageInputVal: "",
            maskHideClassName: styles$a.hide,
            selectImg: mulSelectB64Url,
            selectNoImg: mulSlectNoB64Url,
            radioSelectImg: radioSelectB64Url,
            radioSelectNoImg: radioSelectNoB64Url,
            radioSelectStatus: "allPages",
            checkboxOk: false,
            qiFenPageSealMode: "all",
            oddSwitchOption: [
                { val: "all", text: "所有页面" },
                { val: "odd", text: "奇数页面" },
                { val: "even", text: "偶数页面" },
            ],
            oneSealInPageNumVal: "1"
        };
    },
    attached: function () {
        this.events.documentKeyHandle = this.events.documentKeyHandle.bind(this);
        this.events.closeClick = this.events.closeClick.bind(this);
        this.events.okClick = this.events.okClick.bind(this);
    },
    computed: {
        disabled: function () {
            return !this.data.get("activeSeal") ? styles$a.disabled : "";
        },
        sealSelectStyles: function () {
            var height = 601;
            var mode = this.data.get("mode");
            if (mode === "seal") {
                height = 360;
            }
            return "height: ".concat(height, "px;margin-top: ").concat(-height / 2, "px;");
        },
        titleText: function () {
            var text = "多页签章";
            var mode = this.data.get("mode");
            if (mode === "seal") {
                text = "印章选择";
            }
            return text;
        },
        isPageSign: function () {
            return this.data.get("mode") === "pages";
        },
        isQiFenSign: function () {
            return this.data.get("mode") === "qiFeng";
        }
    },
    _selectSeal: function (sealList, mode) {
        var _this = this;
        mode = mode || "seal";
        if (this.data.get("maskHideClassName") !== styles$a.hide) {
            throw new Error("选择器被锁定");
        }
        var res = new Promise(function (resolve, reject) {
            _this._waitResult = { resolve: resolve, reject: reject };
        });
        if (mode === "pages") {
            this.data.set("radioSelectStatus", "allPages");
            this.data.set("checkboxOk", false);
            this.data.set("customPageInputVal", "");
        }
        else if (mode === "qiFeng") {
            this.data.set("qiFenPageSealMode", "all");
            this.data.set("oneSealInPageNumVal", "1");
        }
        this.data.set("maskHideClassName", undefined);
        this.data.set("activeSeal", undefined);
        this.data.set("sealList", __spreadArray([], sealList, true));
        this.data.set("mode", mode);
        document.addEventListener("keydown", this.events.documentKeyHandle);
        return res;
    },
    selectSeal: function (sealList) {
        return this._selectSeal(sealList, "seal");
    },
    selectSealMultipage: function (sealList) {
        return this._selectSeal(sealList, "pages");
    },
    selectSealQiFen: function (sealList) {
        return this._selectSeal(sealList, "qiFeng");
    },
    events: {
        documentKeyHandle: function (event) {
            if (event.key === "Escape") {
                this.events.closeClick();
            }
            else if (event.key === "Enter") {
                this.events.okClick();
            }
        },
        customPageInputKeyDown: function (event) {
            var keyCode = event.keyCode;
            var allow = (keyCode >= 48 && keyCode <= 57) ||
                keyCode === 189 ||
                keyCode === 186 ||
                keyCode === 8 ||
                keyCode === 46 ||
                (keyCode >= 37 && keyCode <= 40);
            if (!allow) {
                event.preventDefault();
            }
        },
        checkboxChange: function () {
            this.data.set("checkboxOk", !this.data.get("checkboxOk"));
        },
        radioSelectAllPages: function (active) {
            this.data.set("radioSelectStatus", active);
        },
        sealClick: function (sealInfo) {
            this.data.set("activeSeal", sealInfo);
        },
        okClick: function () {
            var activeSeal = this.data.get("activeSeal");
            if (!activeSeal) {
                return;
            }
            document.removeEventListener("keydown", this.events.documentKeyHandle);
            var resultData = {
                cancel: false,
                sealInfo: activeSeal
            };
            var mode = this.data.get("mode");
            if (mode === "pages") {
                resultData.manual = this.data.get("checkboxOk");
                var selectMode = this.data.get("radioSelectStatus");
                resultData.selectMode = selectMode;
                if (selectMode === "custom") {
                    var customPageInputVal = this.data.get("customPageInputVal");
                    if (customPageInputVal) {
                        var customPageNoList = [];
                        var valList = customPageInputVal.split(";");
                        for (var i = 0; i < valList.length; i++) {
                            var val = valList[i];
                            var numValStr = val.split("-");
                            for (var j = 0; j < numValStr.length; j++) {
                                var numVal = parseInt(numValStr[j]);
                                if (isNaN(numVal)) {
                                    continue;
                                }
                                if (!customPageNoList.includes(numVal)) {
                                    customPageNoList.push(numVal);
                                }
                                var nexVal = parseInt(numValStr[j + 1]);
                                if (!isNaN(nexVal)) {
                                    var val_1 = nexVal - numVal;
                                    if (val_1 > 1) {
                                        for (var k = 1; k <= val_1; k++) {
                                            numVal += 1;
                                            if (customPageNoList.includes(numVal)) {
                                                continue;
                                            }
                                            customPageNoList.push(numVal);
                                        }
                                        continue;
                                    }
                                }
                            }
                        }
                        resultData.customPageNos = customPageNoList.sort(function (a, b) { return a - b; });
                    }
                }
            }
            else if (mode === "qiFeng") {
                resultData.modSwitch = this.data.get("qiFenPageSealMode");
                resultData.oneSealInPageNum = parseInt(this.data.get("oneSealInPageNumVal"));
            }
            this.data.set("sealList", []);
            this.data.set("maskHideClassName", styles$a.hide);
            this.data.set("activeSeal", undefined);
            this._waitResult &&
                this._waitResult.resolve &&
                this._waitResult.resolve(resultData);
            this._waitResult = undefined;
        },
        closeClick: function () {
            document.removeEventListener("keydown", this.events.documentKeyHandle);
            this.data.set("sealList", []);
            this.data.set("maskHideClassName", styles$a.hide);
            this.data.set("activeSeal", undefined);
            this._waitResult &&
                this._waitResult.resolve &&
                this._waitResult.resolve({ cancel: true });
            this._waitResult = undefined;
        }
    }
});

var html$3 = "<div style=\"display: {{show?'block':'none'}}\" class=\"<%= styles.finder %>\">\r\n  <div s-ref=\"ref-title\" class=\"<%= styles.title %>\" on-mousedown=\"events.titleMouseDown($event)\" on-mouseup=\"events.titleMouseUp($event)\">\r\n    <span class=\"<%= styles.text %>\">PIN码</span>\r\n    <img on-click=\"hide()\" id=\"<%= styles.close %>\" title=\"关闭\" src=\"data:image/png;base64,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\">\r\n  </div>\r\n  <div class=\"<%= styles.content %>\">\r\n    <div class=\"<%= styles.form %>\">\r\n      <label for=\"<%= styles.keyword %>\">关键字:</label>\r\n      <input id=\"<%= styles.keyword %>\" type=\"text\">\r\n    </div>\r\n    <div class=\"<%= styles.btnGroup %>\">\r\n      <div class=\"<%= styles.nexBtn %>\">下一个</div>\r\n      <div>上一个</div>\r\n    </div>\r\n  </div>\r\n</div>\r\n";

var styles$9 = {"finder":"index-module_finder__xACI2","title":"index-module_title__ZtCSw","text":"index-module_text__1MAXO","close":"index-module_close__ljqi8","content":"index-module_content__rurra","form":"index-module_form__ySfkk","keyword":"index-module_keyword__nrmX8","btnGroup":"index-module_btnGroup__9X1C-","nexBtn":"index-module_nexBtn__K5uoa"};

var Finder = defineComponent({
    template: template$6(html$3)({ styles: styles$9 }),
    initData: function () {
        return {
            show: false
        };
    },
    attached: function () {
        this.events.titleMouseMove = this.events.titleMouseMove.bind(this);
    },
    show: function () {
        this.data.set("show", true);
    },
    hide: function () {
        this.data.set("show", false);
    },
    events: {
        titleMouseDown: function (event) {
            var x = event.x;
            var y = event.y;
            var titleEle = this.ref("ref-title");
            var _a = getBoundingClientRect(titleEle), left = _a.left, top = _a.top;
            this.titleDragWidth = x - left;
            this.titleDragHeight = y - top;
            document.addEventListener("mousemove", this.events.titleMouseMove);
        },
        titleMouseUp: function () {
            document.removeEventListener("mousemove", this.events.titleMouseMove);
        },
        titleMouseMove: function (event) {
            var currentEl = this.el;
            var _a = getBoundingClientRect(currentEl.parentElement), top = _a.top, left = _a.left;
            currentEl.style.left = event.x - left - this.titleDragWidth + "px";
            currentEl.style.top = event.y - top - this.titleDragHeight + "px";
        }
    }
});

var styles$8 = {"maskContainer":"index-module_maskContainer__UnC16","modalContainer":"index-module_modalContainer__ce5hx","modalTitle":"index-module_modalTitle__9fvly","modalBody":"index-module_modalBody__mRzSv","inputBox":"index-module_inputBox__d9QST","btnBox":"index-module_btnBox__gofu2","btnActive":"index-module_btnActive__0lQeF","btnDisable":"index-module_btnDisable__qUjRs"};

function newGuid$1() {
    var curguid = "";
    for (var i = 1; i <= 32; i++) {
        var id = Math.floor(Math.random() * 16.0).toString(16);
        curguid += id;
        if (i === 8 || i === 12 || i === 16 || i === 20)
            curguid += "";
    }
    return "a".concat(curguid);
}
function GetKeyword(root) {
    return new Promise(function (resolve) {
        var elementGuid = newGuid$1();
        var closeBtnId = newGuid$1();
        var confirmBtnId = newGuid$1();
        var inputId = newGuid$1();
        var element = "\n            <div id=\"".concat(elementGuid, "\" class=\"").concat(styles$8.maskContainer, "\" >\n                <div class=\"").concat(styles$8.modalContainer, "\" >\n                    <div class=\"").concat(styles$8.modalTitle, "\" >\n                        <div style=\"float:left;\" >\u67E5\u627E</div>\n                        <div style=\"float:right;cursor:pointer;\" id=\"").concat(closeBtnId, "\" >\u00D7</div>\n                    </div>\n                    <div class=\"").concat(styles$8.modalBody, "\" >\n                        <div class=\"").concat(styles$8.inputBox, "\" >\n                            <div style=\"width:61px;\" >\u5173\u952E\u5B57:</div>\n                            <div style=\"width:100%\" ><Input id=\"").concat(inputId, "\" /></div>\n                        </div>\n                        <div class=\"").concat(styles$8.btnBox, "\" >\n                            <button id=\"").concat(confirmBtnId, "\" class=\"").concat(styles$8.btnDisable, "\" >\u786E\u8BA4</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ");
        var div = document.createElement('div');
        div.innerHTML = element;
        var closeBtn = div.querySelector("#".concat(closeBtnId));
        closeBtn.onclick = function () {
            document.getElementById(elementGuid).remove();
            resolve({ opt: 'cancel' });
        };
        var input = div.querySelector("#".concat(inputId));
        var btn = div.querySelector("#".concat(confirmBtnId));
        input.onkeydown = function (ev) {
            if (input.value === undefined || input.value === null || input.value === '') {
                btn.className = styles$8.btnDisable;
            }
            else {
                btn.className = styles$8.btnActive;
            }
        };
        btn.onclick = function () {
            if (input.value === undefined || input.value === null || input.value === '') {
                return;
            }
            document.getElementById(elementGuid).remove();
            resolve({ opt: 'confirm', keyword: input.value });
        };
        (root || document.body).appendChild(div);
    });
}

new AsyncLock();
var sealSelectInterface;
var finderInterface;
function getSealSelectInterface(app) {
    if (!sealSelectInterface) {
        var sealSelectComponent = new SealSelect();
        sealSelectComponent.attach(app.getRootEle() || document.body);
        sealSelectInterface = sealSelectComponent;
    }
    return sealSelectInterface;
}
function getFinderInterface(app) {
    if (!finderInterface) {
        var finderComponent = new Finder();
        finderComponent.app = app;
        finderComponent.attach(app.getRootEle() || document.body);
        finderInterface = finderComponent;
    }
    return finderInterface;
}
// window.addEventListener("load", async () => {
//   lock.acquire("initSealSelectInterface", (done) => {
//     try {
//       // if (!verifySealWindowInterface) {
//       //   const verifySealWindowComponent = new VerifySealWindow();
//       //   verifySealWindowComponent.attach(document.body);
//       //   verifySealWindowInterface = verifySealWindowComponent as any;
//       // }
//       getSealSelectInterface((window as any).app).selectSealQiFen([
//         {
//           id: 1,
//           imgUrl:
//             "https://img0.baidu.com/it/u=3205828459,1269096295&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=513",
//         } as any,
//         {
//           id: 2,
//           imgUrl:
//             "https://img0.baidu.com/it/u=3205828459,1269096295&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=513",
//         } as any,
//         {
//           id: 3,
//           imgUrl:
//             "https://img0.baidu.com/it/u=3205828459,1269096295&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=513",
//         } as any,
//       ]);
//       // sealSelectInterface
//       //   .selectSealQiFen([
//       //     {
//       //       id: 1,
//       //       imgUrl:
//       //         "https://img0.baidu.com/it/u=3205828459,1269096295&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=513",
//       //     } as any,
//       //     {
//       //       id: 2,
//       //       imgUrl:
//       //         "https://img0.baidu.com/it/u=3205828459,1269096295&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=513",
//       //     } as any,
//       //     {
//       //       id: 3,
//       //       imgUrl:
//       //         "https://img0.baidu.com/it/u=3205828459,1269096295&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=513",
//       //     } as any,
//       //   ])
//       //   .then((res) => console.log(res));
//     } finally {
//       done();
//     }
//   });
// });
var fullBtnId = createId();
function narrowDisabledHandler(app) {
    var isDisabled = false;
    try {
        var scale = parseInt(app.currentBookmark().parserWrapperInfo.parserInterface.getScale() * 100 +
            "");
        var scalMinVal = scaleVals[0];
        if (scale <= scalMinVal) {
            isDisabled = true;
        }
    }
    catch (e) {
        isDisabled = false;
    }
    if (isDisabled && !this.className.includes("  " + styles$f.disabled)) {
        this.className += " " + styles$f.disabled;
        this.update(this);
    }
    else if (!isDisabled && this.className.includes(" " + styles$f.disabled)) {
        this.className = this.className.split(" ")[0];
        this.update(this);
    }
}
function enlargeDisabledHandle(app) {
    var isDisabled = false;
    try {
        var appInterface = app.currentBookmark().parserWrapperInfo
            .parserInterface;
        var scale = parseInt(appInterface.getScale() * 100 + "");
        var scaleMaxVal = scaleVals[scaleVals.length - 1];
        if (scale >= scaleMaxVal) {
            isDisabled = true;
        }
    }
    catch (e) {
        isDisabled = false;
    }
    if (isDisabled && !this.className.includes("  " + styles$f.disabled)) {
        this.className += " " + styles$f.disabled;
        this.update(this);
    }
    else if (!isDisabled && this.className.includes(" " + styles$f.disabled)) {
        this.className = this.className.split(" ")[0];
        this.update(this);
    }
}
function narrowOrEnlargeScaleChange(scale) {
    scale = parseInt(scale * 100 + "");
    var isNarrow = this.title === "缩小";
    var val = scaleVals[isNarrow ? 0 : scaleVals.length - 1];
    var isDisabled = isNarrow ? scale <= val : scale >= val;
    if (isDisabled) {
        if (!this.className.includes(" " + styles$f.disabled)) {
            this.className += " " + styles$f.disabled;
            this.update(this);
        }
    }
    else if (this.className.includes(" " + styles$f.disabled)) {
        this.className = this.className.split(" ")[0];
        this.update(this);
    }
}
// let _narrowScaleChange = narrowOrEnlargeScaleChange;
// let _EnlargeScaleChange = narrowOrEnlargeScaleChange;
var scaleOptions = [
    {
        val: 20,
        text: "20%"
    },
    {
        val: 50,
        text: "50%"
    },
    {
        val: 100,
        text: "100%"
    },
    {
        val: 200,
        text: "200%"
    },
    {
        val: 400,
        text: "400%"
    },
];
var scaleVals = scaleOptions.map(function (v) { return v.val; });
var headerTabsBtns = {
    open: {
        type: "default",
        disabled: true,
        nodeInfo: {
            text: "打开",
            html: "&#xe65e;",
            title: "打开文件",
            click: function (app) {
                return __awaiter(this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, app.getReader().selectFile()];
                            case 1:
                                result = _a.sent();
                                if (!result) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, result.loadFile()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
        }
    },
    save: {
        type: "default",
        needReader: true,
        nodeInfo: {
            text: "保存",
            html: "&#xe65c;",
            title: "保存"
        }
    },
    saveAs: {
        type: "default",
        needReader: true,
        nodeInfo: {
            text: "另存为",
            html: "&#xe65c;",
            title: "另存为"
        }
    },
    print: {
        type: "default",
        needReader: true,
        nodeInfo: {
            text: "打印",
            html: "&#xe65d;",
            title: "打印"
        }
    },
    jump: {
        type: "default",
        needReader: true,
        nodeInfo: {
            width: 80,
            render: function (app, nodeInfo, parent) {
                console.log("jump初始化");
                if (this._toolJump) {
                    this._toolJump.dispose();
                }
                this._toolJump = new ToolJump();
                this._toolJump.app = app;
                this._toolJump.attach(parent);
            },
            isShow: supportJumpPage
        }
    },
    select: {
        type: "default",
        needReader: true,
        nodeInfo: {
            text: "选择",
            title: "选择",
            html: "&#xe65f;",
            attached: selectOrMoveAttached,
            isShow: function (app) {
                var support = app.currentBookmark().parserWrapperInfo.parserInfo
                    .support.pages;
                return support && support.moduleSwitch && support.moduleSwitch.select;
            },
            click: function (app) {
                var current = app.currentBookmark();
                if (!current || !current.id) {
                    return;
                }
                current.parserWrapperInfo.parserInterface.setMode("select");
                var moveNodeInfo = this.selector.next();
                if (!this.active) {
                    this.active = true;
                    this.update();
                }
                if (moveNodeInfo.active) {
                    moveNodeInfo.active = false;
                    moveNodeInfo.update(moveNodeInfo);
                }
            }
        }
    },
    move: {
        type: "default",
        needReader: true,
        nodeInfo: {
            text: "移动",
            title: "移动",
            html: "&#xe660;",
            isShow: function (app) {
                var support = app.currentBookmark().parserWrapperInfo.parserInfo
                    .support.pages;
                return support && support.moduleSwitch && support.moduleSwitch.move;
            },
            attached: selectOrMoveAttached,
            // attached: selectOrMoveAttached,
            click: function (app) {
                var current = app.currentBookmark();
                if (!current || !current.id) {
                    return;
                }
                current.parserWrapperInfo.parserInterface.setMode("move");
                var selectNodeInfo = this.selector.prev();
                if (!this.active) {
                    this.active = true;
                    this.update();
                }
                if (selectNodeInfo.active) {
                    selectNodeInfo.active = false;
                    selectNodeInfo.update(selectNodeInfo);
                }
            }
        }
    },
    ActualSize: {
        type: "default",
        needReader: true,
        nodeInfo: {
            text: "实际大小",
            title: "实际大小",
            html: "&#xe661;",
            isShow: showSupportScale,
            attached: actualSizeAttached,
            click: function (app) {
                app.currentBookmark().parserWrapperInfo.parserInterface.setScale(1);
            }
        }
    },
    SuitableWidth: {
        type: "default",
        needReader: true,
        nodeInfo: {
            text: "适合宽度",
            title: "适合宽度",
            html: "&#xe662;",
            isShow: showSupportFull("width"),
            click: function (app) {
                app
                    .currentBookmark()
                    .parserWrapperInfo.parserInterface.setFull("width");
            }
        }
    },
    SuitablePage: {
        type: "default",
        needReader: true,
        nodeInfo: {
            text: "适合页面",
            title: "适合页面",
            html: "&#xe663;",
            attached: suitablePageAttached,
            click: function (app) {
                app.currentBookmark().parserWrapperInfo.parserInterface.setScale(0.8);
            }
        }
    },
    narrow: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe670;",
            needReader: true,
            title: "缩小",
            width: 24,
            className: styles$f.toolIconBtn,
            isShow: showSupportScale,
            attached: function (app) {
                var self = this;
                if (self._narrowDisabledHandler) {
                    app.removeListener("bookmarkChange", self._narrowDisabledHandler);
                }
                self._narrowDisabledHandler = narrowDisabledHandler.bind(this);
                app.addListener("bookmarkChange", self._narrowDisabledHandler);
                if (self._narrowScaleChange) {
                    app
                        .getReader()
                        .removeListener("scaleChange", self._narrowScaleChange);
                }
                self._narrowScaleChange = narrowOrEnlargeScaleChange.bind(this);
                app.getReader().addListener("scaleChange", self._narrowScaleChange);
            },
            click: function (app) {
                try {
                    var nextNodeInfo = this.selector.next();
                    if (nextNodeInfo.className.includes(" " + styles$f.disabled)) {
                        nextNodeInfo.className = nextNodeInfo.className.split(" ")[0];
                        nextNodeInfo.update(nextNodeInfo);
                    }
                    if (this.className.includes(" " + styles$f.disabled)) {
                        return;
                    }
                    var parserInterface = app.currentBookmark().parserWrapperInfo
                        .parserInterface;
                    var nowScale = parseInt(parserInterface.getScale() * 100 + "");
                    var index = scaleVals.indexOf(nowScale);
                    if (index === -1) {
                        for (var i = 1; i < scaleVals.length; i++) {
                            var val = scaleVals[i];
                            if (nowScale > val) {
                                index = i - 1;
                                break;
                            }
                        }
                    }
                    else {
                        index -= 1;
                    }
                    if (index <= 0) {
                        if (this.className.includes(" " + styles$f.disabled)) {
                            return;
                        }
                        this.className += " " + styles$f.disabled;
                        this.update(this);
                        if (index === -1) {
                            return;
                        }
                    }
                    else if (this.className.includes(" " + styles$f.disabled)) {
                        this.className = this.className.split(" ")[0];
                        this.update(this);
                    }
                    parserInterface.setScale(scaleVals[index] / 100);
                }
                catch (e) { }
            }
        }
    },
    scale: {
        type: "default",
        needReader: true,
        nodeInfo: {
            title: "缩放比率",
            width: 82,
            render: function (app, nodeInfo, parent) {
                if (this._toolscale) {
                    this._toolscale.dispose();
                }
                this._toolscale = new ToolScale({
                    data: {
                        activeVal: 100,
                        options: scaleOptions
                    }
                });
                this._toolscale.app = app;
                this._toolscale.attach(parent);
            },
            isShow: showSupportScale
        }
    },
    enlarge: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe671;",
            title: "放大",
            width: 24,
            className: styles$f.toolIconBtn,
            isShow: showSupportScale,
            attached: function (app) {
                var self = this;
                if (self._enlargeDisabledHandle) {
                    app.removeListener("bookmarkChange", self._enlargeDisabledHandle);
                }
                self._enlargeDisabledHandle = enlargeDisabledHandle.bind(this);
                app.addListener("bookmarkChange", self._enlargeDisabledHandle);
                if (self._EnlargeScaleChange) {
                    app
                        .getReader()
                        .removeListener("scaleChange", self._EnlargeScaleChange);
                }
                self._EnlargeScaleChange = narrowOrEnlargeScaleChange.bind(this);
                app.getReader().addListener("scaleChange", self._EnlargeScaleChange);
            },
            click: function (app) {
                var prevNodeInfo = this.selector.prev();
                if (prevNodeInfo.className.includes(" " + styles$f.disabled)) {
                    prevNodeInfo.className = prevNodeInfo.className.split(" ")[0];
                    prevNodeInfo.update(prevNodeInfo);
                }
                if (this.className.includes(" " + styles$f.disabled)) {
                    return;
                }
                try {
                    var parserInterface = app.currentBookmark().parserWrapperInfo
                        .parserInterface;
                    var nowScale = parseInt(parserInterface.getScale() * 100 + "");
                    var index = scaleVals.indexOf(nowScale);
                    if (index === -1) {
                        for (var i = 0; i < scaleVals.length; i++) {
                            var val = scaleVals[i];
                            if (val > nowScale) {
                                index = i;
                                break;
                            }
                        }
                    }
                    else {
                        index += 1;
                    }
                    if (index >= scaleVals.length - 1 || index === -1) {
                        if (this.className.includes(" " + styles$f.disabled)) {
                            return;
                        }
                        this.className += " " + styles$f.disabled;
                        this.update(this);
                        if (index >= scaleVals.length) {
                            return;
                        }
                    }
                    else if (this.className.includes(" " + styles$f.disabled)) {
                        this.className = this.className.split(" ")[0];
                        this.update(this);
                    }
                    parserInterface.setScale(scaleVals[index] / 100);
                }
                catch (e) { }
            }
        }
    },
    find: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe664;",
            title: "查找",
            text: "查找",
            isShow: function (app) {
                var pagesConfig = app.currentBookmark().parserWrapperInfo.parserInfo
                    .support.pages;
                return pagesConfig && pagesConfig.find;
            },
            click: function (app) {
                var finder = getFinderInterface(app);
                finder.show();
            }
        }
    },
    full: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe665;",
            title: "全屏",
            text: "全屏",
            isShow: showSupportFull("content"),
            click: function (app) {
                app
                    .currentBookmark()
                    .parserWrapperInfo.parserInterface.setFull("content");
            }
        }
    },
    preferenc: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe666;",
            title: "首选项",
            text: "首选项"
        }
    },
    sealDragAdd: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe610;",
            title: "手工签章",
            text: "手工签章",
            isShow: function (app) {
                var sealSupport = app.currentBookmark().parserWrapperInfo.parserInfo
                    .support.seal;
                if (!sealSupport ||
                    !sealSupport.sealList ||
                    !sealSupport.positionSeal) {
                    return false;
                }
                return true;
            },
            click: function (app, event) {
                return __awaiter(this, void 0, void 0, function () {
                    var currentBookmark, sealListResult, pwd, sealList, res, dragRes, sealPositionList, e_1;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                currentBookmark = app.currentBookmark();
                                if (!currentBookmark || !currentBookmark.id) {
                                    return [2 /*return*/];
                                }
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 6, 7, 8]);
                                return [4 /*yield*/, currentBookmark.parserWrapperInfo.parserInterface.sealList()];
                            case 2:
                                sealListResult = _b.sent();
                                if (!sealListResult) {
                                    return [2 /*return*/];
                                }
                                pwd = sealListResult.password;
                                sealList = sealListResult.sealList;
                                app.loading.hide();
                                return [4 /*yield*/, getSealSelectInterface(app).selectSeal(sealList)];
                            case 3:
                                res = _b.sent();
                                if (res.cancel) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, currentBookmark.parserWrapperInfo.parserInterface.sealDrag(res.sealInfo)];
                            case 4:
                                dragRes = _b.sent();
                                if (!dragRes || dragRes.length === 0) {
                                    app.message.success("签章操作已取消!", { timeout: 3000 });
                                    return [2 /*return*/];
                                }
                                app.loading.show("正在签署印章...");
                                sealPositionList = dragRes.map(function (res) {
                                    return {
                                        x: res.x,
                                        y: res.y,
                                        pageNo: res.pageNo
                                    };
                                });
                                return [4 /*yield*/, (_a = currentBookmark.parserWrapperInfo.parserInterface).signSealPositionList.apply(_a, __spreadArray([res.sealInfo,
                                        pwd], sealPositionList, false))];
                            case 5:
                                _b.sent();
                                app.message.success("手动签章成功");
                                return [3 /*break*/, 8];
                            case 6:
                                e_1 = _b.sent();
                                app.message.error(e_1.message || e_1);
                                return [3 /*break*/, 8];
                            case 7:
                                app.loading.hide();
                                return [7 /*endfinally*/];
                            case 8: return [2 /*return*/];
                        }
                    });
                });
            }
        }
    },
    sealQiFenAdd: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe675;",
            title: "骑缝签章",
            text: "骑缝签章",
            isShow: function (app) {
                var sealSupport = app.currentBookmark().parserWrapperInfo.parserInfo
                    .support.seal;
                if (!sealSupport ||
                    !sealSupport.sealList ||
                    !sealSupport.positionSeal) {
                    return false;
                }
                return true;
            },
            click: function (app) {
                return __awaiter(this, void 0, void 0, function () {
                    var currentBookmark, sealListResult, pwd, sealList, res_1, dragRes, sealPositionList, e_2;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                currentBookmark = app.currentBookmark();
                                if (!currentBookmark || !currentBookmark.id) {
                                    return [2 /*return*/];
                                }
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 6, 7, 8]);
                                return [4 /*yield*/, currentBookmark.parserWrapperInfo.parserInterface.sealList()];
                            case 2:
                                sealListResult = _b.sent();
                                if (!sealListResult) {
                                    return [2 /*return*/];
                                }
                                pwd = sealListResult.password;
                                sealList = sealListResult.sealList;
                                return [4 /*yield*/, getSealSelectInterface(app).selectSealQiFen(sealList)];
                            case 3:
                                res_1 = _b.sent();
                                if (res_1.cancel) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, currentBookmark.parserWrapperInfo.parserInterface.sealDrag(res_1.sealInfo, {
                                        mode: "qiFeng",
                                        qiFenConfig: {
                                            splitPageNum: res_1.oneSealInPageNum,
                                            sealMode: res_1.modSwitch
                                        }
                                    })];
                            case 4:
                                dragRes = _b.sent();
                                if (!dragRes || dragRes.length === 0) {
                                    app.message.success("签章操作已取消!", { timeout: 3000 });
                                    return [2 /*return*/];
                                }
                                app.loading.show("正在签署印章...");
                                sealPositionList = dragRes.map(function (r) {
                                    return {
                                        x: r.x,
                                        y: r.y,
                                        pageNo: r.pageNo,
                                        splitSize: res_1.oneSealInPageNum
                                    };
                                });
                                return [4 /*yield*/, (_a = currentBookmark.parserWrapperInfo.parserInterface).signSealQiFen.apply(_a, __spreadArray([res_1.sealInfo,
                                        pwd], sealPositionList, false))];
                            case 5:
                                _b.sent();
                                app.message.success("骑缝签章成功");
                                return [3 /*break*/, 8];
                            case 6:
                                e_2 = _b.sent();
                                app.message.error(e_2.message || e_2);
                                return [3 /*break*/, 8];
                            case 7:
                                app.loading.hide();
                                return [7 /*endfinally*/];
                            case 8: return [2 /*return*/];
                        }
                    });
                });
            }
        }
    },
    sealPagesDragAdd: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe677;",
            title: "多页签章",
            text: "多页签章",
            isShow: function (app) {
                var sealSupport = app.currentBookmark().parserWrapperInfo.parserInfo
                    .support.seal;
                if (!sealSupport ||
                    !sealSupport.sealList ||
                    !sealSupport.positionSeal) {
                    return false;
                }
                return true;
            },
            click: function (app, event) {
                return __awaiter(this, void 0, void 0, function () {
                    var currentBookmark, sealListResult, pwd, sealList, res, dragRes, sealPositionList, e_3;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                currentBookmark = app.currentBookmark();
                                if (!currentBookmark || !currentBookmark.id) {
                                    return [2 /*return*/];
                                }
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 6, 7, 8]);
                                return [4 /*yield*/, currentBookmark.parserWrapperInfo.parserInterface.sealList()];
                            case 2:
                                sealListResult = _b.sent();
                                if (!sealListResult) {
                                    return [2 /*return*/];
                                }
                                pwd = sealListResult.password;
                                sealList = sealListResult.sealList;
                                return [4 /*yield*/, getSealSelectInterface(app).selectSealMultipage(sealList)];
                            case 3:
                                res = _b.sent();
                                if (res.cancel) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, currentBookmark.parserWrapperInfo.parserInterface.sealDrag(res.sealInfo, {
                                        pageNo: res.customPageNos,
                                        mode: "multipage",
                                        allowManualPosition: res.manual
                                    })];
                            case 4:
                                dragRes = _b.sent();
                                app.loading.show("正在签署印章...");
                                sealPositionList = dragRes.map(function (res) {
                                    return {
                                        x: res.x,
                                        y: res.y,
                                        pageNo: res.pageNo
                                    };
                                });
                                return [4 /*yield*/, (_a = currentBookmark.parserWrapperInfo.parserInterface).signSealPositionList.apply(_a, __spreadArray([res.sealInfo,
                                        pwd], sealPositionList, false))];
                            case 5:
                                _b.sent();
                                app.message.success("多页签章成功!");
                                return [3 /*break*/, 8];
                            case 6:
                                e_3 = _b.sent();
                                app.message.error(e_3.message || e_3);
                                return [3 /*break*/, 8];
                            case 7:
                                app.loading.hide();
                                return [7 /*endfinally*/];
                            case 8: return [2 /*return*/];
                        }
                    });
                });
            }
        }
    },
    sealKeyword: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe610;",
            title: "关键字签章",
            text: "关键字签章",
            width: 60,
            isShow: function (app) {
                var sealSupport = app.currentBookmark().parserWrapperInfo.parserInfo
                    .support.seal;
                if (!sealSupport ||
                    !sealSupport.sealList ||
                    !sealSupport.positionSeal ||
                    !sealSupport.keywordSeal) {
                    return false;
                }
                return true;
            },
            click: function (app, event) {
                return __awaiter(this, void 0, void 0, function () {
                    var currentBookmark, sealListResult, pwd, sealList, res, keywordRsp, opt, keyword, e_4;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                currentBookmark = app.currentBookmark();
                                if (!currentBookmark || !currentBookmark.id) {
                                    return [2 /*return*/];
                                }
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 6, 7, 8]);
                                return [4 /*yield*/, currentBookmark.parserWrapperInfo.parserInterface.sealList()];
                            case 2:
                                sealListResult = _a.sent();
                                if (!sealListResult) {
                                    return [2 /*return*/];
                                }
                                pwd = sealListResult.password;
                                sealList = sealListResult.sealList;
                                app.loading.hide();
                                return [4 /*yield*/, getSealSelectInterface(app).selectSeal(sealList)];
                            case 3:
                                res = _a.sent();
                                if (res.cancel) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, GetKeyword(app.getRootEle())];
                            case 4:
                                keywordRsp = _a.sent();
                                opt = keywordRsp.opt, keyword = keywordRsp.keyword;
                                if (opt === "cancel") {
                                    return [2 /*return*/];
                                }
                                app.loading.show("正在签署印章...");
                                return [4 /*yield*/, currentBookmark.parserWrapperInfo.parserInterface.signSealKeyword(res.sealInfo, pwd, keyword)];
                            case 5:
                                _a.sent();
                                app.message.success("关键字签章成功!");
                                return [3 /*break*/, 8];
                            case 6:
                                e_4 = _a.sent();
                                app.message.error(e_4.message || e_4);
                                return [3 /*break*/, 8];
                            case 7:
                                app.loading.hide();
                                return [7 /*endfinally*/];
                            case 8: return [2 /*return*/];
                        }
                    });
                });
            }
        }
    },
    rotation: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe667;",
            title: "顺时针旋转",
            className: styles$f.toolIconBtn,
            width: 24,
            isShow: function (app) {
                return app.currentBookmark().parserWrapperInfo.parserInfo.support
                    .rotation;
            },
            click: function (app) {
                var currentBookmark = app.currentBookmark();
                if (!currentBookmark ||
                    !currentBookmark.id ||
                    !currentBookmark.parserWrapperInfo.parserInfo.support.rotation) {
                    return;
                }
                var rotation = currentBookmark.parserWrapperInfo.parserInterface.getRotation() + 90;
                currentBookmark.parserWrapperInfo.parserInterface.setRotation(rotation);
            }
        }
    },
    anticlockwiseRotation: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe669;",
            title: "逆时针旋转",
            className: styles$f.toolIconBtn,
            width: 24,
            isShow: function (app) {
                return app.currentBookmark().parserWrapperInfo.parserInfo.support
                    .rotation;
            },
            click: function (app) {
                var currentBookmark = app.currentBookmark();
                if (!currentBookmark ||
                    !currentBookmark.id ||
                    !currentBookmark.parserWrapperInfo.parserInfo.support.rotation) {
                    return;
                }
                var rotation = currentBookmark.parserWrapperInfo.parserInterface.getRotation() - 90;
                currentBookmark.parserWrapperInfo.parserInterface.setRotation(rotation);
            }
        }
    },
    jumpToHead: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe719;",
            title: "跳转到首页",
            className: styles$f.toolIconBtn,
            width: 24,
            attached: jumpBtnGroupCheckAttached,
            isShow: supportJumpPage,
            click: function (app) {
                if (this.className.includes(" " + styles$f.disabled)) {
                    return;
                }
                var currentBookmark = app.currentBookmark();
                if (!currentBookmark || !currentBookmark.id) {
                    return;
                }
                if (!this.className.includes(" " + styles$f.disabled)) {
                    this.className += " " + styles$f.disabled;
                    this.update();
                }
                currentBookmark.parserWrapperInfo.parserInterface.jumpTo(1);
            }
        }
    },
    jumpToPrev: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe615;",
            title: "上一页",
            className: styles$f.toolIconBtn,
            width: 24,
            attached: jumpBtnGroupCheckAttached,
            isShow: supportJumpPage,
            click: function (app) {
                if (this.className.includes(" " + styles$f.disabled)) {
                    return;
                }
                var currentBookmark = app.currentBookmark();
                if (!currentBookmark || !currentBookmark.id) {
                    return;
                }
                var nowPageNo = currentBookmark.parserWrapperInfo.parserInterface.nowPageNo() - 1;
                if (nowPageNo <= 1 && this.className.includes(" " + styles$f.disabled)) {
                    this.className += " " + styles$f.disabled;
                    this.update();
                }
                if (nowPageNo >= 1) {
                    currentBookmark.parserWrapperInfo.parserInterface.jumpTo(nowPageNo);
                }
            }
        }
    },
    jumpToNext: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe718;",
            title: "下一页",
            className: styles$f.toolIconBtn,
            width: 24,
            attached: jumpBtnGroupCheckAttached,
            isShow: supportJumpPage,
            click: function (app, event) {
                if (this.className.includes(" " + styles$f.disabled)) {
                    return;
                }
                var currentBookmark = app.currentBookmark();
                if (!currentBookmark || !currentBookmark.id) {
                    return;
                }
                var nowPageNo = currentBookmark.parserWrapperInfo.parserInterface.nowPageNo() + 1;
                var numPages = currentBookmark.parserWrapperInfo.parserInterface.getNumPages();
                if (nowPageNo >= numPages &&
                    this.className.includes(" " + styles$f.disabled)) {
                    this.className += " " + styles$f.disabled;
                    this.update();
                }
                if (nowPageNo <= numPages) {
                    currentBookmark.parserWrapperInfo.parserInterface.jumpTo(nowPageNo);
                }
            }
        }
    },
    jumpToEnd: {
        type: "default",
        needReader: true,
        nodeInfo: {
            html: "&#xe690;",
            title: "跳转到尾页",
            className: styles$f.toolIconBtn,
            width: 24,
            attached: jumpBtnGroupCheckAttached,
            isShow: supportJumpPage,
            click: function (app) {
                if (this.className.includes(" " + styles$f.disabled)) {
                    return;
                }
                var currentBookmark = app.currentBookmark();
                if (!currentBookmark || !currentBookmark.id) {
                    return;
                }
                var numPages = currentBookmark.parserWrapperInfo.parserInterface.getNumPages();
                if (!this.className.includes(" " + styles$f.disabled)) {
                    this.className += " " + styles$f.disabled;
                    this.update();
                }
                currentBookmark.parserWrapperInfo.parserInterface.jumpTo(numPages);
            }
        }
    }
};
var defaultData = {
    tabBtns: {
        close: {
            className: "iconfont",
            // html: "&#xeaf2;",
            html: "&#xe600;",
            title: "关闭",
            click: function (app) {
                app.destroy();
            }
        },
        full: {
            id: fullBtnId,
            className: "iconfont",
            html: "&#xe600;",
            title: "全屏",
            click: function (app) {
                var title = "全屏";
                if (isFullScreen()) {
                    exitFullscreen();
                }
                else {
                    full(app.getRootEle());
                    title = "还原";
                }
                var btns = app.getNowData("tabPages.btnGroup.btns");
                for (var i in btns) {
                    var btn = btns[i];
                    if (btn.id === fullBtnId) {
                        btn.title = title;
                        app.updateByExpr("tabPages.btnGroup.btns", btns);
                        return;
                    }
                }
            }
        },
        hide: {
            className: "iconfont",
            html: "&#xe600;",
            title: "隐藏",
            click: function (app) {
                app.hide();
            }
        }
    },
    headerTabs: {
        start: {
            text: "开始",
            tools: [
                headerTabsBtns.open,
                headerTabsBtns.save,
                headerTabsBtns.saveAs,
                headerTabsBtns.print,
                { type: "separate", needReader: true },
                headerTabsBtns.jump,
                headerTabsBtns.select,
                headerTabsBtns.move,
                headerTabsBtns.ActualSize,
                headerTabsBtns.SuitableWidth,
                headerTabsBtns.SuitablePage,
                { type: "separate", needReader: true },
                headerTabsBtns.scale,
                headerTabsBtns.narrow,
                headerTabsBtns.enlarge,
                { type: "separate", needReader: true },
                headerTabsBtns.find,
                headerTabsBtns.full,
                // headerTabsBtns.preferenc,
            ]
        },
        tools: {
            text: "工具",
            tools: [__assign({}, headerTabsBtns.find)]
        },
        view: {
            text: "视图",
            tools: [
                cloneDeep(headerTabsBtns.ActualSize),
                cloneDeep(headerTabsBtns.SuitableWidth),
                cloneDeep(headerTabsBtns.SuitablePage),
                cloneDeep(headerTabsBtns.full),
            ]
        },
        reader: {
            text: "阅读",
            tools: [
                cloneDeep(headerTabsBtns.narrow),
                cloneDeep(headerTabsBtns.enlarge),
                headerTabsBtns.rotation,
                headerTabsBtns.anticlockwiseRotation,
                headerTabsBtns.jumpToHead,
                headerTabsBtns.jumpToPrev,
                headerTabsBtns.jumpToNext,
                headerTabsBtns.jumpToEnd,
            ]
        },
        safety: {
            text: "安全",
            tools: [
                headerTabsBtns.sealDragAdd,
                headerTabsBtns.sealPagesDragAdd,
                headerTabsBtns.sealQiFenAdd,
                headerTabsBtns.sealKeyword,
            ]
        },
        help: {
            text: "帮助"
        }
    },
    sildebarLeftTabs: {
        outline: {
            text: "书签",
            iconHtml: "&#xe67b;",
            // iconHtml: "&#xe64f;",
            disabled: slidebarLeftToolbarDisabled,
            renderChildren: function (app, dom) {
                var currentBookmark = app.currentBookmark();
                if (!currentBookmark || !currentBookmark.id) {
                    dom.innerHTML = "";
                    return;
                }
                dom.style.padding = "30px 9px 0 9px";
                currentBookmark.parserWrapperInfo.parserInterface.renderOutline(dom);
            }
        },
        sign: {
            text: "签章",
            iconHtml: "&#xe64f;",
            disabled: slidebarLeftToolbarDisabled
        },
        comment: {
            text: "注释",
            iconHtml: "&#xe650;",
            disabled: slidebarLeftToolbarDisabled,
            renderChildren: function (app, dom) {
                var currentBookmark = app.currentBookmark();
                if (!currentBookmark || !currentBookmark.id) {
                    dom.innerHTML = "";
                    return;
                }
                dom.style.paddingTop = "27px";
                currentBookmark.parserWrapperInfo.parserInterface.renderAnnotations(dom);
            }
        },
        thumbnail: {
            text: "缩图",
            iconHtml: "&#xe651;",
            disabled: slidebarLeftToolbarDisabled,
            renderChildren: function (app, dom) {
                var currentBookmark = app.currentBookmark();
                if (!currentBookmark || !currentBookmark.id) {
                    dom.innerHTML = "";
                    return;
                }
                dom.style.paddingTop = "27px";
                currentBookmark.parserWrapperInfo.parserInterface.renderThumbnail(dom, {
                    width: 106
                });
            }
        }
    }
};
var defaultContentTemp = function (app, parent) {
    var tempReaderComponent = new TempReaderContent({
        owner: parent,
        source: "<content-temp></content-temp>"
    });
    tempReaderComponent.app = app;
    return tempReaderComponent;
};
function slidebarLeftToolbarDisabled(app) {
    var currentBookmark = app.currentBookmark();
    return (!currentBookmark ||
        !currentBookmark.parserWrapperInfo ||
        !currentBookmark.parserWrapperInfo.parserInterface);
}

new AsyncLock();
var Reader = defineComponent({
    template: template$6(html$b)({ styles: styles$g }),
    initData: function () {
        return {
            bookmarkLoadErrors: { __length: 0 }
        };
    },
    attached: function () {
        this.loadTempContent();
    },
    disposed: function () {
        this.destoryTempContent();
    },
    computed: {
        errMsg: function () {
            var currentBookmarkId = this.data.get("bookmarkInfos.id");
            var bookmarkLoadErrors = this.data.get("bookmarkLoadErrors") || {};
            var errInfo = bookmarkLoadErrors[currentBookmarkId];
            if (errInfo && errInfo.haveErr) {
                return errInfo.desc || "未知异常";
            }
            return "";
        }
    },
    loadTempContent: function () {
        var tempContentEle = this.ref("tempContent");
        if (!tempContentEle) {
            return;
        }
        var renderId = this.data.get("noOpenFileRender");
        var renderFn = defaultContentTemp;
        var appInterface = getApp(this.data.get("appId"));
        if (renderId) {
            var datas = getAppDataStore(this.data.get("appId"));
            var rFn = datas.get(renderId);
            if (rFn) {
                renderFn = rFn;
            }
        }
        this.destoryTempContent();
        var renderEle = renderFn(appInterface, this);
        if (typeof renderEle.attach !== "function") {
            this._tempContentHtmlEle = renderEle;
            tempContentEle.innerHTML = "";
            tempContentEle.appendChild(this._tempContentHtmlEle);
        }
        else {
            this._tempContentComponent = renderEle;
            this._tempContentComponent.attach(tempContentEle);
        }
    },
    destoryTempContent: function () {
        if (this._tempContentComponent) {
            this._tempContentComponent.dispose();
        }
        if (this._tempContentHtmlEle) {
            this._tempContentHtmlEle.remove();
        }
    },
    renderReaders: function (bookmarId) {
        return __awaiter(this, void 0, void 0, function () {
            var nowBookmarkLoadErrors, key, rootEle, appInterface, bookmark, parserInterface, readerEle, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nowBookmarkLoadErrors = JSON.parse(JSON.stringify(this.data.get("bookmarkLoadErrors") || {}));
                        this.readerEleList = this.readerEleList || {};
                        if (!bookmarId) {
                            if (nowBookmarkLoadErrors["__length"]) {
                                this.data.set("bookmarkLoadErrors", { _length: 0 });
                            }
                            for (key in this.readerEleList) {
                                this.readerEleList[key].remove();
                                delete this.readerEleList[key];
                            }
                            return [2 /*return*/];
                        }
                        if (this.lastReaderId && this.readerEleList[this.lastReaderId]) {
                            this.readerEleList[this.lastReaderId].style.display = "none";
                        }
                        this.lastReaderId = bookmarId;
                        if (this.readerEleList[bookmarId]) {
                            this.readerEleList[bookmarId].removeAttribute("style");
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        rootEle = this.el;
                        appInterface = getAppBySanComponent(this);
                        bookmark = appInterface.getBookmarkInfoById(bookmarId);
                        if (!bookmark ||
                            !bookmark.parserWrapperInfo ||
                            !bookmark.parserWrapperInfo.parserInterface) {
                            throw new Error("页签中缺失解析器器信息");
                        }
                        parserInterface = bookmark.parserWrapperInfo.parserInterface;
                        if (!parserInterface.render) {
                            throw new Error("解析器未实现渲染方法");
                        }
                        readerEle = createElement("div");
                        readerEle.className = styles$g.readerContent;
                        this.readerEleList[bookmark.id] = readerEle;
                        rootEle.appendChild(readerEle);
                        res = parserInterface.render(readerEle);
                        if (!(res instanceof Promise)) return [3 /*break*/, 3];
                        return [4 /*yield*/, res];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        nowBookmarkLoadErrors[bookmarId] = {
                            haveErr: true,
                            desc: e_1.message
                        };
                        nowBookmarkLoadErrors["__length"] += 1;
                        this.data.set("bookmarkLoadErrors", nowBookmarkLoadErrors);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    handleContent: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var nowBookmarkLoadErrors, appInterface, bookmark, err, readerContentEle, parserInterface, backContent, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nowBookmarkLoadErrors = JSON.parse(JSON.stringify(this.data.get("bookmarkLoadErrors") || {}));
                        appInterface = getApp(this.data.get("appId"));
                        bookmark = appInterface.getBookmarkInfoById(id);
                        if (nowBookmarkLoadErrors[bookmark.id]) {
                            return [2 /*return*/];
                        }
                        err = {
                            desc: "",
                            haveErr: false
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 8]);
                        readerContentEle = this.ref("ref-readerContent-" + id);
                        if (!readerContentEle) {
                            throw new Error("缺失被渲染元素");
                        }
                        if (!bookmark ||
                            !bookmark.parserWrapperInfo ||
                            !bookmark.parserWrapperInfo.parserInterface) {
                            throw new Error("页签中缺失解析器器信息");
                        }
                        parserInterface = bookmark.parserWrapperInfo.parserInterface;
                        if (!parserInterface.render) return [3 /*break*/, 4];
                        readerContentEle.innerHTML = "";
                        backContent = parserInterface.render(readerContentEle);
                        if (!(backContent instanceof Promise)) return [3 /*break*/, 3];
                        return [4 /*yield*/, backContent];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4: throw new Error("解析器未实现渲染方法");
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_2 = _a.sent();
                        err.haveErr = true;
                        err.desc = e_2.message;
                        return [3 /*break*/, 8];
                    case 7:
                        nowBookmarkLoadErrors[bookmark.id] = err;
                        this.data.set("bookmarkLoadErrors", nowBookmarkLoadErrors);
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    }
});

var html$2 = "<div class=\"<%= styles.slidebarLeft %>\" style=\"{{slideWrapperIeStyle}}\">\r\n    <div class=\"clearfix <%= styles.tabsWrapper %>\">\r\n        <div class=\"<%= styles.comment %>\">\r\n            <span>缩图</span>\r\n        </div>\r\n        <div class=\"<%= styles.tabs %>\">\r\n            <fragment s-for=\"toolbar, index in toolbars\">\r\n                <div s-if=\"fns.showTab(toolbar)\" class=\"<%= styles.tab %> {{fns.disabled(toolbar.disabled, bookmarkInfos.id)}} {{activeKey === index ? '<%= styles.active %>':''}}\" title=\"{{toolbar.text}}\" on-click=\"events.tabClick($event, index, toolbar, fns.disabled(toolbar.disabled, bookmarkInfos.id))\">\r\n                    <div class=\"<%= styles.icon %>\">\r\n                        <span class=\"iconfont\">{{toolbar.iconHtml|raw}}</span>\r\n                    </div>\r\n                    <div class=\"<%= styles.desc %>\">\r\n                        <span>{{toolbar.text}}</span>\r\n                    </div>\r\n                </div>\r\n            </fragment>\r\n        </div>\r\n    </div>\r\n    <div s-show=\"{{activeKey >= 0}}\" s-ref=\"ref-pannelWrapper\" class=\"clearfix <%= styles.tabPannel %> {{!expand?'<%= styles.fold %>':'<%= styles.expand %>'}}\">\r\n        <fragment s-for=\"toolbar, toolbarIndex in toolbars\">\r\n            <div class=\"<%= styles.content %>\" s-show=\"activeKey === toolbarIndex\">\r\n                <div s-ref=\"ref-pannelContent-{{toolbarIndex}}\" class=\"<%= styles.content %>\" _r=\"{{fns.handleToolbarRender(toolbar,toolbarIndex, bookmarkInfos.id)}}\"></div>\r\n                <div s-if=\"toolbarChildrenRenderErrors[toolbarIndex].error\" class=\"<%= styles.error %>\">\r\n                    <h3>{{toolbarChildrenRenderErrors[toolbarIndex].msg}}</h3>\r\n                </div>\r\n                <div class=\"<%= styles.tools %>\" s-if=\"{{toolbar.tools && toolbar.tools.length > 0}}\">\r\n                    <fragment s-for=\"tool, index in toolbar.tools\">\r\n                        <div s-if=\"tool.type !== 'separate'\" s-ref=\"ref-tool-{{index}}\" _r=\"{{fns.handleNodeRender(tool, index)}}\" class=\"<%= styles.tool %>\">\r\n                            <div s-if=\"tool.nodeInfo.html\" class=\"{{tool.nodeInfo.className || '<%= styles.icon %>'}}\">\r\n                                <span class=\"iconfont\">{{tool.nodeInfo.html | raw}}</span>\r\n                            </div>\r\n                            <div s-if=\"tool.nodeInfo.text\" class=\"{{tool.nodeInfo.className || '<%= styles.text %>'}}\">\r\n                                <span>{{tool.nodeInfo.text}}</span>\r\n                            </div>\r\n                        </div>\r\n                    </fragment>\r\n                </div>\r\n            </div>\r\n        </fragment>\r\n        <div class=\"<%= styles.expand %>\" on-click=\"events.expandChange()\">\r\n            <span class=\"iconfont\">{{!expand?'&#xe718;':'&#xe615;'|raw}}</span>\r\n            <div></div>\r\n        </div>\r\n        <div on-mousedown=\"events.drageDown($event)\" s-show=\"expand\" class=\"<%= styles.drag %>\"></div>\r\n    </div>\r\n</div>";

var styles$7 = {"common_font":"index-module_common_font__rsmEw","text_overflow":"index-module_text_overflow__p5aoa","slidebarLeft":"index-module_slidebarLeft__higRK","tabsWrapper":"index-module_tabsWrapper__oMxJA","comment":"index-module_comment__h9Ykh","tabs":"index-module_tabs__YSKU6","tab":"index-module_tab__F6hp2","disabled":"index-module_disabled__Ptq3y","icon":"index-module_icon__Zsx8e","desc":"index-module_desc__MkXk0","active":"index-module_active__ZtWjc","tabPannel":"index-module_tabPannel__NJDF1","fold":"index-module_fold__Hp4cY","expand":"index-module_expand__RCTjV","drag":"index-module_drag__WvhVF","content":"index-module_content__UdWco","error":"index-module_error__lEXU4","tools":"index-module_tools__IV9iM","tool":"index-module_tool__c1cQ4","text":"index-module_text__TXr-l"};

var SlidebarLeft = defineComponent({
    components: {},
    template: template$6(html$2)({ styles: styles$7 }),
    initData: function () {
        return {
            expand: false,
            pannelDragWidth: 0,
            dragX: 0
        };
    },
    attached: function () {
        this.events.drageMove = this.events.drageMove.bind(this);
        this.events.drageUp = this.events.drageUp.bind(this);
    },
    computed: {
        slideWrapperIeStyle: function () {
            var isLessThan9 = lessThan(9);
            if (!isLessThan9) {
                return;
            }
            var activeKey = this.data.get("activeKey");
            if (typeof activeKey !== "number") {
                return;
            }
            var width = 40 + 16;
            var expand = this.data.get("expand");
            if (expand) {
                width = 40 + 160;
            }
            return "width: " + width + "px;";
        },
        tabPanelWidth: function () {
            var expand = this.data.get("expand");
            if (!expand) {
                return 0;
            }
            var appSize = this.data.get("appSize");
            var maxWidth = appSize.minWidth / 2 - 40;
            var width = this.data.get("pannelDragWidth");
            if (width < 0) {
                return 160;
            }
            var targetWidth = 160 + width;
            if (targetWidth > maxWidth) {
                targetWidth = maxWidth;
            }
            return targetWidth;
        }
    },
    events: {
        drageUp: function (event) {
            this.dragX = 0;
            eventUtil.removeHandler(window, "mousemove", this.events.drageMove);
            eventUtil.removeHandler(window, "mouseup", this.events.drageUp);
            var pannelWrapperEle = this.ref("ref-pannelWrapper");
            if (!pannelWrapperEle) {
                return;
            }
            pannelWrapperEle.style.transition = "";
        },
        drageMove: function (event) {
            var pannelWrapperEle = this.ref("ref-pannelWrapper");
            if (!pannelWrapperEle) {
                return;
            }
            var appSize = this.data.get("appSize");
            var maxWidth = appSize.minWidth / 2;
            var moveX = event.x - this.dragX;
            this.dragX = event.x;
            var width = parseInt(pannelWrapperEle.style.width || "160");
            var targetWidth = width + moveX;
            if (targetWidth < 160) {
                targetWidth = 160;
            }
            else if (targetWidth > maxWidth) {
                targetWidth = maxWidth;
            }
            pannelWrapperEle.style.width = targetWidth + "px";
        },
        drageDown: function (event) {
            var pannelWrapperEle = this.ref("ref-pannelWrapper");
            if (!pannelWrapperEle) {
                return;
            }
            pannelWrapperEle.style.transition = "unset";
            this.dragX = event.x;
            eventUtil.removeHandler(window, "mousemove", this.events.drageMove);
            eventUtil.removeHandler(window, "mouseup", this.events.drageUp);
            eventUtil.addHandler(window, "mousemove", this.events.drageMove);
            eventUtil.addHandler(window, "mouseup", this.events.drageUp);
        },
        tabClick: function (event, key, toolbar, disabled) {
            if (disabled) {
                return;
            }
            var nowActiveKey = this.data.get("activeKey");
            this.data.set("activeKey", key);
            if (nowActiveKey !== key) {
                this.data.set("expand", true);
            }
        },
        expandChange: function () {
            this.data.set("expand", !this.data.get("expand"));
        }
    },
    fns: {
        handleToolbarRender: function (toolbarInfo, index, id) {
            var _this = this;
            if (!toolbarInfo._renderChildrenId) {
                return;
            }
            var pannelContentEle = this.ref("ref-pannelContent-" + index);
            if (!pannelContentEle) {
                return;
            }
            var appInterface = getAppBySanComponent(this);
            try {
                var res = nodeEventCall(appInterface, toolbarInfo._renderChildrenId, appInterface, pannelContentEle);
                if (res instanceof Promise) {
                    res
                        .then(function () {
                        _this.data.set("toolbarChildrenRenderErrors[".concat(index, "]"), {
                            error: false,
                            msg: ""
                        });
                    })["catch"](function (err) {
                        _this.data.set("toolbarChildrenRenderErrors[".concat(index, "]"), {
                            error: true,
                            msg: err.message || err
                        });
                    });
                }
                else {
                    this.data.set("toolbarChildrenRenderErrors[".concat(index, "]"), {
                        error: false,
                        msg: ""
                    });
                }
            }
            catch (e) {
                this.data.set("toolbarChildrenRenderErrors[".concat(index, "]"), {
                    error: true,
                    msg: e.message || e
                });
                return;
            }
        },
        handleNodeRender: function (toolInfo, index) {
            var toolEle = this.ref("ref-tool-" + index);
            if (!toolEle || !toolInfo || !toolInfo.nodeInfo) {
                return undefined;
            }
            if (toolInfo.nodeInfo.renderId) {
                nodeRender(this, toolInfo.nodeInfo.renderId, getApp(this.data.get("appId")), this, toolEle);
                return undefined;
            }
            else if (toolInfo.nodeInfo._attachedId) {
                var appInterface = getApp(this.data.get("appId"));
                // dom.nodeEventCall(
                nodeEventCallBindThis(toolInfo.nodeInfo, appInterface, toolInfo.nodeInfo._attachedId, appInterface);
            }
            if (!toolInfo.nodeInfo.evenIdList ||
                toolInfo.nodeInfo.evenIdList.length === 0) {
                return undefined;
            }
            dispatchDomEvent(toolEle, toolInfo.nodeInfo.evenIdList, this, toolInfo.nodeInfo);
            return undefined;
        },
        disabled: function (disabled) {
            if (typeof disabled === "boolean") {
                return disabled ? styles$7.disabled : "";
            }
            else if (typeof disabled !== "string") {
                return "";
            }
            var appInterface = getApp(this.data.get("appId"));
            var datas = getAppDataStore(this.data.get("appId"));
            var fn = datas.get(disabled);
            return fn(appInterface) ? styles$7.disabled : "";
        },
        showTab: function (toolbar) {
            if (!toolbar.needLoadFileOK) {
                return true;
            }
            var appInterface = getApp(this.data.get("appId"));
            if (!appInterface) {
                return false;
            }
            var currentBookmark = appInterface.currentBookmark();
            if (!currentBookmark ||
                !currentBookmark.parserWrapperInfo ||
                !currentBookmark.parserWrapperInfo.parserInterface) {
                return false;
            }
            return true;
        }
    }
});

var html$1 = "<div>右侧</div>";

var styles$6 = {};

var SlidebarRight = defineComponent({
    template: template$6(html$1)({ styles: styles$6 })
});

var styles$5 = {"app":"index-module_app__DAOOy","header":"index-module_header__NtWW5","sidebarLeft":"index-module_sidebarLeft__MA3wh","sidebarRight":"index-module_sidebarRight__2F13Z","content":"index-module_content__m20ZT","reader":"index-module_reader__xIj2-"};

var styles$4 = {"bookmark":"index-module_bookmark__1nGVp","tabGroup":"index-module_tabGroup__0ZnGy","btnGroup":"index-module_btnGroup__7TZ-F","tabs":"index-module_tabs__P0lJ0","tabAdd":"index-module_tabAdd__uIR8p"};

var styles$3 = {"tab":"index-module_tab__nriyF","active":"index-module_active__6hZmf","fileName":"index-module_fileName__A6hsy","closeBtn":"index-module_closeBtn__MTrBM"};

var template$4 = "\n    <div on-click=\"events.tabClick()\" class=\"".concat(styles$3.tab, " {{active?'").concat(styles$3.active, "':''}}\">\n      <div title=\"{{name}}\" class=\"").concat(styles$3.fileName, "\">\n        <sapn>{{name}}</sapn>\n      </div>\n      <div on-click=\"events.tabClose()\" class=\"").concat(styles$3.closeBtn, "\">\n        <span title=\"\u5173\u95ED\" class=\"iconfont\">&#xe600;</span>\n      </div>\n    </div>\n");
var BookmarkTab = defineComponent({
    template: template$4,
    events: {
        tabClick: function () {
            var appInterface = getApp(this.data.get("appId"));
            if (!appInterface) {
                return;
            }
            var currentBookmark = appInterface.currentBookmark();
            var bookmarkId = this.data.get("id");
            if (currentBookmark && currentBookmark.id === bookmarkId) {
                return;
            }
            appInterface.convertBookmarkById(bookmarkId);
        },
        tabClose: function () {
            var appInterface = getApp(this.data.get("appId"));
            if (!appInterface) {
                return;
            }
            appInterface.removeBookmarkById(this.data.get("id"));
        }
    }
});

var styles$2 = {"btn":"index-module_btn__Z99v5"};

var template$3 = "<div s-ref=\"btn-wrapper\">\n    <div s-if=\"!eleId\" s-ref=\"btn\" class=\"".concat(styles$2.btn, "\" title=\"{{title}}\">\n        <span class=\"{{className}}\">{{text}}{{(html||\"\") | raw}}</span>\n    </div>\n</div>");
var TabBtn = defineComponent({
    template: template$3,
    attached: function () {
        if (this.ref("btn")) {
            this.eventBind();
        }
        if (!this.el) {
            return;
        }
        var eleId = this.data.get("eleId");
        if (!eleId) {
            return;
        }
        this.el.appendChild(document.getElementById(eleId));
    },
    eventBind: function () {
        var eventIdList = this.data.get("evenIdList");
        if (!eventIdList || eventIdList.length === 0) {
            return;
        }
        var btnEle = this.ref("btn");
        dispatchDomEvent(btnEle, eventIdList, this, undefined);
    },
    detached: function () {
        var dataStore = getApp(this.data.get("appId")).getDataStore();
        var eventIdList = this.data.get("evenIdList");
        nodeEventDestroy.apply(dom, __spreadArray([dataStore], eventIdList, false));
    }
});

var html = "<div class=\"<%= styles.bookmark %>\">\r\n    <div s-ref=\"tab-group\" class=\"<%= styles.tabGroup %>\" style=\"right: {{btnGroupWidth+12}}px\">\r\n        <div s-ref=\"tab-wrapper-scroll\" class=\"<%= styles.tabs %>\">\r\n            <div s-ref=\"tab-wrapper\" style=\"overflow: hidden\">\r\n                <h-tab s-for=\"b, i in bookmarks\" appId=\"{{appId}}\" active=\"{{currentIndex === i}}\" id=\"{{b.id}}\" name=\"{{b.name}}\"></h-tab>\r\n            </div>\r\n        </div>\r\n        <div title=\"打开\" on-click=\"events.add($event)\" class=\"<%= styles.tabAdd %>\">\r\n            <span class=\"iconfont\">&#xe64d;</span>\r\n        </div>\r\n    </div>\r\n    <div s-if=\"btnGroup && btnGroup.btns && btnGroup.btns.length > 0\" class=\"<%= styles.btnGroup %>\" style=\"width: {{btnGroupWidth}}px\">\r\n        <tab-btn s-for=\"btn in btnGroup.btns\" s-bind=\"{{{...btn}}}\"></tab-btn>\r\n    </div>\r\n</div>";

var template$2 = template$6(html)({
    styles: styles$4
});
var Bookmark = defineComponent({
    components: {
        "h-tab": BookmarkTab,
        "tab-btn": TabBtn
    },
    template: template$2,
    attached: function () {
        var fn = this.events.resize.bind(this);
        this.events.resize = fn;
        eventUtil.addHandler(window, "resize", fn);
        this.watchTabGroup();
    },
    detached: function () {
        eventUtil.removeHandler(window, "resize", this.events.resize);
    },
    events: {
        resize: function () {
            this.watchTabGroup();
        },
        add: function () {
            return __awaiter(this, void 0, void 0, function () {
                var appInterface, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            appInterface = getApp(this.data.get("appId"));
                            return [4 /*yield*/, appInterface.getReader().selectFile()];
                        case 1:
                            result = _a.sent();
                            if (!result) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, result.loadFile()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
    },
    updated: function () {
        this.watchTabGroup();
    },
    watchTabGroup: function () {
        var tabGroupEle = this.ref("tab-group");
        var tabWrapperEle = this.ref("tab-wrapper");
        var tabWrapperScrollEle = this.ref("tab-wrapper-scroll");
        if (!tabGroupEle || !tabWrapperEle || !tabWrapperScrollEle) {
            return;
        }
        var tabs = this.data.get("bookmarks") || [];
        var tabWrapperWidth = tabs.length * 172 + 20;
        tabWrapperEle.style.width = tabWrapperWidth + "px";
        var width = tabGroupEle.clientWidth;
        if (tabWrapperWidth > width) {
            tabWrapperScrollEle.style.width = width - 60 + "px";
        }
        else {
            tabWrapperScrollEle.style.width = "";
        }
    },
    initData: function () {
        return {
            currentIndex: -1,
            bookmarks: []
        };
    },
    computed: {
        btnGroupWidth: function () {
            var num = 0;
            var btnGroup = this.data.get("btnGroup");
            if (typeof btnGroup === "boolean" ||
                !btnGroup ||
                !btnGroup.btns ||
                btnGroup.btns.length === 0) {
                return num;
            }
            for (var i = 0; i < btnGroup.btns.length; i++) {
                var width = btnGroup.btns[i].width || 30;
                num += width;
            }
            return num;
        }
    }
});

var template$1 = "<h-bookmark appShow=\"{{appShow}}\" class=\"{{classNames}}\" style=\"{{styles}}\" btnGroup=\"{{btnGroup}}\" appId=\"{{appId}}\" bookmarks=\"{{bookmarkInfos.list}}\" currentIndex=\"{{bookmarkInfos.index}}\" ></h-bookmark>";
var TabPages = defineComponent({
    components: {
        "h-bookmark": Bookmark
    },
    template: template$1,
    attached: function () {
        // setTimeout(() => {
        this.dispatch("app::resize", {});
        // }, 300);
    },
    computed: {
        classNames: function () {
            var className = this.data.get("className");
            if (!className) {
                return undefined;
            }
            return classNames(className);
        },
        styles: function () {
            var autoHide = this.data.get("autoHide");
            if (typeof autoHide === "undefined") {
                autoHide = "noPage";
            }
            if (!autoHide) {
                return undefined;
            }
            var tabsInfos = (this.data.get("bookmarkInfos") || {
                index: -1,
                list: []
            }).list;
            if (tabsInfos.length === 0 ||
                (tabsInfos.length === 1 && autoHide == "onePage")) {
                return "height: 0";
            }
            return undefined;
        }
    }
});

var isFirst = true;
var template = "\n<div id=\"".concat(styles$5.app, "\" on-contextmenu=\"events.contextmenu($event)\">\n    <div id=\"").concat(styles$5.header, "\" s-ref=\"header\">\n        <ui-tabs appSize={{appSize}} appShow=\"{{appShow}}\" s-if={{tabPages!==false}} s-bind={{{...(tabPages||{})}}} bookmarkInfos=\"{{bookmarkInfos}}\" appId=\"{{appId}}\" ></ui-tabs>\n        <ui-header appSize={{appSize}} appShow=\"{{appShow}}\" s-if=\"{{header !== false}}\" s-bind={{{...header}}} appId=\"{{appId}}\" bookmarkInfos=\"{{bookmarkInfos}}\" ></ui-header>\n    </div>\n    <div id=\"").concat(styles$5.content, "\" style=\"height: {{contentHeight}}px\">\n      <div s-if=\"{{!sidebars || sidebars.left !== false}}\" id=\"").concat(styles$5.sidebarLeft, "\">\n        <ui-slide-left appSize={{appSize}} bookmarkInfos=\"{{bookmarkInfos}}\" appShow=\"{{appShow}}\" appId=\"{{appId}}\" s-bind=\"{{{...(sidebars.left||{})}}}\"></ui-slide-left>\n      </div>\n      <div  s-if=\"{{!sidebars || sidebars.right !== false}}\" id=\"").concat(styles$5.sidebarRight, "\">\n        <ui-slide-right appSize={{appSize}} bookmarkInfos=\"{{bookmarkInfos}}\" appShow=\"{{appShow}}\" appId=\"{{appId}}\" s-bind=\"{{{...(sidebars.right||{})}}}\"></ui-slide-right>\n      </div>\n      <div id=\"").concat(styles$5.reader, "\">\n        <ui-reader appSize={{appSize}} bookmarkInfos=\"{{bookmarkInfos}}\" appShow=\"{{appShow}}\" s-ref=\"ref-reader\" appId=\"{{appId}}\" s-bind=\"{{{...(content||{})}}}\"></ui-reader>\n      </div>\n    </div>\n    <div id=\"").concat(styles$5.fotter, "\" s-ref=\"fotter\"></div>\n</div>\n");
var AppUi = defineComponent({
    components: {
        "ui-tabs": TabPages,
        "ui-header": Header,
        "ui-slide-left": SlidebarLeft,
        "ui-slide-right": SlidebarRight,
        "ui-reader": Reader
    },
    template: template,
    messages: {
        "app::resize": function () {
            this.events.resize(this.data.get("contentHeight"));
        }
    },
    attached: function () {
        var fn = this.events.resize.bind(this);
        this.events.resize = fn;
        eventUtil.addHandler(window, "resize", fn);
        fn();
    },
    initData: function () {
        return {
            contentHeight: 0
        };
    },
    events: {
        contextmenu: function (event) {
            eventUtil.stopPropagation(event);
            eventUtil.preventDefault(event);
        },
        resize: function (current) {
            var _this = this;
            if (!this.ref) {
                return;
            }
            var i = 0;
            var intervalId = setInterval(function () {
                var headerEle = _this.ref("header");
                var fotterEle = _this.ref("fotter");
                var root = _this.el;
                if (!headerEle || !fotterEle || !root) {
                    return;
                }
                var contentHeight = root.clientHeight - headerEle.clientHeight - fotterEle.clientHeight;
                var currentContentHeight = _this.data.get("contentHeight");
                if (currentContentHeight !== contentHeight) {
                    if (typeof current !== "undefined" && isFirst) {
                        isFirst = false;
                        return;
                    }
                    _this.data.set("contentHeight", contentHeight);
                    i = 0;
                    return;
                }
                if (i < 10) {
                    i++;
                    return;
                }
                clearInterval(intervalId);
            }, 5);
        }
    },
    getReader: function () {
        return this.ref("ref-reader");
    }
});

var _parserEventList = ["pageNoChange", "scaleChange", "moduleSwitchChange"];
var ReaderParserAbstract = /** @class */ (function () {
    function ReaderParserAbstract(app) {
        this.app = app;
        this.scale = window.devicePixelRatio || 1;
        this._dataStore = {};
    }
    ReaderParserAbstract.prototype.getScale = function () {
        return this.scale;
    };
    ReaderParserAbstract.prototype.setScale = function (scale) {
        return (this.scale = scale);
    };
    ReaderParserAbstract.prototype.adaptiveView = function () { };
    ReaderParserAbstract.prototype.jumpTo = function (page) { };
    ReaderParserAbstract.prototype._getEventList = function (eventName) {
        eventName = "__event_" + eventName;
        this._dataStore[eventName] = this._dataStore[eventName] || [];
        return this._dataStore[eventName];
    };
    ReaderParserAbstract.prototype.addListener = function (eventName, callback) {
        if (typeof callback !== "function") {
            return;
        }
        if (!_parserEventList.includes(eventName)) {
            return;
        }
        var eventList = this._getEventList(eventName);
        for (var i = 0; i < eventList.length; i++) {
            if (eventList[i] === callback) {
                return;
            }
        }
        eventList.push(callback);
        if (eventList.length === 1) {
            this._listenerBindNotice(eventName, "add");
        }
    };
    ReaderParserAbstract.prototype.removeListener = function (eventName, callback) {
        if (typeof callback !== "function") {
            return;
        }
        if (!_parserEventList.includes(eventName)) {
            return;
        }
        var eventList = this._getEventList(eventName);
        for (var i = eventList.length; i >= 0; i--) {
            if (eventList[i] === callback) {
                eventList.splice(i, 1);
                break;
            }
        }
        if (eventList.length === 0) {
            this._eventNoticBind(eventName, "del");
        }
    };
    ReaderParserAbstract.prototype._eventNoticBind = function (eventName, mod) {
        var eventBindKeyName = "_event_bind_" + eventName;
        if (this._dataStore[eventBindKeyName]) {
            return;
        }
        if (this._listenerBindNotice(eventName, mod)) {
            this._dataStore[eventBindKeyName] = true;
        }
    };
    ReaderParserAbstract.prototype.fire = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var eventList = this._getEventList(eventName);
        for (var i = 0; i < eventList.length; i++) {
            eventList[i].apply(eventList, args);
        }
    };
    ReaderParserAbstract.prototype.eventExist = function (event) {
        return this._getEventList(event).length !== 0;
    };
    /**
     * 事件绑定通知
     * @param eventName 事件名称
     * @param mod 事件模式: add: 添加  del: 删除( 事件回调全部移除之后会调用 )
     * @returns 是/否已经处理通知, true: 此事件名称不会再次进行通知, false: 此事件后续会进行通知
     */
    ReaderParserAbstract.prototype._listenerBindNotice = function (eventName, mod) {
        return false;
    };
    ReaderParserAbstract.prototype.showPageNo = function () { };
    ReaderParserAbstract.prototype.hidePageNo = function () { };
    ReaderParserAbstract.prototype.setMode = function (mode) { };
    ReaderParserAbstract.prototype.getMode = function () {
        return "select";
    };
    ReaderParserAbstract.prototype.setFull = function (mode, options) { };
    ReaderParserAbstract.prototype.contentExitFull = function () { };
    ReaderParserAbstract.prototype.contentIsFull = function () {
        return false;
    };
    ReaderParserAbstract.prototype.renderThumbnail = function (domEle, options) { };
    ReaderParserAbstract.prototype.renderOutline = function (domEle) {
        throw ErrNoSupportFunction;
    };
    ReaderParserAbstract.prototype.renderAnnotations = function (domEle) {
        throw ErrNoSupportFunction;
    };
    ReaderParserAbstract.prototype.sealList = function () {
        throw ErrNoSupportFunction;
    };
    ReaderParserAbstract.prototype.signSealVerify = function (sealFieldName) {
        throw ErrNoSupportFunction;
    };
    ReaderParserAbstract.prototype.signSealVerifyAll = function () {
        throw ErrNoSupportFunction;
    };
    ReaderParserAbstract.prototype.setRotation = function (deg) {
        throw ErrNoSupportFunction;
    };
    ReaderParserAbstract.prototype.getRotation = function () {
        throw ErrNoSupportFunction;
    };
    ReaderParserAbstract.prototype.sealDrag = function (sealInfo, options) {
        throw ErrNoSupportFunction;
    };
    ReaderParserAbstract.prototype.signSealKeyword = function (sealInfo, pwd, keyword) {
        throw ErrNoSupportFunction;
    };
    ReaderParserAbstract.prototype.signSealPosition = function (sealInfo, password, positionInfo) {
        return this.signSealPositionList(sealInfo, password, positionInfo);
    };
    ReaderParserAbstract.prototype.signSealPositionList = function (sealInfo, password) {
        throw ErrNoSupportFunction;
    };
    ReaderParserAbstract.prototype.signSealQiFen = function (sealInfo, pwd) {
        throw ErrNoSupportFunction;
    };
    ReaderParserAbstract.supportAll = {
        nowBrowser: true,
        fileSuffix: [],
        isSupportFile: function (file) {
            return true;
        },
        scale: true,
        rotation: true,
        thumbnail: true,
        outline: true,
        annotations: true,
        full: {
            width: true,
            content: true
        },
        pages: {
            jump: true,
            moduleSwitch: {
                select: true,
                move: true
            },
            find: true,
            adaptiveView: true,
            showPageNo: true
        },
        seal: {
            keywordSeal: true,
            qiFenSeal: true,
            sealList: true,
            positionSeal: true,
            verifySeal: true
        },
        listener: {
            pageNoChange: true,
            scaleChange: true,
            moduleSwitchChange: true
        }
    };
    return ReaderParserAbstract;
}());
var readerParserSupportDefault = {
    nowBrowser: false,
    fileSuffix: [],
    thumbnail: false,
    outline: false,
    annotations: false,
    isSupportFile: function (file) {
        return false;
    },
    scale: false,
    rotation: false,
    full: false,
    pages: false,
    seal: false,
    listener: false
};
var ErrFileNotParsed = new Error("文件无法被解析, 请添加对应解析器");
var ErrNoSupportFileSuffix = new Error("没有可被解析的文件后缀，请尝试添加解析器");
var ErrFeilSelectWait = new Error("文件选择已被锁定，请稍后重试");
var ErrLackOfParser = new Error("缺失解析器信息");
var ErrNoSupportFunction = new Error("未实现的方法");

var styles$1 = {"messageContainer":"index-module_messageContainer__RU62A","messageBoxBackground":"index-module_messageBoxBackground__r6MJO","messageBox":"index-module_messageBox__bhmnA","success":"index-module_success__5o4-F","warn":"index-module_warn__KeMOh","error":"index-module_error__OjKmd","title":"index-module_title__kJZwQ","titleTip":"index-module_titleTip__dk1qQ","titleLeft":"index-module_titleLeft__Xtxc9","titleRight":"index-module_titleRight__ExJhx","titleIcon":"index-module_titleIcon__s2oeu","closeIcon":"index-module_closeIcon__Uwa5G","exBtn":"index-module_exBtn__Hfvbr","content":"index-module_content__fkr7p"};

function htmlTemplate(htmlStr) {
    var template = document.createElement("template");
    template.innerHTML = htmlStr;
    return template.content.children[0];
}
function newGuid() {
    var curguid = "";
    for (var i = 1; i <= 32; i++) {
        var id = Math.floor(Math.random() * 16.0).toString(16);
        curguid += id;
        if (i === 8 || i === 12 || i === 16 || i === 20)
            curguid += "";
    }
    return "a".concat(curguid);
}
function successIcon() {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE2SURBVHgBzZG/SsNgFMXPjRVqQQiIg5PxDboIURATFNTRydEgCG7pILjo5AvUQRH/gPUFOvgnYz8ENZt5gUIWFQTBqUYUr0lMTWLSrHqmm5tzfuf7EuCvRb8XWrMme+VODcTTwWNkcpiobs8dNAoBqrWmgD5bACvI73PBkm4v7LvdjZR+XxQOxGGB1jTkDEC1Vo3icAzxKiUzAyAJZq/IyMAQTie2Eozvb5MCMKPaK7w7vo6j9lliS1lAUkHb0ugMBkuVMHxxf42rJyfPmgKI7rDh7PmAWTQmN8Pwcfs8FWLiH1opPhUJ/x5aMD6+PmP5dhtTw1VcPtxkWglcj+dIWsuQvbf+O39UUCzXnj8cy1xB6Ccv4Hc9MBSFI0/iNDlSrRWDpD4z/jMsfKcodz52xKJf9K/0BXb1ZOFZYiDgAAAAAElFTkSuQmCC";
}
function warnIcon() {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAENSURBVHgBxZI9isJQFIXvfQkO0wyBYWCqIQNTD+5AXYJa2GqjZVyEC9AViK0gLkEba11CCgtBhGih8GJyvf6EhLzHK/VAmvPO+W7eD8CrhXmDpo4jY7srEEpEUL6bsAKB/UJtOzICTtNv16JoBkQuaESIfoxW5b268RNPZAOm8m0arwnO0NBxFICcfDXzZfHX4a+tQM4ftqcAEMnLT6RwD9qtJGeTBbBZ1IbDg2piCrDBpGtZBsaIyFDnyup2AXBcq63rteYBqAGI/x7gTwM0hH46N7H4AYWxtWTLBYMIyH+r737VP6gGQSSjCkd8Uzm+ZVKhLijHn01+uh6vFh/NOfEWC4fzAFuB+VSfrgvnD2Y2iCUvwQAAAABJRU5ErkJggg==";
}
function errorIcon() {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAErSURBVHgBzVI7TsNAEJ1ZUoEA8y0jpweJG5BcAzDyDUILffr4BmBEj7gA3IAUHMCiDIJYEBpwdpix8Xpho23hrVay3r735q3WAH8N/E1M4iAotDoBxH0g6lYqGiGp4Wb6fOENYHM40+qWAEKYPy1bULq3dp5nNadsgc8skDPRSEsnYBxtxLV59fQGWu0dY2y1d0uuDik09J0ARDLk+9UZLPcvyxAxr/C3cE0V7FrXqvB0vE52XTFLCPJ6TY6geHywj2ErfcEfDVxguQgIfFBWrbtmelVbJr8lkbmOkQKNnACFZAKWDgemtmwJWTwYWFNp2PT8hjzNp8Z7rh2CBzw9204nHacB/xz57IN6IvCZRWNzOE84joIYEflZca9y8vV4T6eQdK7zHP4VvgA2L3yQzd3WcgAAAABJRU5ErkJggg==";
}
function getIcon(type) {
    switch (type) {
        case 'success':
            return successIcon();
        case 'warn':
            return warnIcon();
        case 'error':
            return errorIcon();
    }
}
function getClassName(type) {
    switch (type) {
        case 'success':
            return styles$1.success;
        case 'warn':
            return styles$1.warn;
        case 'error':
            return styles$1.error;
    }
}
var MessageImpl = /** @class */ (function () {
    function MessageImpl(_app) {
        this._app = _app;
        this.msgRoot = document.createElement('div');
        this.msgRoot.className = styles$1.messageContainer;
        _app.getRootEle().appendChild(this.msgRoot);
    }
    MessageImpl.prototype.show = function (title, type, opt) {
        var _a, _b;
        var elementGuid = newGuid();
        var exBtns = ((opt === null || opt === void 0 ? void 0 : opt.exBtn) || []).map(function (m) { return __assign(__assign({}, m), { guid: newGuid() }); });
        var showIconFlag = (_a = opt === null || opt === void 0 ? void 0 : opt.showIcon) !== null && _a !== void 0 ? _a : true;
        var element = htmlTemplate("<div id=".concat(elementGuid, " class=\"").concat(styles$1.messageBoxBackground, "\" >\n                <div class=\"").concat(styles$1.messageBox, " ").concat(getClassName(type), "\" >\n                    <div class=\"").concat(styles$1.title, "\" >\n                        <div class=\"").concat(styles$1.titleLeft, "\" style=\"").concat(((opt === null || opt === void 0 ? void 0 : opt.timeout) && (opt === null || opt === void 0 ? void 0 : opt.timeout) <= 0) ? "width:313px" : "", "\" >\n                            ").concat(showIconFlag ? "<span class=\"".concat(styles$1.titleIcon, "\" ><img src=\"").concat(getIcon(type), "\" /></span>") : '', "\n                            <span class=\"").concat(styles$1.titleTip, "\" >").concat(title, "</span>\n                        </div>\n                        <div class=\"").concat(styles$1.titleRight, "\" >\n                            ").concat((exBtns && exBtns.length > 0) ? "<span class=\"".concat(styles$1.exBtn, "\" >\n                                ").concat(exBtns.map(function (m) { return "<span id=\"".concat(m.guid, "\" class=\"").concat(m.className ? m.className : '', "\" >").concat(m.title, "</span>"); }).join(""), "\n                            </span>") : "", "\n                            ").concat(((opt === null || opt === void 0 ? void 0 : opt.timeout) && (opt === null || opt === void 0 ? void 0 : opt.timeout) <= 0) ? "<span class=\"".concat(styles$1.closeIcon, "\" onclick=\"document.getElementById('").concat(elementGuid, "').remove()\" >\u00D7</span>") : '', "\n                        </div>\n                    </div>\n                    <div style=\"clear:both;\" ></div>\n                    ").concat((opt === null || opt === void 0 ? void 0 : opt.content) ? "<div class='".concat(styles$1.content, "' > ").concat(opt.content, " </div>") : '', "\n                </div>\n            </div>\n            "));
        if (exBtns && exBtns.length > 0) {
            exBtns.forEach(function (btn) {
                if (!btn.callback) {
                    return;
                }
                var ele = element.querySelector("#".concat(btn.guid));
                ele.onclick = btn.callback;
            });
        }
        var hideTimeFlag = (_b = opt === null || opt === void 0 ? void 0 : opt.timeout) !== null && _b !== void 0 ? _b : 5000;
        if (hideTimeFlag > 0) {
            setTimeout(function () {
                document.getElementById(elementGuid).remove();
            }, hideTimeFlag);
        }
        this.msgRoot.appendChild(element);
    };
    MessageImpl.prototype.success = function (title, opt) {
        this.show(title, 'success', opt);
    };
    MessageImpl.prototype.warn = function (title, opt) {
        this.show(title, 'warn', opt);
    };
    MessageImpl.prototype.error = function (title, opt) {
        this.show(title, 'error', opt);
    };
    return MessageImpl;
}());

var styles = {"mask":"index-module_mask__REFuo","content":"index-module_content__brGV6","contentText":"index-module_contentText__Klrds"};

var loadingGifUrl = window.URL.createObjectURL(base64ToBlob("data:image/gif;base64,R0lGODlh0AfQB/f/AAQEBAUFBQYGBhMTExQUFBUVFSgoKCcnJyYmJj8/Pzw8PAMDAykpKT09PSUlJVZWVhISEldXV1VVVTs7OxYWFj4+PlRUVFhYWHFxcQcHB3BwcEBAQG9vb3Jycm5ubouLi4mJiTo6OgAAAIqKioiIiCQkJFNTU1lZWYyMjKSkpI2NjUFBQaWlpXNzc46OjqampqOjoyoqKqenp21tbREREVpaWiMjI76+vhcXF7+/v7y8vL29vVJSUgICAoeHh3R0dKioqMDAwKKiohAQEDk5Of7+/o+Pj2xsbEJCQisrK7u7u9TU1AgICMHBwRgYGNfX19XV1dPT01tbW6GhoampqSIiIvr6+g8PD4aGhtbW1lFRUSwsLP39/XV1dQEBATg4OPz8/Pf399LS0mtraw4ODlxcXBkZGVBQULq6uvv7+8LCwvb29mpqavj4+HZ2diEhIdjY2C0tLaqqqpCQkKCgoPPz8/n5+Z+fnw0NDU9PT9HR0WlpaV1dXSAgIBoaGsPDw/X19bm5uTAwMIWFhfT09B8fH56enoCAgC8vL+7u7t3d3aurq+rq6jMzM4GBgZycnLi4uPHx8e/v7/Ly8nd3dwkJCU5OTp2dnTc3N5mZmWhoaOvr6+Dg4JeXl////7W1tdnZ2cXFxYSEhAwMDC4uLuLi4h0dHezs7Nzc3DY2Nt/f3+bm5nt7e4ODg9ra2vDw8BsbG+Hh4U1NTenp6V5eXtDQ0OXl5be3t3p6es/Pz2dnZ+fn55qamnh4eHx8fO3t7R4eHpubmwsLC7Ozs7a2tuPj46+vr8TExIKCgq6urjQ0NBwcHH5+fsbGxtvb20xMTDU1NTIyMqysrH9/f8jIyJiYmHl5eWVlZTExMejo6OTk5MnJycvLy19fX0NDQ5GRkWZmZsfHx2RkZJaWlrCwsH19fa2trbKyss3NzWFhYUtLS97e3mBgYJWVlcrKyrGxsc7OzpSUlLS0tAoKCmNjY8zMzGJiYpOTk5KSkkpKSkVFRURERElJSUZGRkhISP///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDcwQjZGQkNFRTJFMTFFOUJGQzY4RTMwNjEwOEMxNTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDcwQjZGQkRFRTJFMTFFOUJGQzY4RTMwNjEwOEMxNTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENzBCNkZCQUVFMkUxMUU5QkZDNjhFMzA2MTA4QzE1NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENzBCNkZCQkVFMkUxMUU5QkZDNjhFMzA2MTA4QzE1NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAUKAP8ALAAAAADQB9AHAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSJMqXcq0qdOnUKNKnUq1qtWrWLNq3cq1q9evYMOKHUu2rNmzaNOqXcu2rdu3cOPKnUu3rt27ePPq3cu3r9+/gAMLHky4sOHDiBMrXsy4sePHkCNLnky5suXLmDNr3sy5s+fPoEOLHk26tOnTqFOrXs26tevXsGPLnk27tu3buHPr3s27t+/fwIMLH068uPHjyJMrX868ufPn0KNLn069uvXr2LNr3869u/fv4MOL/x9Pvrz58+jTq1/Pvr379/Djy59Pv779+/jz69/Pv7///wAGKOCABBZo4IEIJqjgggw26OCDEEYo4YQUVmjhhRhmqOGGHHbo4YcghijiiCSWaOKJKKao4oostujiizDGKOOMNNZo44045qjjjjz26OOPQAYp5JBEFmnkkUgmqeSSTDbp5JNQRinllFRWaeWVWGap5ZZcdunll2CGKeaYZJZp5plopqnmmmy26eabcMYp55x01mnnnXjmqeeefPbp55+ABirooIQWauihiCaq6KKMNuroo5BGKumklFZq6aWYZqrpppx26umnoIYq6qiklmrqqaimquqqrLbq6quwxv8q66y01mrrrbjmquuuvPbq66/ABivssMQWa+yxyCar7LLMNuvss9BGK+201FZr7bXYZqvtttx26+234IYr7rjklmvuueimq+667Lbr7rvwxivvvPTWa++9+Oar77789uvvvwAHLPDABBds8MEIJ6zwwgw37PDDEEcs8cQUV2zxxRhnrPHGHHfs8ccghyzyyCSXbPLJKKes8sost+zyyzDHLPPMNNds880456zzzjz37PPPQAct9NBEF2300UgnrfTSTDft9NNQRy311FRXbfXVWGet9dZcd+3112CHLfbYZJdt9tlop6322my37fbbcMct99x012333XjnrffefPf/7fffgAcu+OCEF2744YgnrvjijDfu+OOQRy755JRXbvnlmGeu+eacd+7556CHLvropJdu+umop6766qy37vrrsMcu++y012777bjnrvvuvPfu++/ABy/88MQXb/zxyCev/PLMN+/889BHL/301Fdv/fXYZ6/99tx37/334Icv/vjkl2/++einr/767Lfv/vvwxy///PTXb//9+Oev//789+///wAMoAAHSMACGvCACEygAhfIwAY68IEQjKAEJ0jBClrwghjMoAY3yMEOevCDIAyhCEdIwhKa8IQoTKEKV8jCFrrwhTCMoQxnSMMa2vCGOMyhDnfIwx768IdADKIQ/4dIxCIa8YhITKISl8jEJjrxiVCMohSnSMUqWvGKWMyiFrfIxS568YtgDKMYx0jGMprxjGhMoxrXyMY2uvGNcIyjHOdIxzra8Y54zKMe98jHPvrxj4AMpCAHSchCGvKQiEykIhfJyEY68pGQjKQkJ0nJSlrykpjMpCY3yclOevKToAylKEdJylKa8pSoTKUqV8nKVrrylbCMpSxnScta2vKWuMylLnfJy1768pfADKYwh0nMYhrzmMhMpjKXycxmOvOZ0IymNKdJzWpa85rYzKY2t8nNbnrzm+AMpzjHSc5ymvOc6EynOtfJzna6853wjKc850nPetrznvjMpz73yf/PfvrznwANqEAHStCCGvSgCE2oQhfK0IY69KEQjahEJ0rRilr0ohjNqEY3ytGOevSjIA2pSEdK0pKa9KQoTalKV8rSlrr0pTCNqUxnStOa2vSmOM2pTnfK05769KdADapQh0rUohr1qEhNqlKXytSmOvWpUI2qVKdK1apa9apYzapWt8rVrnr1q2ANq1jHStaymvWsaE2rWtfK1ra69a1wjatc50rXutr1rnjNq173yte++vWvgA2sYAdL2MIa9rCITaxiF8vYxjr2sZCNrGQnS9nKWvaymM2sZjfL2c569rOgDa1oR0va0pr2tKhNrWpXy9rWuva1sI2tbGdL29r/2va2uM2tbnfL29769rfADa5wh0vc4hr3uMhNrnKXy9zmOve50I2udKdL3epa97rYza52t8vd7nr3u+ANr3jHS97ymve86E2vetfL3va6973wja9850vf+tr3vvjNr373y9/++ve/AA6wgAdM4AIb+MAITrCCF8zgBjv4wRCOsIQnTOEKW/jCGM6whjfM4Q57+MMgDrGIR0ziEpv4xChOsYpXzOIWu/jFMI6xjGdM4xrb+MY4zrGOd8zjHvv4x0AOspCHTOQiG/nISE6ykpfM5CY7+clQjrKUp0zlKlv5yljOspa3zOUue/nLYA6zmMdM5jKb+cxoTrOa18zmNrv5/81wjrOc50znOtv5znjOs573zOc++/nPgA60oAdN6EIb+tCITrSiF83oRjv60ZCOtKQnTelKW/rSmM60pjfN6U57+tOgDrWoR03qUpv61KhOtapXzepWu/rVsI61rGdN61rb+ta4zrWud83rXvv618AOtrCHTexiG/vYyE62spfN7GY7+9nQjra0p03talv72tjOtra3ze1ue/vb4A63uMdN7nKb+9zoTre6183udrv73fCOt7znTe962/ve+M63vvfN7377+98AD7jAB07wghv84AhPuMIXzvCGO/zhEI+4xCdO8Ypb/OIYz7jGN87xjnv84yAPuchHTvKSm/zkKP9PucpXzvKWu/zlMI+5zGdO85rb/OY4z7nOd87znvv850APutCHTvSiG/3oSE+60pfO9KY7/elQj7rUp071qlv96ljPuta3zvWue/3rYA+72MdO9rKb/exoT7va1872trv97XCPu9znTve62/3ueM+73vfO9777/e+AD7zgB0/4whv+8IhPvOIXz/jGO/7xkI+85CdP+cpb/vKYz7zmN8/5znv+86APvehHT/rSm/70qE+96lfP+ta7/vWwj73sZ0/72tv+9rjPve53z/ve+/73wA++8IdP/OIb//jIT77yl8/85jv/+dCPvvSnT/3qW//62M++9rfP/e57//vgD7//+MdP/vKb//zoT7/618/+9rv//fCPv/znT//62//++M+//vfP//77//8AGIACOIAEWIAGeIAImIAKuIAM2IAO+IAQGIESOIEUWIEWeIEYmIEauIEc2IEe+IEgGIIiOIIkWIImeIIomIIquIIs2IIu+IIwGIMyOIM0WIM2eIM4mIM6uIM82IM++INAGIRCOIREWIRGeIRImIRKuIRM2IRO+IRQGIVSOIVUWIVWeIVYmIVauIVc2IVe+IVgGIZiOIZkWIZmeIZomIZquIZs2IZu+IZwGIdyOId0WId2eId4mId6uId82Id++IeAGIiCOIiEWIiGeIiImIiKuIiM2IiO//iIkBiJkjiJlFiJlniJmJiJmriJnNiJnviJoBiKojiKpFiKpniKqJiKqriKrNiKrviKsBiLsjiLtFiLtniLuJiLuriL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Y5rU+S01qDfVZk6jatR/CnOSD/1dTRUmVMUQlasK5SlANRpW1o3Vpk1F41PX2U2pelWcDv0pRLEaV0wOtaV17SpD85hXpQIVmWVNzFldmtap9pStehXrWBOLmMUGtrF3begw23q5t1L2MJZN6Dcdu9bCWvWwt/ysYUI70mgONpJVleVVEZtVdf9ulbGjzSxhNxtZt062to5Jg8DoKlqLkvar5OxtZ3/b11BdCxKsSIXtetm818IWsobdK22bW63n+kK6zApAQquL0YyaVraozZxqC2MtZwTCF5homnip20akYve02k0tcBvT3vfGN7zjrS9V74ve/Kp3v4zpL3zlG2BIInee2ZVsTddLGAX/VwTz7R55yytT/ErYoxQejIUZTF8H45W3EfbthBG8mBEDuMR4LC2KPaxiELNYMS7GcINj/OCN0ni5K+ZuZHKcYWAK+LHn1ehs9StkyBB5x51E8owL/GGV3jgxT4ZxlGUMVuX6zbNXRkyWNXxkLic3xUC2cZMfM2Yjm1j/s11G85eZO0q58vda/iUxmd+82zj/eM5BrrNfcYznBb94zzw+sZ+pXGMrrzm4hb5wkatrXbx1mNFpdrSgneteQ+tYy7rt85n//Dc6X5LTeT60mxMN51FjGtBq3nR3Oy1pKIf6ukmG4ZIP/Og701rPq95yjzkLa02fetap/jSiha1oVys5vbgM82HaTOnyPnDRzzZwtHud4EgD227DYralDWnM6V3zYNxucaFTIQBVgxuclZZkuc0dOIeNTdqGUTC73V21cN/62uGbty1tpjMt4pu96263slft73iPsdyVtPfDDl7hhPObag3ncsAFHnGDp5vQnd73wt9tZI1DT+DH/6y3x2U9ZIuPvN/wNnnvUN7xnFFcxC6fNMxL/tWNz7vmBL+5YPStcJ1jPOY9PznHQ7nyY7c85EXfccaTPvOlExxiTR/i098rcqP/kueK9jnEmW7zj2M551JHetiV/nOyB93sYkY7jKe+9qq3/eoSF5fQA0P0i39d3PEk993HhvWys9zJckc03eEs9o66/d5wn3biGa52xrN97HjP+h+3/t2oz73yfW48TQmfd3Qfns2TJzngzQtBq5Ne8071Ndc9r3jQ47r1g1e54Z2OeKj73Z1gt7zdMf/63Wu997P//eJDf3nHZ974m0d+55Vv+3F/kvi6f/vpIe37lx89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w7Onz59ACQkdSrSo0aNIkw5dYwcMyadQo0qdSrWq1atYs2rdyrWr169gw4oVaRKlSpYuYcqkaROnTqBw49ZRSreuXaFMnY7dy7ev37+AAwseTLiw4cOIo3KxU+dXNlu2sjHatGnWKlurdmXbdRly5mygQ4seTXoWo9OoU6tezbq169O/XgGykri27du4c+vezbu379+HrUxa9cRdkxtB/oQ6dnzHjRxBoue48byJmuvYs2vfruaP9+/gw4v/H09+fPdj1GqhmkWoDW3g8OPLn0+/vv37+PNH5BJmUxYdLGQyTibBXHIJL520004n1WTCy4MPBiPhhBRWaKGEj2So4YYcdujhhx4G80gwdEjTBCi/ABKGfiy26OKLMMYo44w0CsTFGqts84IKyCADHAkk3CMNOrPUUeORSCap5JJMNulkREWEYUsTwYgy3wh0HLOKkU926eWXYIYp5ph72bFKDtW0cqUhauxCCJlwxinnnHTWGacVuwSRSX13HLMLIHYGKuighBZq6G14BlENn8dkA+ihkEYq6aSUVppRonvS1+eflnbq6aeghjonpoxyKuqpqKaq6qr0kaqpn4+y/yrrrLTWaqtXrs63aay39urrr8AG+1Cu8u0q7LHIJqvsqsTGZ+yy0EYr7bR1Ngvfs9Rmq+223MpoLXDYdivuuOSWi9u3v4Vr7rrstusuV+j6pu679NZr770YxdvbvPj26++//urLG78AF2zwwd0KvBvBCDfs8MPAKqwbwxBXbPHFoUqcG8UYd+zxx4JqjBvHIJds8slPinwbySi37PLLLapsG8sw12zzzbzJXBvNOPfs88+A6ZwYz0AXbfTRWAmNGNFIN+300x0pfRjTUFdt9dUMSW0Y1Vh37bXVWhfG9ddklw102ISNbfbabLuM9mBqty333Bi/LVjcdOett8F2B/+G996AB05v34D9LfjhiItL+F+GJ+7449Au7lfjkFduua+S90X55Zx3rmrmfG3u+eikWwr6XqKXrvrqhJ4+Vuqsxy47nK6LBfvsuOfuZO1h3a7778DPyDtYvgdv/PH4Df9V8cg37/xvynvF/PPUV19b9F1Nb/323AedZ6a6wtr9+OTXhz1X2pev/vpW4dkE+MWKz/789CPmPvzOyl///vz7dX+pvOqfAAcIr128D4AETKACr/K/V5lqgRCMoEgaGL4HSvCCGMyX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ASPIeKNghU64BVVg+eCHfukIg12Aghy4g2mYgWuwB6qAfGLIgg6P/vBnkTD/WNQb4AUSEIWYnopDMAdQ+H3xh38WaQNOUANzYIFNk4o5CIX3j3+A+CdwIMGCBg8iTKhwIcOGDh9CjChxIsWKFi9izKhxI8eOHj+CDMlIz7FbKYyU24gLxhMwIV/CjClzJs2aNm/izKlzJ8+ePn8CDSp0KFGedn4Vc4UOzQsjrDB6UEEsVtGqVq9izap1K9euXr+CDSt2LE8rk2zletfuUAeLzOhsO0V2Lt26du/izat3L9++foGC2VTPXCYXrbpM9PBhmKIwfx9Djix5MuXKli9jtttmV64cw+RUQ8YB4hhfhvQ4zqx6NevWrl/Dji17q51NqGrtgIEC10Nmc25J/5otfDjx4saPI0/OF9CpdduG3UHxdCGrby+2rVGufTv37t6/gw8vEAygTevqyXvUaiEIFjdQWREvfz79+vbv4y9qRZKrG0J2I0RJJ5As8Ut+ByKYoIILMnhgGpIoQs05dKhgjUFYvFDPJg1y2KGHH4IYImRr/KIKOsN0wgxBrNxzSykiwhijjDPSWKNNYEgCxTvxOIJLL8yMAAM3hNhYpJFHIplkjXZkw805LEzxSCZToKGIHUpimaWWW3K53RrZOJMFFLW4kwsnkbjUpZprstmmm325BEaab9JZp5134pmnnnvy2aeffwIaqKCDElqooYcimqiiizLaqKOPQhqppP+TUlqppZdimqmmm3LaqaefghqqqKOSWqqpp6Kaqqqrstqqq6/CGquss9Jaq6234pqrrrvy2quvvwIbrLDDElussccim6yyyzLbrLPPQhuttNNSW62112Kbrbbbctutt9+CG66445Jbrrnnopuuuuuy266778Ibr7zz0luvvffim6+++/Lbr7//AhywwAMTXLDBByOcsMILM9ywww9DHLHEE1NcscUXY5yxxhtz3LHHH4Mcssgjk1yyySejnLLKK7PcsssvwxyzzDPTXLPNN+Ocs84789yzzz8DHbTQQxNdtNFHI5200ksz3bTTT0MdtdRTU1211VdjnbXWW3Pdtdf/X4Mdtthjk1222Wejnbbaa7Pdtttvwx233HPTXbfdd+Odt9578923338DHrjggxNeuOEvpWFHG3ZYkYbjj0MeueSTU1655ZdjnrkVdnDeueefgx666KPb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MIBmZQkF6R25YZ9uEf+T984YuXPDzqk/9w79p/fw48uf/4mY/fv48+vfz78/sVs5cIPKKYRYZ+CBCCao4IIMNujggxAymMYr6/whBy/44LNcNdXcYQw1sUiyRoQklmjiiSimqOKKLLYYWRqJwHELLyA8Z8QdSjjzS4Eu9ujjj0AGKeSQRBaJHBeRPHFOPNFlQgwovxgp5ZRUVmnllVhm6WMRhDzxDpPQ8fIJKJJoaeaZaKap5ppstnnVGqCcM90trkTi5p145qnnnnz2mSKc70xHTJ1+FmrooYgmquiiYMEpp3R02snopJRWaumlmPbp6JyEZurpp6CGKuqoDm4Kaaekpqrqqqy26mpZpkb/F+mrtNZq66245npQrNDNquuvwAYr7LCaxsmppMQmq+yyzDbLIq/P+erstNRWa+21lkHrnLTYduvtt+CGq5W2zXEr7rnopqvuugaRy5y57MYr77z0CuvucvDWq+++/PaL6b3K5evvwAQXbLCaACcn8MEMN+zww88aeyqyEFds8cUYG5gwcgtn7PHHIId82MaWdSzyySinrLJVJFdm8sowxyzzzA21TNnLNOes884n2zwZzjwHLfTQBvssGdBEJ6300ukaHRnSTEct9dTMOg0Z1FRnrfXWr1r9GNZchy322JZ67RjYZKet9tp5mt0Y2mzHLffcVbrNGNx056333iva/70Y3nwHLvjgCPqtGOCEJ6744sgZnhjijEcu+eSGOY4Y5JRnrvnmXll+GOachy766B55bhjopKeu+uo1SywrqqzHLvvsFJleGOq056775La3hfvuwAcfeO9s/S788civTfxaxifv/PNZL69W89BXb/3Q0qdF/fXcdx9z9mht7/345H8M/lnil6/++g2fb1b67Mcv/77ulwX//Pjn3zQowxyr//8AxBic+jexABrwgAcboP8QyMAG1kuBBXSgBCeILgi+jmIUzKAGqWXBXsFugyAM4bA6GK0PivCEKKwVCbdlwhS68IWjWmG5WgjDGtqwUjJ8Fw1vyMMeFiqH+NqhD/+HSMQ2ATFgQiyiEpeIpSMqLIlMjKIUh+REjkFxiljMYt/4t0AtevGLESPgBcFIxjKWqIolu6IZ18hG56DRZWpsoxznOJk33iyOdMwjuNoQiV+8AhBp4ILM7PgzPGYMDGk4jh4zqBlF5GIb6HDFLOowSC5GEGZF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KnUq1apWr1IFtAoVqK5ev4INK3YsWThmz6JNq3Yt27Zu38KNazYi3bp27+LNq3cvXpAiSZpEiXUw4cKGDyMeWjQx48aOH0OOLHky5cqMtXIlq3kz565yP4MOLTou39KmT6NOrRqh35ElT6a0LHs27dpQF9vOrXs3796+fwP/V4q5M/HiXkcjT6787ermzp9Df94aMOzg1q9jN4w7O/fu3r+DDy9e5XDj5jcvT68+efT27t/DXzj9teDx9u/j345/P//+/v8DSBMgtmR2noFhrZeggnDF16CDD64Gkiu7UFdfgBdiSJl+GXLYoYcfgmjYgM6A8s+BJ3q2oIorzgWhgyzK5aJeIIGyCyElffJJbCHy2GNTG/oYpJBDEtnjgAWieCCMSzLZpJNPjiZjXvNZMcwwKRSZpZYzdSHKKluCGaaYY/4WxiyqOOOKM6goso4qb3ISp5xz0lmnnXe+maeee/LZp59/AhqooIMSWqihhyKaqKKLvrmOo49CGqmk/5NSWqmll0qqCCqxnBJGGmm8844QZJIqZAeO2FKqqquy2mpUnhRhxyu7FFNKMbbskg0jm/Daq6+/AhussMMSW6yxwTKSrLLLMtuss89CG62001JbrbXXYputttty222ys8ySzS6bTGIHGGCQQ86orrIbIAhfthuvvPPSq5In/6QRBiGRRDJJHYQAskYYAxNcsMEHI5ywwgsz3DDCa0AcscQTU1yxxRdjnLHGG3PcsccfgxyyyCOTDDEggBBCyBrmcsGFPPLsWK/M3JFwySkz45yzzkEW0XLLKhURtNBDE1200UcjnbTSSzPdtNNPQx211FNTXbXVV2M9dcvntix0EP9BfMLLzmPvdskLNwBCttprsy0erG3D7ZgncyuiSC7DvDDFHULA0LfffwMeOAxCEF644YcjnrjiizPeuOOPQx655JNTXrnll2OeOeFTcN6555+DHrroo8PAAgtCXJJJJobAII08OlCjShpx01677bPde7vuWA28CTxB6KDDDV8TX7zxx+eQww3LM9+8889DH73001NfvfXXY5+99ttz373334O//A7jk1+++eejn776Qaihxg2QyPNJIDmEkwso2kTCxe7789+///9fJxuugAIU4OCMAyIwgQpcoCuS5MAHQjCCEpwgBStoweNAKS3OqBsoxAAPeETBFaWYRSTWAAb/AKIwhSpcIQuxsgZC1CFgI0NZympowxviMIc63CEPe+jDHwIxiEIcIhGLaMQjIjGJSkQixMIAiElIQhKTWNk/itDCK2Ixi1rcIhe76MUvgjGMYhwjGctoxjOiMY1qXCMb2+jGN8IxjnKcIx3raMc74jGPetwjH/voxz8CMpCCHCQhC2nIQyIykYpcJCMb6chHQjKSkpwkJStpyUtiMpOa3CQnO+nJT4IylKIcJSlLacpTojKVqlwlK1vpylfCMpaynCUta2nLW+Iyl7rcJS976ctfAjOYwhwmMYtpzGMiM5nKXCYzm+nMZ0IzmtKcJjWrac1rYjOb2twmN7vpzW+C/zOc4hwnOctpznOiM53qXCc72+nOd8IznvKcJz3rac974jOf+twnP/vpz38CNKACHShBC2rQgyI0oQpdKEMb6tCHQjSiEp0oRStq0YtiNKMa3ShHO+rRj4I0pCIdKUlLatKTojSlKl0pS1vq0pfCNKYynSlNa2rTm+I0pzrdKU976tOfAjWoQh0qUYtq1KMiNalKXSpTm+rUp0I1qlKdKlWratWrYjWrWt0qV7vq1a+CNaxiHStZy2rWs6I1rWpdK1vb6ta3wjWucp0rXetq17viNa963Stf++rXvwI2sIIdLGELa9jDIjaxil0sYxvr2MdCNrKSnSxlK2vZy2I2s/+a3SxnOzvSVRwwC0/wLGl/WowgLGIR5EhBPMZxC22UNrY3TUQzpqCClbiBFZ3Yhmx7K9NJZOETMEHDLHxrXJVGghN6UINMjAGHMOjvuNIVKSBccQMq0EQNsVjDdLvLUSsmAhVBuMk2jOLd81p0E5wQwzFyIg9XoDe+Eo1FLf7AE27IN78LtcMutnGLYfQEEubVL4EHuotAtAMFRvDJFKixijAUOML/1AOWhBKOYkg4w/Z8ISAiAYpAHCUZYtAwieWJhncQ40pJCUeJW9zOT8xhHO1YChq46+IbjzMNhCjGOXyBi6ZQwRl2wDGRvwkHNLhgD914ChqykIgiQzmb9YD/RIWjco5cRDnL0bRDNuohDUMYoirEIISWy7zMbIjhHXM4hC+swoIs2NjMch4mJ8KBBsJkQgeuSNuc+8zLSSwBDVSIGVbkEAQM+znRtyRELV7ggsS8AL+KnrQs14AKJTjGGJTeNCsVAYUluAPTjuGFNobM6VOTkhsvkAEQIoMCJRRjdqietSe1kYlHT0YO9XgyrXttyUloAx5yGIQbylGZHMDW18qWJDyUkAJRHEE25ACFFZdtbUYe4wUvsE04JHHtbxvyF0G4hyNAkBt5wKEO4F53IKNwh97o4AmTYDe99xgLHfxGCZyoN7/n6F8d7EDTv6ECPGTd74OvUQzfmEMn/66jg1gjPOJl5EIbfqGCH2THHNuwhcEl7vEtMiIXgYjHDE6w5OwMgxuv+DjLtRgEOQSjHGX4zjsU0fKbq7ANjJDHPe4hnkdQA+dC9986AjEHSrhhPEb4BCNMPfSn0+4JTaiyfYDgjmx0HOpaz1kaEgGKHJxjEfzJxDDQoe6to31mv9CDMdqx4P+8Y8Bpn3u7ilELNDziQvdYAt37zqo6qIIaaBAuhnzxCej6PfFiOkU4qBCManDIA5nIRSQUb/ksRQIKAAbRLVDRhsuDnkeRYIQq7s4jOcCDz6FffYYUEY4/3NlHalg562sPIFQYQ+xCIkeybe97+7xiCcYwwgeKRP+NU2T998rHTja4AQNHbOkY+14+9a+jinAQHkw78Hb1u6+bNKyiGcZgAdW39GYreD/9tMnGHwxhbjJ1QgelVj/9J1MMeJxjVdIIR6rq7//ElEI95MAtJEOrfIIe/F8CFgb7yYDYuMoUiJoCSiBVSIIekIO8vMDNTOAGMsUvcAIqLMExCFy8jAM3qB4HoqBQhIIOQILMfMA7uEKcpeAM7kQioEHp4EwKhEM20GAP3sQrQEEyqIAo7Awa2JwPImFMMIIefEI8/NjOUMGIJeEUrkQboEIOZB/ZNAGvUaEPrkEWGMMjNBzbSMMSSMIJdSENFsMOQF7cEIMYaGAabmAYRML/9d0OJMCXHEpgFASCEijBO+xOPeihBAbDOLzb/ihBcQ2i+oFBHUSBEfSC/8hBLXDhIlafIkhDL9ACPfwPMehBHFqi8l3hOIxBCslDFoSi7xHCOqCDDpwDC7BQe6Ui653CNgjBB/jAFREDKM6i4q1CLXzCjGEREIgB7fVi3/0CKDQDGmyeFgUCFFTeMc7dJoTCC4whF90BGkyfNG4dIGTBOcQDGE0BPHDj003CKpSCIsBDC4rRDSBeOd5cM0ACMYygGMkDx8Fjy4XCFNDBGRmDM8hgPvKbAKlBCozA+5nROeyZQB5cFtyAMYzDIXRBGilBLKAfQ9ZbFsjBtq0RC7iD/zFi5LdZASqQgwsgpBoRwzqEJLvZAiRAIhvxAhVQQyWu5LIxgiCyUTK8gw7AgyLWpK/BASTMDyS02hrdQC703k8q2yN8wDisUTm0wj28AxSApFL2GjlQgrGpEQvIQDLsACicnVXO2i4sATGAwDXYwxq9wzaoglgq2yoEATm0QweokS60QCeEAg+65axxgR3AwSKA2RphgSjcATdw316eWjGEQsxZwyGokQpMwQuEAmLSmiscg+6p0QX8QDAEAjpQ5qnZQTGoQTJIwxphADi0QhBwwi98JqclQg50AgmgABsdAgm05qyBQmmu0SUIwR08AnPd5qS9wr6oQg6wETE0Q/8UoEJSBmefBYE5DAMBrtEcvIMY0GRz9lk9xIPPqREKgAAIXEIzsCZ2+plWNMEItNkanYMS1IItfB559tkTqAEdMEO0pVELjIMSQAF8Kho3yMMihGMazQAbHII0gAKZ8aecvQI8AEE7XGMaIcM4KEJAJmiWSUI4VAMrYJwagUA1CMFoVaicZZ48rJEJsIMjsAAa1EKIatkauIIa7MAt5J8ajYEGcEMbpEF0sWiUlcI5zAEWsJEPsEL57SiUEQI8wOIaAQEVvMA59F+RElkdrMI6PME2AOIaNUEWHCaUEtkaOMMNmMMUrFEv3EMgHCGXFhkhxEIoEJoZoYAPzAE5OMP/e6Kpi2WDKjwBPBjnGi2CoVVlnZYYKPxBDhBDTu7AMXgmoOLYExjDoK2ROYSCK2hDNsybopKYHcwCN8jAN+DaVm7DeFpqi3HCNsgBCmhlGnWCIXzCmYaqhr1CLdxAM6bRO0CCDmwDKpxgqxbYK6CDMUxBmKllPaxDrupqhLnCOQijGs3BFPzBkxZrgZ2QFWiDfa0RFUhDINTCJqDhsxJYFNRDPYRCoarnMTgDt2YYqZoDG/3ANBhCMzCnucZXGGyCDtzDN7CREcTDLSgCscLreTkDGnxDF9ClGn1DCiRDFPRrgeWCDhBpGUVAGVjDFATBfiZsfKXBKejBO6RAw5IR/yVwQCZAwSZQaMVOF+59APStUTyQQDCQrH5xQvuxkTScgzkkAyq2rHcBQjFkQTjsABuRgzusQyK8QqXebHctATkYggOq0SUcg08WrXcVQw5cwhrV6ziQQx4+rXRtwi5owxNQqxq9QyBsQzGEZdYa1xJAwjxiZhq9QDO0pdlOlyqkQN6tkS8wwzjcgDZcJNz2lh3Ewid8ADIUnxplQjUEAiDoKN/2lisYgyhoABu9gzHsqeL6FiFAweSmkTyEgx4sQRYwAuXKljfuQDJg1xrdwpyCrnEpwjlwpxrdAwtsw5bSjkqmbkHNAos9KjEoATUgGu3UwS5kwQCyau3uUxbUA/881EPPqucS8GvbMAIohII5fIM1sAIv/EExjCzxyhM68A1HppEH/EA8NAOC1k7O1sOVsgQMBAHfaa89MUIm5OJ0ksA9KIHc0Q4jJOpLLEIyUAOdtq87FQM3pAAzeEALrJEcGIOk7U4sxB5MfAAW3AMkvOv/ntMT5IAMYMEerBErTEETgOj+UCxN0AE1gCoFm1MawIMxtGkZlcO6lmGn8M8pjJdNfAI3xIIJk5OaqoEQGMFtTWcnYO3+2MEq4CROyAAVfMIH43A3ZcEfvMBsrlEykKYC888qHIMc7ETxIdsSb5MVxMIxBEI9otEOwIMzqELv9o8eFGVPuEMs1IEVOB3/F0vTabEA3a6REqAChKFQGwSBU/oEEBADGshDMjSDHEvTJrjDCpeRCuADENRC2fqPHaDCjArFHMwB+xqyMuXLK3ACOmQhGumkGigC+QKQIjRBUvzAB6ACIWxrJhcTOoRCE9wCG50NOtzwCjHCDSwFPbDCItisKxMTw8rBuqTRB2TCLcBBCaeQuzWF4ZIjMP9SI4KCHMhmRy6Cnr1C8qEQiDmFEACBORyDKvgvNN/SOkDCB8wAG6VADmByC7WBK8BAVEyDKEyBFJLzLUVBECRpGqUDGxiBDtDuFaXBabVhVHRCEDjtPb9SGKzDHyTDC3DsGE3DIRDDL+gxFgHCElCy/1RQQSiggi2Ugv0qdCqJAQuIgi+cKhpdQjx8Mha9QiFfBQuYwwvQARWPtCm5KL6tkTToQBCgAeZqUSmQ6GB8AzLY602X0iu4AjoEwS14LxopgSKEQUl0ERj8gjscImHQwzTIAxSUwnUidSZNQi4sQjAkaxrBwIqCkTa4Q2JIQAd0gjHMcFhz0jo0cBrxwuqgAbx4kSTAdGMEQyZwM11bUimoAiqIAVCfEezEQhskbhetA/o2xjSwQjV8JGFP0jYMgzzIKhqhwDlQ5RitgTvEc2S0QCY0g15itiPlgiEEA7BCKBakdTSGESGAAjtOxjmEw9uudiL5Dgu0wjSwEevk7/8YNbRs9A0QoEFA9/Yg1VkKOAIHrJEMnAMxFPcY/UG60kY17ABfNzcgLcEObHQaNQE8ZME2ktEs6KZt1AMaf7cesR8LZILSolEw3AIU8OIYgcFow7ZtKEEQDA9zvzcdRQI3CAEWsIKyVoMccIMyk5EjvsNZ28YdXMIc9OOA19EmLMEsR/EwHGVCl1EWUNlvHII1cDiGv9E2sI8OXKAaPQK2TrAZBYEi64Y4jMAOoAKKs9ENdMIjZHUxAwE8ODgaUUHrBscloIFN67gYcYEV1AIIoKwaTQEL3EIU/CkaFcODWkcKCMEwrMJjL/kWpQEjuAIaGMEMgMMaGcItbMPnutH/GvDY4HIHBuDCC/B2mG/RK4iBEmRC0qWRPVwDMkhDFMjuGoECMUwteNwDb+E5FxUdFqsRFhzCPchf9qbRDVx4eHQ1IbRBG+xto6tQGDQBMau0EJy4HFGBD49HCsAAFaiBe4P6/0gCC3RqGVkCOMzBMOAuHc1BfxiDO6B3rPvPKbDsGbGDB9xCLEgRHdnBE1iDf3xCE7Q3KQv77rwCFfQ6C7uBTtdRJFCDhO/HHbzAOzSDs1b77YQBNaxxGKWAIbTD2tLREyyCbQZIMBgDOmzCue/PLhyDZHeR5LoDHJTCRdfRrmcIN6wD0eo77YCBKvxBpnORZN75Ha2BLnfIFHji/5Av/NoAwjR3kSiMgzbGsR2lAe6ByDCU68bXzinc9RUZwiOcgzYQPB6tQxPYsYe0tcrXThSIawuN+zkoNh6pghLs84fswJXrPNlIAhScegrlADfkwhKAOB7lwM1/yCd4d9KzTR1gmQqdgx5sghW0sh5ZwSZEdIYMQyloPe1oQ0vzDwz8wdTnURtwAhr4MY8EgkivPdm8wtfyDxVQgTE0wcTzUSnoQNGDSLtC8t6TDSCIQWffDhpsg9QPkh7AnI+cIuPDDRhkQwrvTickAzpkPSAFQSb4CP/GuObrTBpc9e3IgDncAjowwtgDUjIAaY+ogTNQu+qrTTH0PNxkqcIPkv8Vmr6PQIHw877aTELOs80RDIIxuMLIC5IdKII81DqIqEG+Jz/cUH8Eko0okAALiEHzAhLjPTWIkIMeaPP27wwX/AI6nH8OSoMSaH8ilYL3h8gOED77kw1ApLEl719BgwcRJlS4kGFDhw8hRpQ4UWGNGd+IoaO4kWNHjx9BhhQ5kmGRJyRRpiSJhUoUQiphxpQ5k2ZNmzdx5tS5k2dPnz+BBhU6lKjINMfuFVVac8aMdk1KTVo6lWrVgoyOWVVqpN4arV/BhhU7lmxZs2fRplW79t8TGWzNjnAkB25duwU35SJ3d6YQvn8BBxY8mHBhw4cRK0wUzlzioEJSPGLhmPL/T0nwCFbeaCiQZs+fQYcWPZp06aB5G5uGaawJPDFRVqmW3XEdsdkJp8jTc5t3b9+/gQcX/vOXmuEcX2zbdfw4l1qTfxujtpx5devXsWfXnnhJiu0KR7Qjxun7bS7Zcoz7HUzNJivl4ceXP59+fZKqPsmXs0jeNm32R5ulHmOAkyGWNA5LgxBGnNEjl1r0iFAPMcSIsJZacskwwws57NDDD0EMUcQRSeQwF3jgqcUVRgB5D8AXYYxRRrEY4SYZ+BY5Bo4ZQcvlFuCEUAKxREC5oRo3urmgBlq66YaddNJhh5YyajjBSitrkKKMLbns0ssvy5BCzDHJLNNMMWtIU801/9ls8wQJLJCihWqagMIZHvHMU889ZbJjF420w8CNe26IhU/HVoEEuBdu2NGwNRT5Q44PKhvBnBv+QfDQTTnt1NN/ivjnlz+yAwELFqCo49PC4HgBOB1AUdWwSGqBxDvNUviEmDZW7dXXX+lz1Do6HhkGWMGs4CY4PQBBjJFQQkvGmJeOrdbaa33TBg3m5LhFByVy+A/buqyIZdvfhrElsWJ2CA2IFxIZV9556XXsFHeOQ+OJUyapg9p604rlGOh8U0KSxDhRFLQpptgE4IchjjgtQDj5g47gFtHjX4nPEhI4OrbhFTFF8gPtjjtm4VjllVkeioswSvGYtylgoKKJ2P9aJqsUfIAT5RbqEHNlGBhMRjnno5FOWqbdeLtBj1UkaVZprcAARJ4ffmPjnTAoE5roz+igg5GpyS7bbIjMve0cV87WapM/eP7NEc28XniKsdvOW++pN8HXNBA+uMOdV/aeCgoCgbuE7qHtxrvwxyGHeJIsjB2NjkWGyWUSMCInKgx3CO7NkGF+qazuzxh2vPPVWT82G1JDmwEF6UppfShCmgBunGRq4bprxlG/2/bhid+0CDs4cdUzDY7w5YVcUi7+p9rlZgGOSbgwHXjPUpfe++9lVFizVu4pJnvwd7JiFmqC+e0bvxf/mnvh0a/f/u/EQNwxIS65RNn7c7KOUND/5TeLUJdnTjc/1QGQgQ30DSPccY7EoOEPofgD0xxYk9wB5x3UAE0CNdO9DI6QhKRJwyrCobzCHIMTXikhTUqRGt/IIRzF+OD2Qki/F+6Qh4lRRWYG0453uMIOPYQJGBJBjTsAJxClKOJnQFgZERqRilW8CyBgBxg5vEMeaNAD4axIklPUAoi+2YamoIhDKeowjG10I1myIL67SIMbQHujSKBwC/n15h13Ck0UKTPFOw6SkEqRBBxkxhYP/MAIOshGIUUCiUcAZxjciNcf1RhINkKSk53MCRfW4AppwAUfKBDPgTzZkTUsETjoeKRoAOkYQaaSlrVUSR2ymBYZkANa/7bcCCHCoQLg5ABnsMykLDfpS2UucyNQSAs7WjAOJUSBmRIhBBRk2Jsp5KI0sUzMLKsZTnEmpBhBOIs1mMECeMxCauNkyCpCMQXgnMOPo/EmYsDpTn0uswiS0AMBxZKJanTif/tsyDrO9RtqRM+ex/xmMg0aUVqmYRZo8IFYjCGPd/RSoguJAhCAUw9biKyhe1zjAjuaUk6CAQpx08oNllCMVexiYyotyC/M+ZtwvAIMoSLNPQ+TT5sO1Y2JAKlWILEOoiZEffAIjlJVA1TDCHWpVTUiNwCqlDnEQwbcAKNV/7GKbQTHg7KRamGoCla1jnAT8HjHUt4RCHeoQlZqXf9CcG4BipqWtHFr9SsPufALakySKO9Y518LQg15+iYY1GAE56LqUHxCFLGVtR8XULGIoFiDEuXgBTUc9lcuFKMzvwECJ9BomrMSJq2Wda30GJFQn3TiEU0YKWKtoI2y/qZks1ntYFr7WuG2jhDwqBxPzCEPYtQTsbtoRnCAAD+zSjaolB3udVuXDRvtZBjHgEcUFPFaMWBMDdTzLXWnal3srjdy2jBOTo5RijC46LV/qMZ6mrAO353XpJpEKXsBDDk7LOGoNpEHKrD7CtnyRg5weOJtfiuY4AaYwmXThhxjYg5y3AIeBxtuJKAwyt9AQiq9iXBgJlxhFSMtiZqVSS7/5AvZ4RIiCpC472/G6psTAybFK/bxytqgCo6mhA7NCO16OWGOdvyGCs0wlI7Ri1b1/pjKLIMZpkjSCV7AQAnkAXAOQPAbQyiHpLzZ8V96XGU1P+yuI5GBEnJxSfZaYReGwMCIGQrl/iLzv2v2M8d20S6Q7MEFaEBwgEcbCGH65g6AAs6Z+ZLmP0/aWpFwqkd80YJWkEO/FI5EPagAHHmwLTiQvoukKZ1qX4VBFYmcCAzukFMVZwPLvnmEGsT16Cizdsqq9vWxJlGLPTdkEWi4QUFV7Iwb+aYcQIDCXs28a+D2+tfVXhUYIvHWiJjjGE/gxAFX/ItwtM83IDhGO3U9/+zJ9tna7fbVuCEiB3TI2ce/iMJxe/OI0g3H1HZBtbsBziNF4FshcwiGEmxI5TrU4kdiLi2/pS1hagec4nh6BTpso5BFJEMex1BFmVdcjIb7RgiBcOZx+l2Xf1ec5fShcz32ghBzhAIO0FYxGPSgwt4MQw/7Ho4zIo7iibec6PY5oTuO24pMFMrPYNhFDjrxm0yEYnPMUYQ8bqXAom+dT7vIAjcCQYVFUKOYahZQzH3DgkNbvbda5/rbeWQFQkiCET7/M8ODQ4xTWIdkoVk53AEf+NGcIuO8vXR1+t5XwS+e8b5BRdZ7Qw54vBLxbc8huxufec1Tpg7HuHFvnpJntv/7feibN/3p6yKJWmjbNymAwvn4bvmTop72tQ9MHoPzCXDHnvSYt/3vgR+WWxiCkugo8XUSHzzfB5/5zS8KuX3ziSzsPTvJd7vzsZ99obwsHMgATha+Y/3La5/85d8JIfTASt9AgvraEf/szR9/+cOEC+sIhEt74w6bj17x8/f//z9ivILjCVzI/WTPvwAwARVQIsIBODrhZmSs+g6QzxawAi0QIWah8HqDBTihDXzKAHvvAkVQAcHgMi7GN1RA1sJvAh9q+UbwBZkvGzDIN6iA1Mrj/RAQBnWw/MSgjHjjHKRrBUNwB4kQ+7LCtOpB9LYDBymwCJ0Q+Org4XrjZ+b/gwlb8AmxkPasABSy6jbiQQ0i8AZZcN2ysAw1bxKeYMFugwW4qQrHsLpc0AzlkOLEAO028AYSTj6skAznsA/fjhwWTZs8rj72EA798BBbzg5cIROA4xZKIQzhoxDTKw4RsRLVDHkw7DYMIQj18A0n0RJBsdpOoR668Dbe4STsQxKljBJDsRUDrBRqrTfkoBl2zw2H0BVxUc3A7zemYBuKYb/oQxV5jRVzsRgrqwhOIZd4w5FABUCEcdqI0RilUa1mwdF6AwYE8EWeUeKicRq9cagYoR6CIxCeTBs9cRW/MR1fyxk0kDdkwB2OzBnPcRjVsR4RqxaAAwWIwRXQLRXn/xEa7TEgwSoRlPE2xqEe6gD25PEWBbIhU+oV2uw3hAB7ZGQbha4bHTIjO+kV9EAKeaMTMnEh+08jSVKcnMEHeWMYqGlGLJLHSq8kYXKQwkH9dg4e2i9GWhLNXjImebKKKCokZeMSwmETIFEkla8nkdKTZsEdQo3JOKEojfL6knIq32gS0OEfQ8MjKxIrL5IqvdKNtOEdFOc3AiEiBY4rXRIjv3Itv6celuw3ckARju8sGZIt7XKECCGbeCMZvExPcjLSdvIuBXN1uEAStoEXgOMYQI4uR3IwHRN82sAZRq43qCAb/RItdVItH3Mzz6YWRMw3AmHtLrMuObM0WScSjv/QNy6BGm4yT/7y1ALTNGUTaYrBDm+DFYYhEVLLNTETMDVzNoEzYtLgXoBDBURzT17T32IzOJkTYNKgGJCNN4ygwA4lOVVuOZszO8dlEnZrhlKzOnsTNn9TO8kTWFahHdcwCBRhN0ezMcvzPSHGCpbgLXhLEYCRT6wTLv4OPvmTU8JgHXIgONzhwTYlP9liP/szQfUEFYKAPn1DGsqRUwx0LRBUQS1URpTAL6KjAT9lQtWiQi80ROtjFTRUoXKtUzw0LUBURFm0PAChGeLhVR5xVVIULVa0RXH0OgABDiQIOHIBKvEzPJVzPHO0SKtjFZ5rnqCKRoX0OonUSKG01ND/8zbCoTVRtEn1EzujdEt/I1mCQ6R+pUbP4ka5tExLYxPUcDaawUo9RUzNgkzNNE49A9vMkjeM4TiZlDTldE+DIxGyQCtnIwgoz1fctCzglE8RtTBUIRZ7ox48LEyx9EC1NFEp9TAskzdU4MDuM0/ds1I9dTQkQQU/shb6sVcKlSwO9VNVNS0I4Qn08jakAUjbNFIpdFJX9VbV4hd28Tfa4TuB5VTHIlVxdVi/4gkmkzeCYRGE5ViAVSyElVihdSqaoUR7YxGawI5+lVY/1FajtVurYhOAUjZ2YB0Wk1C1VUW51VvVlShUrylpMBbK1Vz1dF3plSw48lh5I0DHpVnD/+JZ6/VfaSILWK83GEUV5IVfwcJfAXZhVQIN8O82BGcVCNRaEPYrFJZhMfYjioCiII83IMHusKViteJiM7ZkKQIMTqEZou43xJFeRNYqSNZkZfYhAAEUUPI26jRkz9VG03VmfXYjEoEbdI43PiG8XHZnx7Rnf3ZpIcIWAFU2qqEZ6G1fkfZNlZZpsXYhlkDdSoMSmiAS2PNaXrYqYjZrZxZmXO02kuJhxpYqytZsS5YQUGGDUJDg5qVtp+Jt4RZjX6djZyMTpOHw6gVvl0Jv93Zh+9I3FiEUavFuq9ZQr/Zwf7YIooBavVBQJ9Zx51VyObchwEAb9NU3DKEYwvZgH/8XVSO3c0t2HY5haG9DfyCGcJXCcFU3WrMhCFz3NnwVYBRhSpuwdoFXIZzhM31jB5iLbX33CoN3eQ9iBnlDPKAgEjimdzeXeSW3OIBjCrpCZai3U61Xcl8BCgaWN8wBW2M3efnwe2sXQIODbqcXfQ1RfVX3FThxNuRADYyWe+H3E+WXc7kgcXsjB1ChVM+3evvXZ5GoZWcoCjY1Yrr3KA94bxNBfIEDDcxXYh5YKiMYa9dB0HzjHdBh/5DXgDe4ZOEhdHgDHspuZTJ4/EoYa9H0Nx7BHUCWhfcXHV/4Z8HgFWrBcmfjHPIwZ1oY/nJ4ZrOhFnrUN8JhLltmiHOwiGX/Vg9uVjbk4QkaWH9JGIrVlRDe6zf+oHFZxol/V4sxdhamWDWoAA7W4AOF+IbpkYwxdg0u9TZIQAmu2IazGI6HdYLD1TToYFeTRoyVV4//tRbcWDSa4FED+ZC5kZAB9nT/YhvAuI3z2JE9NQygwG9n4waUEGkEOX0tOVrDABXS9jbw0WxktyhoN5TJkxOawMV8wxhskGxSmShWmZWzcxtKcTZYANfOppaH4pZxmTnf4WFvIwicQYSbGJKdNXWHWUETAfp6Qx70qm2AWSiE+ZlLEwx+4QZcYD3CQXqtmZn71Zm1+T0TAR7c1TdAQW+uOSiy+ZwfkxNugPh8AwbUYJKV/+adgSKe5Xkwl8A2j9kZ6uqXyTlhzfmfm3NUGrGF9oaff8KfFXotCUFggUNw8waifUKiJ5oqJ6FIgsNgC0eje4KjOzopO1iTZSMUnnRwD9piE/qkSxMddlk2yCEKxPmhX3pkY1qmHzMRbgAx4dIW6Muddxpme9qnBfMV8id7USFzx7mSlZo/J8eDe2MOkvhxSJonTHqqM5ITdCA4qKB+M/qoyTapvfor6yF3ZcMYmmGFdVqq01o70+AGYvQ3joF0O2erd6Kr57oeyyWreWMR8jdy+Fon/Pqvv9EOYiEUuLY00nSkzdpt0VqxY7I4YLk3jMEaDXuy87ayLbsk4eAEff+DGPSgpTHYswsXtENbI9Fgbh7UGQpwdQ47JxK7tXFxDeDg83pjd/datWeXtXHbHq1gHYC7LIAgZ39brod7MOsAoz12SVuntnHitpvbEiXBt2fjGC64s5n7uu0yA4GDCkBhtlmHum/CusH7EKHgsUeDBNwhXr3be9d7MyUBFJ5WNcayeNDbJtS7vsuwDsQAX2fDEPp4viEYwE0zUT7mFuZ4uo/bloVbwVuRC7LAQTXbJr2nv2vivym8CJOREX9DDV6hdGk7woN5wj+8EttqfG/jBY6XeDicJjx8xWGQG1x8NrhsamUcxbFZxW28D08hs3ujUdBnxmeixoPcAtOgFu7/2jfQoJrBB8llQsmXXAGtoBTOAQsumoB7/LuvvB6LgBG2QaVVYxgAeMN9HJ6BPMyfUBWsmjdeQA3YlL/XvJ/b3M2LcAleNVBd4Y6Hh8pjwsr1XP4AQbtVQwkUQZltR9BhgtALvfyKG3ZvIwWc98jvPKLzPNJFsA7WQVRvgxj0WXocXSUgndOxTxXUwL1FIwXCgcenPNM3etNRvQJP+TdgxcvVHMxr3RUR3TSqWJHtp9RT4tR7Hfg4QbBvw/gciNhRwtiPnfYAQWCCI0IByNlJAtqj/fQUAdRnQxpyIacZCNtHQtu3ffPCAYVnIxiOgagziNxFwtzPPfMiWzXMwRnk/xvTeX3e5bAYlq14Gf174D0k5J3fAc/purM3orOBBh4kCt7g324VjmGdeSM0S6jhP+LhIX7rQmG/e6MJCPriZb2kaX3jmQ/DeQMNGCEN2LjZR56rS97kbW8N9ODJeSMTVvKFMN4jNF7mA24NUIEYwuw30vzdX76vY97nT+8UFv42dgCujX7flV4ESyGsgYMaajjq6Xvqs5ByUX42HOEdOKGoSWjnO6Lnud7XPjfOb2MONsHEGf7oETvp037xWNfMS2MQvl7kpb7u/y8WcoCt9Tt0ecjsOQLt/f7PcoE6+SjnC1/ubZvuE5/rgFqoe8MFzAG0qMjwNwLxJ5/KJkEMcv9cNj4rEshe5xm5Kz/fCeFgB1hdNKgA0Efok+N39XdwF9SgpmWD8I2I9vnX9nXQGZR9Nt4MFavI93EY+F8QEOrh9UPDtLN+h5D/jZV/BHEfOFJgGxJBVss+9dOy+kfwFdaBUU0xiI/f+zMT/EVQEhShCey5t99o+gFS/S9QG2COMv9Auq1I/hsZIP4JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXPmwjjZ051jKlPgnVpiZOHPqPKmI2E6cU6Yw+km0qNGjSJMqXcq0qdOnUKNK5ZhIzKepJsm5wsq1K8aeXjUGHRq2rNmzaNP/ql3Ltq3btyJ/1TPUC+7EJpLs6mUKdm/CsX4DCx5MuLDhw4gTp4xUy5Ava4oH5roZufLHvocBW97MubPnz6BDi76Y5RKvO4nb3XI2uvVCzIY1u55Nu7bt27hzs9Tz6dM7IZnRTdLtGnZh2cSTK1/OvLnzyqvWQaEWqDAWHWu4PO9snDDy7eDDix9PvvzMX1nQPBqcSZV5xd0Hf39Pv779+/jHJ4K3KNM3v48Mkx9h8Qk234AIJqjgggwONgkq9ejwjl6PfAJPg3YVGNiBGHbo4YcghvjTJEv4BJcc3GQjoloa+sXhijDGKOOMNCZUBzrB1NXWB4GckkaNXrW414tA/xZp5JFIvtcGJ5/g800na/GiR5JTCakXkVRmqeWWXIoGCjlUqJXJLbN02ZSVdmFp5ppstunmWs6EwkI59phFxx/uvXkUmnCpqeefgAYqqE5WROIMHdY4EtYxrwz6E59v+enopJRWaqlFVLRDh1ecXDoTpG5J6umopJY6aSk6KLHDVVN9UqapKIHalqiw1mrrrVTaYccmVknVzCa4kiQrW7QGa+yxyHoYiTvAPRWEM4Ake5mJmQkl7bXYZttgKcRkMsd/SwWiCiHaaZvRsGsVa+667LZLGxiuEGPOUndE4e5X1MZm7b389uuva6u4owQMJCA1jC3/ToSuWuom7PDDEP+j9QsoSvACQsFF/XFKxA4tnFbDHIcs8shL1WIOECwQhU6jJCPkMVogtyzzzDSf9IQaOfz0yTpt1EzQy2fF7PPQRBc9UXRwuMOqTNXAsYbRQJsltNFUV211QWuAAolMWJBTddRlTX312GT7/Is7cvwzh0qXUPN1vsftW/bcdNNtSz1NKCEgSp8o8nZiYtct+OAJ2+FMziVVcw46ifyNWOCERy45u1HIAAJJKbiTyI9Ugx0W5JOHLvqxr9STDB13GAJSPMO8wnnncHsn9+i01/7vLNSgAQNIbl/tuVeg2y788JZGkczlHC3SRClj/95V8MRHL72eayjySTso4JPRHX//KEKZ1c5zBf305Jdv5h/kzHtRMnD03Hzs8s1u/vz0XyqGOzcsYtENkZRtPeDyq58ABwioOvxiHccAwkSkcSH/LU1fZCGgBCf4plUgDiJUaEYs5va/xwWQgiAMIZLCEAU5xOMhdNjGKtxHtg5WK4IijKEMaxQGTvzhHGBiCBpg2MIHxo2HMwyiEENUjHrsYCEwqIXgXAjBITrxiR76xRLOEQ8s+OAgaOhU3Zj4Qyh68YsISsMk4PAbg5iDG8Daog9lB0QwuvGN5AkHGggihxw4gxBLXGP82gjHPvpxOYnIQj228YccHAMUeckjAPn4x0Y60jaTkMQvTsGywXGRjY/M/6QmN1klPRrog5wMpShHyZJL7pGUqEylKkdiyk8ycpWwjKUsFdLKDYFylrjMZSxr6aJb6vKXwOQkL4fky2Aa85hwHOaVionMZjpTiMpMEzOfSc1qSjCafZqmNbfJzelhM1La7KY4xym6b4YqnORMpzo56ElbvnKd8Iyn79rZy3fK8574pJk5Z4XOfPrzn//aJ7H6CdCCGlRbAk0XQQ/K0IbiKqEMW6hDJ0rRS0H0YxKtqEY3+qeLwiyjHA2pSLfk0aCBdKQoTWmNSiq1k6r0pTD9EEvD5tKY2vSmA5rp52qK0576lDw6BR5Pf0rUoi4nqM8bqlGXylTaIFV8Sm2qVP+nyh16EtOeVM2qVlvzVKyMb6tgDStcujqVr4r1rGg1C1mlYta0uvWtUFlrVNoK17ra1ShyhQpd78rXvpbSqsvEql8HS1ik5PUpey2sYhd7LsBKU7CMjaxkS3JYpyR2spjNrEEq25TLavazmOUsUzwL2tIuVrRLIa1pV+tX1CpFtayNbV1dmxTYyva2aKUtUmyL295uVbdH4a1vhytV4BpFuMRNblGNWxTkKve5OGUuUZwL3eq+VLo/oa51tytS7O5Eu9wNb0W9qxPwive8DCVvTsyL3vb+U71Aiap754tS+M6EvfTNrzrtKxP86ve/3eQvS/wL4AJTU8ArIbCBF3zDTASrRMEMjrAuHZwSCEv4wrFExTBS4EHIYvjDBgXFOZplGNR5GMQozicoyniYO9zhVSmO8UQVIQ8Ot/jFMs5xQ1GVGBfDWMdA9ucqmpAMxNCBDicOspKpyWPEuFhFS44yPJ8QE8Q84hG7kLKW01mLF/TYED/espirGQUhnBAxcqjkmNfsTG2QYxxXRIwd2EznZlqhGDm4BLgG4w7WFKHOgA4mF9ZQimEEgzC3yMIqGOGJQDs6l4Mu9KEHk+hFN/rRMAoIADs="));
var Loading = /** @class */ (function () {
    function Loading(_app) {
        this._app = _app;
        /**
         * 遮罩元素
         */
        this._maskEle = document.createElement("div");
        /**
         * 图片元素
         */
        this._loadingEle = document.createElement("img");
        /**
         * 文本元素
         */
        this._textEle = document.createElement("div");
        this._init();
    }
    /**
     * 初始化
     */
    Loading.prototype._init = function () {
        this._maskEle.style.display = "none";
        this._maskEle.className = styles.mask;
        this._loadingEle.src = loadingGifUrl;
        this._loadingEle.width = 80;
        this._loadingEle.height = 80;
        this._textEle.className = styles.contentText;
        var contentWrapper = document.createElement("div");
        contentWrapper.className = styles.content;
        contentWrapper.appendChild(this._loadingEle);
        contentWrapper.appendChild(this._textEle);
        this._maskEle.appendChild(contentWrapper);
    };
    Loading.prototype.show = function (message, parentEle) {
        parentEle = parentEle || this._app.getRootEle() || document.body;
        this._textEle.innerText = message;
        if (this._maskEle.parentElement !== parentEle) {
            parentEle.appendChild(this._maskEle);
        }
        var wrapperEle = this._textEle.parentElement;
        this._maskEle.style.display = "block";
        wrapperEle.style.marginTop = -wrapperEle.clientHeight / 2 + "px";
    };
    Loading.prototype.hide = function () {
        this._maskEle.style.display = "none";
    };
    return Loading;
}());

var appEventBookmarkChange = "bookmarkChange";
var fontfaceStyleId = new Date().getTime() + "";
var defaultFontConfig = {
    dir: "./",
    eotFile: "icon.eot",
    woffFile: "icon.woff",
    woff2File: "icon.woff2",
    ttfFile: "icon.ttf",
    svgFile: "icon.svg"
};
var defaultOptions = {
    tabPages: {
        btnGroup: {
            btns: []
        },
        autoHide: "noPage"
    },
    header: {
        toolbars: [
            defaultData.headerTabs.start,
            defaultData.headerTabs.tools,
            defaultData.headerTabs.view,
            defaultData.headerTabs.reader,
            defaultData.headerTabs.safety,
            defaultData.headerTabs.help,
        ]
    },
    sidebars: {
        left: {
            toolbars: [
                defaultData.sildebarLeftTabs.outline,
                defaultData.sildebarLeftTabs.sign,
                defaultData.sildebarLeftTabs.comment,
                defaultData.sildebarLeftTabs.thumbnail,
            ]
        },
        right: false
    },
    content: {}
};
var App$1 = defineComponent({
    components: {
        "ui-app": AppUi
    },
    template: "<ui-app s-ref=\"ref-app\" s-show=\"show\" appShow=\"{{show}}\" style=\"min-height: {{appOptions.minHeight || 800}}px;min-width: {{appOptions.minWidth || 1280}}px;\" s-bind=\"{{{...appOptions, bookmarkInfos, appSize: {minWidth: appOptions.minWidth || 1280, minHeight: appOptions.minHeight || 800}}}}\" appId=\"{{appId}}\" ></<ui-app>",
    initData: function () {
        return {
            show: false,
            appOptions: {}
        };
    },
    messages: {
        "HTML::ELE::EVENT": function (args) {
            var val = args && args.value;
            this.eventMapping(val.id, val.event, val.thisInfo);
        },
        "TABS::ADD": function () {
            console.log("标签新增被触发");
        },
        "EVENT::ID::HANDLE": function (arg) {
            var val = arg.value;
            console.log(val);
        }
    }
});
var ReaderImpl = /** @class */ (function () {
    function ReaderImpl(_app) {
        this._app = _app;
        this._eventList = new DataStore();
        this._parserList = [];
        this._supportFileSuffix = [];
        this._fileInputLabel = createElement("label");
        this._fileInputLabel.style.display = "none";
        (document.body || document.getElementsByTagName("body")[0]).appendChild(this._fileInputLabel);
        this._fileInputOnChange = this._fileInputOnChange.bind(this);
        this._createFileInput();
        this._windowOnFocus = this._windowOnFocus.bind(this);
    }
    ReaderImpl.prototype._createFileInput = function () {
        if (this._fileInput) {
            this._fileInput.remove();
        }
        this._fileInput = createElement("input");
        this._fileInput.style.display = "none";
        this._fileInput.type = "file";
        this._fileInput.id = createId();
        eventUtil.once(this._fileInput, "change", this._fileInputOnChange);
        (document.body || document.getElementsByTagName("body")[0]).appendChild(this._fileInput);
        this._fileInputLabel["for"] = this._fileInput.id;
    };
    /**
     * 是否已经存在指定的解析器
     * @param parser 解析器
     * @returns 是/否
     */
    ReaderImpl.prototype._isHaveParser = function (parser) {
        for (var i = 0; i < this._parserList.length; i++) {
            if (this._parserList[i].Parser === parser) {
                return true;
            }
        }
        return false;
    };
    ReaderImpl.prototype._windowOnFocus = function () {
        var _this = this;
        setTimeout(function () {
            if (!_this._fileInputWait) {
                return;
            }
            var resovle = _this._fileInputWait.resovle;
            _this._fileInputWait = undefined;
            resovle(undefined);
        }, 1000);
    };
    ReaderImpl.prototype._loadFileByFileInfo = function () {
        return this.reader.loadFile(this.fileInfo);
    };
    ReaderImpl.prototype._fileInputOnChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resovle, reject, file, fileInfo, result;
            return __generator(this, function (_a) {
                if (!this._fileInputWait) {
                    this._fileInput.value = "";
                    return [2 /*return*/];
                }
                resovle = this._fileInputWait.resovle;
                reject = this._fileInputWait.reject;
                this._fileInputWait = undefined;
                try {
                    file = (this._fileInput.files || [
                        { name: this._fileInput.value },
                    ])[0];
                    fileInfo = {
                        rawHtmlEle: this._fileInput,
                        name: file.name
                    };
                    if (file.type) {
                        fileInfo.path = createBlobUrlByFile(file);
                    }
                    result = {
                        fileInfo: fileInfo,
                        loadFile: this._loadFileByFileInfo.bind({
                            reader: this,
                            fileInfo: fileInfo
                        })
                    };
                    resovle(result);
                }
                catch (e) {
                    reject(e);
                }
                this._createFileInput();
                return [2 /*return*/];
            });
        });
    };
    ReaderImpl.prototype._parserInterfaceBindEvent = function (parser) {
        var eventMap = this._eventList.all();
        for (var key in eventMap) {
            var eventCallList = eventMap[key];
            for (var j = 0; j < eventCallList.length; j++) {
                parser.addListener(key, eventCallList[j]);
            }
        }
    };
    ReaderImpl.prototype.addListener = function (eventName, callback) {
        var eventList = this._eventList.get(eventName);
        if (!eventList) {
            eventList = [];
            this._eventList.set(eventName, eventList);
        }
        eventList.push(callback);
        var bookmarkList = this._app.bookmarkList();
        if (bookmarkList.length === 0) {
            return;
        }
        for (var i = 0; i < bookmarkList.length; i++) {
            bookmarkList[i].parserWrapperInfo.parserInterface.addListener(eventName, callback);
        }
    };
    ReaderImpl.prototype.removeListener = function (eventName, callback) {
        var eventList = this._eventList.get(eventName);
        if (!eventList) {
            eventList = [];
            this._eventList.set(eventName, eventList);
        }
        for (var i = eventList.length - 1; i >= 0; i--) {
            var event_1 = eventList[i];
            if (callback === event_1) {
                eventList.splice(i, 1);
            }
        }
        var bookmarkList = this._app.bookmarkList();
        if (bookmarkList.length === 0) {
            return;
        }
        for (var i = 0; i < bookmarkList.length; i++) {
            bookmarkList[i].parserWrapperInfo.parserInterface.removeListener(eventName, callback);
        }
    };
    ReaderImpl.prototype.selectFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileSuffixList, result, accpet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileSuffixList = [".pdf"];
                        if (fileSuffixList.length === 0) {
                            throw ErrNoSupportFileSuffix;
                        }
                        if (this._fileInputWait) {
                            throw ErrFeilSelectWait;
                        }
                        result = new Promise(function (resovle, reject) {
                            _this._fileInputWait = {
                                resovle: resovle,
                                reject: reject
                            };
                        });
                        accpet = fileSuffixList.join(",");
                        this._fileInput.accept = accpet;
                        if (isIe()) {
                            this._fileInput.click();
                        }
                        else {
                            this._fileInput.dispatchEvent(new MouseEvent("click"));
                        }
                        eventUtil.once(window, "focus", this._windowOnFocus);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, result];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        this._fileInputWait = undefined;
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReaderImpl.prototype.loadFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var i, parserInfo, parser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._app.getBookmarkInfoById(file.path)) {
                            this._app.convertBookmarkById(file.path);
                            return [2 /*return*/];
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this._parserList.length)) return [3 /*break*/, 4];
                        parserInfo = this._parserList[i];
                        if (!parserInfo.support(this._app).isSupportFile(file)) {
                            return [3 /*break*/, 3];
                        }
                        parser = new parserInfo.Parser(this._app);
                        return [4 /*yield*/, parser.loadFile(file)];
                    case 2:
                        _a.sent();
                        this._parserInterfaceBindEvent(parser);
                        this._app.addBookmark({
                            id: file.path,
                            name: file.name,
                            parserWrapperInfo: {
                                fileInfo: file,
                                parserInfo: {
                                    support: parserInfo.support(this._app, parser),
                                    Parser: parserInfo.Parser
                                },
                                parserInterface: parser
                            }
                        });
                        return [2 /*return*/];
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: throw ErrFileNotParsed;
                }
            });
        });
    };
    ReaderImpl.prototype.currentParser = function () {
        var _a;
        return (_a = this._app.currentBookmark()) === null || _a === void 0 ? void 0 : _a.parserWrapperInfo;
    };
    ReaderImpl.prototype.supportFileSuffix = function () {
        return this._supportFileSuffix;
    };
    ReaderImpl.prototype.attach = function (parserInfo) {
        if (!parserInfo) {
            return;
        }
        if (!parserInfo.Parser) {
            throw ErrLackOfParser;
        }
        parserInfo.support =
            parserInfo.support || (function () { return readerParserSupportDefault; });
        var support = parserInfo.support(this._app);
        if (this._isHaveParser(parserInfo.Parser) || !support.nowBrowser) {
            return;
        }
        var fileSuffix = support.fileSuffix;
        for (var i = 0; i < fileSuffix.length; i++) {
            var suffix = fileSuffix[i];
            if (!suffix.startsWith(".")) {
                suffix = "." + suffix;
            }
            if (!this._supportFileSuffix.includes(suffix)) {
                this._supportFileSuffix.push(suffix);
            }
        }
        this._parserList.push(parserInfo);
    };
    return ReaderImpl;
}());
var AppImpl = /** @class */ (function () {
    //#region 私有方法
    function AppImpl(_attachEle, _initOptions) {
        var _this = this;
        this._attachEle = _attachEle;
        this._initOptions = _initOptions;
        this._isShow = false;
        this._readerInterface = new ReaderImpl(this);
        this._bookmarkList = [];
        this._currentBookmarkIndex = -1;
        this._currentBookmarkId = "";
        this._bookmarkMap = {};
        this._datastore = new DataStore();
        this._messageUtils = new MessageImpl(this);
        this._loading = new Loading(this);
        this._pathJoin = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            for (var i = 0; i < p.length; i++) {
                var v = p[i];
                if (v === "") {
                    continue;
                }
                if (v.endsWith("/")) {
                    p[i] = v.substring(0, v.length - 1);
                }
            }
            return p.join("/");
        };
        this._createFontFaceStyle = function () {
            var fontConfig = _this._fontConfig;
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
            var fontConfigDir = fontConfig.dir;
            var eotFilePath = _this._pathJoin(fontConfigDir, fontConfig.eotFile);
            var woffFilePath = _this._pathJoin(fontConfigDir, fontConfig.woffFile);
            var woff2FilePath = _this._pathJoin(fontConfigDir, fontConfig.woff2File);
            var ttfFilePath = _this._pathJoin(fontConfigDir, fontConfig.ttfFile);
            var svgFilePath = _this._pathJoin(fontConfigDir, fontConfig.svgFile + "#iconfont");
            styleInject("@font-face{font-family:'iconfont';src: url(\"".concat(eotFilePath, "\");src:url(\"").concat(eotFilePath, "\") format(\"embedded-opentype\"),url(\"").concat(woff2FilePath, "\") format(\"woff2\"),url(\"").concat(woffFilePath, "\") format(\"woff\"),url(\"").concat(ttfFilePath, "\") format(\"truetype\"),url('").concat(svgFilePath, "') format('svg');}"), fontfaceStyleId);
        };
        /**
         * 初始化App
         */
        this._initApp = function () {
            _this._appId = registryApp(_this);
            _this._appComponent = new App$1({
                data: {
                    appOptions: {},
                    bookmarkInfos: {
                        index: -1,
                        list: []
                    },
                    appId: _this._appId
                }
            });
            _this._appComponent.eventMapping = function (id, event, thisInfo) {
                nodeEventCallBindThis(thisInfo, _this, id, _this, event);
            };
            _this.update(defaultOptions);
            _this.update(_this._initOptions);
            _this._appComponent.attach(_this._attachEle);
            // this._uiAppInterface = (this._appComponent.ref(
            //   "ref-app"
            // ) as any) as AppUiInterface;
        };
        /**
         * 更新显示
         */
        this._updateShow = function () {
            if (!_this._appComponent) {
                return;
            }
            _this._appComponent.data.set("show", _this._isShow);
        };
        this._handleToobarConfigs = function (toolbarConfigs, expr) {
            var app = _this;
            var _loop_1 = function (i) {
                var toolbar_1 = handleToolBarInfo(app, toolbarConfigs[i]);
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
                if (!toolbar_1.tools || toolbar_1.tools.length === 0) {
                    return "continue";
                }
                var nodeInfoList = toolbar_1.tools.map(function (tool) { return tool.nodeInfo; });
                var _loop_2 = function (j) {
                    var toolInfo = toolbar_1.tools[j];
                    // toolInfo.disabled = dom.handleDisabled(
                    //   toolInfo.disabled,
                    //   this._datastore
                    // );
                    if (!toolInfo.nodeInfo) {
                        return "continue";
                    }
                    var nodeInfoThis = toolInfo.nodeInfo;
                    var self_1 = _this;
                    nodeInfoThis.update = function (nodeInfo) {
                        // const toolbars = app.getNowData(expr as any) as ToolbarConfig[];
                        // toolbars[i].tools[j].nodeInfo = nodeInfo;
                        // debugger;
                        // app.updateByExpr(expr as any, toolbars);
                        // const srcNodeInfo = self._appComponent.data.get(
                        //   expr + `[${i}].tools[${j}].nodeInfo`
                        // ) as NodeInfo;
                        nodeInfo = nodeInfo || this;
                        nodeInfoList[j] = __assign(__assign({}, nodeInfo), { update: nodeInfoThis.update.bind(nodeInfo), selector: nodeInfoThis.selector });
                        nodeInfo = handleNodeInfo(self_1, nodeInfo);
                        self_1._appComponent.data.set("appOptions." + expr + "[".concat(i, "].tools[").concat(j, "].nodeInfo"), nodeInfo);
                    }.bind(nodeInfoThis);
                    _this._handleNodeInfoThisSelectorData(app, nodeInfoThis, nodeInfoList, j);
                    toolInfo.nodeInfo = handleNodeInfo(_this, toolInfo.nodeInfo);
                };
                for (var j = 0; j < toolbar_1.tools.length; j++) {
                    _loop_2(j);
                }
            };
            for (var i = 0; i < toolbarConfigs.length; i++) {
                _loop_1(i);
            }
        };
        this.getInitConfig = function () {
            return _this._initOptions;
        };
        this.getNowData = function (expr) {
            if (expr === void 0) { expr = ""; }
            if (!_this._appComponent) {
                return;
            }
            if (expr && !expr.startsWith(".")) {
                expr = "." + expr;
            }
            var result = _this._appComponent.data.get("appOptions" + expr);
            if (typeof result === "object") {
                return JSON.parse(JSON.stringify(result));
            }
            return result;
        };
        this.updateByExpr = function (expr, options) {
            var data = _this.getNowData();
            var split = expr.split(".");
            var endExpr = split.splice(split.length - 1, 1)[0];
            var temp = data;
            for (var i in split) {
                var str = split[i];
                temp = temp[str] || {};
            }
            temp[endExpr] = options;
            _this.update(data);
        };
        /**
         *  更新参数并渲染视图
         * @param options 要更新的参数
         */
        this.update = function (options) {
            if (!options || !_this._appComponent) {
                return;
            }
            var app = _this;
            if (options.tabPages &&
                options.tabPages.btnGroup &&
                options.tabPages.btnGroup.btns) {
                var btns_1 = options.tabPages.btnGroup.btns;
                var _loop_3 = function (i) {
                    var nodeInfoThis = btns_1[i];
                    nodeInfoThis.update = function (nodeInfo) {
                        // const btns = app.getNowData("tabPages.btnGroup.btns");
                        // btns[i] = nodeInfo;
                        nodeInfo = nodeInfo || this;
                        btns_1[i] = nodeInfo;
                        nodeInfo = handleNodeInfo(app, nodeInfo);
                        app.updateByExpr("tabPages.btnGroup.btns[".concat(i, "]"), nodeInfo);
                    }.bind(btns_1[i]);
                    _this._handleNodeInfoThisSelectorData(app, nodeInfoThis, btns_1, i);
                    btns_1[i] = handleNodeInfo(_this, btns_1[i]);
                };
                for (var i = 0; i < btns_1.length; i++) {
                    _loop_3(i);
                }
            }
            if (options.header && options.header.toolbars) {
                _this._handleToobarConfigs(options.header.toolbars, "header.toolbars");
            }
            if (options.content) {
                if (options.content.noOpenFileRender) {
                    var renderId = createId();
                    _this._datastore.set(renderId, options.content.noOpenFileRender);
                    options.content.noOpenFileRender = renderId;
                }
            }
            if (options.sidebars) {
                if (options.sidebars.left) {
                    _this._handleToobarConfigs(options.sidebars.left.toolbars, "sidebars.left.toolbars");
                }
            }
            _this._appComponent.data.merge("appOptions", JSON.parse(JSON.stringify(options)), { force: true });
        };
        /**
         * 显示到某个元素上
         * @param ele 要显示到的元素
         */
        this.show = function () {
            _this._isShow = true;
            _this._updateShow();
        };
        /**
         * 隐藏显示
         */
        this.hide = function () {
            if (!_this._isShow || !_this._appComponent) {
                return;
            }
            _this._isShow = false;
            _this._updateShow();
        };
        this.message = this._messageUtils;
        this.loading = this._loading;
        this._fontConfig =
            (this._initOptions && this._initOptions.fontConfig) || defaultFontConfig;
        if (this._initOptions && this._initOptions.fontConfig) {
            delete this._initOptions.fontConfig;
        }
        if (!document.getElementById(fontfaceStyleId)) {
            this._createFontFaceStyle();
        }
        this._initApp();
    }
    AppImpl.prototype._handleNodeInfoThisSelectorData = function (app, nodeInfoThis, nodeInfoList, currentIndex) {
        nodeInfoThis.selector = {
            prev: function () {
                var prevIndex = currentIndex - 1;
                if (prevIndex < 0) {
                    return undefined;
                }
                return nodeInfoList[prevIndex];
            },
            next: function () {
                var nextIndex = currentIndex + 1;
                if (nextIndex > nodeInfoList.length - 1) {
                    return undefined;
                }
                return nodeInfoList[nextIndex];
            },
            index: function () {
                return currentIndex;
            },
            list: function () {
                return nodeInfoList;
            },
            listSize: function () {
                return nodeInfoList.length;
            },
            get: function (index) {
                return nodeInfoList[index];
            }
        };
    };
    AppImpl.prototype._eventName = function (name) {
        return "__event_" + name;
    };
    AppImpl.prototype._eventList = function (name) {
        name = this._eventName(name);
        var eventList = this._datastore[name];
        if (!eventList) {
            eventList = [];
            this._datastore[name] = eventList;
        }
        return eventList;
    };
    AppImpl.prototype._callAppEvent = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var eventList = this._eventList(eventName);
        for (var i = 0; i < eventList.length; i++) {
            var callbackFn = eventList[i];
            if (typeof callbackFn === "function") {
                callbackFn.apply(void 0, args);
            }
        }
    };
    //#endregion
    AppImpl.prototype.bookmarkList = function () {
        return this._bookmarkList || [];
    };
    AppImpl.prototype.addListener = function (eventName, callback) {
        switch (eventName) {
            case appEventBookmarkChange:
                break;
            default:
                return;
        }
        this._eventList(eventName).push(callback);
    };
    AppImpl.prototype.removeListener = function (eventName, callback) {
        switch (eventName) {
            case appEventBookmarkChange:
                break;
            default:
                return;
        }
        var eventList = this._eventList(eventName);
        for (var i = eventList.length; i >= 0; i--) {
            if (eventList[i] === callback) {
                eventList.splice(i, 1);
            }
        }
    };
    AppImpl.prototype.getDataStore = function () {
        return this._datastore;
    };
    AppImpl.prototype.removeBookmark = function (index) {
        var bookmarkLength = this._bookmarkList.length - 1;
        if (index > bookmarkLength || index < 0) {
            return;
        }
        var currentIndex = this._currentBookmarkIndex;
        var currentBookmark = this.getBookmarkInfo(currentIndex);
        var isConvert = false;
        if (currentIndex === index) {
            currentIndex += 1;
            if (bookmarkLength <= currentIndex) {
                currentIndex = bookmarkLength - 1;
            }
            isConvert = true;
        }
        this._bookmarkList.splice(index, 1);
        this._bookmarkMap = {};
        for (var i = 0; i < this._bookmarkList.length; i++) {
            var bookmarkInfo = this._bookmarkList[i];
            bookmarkInfo.index = i;
            this._bookmarkMap[bookmarkInfo.id] = i;
        }
        this._appComponent.data.removeAt("bookmarkInfos.list", index);
        if (isConvert) {
            this.convertBookmark(currentIndex);
        }
        else {
            this.convertBookmarkById(currentBookmark.id);
        }
    };
    AppImpl.prototype.removeBookmarkById = function (id) {
        var bookmarkIndex = this._bookmarkMap[id];
        if (typeof bookmarkIndex === "undefined") {
            return;
        }
        this.removeBookmark(bookmarkIndex);
    };
    AppImpl.prototype.convertBookmarkById = function (id) {
        var bookmarkIndex = this._bookmarkMap[id];
        if (typeof bookmarkIndex === "undefined") {
            return;
        }
        this.convertBookmark(bookmarkIndex);
    };
    AppImpl.prototype.getBookmarkInfoById = function (id) {
        var bookmarkIndex = this._bookmarkMap[id];
        if (typeof bookmarkIndex === "undefined") {
            return;
        }
        return this.getBookmarkInfo(bookmarkIndex);
    };
    AppImpl.prototype.bookmarkNum = function () {
        return this._bookmarkList.length;
    };
    AppImpl.prototype.getBookmarkInfo = function (index) {
        return this._bookmarkList[index];
    };
    AppImpl.prototype.addBookmark = function (bookmarkInfo) {
        var current = this._bookmarkMap[bookmarkInfo.id];
        if (typeof current !== "undefined") {
            for (var i = 0; i < this._bookmarkList.length; i++) {
                var bookmarkInfo_1 = this._bookmarkList[i];
                if (bookmarkInfo_1.id === bookmarkInfo_1.id) {
                    this.convertBookmark(i);
                    return;
                }
            }
            return;
        }
        var bookmark = __assign(__assign({}, bookmarkInfo), { index: -1 });
        this._bookmarkList.push(bookmark);
        bookmark.index = this._bookmarkList.length - 1;
        this._bookmarkMap[bookmarkInfo.id] = bookmark.index;
        this._appComponent.data.push("bookmarkInfos.list", {
            name: bookmark.name,
            id: bookmark.id
        });
        this.convertBookmark(bookmark.index);
    };
    AppImpl.prototype.currentBookmark = function () {
        if (this._currentBookmarkIndex === -1) {
            return undefined;
        }
        return this._bookmarkList[this._currentBookmarkIndex];
    };
    AppImpl.prototype.convertBookmark = function (index) {
        this._currentBookmarkIndex = index;
        var currentBookmarkId = "";
        if (index >= 0) {
            this._currentBookmarkId = this._bookmarkList[index].id;
            currentBookmarkId = this._currentBookmarkId;
        }
        this._appComponent.data.set("bookmarkInfos.index", index);
        this._appComponent.data.set("bookmarkInfos.id", currentBookmarkId);
        this._callAppEvent(appEventBookmarkChange, this, this._bookmarkList[index]);
    };
    AppImpl.prototype.getReader = function () {
        return this._readerInterface;
    };
    AppImpl.prototype.getRootEle = function () {
        return this._attachEle;
    };
    /**
     * 销毁
     */
    AppImpl.prototype.destroy = function () {
        if (!this._appComponent) {
            return;
        }
        this._appComponent.dispose();
        this._appComponent = undefined;
        this._attachEle = undefined;
        unRegistryApp(this._appId);
        this._appId = undefined;
    };
    return AppImpl;
}());

// (() => {
//   //防止页面后退
//   history.pushState(null, null, document.URL);
//   dom.eventUtil.addHandler(window, "popstate", function () {
//     history.pushState(null, null, document.URL);
//   });
// })();
var App = AppImpl;

export { App, ErrFeilSelectWait, ErrFileNotParsed, ErrLackOfParser, ErrNoSupportFileSuffix, ErrNoSupportFunction, ReaderParserAbstract, defaultContentTemp, defaultData, index as ieUtil, readerParserSupportDefault };
