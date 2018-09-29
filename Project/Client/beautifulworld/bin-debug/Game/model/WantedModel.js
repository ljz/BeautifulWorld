/**
* Created by liaojiangzheng
* Copyright (c) 2018 HortorGames. All rights reserved.
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//排行榜model
var game;
(function (game) {
    var WantedModel = (function () {
        function WantedModel() {
            this.enemyRankData = [];
        }
        //刷新局部数据
        WantedModel.prototype.update = function (data) {
        };
        WantedModel.prototype.setEnemyRankData = function (data) {
            this.enemyRankData = data;
        };
        WantedModel.prototype.getEnemyRankData = function () {
            return this.enemyRankData;
        };
        //恶人榜的数据
        WantedModel.prototype.getHateData = function () {
            var _arr = [];
            for (var i = 0; i < this.enemyRankData.length; i++) {
                var temp = {
                    uid: this.enemyRankData[i].uid,
                    crowns: this.enemyRankData[i].crowns,
                    name: this.enemyRankData[i].name,
                    headImg: this.enemyRankData[i].headImg,
                    attackCount: this.enemyRankData[i].attackCount,
                    stealMoney: this.enemyRankData[i].stealMoney,
                    signature: this.enemyRankData[i].signature,
                    isWanted: this.enemyRankData[i].isWanted,
                    inviteCode: "",
                    chatSign: this.enemyRankData[i].chatSign,
                    isVip: this.enemyRankData[i].isVip,
                    gender: this.enemyRankData[i].gender,
                };
                _arr.push(temp);
            }
            return _arr;
        };
        return WantedModel;
    }());
    game.WantedModel = WantedModel;
    __reflect(WantedModel.prototype, "game.WantedModel");
})(game || (game = {}));
var wantedModel = new game.WantedModel();
//# sourceMappingURL=WantedModel.js.map