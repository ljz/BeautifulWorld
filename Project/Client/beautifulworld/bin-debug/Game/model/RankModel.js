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
    var RankModel = (function () {
        function RankModel() {
            this.worldRankData = [];
            this.friendsRankData = [];
            this.rankUpList = [];
        }
        //刷新局部数据
        RankModel.prototype.update = function (data) {
        };
        RankModel.prototype.setWorldRankData = function (data) {
            this.worldRankData = data;
        };
        RankModel.prototype.setFriendsRankData = function (data) {
            this.friendsRankData = data;
        };
        RankModel.prototype.getFriendsRankData = function () {
            return this.friendsRankData;
        };
        //世界排行榜
        RankModel.prototype.getHandlerWorldRankData = function () {
            var data = [];
            var selfRank = 0;
            for (var i = 0; i < this.worldRankData.length; i++) {
                if (this.worldRankData[i].uid == playerModel.uid) {
                    selfRank = this.worldRankData[i].rank;
                    break;
                }
            }
            util.jzlog(">>>>>>>selfRank = ", selfRank);
            for (var i = 0; i < this.worldRankData.length; i++) {
                var temp = {
                    uid: this.worldRankData[i].uid,
                    rank: this.worldRankData[i].rank,
                    crowns: this.worldRankData[i].crowns,
                    name: this.worldRankData[i].name,
                    headImg: this.worldRankData[i].headImg,
                    updateTime: this.worldRankData[i].updateTime,
                    isVip: this.worldRankData[i].isVip,
                    gender: this.worldRankData[i].gender,
                    checksum: this.worldRankData[i].checksum,
                    self: this.worldRankData[i].uid == playerModel.uid
                };
                data.push(temp);
                if (i == 29 && this.worldRankData[30] && selfRank > 30) {
                    var demo = {
                        uid: this.worldRankData[i].uid,
                        rank: -1,
                        crowns: this.worldRankData[i].crowns,
                        name: this.worldRankData[i].name,
                        headImg: this.worldRankData[i].headImg,
                        self: this.worldRankData[i].uid == playerModel.uid
                    };
                    util.jzlog("demo =====", demo);
                    data.push(demo);
                }
            }
            return data;
        };
        RankModel.prototype.getHandlerFriendsRankData = function () {
            var data = [];
            for (var i = 0; i < this.friendsRankData.length; i++) {
                var temp = {
                    uid: this.friendsRankData[i].uid,
                    rank: i + 1,
                    crowns: this.friendsRankData[i].crowns,
                    name: this.friendsRankData[i].name,
                    headImg: this.friendsRankData[i].headImg,
                    updateTime: this.friendsRankData[i].updateTime,
                    isFriend: true,
                    isVip: this.friendsRankData[i].isVip,
                    gender: this.friendsRankData[i].gender,
                    checksum: this.friendsRankData[i].checksum,
                    self: this.friendsRankData[i].uid == playerModel.uid
                };
                data.push(temp);
            }
            return data;
        };
        return RankModel;
    }());
    game.RankModel = RankModel;
    __reflect(RankModel.prototype, "game.RankModel");
})(game || (game = {}));
var rankModel;
//# sourceMappingURL=RankModel.js.map