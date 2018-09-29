
declare class Sdk {
    init();
    showQRCode(type?: any);
    showImg(data: any);
    config(data: any);
    pay(data: any);
    getShareUrl();
    isSafe();
    auth();//授权
    refresh(url?: any);//刷新地址
    bindShake(cb: Function);//开始摇一摇监听
    offShake();//关闭摇一摇监听
    realnameAuthentication(cb: Function);//实名认证
}
declare var SDK: Sdk;
declare function createCanvas(url);

declare function initGeeestObject(data, cb, cbThis, cbReady, cbError);
declare function showGeeestObject();
declare function handlerPopupMobile(captchaObj);