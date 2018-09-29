var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by zhouchuang on 17/6/26.
 */
var game;
(function (game) {
    var ActivityModel = (function () {
        function ActivityModel() {
            //飞机活动
            this.planePointTimes = false;
            this.planePointRewards = false;
        }
        //刷新局部数据
        ActivityModel.prototype.update = function (data) {
            this.data = data;
            if (data.activityInfos) {
                if (this.activityMap == null) {
                    this.activityMap = {};
                }
                for (var key in data.activityInfos) {
                    var aData = data.activityInfos[key];
                    var aid = aData.aid;
                    var activity = this.activityMap[aid];
                    if (activity == null) {
                        activity = new ActivityInfo(aData);
                        this.activityMap[activity.aid] = activity;
                    }
                    else {
                        activity.update(aData);
                    }
                }
            }
            this.initJigsaw();
            this.initOctopus();
            this.initKillTitanGate();
            this.initBeach();
            this.initDragonBoat();
            this.initTreasureMap();
            this.initRecall();
            this.initPlane();
            this.initKite();
            this.initTree();
            this.initMonday();
            this.initMonday();
            this.initPirateKing();
            this.initFestival();
            this.initInviteGift();
            this.initDailyGift();
            this.initShareCheer();
            this.initPirateGift();
            this.initKiteGift();
            this.initMeasureGift();
            this.initPartyGift();
        };
        //获取活动信息
        ActivityModel.prototype.getActivityInfo = function (type) {
            for (var key in this.activityMap) {
                var item = this.activityMap[key];
                if (item.type == type) {
                    return item;
                }
            }
            return null;
        };
        //进入活动
        ActivityModel.prototype.enterActivity = function (type) {
            switch (type) {
                case game.ActivityType.Jigsaw:
                    TsEngine.WindowManager.currentWindow = game.WindowType.WINDOW_JIGSAW;
                    break;
                case game.ActivityType.Octopus:
                    TsEngine.ScreenManager.currentScreen = game.ScreenType.OCTOPUS_SCREEN;
                    break;
                case game.ActivityType.KillTitan:
                    TsEngine.ScreenManager.currentScreen = game.ScreenType.KILLTITAN_SCREEN;
                    break;
                case game.ActivityType.beach:
                    TsEngine.ScreenManager.currentScreen = game.ScreenType.BEACH_SCREEN;
                    break;
                case game.ActivityType.dragonBoat:
                    TsEngine.ScreenManager.currentScreen = game.ScreenType.DRAGONBOAT_SCREEN;
                    break;
                case game.ActivityType.treasureMap:
                    TsEngine.ScreenManager.currentScreen = game.ScreenType.TREASUREMAP_SCREEN;
                    break;
                case game.ActivityType.recall:
                    TsEngine.WindowManager.currentWindow = game.WindowType.WINDOW_RECALL;
                    break;
                case game.ActivityType.plane:
                    TsEngine.ScreenManager.currentScreen = game.ScreenType.PLANE_SCREEN;
                    break;
                case game.ActivityType.kite:
                    TsEngine.ScreenManager.currentScreen = game.ScreenType.KITE_SCREEN;
                    break;
                case game.ActivityType.tree:
                    TsEngine.ScreenManager.currentScreen = game.ScreenType.TREE_SCREEN;
                    break;
                case game.ActivityType.monday:
                    TsEngine.ScreenManager.currentScreen = game.ScreenType.MONDAY_SCREEN;
                    break;
                case game.ActivityType.worldCup:
                    TsEngine.WindowManager.currentWindow = game.WindowType.WINDOW_WORLDCUP;
                    break;
                case game.ActivityType.boater:
                    TsEngine.WindowManager.currentWindow = game.WindowType.WINDOW_BOATER;
                    break;
                case game.ActivityType.pirateKing:
                    TsEngine.ScreenManager.currentScreen = game.ScreenType.PIRATEKING_SCREEN;
                    break;
            }
        };
        Object.defineProperty(ActivityModel.prototype, "hasTooltips", {
            //主界面的提示新活动
            get: function () {
                var hasNew = false;
                for (var i = 0; i < ActivityModel.AcTypes.length; i++) {
                    var ac = this.getActivityInfo(ActivityModel.AcTypes[i]);
                    if (ac && ac.endRemain > 0 && playerModel.island >= ActivityModel.AcLimits[i]) {
                        var b = gateModel.isRed(ac.type + "-" + ac.aid);
                        if (b) {
                            hasNew = true;
                            break;
                        }
                    }
                }
                return hasNew;
            },
            enumerable: true,
            configurable: true
        });
        //去除新活动的提示
        ActivityModel.prototype.closeTooltips = function () {
            var str = "";
            for (var i = 0; i < ActivityModel.AcTypes.length; i++) {
                var ac = this.getActivityInfo(ActivityModel.AcTypes[i]);
                if (ac && ac.endRemain > 0 && playerModel.island >= ActivityModel.AcLimits[i]) {
                    var s = ac.type + "-" + ac.aid;
                    str += s;
                    if (i < ActivityModel.AcTypes.length - 1) {
                        str += ",";
                    }
                }
            }
            gateModel.saveRed(str, true);
        };
        //获取活动入口(ActivityType)
        ActivityModel.prototype.getGate = function (type) {
            return gateModel.getGate(type);
        };
        //拼图
        ActivityModel.prototype.initJigsaw = function () {
            //拼图
            var activity = this.getActivityInfo(game.ActivityType.Jigsaw);
            if (activity) {
                // activity.update({ beginRemain: jigsawModel.jigsawInfo.openTime, endRemain: jigsawModel.jigsawInfo.closeTime });
                // let jigsawReward = !_.isEmpty(jigsawModel.jigsawInfo.rewardList);
                // let jigsawAvailable = false;
                // for (var i = 0; i < jigsawModel.jigsawInfo.bags.length; i++) {
                //     if (jigsawModel.jigsawInfo.bags[i] > 0 && !jigsawModel.jigsawInfo.pieces[i]) {
                //         jigsawAvailable = true;
                //         break;
                //     }
                // }
                // jigsawAvailable = jigsawAvailable && jigsawModel.jigsawInfo.RewardCount < 10 && (jigsawModel.jigsawInfo.openTime == 0 && jigsawModel.jigsawInfo.closeTime > 0);
                // let jigsawRed = jigsawAvailable || jigsawReward;
                // let jigsawGate = gateModel.addGate(ActivityType.Jigsaw, false, false, AcLockType.jisgaw);
                // jigsawGate.logicRed = jigsawRed;
                // jigsawGate.logicShow = jigsawModel.jigsawInfo.closeTime > 0;
                // activity.onChange = this.initJigsaw.bind(this);
            }
        };
        //大章鱼
        ActivityModel.prototype.initOctopus = function () {
            var octopusRed = false;
            var activity = this.getActivityInfo(game.ActivityType.Octopus);
            if (activity) {
                octopusRed = (!activity.playerData.gotReward && activity.playerData.hasOpen);
                var octopusGate = gateModel.addGate(game.ActivityType.Octopus, false, false, game.AcLockType.octopus);
                octopusGate.logicRed = octopusRed;
                octopusGate.logicShow = activity.isRunning;
                activity.onChange = this.initOctopus.bind(this);
            }
        };
        //打怪兽
        ActivityModel.prototype.initKillTitanGate = function () {
            var activity = this.getActivityInfo(game.ActivityType.KillTitan);
            if (activity) {
                var titanGate = gateModel.addGate(game.ActivityType.KillTitan, false, false, game.AcLockType.taptitans);
                titanGate.logicRed = activity.playerData.hasTitanSleep && playerModel.summonStone > 0;
                activity.onChange = this.initKillTitanGate.bind(this);
            }
        };
        //沙滩
        ActivityModel.prototype.initBeach = function () {
            var beachRed = false;
            var activity = this.getActivityInfo(game.ActivityType.beach);
            if (activity) {
                beachRed = activity.isRunning && game.BeachCache.rewardRedPoint || game.BeachCache.workersRedPoint || game.BeachCache.newsRedPoint || game.BeachCache.friendsRedPoint || game.BeachCache.refreshRedPoint || game.BeachCache.rewardNewsRedPoint;
                var beachGate = gateModel.addGate(game.ActivityType.beach);
                beachGate.isUnlock = playerModel.island >= Const.beachLimit;
                beachGate.logicRed = beachRed;
                beachGate.logicShow = activity.isRunning && playerModel.island >= Const.beachLimit;
                activity.onChange = this.initBeach.bind(this);
            }
        };
        //藏宝图
        ActivityModel.prototype.initTreasureMap = function () {
            var activity = this.getActivityInfo(game.ActivityType.treasureMap);
            if (activity) {
                var beachGate = gateModel.addGate(game.ActivityType.beach);
                beachGate.isUnlock = playerModel.island > 2;
                beachGate.logicRed = activity.isRunning;
                beachGate.logicShow = activity.isRunning;
                activity.onChange = this.initTreasureMap.bind(this);
            }
        };
        //老船长回归
        ActivityModel.prototype.initRecall = function () {
            var activity = this.getActivityInfo(game.ActivityType.recall);
            if (activity) {
                var gate = gateModel.addGate(game.ActivityType.recall);
                gate.isUnlock = playerModel.island > 0;
                gate.logicRed = activity && activity.isRunning && activity.playerData.recallStatus == 1;
                activity.onChange = this.initRecall.bind(this);
            }
        };
        //飞机活动
        ActivityModel.prototype.initPlane = function () {
            var activity = this.getActivityInfo(game.ActivityType.plane);
            if (activity) {
                var gate = gateModel.addGate(game.ActivityType.plane);
                gate.isUnlock = playerModel.island > 1;
                gate.logicRed = activity && activity.isRunning && (this.planePointTimes || this.planePointRewards);
                activity.onChange = this.initPlane.bind(this);
            }
        };
        //风筝
        ActivityModel.prototype.initKite = function () {
            var activity = this.getActivityInfo(game.ActivityType.kite);
            if (activity) {
                var gate = gateModel.addGate(game.ActivityType.kite);
                gate.isUnlock = playerModel.island > 0;
                gate.logicRed = activity && activity.isRunning;
                activity.onChange = this.initKite.bind(this);
            }
        };
        //圣诞树
        ActivityModel.prototype.initTree = function () {
            var activity = this.getActivityInfo(game.ActivityType.tree);
            if (activity) {
                var gate = gateModel.addGate(game.ActivityType.tree);
                gate.isUnlock = playerModel.island > 0;
                gate.logicRed = activity && activity.isRunning;
                activity.onChange = this.initTree.bind(this);
            }
        };
        //瓜分能量
        ActivityModel.prototype.initMonday = function () {
            var activity = this.getActivityInfo(game.ActivityType.monday);
            if (activity) {
                var gate = gateModel.addGate(game.ActivityType.monday);
                gate.isUnlock = playerModel.island > 0;
                gate.logicRed = activity && activity.isRunning && activity.playerData.redPoint;
                activity.onChange = this.initMonday.bind(this);
            }
        };
        //船员
        ActivityModel.prototype.initBoater = function () {
            var activity = this.getActivityInfo(game.ActivityType.boater);
            if (activity) {
                var gate = gateModel.addGate(game.ActivityType.boater);
                gate.isUnlock = playerModel.island > 0;
                gate.logicRed = activity && activity.isRunning && activity.playerData.redPoint;
                activity.onChange = this.initBoater.bind(this);
            }
        };
        //海盗王
        ActivityModel.prototype.initPirateKing = function () {
            var activity = this.getActivityInfo(game.ActivityType.pirateKing);
            if (activity) {
                var gate = gateModel.addGate(game.ActivityType.pirateKing);
                gate.isUnlock = playerModel.island > activity.configData.islandLimit - 1;
                gate.logicRed = activity && activity.isRunning;
                activity.onChange = this.initPirateKing.bind(this);
            }
        };
        //节日活动
        ActivityModel.prototype.initFestival = function () {
            var activity = activityModel.getActivityInfo(game.ActivityType.occasionalGift);
            if (activity) {
                var festivalGate = gateModel.addGate(game.ActivityType.occasionalGift);
                festivalGate.logicShow = activity && activity.isRunning && !playerModel.gotOccasionalGift && playerModel.island > 0 && !gateModel.iosPay;
            }
        };
        //礼包含有邀请
        ActivityModel.prototype.initInviteGift = function () {
            var activity = activityModel.getActivityInfo(game.ActivityType.inviteGift);
            if (activity) {
                var inviteGiftGate = gateModel.addGate(game.ActivityType.inviteGift);
                inviteGiftGate.logicShow = activity.isRunning && playerModel.island > 0 && !activity.playerData.hasBuy;
            }
        };
        //每日礼包固定奖励
        ActivityModel.prototype.initDailyGift = function () {
            var activity = activityModel.getActivityInfo(game.ActivityType.dailyGift);
            if (activity) {
                var dailyGiftGate = gateModel.addGate(game.ActivityType.dailyGift);
                dailyGiftGate.logicShow = activity.isRunning && playerModel.island > 0 && !gateModel.iosPay;
            }
        };
        //端午节
        ActivityModel.prototype.initDragonBoat = function () {
            var activity = activityModel.getActivityInfo(game.ActivityType.dragonBoat);
            if (activity) {
                var dragonBoatGate = gateModel.addGate(game.ActivityType.dragonBoat);
                dragonBoatGate.logicShow = activity.isRunning && playerModel.island > 1;
            }
        };
        //邀请助力礼包
        ActivityModel.prototype.initShareCheer = function () {
            var activity = activityModel.getActivityInfo(game.ActivityType.helpGift);
            if (activity) {
                var shareCheerGate = gateModel.addGate(game.ActivityType.helpGift);
                shareCheerGate.logicShow = !activity.playerData.gotReward && activity.isRunning &&
                    playerModel.island > activity.configData.conf.islandLimit;
            }
        };
        //海盗礼包
        ActivityModel.prototype.initPirateGift = function () {
            var pirateGiftAct = activityModel.getActivityInfo(game.ActivityType.pirateGift);
            var pirateKingAct = activityModel.getActivityInfo(game.ActivityType.pirateKing);
            if (pirateGiftAct && pirateKingAct) {
                var pirateGiftGate = gateModel.addGate(game.ActivityType.pirateGift);
                pirateGiftGate.logicShow = pirateGiftAct && pirateKingAct && pirateGiftAct.isRunning && playerModel.island > pirateKingAct.configData.islandLimit - 1
                    && !pirateGiftAct.playerData.gotOccasionalGift && !gateModel.iosPay;
            }
        };
        //风筝礼包
        ActivityModel.prototype.initKiteGift = function () {
            var activity = activityModel.getActivityInfo(game.ActivityType.kiteGift);
            if (activity) {
                var kiteGiftGate = gateModel.addGate(game.ActivityType.kiteGift);
                kiteGiftGate.logicShow = activity.isRunning && playerModel.island > 0
                    && !activity.playerData.gotOccasionalGift && !gateModel.iosPay;
            }
        };
        //宝藏礼包
        ActivityModel.prototype.initMeasureGift = function () {
            var activity = activityModel.getActivityInfo(game.ActivityType.measureGift);
            if (activity) {
                var measureGiftGate = gateModel.addGate(game.ActivityType.measureGift);
                measureGiftGate.logicShow = activity.isRunning && playerModel.island > 2
                    && !activity.playerData.gotOccasionalGift && !gateModel.iosPay;
            }
        };
        //森林聚餐礼包
        ActivityModel.prototype.initPartyGift = function () {
            var activity = activityModel.getActivityInfo(game.ActivityType.partyGift);
            if (activity) {
                var partyGiftGate = gateModel.addGate(game.ActivityType.partyGift);
                partyGiftGate.logicShow = activity.isRunning && playerModel.island > 0
                    && !activity.playerData.gotOccasionalGift && !gateModel.iosPay;
            }
        };
        //活动列表
        ActivityModel.AcTypes = [game.ActivityType.beach, game.ActivityType.tree, game.ActivityType.kite, game.ActivityType.recall, game.ActivityType.plane,
            game.ActivityType.dragonBoat, game.ActivityType.boater, game.ActivityType.pirateKing, game.ActivityType.treasureMap, game.ActivityType.monday];
        //活动开启条件（岛屿数）
        ActivityModel.AcLimits = [Const.beachLimit, 1, 1, 1, 0, 2, 1, 1, 3, 1];
        return ActivityModel;
    }());
    game.ActivityModel = ActivityModel;
    __reflect(ActivityModel.prototype, "game.ActivityModel");
    //活动数据对象
    var ActivityInfo = (function () {
        // private clock: TsEngine.TimerClock;
        function ActivityInfo(data) {
            if (data)
                this.update(data);
        }
        ActivityInfo.prototype.update = function (data) {
            for (var key in data) {
                this[key] = data[key];
            }
            // if (this.beginRemain > 0) {
            //     this.clock = TsEngine.TimerManager.addClock("Activity_" + this.aid, this.beginRemain);
            //     this.clock.registCallBack(this, () => {
            //         this.beginRemain = 0;
            //         this.onChange && this.onChange();
            //     });
            // } else {
            //     this.clock = TsEngine.TimerManager.addClock("Activity_" + this.aid, this.endRemain);
            //     this.clock.registCallBack(this, () => {
            //         this.endRemain = 0;
            //         this.onChange && this.onChange();
            //     }, (p) => {
            //         this.onUpdate && this.onUpdate(this.clock.leftTimeFormatZh);
            //     });
            // }
        };
        Object.defineProperty(ActivityInfo.prototype, "isRunning", {
            //活动是否正在运行
            get: function () {
                return this.endRemain > 0 && this.beginRemain <= 0;
            },
            enumerable: true,
            configurable: true
        });
        return ActivityInfo;
    }());
    game.ActivityInfo = ActivityInfo;
    __reflect(ActivityInfo.prototype, "game.ActivityInfo");
})(game || (game = {}));
var activityModel;
//# sourceMappingURL=ActivityModel.js.map