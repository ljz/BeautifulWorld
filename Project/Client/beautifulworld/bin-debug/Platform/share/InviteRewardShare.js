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
    //----------------邀请奖励分享------------------
    var InviteRewardShare = (function (_super) {
        __extends(InviteRewardShare, _super);
        function InviteRewardShare() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InviteRewardShare.prototype.onShareSuc = function () {
            console.log("邀请奖励分享>>>>分享成功回调");
            _super.prototype.onShareSuc.call(this);
            TsEngine.TipManager.bubble("分享成功");
            //MainUIView.getInstance().closeView(ui.BoaterShareTipMediator.NAME);
        };
        InviteRewardShare.prototype.onShareEnter = function (params) {
            console.log("邀请奖励分享>>>>从链接进入");
        };
        return InviteRewardShare;
    }(game.GameShare));
    game.InviteRewardShare = InviteRewardShare;
    __reflect(InviteRewardShare.prototype, "game.InviteRewardShare");
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
//# sourceMappingURL=InviteRewardShare.js.map