import styles from './index.module.less'

export interface IGetKeywordRsp {
    opt: 'confirm' | 'cancel',
    keyword?: string,
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

function GetKeyword(root?: HTMLElement): Promise<IGetKeywordRsp> {
    return new Promise((resolve) => {
        const elementGuid = newGuid();
        const closeBtnId = newGuid();
        const confirmBtnId = newGuid();
        const inputId = newGuid();
        var element = `
            <div id="${elementGuid}" class="${styles.maskContainer}" >
                <div class="${styles.modalContainer}" >
                    <div class="${styles.modalTitle}" >
                        <div style="float:left;" >查找</div>
                        <div style="float:right;cursor:pointer;" id="${closeBtnId}" >×</div>
                    </div>
                    <div class="${styles.modalBody}" >
                        <div class="${styles.inputBox}" >
                            <div style="width:61px;" >关键字:</div>
                            <div style="width:100%" ><Input id="${inputId}" /></div>
                        </div>
                        <div class="${styles.btnBox}" >
                            <button id="${confirmBtnId}" class="${styles.btnDisable}" >确认</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        var div = document.createElement('div');
        div.innerHTML = element;
        var closeBtn = div.querySelector(`#${closeBtnId}`) as HTMLElement;
        closeBtn.onclick = () => {
            document.getElementById(elementGuid).remove();
            resolve({ opt: 'cancel' });
        }
        var input = div.querySelector(`#${inputId}`) as HTMLInputElement;
        var btn = div.querySelector(`#${confirmBtnId}`) as HTMLElement;
        input.onkeydown = (ev) => {
            if (input.value === undefined || input.value === null || input.value === '') {
                btn.className = styles.btnDisable;
            } else {
                btn.className = styles.btnActive;
            }
        }
        btn.onclick = () => {
            if (input.value === undefined || input.value === null || input.value === '') {
                return;
            }
            resolve({ opt: 'confirm', keyword: input.value })
        }
        (root || document.body).appendChild(div);
    });
}

export default GetKeyword;