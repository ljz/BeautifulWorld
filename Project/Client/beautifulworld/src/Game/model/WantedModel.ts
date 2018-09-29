/**
* Created by liaojiangzheng
* Copyright (c) 2018 HortorGames. All rights reserved.
*/

//排行榜model
namespace game {
    export class WantedModel {
        public enemyRankData = [];
        //刷新局部数据
        public update(data: any) {

        }


        public setEnemyRankData(data) {
            this.enemyRankData = data;
        }


        public getEnemyRankData() {
            return this.enemyRankData;
        }

        //恶人榜的数据
        public getHateData() {
            let _arr = [];
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
                    inviteCode: "",//仇人榜目前没有这个参数
                    chatSign: this.enemyRankData[i].chatSign,
                    isVip: this.enemyRankData[i].isVip,
                    gender: this.enemyRankData[i].gender,
                }

                _arr.push(temp);
            }
            return _arr;
        }


    }
}
let wantedModel = new game.WantedModel();
