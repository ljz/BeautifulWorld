var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseShare = (function () {
    function BaseShare() {
    }
    //微信分享
    BaseShare.prototype.wxShare = function (title, img, query) {
        // platform.share.shareAppMessage(
        //     title, img, query,
        //     this.onShareSuc.bind(this),
        //     this.onShareFail.bind(this),
        //     this.onShareFinish.bind(this)
        // );
        // PostRequest.openEvent(this.type + "_share");
    };
    //H5分享
    BaseShare.prototype.h5Share = function (title, img, desc, shareId, _shareCustomParam) {
        // HORTOR_AGENT.config({
        // 			share: {
        // 				timeline: {
        // 					title: title,
        // 					imgUrl: img,
        // 					success: this.onShareSuc
        // 				},
        // 				friend: {
        // 					title: title,
        // 					imgUrl: img,
        // 					desc: desc,
        // 					shareConfigId: shareId,
        // 					success: this.onShareSuc
        // 				},
        // 				shareCustomParam: _shareCustomParam
        // 			}
        // 		});
    };
    //分享成功
    BaseShare.prototype.onShareSuc = function () {
        // InitMark.wxSharing = true;
        // console.error("未实现onShareSuc");
    };
    BaseShare.prototype.onShareFail = function () {
        console.log("\u5206\u4EAB\u5931\u8D25");
    };
    BaseShare.prototype.onShareFinish = function () {
        console.log("\u5206\u4EAB\u7ED3\u675F");
    };
    //点击分享进入
    BaseShare.prototype.onShareEnter = function (params) {
        console.error("未实现onShareEnter");
    };
    return BaseShare;
}());
__reflect(BaseShare.prototype, "BaseShare");
