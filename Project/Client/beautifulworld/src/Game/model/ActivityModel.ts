/**
 * Created by zhouchuang on 17/6/26.
 */
namespace game {
    export class ActivityModel {
        //活动列表
        static AcTypes = [ActivityType.beach, ActivityType.tree, ActivityType.kite, ActivityType.recall, ActivityType.plane,
        ActivityType.dragonBoat, ActivityType.boater, ActivityType.pirateKing, ActivityType.treasureMap, ActivityType.monday];
        //活动开启条件（岛屿数）
        static AcLimits = [Const.beachLimit, 1, 1, 1, 0, 2, 1, 1, 3, 1];

        //活动列表
        public activityMap: {};
        //飞机活动
        public planePointTimes = false;
        public planePointRewards = false;
        private data: any;
        //刷新局部数据
        public update(data: any) {
            this.data = data;
            if (data.activityInfos) {
                if (this.activityMap == null) {
                    this.activityMap = {};
                }
                for (var key in data.activityInfos) {
                    let aData = data.activityInfos[key];
                    let aid = aData.aid;
                    let activity = this.activityMap[aid];
                    if (activity == null) {
                        activity = new ActivityInfo(aData);
                        this.activityMap[activity.aid] = activity;
                    } else {
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
        }

        //获取活动信息
        public getActivityInfo(type: string): ActivityInfo {
            for (const key in this.activityMap) {
                let item = this.activityMap[key];
                if (item.type == type) {
                    return item;
                }
            }
            return null;
        }

        //进入活动
        public enterActivity(type: string): void {
            switch (type) {
                case ActivityType.Jigsaw:
                    TsEngine.WindowManager.currentWindow = WindowType.WINDOW_JIGSAW;
                    break;
                case ActivityType.Octopus:
                    TsEngine.ScreenManager.currentScreen = ScreenType.OCTOPUS_SCREEN;
                    break;
                case ActivityType.KillTitan:
                    TsEngine.ScreenManager.currentScreen = ScreenType.KILLTITAN_SCREEN;
                    break;
                case ActivityType.beach:
                    TsEngine.ScreenManager.currentScreen = ScreenType.BEACH_SCREEN;
                    break;
                case ActivityType.dragonBoat:
                    TsEngine.ScreenManager.currentScreen = ScreenType.DRAGONBOAT_SCREEN;
                    break;
                case ActivityType.treasureMap:
                    TsEngine.ScreenManager.currentScreen = ScreenType.TREASUREMAP_SCREEN;
                    break;
                case ActivityType.recall:
                    TsEngine.WindowManager.currentWindow = WindowType.WINDOW_RECALL;
                    break;
                case ActivityType.plane:
                    TsEngine.ScreenManager.currentScreen = ScreenType.PLANE_SCREEN;
                    break;
                case ActivityType.kite:
                    TsEngine.ScreenManager.currentScreen = ScreenType.KITE_SCREEN;
                    break;
                case ActivityType.tree:
                    TsEngine.ScreenManager.currentScreen = ScreenType.TREE_SCREEN;
                    break;
                case ActivityType.monday:
                    TsEngine.ScreenManager.currentScreen = ScreenType.MONDAY_SCREEN;
                    break;
                case ActivityType.worldCup:
                    TsEngine.WindowManager.currentWindow = WindowType.WINDOW_WORLDCUP;
                    break;
                case ActivityType.boater:
                    TsEngine.WindowManager.currentWindow = WindowType.WINDOW_BOATER;
                    break;
                case ActivityType.pirateKing:
                    TsEngine.ScreenManager.currentScreen = ScreenType.PIRATEKING_SCREEN;
                    break;
            }
        }

        //主界面的提示新活动
        public get hasTooltips(): boolean {
            let hasNew = false;
            for (let i = 0; i < ActivityModel.AcTypes.length; i++) {
                let ac = this.getActivityInfo(ActivityModel.AcTypes[i]);
                if (ac && ac.endRemain > 0 && playerModel.island >= ActivityModel.AcLimits[i]) {
                    let b = gateModel.isRed(`${ac.type}-${ac.aid}`);
                    if (b) {
                        hasNew = true;
                        break;
                    }
                }
            }
            return hasNew;
        }

        //去除新活动的提示
        public closeTooltips(): void {
            let str = "";
            for (let i = 0; i < ActivityModel.AcTypes.length; i++) {
                let ac = this.getActivityInfo(ActivityModel.AcTypes[i]);
                if (ac && ac.endRemain > 0 && playerModel.island >= ActivityModel.AcLimits[i]) {
                    let s = `${ac.type}-${ac.aid}`;
                    str += s;
                    if (i < ActivityModel.AcTypes.length - 1) {
                        str += ",";
                    }
                }
            }

            gateModel.saveRed(str, true);
        }

        //获取活动入口(ActivityType)
        public getGate(type: string) {
            return gateModel.getGate(type);
        }

        //拼图
        public initJigsaw(): void {
            //拼图
            let activity = this.getActivityInfo(ActivityType.Jigsaw);
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
        }

        //大章鱼
        public initOctopus(): void {
            let octopusRed = false;
            let activity = this.getActivityInfo(ActivityType.Octopus);
            if (activity) {
                octopusRed = (!activity.playerData.gotReward && activity.playerData.hasOpen);
                let octopusGate = gateModel.addGate(ActivityType.Octopus, false, false, AcLockType.octopus);
                octopusGate.logicRed = octopusRed;
                octopusGate.logicShow = activity.isRunning;
                activity.onChange = this.initOctopus.bind(this);
            }
        }

        //打怪兽
        public initKillTitanGate(): void {
            let activity = this.getActivityInfo(ActivityType.KillTitan);
            if (activity) {
                let titanGate = gateModel.addGate(ActivityType.KillTitan, false, false, AcLockType.taptitans);
                titanGate.logicRed = activity.playerData.hasTitanSleep && playerModel.summonStone > 0;
                activity.onChange = this.initKillTitanGate.bind(this);
            }
        }

        //沙滩
        public initBeach(): void {
            let beachRed = false;
            let activity = this.getActivityInfo(ActivityType.beach);
            if (activity) {
                beachRed = activity.isRunning && BeachCache.rewardRedPoint || BeachCache.workersRedPoint || BeachCache.newsRedPoint || BeachCache.friendsRedPoint || BeachCache.refreshRedPoint || BeachCache.rewardNewsRedPoint;
                let beachGate = gateModel.addGate(ActivityType.beach);
                beachGate.isUnlock = playerModel.island >= Const.beachLimit;
                beachGate.logicRed = beachRed;
                beachGate.logicShow = activity.isRunning && playerModel.island >= Const.beachLimit;
                activity.onChange = this.initBeach.bind(this);
            }
        }

        //藏宝图
        public initTreasureMap(): void {
            let activity = this.getActivityInfo(ActivityType.treasureMap);
            if (activity) {
                let beachGate = gateModel.addGate(ActivityType.beach);
                beachGate.isUnlock = playerModel.island > 2;
                beachGate.logicRed = activity.isRunning;
                beachGate.logicShow = activity.isRunning;
                activity.onChange = this.initTreasureMap.bind(this);
            }
        }

        //老船长回归
        public initRecall(): void {
            let activity = this.getActivityInfo(ActivityType.recall);
            if (activity) {
                let gate = gateModel.addGate(ActivityType.recall);
                gate.isUnlock = playerModel.island > 0;
                gate.logicRed = activity && activity.isRunning && activity.playerData.recallStatus == 1;
                activity.onChange = this.initRecall.bind(this);
            }
        }
        //飞机活动
        public initPlane(): void {
            let activity = this.getActivityInfo(ActivityType.plane);
            if (activity) {
                let gate = gateModel.addGate(ActivityType.plane);
                gate.isUnlock = playerModel.island > 1;
                gate.logicRed = activity && activity.isRunning && (this.planePointTimes || this.planePointRewards);
                activity.onChange = this.initPlane.bind(this);
            }
        }

        //风筝
        public initKite(): void {
            let activity = this.getActivityInfo(ActivityType.kite);
            if (activity) {
                let gate = gateModel.addGate(ActivityType.kite);
                gate.isUnlock = playerModel.island > 0;
                gate.logicRed = activity && activity.isRunning;
                activity.onChange = this.initKite.bind(this);
            }
        }

        //圣诞树
        public initTree(): void {
            let activity = this.getActivityInfo(ActivityType.tree);
            if (activity) {
                let gate = gateModel.addGate(ActivityType.tree);
                gate.isUnlock = playerModel.island > 0;
                gate.logicRed = activity && activity.isRunning;
                activity.onChange = this.initTree.bind(this);
            }
        }

        //瓜分能量
        public initMonday(): void {
            let activity = this.getActivityInfo(ActivityType.monday);
            if (activity) {
                let gate = gateModel.addGate(ActivityType.monday);
                gate.isUnlock = playerModel.island > 0;
                gate.logicRed = activity && activity.isRunning && activity.playerData.redPoint;
                activity.onChange = this.initMonday.bind(this);
            }
        }

        //船员
        public initBoater(): void {
            let activity = this.getActivityInfo(ActivityType.boater);
            if (activity) {
                let gate = gateModel.addGate(ActivityType.boater);
                gate.isUnlock = playerModel.island > 0;
                gate.logicRed = activity && activity.isRunning && activity.playerData.redPoint;
                activity.onChange = this.initBoater.bind(this);
            }
        }

        //海盗王
        public initPirateKing(): void {
            let activity = this.getActivityInfo(ActivityType.pirateKing);
            if (activity) {
                let gate = gateModel.addGate(ActivityType.pirateKing);
                gate.isUnlock = playerModel.island > activity.configData.islandLimit - 1;
                gate.logicRed = activity && activity.isRunning;
                activity.onChange = this.initPirateKing.bind(this);
            }
        }

        //节日活动
        public initFestival(): void {
            let activity = activityModel.getActivityInfo(ActivityType.occasionalGift);
            if (activity) {
                let festivalGate = gateModel.addGate(ActivityType.occasionalGift);
                festivalGate.logicShow = activity && activity.isRunning && !playerModel.gotOccasionalGift && playerModel.island > 0 && !gateModel.iosPay;
            }
        }

        //礼包含有邀请
        public initInviteGift(): void {
            let activity = activityModel.getActivityInfo(ActivityType.inviteGift);
            if (activity) {
                let inviteGiftGate = gateModel.addGate(ActivityType.inviteGift);
                inviteGiftGate.logicShow = activity.isRunning && playerModel.island > 0 && !activity.playerData.hasBuy;
            }
        }

        //每日礼包固定奖励
        public initDailyGift(): void {
            let activity = activityModel.getActivityInfo(ActivityType.dailyGift);
            if (activity) {
                let dailyGiftGate = gateModel.addGate(ActivityType.dailyGift);
                dailyGiftGate.logicShow = activity.isRunning && playerModel.island > 0 && !gateModel.iosPay;
            }
        }

        //端午节
        public initDragonBoat(): void {
            let activity = activityModel.getActivityInfo(ActivityType.dragonBoat);
            if (activity) {
                let dragonBoatGate = gateModel.addGate(ActivityType.dragonBoat);
                dragonBoatGate.logicShow = activity.isRunning && playerModel.island > 1;
            }
        }

        //邀请助力礼包
        public initShareCheer(): void {
            let activity = activityModel.getActivityInfo(ActivityType.helpGift);
            if (activity) {
                let shareCheerGate = gateModel.addGate(ActivityType.helpGift);
                shareCheerGate.logicShow = !activity.playerData.gotReward && activity.isRunning &&
                    playerModel.island > activity.configData.conf.islandLimit;
            }
        }

        //海盗礼包
        public initPirateGift(): void {
            let pirateGiftAct = activityModel.getActivityInfo(ActivityType.pirateGift);
            let pirateKingAct = activityModel.getActivityInfo(ActivityType.pirateKing);
            if (pirateGiftAct && pirateKingAct) {
                let pirateGiftGate = gateModel.addGate(ActivityType.pirateGift);
                pirateGiftGate.logicShow = pirateGiftAct && pirateKingAct && pirateGiftAct.isRunning && playerModel.island > pirateKingAct.configData.islandLimit - 1
                    && !pirateGiftAct.playerData.gotOccasionalGift && !gateModel.iosPay;
            }
        }

        //风筝礼包
        public initKiteGift(): void {
            let activity = activityModel.getActivityInfo(ActivityType.kiteGift);
            if (activity) {
                let kiteGiftGate = gateModel.addGate(ActivityType.kiteGift);
                kiteGiftGate.logicShow = activity.isRunning && playerModel.island > 0
                    && !activity.playerData.gotOccasionalGift && !gateModel.iosPay;
            }
        }

        //宝藏礼包
        public initMeasureGift(): void {
            let activity = activityModel.getActivityInfo(ActivityType.measureGift);
            if (activity) {
                let measureGiftGate = gateModel.addGate(ActivityType.measureGift);
                measureGiftGate.logicShow = activity.isRunning && playerModel.island > 2
                    && !activity.playerData.gotOccasionalGift && !gateModel.iosPay;
            }
        }

        //森林聚餐礼包
        public initPartyGift(): void {
            let activity = activityModel.getActivityInfo(ActivityType.partyGift);
            if (activity) {
                let partyGiftGate = gateModel.addGate(ActivityType.partyGift);
                partyGiftGate.logicShow = activity.isRunning && playerModel.island > 0
                    && !activity.playerData.gotOccasionalGift && !gateModel.iosPay;
            }
        }


    }

    //活动数据对象
    export class ActivityInfo {
        public aid: number;
        public awardEndAt: number;
        public awardEndRemain: number;
        public beginAt: number;
        public beginRemain: number;
        public configData: any;
        public endAt: number;
        public endRemain: number;
        public playerData: any;
        public type: string;
        public onChange: Function;
        public onUpdate: Function;
        // private clock: TsEngine.TimerClock;
        constructor(data: any) {
            if (data)
                this.update(data);
        }

        public update(data: any): void {
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
        }

        //活动是否正在运行
        public get isRunning(): boolean {
            return this.endRemain > 0 && this.beginRemain <= 0;
        }
    }
}
let activityModel: game.ActivityModel;