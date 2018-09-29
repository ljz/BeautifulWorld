var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ShareType = (function () {
        function ShareType() {
        }
        /**船员分享 */
        ShareType.boaterHire = "boaterHire"; //船员招募分享
        ShareType.boaterHire2 = "boaterHire2"; //船员招募分享
        ShareType.boaterRecall = "boaterRecall"; //船员召回分享
        /**海盗王分享类型*/
        ShareType.KingBarrierShare = "KingBarrierShare"; // 触礁分享
        ShareType.KingCircleShare = "KingCircleShare"; // 行走一圈分享
        /**过岛分享*/
        ShareType.Island = "island";
        /**高级每日能量求助分享*/
        ShareType.SeniorDailyEnergyShare = "seniorDailyEnergyShare";
        ShareType.InviteJBBXShare = "inviteJBBXShare";
        ShareType.InviteRewardShare = "inviteRewardShare";
        ShareType.RecallRewardShare = "recallRewardShare"; //召回奖励中的分享
        ShareType.WnspShare = "wnspShare";
        ShareType.InviteVipShare = "inviteVipShare";
        //分享的类型
        ShareType.default = "default"; //默认的分享
        ShareType.island = "island"; //过岛
        ShareType.boost = "boost"; //沙滩助威
        ShareType.boostCheer = "boostCheer"; //沙滩大螃蟹助威
        ShareType.boostInvite = "boostInvite"; //沙滩邀请水手
        ShareType.boostInviteGift = "boostInviteGift"; //沙滩助威邀请礼包
        ShareType.octopus = "octopus"; //章鱼宝箱
        ShareType.dazhangyu = "dazhangyu"; //章鱼分享
        ShareType.kiteAssist = "kiteAssist"; // 风筝助力
        ShareType.moonCake = "moonCake"; //收集活动
        ShareType.shareForGold = "shareForGold"; //多倍金币分享
        ShareType.shareForWxGold = "shareForWxGold"; //多倍金币分享-小游戏
        // static seniorShareForWxGold = "seniorShareForWxGold";//高级多倍金币分享-小游戏
        ShareType.inviteForVIP = "inviteForVIP"; //vip邀请
        ShareType.inviteForAllInOne = "inviteForAllInOne"; //万能碎片邀请
        ShareType.inviteGift = "inviteGift"; //邀请礼包分享
        ShareType.recruitment = "recruitment"; //招募令分享
        ShareType.monster = "monster"; //打怪兽分享
        ShareType.inviteMoney = "inviteMoney"; //邀请金币分享
        ShareType.annualCollect = "annualCollect"; //节日活动，例如抽签分享
        ShareType.treasure = "treasure"; //海盗宝箱分享
        ShareType.annualBalloon = "annualBalloon"; //节日气球分享
        ShareType.plane = "plane"; //飞机分享
        ShareType.recall = "recall"; //老船长召回分享
        ShareType.UserRecallShare = "UserRecallShare"; //老玩家召回分享
        ShareType.groupRank = "groupRank"; //群排行分享
        ShareType.rcGroup = "rcGroup"; //老船长群排行分享
        ShareType.wanbanInvite = "wanbanInvite"; //玩伴上线邀请
        ShareType.dayShare = "dayShare"; //每日分享
        ShareType.dayShare2 = "dayShare2"; //夏日能量
        ShareType.dayShare3 = "dayShare3"; //高级夏日能量
        ShareType.shieldShare = "shieldShare"; //护盾分享
        ShareType.flowerShare = "flower"; //鲜花活动
        ShareType.treasureMap = "treasureMap"; //宝藏地图
        ShareType.dragonBoat = "dragonBoat"; //端午活动分享助力
        ShareType.dragonBoatMoreRewards = "dragonBoatMoreRewards"; //分享得兑换额外奖励
        ShareType.redPackage = "redPackage"; //分享开红包
        ShareType.inviteReward = "inviteReward"; //邀请新人得奖励
        ShareType.carve = "carve"; //瓜分活动爱心加成
        ShareType.tree = "tree"; //森林聚餐分享
        ShareType.worldCup = "worldCup"; //世界杯竞猜分享
        ShareType.worldCup2 = "WorldCup2"; //世界杯竞猜分享
        ShareType.shareCheer = "shareCheer"; //助力礼包
        return ShareType;
    }());
    game.ShareType = ShareType;
    __reflect(ShareType.prototype, "game.ShareType");
})(game || (game = {}));
//# sourceMappingURL=ShareType.js.map