var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by zhouchuang on 17/4/24.
 */
var game;
(function (game) {
    var GuildModel = (function () {
        function GuildModel() {
            this.guild = {};
            //自定义全局标记属性
            this.selectGuildIndex = 0;
        }
        //更新好友信息
        GuildModel.prototype.update = function (data) {
            if (data.hasOwnProperty('guild')) {
                this.guild = data.guild;
            }
        };
        Object.defineProperty(GuildModel.prototype, "hasRedPoint", {
            get: function () {
                return game.GuildCache.GuildRedPoint ||
                    game.GuildCache.DonateSlotsRedPoint ||
                    game.GuildCache.DonateNewsRedPoint ||
                    game.GuildCache.NewsRedPoint ||
                    game.GuildCache.GuildWelfareRedPoint ||
                    game.GuildCache.GuildSailingRedPoint ||
                    game.GuildCache.GuildSailingRewardRedPoint ||
                    game.GuildCache.GuildSailingFirstOpenPoint ||
                    game.GuildCache.GuildApplyRedPoint ||
                    game.GuildCache.GuildNewMessageRedPoint ||
                    game.GuildCache.GuildTaskRedPoint;
            },
            enumerable: true,
            configurable: true
        });
        /**
     * 海盗团任务打点
     * @param type
     * @param value
     */
        GuildModel.prototype.addGuildTaskValue = function (type, value) {
            if (playerModel.guild.gid == 0)
                return;
            var _obj = { roll: 1, loginReward: 2, gainDonate: 3, collectMoneyBox: 4, guildChat: 5, attack: 6, usePotion: 7, guestRichman: 8, shareReward: 9, attackDestroyed: 10 };
            var _dailyEventInfo = dailyModel.dailyEventInfo || {
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
            if (game.GuildCache.TaskNeedValue.length == 0 || playerModel.guild.gid == 0)
                return;
            var _taskId = _obj[type];
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
        };
        return GuildModel;
    }());
    game.GuildModel = GuildModel;
    __reflect(GuildModel.prototype, "game.GuildModel");
    var GuildProxy = (function () {
        function GuildProxy() {
        }
        GuildProxy.FromMember = "member";
        GuildProxy.FromDonate = "donate";
        GuildProxy.FromNews = "news";
        GuildProxy.FromManage = "manage";
        GuildProxy.roll = "roll";
        GuildProxy.loginReward = "loginReward";
        GuildProxy.gainDonate = "gainDonate";
        GuildProxy.collectMoneyBox = "collectMoneyBox";
        GuildProxy.guildChat = "guildChat";
        GuildProxy.attack = "attack";
        GuildProxy.usePotion = "usePotion";
        GuildProxy.guestRichman = "guestRichman";
        GuildProxy.shareReward = "shareReward";
        GuildProxy.attackDestroyed = "attackDestroyed";
        GuildProxy.taskObjToValue = {
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
        GuildProxy.taskValueToObj = {
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
        return GuildProxy;
    }());
    game.GuildProxy = GuildProxy;
    __reflect(GuildProxy.prototype, "game.GuildProxy");
    game.GuildData = {
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
    };
    game.GuildRecruitmentData = {
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
    };
    game.GuildCache = {
        Messages: [],
        NewMessages: [],
        Systems: [],
        Donates: [],
        Members: {},
        GuildTimer: 0,
        GuildToIsland: false,
        GuildRedPoint: false,
        DonateSlotsRedPoint: false,
        DonateNewsRedPoint: false,
        NewsRedPoint: false,
        GuildSignRedPoint: false,
        GuildFeedbackRedPoint: false,
        GuildAttendancesRedPoint: false,
        GuildWelfareRedPoint: false,
        GuildApplyRedPoint: false,
        GuildTaskRedPoint: false,
        GuildNewMessageRedPoint: false,
        GuildSailingRedPoint: false,
        GuildSailingRewardRedPoint: false,
        GuildSailingFirstOpenPoint: false,
        TaskList: [],
        TaskHasOver: [],
        TaskNeedValue: [],
        feedbackTime: 0,
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
        },
        GuildRecruitmentPoint: false,
    };
    game.GuildDailyWelfareData = {
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
    };
    var GuildUtils = (function () {
        function GuildUtils() {
        }
        GuildUtils.getGuildDuty = function (num) {
            var _duty = "成员";
            if (num == 15) {
                _duty = "团长";
            }
            else if (num == 7) {
                _duty = "副团";
            }
            else if (num == 3) {
                _duty = "";
            }
            else if (num == 1) {
                _duty = "精英";
            }
            else {
                _duty = "成员";
            }
            return _duty;
        };
        GuildUtils.getGuildNews = function (params) {
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
                    var str = params.value + ""; //201719
                    var s1 = str.substr(0, 4); //当年份超过5位的时候会有问题，到时候我再修改吧~~
                    var s2 = str.substr(4, 6);
                    str = params.name ? "\"" + (params.name.length > 10 ? params.name.substr(0, 10) + "..." : params.name) + "\"" + ("\u62A5\u540D\u53C2\u52A0\u4E86" + s1 + "\u5E74\u7B2C" + s2 + "\u5468\u5E06\u8239\u7ADE\u8D5B") : "\u62A5\u540D\u53C2\u52A0\u4E86" + s1 + "\u5E74\u7B2C" + s2 + "\u5468\u5E06\u8239\u7ADE\u8D5B";
                    break;
                case "impeach":
                case "newCommander":
                case "guildGift":
                    str = params.name ? "\"" + (params.name.length > 10 ? params.name.substr(0, 10) + "..." : params.name) + "\"" + (params.value || "一条神秘的系统消息...") : (params.value || "一条神秘的系统消息...");
                    break;
            }
            return str;
        };
        GuildUtils.getGuildNewsColor = function (type) {
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
        };
        GuildUtils.initSlotsRedPoint = function (data) {
            game.GuildCache.DonateSlotsRedPoint = false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].status == 3) {
                    game.GuildCache.DonateSlotsRedPoint = true;
                    break;
                }
            }
            EventCenter.sendEvent(EventConst.refreshGuildRedPoint);
        };
        GuildUtils.getWelfareRedPoint = function () {
            return game.GuildCache.GuildSignRedPoint || game.GuildCache.GuildFeedbackRedPoint || game.GuildCache.GuildAttendancesRedPoint;
        };
        GuildUtils.GuildRecruitmentPoint = function () {
            game.GuildCache.GuildRecruitmentPoint = false;
            for (var i = 0; i < game.GuildRecruitmentData.recruits.length; i++) {
                if (!game.GuildRecruitmentData.recruits[i].gotReward && (game.GuildRecruitmentData.recruits[i].num >= game.GuildRecruitmentData.recruits[i].confNum)) {
                    game.GuildCache.GuildRecruitmentPoint = true;
                    break;
                }
            }
        };
        return GuildUtils;
    }());
    game.GuildUtils = GuildUtils;
    __reflect(GuildUtils.prototype, "game.GuildUtils");
})(game || (game = {}));
var guildModel;
//# sourceMappingURL=GuildModel.js.map