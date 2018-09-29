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
/**
* Created by liaojiangzheng
* Copyright (c) 2018 HortorGames. All rights reserved.
*/
var game;
(function (game) {
    //----------------万能碎片分享------------------
    var WnspShare = (function (_super) {
        __extends(WnspShare, _super);
        function WnspShare() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WnspShare.prototype.onShareSuc = function () {
            util.jzlog("万能碎片分享>>>>分享成功回调");
            _super.prototype.onShareSuc.call(this);
            TsEngine.TipManager.bubble("分享成功");
            //MainUIView.getInstance().closeView(ui.BoaterShareTipMediator.NAME);
        };
        WnspShare.prototype.onShareEnter = function (params) {
            util.jzlog("万能碎片分享>>>>从链接进入");
        };
        return WnspShare;
    }(game.GameShare));
    game.WnspShare = WnspShare;
    __reflect(WnspShare.prototype, "game.WnspShare");
    // //----------------船员召回分享------------------
    // export class SignShare extends GameShare {
    //     public onShareSuc(): void {
    //         super.onShareSuc();
    //         //new TextPop("船员召回分享成功");
    //     }
    //     public onShareEnter(params: any): void {
    //     }
    // }
    // //----------------船员招募分享------------------
    // export class BoaterHireShare2 extends GameShare {
    //     public onShareSuc(): void {
    //         super.onShareSuc();
    //         //new TextPop("船员招募分享成功");
    //     }
    //     public onShareEnter(params: any): void {
    //         //BoaterManager.AcceptBoater(this.shareOwnerId);
    //     }
    // }
})(game || (game = {}));
//# sourceMappingURL=WnspShare.js.map