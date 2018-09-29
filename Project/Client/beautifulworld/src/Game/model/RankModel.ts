/**
* Created by liaojiangzheng
* Copyright (c) 2018 HortorGames. All rights reserved.
*/

//排行榜model
namespace game {
    export class RankModel {
        public worldRankData = [];
        public friendsRankData = [];
        public rankUpList = [];
        public selectedRankPlayer:any;////点击排行玩家
        //刷新局部数据
        public update(data: any) {

        }

        public setWorldRankData(data) {
            this.worldRankData = data;
        }

        public setFriendsRankData(data) {
            this.friendsRankData = data;
        }

        public getFriendsRankData() {
            return this.friendsRankData;
        }

        //世界排行榜
        public getHandlerWorldRankData(): any {
            var data = [];
            let selfRank = 0;
            for (var i = 0; i < this.worldRankData.length; i++) {
                if (this.worldRankData[i].uid == playerModel.uid) {
                    selfRank = this.worldRankData[i].rank;
                    break;
                }
            }
            util.jzlog(">>>>>>>selfRank = ", selfRank)
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
                    }
                    util.jzlog("demo =====", demo)
                    data.push(demo);
                }
            }
            return data;
        }

        public getHandlerFriendsRankData(): any {
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
                }
                data.push(temp);
            }
            return data;
        }


    }
}
let rankModel: game.RankModel;
