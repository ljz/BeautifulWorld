var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by zhouchuang on 16/9/21.
 */
var Const = (function () {
    function Const() {
    }
    //轮盘的type
    Const.RollerTypeMoney = 0;
    Const.RollerTypeEnergy = 1;
    Const.RollerTypeAttack = 2;
    Const.RollerTypeSteal = 3;
    Const.RollerTypeShield = 4;
    Const.MapGroupPos = [{ x: -183, y: 270 }, { x: 165, y: 269 }, { x: 507, y: 271 }];
    Const.BuildingName = ["风景", "船", "神兽", "建筑", "图腾"];
    Const.BuildingAttackPosX = [316, 476.5, 287, 265, 469];
    Const.BuildingAttackPosY = [550, 764, 658, 581, 610];
    Const.BOOMFlipPosX = [-100, 740, 100, 60, 740];
    Const.BOOMFlipPosY = [900, 950, 1100, 1100, 900];
    Const.BOOMPosX = [320, 360, 290, 305, 370];
    Const.BOOMPosY = [800, 960, 840, 870, 820];
    //炮弹偏移角度
    Const.boonm_fixX = [5, 50, 25, 20, 30];
    Const.moveTime1 = 600;
    Const.moveTime2 = 300;
    Const.moveTime3 = 500;
    Const.tweenTime1 = 800; //岛屿切换动画时间
    Const.tweenTime2 = 300; //底部切换动画时间
    Const.guideData = {
        "2": { "index": 0, "type": 0, "value": 2000 },
        "3": { "index": 6, "type": 0, "value": 5000 },
        "4": { "index": 7, "type": 1, "value": 10 },
        "5": { "index": 2, "type": 2, "value": 1 },
        "6": { "index": 3, "type": 0, "value": 15000 },
        "7": { "index": 3, "type": 0, "value": 2000 },
        "8": { "index": 3, "type": 0, "value": 15000 },
        "9": { "index": 4, "type": 4, "value": 1 },
        "10": { "index": 0, "type": 0, "value": 2000 },
        "11": { "index": 2, "type": 2, "value": 1 },
        "12": { "index": 8, "type": 0, "value": 25000 },
        "13": { "index": 9, "type": 3, "value": 1 } //偷取
    };
    Const.KingMoney = 415000; //新手引导偷取的金币数量
    Const.pet_Sleep = "sleep"; //睡觉
    Const.pet_Wait = "wait"; //待机
    Const.pet_Eat = "eat"; //吃
    Const.pet_Skill = "skill"; //护盾防御
    Const.pet_Enter = "enter"; //升级
    Const.greenColor = 0x19A91C; //绿色字体
    Const.grayColor = 0x5F5E5E; //灰色字体
    Const.blueColor = 0x2D6CA7; //蓝色字体
    Const.yellowColor = 0xC56B16; //黄色字体
    Const.purpleColor = 0x9B50DA; //紫色字体
    Const.orangeColor = 0xF6821B; //橙色字体
    Const.whiteColor = 0xFFFFFF; //白色字体
    Const.grayColor1 = 0x857C6E; //灰色字体
    //描边颜色
    Const.lightBlueStroke = 0x007684;
    Const.blueStroke = 0x0E50A1;
    Const.greenStroke = 0x1B7E04;
    Const.redStroke = 0xA71523;
    Const.yellowStroke = 0xAE5200;
    Const.grayStroke = 0x676767;
    //男女角色昵称颜值值
    Const.manNameColor = 0x00A4EF;
    Const.womanNameColor = 0xF56095;
    //需要异步加载的音效文件
    Const.SoundLoadArray = ["wheel_button_down", "panel_open", "panel_close", "wheel_rot_start"];
    Const.worldMapIsland1 = 22; //世界地图亚洲岛数
    Const.worldMapIsland2 = 25; //世界地图欧洲岛数
    Const.worldMapIsland3 = 22; //世界地图美洲岛数
    Const.worldMapIsland4 = 16; //世界地图北非岛数
    //热云
    Const.H5AppId = "24aeccab4b210e9ccc7fc27c8cc86dae";
    Const.WXAppId = "511a868cc10712235b6ec779c35f8baf";
    Const.gashaponNames = ["", "鸣人鹅", "悟空鹅", "柯南鹅", "马里奥鹅", "皮卡丘鹅", "海盗鹅"];
    Const.octopusNames = ["", "酒杯", "钩子", "望远镜", "短刀", "火枪", "海盗帽"];
    Const.moonCakeNames = ["", "腊八豆", "腊八蒜", "腊八豆腐", "腊八面", "腊八粥"];
    Const.annualFontNames = ["", "劳", "动", "人", "民", "最", "光", "荣"];
    Const.dragonBoatNames = {
        zongzi1: "板栗粽",
        zongzi2: "豆沙粽",
        zongzi3: "鲜肉粽",
        zongzi4: "蛋黄肉粽",
        zongzi5: "蜜枣粽"
    };
    //功能类型
    Const.JigsawType = "jigsaw";
    Const.GashaponType = "gashapon";
    Const.BeachType = "beach";
    Const.GuildType = "guild";
    Const.MineType = "mine";
    Const.MonsterType = "monster";
    Const.OctopusType = "octopus";
    Const.MoonCakeType = "moonCake";
    Const.AnnualType = "annual";
    Const.KiteType = "kite";
    Const.AnnualRebate = "annualRebate";
    Const.AnnualLuckyBox = "annualLuckyBox";
    Const.PetType = "pet";
    Const.BeachSailorType = "beachSailor";
    Const.PlaneType = "plane";
    Const.RealName = "realname";
    Const.donateJigsawCount = 5;
    Const.FlowerRebate = "FlowerRebate";
    Const.DragonBoatType = "dragonBoat";
    Const.WorldCupType = "worldCupType";
    Const.BeachGoldNugget = "beachGoldNugget"; //沙滩收藏家金块
    Const.Bet2Type = "bet2"; //多倍转盘次数
    Const.Bet3Type = "bet3"; //3倍转盘次数
    Const.Bet4Type = "bet4"; //4倍转盘次数
    Const.Bet5Type = "bet5"; //5倍转盘次数
    Const.RecruitType = "recruit"; //招募令
    Const.CoupleType = "couple"; //CP系统
    //限制-------start---------
    Const.OpenBtnLimit = 20; //功能开启按钮的显示限制
    Const.betLimit = 30; //多倍转盘的限制
    Const.LimitText_15 = "30星开启";
    Const.octopusLimit = 55; //进入大章鱼限制
    Const.LimitText_16 = "55星开启"; //进入大章鱼限制
    Const.monsterLimit = 90; //进入打怪兽限制
    Const.LimitText_17 = "90星开启"; //打怪兽限制
    Const.mineLimit = 70; //进入金矿限制
    Const.LimitText_18 = "70星开启"; //金矿限制
    Const.beachLimit = 4; //进入暮光海岸限制
    Const.beachLimitText = "日本开启"; //进入暮光海岸限制
    Const.guildOpenLimit = 101; //海盗团展示开启
    Const.guildLimit = 120; //海盗团开启
    Const.LimitText_20 = "120星开启"; //进入海盗团
    Const.petOpenLimit = 91; //宠物显示限制
    Const.petLimit = 100; //进入宠物限制
    Const.LimitText_21 = "100星开启"; //宠物限制
    Const.bet3Limit = 110; //多倍转盘的限制
    Const.LimitText_35 = "110星开启";
    Const.bet4Limit = 280; //多倍转盘的限制
    Const.LimitText_36 = "280星开启";
    Const.bet5Limit = 500; //多倍转盘的限制
    Const.LimitText_37 = "500星开启";
    Const.mapLimit = 25; //地图
    Const.coupleLimit = 85; //CP系统的限制
    Const.coupleLimitText = "85星转转盘开启";
    Const.recruitLimit = 120; //招募令的限制
    Const.recruitLimitText = "达到120星将开启招募令";
    //轮盘转的次数
    Const.FocusLimit = 48; //关注公众号
    Const.CommonUseLimit = 40; //常用小游戏
    Const.DailyEnergyLimit = 40; //每日能量
    Const.DailyRedBagLimit = 50; //夏日能量
    Const.InviteLimit = 80; //邀请奖励
    Const.RecallLimit = 500; //召回奖励
    Const.MoneyBoxLimit = 15; //金币宝箱
    Const.InviteVipLimit = 500; //免费vip
    Const.JigsawLimit = 54; //拼图碎片    
    Const.AllinoneLimit = 600; //万能碎片 
    //限制-------end---------
    //聊天进入的时候选择的类型-查看用户的信息
    Const.QuickFriend = "quickFriend"; //好友推荐进入
    Const.WorldChat = "worldChat"; //世界聊天进入
    Const.FriendInfo = "friendInfo"; //好友界面进入
    Const.Buildings = "buildings"; //岛屿进入
    Const.ChatPerson = "ChatPerson"; //私聊进入
    Const.NewsAndMails = "NewsAndMails"; //消息进入
    Const.GuildsChat = "GuildsChat"; //工会聊天进入
    Const.PlaneRank = "planeRank"; //飞机排行榜进入
    Const.PlaneLogs = "PlaneLogs"; //飞机战绩进入
    Const.FriendCity = "friendCity"; //同城交友
    Const.RankToIsland = "rank"; //排行榜
    Const.HateToIsland = "hate"; //仇人榜
    Const.RecallToIsland = "recall"; //老船长回归
    Const.RecallTaskToIsland = "recallTask"; //老船长回归
    Const.ShareCheerToIsland = "ShareCheerToIsland"; //邀请助力礼包
    Const.BoaterUserInfo = "BoaterUserInfo"; //船员系统查看信息
    Const.islandVersion = "2.0.5";
    Const.MapIslandVersion = "2.0.9";
    Const.JigsawVersion = "2.0.0";
    Const.ShareImageVersion = "2.0.0";
    Const.BannerImageVersion = "2.2.0";
    Const.Hamburger = "hamburger";
    Const.MagicBook = "magicBook";
    Const.BeachPowerPotion = "beachPowerPotion";
    Const.BottomLayer = "bottomLayer";
    Const.EffectLayer = "effectLayer";
    Const.UiLayer = "uiLayer";
    Const.FightLayer = "fightLayer";
    Const.MainLayer = "mainLayer";
    Const.HighestLayer = "highestLayer";
    Const.SpecialLayer = "specialLayer";
    Const.RealHighestLayer = "realHighestLayer";
    Const.NormalStr = "normal"; //判断小游戏中是否是特殊机型--正常
    Const.SpecialStr = "special"; //判断小游戏中是否是特殊机型--带头帘机型例如iPhone X
    Const.IOS = "iOS"; //苹果手机
    Const.Android = "Android"; //安卓手机
    Const.btnOffY = 90; //按钮之间的间距
    Const.SpecialMobileOffY = 50; //小游戏中iphonex，主界面右侧按钮的下移距离
    //分享的类型
    Const.default = "default"; //默认的分享
    Const.island = "island"; //过岛
    Const.boost = "boost"; //沙滩助威
    Const.boostCheer = "boostCheer"; //沙滩大螃蟹助威
    Const.boostInvite = "boostInvite"; //沙滩邀请水手
    Const.boostInviteGift = "boostInviteGift"; //沙滩助威邀请礼包
    Const.octopus = "octopus"; //章鱼宝箱
    Const.kiteAssist = "kiteAssist"; // 风筝助力
    Const.moonCake = "moonCake"; //收集活动
    Const.shareForGold = "shareForGold"; //多倍金币分享
    Const.shareForWxGold = "shareForWxGold"; //多倍金币分享-小游戏
    Const.inviteForVIP = "inviteForVIP"; //vip邀请
    Const.inviteForAllInOne = "inviteForAllInOne"; //万能碎片邀请
    Const.inviteGift = "inviteGift"; //邀请礼包分享
    Const.recruitment = "recruitment"; //招募令分享
    Const.monster = "monster"; //打怪兽分享
    Const.inviteMoney = "inviteMoney"; //邀请金币分享
    Const.annualCollect = "annualCollect"; //节日活动，例如抽签分享
    Const.treasure = "treasure"; //海盗宝箱分享
    Const.annualBalloon = "annualBalloon"; //节日气球分享
    Const.plane = "plane"; //飞机分享
    Const.recall = "recall"; //老船长召回分享
    Const.userRecall = "userRecall"; //老玩家召回分享
    Const.groupRank = "groupRank"; //群排行分享
    Const.wanbanInvite = "wanbanInvite"; //玩伴上线邀请
    Const.dayShare = "dayShare"; //每日分享
    Const.dayShare2 = "dayShare2"; //夏日能量
    Const.shieldShare = "shieldShare"; //护盾分享
    Const.flowerShare = "flower"; //鲜花活动
    Const.treasureMap = "treasureMap"; //宝藏地图
    Const.dragonBoat = "dragonBoat"; //端午活动分享助力
    Const.dragonBoatMoreRewards = "dragonBoatMoreRewards"; //分享得兑换额外奖励
    Const.redPackage = "redPackage"; //分享开红包
    Const.inviteReward = "inviteReward"; //邀请新人得奖励
    Const.carve = "carve"; //瓜分活动爱心加成
    Const.boaterHire = "boaterHire"; //船员招募分享
    Const.boaterHire2 = "boaterHire2"; //船员招募分享
    Const.boaterRecall = "boaterRecall"; //船员召回分享
    Const.tree = "tree"; //森林聚餐分享
    Const.worldCup = "worldCup"; //世界杯竞猜分享
    Const.worldCup2 = "WorldCup2"; //世界杯竞猜分享
    Const.shareCheer = "shareCheer"; //助力礼包
    Const.seniorDailyEnergy = "seniorDailyEnergy"; //高级夏日能量
    Const.GameClubInterFaceId = false; //游戏圈是否开启
    Const.chatLimitTime = 10; //世界聊天时间限制
    Const.videoType1 = 1; // 1 每日能量奖励 
    Const.videoType2 = 1; // 2 没能量时候看广告
    Const.Wheel_Energy = "getEnergy"; //轮盘转到能量
    Const.Wheel_Shield = "getShield"; //轮盘转到盾牌
    Const.Wheel_Steal = "getSteal"; //轮盘转到偷取
    Const.Wheel_Attack = "getAttack"; //轮盘转到攻击
    //微信小游戏
    Const.FocusInterFaceId = "client_focus"; //诱导关注id
    Const.ShareInterFaceId = "client_share"; //诱导分享
    Const.PayInterFaceId = "client_pay"; //诱导充值
    // static GameClubInterFaceId = "client_gameClub";//游戏圈
    Const.DayredbagCount = 5; //每日红包分享总次数
    Const.recallLeaveDays = 2; //离线重建天数
    // 海盗王分享类型
    Const.KingBarrierShare = "KingBarrierShare"; // 触礁分享
    Const.KingCircleShare = "KingCircleShare"; // 行走一圈分享
    Const.WXOpenImages = ["wanban_btn.png", "wanban_1.png", "wanban_1_1.png", "wanban_2.png", "wanban_2_1.png", "head_bg7.png", "wanban_star.png"]; //微信玩伴缓存图片
    Const.DeleteFriend = "deleteFriend"; //删除好友
    Const.AddFriend = "addFriend"; //添加好友
    Const.RankWindowBtnLeftX = 4;
    Const.RankWindowBtnRightX = 136;
    Const.RankWindowBtnLeftText = "世界排行";
    Const.RankWindowBtnRightText = "好友排行";
    Const.wxCanShowAd = false;
    //根据性别 名字、聊天字体颜色
    Const.genderCorlor1 = 0x00A4EF;
    Const.genderCorlor2 = 0xFF5997;
    Const.updateSelfRankUI = "updateSelfRankUI"; //排行榜中刷新自己的显示信息
    Const.rankUpdateFriendList = "rankUpdateFriendList"; //排行榜刷新好友列表
    Const.rankUpdateWorldList = "rankUpdateWorldList"; //排行榜刷新世界列表
    return Const;
}());
__reflect(Const.prototype, "Const");
var ShopConst = {
    Energy: "energy",
    Money: "money",
    Lolly: "lolly",
    GuildMedal: "guildMedal",
    DollCoin: "dollCoin",
    MiniShield: "miniShield",
    NewbieGift: "newbieGift",
    Potion: "potion",
    BeachPowerPotion: "beachPowerPotion",
    OccasionalGift: "occasionalGift",
    InviteGift: "inviteGift",
    Shipwreck: "shipwreck",
    FinishHatch: "finishHatch",
    SummonStone: "summonStone",
    Monthcard: "monthcard",
    Wanted: "wanted",
    Hamburger: "hamburger",
    NewYearGift: "newYearGift",
    Puffer: "puffer",
    DailyShop: "dailyShop",
    Horn: "horn",
    MagicBook: "magicBook",
    HelpGift: "helpGift",
    Cookie: "cookie",
    KillTitanCannonBall: "killTitanCannonBall",
    SpeedGift: "speedGift",
    DailyGift: "dailyGift",
    ExpPotion: "expPotion",
};
var Robot = {
    robot0: {
        name: "坤于林",
        headImg: "http://wx.qlogo.cn/mmopen/2WjhI7mNGxlfgPxZTXt2rohktC8JUB32rUHft8vCaWwrJYW6EVhH1eHyOP76ySzY6FtYpx8bibM5LknX7898fdMm1qNGol6pZ/0",
        crowns: 10,
        signature: ""
    },
    robot1: {
        name: "坤于林",
        headImg: "http://wx.qlogo.cn/mmopen/2WjhI7mNGxlfgPxZTXt2rohktC8JUB32rUHft8vCaWwrJYW6EVhH1eHyOP76ySzY6FtYpx8bibM5LknX7898fdMm1qNGol6pZ/0",
        crowns: 10,
        signature: ""
    },
    robot2: {
        name: "坤于林",
        headImg: "http://wx.qlogo.cn/mmopen/2WjhI7mNGxlfgPxZTXt2rohktC8JUB32rUHft8vCaWwrJYW6EVhH1eHyOP76ySzY6FtYpx8bibM5LknX7898fdMm1qNGol6pZ/0",
        crowns: 0,
        signature: ""
    },
    robotSteal: {
        name: "小公举",
        headImg: "billgates_png",
        crowns: 10,
        signature: ""
    },
};
//# sourceMappingURL=Const.js.map