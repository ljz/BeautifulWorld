/**
 * Created by zhouchuang on 17/4/24.
 */
namespace game {
    export class GuildModel {
        public guild: any = {};

        //自定义全局标记属性
        public selectGuildIndex: number = 0;
        //更新好友信息
        public update(data: any) {
            if (data.hasOwnProperty('guild')) {
                this.guild = data.guild;
            }
        }

        public get hasRedPoint(): boolean {
            return GuildCache.GuildRedPoint ||
                GuildCache.DonateSlotsRedPoint ||
                GuildCache.DonateNewsRedPoint ||
                GuildCache.NewsRedPoint ||
                GuildCache.GuildWelfareRedPoint ||
                GuildCache.GuildSailingRedPoint ||
                GuildCache.GuildSailingRewardRedPoint ||
                GuildCache.GuildSailingFirstOpenPoint ||
                GuildCache.GuildApplyRedPoint ||
                GuildCache.GuildNewMessageRedPoint ||
                GuildCache.GuildTaskRedPoint;
        }

        /**
     * 海盗团任务打点
     * @param type
     * @param value
     */
        public addGuildTaskValue(type: string, value: number): void {
            if (playerModel.guild.gid == 0) return;
            let _obj = { roll: 1, loginReward: 2, gainDonate: 3, collectMoneyBox: 4, guildChat: 5, attack: 6, usePotion: 7, guestRichman: 8, shareReward: 9, attackDestroyed: 10 };


            let _dailyEventInfo = dailyModel.dailyEventInfo || {
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
            _dailyEventInfo[type + "Count"] += value;
            if (GuildCache.TaskNeedValue.length == 0 || playerModel.guild.gid == 0) return;

            let _taskId = _obj[type];
            // let _task = _.find(GuildCache.TaskList, (d) => {
            //     return d == _taskId;
            // });
            // let hasOver = _.find(GuildCache.TaskHasOver, (d) => {
            //     return d == _taskId;
            // });
            // let _nowCount = _dailyEventInfo[type + "Count"];

            // if (_task && !hasOver && _nowCount >= GuildCache.TaskNeedValue[_task]) {
            //     GuildCache.GuildTaskRedPoint = true;
            //     EventCenter.sendEvent(EventConst.refreshGuildRedPoint);
            // }

        }

    }

    export class GuildProxy {
        static FromMember = "member";
        static FromDonate = "donate";
        static FromNews = "news";
        static FromManage = "manage";

        static roll = "roll";
        static loginReward = "loginReward";
        static gainDonate = "gainDonate";
        static collectMoneyBox = "collectMoneyBox";
        static guildChat = "guildChat";
        static attack = "attack";
        static usePotion = "usePotion";
        static guestRichman = "guestRichman";
        static shareReward = "shareReward";
        static attackDestroyed = "attackDestroyed";
        static taskObjToValue = {
            roll: 1,
            loginReward: 2,
            gainDonate: 3,
            collectMoneyBox: 4,
            guildChat: 5,
            attack: 6,
            usePotion: 7,
            guestRichman: 8,
            shareReward: 9,
            attackDestroyed: 10
        };
        static taskValueToObj = {
            1: "roll",
            2: "loginReward",
            3: "gainDonate",
            4: "collectMoneyBox",
            5: "guildChat",
            6: "attack",
            7: "usePotion",
            8: "guestRichman",
            9: "shareReward",
            10: "attackDestroyed"
        };
    }

    export let GuildData = {
        "notice": "",
        "recruitSignature": "",
        "members": [],
        "messages": [],
        "systems": [],
        "donates": [],
        "slots": [],
        "guild": {
            "gid": 0,
            "name": "",
            "icon": 0,
            "mode": 0,
            "needCrown": 0,
            "notice": ""
        },
        "signRewards": [],
        "lastExp": 0,
        "donateRemain": 0
    }

    export let GuildRecruitmentData = {
        "remain": 0,
        "recruits": [
            {
                "num": 0,
                "confNum": 1,
                "rewards": {
                    "guildMedal": 1
                },
                "gotReward": false,
                "goto": "friend",
                "taskDescription": "邀请一名微信好友达到3星即送海盗勋章"
            }
        ]
    }

    export let GuildCache = {
        Messages: [],//聊天记录
        NewMessages: [],//新聊天内容
        Systems: [],//系统消息
        Donates: [],//捐赠消息
        Members: {},//
        GuildTimer: 0,//工会总计时器
        GuildToIsland: false,//工会总计时器

        GuildRedPoint: false,//工会红点
        DonateSlotsRedPoint: false,//捐赠2个槽红点
        DonateNewsRedPoint: false,//捐赠消息红点
        NewsRedPoint: false,//系统消息红点
        GuildSignRedPoint: false,//签到红点
        GuildFeedbackRedPoint: false,//回馈礼包红点
        GuildAttendancesRedPoint: false,//出勤礼包红点
        GuildWelfareRedPoint: false,//每日礼包红点
        GuildApplyRedPoint: false,//申请列表红点
        GuildTaskRedPoint: false,//任务红点
        GuildNewMessageRedPoint: false,//新消息红点
        GuildSailingRedPoint: false,//帆船赛任务完成红点
        GuildSailingRewardRedPoint: false,//帆船奖励完成红点
        GuildSailingFirstOpenPoint: false,//帆船第一次打开
        TaskList: [],//公会任务id
        TaskHasOver: [],//公会完成id
        TaskNeedValue: [],//公会任务完成数量
        feedbackTime: 0,//回归礼包时间计时器
        feedbackRewardData: {
            "uid": 0,
            "name": "",
            "headImg": "",
            "crowns": 0,
            "gender": 1,
            "isVip": false,
            "expire": 0,
            "price": 0,
            "level": 2,
            "hasGot": false,
            "giftType": 5,
            "icon": 1,
            "orderId": "2017081010003",
            "honorees": [
                {
                    "uid": 0,
                    "name": "",
                    "headImg": "",
                    "crowns": 0,
                    "gender": 0,
                    "isVip": false,
                    "type": "",
                    "value": 0
                }
            ]
        },//选择的feedback 的 data
        GuildRecruitmentPoint: false,//工会招募令红点
    }


    export let GuildDailyWelfareData = {
        "attendance": 0,
        "feedbacks": [],
        "attendances": [
            {
                "needSignNum": 0,
                "guildCoin": 0,
                "giftType": 0,
                "hasGot": false
            }
        ],
        "giftConfs": {
            "1": {
                "1": {
                    "id": 1,
                    "giftType": 1,
                    "activityType": 0,
                    "type": "energy",
                    "value": 5
                }
            }
        }
    }

    export class GuildUtils {
        static getGuildDuty(num): string {
            var _duty = "成员";
            if (num == 15) {
                _duty = "团长";
            } else if (num == 7) {
                _duty = "副团";
            } else if (num == 3) {
                _duty = "";
            } else if (num == 1) {
                _duty = "精英";
            } else {
                _duty = "成员";
            }
            return _duty;
        }

        static getGuildNews(params): string {
            var str = "一条神秘的系统消息...";
            switch (params.type) {

                case "join":
                    str = params.name ? "\"" + (params.name.length > 10 ? params.name.substr(0, 10) + "..." : params.name) + "\"" + "加入了海盗团!!!" : "加入了海盗团!!!";
                    break;
                case "authorize":
                    str = params.name ? "\"" + (params.name.length > 10 ? params.name.substr(0, 10) + "..." : params.name) + "\"" + "职务被调整为" + params.duty : "职务被调整为" + params.duty;
                    break;
                case "quit":
                    str = params.name ? "\"" + (params.name.length > 10 ? params.name.substr(0, 10) + "..." : params.name) + "\"" + "离开了海盗团!!!" : "离开了海盗团!!!";
                    break;
                case "donate":
                    str = params.name ? "\"" + (params.name.length > 10 ? params.name.substr(0, 10) + "..." : params.name) + "\"" + (params.value || "一条神秘的系统消息...") : (params.value || "一条神秘的系统消息...");
                    break;
                case "raceEnroll":
                    var str = params.value + ``;//201719
                    var s1 = str.substr(0, 4);//当年份超过5位的时候会有问题，到时候我再修改吧~~
                    var s2 = str.substr(4, 6);
                    str = params.name ? "\"" + (params.name.length > 10 ? params.name.substr(0, 10) + "..." : params.name) + "\"" + `报名参加了${s1}年第${s2}周帆船竞赛` : `报名参加了${s1}年第${s2}周帆船竞赛`;
                    break;
                case "impeach":
                case "newCommander":
                case "guildGift":
                    str = params.name ? "\"" + (params.name.length > 10 ? params.name.substr(0, 10) + "..." : params.name) + "\"" + (params.value || "一条神秘的系统消息...") : (params.value || "一条神秘的系统消息...");
                    break;
            }

            return str;
        }

        static getGuildNewsColor(type): any {
            var color = 0xFFFFFF;
            switch (type) {
                case "join":
                    color = 0x46985B;
                    break;
                case "authorize":
                    color = 0xB97807;
                    break;
                case "quit":
                    color = 0xCE4024;
                    break;
                case "donate":
                    color = 0x46985B;
                    break;
                case "raceEnroll":
                    color = 0x46985B;
                    break;
                case "impeach":
                    color = 0x46985B;
                    break;
                case "newCommander":
                    color = 0x46985B;
                    break;
                case "guildGift":
                    color = 0x46985B;
                    break;
            }

            return color;
        }

        static initSlotsRedPoint(data: any): void {
            GuildCache.DonateSlotsRedPoint = false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].status == 3) {
                    GuildCache.DonateSlotsRedPoint = true;
                    break;
                }
            }
            EventCenter.sendEvent(EventConst.refreshGuildRedPoint);
        }

        static getWelfareRedPoint(): boolean {
            return GuildCache.GuildSignRedPoint || GuildCache.GuildFeedbackRedPoint || GuildCache.GuildAttendancesRedPoint;
        }

        static GuildRecruitmentPoint(): void {
            GuildCache.GuildRecruitmentPoint = false;
            for (var i = 0; i < GuildRecruitmentData.recruits.length; i++) {
                if (!GuildRecruitmentData.recruits[i].gotReward && (GuildRecruitmentData.recruits[i].num >= GuildRecruitmentData.recruits[i].confNum)) {
                    GuildCache.GuildRecruitmentPoint = true;
                    break;
                }
            }
        }
    }
}
let guildModel: game.GuildModel;