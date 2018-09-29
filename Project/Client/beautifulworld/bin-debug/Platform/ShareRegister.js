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
var game;
(function (game) {
    //注册分享类
    var ShareRegister = (function (_super) {
        __extends(ShareRegister, _super);
        function ShareRegister() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShareRegister.prototype.registShare = function (shareType, shareClass) {
            game.PlatformManager.registShare(shareType, shareClass);
        };
        ShareRegister.prototype.initialize = function () {
            // this.registShare(ShareType.boaterHire, BoaterHireShare);//船员招募分享
            // this.registShare(ShareType.boaterRecall, BoaterRecallShare);//船员召回分享
            // this.registShare(ShareType.boaterHire2, BoaterHireShare2);//船员招募分享
            // // 注册海盗王分享
            // this.registShare(ShareType.KingBarrierShare, KingBarrierShare);//海盗王障碍物分享
            // this.registShare(ShareType.KingCircleShare, KingCircleShare);//海盗王达成一圈分享
            // this.registShare(ShareType.Island, IslandShare);//过岛分享
            // this.registShare(ShareType.SeniorDailyEnergyShare, SeniorDailyEnergyShare);
            // this.registShare(ShareType.InviteJBBXShare, InviteJBBXShare);
            // this.registShare(ShareType.InviteRewardShare, InviteRewardShare);
            // this.registShare(ShareType.WnspShare, WnspShare);
            // this.registShare(ShareType.InviteVipShare, InviteVipShare);
            // this.registShare(ShareType.monster, MonsterShare);//打怪兽
            // this.registShare(ShareType.RecallRewardShare, RecallRewardShare);//召回
            // this.registShare(ShareType.UserRecallShare, UserRecallShare);//召回
            // this.registShare(ShareType.wanbanInvite, game.WxFriendShare);//玩吧分享
            // this.registShare(ShareType.groupRank, game.WxFriendShare);//玩吧分享
            // this.registShare(ShareType.shareForGold, MultipleGoldShare);// 多倍分享
            // this.registShare(ShareType.tree, TreeShare);//海盗商人分享
        };
        return ShareRegister;
    }(TsEngine.Register));
    game.ShareRegister = ShareRegister;
    __reflect(ShareRegister.prototype, "game.ShareRegister");
})(game || (game = {}));
var shareRegister;
//# sourceMappingURL=ShareRegister.js.map