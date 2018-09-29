var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var AdType = (function () {
        function AdType() {
        }
        //小游戏广告
        AdType.adUnitId_master = "adunit-3b9a65e75d476bae"; //打怪兽视频广告id
        AdType.adUnitId_octops = "adunit-2d6101f34301bc97"; //大章鱼视频广告id
        AdType.adUnitId_balloon = "adunit-351336eef5fb7de1"; //气球视频广告id
        AdType.adUnitId_dailyEnergy = "adunit-add27e8a3f020916"; //每日能量 视频广告id
        AdType.adUnitId_noEnergy = "adunit-7f5c2722231c98df"; //能量不足 视频广告id
        AdType.adUnitId_money = "adunit-02ada88c1ed3f0ce"; //多倍金币 视频广告id
        AdType.adUnitId_plane = "adunit-f31a2c7b2a007587"; //飞机 视频广告id
        AdType.adUnitId_dailyRedbag = "adunit-6c3f29e7925dda26"; //每日红包 视频广告id
        AdType.adUnitId_octopus = "adunit-fd62dc0c1689c367"; //打章鱼 视频广告id
        return AdType;
    }());
    game.AdType = AdType;
    __reflect(AdType.prototype, "game.AdType");
})(game || (game = {}));
//# sourceMappingURL=AdType.js.map