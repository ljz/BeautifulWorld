var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//----------------船员招募分享------------------
var BoaterHireShare = (function (_super) {
    __extends(BoaterHireShare, _super);
    function BoaterHireShare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoaterHireShare.prototype.onShareSuc = function () {
        _super.prototype.onShareSuc.call(this);
        //    new TextPop("船员招募分享成功");
        //    MainUIView.getInstance().closeView(ui.BoaterShareTipMediator.NAME);
    };
    BoaterHireShare.prototype.onShareEnter = function (params) {
        //BoaterManager.AcceptBoater(this.shareOwnerId);
    };
    return BoaterHireShare;
}(BaseShare));
__reflect(BoaterHireShare.prototype, "BoaterHireShare");
//----------------船员召回分享------------------
var BoaterRecallShare = (function (_super) {
    __extends(BoaterRecallShare, _super);
    function BoaterRecallShare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoaterRecallShare.prototype.onShareSuc = function () {
        // super.onShareSuc();
        // new TextPop("船员召回分享成功");
    };
    BoaterRecallShare.prototype.onShareEnter = function (params) {
    };
    return BoaterRecallShare;
}(BaseShare));
__reflect(BoaterRecallShare.prototype, "BoaterRecallShare");
//----------------船员招募分享------------------
var BoaterHireShare2 = (function (_super) {
    __extends(BoaterHireShare2, _super);
    function BoaterHireShare2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoaterHireShare2.prototype.onShareSuc = function () {
        // super.onShareSuc();
        //new TextPop("船员招募分享成功");
    };
    BoaterHireShare2.prototype.onShareEnter = function (params) {
        //BoaterManager.AcceptBoater(this.shareOwnerId);
    };
    return BoaterHireShare2;
}(BaseShare));
__reflect(BoaterHireShare2.prototype, "BoaterHireShare2");
