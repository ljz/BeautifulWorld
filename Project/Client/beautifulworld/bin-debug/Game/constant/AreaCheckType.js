var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var AreaCheckType = (function () {
        function AreaCheckType() {
        }
        AreaCheckType.Check_Focus = "client_focus"; //诱导关注id
        AreaCheckType.Check_Share = "client_share"; //诱导分享
        AreaCheckType.Check_Pay = "client_pay"; //诱导充值
        AreaCheckType.Check_FreeEnergyDiffGroup = "client_freeEnergyDiffGroup"; //免费能量分享不同群
        AreaCheckType.Check_ShareBtn = "client_shareBtn"; //邀请奖励按钮
        return AreaCheckType;
    }());
    game.AreaCheckType = AreaCheckType;
    __reflect(AreaCheckType.prototype, "game.AreaCheckType");
})(game || (game = {}));
//# sourceMappingURL=AreaCheckType.js.map