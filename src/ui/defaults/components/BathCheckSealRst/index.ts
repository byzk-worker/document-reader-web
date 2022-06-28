import styles from './index.module.less'

export interface IBathCheckSealRst {
    page: number,
    success: boolean,
    sealName: string,
    desc?: string
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


function renderPage(success: boolean, rsp: IBathCheckSealRst[], hideList?: boolean, root?: HTMLElement) {
    const elementGuid = newGuid();
    var element = `
        <div id="${elementGuid}" class="${styles.maskContainer}" >
            <div class="${styles.modalContainer}" >
                <div class="${styles.modalTitle}" >
                    <div style="float:left" >批量验章</div>
                    <div style="float:right" class="${styles.modalCloseBtn}" onclick="document.getElementById('${elementGuid}').remove()" >x</div>
                </div>
                <div class="${styles.modalContent}" >
                    <div class="${styles.modalTipIconBox}" >
                        <div class="${styles.modalIcon}" ></div>
                    </div>
                    <div class="${styles.modalTipTitleBox}" >
                        很遗憾，文档验证失败！
                    </div>
                    <div class="${styles.modalTitleSplit}" ></div>
                    <div class="${styles.modalTipTxtBox}" >
                        文档内所有印章已经验证，文档内容已被篡改，文档中共计含有${rsp.length}个印章，有${rsp.filter(m => !m.success).length}个印章验证失败。
                    </div>
                    ${!hideList ? `
                    <div class="${styles.rstListBox}" >
                        <div class="${styles.rstListTitleBox}" >
                            <div style="width:30px" ></div>
                            <div style="width:80px" >页码</div>
                            <div style="width:140px" >印章名称</div>
                            <div>说明</div>
                        </div>
                        <div class="${styles.rstListBody}" >
                            ${rsp.map((m) => `
                                <div class="${styles.rstListRow}" >
                                    <div style="width:30px" ></div>
                                    <div style="width:80px" >${m.page}</div>
                                    <div style="width:140px;color:#2752E7;" title="${m.sealName}" ><div style="width:130px;" class="${styles.txtAutoHide}" >${m.sealName}</div></div>
                                    <div style="width:143px;" class="${styles.txtAutoHide}" title="${m.desc}" >${m.desc}</div>
                                </div>
                            `).join("\r\n")}
                        </div>
                    </div>
                    ` : ""}
                </div>
            </div>
        </div>
    `;
    var div = document.createElement('div');
    div.innerHTML = element;
    (root || document.body).appendChild(div);
}


function success(rsp: IBathCheckSealRst[], hideList?: boolean, root?: HTMLElement) {
    renderPage(true, rsp, hideList, root);
}

function error(rsp: IBathCheckSealRst[], hideList?: boolean, root?: HTMLElement) {
    renderPage(false, rsp, hideList, root);
}

const BathCheckSealRst = {
    success,
    error
}

export default BathCheckSealRst;