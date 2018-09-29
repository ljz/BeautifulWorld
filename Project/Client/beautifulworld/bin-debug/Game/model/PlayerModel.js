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
//玩家数据
var game;
(function (game) {
    var PlayerModel = (function (_super) {
        __extends(PlayerModel, _super);
        function PlayerModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**设置里开关*/
            _this.broadcastOff = false;
            _this.worldChatOff = false;
            _this.recommendOff = false;
            _this.musicOff = false;
            //新手步骤
            _this.tutorial = 0;
            /**是否菜单进入*/
            _this.fromMenu = false;
            /**用户基础属性 */
            _this.name = ""; //名字
            _this.userId = ""; //id名字
            _this.gender = 0; //0无性别，1男  2女
            _this.headImg = ""; //头像
            _this.uid = 0; //uid
            _this.money = 0; //金币数
            _this.maxEnergy = 0; //能量上限
            _this.energy = 0; //能量
            _this.recoverEnergy = 0; //恢复能量
            _this.timeToRecover = 0; //恢复能量时间
            _this.island = 0; //岛屿id
            _this.crowns = 0; //星数
            _this.shields = 0; //护盾
            _this.maxBet = 0; //最大能量倍数
            _this.rollBet = 0; //当前能量倍数
            _this.shareCode = ""; //sharecode
            _this.friendCode = ""; //谁邀请的我
            _this.isAuthed = false; //认证（平台）
            _this.platform = 0; //平台类型
            _this.platformId = ""; //平台id
            _this.signature = "";
            _this.lastRollerType = 0;
            _this.shareCount = 0; //分享次数
            _this.shareTime = 0;
            _this.dailyPrizeDay = 0; //第几天登陆（七日登陆）
            _this.dailyPrizeTime = 0; //七日登陆剩余时间
            _this.wantedCount = 0;
            _this.ShipwreckCount = 0;
            _this.cookieCount = 0;
            _this.potionCount = 0;
            _this.hatchCount = 0;
            _this.hornCount = 0;
            _this.miniShieldCount = 0;
            _this.monthCardExpired = 0;
            _this.gotNewbieGift = false;
            _this.gotOccasionalGift = false;
            _this.gotDailyShop = false;
            _this.allInOnePiece = 0;
            _this.invitedToKillTitan = false;
            _this.invitedActivityId = 0;
            _this.enteredKillTitan = false;
            _this.killTitanCannonBall = 0;
            _this.summonStone = 0;
            _this.puffer = 0;
            _this.lolly = 0;
            _this.guild = null;
            _this.guildMedal = 0;
            _this.doubleMoneyCard = 0;
            _this.shieldEnergy = 0;
            _this.shieldEnergyOpenAt = 0;
            _this.province = 0;
            _this.city = 0;
            _this.constellation = 0;
            _this.betCount = 0;
            _this.islandCount = 0;
            _this.isTutorialMiner = false;
            _this.gainIslandReward = false;
            _this.canIslandShare = false;
            _this.isBindingWxGame = false;
            _this.petName = "";
            _this.petSleepRemain = 0;
            _this.petExpRemain = 0;
            _this.menuGiftRewardCount = 0;
            _this.loginRewardRemain = 0;
            _this.gotSubscribedReward = false;
            _this.gotNewSubscribedReward = false;
            _this.gotMonthCardReward = false;
            _this.forbiddenPush = false;
            _this.nightAllowPush = false;
            _this.wechat = "";
            _this.showWechat = false;
            _this.isExistConnonContestAward = false;
            _this.hasAchievement = false;
            _this.hasRecruit = false;
            _this.hasMystical = false;
            _this.subscribedActive = false;
            _this.balloonActive = false;
            _this.showBoxType = 0;
            _this.highestCrowns = 0;
            _this.rollTotalCount = 0;
            _this.lastPostFriendSign = 0;
            _this.worldChatRemain = 0;
            _this.idVerifyTime = 0;
            _this.pined = false;
            _this.leaveDays = 0;
            _this.inviteCode = "";
            _this.inviteFriendCount = 0;
            _this.inviteFriendRewardCount = 0;
            _this.inviteFirendToday = false;
            _this.inviteFriendVIPCount = 0;
            _this.inviteFriendVIPRemain = null;
            _this.inviteMoneyCount = 0;
            _this.recallRewards = null;
            _this.speedGiftRemain = null;
            _this.friendsEnergyCounts = 0; //好友赠送体力的数量
            _this.guide = [];
            _this.couple = {}; //cp
            _this.dailyEventInfo = null;
            _this.gainRecallReward = null; // 召回奖励
            _this.gainReturnReward = null; // 回归奖励
            _this.isShowSubscribe = false; //公众号礼包开关
            _this.isPrivilege = false; //是否公众号特权
            _this.privilegeOverplus = 0; //公众号特权剩余秒数
            _this.isSubscribed = false; //是否关注H5公众号
            _this.isSubscribedWxGame = false; //是否关注小游戏公众号
            _this.selectedActivityType = ""; //当前活动类型
            // public sendJigsawId: number = 1;//赠送的拼图碎片id
            // public sendOctopusId: number = 0;//赠送章鱼道具
            _this.requestsLength = 0; //申请加好友请求数量
            _this.beRecalledCount = 0; //被召回次数
            return _this;
        }
        //刷新局部数据
        PlayerModel.prototype.update = function (data) {
            this.inject(data, false);
            if (data.hasOwnProperty("tutorial")) {
                this.tutorial++;
            }
            TsEngine.Log.warn(this, "tutorial:" + this.tutorial);
            // HttpService.secret = GameConfig.apiSecret;
        };
        //刷新所有数据
        PlayerModel.prototype.updateAll = function (data) {
            this.data = data;
            playerModel.update(data);
            initModel.update(data);
            wheelModel.update(data);
            // islandModel.update(data);
            jigsawModel.update(data);
            dailyModel.update(data);
            chatModel.update(data);
            messageModel.update(false, (function () {
                gateModel.update(data);
                activityModel.update(data);
            }));
        };
        //更新好友信息
        PlayerModel.prototype.updateFriends = function (onComplete, thisobj) {
            var _this = this;
            HttpService.get(game.ServerMsg.SHOW_DONATE, "uid=" + playerModel.uid, function (data) {
                if (data) {
                    _this.friends = data.friends;
                    gateModel.updateGate(game.WindowType.WINDOW_RECOMMEND_NEARBY);
                    onComplete && onComplete.call(thisobj, data);
                }
            }, this);
        };
        //更新邀请好友奖励信息
        PlayerModel.updateFriendRewards = function () {
            HttpService.get(game.ServerMsg.SHOW_FRIEND_REWARD, "uid=" + playerModel.uid, function (data) {
                playerModel.friendRewards = data;
            });
        };
        Object.defineProperty(PlayerModel.prototype, "recallRewardCounts", {
            //召回奖励数量
            get: function () {
                var count = 0;
                for (var i = 0; i < this.recallRewards.length; i++) {
                    if (!this.recallRewards[i].hasGot) {
                        count++;
                    }
                }
                return count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerModel.prototype, "friendsRewardCounts", {
            //邀请好友奖励数量
            get: function () {
                // 奖励部分
                if (!this.friendRewards)
                    return 0;
                var _fr = this.friendRewards.friendRewards;
                var _rewards = [{ uid: 0, level: 0 }, { uid: 0, level: 0 }, { uid: 0, level: 0 }, { uid: 0, level: 0 }];
                for (var m = 0; m < 4; m++) {
                    for (var j = 0; j < _fr.length; j++) {
                        if (!_fr[j].gotLevel[m] && _fr[j].crowns >= this.friendRewards.friendRewardsConf[m].target) {
                            _rewards[m].uid = _fr[j].uid;
                            _rewards[m].level = m + 1;
                            break;
                        }
                    }
                }
                var count = 0;
                for (var i = 0; i < _rewards.length; i++) {
                    if (_rewards[i].uid > 0 && this.friendRewards.friendRewardsCount[i] < this.friendRewards.friendRewardsConf[i].limit) {
                        count++;
                        break;
                    }
                }
                return count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerModel.prototype, "dailyPrizeConfs", {
            get: function () {
                return this.data.dailyPrizeConfs;
            },
            enumerable: true,
            configurable: true
        });
        return PlayerModel;
    }(TsEngine.Model));
    game.PlayerModel = PlayerModel;
    __reflect(PlayerModel.prototype, "game.PlayerModel");
    /**
    * Created by young
    * Copyright (c) 2017 HortorGames. All rights reserved.
    */
    var PlayerSettingInfo = (function () {
        function PlayerSettingInfo(uid, fid, checksum, algorithm, showDetails) {
            this.uid = 0;
            this.fid = 0;
            this.checksum = "";
            this.algorithm = "";
            this.showDetails = false;
            this.uid = uid;
            this.fid = fid;
            this.checksum = checksum;
            this.algorithm = algorithm;
            this.showDetails = showDetails;
        }
        return PlayerSettingInfo;
    }());
    game.PlayerSettingInfo = PlayerSettingInfo;
    __reflect(PlayerSettingInfo.prototype, "game.PlayerSettingInfo");
})(game || (game = {}));
var playerModel;
//# sourceMappingURL=PlayerModel.js.map