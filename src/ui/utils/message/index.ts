import { AppInterface } from '../../../types';
import styles from './index.module.less'


function htmlTemplate(htmlStr: string): HTMLElement {
    const template = document.createElement("template")
    template.innerHTML = htmlStr;
    return template.content.children[0] as any;
}

function newGuid() {
    var curguid = "";
    for (var i = 1; i <= 32; i++) {
        var id = Math.floor(Math.random() * 16.0).toString(16);
        curguid += id;
        if (i === 8 || i === 12 || i === 16 || i === 20) curguid += "";
    }
    return `a${curguid}`;
};

function successIcon() {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE2SURBVHgBzZG/SsNgFMXPjRVqQQiIg5PxDboIURATFNTRydEgCG7pILjo5AvUQRH/gPUFOvgnYz8ENZt5gUIWFQTBqUYUr0lMTWLSrHqmm5tzfuf7EuCvRb8XWrMme+VODcTTwWNkcpiobs8dNAoBqrWmgD5bACvI73PBkm4v7LvdjZR+XxQOxGGB1jTkDEC1Vo3icAzxKiUzAyAJZq/IyMAQTie2Eozvb5MCMKPaK7w7vo6j9lliS1lAUkHb0ugMBkuVMHxxf42rJyfPmgKI7rDh7PmAWTQmN8Pwcfs8FWLiH1opPhUJ/x5aMD6+PmP5dhtTw1VcPtxkWglcj+dIWsuQvbf+O39UUCzXnj8cy1xB6Ccv4Hc9MBSFI0/iNDlSrRWDpD4z/jMsfKcodz52xKJf9K/0BXb1ZOFZYiDgAAAAAElFTkSuQmCC";
}

function warnIcon() {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAENSURBVHgBxZI9isJQFIXvfQkO0wyBYWCqIQNTD+5AXYJa2GqjZVyEC9AViK0gLkEba11CCgtBhGih8GJyvf6EhLzHK/VAmvPO+W7eD8CrhXmDpo4jY7srEEpEUL6bsAKB/UJtOzICTtNv16JoBkQuaESIfoxW5b268RNPZAOm8m0arwnO0NBxFICcfDXzZfHX4a+tQM4ftqcAEMnLT6RwD9qtJGeTBbBZ1IbDg2piCrDBpGtZBsaIyFDnyup2AXBcq63rteYBqAGI/x7gTwM0hH46N7H4AYWxtWTLBYMIyH+r737VP6gGQSSjCkd8Uzm+ZVKhLijHn01+uh6vFh/NOfEWC4fzAFuB+VSfrgvnD2Y2iCUvwQAAAABJRU5ErkJggg==";
}

function errorIcon() {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAErSURBVHgBzVI7TsNAEJ1ZUoEA8y0jpweJG5BcAzDyDUILffr4BmBEj7gA3IAUHMCiDIJYEBpwdpix8Xpho23hrVay3r735q3WAH8N/E1M4iAotDoBxH0g6lYqGiGp4Wb6fOENYHM40+qWAEKYPy1bULq3dp5nNadsgc8skDPRSEsnYBxtxLV59fQGWu0dY2y1d0uuDik09J0ARDLk+9UZLPcvyxAxr/C3cE0V7FrXqvB0vE52XTFLCPJ6TY6geHywj2ErfcEfDVxguQgIfFBWrbtmelVbJr8lkbmOkQKNnACFZAKWDgemtmwJWTwYWFNp2PT8hjzNp8Z7rh2CBzw9204nHacB/xz57IN6IvCZRWNzOE84joIYEflZca9y8vV4T6eQdK7zHP4VvgA2L3yQzd3WcgAAAABJRU5ErkJggg==";
}

function getIcon(type: 'success' | 'warn' | 'error') {
    switch (type) {
        case 'success':
            return successIcon();
        case 'warn':
            return warnIcon();
        case 'error':
            return errorIcon();
    }
}

function getClassName(type: 'success' | 'warn' | 'error') {
    switch (type) {
        case 'success':
            return styles.success;
        case 'warn':
            return styles.warn;
        case 'error':
            return styles.error;
    }
}

export interface MessageOption {
    /**
     * 额外按钮
     */
    exBtn?: MessageExBtn[];
    /**
     * 提示主体 字符串 如果想传入html，也是字符串
     */
    content?: string;
    /**
     * 毫秒，关闭时间，默认为 5000，传入小于等于0的值，不自动关闭
     */
    timeout?: number;
    /**
     * 是否展示提示图标，默认为true
     */
    showIcon?: boolean;
}

export interface MessageExBtn {
    /**
     * 按钮名
     */
    title: string;
    /**
     * 点击事件
     */
    callback?: (event: any) => void;
    /**
     * 样式名
     */
    className?: string;
}

export interface MessageInterface {
    success(title: string, opt?: MessageOption): void;
    warn(title: string, opt?: MessageOption): void;
    error(title: string, opt?: MessageOption): void;
    // show(type: 'success' | 'warn' | 'error', opt: MessageOption): void;
}

export class MessageImpl implements MessageInterface {
    public constructor(private _app: AppInterface) {
        this.msgRoot = document.createElement('div');
        this.msgRoot.className = styles.messageContainer;
        _app.getRootEle().appendChild(this.msgRoot);
    }
    msgRoot: HTMLElement;
    show(title: string, type: 'success' | 'warn' | 'error', opt?: MessageOption) {
        var elementGuid = newGuid();
        var exBtns = (opt?.exBtn || []).map((m) => { return { ...m, guid: newGuid() } });
        var showIconFlag = opt?.showIcon ?? true;
        var element = htmlTemplate(
            `<div id=${elementGuid} class="${styles.messageBoxBackground}" >
                <div class="${styles.messageBox} ${getClassName(type)}" >
                    <div class="${styles.title}" >
                        <div class="${styles.titleLeft}" style="${(opt?.timeout && opt?.timeout <= 0) ? "width:313px" : ""}" >
                            ${showIconFlag ? `<span class="${styles.titleIcon}" ><img src="${getIcon(type)}" /></span>` : ''}
                            <span class="${styles.titleTip}" >${title}</span>
                        </div>
                        <div class="${styles.titleRight}" >
                            ${(exBtns && exBtns.length > 0) ? `<span class="${styles.exBtn}" >
                                ${exBtns.map(m => `<span id="${m.guid}" class="${m.className ? m.className : ''}" >${m.title}</span>`).join("")}
                            </span>` : ``}
                            ${(opt?.timeout && opt?.timeout <= 0) ? `<span class="${styles.closeIcon}" onclick="document.getElementById('${elementGuid}').remove()" >×</span>` : ''}
                        </div>
                    </div>
                    <div style="clear:both;" ></div>
                    ${opt?.content ? `<div class='${styles.content}' > ${opt.content} </div>` : ''}
                </div>
            </div>
            `
        );
        if (exBtns && exBtns.length > 0) {
            exBtns.forEach((btn) => {
                if (!btn.callback) {
                    return;
                }
                var ele: any = element.querySelector(`#${btn.guid}`);
                ele.onclick = btn.callback;
            })
        }
        var hideTimeFlag = opt?.timeout ?? 5000;
        if (hideTimeFlag > 0) {
            setTimeout(() => {
                document.getElementById(elementGuid).remove()
            }, hideTimeFlag);
        }
        this.msgRoot.appendChild(element);
    }
    success(title: string, opt?: MessageOption) {
        this.show(title, 'success', opt);
    }
    warn(title: string, opt?: MessageOption) {
        this.show(title, 'warn', opt);
    }
    error(title: string, opt?: MessageOption) {
        this.show(title, 'error', opt);
    }
}