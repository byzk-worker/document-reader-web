import { defineComponent } from 'san';
import { template as template$6 } from 'lodash';
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
function dispatchDomEvent(ele, eventIdList, component) {
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
                event: event
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
        var id = nodeEvenBindEvent(dataStore, "click", nodeInfo.click.bind(nodeInfo));
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
    if (nodeInfo.attached) {
        if (nodeInfo._attachedId) {
            dataStore.remove(nodeInfo._attachedId);
        }
        nodeInfo._attachedId = createId();
        dataStore.set(nodeInfo._attachedId, nodeInfo.attached.bind(nodeInfo));
        nodeInfo.attached = nodeInfo.attached.bind(nodeInfo);
    }
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
                    if (nodeInfo.attached) {
                        nodeEventCall(app, nodeInfo.attached, app);
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
    var nodeEventInfo = app.getDataStore().get(eventId);
    if (!nodeEventInfo) {
        return;
    }
    if (typeof nodeEventInfo === "function") {
        return nodeEventInfo.apply(void 0, args);
    }
    nodeEventInfo.callback.apply(nodeEventInfo, args);
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
    handleNodeInfo: handleNodeInfo,
    nodeRender: nodeRender,
    nodeEventCall: nodeEventCall,
    nodeEventDestroy: nodeEventDestroy
});

var styles$c = {"common_font":"index-module_common_font__kzEJV","text_overflow":"index-module_text_overflow__8S-Xs","header":"index-module_header__bANPo","tollbar":"index-module_tollbar__GkMcX","tabFold":"index-module_tabFold__y-rrE","fileBtn":"index-module_fileBtn__ws1VT","tabs":"index-module_tabs__9LWcB","tab":"index-module_tab__RiFFH","active":"index-module_active__a-6ac","tabPanels":"index-module_tabPanels__FVo0y","prevTool":"index-module_prevTool__ac9hp","nextTool":"index-module_nextTool__6W3wq","tabPanel":"index-module_tabPanel__aeg7u","wrapper":"index-module_wrapper__alOl2","separate":"index-module_separate__rpKpN","tool":"index-module_tool__nu8f-","text":"index-module_text__XqzxF","icon":"index-module_icon__MnfZO"};

var htmlTemplate = "<div id=\"{{id || undefined}}\" class=\"<%= styles.header %>{{className ? ' ' + className : ''}}\">\n    <div class=\"<%= styles.tollbar %>\">\n        <div class=\"<%= styles.fileBtn %>\">\n            <span class=\"iconfont\">&#xe655;\n                <span>文件</span>\n            </span>\n        </div>\n        <fragment s-for=\"toolbarConfig, i in toolbars\">\n            <div class=\"<%= styles.tabs %>\" on-click=\"events.tabClick(i)\" s-if=\"fns.showToolBar(toolbarConfig)\">\n                <div title=\"{{toolbarConfig.text}}\" class=\"<%= styles.tab %> {{selectTabKey !== undefined && selectTabKey === i ? '<%= styles.active %>' : ''}}\">\n                    <span s-if=\"!!toolbarConfig.iconHtml\" class=\"iconfont\">{{toolbarConfig.iconHtml}}</span>\n                    <span>{{toolbarConfig.text}}</span>\n                </div>\n            </div>\n        </fragment>\n        <div class=\"<%= styles.tabFold %>\" title=\"{{expand ? '收起' : '展开'}}\" on-click=\"events.tabPanExpandClick()\">\n            <span class=\"iconfont\">{{expand?'&#xe656;':'&#xe71d;' | raw}}</span>\n        </div>\n    </div>\n    <div s-ref=\"tabPanels\" class=\"<%= styles.tabPanels %> {{expand ? '<%= styles.active %>' : ''}}\">\n        <div on-click=\"events.prevAndNextToolClick(false)\" class=\"<%= styles.prevTool %>\" s-show=\"fns.showControlBreakWrapper(showControlBreak, false)\"></div>\n        <div s-ref=\"toolsPanel\" class=\"<%= styles.tabPanel %>\" style=\"{{fns.settingToolsPanelWidthReturnStyle(handlePanelWidth)}}margin-left: {{-marginLeft}}px;\">\n            <fragment s-for=\"toolInfo, index in handlePanelTools\">\n                <div class=\"<%= styles.wrapper %>\" s-show=\"fns.showTool(toolInfo, bookmarkInfos.index)\">\n                    <div s-ref=\"ref-tool-{{index}}\" s-if=\"!!toolInfo.nodeInfo && toolInfo.type === 'default'\" class=\"<%= styles.tool %> {{toolInfo.nodeInfo.active?'<%= styles.active %>':''}}\" title=\"{{(toolInfo.nodeInfo && toolInfo.nodeInfo.title) || ''}}\" style=\"{{fns.handleNodeInfoWidth(toolInfo.nodeInfo)}}\">\n                        {{events.handleRender(toolInfo, index)}}\n                        <ui-toolbtn s-if=\"!toolInfo.nodeInfo.renderId\" s-bind=\"{{{...toolInfo.nodeInfo}}}\"></ui-toolbtn>\n                    </div>\n                    <div s-if=\"toolInfo.type === 'separate'\" class=\"<%= styles.separate %>\">\n                        <div></div>\n                    </div>\n                </div>\n            </fragment>\n        </div>\n        <div on-click=\"events.prevAndNextToolClick(true)\" class=\"<%= styles.nextTool %>\" s-show=\"fns.showControlBreakWrapper(showControlBreak, true)\"></div>\n    </div>\n</div>";

var headerToolMarginRight = 16;
var headerToolPanelHeight = 50;

var html$a = "<fragment>\n    <div s-if=\"html\" class=\"{{className || '<%= styles.icon %>'}}\">\n        <span class=\"iconfont\">{{html | raw}}</span>\n    </div>\n    <div s-if=\"text\" class=\"{{className || '<%= styles.text %>'}}\">\n        <span>{{text}}</span>\n    </div>\n</fragment>";

var ToolBtn = defineComponent({
    template: template$6(html$a)({ styles: styles$c })
});

var template$5 = template$6(htmlTemplate)({
    styles: styles$c
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
            return true;
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
            if ((_b = toolInfo.nodeInfo) === null || _b === void 0 ? void 0 : _b.isShow) {
                try {
                    return toolInfo.nodeInfo.isShow(appInterface);
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
        handleRender: function (toolInfo, index) {
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
                nodeEventCall(appInterface, toolInfo.nodeInfo._attachedId, appInterface);
            }
            if (!toolInfo.nodeInfo.evenIdList ||
                toolInfo.nodeInfo.evenIdList.length === 0) {
                return undefined;
            }
            dispatchDomEvent(toolEle, toolInfo.nodeInfo.evenIdList, this);
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

var html$9 = "<div class=\"<%= styles.reader %>\">\n    <div class=\"<%= styles.tempContent %>\" s-ref=\"tempContent\" s-show=\"bookmarkInfos.index < 0\"></div>\n    <!-- <fragment s-for=\"bookmark in bookmarkInfos.list\">\n        <div key=\"{{bookmark.id}}\" s-key=\"{{bookmark.id}}\" renderData=\"{{handleContent(bookmark.id)}}\" s-show=\"bookmarkInfos.id == bookmark.id\" class=\"<%= styles.readerContent %>\"\n            s-ref=\"ref-readerContent-{{bookmark.id}}\">\n        </div>\n    </fragment> -->\n    <div style=\"display: none\" key=\"{{renderReaders(bookmarkInfos.id)}}\"></div>\n    <div s-if=\"errMsg\" class=\"<%= styles.error %>\">\n        <h3>{{errMsg}}</h3>\n    </div>\n</div>";

var styles$b = {"reader":"index-module_reader__8JtQW","tempContent":"index-module_tempContent__lb78H","error":"index-module_error__updK0","readerContent":"index-module_readerContent__5qVGr"};

var styles$a = {"common_font":"index-module_common_font__1JO7K","text_overflow":"index-module_text_overflow__5IRoi","toolJump":"index-module_toolJump__1AnPZ","disabled":"index-module_disabled__hCCJ7","toolIconBtn":"index-module_toolIconBtn__99EQS","toolScale":"index-module_toolScale__GZ9IV","active":"index-module_active__SH6e7"};

var html$8 = "<div class=\"<%= styles.toolJump %>\">\n    <span class=\"iconfont {{prevDisableClass}}\" on-click=\"events.prevOrNextClick(false)\" title=\"上一页\">&#xe615;</span>\n    <input-number on-change=\"events.valueChange($event)\" s-ref=\"input-number\" minValue=\"1\" maxValue=\"{{maxValue}}\" value=\"{= value =}\"></input-number>\n    <span class=\"iconfont {{nextDisableClass}}\" on-click=\"events.prevOrNextClick(true)\" title=\"下一页\">&#xe718;</span>\n</div>";

var html$7 = "<input on-keyup=\"events.valueChange($event)\" on-keydown=\"events.valueKeyDown($event)\" on-blur=\"events.valueBlur($event)\" value=\"{= value =}\">";

var styles$9 = {};

var allowKeys = [8, 37, 39, 46];
var InputNumber = defineComponent({
    template: template$6(html$7)(styles$9),
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
    template: template$6(html$8)({ styles: styles$a }),
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
                return styles$a.disabled;
            }
        },
        nextDisableClass: function () {
            var val = this.data.get("value");
            var maxVal = this.data.get("maxValue");
            if (val >= maxVal) {
                return styles$a.disabled;
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

var html$6 = "<div class=\"<%= styles.toolScale %>\" style=\"width:80px;\">\n    <c-select on-change=\"events.valChange($event)\" activeVal=\"{= activeVal =}\" options=\"{{options}}\" suffix=\"%\"></c-select>\n</div>";

var html$5 = "<div class=\"<%= styles.select %> {{showOptions ? '<%= styles.active %>':''}}\" on-click=\"events.selectClick($event)\">\n    <div class=\"<%= styles.value %>\">\n        <!-- <span>{{activeText}}</span> -->\n        <input-number on-change=\"events.inputChange($event)\" style=\"width:50px;border: none;outline: none;\" minValue=\"{{1}}\" maxValue=\"{{800}}\" value=\"{= activeVal =}\">\n        </input-number>\n        <!-- <span class=\"<%= styles.suffix %>\">%</span> -->\n    </div>\n    <!-- <span class=\"iconfont\">&#xe71d;</span> -->\n    <span class=\"iconfont\">{{suffix|raw}}</span>\n</div>";

var styles$8 = {"common_font":"index-module_common_font__niHsZ","text_overflow":"index-module_text_overflow__COYLB","select":"index-module_select__2NwCG","value":"index-module_value__4778I","suffix":"index-module_suffix__bXZSl","active":"index-module_active__zruap"};

var html$4 = "<div class=\"<%= styles.options %>\" style=\"{{optionsStyle}}\">\n    <div s-for=\"option in options\" class=\"<%= styles.option %> {{activeVal===option.val ? '<%= styles.active %>':''}}\" on-click=\"events.optionClick($event,option)\">{{option.text}}</div>\n</div>";

var styles$7 = {"common_font":"index-module_common_font__Sz-yv","text_overflow":"index-module_text_overflow__MHvJv","options":"index-module_options__BzSRC","option":"index-module_option__7PE8z","active":"index-module_active__Xn-PG"};

var Options = defineComponent({
    template: template$6(html$4)({ styles: styles$7 }),
    attached: function () {
        this.events.documentClick = this.events.documentClick.bind(this);
        eventUtil.addHandler(document.body || document.getElementsByTagName("body")[0], "click", this.events.documentClick);
        eventUtil.addHandler(window, "resize", this.events.documentClick);
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
    template: template$6(html$5)({ styles: styles$8 }),
    components: {
        "input-number": InputNumber
    },
    attached: function () {
        // const optionsInterface = (this.ref(
        //   "optionsRef"
        // ) as any) as OptionsInterface;
        // optionsInterface.setBaseEle(this.el as any);
        if (!this.OptionsComponent) {
            this.OptionsComponent = new Options({
                owner: this,
                source: "<c-options on-optionClick=\"events.optionsClick($event)\" s-ref=\"optionsRef\" offset={{{y:2}}} mod=\"options\" show=\"{= showOptions =}\" activeVal=\"{= activeVal =}\" options=\"{{options}}\"></c-options>"
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
    template: template$6(html$6)({ styles: styles$a }),
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
            if (currentBookmark.index === -1) {
                return;
            }
            currentBookmark.parserWrapperInfo.parserInterface.addListener("scaleChange", this.events.scalChange);
            var scale = currentBookmark.parserWrapperInfo.parserInterface.getScale();
            this.data.set("activeVal", parseInt(scale * 100 + ""));
        },
        valChange: function (val) {
            debugger;
            this.app
                .currentBookmark()
                .parserWrapperInfo.parserInterface.setScale(val / 100);
        }
    }
});

var html$3 = "<div on-click=\"openFile\" class=\"<%= styles.content %>\">\n    <img src=\"data:image/png;base64,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\">\n</div>";

var styles$6 = {"content":"index-module_content__2P82G"};

var TempReaderContent = defineComponent({
    template: template$6(html$3)({ styles: styles$6 }),
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
    callback = callback.bind(self);
    eventListenerInterface.addListener(name, callback);
    return callback;
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
function selectOrMoveAttached(app) {
    selectOrMoveBookmarkChange = _bindListener(app, "bookmarkChange", selectOrMoveBookmarkChange, this);
}

var fullBtnId = createId();
function narrowDisabledHandler(app) {
    debugger;
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
    if (isDisabled && !this.className.includes("  " + styles$a.disabled)) {
        this.className += " " + styles$a.disabled;
        this.update(this);
    }
    else if (!isDisabled && this.className.includes(" " + styles$a.disabled)) {
        this.className = this.className.split(" ")[0];
        this.update(this);
    }
}
var _narrowDisabledHandler = narrowDisabledHandler;
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
    if (isDisabled && !this.className.includes("  " + styles$a.disabled)) {
        this.className += " " + styles$a.disabled;
        this.update(this);
    }
    else if (!isDisabled && this.className.includes(" " + styles$a.disabled)) {
        this.className = this.className.split(" ")[0];
        this.update(this);
    }
}
var _enlargeDisabledHandle = enlargeDisabledHandle;
function narrowOrEnlargeScaleChange(scale) {
    scale = parseInt(scale * 100 + "");
    var isNarrow = this.title === "缩小";
    var val = scaleVals[isNarrow ? 0 : scaleVals.length - 1];
    var isDisabled = isNarrow ? scale <= val : scale >= val;
    if (isDisabled) {
        if (!this.className.includes(" " + styles$a.disabled)) {
            this.className += " " + styles$a.disabled;
            this.update(this);
        }
    }
    else if (this.className.includes(" " + styles$a.disabled)) {
        this.className = this.className.split(" ")[0];
        this.update(this);
    }
}
var _narrowScaleChange = narrowOrEnlargeScaleChange;
var _EnlargeScaleChange = narrowOrEnlargeScaleChange;
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
                if (this._toolJump) {
                    this._toolJump.dispose();
                }
                this._toolJump = new ToolJump();
                this._toolJump.app = app;
                this._toolJump.attach(parent);
            },
            isShow: function (app) {
                var supportPages = app.currentBookmark().parserWrapperInfo.parserInfo
                    .support.pages;
                return supportPages && supportPages.jump;
            }
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
            html: "&#xe67b;",
            needReader: true,
            title: "缩小",
            width: 24,
            className: styles$a.toolIconBtn,
            isShow: showSupportScale,
            attached: function (app) {
                app.removeListener("bookmarkChange", _narrowDisabledHandler);
                _narrowDisabledHandler = narrowDisabledHandler.bind(this);
                app.addListener("bookmarkChange", _narrowDisabledHandler);
                app.getReader().removeListener("scaleChange", _narrowScaleChange);
                _narrowScaleChange = narrowOrEnlargeScaleChange.bind(this);
                app.getReader().addListener("scaleChange", _narrowScaleChange);
            },
            click: function (app) {
                try {
                    var nextNodeInfo = this.selector.next();
                    if (nextNodeInfo.className.includes(" " + styles$a.disabled)) {
                        nextNodeInfo.className = nextNodeInfo.className.split(" ")[0];
                        nextNodeInfo.update(nextNodeInfo);
                    }
                    if (this.className.includes(" " + styles$a.disabled)) {
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
                        if (this.className.includes(" " + styles$a.disabled)) {
                            return;
                        }
                        this.className += " " + styles$a.disabled;
                        this.update(this);
                        if (index === -1) {
                            return;
                        }
                    }
                    else if (this.className.includes(" " + styles$a.disabled)) {
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
            html: "&#xe65a;",
            title: "放大",
            width: 24,
            className: styles$a.toolIconBtn,
            isShow: showSupportScale,
            attached: function (app) {
                app.removeListener("bookmarkChange", _enlargeDisabledHandle);
                _enlargeDisabledHandle = enlargeDisabledHandle.bind(this);
                app.addListener("bookmarkChange", _enlargeDisabledHandle);
                app.getReader().removeListener("scaleChange", _EnlargeScaleChange);
                _EnlargeScaleChange = narrowOrEnlargeScaleChange.bind(this);
                app.getReader().addListener("scaleChange", _EnlargeScaleChange);
            },
            click: function (app) {
                var prevNodeInfo = this.selector.prev();
                if (prevNodeInfo.className.includes(" " + styles$a.disabled)) {
                    prevNodeInfo.className = prevNodeInfo.className.split(" ")[0];
                    prevNodeInfo.update(prevNodeInfo);
                }
                if (this.className.includes(" " + styles$a.disabled)) {
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
                        if (this.className.includes(" " + styles$a.disabled)) {
                            return;
                        }
                        this.className += " " + styles$a.disabled;
                        this.update(this);
                        if (index >= scaleVals.length) {
                            return;
                        }
                    }
                    else if (this.className.includes(" " + styles$a.disabled)) {
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
            text: "查找"
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
                headerTabsBtns.preferenc,
            ]
        },
        tools: {
            text: "工具"
        },
        view: {
            text: "视图"
        },
        reader: {
            text: "阅读"
        },
        safety: {
            text: "安全"
        },
        help: {
            text: "帮助"
        }
    },
    sildebarLeftTabs: {
        sign: {
            text: "签名",
            iconHtml: "&#xe64f;",
            disabled: slidebarLeftToolbarDisabled
        },
        comment: {
            text: "注释",
            iconHtml: "&#xe650;",
            disabled: slidebarLeftToolbarDisabled
        },
        thumbnail: {
            text: "缩图",
            iconHtml: "&#xe651;",
            disabled: slidebarLeftToolbarDisabled
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
    template: template$6(html$9)({ styles: styles$b }),
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
                        readerEle.className = styles$b.readerContent;
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

var html$2 = "<div class=\"<%= styles.slidebarLeft %>\" style=\"{{slideWrapperIeStyle}}\">\n    <div class=\"clearfix <%= styles.tabsWrapper %>\">\n        <div class=\"<%= styles.comment %>\">\n            <span>缩图</span>\n        </div>\n        <div class=\"<%= styles.tabs %>\">\n            <fragment s-for=\"toolbar, index in toolbars\">\n                <div s-if=\"fns.showTab(toolbar)\" class=\"<%= styles.tab %> {{fns.disabled(toolbar.disabled)}} {{activeKey === index ? '<%= styles.active %>':''}}\" title=\"{{toolbar.text}}\" on-click=\"events.tabClick($event, index, toolbar, fns.disabled(toolbar.disabled))\">\n                    <div class=\"<%= styles.icon %>\">\n                        <span class=\"iconfont\">{{toolbar.iconHtml|raw}}</span>\n                    </div>\n                    <div class=\"<%= styles.desc %>\">\n                        <span>{{toolbar.text}}</span>\n                    </div>\n                </div>\n            </fragment>\n\n        </div>\n    </div>\n    <div s-show=\"{{activeKey >= 0}}\" class=\"clearfix <%= styles.tabPannel %> {{!expand?'<%= styles.fold %>':''}}\">\n        <div class=\"<%= styles.expand %>\" on-click=\"events.expandChange()\">\n            <span class=\"iconfont\">{{!expand?'&#xe718;':'&#xe615;'|raw}}</span>\n        </div>\n    </div>\n</div>";

var styles$5 = {"common_font":"index-module_common_font__rsmEw","text_overflow":"index-module_text_overflow__p5aoa","slidebarLeft":"index-module_slidebarLeft__higRK","tabsWrapper":"index-module_tabsWrapper__oMxJA","comment":"index-module_comment__h9Ykh","tabs":"index-module_tabs__YSKU6","tab":"index-module_tab__F6hp2","disabled":"index-module_disabled__Ptq3y","icon":"index-module_icon__Zsx8e","desc":"index-module_desc__MkXk0","active":"index-module_active__ZtWjc","tabPannel":"index-module_tabPannel__NJDF1","fold":"index-module_fold__Hp4cY","expand":"index-module_expand__RCTjV"};

var SlidebarLeft = defineComponent({
    components: {},
    template: template$6(html$2)({ styles: styles$5 }),
    initData: function () {
        return {
            expand: false
        };
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
        }
    },
    events: {
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
        disabled: function (disabled) {
            if (typeof disabled === "boolean") {
                return disabled ? styles$5.disabled : "";
            }
            else if (typeof disabled !== "string") {
                return "";
            }
            var appInterface = getApp(this.data.get("appId"));
            var datas = getAppDataStore(this.data.get("appId"));
            var fn = datas.get(disabled);
            return fn(appInterface) ? styles$5.disabled : "";
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

var styles$4 = {};

var SlidebarRight = defineComponent({
    template: template$6(html$1)({ styles: styles$4 })
});

var styles$3 = {"app":"index-module_app__DAOOy","header":"index-module_header__NtWW5","sidebarLeft":"index-module_sidebarLeft__MA3wh","sidebarRight":"index-module_sidebarRight__2F13Z","content":"index-module_content__m20ZT","reader":"index-module_reader__xIj2-"};

var styles$2 = {"bookmark":"index-module_bookmark__1nGVp","tabGroup":"index-module_tabGroup__0ZnGy","btnGroup":"index-module_btnGroup__7TZ-F","tabs":"index-module_tabs__P0lJ0","tabAdd":"index-module_tabAdd__uIR8p"};

var styles$1 = {"tab":"index-module_tab__nriyF","active":"index-module_active__6hZmf","fileName":"index-module_fileName__A6hsy","closeBtn":"index-module_closeBtn__MTrBM"};

var template$4 = "\n    <div on-click=\"events.tabClick()\" class=\"".concat(styles$1.tab, " {{active?'").concat(styles$1.active, "':''}}\">\n      <div title=\"{{name}}\" class=\"").concat(styles$1.fileName, "\">\n        <sapn>{{name}}</sapn>\n      </div>\n      <div on-click=\"events.tabClose()\" class=\"").concat(styles$1.closeBtn, "\">\n        <span title=\"\u5173\u95ED\" class=\"iconfont\">&#xe600;</span>\n      </div>\n    </div>\n");
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

var styles = {"btn":"index-module_btn__Z99v5"};

var template$3 = "<div s-ref=\"btn-wrapper\">\n    <div s-if=\"!eleId\" s-ref=\"btn\" class=\"".concat(styles.btn, "\" title=\"{{title}}\">\n        <span class=\"{{className}}\">{{text}}{{(html||\"\") | raw}}</span>\n    </div>\n</div>");
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
        dispatchDomEvent(btnEle, eventIdList, this);
    },
    detached: function () {
        var dataStore = getApp(this.data.get("appId")).getDataStore();
        var eventIdList = this.data.get("evenIdList");
        nodeEventDestroy.apply(dom, __spreadArray([dataStore], eventIdList, false));
    }
});

var html = "<div class=\"<%= styles.bookmark %>\">\n    <div s-ref=\"tab-group\" class=\"<%= styles.tabGroup %>\" style=\"right: {{btnGroupWidth+12}}px\">\n        <div s-ref=\"tab-wrapper-scroll\" class=\"<%= styles.tabs %>\">\n            <div s-ref=\"tab-wrapper\" style=\"overflow: hidden\">\n                <h-tab s-for=\"b, i in bookmarks\" appId=\"{{appId}}\" active=\"{{currentIndex === i}}\" id=\"{{b.id}}\" name=\"{{b.name}}\"></h-tab>\n            </div>\n        </div>\n        <div title=\"打开\" on-click=\"events.add($event)\" class=\"<%= styles.tabAdd %>\">\n            <span class=\"iconfont\">&#xe64d;</span>\n        </div>\n    </div>\n    <div s-if=\"btnGroup && btnGroup.btns && btnGroup.btns.length > 0\" class=\"<%= styles.btnGroup %>\" style=\"width: {{btnGroupWidth}}px\">\n        <tab-btn s-for=\"btn in btnGroup.btns\" s-bind=\"{{{...btn}}}\"></tab-btn>\n    </div>\n</div>";

var template$2 = template$6(html)({
    styles: styles$2
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
var template = "\n<div id=\"".concat(styles$3.app, "\" on-contextmenu=\"events.contextmenu($event)\">\n    <div id=\"").concat(styles$3.header, "\" s-ref=\"header\">\n        <ui-tabs appShow=\"{{appShow}}\" s-if={{tabPages!==false}} s-bind={{{...(tabPages||{})}}} bookmarkInfos=\"{{bookmarkInfos}}\" appId=\"{{appId}}\" ></ui-tabs>\n        <ui-header appShow=\"{{appShow}}\" s-if=\"{{header !== false}}\" s-bind={{{...header}}} appId=\"{{appId}}\" bookmarkInfos=\"{{bookmarkInfos}}\" ></ui-header>\n    </div>\n    <div id=\"").concat(styles$3.content, "\" style=\"height: {{contentHeight}}px\">\n      <div s-if=\"{{!sidebars || sidebars.left !== false}}\" id=\"").concat(styles$3.sidebarLeft, "\">\n        <ui-slide-left appShow=\"{{appShow}}\" appId=\"{{appId}}\" s-bind=\"{{{...(sidebars.left||{})}}}\"></ui-slide-left>\n      </div>\n      <div  s-if=\"{{!sidebars || sidebars.right !== false}}\" id=\"").concat(styles$3.sidebarRight, "\">\n        <ui-slide-right appShow=\"{{appShow}}\" appId=\"{{appId}}\" s-bind=\"{{{...(sidebars.right||{})}}}\"></ui-slide-right>\n      </div>\n      <div id=\"").concat(styles$3.reader, "\">\n        <ui-reader bookmarkInfos=\"{{bookmarkInfos}}\" appShow=\"{{appShow}}\" s-ref=\"ref-reader\" appId=\"{{appId}}\" s-bind=\"{{{...(content||{})}}}\"></ui-reader>\n      </div>\n    </div>\n    <div id=\"").concat(styles$3.fotter, "\" s-ref=\"fotter\"></div>\n</div>\n");
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
    ReaderParserAbstract.supportAll = {
        nowBrowser: true,
        fileSuffix: [],
        isSupportFile: function (file) {
            return true;
        },
        scale: true,
        full: {
            width: true,
            content: true
        },
        pages: {
            jump: true,
            moduleSwitch: true,
            find: true,
            adaptiveView: true,
            showPageNo: true
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
    isSupportFile: function (file) {
        return false;
    },
    scale: false,
    full: false,
    pages: false,
    listener: false
};
var ErrFileNotParsed = new Error("文件无法被解析, 请添加对应解析器");
var ErrNoSupportFileSuffix = new Error("没有可被解析的文件后缀，请尝试添加解析器");
var ErrFeilSelectWait = new Error("文件选择已被锁定，请稍后重试");
var ErrLackOfParser = new Error("缺失解析器信息");

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
            defaultData.headerTabs.safety,
            defaultData.headerTabs.help,
        ]
    },
    sidebars: {
        left: {
            toolbars: [
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
    template: "<ui-app s-ref=\"ref-app\" s-show=\"show\" appShow=\"{{show}}\" style=\"min-height: {{appOptions.minHeight || 800}}px;min-width: {{appOptions.minWidth || 1280}}px;\" s-bind=\"{{{...appOptions, bookmarkInfos}}}\" appId=\"{{appId}}\" ></<ui-app>",
    initData: function () {
        return {
            show: false,
            appOptions: {}
        };
    },
    messages: {
        "HTML::ELE::EVENT": function (args) {
            var val = args && args.value;
            this.eventMapping(val.id, val.event);
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
        debugger;
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
            _this._appComponent.eventMapping = function (id, event) {
                nodeEventCall(_this, id, _this, event);
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
                var toolbar_1 = toolbarConfigs[i];
                toolbar_1.disabled = handleDisabled(toolbar_1.disabled, _this._datastore);
                if (toolbar_1.activeChange) {
                    var activeChangeFnId = createId();
                    _this._datastore.set(activeChangeFnId, toolbar_1.activeChange);
                    toolbar_1._activeChangeFnId = activeChangeFnId;
                }
                if (!toolbar_1.tools || toolbar_1.tools.length === 0) {
                    return "continue";
                }
                var nodeInfoList = toolbar_1.tools.map(function (tool) { return tool.nodeInfo; });
                var _loop_2 = function (j) {
                    var toolInfo = toolbar_1.tools[j];
                    toolInfo.disabled = handleDisabled(toolInfo.disabled, _this._datastore);
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

export { App, ErrFeilSelectWait, ErrFileNotParsed, ErrLackOfParser, ErrNoSupportFileSuffix, ReaderParserAbstract, defaultContentTemp, defaultData, index as ieUtil, readerParserSupportDefault };
