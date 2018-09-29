var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ActivityType = (function () {
        function ActivityType() {
        }
        ActivityType.Jigsaw = 'jigsaw'; //拼图
        ActivityType.KillTitan = 'killTitan'; //打怪兽
        ActivityType.occasionalGift = 'occasionalGift'; //节日活动
        ActivityType.DoubleMoney = 'doubleMoney';
        ActivityType.Octopus = 'octopus'; //大章鱼
        ActivityType.share = 'share';
        ActivityType.inviteFriend = 'inviteFriend';
        ActivityType.beach = 'beach'; //沙滩
        ActivityType.inviteGift = "inviteGift"; //礼包含有邀请
        ActivityType.recruit = "recruit";
        ActivityType.dailyGift = "dailyGift"; //每日礼包固定奖励
        ActivityType.tree = "tree"; //圣诞树
        ActivityType.newYear = "newYear";
        ActivityType.kite = "kite"; //风筝
        ActivityType.recall = "recall"; // 老船长召回
        ActivityType.plane = "plane"; //飞机
        ActivityType.showBrain = "brain";
        ActivityType.treasureMap = "treasureMap";
        ActivityType.dragonBoat = 'dragonBoat'; //端午节
        ActivityType.inviteReward = "inviteReward"; //邀请新人得奖励
        ActivityType.boater = "crew"; //船员活动
        ActivityType.monday = "monday"; //能量瓜分
        ActivityType.worldCup = "worldCup"; //世界杯竞猜
        ActivityType.helpGift = "helpGift"; //助力礼包
        ActivityType.pirateGift = "pirateGift"; //海盗礼包
        ActivityType.kiteGift = "kiteGift"; //风筝礼包
        ActivityType.measureGift = "measureGift"; //宝藏礼包
        ActivityType.partyGift = "partyGift"; //森林礼包
        ActivityType.pirateKing = "luffy"; //海盗之王活动
        return ActivityType;
    }());
    game.ActivityType = ActivityType;
    __reflect(ActivityType.prototype, "game.ActivityType");
})(game || (game = {}));
//# sourceMappingURL=ActivityType.js.map