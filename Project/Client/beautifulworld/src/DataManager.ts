
let g_DataManager: DataManager;
class DataManager {
    public data;

    constructor(data) {
        //ps：这里不应该这样处理，应该和服务器的数据保持统一，所以先注释掉。
        data.jigsawInfo.bags = data.jigsawInfo.bags || [];
        data.jigsawInfo.pieces = data.jigsawInfo.pieces || [];
        data.jigsawInfo.rewardList = data.jigsawInfo.rewardList || [];

        this.data = data;

        //ps：下面这个字段也应该和服务端的一样。不应该这样处理。
        if (!this.data.dailyEventInfo) {
            this.data.dailyEventInfo = {
                "sendMailCount": 0,
                "donateJigsawCount": 0,
                "buyMiniShieldRemain": this.data.buyMiniShieldRemain,
                "buyKillTitanBallRemain": this.data.buyKillTitanBallRemain,
                "buyPufferRemain": this.data.buyPufferRemain,
                "buyLollyRemain": this.data.buyLollyRemain,

                "swapCount": 0,
                "rollCount": 0,
                "loginRewardCount": 0,
                "gainDonateCount": 0,
                "collectMoneyBoxCount": 0,
                "guildChatCount": 0,
                "attackCount": 0,
                "usePotionCount": 0,
                "guestRichman": 0,
                "attackDestroyedCount": 0,
                "shareRewardCount": 0,
                "showInviteCount": 0
            }
        }

        //同理，不应该这么搞。
        if (!this.data.guild) {
            this.data.guild = {
                "gid": 0,
                "name": "",
                "icon": 0,
                "coin": 0,
                "gotDailySign": false
            }
        }

        //同理，不应该这么搞。        
        if (!this.data.cashInfo) {
            this.data.cashInfo = {
                "gotCash": false,
                "hasRegistered": false,
                "captchaId": "",
                "challenge": "",
                "lostRemain": 0
            }
        }


        //同理，不应该这么搞。
        //小游戏是否显示关注图和关注气球
        this.data.subscribedActive = data.subscribedActive || false;
        this.data.balloonActive = data.balloonActive || false;

        this.data.highestCrowns = data.highestCrowns || data.crowns;

        this.data.clearedBadges = data.clearedBadges || [];
        
        this.dataRefresh(this.data);        
    }

    public dataRefresh(obj): void {
        for (let key in obj) {
            if (key == "mapInfo") continue;
            if (key == "stealIslands" && !obj[key]) continue;

            if (!_.isUndefined(this.data[key])) {
                this.data[key] = obj[key];
            }
        }

        playerModel.refresh(obj);

        //分享配置
        if (obj.shareMaterials) {
            this.dealShare();
        }

        this.dealGuide();
    }

    //是否关注
    public get isSubscribed(): boolean {
        return dataManager.data.isSubscribed;
    }

    public getActivityInfo(type: string) {
        return _.find(this.data.activityInfos, (item: ActivityInfo) => {
            return item.type == type
        });
    }

    public hasKillTitanInvited() {
        if (this.data.invitedToKillTitan) {
            let info = this.getActivityInfo(ActivityType.KillTitan);
            if (info && info.aid == this.data.invitedActivityId) {
                return true;
            }
        }
        return false;
    }

    /**
     * 海盗团任务打点
     * @param type
     * @param value
     */
    public addGuildTaskValue(type: string, value: number): void {
        if (dataManager.data.guild.gid == 0) return;
        let _obj = { roll: 1, loginReward: 2, gainDonate: 3, collectMoneyBox: 4, guildChat: 5, attack: 6, usePotion: 7, guestRichman: 8, shareReward: 9, attackDestroyed: 10 };


        let _dailyEventInfo = this.data.dailyEventInfo || {
            "sendMailCount": 0,
            "donateJigsawCount": 0,
            "buyMiniShieldRemain": 0,
            "buyKillTitanBallRemain": 0,
            "buyPufferRemain": 0,
            "buyLollyRemain": 0,

            "rollCount": 0,
            "loginRewardCount": 0,
            "gainDonateCount": 0,
            "collectMoneyBoxCount": 0,
            "guildChatCount": 0,
            "attackCount": 0,
            "usePotionCount": 0,
            "guestRichman": 0,
            "attackDestroyedCount": 0,
            "shareRewardCount": 0
        };
        //if(type != "shareReward") {
        //    _dailyEventInfo[type + "Count"] += value;
        //}
        _dailyEventInfo[type + "Count"] += value;
        if (GuildCache.TaskNeedValue.length == 0 || dataManager.data.guild.gid == 0) return;

        let _taskId = _obj[type];
        let _task = _.find(GuildCache.TaskList, (d) => {
            return d == _taskId;
        });
        let hasOver = _.find(GuildCache.TaskHasOver, (d) => {
            return d == _taskId;
        });
        let _nowCount = _dailyEventInfo[type + "Count"];
        //if(_taskId == 9) {
        //    _nowCount = dataManager.data.shareCount;
        //}
        if (_task && !hasOver && _nowCount >= GuildCache.TaskNeedValue[_task]) {
            GuildCache.GuildTaskRedPoint = true;
            EventCenter.sendEvent(EventConst.refreshGuildRedPoint);
        }

    }

    //加急订单和铲子增加
    public addBeachProp(obj: any): void {
        if (obj["magicBook"]) {
            let _beachAc = dataManager.getActivityInfo("beach");
            if (_beachAc) {
                _beachAc.playerData.magicBook += obj["magicBook"];
            }
        }

        if (obj["hamburger"]) {
            let _beachAc = dataManager.getActivityInfo("beach");
            if (_beachAc) {
                _beachAc.playerData.hamburger += obj["hamburger"];
            }
        }

        if (obj["beachPowerPotion"]) {
            let _beachAc = dataManager.getActivityInfo("beach");
            if (_beachAc) {
                _beachAc.playerData.beachPowerPotion += obj["beachPowerPotion"];
                //获得了beachPowerPotion
                if (BeachEnterData.gotPowerPotionCount == 0) {
                    BeachEnterData.gotPowerPotionCount++;
                    let mediator: ui.BeachMainMediator = <ui.BeachMainMediator>AppFacade.getInstance().getMediatorByName(ui.BeachMainMediator.NAME);
                    if (mediator) {
                        mediator.initExploreGroup();
                    }
                }

            }
        }
    }

    //处理分享配置
    private dealShare(): void {
        let _shares = this.data.shareMaterials;
        for (let key in ShareMark) {
            ShareMark[key] = [];
        }

        for (let i = 0; i < _shares.length; i++) {
            let _share = _shares[i];
            if (ShareMark[_share.type]) {
                ShareMark[_share.type].push(_share);
            }
        }
        //if (!InitMark.isLocal && InitMark.uid != 10002 && InitMark.uid != 10004) {
        PlatformManager.initialize(InitMark.isWxgame, _shares);
        //}
    }
    //处理功能解锁
    private dealGuide(): void {
        let guide = this.data.guide;
        if (guide[0] == 1) {
            // guide = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,   //15个老的功能解锁
            //     1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];//19个新的功能解锁
            for (let i = 0; i < 40; i++) {
                guide[i] = 1;
            }
        }

        else if (guide.length == 15) {
            for (let i = 0; i < 40; i++) {
                guide[i] = 0;
            }
        }
    }
}

class ActivityInfo {
    public aid: number = 0;
    public type: string = '';
    public beginAt: number = 0;
    public endAt: number = 0;
    public content: string = '';
    public beginRemain: number = 0;
    public endRemain: number = 0;
    public awardEndAt: number = 0;
    public awardEndRemain: number = 0;
    public configData: any = {};
    public playerData: any = {};
}

class ActivityType {
    // static ThanksgivingGift:string = 'thanksGivingGift';
    // static CannonContest:string = 'cannonContest';
    static KillTitan: string = 'killTitan';
    // static Monopoly:string = 'monopoly';
    // static Christmas:string = 'xmas';
    // static NewYear:string = 'newYearGift';
    static occasionalGift: string = 'occasionalGift';
    static DoubleMoney: string = 'doubleMoney';
    // static treasure: string = 'treasure';
    // static gashapon:string = 'pokegoo';
    static Octopus: string = 'octopus';
    // static MoonCake: string = 'moonCake';
    // static Cash: string = 'cash';
    // static dailyShop: string = 'dailyShop';
    // static inviteCash: string = 'inviteCash';
    static share: string = 'share';
    static inviteFriend: string = 'inviteFriend';
    static beach: string = 'beach';//沙滩
    static inviteGift: string = "inviteGift";
    static recruit: string = "recruit";
    // static balloon: string = "balloon";
    // static festivalTask: string = "festivalTask";
    // static annualCollect: string = "annualCollect";
    // static annualRebate: string = "annualRebate";
    // static annualGift: string = "annualGift";
    // static luckyBox: string = "luckyBox";
    // static halloween: string = "halloween";
    // static doll: string = "doll";
    static dailyGift: string = "dailyGift";
    static tree: string = "tree";//圣诞树
    // static flower: string = "flower";
    static newYear: string = "newYear";
    static kite: string = "kite";//风筝
    static recall: string = "recall"; // 老船长召回
    static plane: string = "plane";//飞机
    static showBrain: string = "brain";
    static treasureMap: string = "treasureMap";
    static dragonBoat: string = 'dragonBoat';//端午节
    static inviteReward: string = "inviteReward";//邀请新人得奖励
    static boater: string = "crew";//船员活动
    static monday: string = "monday";//能量瓜分
    static worldCup: string = "worldCup";   //世界杯竞猜
    static helpGift: string = "helpGift";//助力礼包

    static pirateKing: string = "luffy";    //海盗之王活动
}