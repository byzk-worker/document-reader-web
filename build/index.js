import { defineComponent, DataTypes } from 'san';
import { template as template$6 } from 'lodash';
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
    return "".concat(new Date().getTime()).concat(win._idNo);
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
var _nodeEventMap = {};
var _nodeRenderMap = {};
/**
 * 绑定事件
 * @param eventName 事件名称
 * @param callback 回调函数
 * @returns 事件id
 */
function nodeEvenBindEvent(eventName, callback) {
    var id = createId() + "_" + eventName;
    _nodeEventMap[id] = {
        id: id,
        name: eventName,
        callback: callback
    };
    return id;
}
/**
 * 获取节点的事件信息
 * @param eventId 事件id
 * @returns 事件信息
 */
function nodeEventInfoGet(eventId) {
    return _nodeEventMap[eventId];
}
/**
 * 处理节点信息
 * @param nodeInfo 节点信息
 * @returns 处理之后的节点信息
 */
function handleNodeInfo(nodeInfo) {
    var srcEventIdList = nodeInfo.evenIdList || [];
    var eventIdList = [];
    var tempEventMap = {};
    if (nodeInfo.click) {
        var id = nodeEvenBindEvent("click", nodeInfo.click);
        eventIdList.push(id);
        tempEventMap["click"] = {
            id: id
        };
    }
    if (nodeInfo.eventBind) {
        nodeInfo.eventBind(function (eventName, callback) {
            var srcEvent = tempEventMap[eventName];
            if (srcEvent) {
                nodeEventDestroy(srcEvent.id);
            }
            var id = nodeEvenBindEvent(eventName, callback);
            eventIdList.push(id);
            tempEventMap[eventName] = { id: id };
        });
    }
    for (var i = 0; i < srcEventIdList.length; i++) {
        var srcId = srcEventIdList[i];
        var srcNodeInfo = _nodeEventMap[srcId];
        if (!srcNodeInfo) {
            continue;
        }
        if (tempEventMap[srcNodeInfo.name]) {
            nodeEventDestroy(srcNodeInfo.id);
        }
    }
    var renderId = nodeInfo.id;
    if (nodeInfo.render) {
        if (renderId) {
            delete _nodeRenderMap[renderId];
        }
        renderId = createId();
        _nodeRenderMap[renderId] = nodeInfo;
    }
    nodeInfo = __assign(__assign({}, nodeInfo), { renderId: renderId, evenIdList: eventIdList });
    return JSON.parse(JSON.stringify(nodeInfo));
}
function nodeRender(renderId, app, parent) {
    if (!renderId) {
        throw new Error("未获取到renderId");
    }
    var nodeInfo = _nodeRenderMap[renderId];
    if (!nodeInfo || !nodeInfo.render) {
        throw new Error("获取节点render方法失败");
    }
    return nodeInfo.render(app, nodeInfo, parent);
}
/**
 * 节点事件调用
 * @param eventId 事件ID
 * @param args 参数
 */
function nodeEventCall(eventId) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var nodeEventInfo = _nodeEventMap[eventId];
    if (!nodeEventInfo) {
        return;
    }
    nodeEventInfo.callback.apply(nodeEventInfo, args);
}
/**
 * 节点元素事件注销
 * @param eventId 事件id
 */
function nodeEventDestroy() {
    var eventIds = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        eventIds[_i] = arguments[_i];
    }
    var eventIdLen = eventIds.length;
    if (eventIdLen === 0) {
        return;
    }
    for (var i = 0; i < eventIdLen; i++) {
        delete _nodeEventMap[eventIds[i]];
    }
}
/**
 * 节点事件销毁全部
 */
function nodeEventDestroyAll() {
    _nodeEventMap = {};
}
function nodeRenderDestroy() {
    var renderId = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        renderId[_i] = arguments[_i];
    }
    var renderIdLen = renderId.length;
    if (renderIdLen === 0) {
        return;
    }
    for (var i = 0; i < renderIdLen; i++) {
        delete _nodeRenderMap[renderId[i]];
    }
}
function nodeRenderDestroyAll() {
    _nodeRenderMap = {};
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
    styleInject: styleInject,
    full: full,
    exitFullscreen: exitFullscreen,
    getFullscreenElement: getFullscreenElement,
    isFullScreen: isFullScreen,
    eventUtil: eventUtil,
    getBoundingClientRect: getBoundingClientRect,
    dispatchDomEvent: dispatchDomEvent,
    nodeEventInfoGet: nodeEventInfoGet,
    handleNodeInfo: handleNodeInfo,
    nodeRender: nodeRender,
    nodeEventCall: nodeEventCall,
    nodeEventDestroy: nodeEventDestroy,
    nodeEventDestroyAll: nodeEventDestroyAll,
    nodeRenderDestroy: nodeRenderDestroy,
    nodeRenderDestroyAll: nodeRenderDestroyAll
});

var _appMap = {};
function registryApp(app) {
    var appId = createId();
    _appMap[appId] = app;
    return appId;
}
function unRegistryApp(id) {
    delete _appMap[id];
}
function getApp(id) {
    return _appMap[id];
}

/**
 * 数据存储Map
 */
var dataStoreMap = {};
function dataStoreGet(key) {
    return dataStoreMap[key];
}
function dataStoreSet(key, val) {
    dataStoreMap[key] = val;
}
/**
 * 删除数据存储元素
 * @param key 要删除的key
 * @returns 被删除的元素
 */
function dataStoreRemove(key) {
    var data = dataStoreMap[key];
    delete dataStoreMap[key];
    return data;
}

function lessThan(ieNumber) {
    if (navigator.appName == "Microsoft Internet Explorer" &&
        navigator.appVersion.match(/7./i) == "7.") {
        return 7 < ieNumber;
    }
    else if (navigator.appName == "Microsoft Internet Explorer" &&
        navigator.appVersion.match(/8./i) == "8.") {
        return 6 < ieNumber;
    }
    else if (navigator.appName == "Microsoft Internet Explorer" &&
        navigator.appVersion.match(/9./i) == "9.") {
        return 9 < ieNumber;
    }
    else if (navigator.appName == "Microsoft Internet Explorer") {
        return 6 < ieNumber;
    }
    return false;
}

var styles$9 = {"common_font":"index-module_common_font__kzEJV","text_overflow":"index-module_text_overflow__8S-Xs","header":"index-module_header__bANPo","tollbar":"index-module_tollbar__GkMcX","tabFold":"index-module_tabFold__y-rrE","fileBtn":"index-module_fileBtn__ws1VT","tabs":"index-module_tabs__9LWcB","tab":"index-module_tab__RiFFH","active":"index-module_active__a-6ac","tabPanels":"index-module_tabPanels__FVo0y","prevTool":"index-module_prevTool__ac9hp","nextTool":"index-module_nextTool__6W3wq","tabPanel":"index-module_tabPanel__aeg7u","wrapper":"index-module_wrapper__alOl2","separate":"index-module_separate__rpKpN","tool":"index-module_tool__nu8f-","text":"index-module_text__XqzxF","icon":"index-module_icon__MnfZO"};

var htmlTemplate = "<div id=\"{{id || undefined}}\" class=\"<%= styles.header %>{{className ? ' ' + className : ''}}\">\n    <div class=\"<%= styles.tollbar %>\">\n        <div class=\"<%= styles.fileBtn %>\">\n            <span class=\"iconfont icon-caidan\">\n                <span>文件</span>\n            </span>\n        </div>\n        <div s-for=\"toolbarConfig, i in toolbars\" class=\"<%= styles.tabs %>\" on-click=\"events.tabClick(i)\">\n            <div title=\"{{toolbarConfig.text}}\" class=\"<%= styles.tab %> {{selectTabKey !== undefined && selectTabKey === i ? '<%= styles.active %>' : ''}}\">\n                <span s-if=\"!!toolbarConfig.iconHtml\" class=\"iconfont\">{{toolbarConfig.iconHtml}}</span>\n                <span>{{toolbarConfig.text}}</span>\n            </div>\n        </div>\n        <div class=\"<%= styles.tabFold %>\" title=\"{{expand ? '收起' : '展开'}}\" on-click=\"events.tabPanExpandClick()\">\n            <span class=\"iconfont\">{{expand?'&#xe656;':'&#xe71d;' | raw}}</span>\n        </div>\n    </div>\n    <div s-ref=\"tabPanels\" class=\"<%= styles.tabPanels %> {{expand ? '<%= styles.active %>' : ''}}\">\n        <div on-click=\"events.prevAndNextToolClick(false)\" class=\"<%= styles.prevTool %>\" s-show=\"fns.showControlBreakWrapper(showControlBreak, false)\"></div>\n        <!-- <div s-for=\"toolbarConfig, i in toolbars\" s-show=\"selectTabKey !== undefined && selectTabKey === i\" -->\n        <div s-ref=\"toolsPanel\" class=\"<%= styles.tabPanel %>\" style=\"{{fns.settingToolsPanelWidthReturnStyle(handlePanelWidth)}}margin-left: {{-marginLeft}}px;\">\n            <div class=\"<%= styles.wrapper %>\" s-for=\"toolInfo in handlePanelTools\">\n                <div s-ref=\"ref-tool-{{toolInfo.nodeInfo && toolInfo.nodeInfo.renderId}}\" s-if=\"!!toolInfo.nodeInfo && toolInfo.type === 'default'\" class=\"<%= styles.tool %>\" title=\"{{(toolInfo.nodeInfo && toolInfo.nodeInfo.title) || ''}}\" style=\"{{fns.handleNodeInfoWidth(toolInfo.nodeInfo)}}\">\n                    <div s-if=\"toolInfo.nodeInfo && !toolInfo.nodeInfo.renderId\" class=\"{{toolInfo.nodeInfo.className || '<%= styles.icon %>'}}\">\n                        <span class=\"iconfont\">{{toolInfo.nodeInfo.html | raw}}</span>\n                    </div>\n                    <div s-if=\"toolInfo.nodeInfo && !toolInfo.nodeInfo.renderId && toolInfo.nodeInfo.text\" class=\"{{toolInfo.nodeInfo.className || '<%= styles.text %>'}}\">\n                        <span>{{toolInfo.nodeInfo.text}}</span>\n                    </div>\n                    {{(toolInfo.type === 'default' && toolInfo.nodeInfo && toolInfo.nodeInfo.renderId) ?\n                    events.handleRender(toolInfo.nodeInfo.renderId) : undefined}}\n                </div>\n                <div s-if=\"toolInfo.type === 'separate'\" class=\"<%= styles.separate %>\">\n                    <div></div>\n                </div>\n            </div>\n        </div>\n        <div on-click=\"events.prevAndNextToolClick(true)\" class=\"<%= styles.nextTool %>\" s-show=\"fns.showControlBreakWrapper(showControlBreak, true)\"></div>\n    </div>\n</div>";

var headerToolMarginRight = 16;
var headerToolPanelHeight = 50;

var template$5 = template$6(htmlTemplate)({
    styles: styles$9
});
var Header = defineComponent({
    template: template$5,
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
        var _this = this;
        setTimeout(function () {
            _this.dispatch("app::resize", {});
        }, 500);
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
        handleRender: function (renderId) {
            if (!renderId) {
                return undefined;
            }
            var toolEle = this.ref("ref-tool-" + renderId);
            if (!toolEle) {
                return undefined;
            }
            var appId = this.data.get("appId");
            var ele = nodeRender(renderId, getApp(appId), this);
            if (typeof ele.attach !== "function") {
                toolEle.innerHTML = "";
                toolEle.appendChild(ele);
            }
            else {
                ele.attach(toolEle);
            }
        },
        prevAndNextToolClick: function (isNext) {
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

var html$6 = "<div class=\"<%= styles.slidebarLeft %>\" style=\"{{slideWrapperIeStyle}}\">\n    <div class=\"clearfix <%= styles.tabsWrapper %>\">\n        <div class=\"<%= styles.comment %>\">\n            <span>缩图</span>\n        </div>\n        <div class=\"<%= styles.tabs %>\">\n            <div s-for=\"toolbar, index in toolbars\" class=\"<%= styles.tab %> {{activeKey === index ? '<%= styles.active %>':''}}\" title=\"{{toolbar.text}}\" on-click=\"events.tabClick($event, index, toolbar)\">\n                <div class=\"<%= styles.icon %>\">\n                    <span class=\"iconfont\">{{toolbar.iconHtml|raw}}</span>\n                </div>\n                <div class=\"<%= styles.desc %>\">\n                    <span>{{toolbar.text}}</span>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div s-show=\"{{activeKey >= 0}}\" class=\"clearfix <%= styles.tabPannel %> {{!expand?'<%= styles.fold %>':''}}\">\n        <div class=\"<%= styles.expand %>\" on-click=\"events.expandChange()\">\n            <span class=\"iconfont\">{{!expand?'&#xe718;':'&#xe615;'|raw}}</span>\n        </div>\n    </div>\n</div>";

var styles$8 = {"common_font":"index-module_common_font__rsmEw","text_overflow":"index-module_text_overflow__p5aoa","slidebarLeft":"index-module_slidebarLeft__higRK","tabsWrapper":"index-module_tabsWrapper__oMxJA","comment":"index-module_comment__h9Ykh","tabs":"index-module_tabs__YSKU6","tab":"index-module_tab__F6hp2","icon":"index-module_icon__Zsx8e","desc":"index-module_desc__MkXk0","active":"index-module_active__ZtWjc","tabPannel":"index-module_tabPannel__NJDF1","fold":"index-module_fold__Hp4cY","expand":"index-module_expand__RCTjV"};

var SlidebarLeft = defineComponent({
    template: template$6(html$6)({ styles: styles$8 }),
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
        tabClick: function (event, key, toolbar) {
            var nowActiveKey = this.data.get("activeKey");
            this.data.set("activeKey", key);
            if (nowActiveKey !== key) {
                this.data.set("expand", true);
            }
        },
        expandChange: function () {
            this.data.set("expand", !this.data.get("expand"));
        }
    }
});

var styles$7 = {"app":"index-module_app__DAOOy","header":"index-module_header__NtWW5","sidebarLeft":"index-module_sidebarLeft__MA3wh","content":"index-module_content__m20ZT"};

var styles$6 = {"bookmark":"index-module_bookmark__1nGVp","tabGroup":"index-module_tabGroup__0ZnGy","btnGroup":"index-module_btnGroup__7TZ-F","tabs":"index-module_tabs__P0lJ0","tabAdd":"index-module_tabAdd__uIR8p"};

var styles$5 = {"tab":"index-module_tab__nriyF","fileName":"index-module_fileName__A6hsy","closeBtn":"index-module_closeBtn__MTrBM"};

var template$4 = "\n    <div class=\"".concat(styles$5.tab, "\">\n      <div title={{name}} class=\"").concat(styles$5.fileName, "\">\n        <sapn>{{name}}</sapn>\n      </div>\n      <div class=\"").concat(styles$5.closeBtn, "\">\n        <span title=\"\u5173\u95ED\" class=\"iconfont\">&#xe600;</span>\n      </div>\n    </div>\n");
var BookmarkTab = defineComponent({
    template: template$4
});

var styles$4 = {"btn":"index-module_btn__Z99v5"};

var template$3 = "<div s-ref=\"btn-wrapper\">\n    <div s-if=\"!eleId\" s-ref=\"btn\" class=\"".concat(styles$4.btn, "\" title=\"{{title}}\">\n        <span class=\"{{className}}\">{{text}}{{(html||\"\") | raw}}</span>\n    </div>\n</div>");
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
        var eventIdList = this.data.get("evenIdList");
        nodeEventDestroy.apply(dom, eventIdList);
    }
});

var html$5 = "<div class=\"<%= styles.bookmark %>\">\n    <div s-ref=\"tab-group\" class=\"<%= styles.tabGroup %>\" style=\"right: {{btnGroupWidth+12}}px\">\n        <div s-ref=\"tab-wrapper-scroll\" class=\"<%= styles.tabs %>\">\n            <div s-ref=\"tab-wrapper\" style=\"overflow: hidden\">\n                <h-tab s-for=\"t in tabs\" id=\"{{t.id}}\" name=\"{{t.name}}\"></h-tab>\n            </div>\n        </div>\n        <div title=\"打开\" on-click=\"events.add($event)\" class=\"<%= styles.tabAdd %>\">\n            <span class=\"iconfont\">&#xe64d;</span>\n        </div>\n    </div>\n    <div s-if=\"btnGroup && btnGroup.btns && btnGroup.btns.length > 0\" class=\"<%= styles.btnGroup %>\" style=\"width: {{btnGroupWidth}}px\">\n        <tab-btn s-for=\"btn in btnGroup.btns\" s-bind=\"{{{...btn}}}\"></tab-btn>\n    </div>\n</div>";

var template$2 = template$6(html$5)({
    styles: styles$6
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
            this.dispatch("TABS::ADD", {});
        }
    },
    watchTabGroup: function () {
        var tabGroupEle = this.ref("tab-group");
        var tabWrapperEle = this.ref("tab-wrapper");
        var tabWrapperScrollEle = this.ref("tab-wrapper-scroll");
        if (!tabGroupEle || !tabWrapperEle || !tabWrapperScrollEle) {
            return;
        }
        var tabs = this.data.get("tabsInfo") || [];
        var tabWrapperWidth = tabs.length * (166 + 20);
        tabWrapperEle.style.width = tabWrapperWidth + "px";
        var width = tabGroupEle.clientWidth;
        if (tabWrapperWidth > width) {
            tabWrapperScrollEle.style.width = width - 60 + "px";
        }
        else {
            tabWrapperScrollEle.style.width = "";
        }
    },
    dataTypes: {
        tabs: DataTypes.arrayOf(DataTypes.shape({
            id: DataTypes.string,
            name: DataTypes.string
        }))
    },
    initData: function () {
        return {
            tabs: []
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

var template$1 = "<h-bookmark class=\"{{classNames}}\" style=\"{{styles}}\" btnGroup=\"{{btnGroup}}\" ></h-bookmark>";
var TabPages = defineComponent({
    components: {
        "h-bookmark": Bookmark
    },
    template: template$1,
    attached: function () {
        var _this = this;
        setTimeout(function () {
            _this.dispatch("app::resize", {});
        }, 500);
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
            var tabsInfos = this.data.get("tabsInfo") || [];
            if (tabsInfos.length === 0 ||
                (tabsInfos.length === 1 && autoHide == "onePage")) {
                return "height: 0";
            }
            return undefined;
        }
    }
});

var template = "\n<div id=\"".concat(styles$7.app, "\" on-contextmenu=\"events.contextmenu($event)\">\n    <div id=\"").concat(styles$7.header, "\" s-ref=\"header\">\n        <ui-tabs s-if={{tabPages!==false}} s-bind={{{...(tabPages||{})}}} appId=\"{{appId}}\" ></ui-tabs>\n        <ui-header s-if=\"{{header !== false}}\" s-bind={{{...header}}} appId=\"{{appId}}\" ></ui-header>\n    </div>\n    <div id=\"").concat(styles$7.content, "\" style=\"height: {{contentHeight}}px\">\n      <div s-if=\"{{!sidebars || sidebars.left !== false}}\" id=\"").concat(styles$7.sidebarLeft, "\">\n        <ui-slide-left appId=\"{{appId}}\" s-bind=\"{{{...(sidebars.left||{})}}}\"></ui-slide-left>\n      </div>\n      <div id=\"").concat(styles$7.reader, "\"></div>\n      <div id=\"").concat(styles$7.sidebarRight, "\"></div>\n    </div>\n    <div id=\"").concat(styles$7.fotter, "\" s-ref=\"fotter\"></div>\n</div>\n");
var AppUi = defineComponent({
    components: {
        "ui-tabs": TabPages,
        "ui-header": Header,
        "ui-slide-left": SlidebarLeft
    },
    template: template,
    messages: {
        "app::resize": function () {
            this.events.resize();
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
        resize: function () {
            if (!this.ref) {
                return;
            }
            var headerEle = this.ref("header");
            var fotterEle = this.ref("fotter");
            var root = this.el;
            if (!headerEle || !fotterEle || !root) {
                return;
            }
            var contentHeight = root.clientHeight - headerEle.clientHeight - fotterEle.clientHeight;
            this.data.set("contentHeight", contentHeight);
        }
    }
});

var styles$3 = {"common_font":"index-module_common_font__1JO7K","text_overflow":"index-module_text_overflow__5IRoi","toolJump":"index-module_toolJump__1AnPZ","disabled":"index-module_disabled__hCCJ7","toolIconBtn":"index-module_toolIconBtn__99EQS","toolScale":"index-module_toolScale__GZ9IV"};

var html$4 = "<div class=\"<%= styles.toolJump %>\">\n    <span class=\"iconfont {{prevDisableClass}}\" on-click=\"events.prevOrNextClick(false)\" title=\"上一页\">&#xe615;</span>\n    <input-number s-ref=\"input-number\" minValue=\"1\" maxValue=\"{{maxValue}}\" value=\"{= value =}\"></input-number>\n    <span class=\"iconfont {{nextDisableClass}}\" on-click=\"events.prevOrNextClick(true)\" title=\"下一页\">&#xe718;</span>\n</div>";

var html$3 = "<input on-keyup=\"events.valueChange($event)\" on-keydown=\"events.valueKeyDown($event)\" on-blur=\"events.valueBlur($event)\" value=\"{= value =}\">";

var styles$2 = {};

var allowKeys = [8, 37, 39, 46];
var InputNumber = defineComponent({
    template: template$6(html$3)(styles$2),
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
        },
        valueBlur: function (event) {
            var ele = event.target;
            var valStr = ele.value;
            if (valStr !== "") {
                return;
            }
            this.data.set("value", this.data.get("defaultValue") + "");
            var onChange = this.data.get("onChange");
            if (onChange) {
                onChange(parseInt(this.data.get("value")));
            }
        }
    },
    add: function (num) {
        if (num === void 0) { num = 1; }
        var srcVal = parseInt(this.data.get("value"));
        var val = (srcVal || 1) + num;
        var maxVal = this.data.get("maxValue");
        if (typeof maxVal !== "undefined" && val > maxVal) {
            val = maxVal;
        }
        if (srcVal === val) {
            return;
        }
        this.data.set("value", val + "");
        var onChange = this.data.get("onChange");
        if (onChange) {
            onChange(val);
        }
    },
    sub: function (num) {
        if (num === void 0) { num = 1; }
        var srcVal = parseInt(this.data.get("value"));
        var val = (srcVal || 1) - num;
        var minValue = this.data.get("minValue");
        if (typeof minValue !== "undefined" && val < minValue) {
            val = minValue;
        }
        if (srcVal === val) {
            return;
        }
        this.data.set("value", val + "");
        var onChange = this.data.get("onChange");
        if (onChange) {
            onChange(val);
        }
    }
});

var ToolJump = defineComponent({
    components: {
        "input-number": InputNumber
    },
    template: template$6(html$4)({ styles: styles$3 }),
    initData: function () {
        return {
            maxValue: undefined,
            value: 1
        };
    },
    computed: {
        prevDisableClass: function () {
            var val = this.data.get("value");
            if (val == 1) {
                return styles$3.disabled;
            }
        }
    },
    events: {
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

var html$2 = "<div class=\"<%= styles.toolScale %>\">\n    <c-select activeVal=\"{= activeVal =}\" options=\"{{options}}\"></c-select>\n</div>";

var html$1 = "<div class=\"<%= styles.select %> {{showOptions ? '<%= styles.active %>':''}}\" on-click=\"events.selectClick($event)\">\n    <div class=\"<%= styles.value %>\">\n        <span>{{activeText}}</span>\n    </div>\n    <span class=\"iconfont\">&#xe71d;</span>\n</div>";

var styles$1 = {"common_font":"index-module_common_font__niHsZ","text_overflow":"index-module_text_overflow__COYLB","select":"index-module_select__2NwCG","value":"index-module_value__4778I","active":"index-module_active__zruap"};

var html = "<div class=\"<%= styles.options %>\" style=\"{{optionsStyle}}\">\n    <div s-for=\"option in options\" class=\"<%= styles.option %> {{activeVal===option.val ? '<%= styles.active %>':''}}\" on-click=\"events.optionClick($event,option)\">{{option.text}}</div>\n</div>";

var styles = {"common_font":"index-module_common_font__Sz-yv","text_overflow":"index-module_text_overflow__MHvJv","options":"index-module_options__BzSRC","option":"index-module_option__7PE8z","active":"index-module_active__Xn-PG"};

var Options = defineComponent({
    template: template$6(html)({ styles: styles }),
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
                    var baseEle = dataStoreGet(this.data.get("baseEleKey"));
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
            var optionsClickFn = this.data.get("optionClick");
            if (optionsClickFn) {
                optionsClickFn(event, option.val, option);
                return;
            }
            this.data.set("activeVal", option.val);
        }
    },
    setBaseEle: function (ele) {
        var baseEleKey = this.data.get("baseEleKey");
        dataStoreSet(baseEleKey, ele || document.body);
    },
    getBaseEle: function () {
        var baseEleKey = this.data.get("baseEleKey");
        var ele = dataStoreGet(baseEleKey);
        if (!ele) {
            ele = document.body;
            this.setBaseEle(ele);
        }
        return ele;
    },
    disposed: function () {
        dataStoreRemove(this.data.get("baseEleKey"));
        eventUtil.removeHandler(document.body || document.getElementsByTagName("body")[0], "click", this.events.documentClick);
        eventUtil.removeHandler(window, "resize", this.events.documentClick);
    }
});

var Select = defineComponent({
    template: template$6(html$1)({ styles: styles$1 }),
    attached: function () {
        // const optionsInterface = (this.ref(
        //   "optionsRef"
        // ) as any) as OptionsInterface;
        // optionsInterface.setBaseEle(this.el as any);
        if (!this.OptionsComponent) {
            this.OptionsComponent = new Options({
                owner: this,
                source: "<c-options s-ref=\"optionsRef\" offset={{{y:2}}} mod=\"options\" show=\"{= showOptions =}\" activeVal=\"{= activeVal =}\" options=\"{{options}}\"></c-options>"
            });
            this.OptionsComponent.attach(document.body);
        }
        this.OptionsComponent.setBaseEle(this.el);
    },
    initData: function () {
        return {
            showOptions: false,
            activeVal: 1,
            options: []
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
            // const ele = event.target as HTMLDivElement;
            //   console.log(ele.clientTop);
            //   console.log(ele.offsetTop);
            //   console.log(ele.scrollTop);
            //   console.log(ele.style.top);
            //   console.log("=====================");
            // console.log("clientLeft=", ele.clientLeft);
            // console.log("offsetLeft=", ele.offsetLeft);
            // console.log("scrollLeft=", ele.scrollLeft);
            // console.log("clientWidth", ele.clientWidth);
            // console.log("offsetWidth", ele.offsetWidth);
            // console.log("scrollWidth", ele.scrollWidth);
            // console.log(ele.getBoundingClientRect());
            // console.log(dom.getBoundingClientRect(ele));
        }
    }
});

var ToolScale = defineComponent({
    components: {
        "c-select": Select
    },
    template: template$6(html$2)({ styles: styles$3 }),
    initData: function () {
        return {
            activeVal: 100,
            options: [
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
            ]
        };
    }
});

var fullBtnId = createId();
var headerTabsBtns = {
    open: {
        type: "default",
        nodeInfo: {
            text: "打开",
            html: "&#xe65e;",
            title: "打开文件"
        }
    },
    save: {
        type: "default",
        nodeInfo: {
            text: "保存",
            html: "&#xe65c;",
            title: "保存"
        }
    },
    saveAs: {
        type: "default",
        nodeInfo: {
            text: "另存为",
            html: "&#xe65c;",
            title: "另存为"
        }
    },
    print: {
        type: "default",
        nodeInfo: {
            text: "打印",
            html: "&#xe65d;",
            title: "打印"
        }
    },
    jump: {
        type: "default",
        nodeInfo: {
            width: 80,
            render: function (app, nodeInfo, parent) {
                return new ToolJump({
                    owner: parent,
                    source: "<tool-jump></-jump>"
                });
            }
        }
    },
    select: {
        type: "default",
        nodeInfo: {
            text: "选择",
            title: "选择",
            html: "&#xe65f;"
        }
    },
    move: {
        type: "default",
        nodeInfo: {
            text: "移动",
            title: "移动",
            html: "&#xe660;"
        }
    },
    ActualSize: {
        type: "default",
        nodeInfo: {
            text: "实际大小",
            title: "实际大小",
            html: "&#xe661;"
        }
    },
    SuitableWidth: {
        type: "default",
        nodeInfo: {
            text: "适合宽度",
            title: "适合宽度",
            html: "&#xe662;"
        }
    },
    SuitablePage: {
        type: "default",
        nodeInfo: {
            text: "适合页面",
            title: "适合页面",
            html: "&#xe663;"
        }
    },
    narrow: {
        type: "default",
        nodeInfo: {
            html: "&#xe67b;",
            title: "缩小",
            width: 24,
            className: styles$3.toolIconBtn
        }
    },
    scale: {
        type: "default",
        nodeInfo: {
            title: "缩放比率",
            width: 82,
            render: function (app, nodeInfo, parent) {
                return new ToolScale({
                    owner: parent,
                    source: "<tool-select style='width:80px;'></tool-select>"
                });
            }
        }
    },
    enlarge: {
        type: "default",
        nodeInfo: {
            html: "&#xe65a;",
            title: "放大",
            width: 24,
            className: styles$3.toolIconBtn
        }
    },
    find: {
        type: "default",
        nodeInfo: {
            html: "&#xe664;",
            title: "查找",
            text: "查找"
        }
    },
    full: {
        type: "default",
        nodeInfo: {
            html: "&#xe665;",
            title: "全屏",
            text: "全屏"
        }
    },
    preferenc: {
        type: "default",
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
                { type: "separate" },
                headerTabsBtns.jump,
                headerTabsBtns.select,
                headerTabsBtns.move,
                headerTabsBtns.ActualSize,
                headerTabsBtns.SuitableWidth,
                headerTabsBtns.SuitablePage,
                { type: "separate" },
                headerTabsBtns.scale,
                headerTabsBtns.narrow,
                headerTabsBtns.enlarge,
                { type: "separate" },
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
            iconHtml: "&#xe64f;"
        },
        comment: {
            text: "注释",
            iconHtml: "&#xe650;"
        },
        thumbnail: {
            text: "缩图",
            iconHtml: "&#xe651;"
        }
    }
};

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
        }
    }
};
var App$1 = defineComponent({
    components: {
        "ui-app": AppUi
    },
    template: "<ui-app s-show=\"show\" style=\"min-height: {{appOptions.minHeight || 800}}px;min-width: {{appOptions.minWidth || 1280}}px;\" s-bind=\"{{{...appOptions}}}\" appId=\"{{appId}}\" ></<ui-app>",
    initData: function () {
        return {
            show: true,
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
var AppImpl = /** @class */ (function () {
    function AppImpl(_initOptions) {
        var _this = this;
        this._initOptions = _initOptions;
        this._isShow = false;
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
                    appId: _this._appId
                }
            });
            _this._appComponent.eventMapping = function (id, event) {
                nodeEventCall(id, _this, event);
            };
            _this.update(defaultOptions);
            _this.update(_this._initOptions);
            _this._appComponent.attach(_this._attachEle);
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
        this._handleToobarConfigs = function (toolbarConfigs) {
            for (var i = 0; i < toolbarConfigs.length; i++) {
                var toolbar_1 = toolbarConfigs[i];
                if (toolbar_1.activeChange) {
                    var activeChangeFnId = createId();
                    dataStoreSet(activeChangeFnId, toolbar_1.activeChange);
                    toolbar_1._activeChangeFnId = activeChangeFnId;
                }
                if (!toolbar_1.tools || toolbar_1.tools.length === 0) {
                    continue;
                }
                for (var j = 0; j < toolbar_1.tools.length; j++) {
                    var toolInfo = toolbar_1.tools[j];
                    if (!toolInfo.nodeInfo) {
                        continue;
                    }
                    toolInfo.nodeInfo = handleNodeInfo(toolInfo.nodeInfo);
                }
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
            if (!_this._appComponent) {
                return;
            }
            if (options.tabPages &&
                options.tabPages.btnGroup &&
                options.tabPages.btnGroup.btns) {
                var btns = options.tabPages.btnGroup.btns;
                for (var i = 0; i < btns.length; i++) {
                    btns[i] = handleNodeInfo(btns[i]);
                }
            }
            if (options.header && options.header.toolbars) {
                _this._handleToobarConfigs(options.header.toolbars);
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
                    _this._handleToobarConfigs(options.sidebars.left.toolbars);
                }
            }
            _this._appComponent.data.merge("appOptions", JSON.parse(JSON.stringify(options)), { force: true });
        };
        /**
         * 显示到某个元素上
         * @param ele 要显示到的元素
         */
        this.show = function (ele) {
            if (ele && ele != _this._attachEle) {
                _this.destroy();
                _this._attachEle = ele;
            }
            if (!_this._attachEle) {
                console.warn("没有可以用来附加的DOM元素");
                return;
            }
            _this._isShow = true;
            if (!_this._appComponent) {
                _this._initApp();
            }
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
    }
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

var App = AppImpl;

export { App, defaultData };
