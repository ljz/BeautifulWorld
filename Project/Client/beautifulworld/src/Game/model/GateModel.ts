//游戏入口数据模型
namespace game {
    export class GateModel extends TsEngine.Model {
        public openAllGate: boolean = true;//开启所有功能（测试用,活动除外,必须开启活动才能测试）
        public guide: number[] = null;//功能是否开启
        public clearedBadges: string[] = null;//是否打开过
        private oldBadgesMap: any = {};
        /**公众号相关 */
        public isWxgame: boolean = false;//是否wxgame
        /**屏蔽区域相关*/
        public checkFocus: boolean = false;//诱导关注
        public checkShare: boolean = false;//诱导分享
        public checkPay: boolean = false;//诱导充值
        public checkFreeEnergyDiffGroup: boolean = false;//免费能量分享不同群
        public checkShareBtn: false;//邀请奖励按钮是否显示
        public iosPay: boolean = false;//是否可以苹果充值
        public payRed: boolean = false;//商城红点
        public GameClubInterFaceId: boolean = false;//是否显示游戏圈
        public ShareInterFaceId: boolean = false;//是否屏蔽
        public wxSharing: boolean = false;
        public wxCanShowAd: boolean = false;
        public timestamp: number = 0;
        /**入口相关*/
        private gateMap: {};
        private data: any;
        constructor() {
            super();
            this.isWxgame = TsEngine.SystemManager.isWxGame;
            this.iosPay = !(this.isWxgame && !this.checkPay && TsEngine.SystemManager.isIOS);
            this.gateMap = {};
        }

        public update(data: any): void {
            this.data = data;
            this.inject(data);
            /**屏蔽区域检测*/
            PlatformManager.checkIPAvailable(game.AreaCheckType.Check_Focus, (avaiable) => { this.checkFocus = avaiable; });
            PlatformManager.checkIPAvailable(game.AreaCheckType.Check_Share, (avaiable) => { this.checkShare = avaiable; });
            PlatformManager.checkIPAvailable(game.AreaCheckType.Check_Pay, (avaiable) => { this.checkPay = avaiable; });
            PlatformManager.checkIPAvailable(game.AreaCheckType.Check_FreeEnergyDiffGroup, (avaiable) => { this.checkFreeEnergyDiffGroup = avaiable; });
            PlatformManager.checkIPAvailable(game.AreaCheckType.Check_ShareBtn, (avaiable) => { this.checkShareBtn = avaiable; });

            this.initGates();
            //更新Tab窗口开放列表
            TsEngine.WindowManager.setOpenList(gateModel.getGroupOpenList(WindowType.GROUP_DAILYREWARD));
            TsEngine.WindowManager.setOpenList(gateModel.getGroupOpenList(WindowType.GROUP_INVITEREWARD));
            TsEngine.WindowManager.setOpenList(gateModel.getGroupOpenList(WindowType.GROUP_FRIEND));
            TsEngine.WindowManager.setOpenList(gateModel.getGroupOpenList(WindowType.GROUP_LIMITSALE));
            TsEngine.WindowManager.setOpenList(gateModel.getGroupOpenList(WindowType.GROUP_NEWS));
            TsEngine.WindowManager.setOpenList(gateModel.getGroupOpenList(WindowType.GROUP_FRIEND_RECOMMEND));
        }

        //公众号特权是否有效
        public get privilegeAvailable() {
            console.log("this.checkFocus = ", this.checkFocus)
            console.log("playerModel.gotNewSubscribedReward = ", playerModel.gotNewSubscribedReward)
            console.log("playerModel.isSubscribed = ", playerModel.isSubscribed)
            return this.checkFocus && playerModel.gotNewSubscribedReward && playerModel.isSubscribed;
        }

        //入口更新*
        private initGates() {
            //----------服务器红点入口------------
            //微信排行
            this.addGate(WindowType.WINDOW_WXRANK, true, true).updateMethod = (gate: Gate) => {
                gate.isUnlock = this.isWxgame;
                if (this.isWxgame)
                    gate.logicShow = platform.common.checkSetUserStorage();
            };
            //新手礼包
            this.addGate(WindowType.WINDOW_NEWBIE_GIFT, true, true).updateMethod = (gate: Gate) => {
                gate.logicRed = playerModel.gotNewbieGift;
                gate.logicShow = !playerModel.gotNewbieGift && !ComFunc.checkIOSPay()
            };

            //认证礼包
            this.addGate(WindowType.WINDOW_REALNAME_GIFT, true, true);

            //召回奖励
            this.addGate(WindowType.WINDOW_RECALL_REWARD, true, false, AcLockType.recall).updateMethod = (gate: Gate) => {
                gate.logicRed = playerModel.inviteMoneyCount > 0 && playerModel.showBoxType == 1;
            };

            //邀请奖励
            this.addGate(WindowType.WINDOW_INVITEREWARD, true, false, AcLockType.invite).updateMethod = (gate: Gate) => {
                gate.logicRed = (playerModel.friendsRewardCounts > 0 || playerModel.shareTime < 1 && playerModel.shareCount <= 4);
                if (this.isWxgame) {
                    gate.logicRed = playerModel.friendsRewardCounts > 0;
                }
            };

            //万能碎片
            this.addGate(WindowType.WINDOW_WNSP, true, false, AcLockType.allInOne).updateMethod = (gate: Gate) => {
                let allInOneRed = (playerModel.inviteFriendCount > playerModel.inviteFriendRewardCount) && playerModel.showBoxType == 0;
                if (playerModel.inviteFirendToday && playerModel.inviteFriendCount == playerModel.inviteFriendRewardCount) {
                    allInOneRed = false;
                }
                gate.logicRed = allInOneRed;
            };

            //金币宝箱
            this.addGate(WindowType.WINDOW_INVITE_JBBX, true, false, AcLockType.moneyBox).updateMethod = (gate: Gate) => {
                gate.logicRed = guildModel[AcLockType.moneyBox] && (playerModel.inviteMoneyCount > 0 || gateModel.getGate(WindowType.WINDOW_INVITE_JBBX).red) && playerModel.showBoxType == 1;
            };

            //签到
            this.addGate(WindowType.WINDOW_DAILY_SIGN).updateMethod = (gate: Gate) => {
                gate.logicRed = initModel.signRedPoint;
            };

            //每日能量
            this.addGate(WindowType.WINDOW_DAILY_ENERGY, false, false, AcLockType.dailyEnergy).updateMethod = (gate: Gate) => {
                gate.logicRed = playerModel.loginRewardRemain == 0 && guildModel[AcLockType.dailyEnergy];
            };

            //能量红包
            this.addGate(WindowType.WINDOW_FREE_ENERGY, true, false, AcLockType.dailyRedBag).updateMethod = (gate: Gate) => {
                gate.logicRed = dailyModel.seniorDayShare_remainShareCount > 0 || dailyModel.seniorDayShare_boxEnergy > 0
            };

            //----------常规入口------------
            //map
            this.addGate(WindowType.WINDOW_WORLDMAP, false, false, AcLockType.map).updateMethod = (gate: Gate) => {

            };

            //公众号特权
            this.addGate(WindowType.WINDOW_OFFICIALVIP).updateMethod = (gate: Gate) => {
                gate.logicShow = this.checkFocus && playerModel.gotNewSubscribedReward && playerModel.isSubscribed;
                gate.leftTime = this.data.privilegeOverplus;
            };

            //聊天界面推荐好友
            this.addGate(WindowType.WINDOW_RECOMMEND_NEARBY, true).updateMethod = (gate: Gate) => {
                gate.logicRed = playerModel.friends && playerModel.friends.length < 3;
            };

            //聊天入口
            this.addGate(WindowType.WINDOW_WORLD_CHAT).updateMethod = (gate: Gate) => {
                gate.logicRed = chatModel.ChatCache.chatBtnPoint || messageModel.requests.length > 0 || this.isRed(WindowType.WINDOW_RECOMMEND_NEARBY);
            };

            //公众号关注
            this.addGate(WindowType.WINDOW_FOCUS_REWARD_TIP).updateMethod = (gate: Gate) => {

                gate.logicShow = gateModel.isWxgame && !playerModel.gotNewSubscribedReward && (playerModel.highestCrowns >= Const.FocusLimit);//并且未领取奖励gotSubscribedReward
            };

            //新手目标
            this.addGate(WindowType.WINDOW_ACHIEVE, false, false, AcLockType.achieve).updateMethod = (gate: Gate) => {
                gate.logicShow = playerModel.hasAchievement;
            };

            //海盗团
            this.addGate(ScreenType.GUILD_SCREEN, false, false, AcLockType.guild, false).updateMethod = (gate: Gate) => {
                gate.logicRed = guildModel.hasRedPoint;
                gate.logicShow = gate.isUnlock || playerModel.highestCrowns >= Const.guildOpenLimit;
            };

            //邀请送vip
            this.addGate(WindowType.WINDOW_INVITE_VIP, false, false, AcLockType.inviteVip).updateMethod = (gate: Gate) => {
                gate.logicRed = playerModel.inviteFriendVIPRemain == 0;
                // gate.logicShow = _.isNumber(playerModel.inviteFriendVIPRemain);
            };

            //月卡
            this.addGate(WindowType.WINDOW_MONTHCARD, false, false, AcLockType.monthCard).updateMethod = (gate: Gate) => {
                gate.logicRed = playerModel.monthCardExpired > 0 && !playerModel.gotMonthCardReward;
                gate.logicShow = !gate.red;
            };

            //神秘商人
            this.addGate(WindowType.WINDOW_MYSTICAL).updateMethod = (gate: Gate) => {
                gate.logicShow = playerModel.hasMystical && (!this.isWxgame || !this.iosPay);
            };

            //飞速礼包
            this.addGate(WindowType.WINDOW_RUNNINGGIFT).updateMethod = (gate: Gate) => {
                // gate.logicShow = playerModel.speedGiftRemain != null && _.isNumber(playerModel.speedGiftRemain) && playerModel.speedGiftRemain > 0 && !this.iosPay;
            };

            //海盗商人(原来的森林聚餐礼包)
            this.addGate(WindowType.WINDOW_PIRATEGIFT).updateMethod = (gate: Gate) => {
                let partyGift = activityModel.getActivityInfo(ActivityType.partyGift);
                gate.logicShow = partyGift && !ComFunc.checkIOSPay() && !partyGift.playerData.gotOccasionalGift && playerModel.island > 0 && (partyGift.beginRemain <= 0 && (partyGift.endRemain > 0 || partyGift.awardEndRemain > 0));
            };

            //商店入口
            this.addGate(WindowType.WINDOW_SHOP).updateMethod = (gate: Gate) => {
                gate.logicRed = (this.isWxgame && this.payRed && !TsEngine.SystemManager.isIOS) || (this.payRed);
            };

            //信息编辑入口
            this.addGate(WindowType.WINDOW_PLAYER_EDIT).updateMethod = (gate: Gate) => {
                gate.logicRed = playerModel.constellation == 0 && playerModel.province == 0;
            };
        }

        //更新入口
        public updateGate(type: string | number): void {
            let gate = this.getGate(type);
            if (gate) {
                gate.update();
            }
        }

        //添加入口(WindowType)
        public addGate(type: string | number, saveServer: boolean = false, saveForever: boolean = true, lockType: AcLockType = null, hideLock: boolean = true): Gate {
            let gate = this.getGate(type);
            if (!gate) {
                gate = new Gate(type.toString(), saveServer, saveForever, lockType, hideLock);
                this.gateMap[type] = gate;
            }
            return gate;
        }

        //添加合集入口(WindowType/ActivityType)
        public addGroupGate(type: string | number, gates: Gate[]): Gate {
            let gate = this.gateMap[type.toString()]
            if (!gate) {
                gate = new GroupGate(type.toString(), gates);
                this.gateMap[type] = gate;
            }
            return gate;
        }

        //获取窗口组开放的id集合
        public getGroupOpenList(type: number): number[] {
            let winData = TsEngine.WindowManager.getWindowData(type);
            let openList = [];
            if (winData && winData.fullList) {
                for (var index = 0; index < winData.fullList.length; index++) {
                    var id = winData.fullList[index];
                    let gate = this.getGate(id);
                    if ((gate && gate.show) || !gate) {
                        openList.push(id);
                    }
                }
            }
            console.log("openList type:" + type + "|" + openList.join(","));
            return openList;
        }

        //获取入口(WindowType/ActivityType)
        public getGate(type: string | number): Gate {
            if (!type) return null;
            let gate = this.gateMap[type.toString()];
            if (!gate && typeof type === 'number') {
                //如果是窗口组，自动创建入口集合
                let groupId = parseInt(type.toString());
                let winData = TsEngine.WindowManager.getWindowData(groupId);
                if (winData && winData.fullList) {
                    let gates = [];
                    for (var index = 0; index < winData.fullList.length; index++) {
                        var id = winData.fullList[index];
                        let gate = this.gateMap[type.toString()];
                        if (gate) {
                            gates.push(gate);
                        }
                    }
                    gate = this.addGroupGate(type, gates);
                }
            }
            return gate;
        }

        //根据解锁类型获取入口
        public getGateByLockType(locktype: AcLockType): Gate {
            for (var key in this.gateMap) {
                var element = this.gateMap[key];
                if (element.lockType == locktype) {
                    return element;
                }
            }
            return null;
        }

        //入口是否有红点(WindowType/ActivityType)
        public isRed(type: string | number): boolean {
            let gate = this.getGate(type);
            if (gate == null) {
                return gateModel.clearedBadges.indexOf(type.toString()) != -1;
            }
            return gate.red;
        }

        //保存红点到服务器
        public saveRed(type: string | number, forever: boolean): void {
            HttpService.post(ServerMsg.CLEARBADGE, `uid=${playerModel.uid}&key=${type.toString()}&forever=${forever}`, function (data) {
                if (data) {
                    gateModel.clearedBadges = data;
                }
            });
        }

        private initOldGate(): void {
            this.oldBadgesMap[WindowType.WINDOW_NEWBIE_GIFT] = "newbieGift"
        }
    }

    //功能入口类
    export class Gate extends TsEngine.Model {
        //id
        public id: string;
        //是否显示入口(控制是否显示))
        public show: boolean = true;
        //最终的red
        public red: boolean;
        //最终的unlock
        public unlock: boolean;

        public lockType: AcLockType;
        public tempShow: boolean = false;
        // public clock: TsEngine.TimerClock;
        public hideLock: boolean;//隐藏未解锁的入口,默认隐藏

        private mUpdateMethod: Function;
        private mIsUnlock: boolean;//是否解锁(控制是否显示锁，是否显示红点)
        private mLogicShow: boolean;//数据逻辑是否显示
        private mLogicRed: boolean;//数据逻辑red
        private mUserRed: boolean;//用户自定义red
        private redPropertyMap: {};//用于判断是否红点的辅助参数(||运算符计算)
        private mIsOpened: boolean;
        private serverGate: boolean;
        private saveForever: boolean;
        constructor(id: string, serverGate: boolean = false, saveForever: boolean = true, lockType: AcLockType = null, hideLock: boolean = true) {
            super();
            this.id = id;
            this.hideLock = hideLock;
            this.lockType = lockType;
            this.mLogicRed = false;
            this.mIsUnlock = true;
            this.serverGate = serverGate;
            this.saveForever = saveForever;
            this.redPropertyMap = {};
            if (!serverGate) {
                this.mIsOpened = false;
            }
        }

        //入口更新函数
        public set updateMethod(value: Function) {
            this.mUpdateMethod = value;
            this.update();
        }

        //通过函数更新入口属性
        public update(): void {
            if (this.mUpdateMethod) {
                this.mUpdateMethod(this);
            }
        }

        //添加红点辅助参数(相当于与原始值||运算符计算)
        public addRedProperty(name: string, value: boolean): void {
            this.redPropertyMap[name] = value;
            this.updateRed();
        }

        //是否解锁了
        public set isUnlock(value: boolean) {
            this.mIsUnlock = gateModel.openAllGate ? true : value;
            if (this.lockType) {
                gateModel.guide[this.lockType] = value ? 1 : 0;
            }
            this.updateShow();
            this.updateRed();
            this.unlock = this.isUnlock;
            if (value && parseInt(this.id) > 0) {
                TsEngine.WindowManager.setOpen(parseInt(this.id), true);
            }
        }

        public get isUnlock(): boolean {
            if (this.lockType) {
                return gateModel.guide[this.lockType] == 1;
            }
            return this.mIsUnlock;
        }

        //数据逻辑是否显示
        public set logicShow(value: boolean) {
            this.mLogicShow = value;
            this.updateShow();
        }

        public get logicShow(): boolean {
            return this.hasOwnProperty("mLogicShow") ? this.mLogicShow : this.isUnlock;
        }

        //数据逻辑红点
        public set logicRed(value: boolean) {
            this.mLogicRed = value;
            this.updateRed();
        }

        public get logicRed(): boolean {
            let result: boolean = false;
            if (this.mLogicRed) {
                result = true;
            } else {
                for (const key in this.redPropertyMap) {
                    if (this.redPropertyMap[key]) {
                        result = true;
                        break;
                    }
                }
            }
            return this.isUnlock && (result || !this.isOpened);
        }

        //用户自定义红点（用户主动设置之后的红点返回将以设置的值为准，否则通过dataRed自动判断）
        public set userRed(value: boolean) {
            this.mUserRed = value;
            this.updateRed();
        }

        public get userRed(): boolean {
            return this.mUserRed;
        }

        private updateRed(): void {
            this.red = this.hasOwnProperty("mUserRed") ? this.mUserRed : this.logicRed;
        }

        private updateShow(): void {
            if (gateModel.openAllGate) {
                this.show = true;
            } else {
                this.show = this.hideLock ? (this.isUnlock && this.logicShow) : this.logicShow;
            }
        }

        public set isOpened(value: boolean) {
            if (this.mIsOpened != value) {
                this.mIsOpened = value;
                if (this.serverGate) {
                    gateModel.saveRed(this.id, this.saveForever);
                }
            }
        }

        public get isOpened(): boolean {
            if (this.serverGate) {
                return gateModel.clearedBadges.indexOf(this.id) != -1;
            }
            return this.mIsOpened;
        }

        public set leftTime(value: number) {
            // this.clock = TsEngine.TimerManager.addClock(this.id + "_Timer", value);
            // this.clock.registCallBack(this, () => {
            //     TsEngine.TimerManager.removeClock(this.id + "_Timer");
            //     this.logicShow = false;
            // });
        }

        public get leftTime(): number {
            return 0;
            // return this.clock ? Math.floor(this.clock.leftTime / 1000) : 0;
        }
    }

    //功能合集入口类
    export class GroupGate extends Gate {
        //id
        public id: string;
        //是否显示入口(控制是否显示))
        public logicShow: boolean = true;
        private gates: Gate[];
        constructor(id: string, gates: Gate[]) {
            super(id);
            this.gates = gates;
        }

        public get red(): boolean {
            for (const gate of this.gates) {
                if (gate.red) {
                    return true;
                }
            }
            return false;
        }
    }

    //需要功能开放的功能类型
    export enum AcLockType {
        bet = 15,//轮盘2倍
        octopus,//神秘海域
        taptitans,//打怪兽
        mine,//金矿
        recruit,//招募令
        guild,//海盗团
        pet,//宠物
        shield,//互助盾
        map,//地图
        achieve,//新手目标
        jisgaw,//海盗拼图
        inviteVip,//免费VIP
        moneyBox,//金币宝箱
        invite,//邀请奖励
        dailyRedBag,//每日红包
        dailyEnergy,//每日能量
        recall,//召回奖励
        allInOne,//万能碎片
        monthCard,//VIP
        betGuideSave,//特殊步骤为了倍数的引导时转到金币
        bet3,//轮盘3倍
        bet4,//轮盘4倍
        bet5,//轮盘5倍
    }
}
let gateModel: game.GateModel;