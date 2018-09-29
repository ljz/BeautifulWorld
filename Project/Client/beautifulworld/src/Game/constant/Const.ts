/**
 * Created by zhouchuang on 16/9/21.
 */
class Const {
    //轮盘的type
    static RollerTypeMoney = 0;
    static RollerTypeEnergy = 1;
    static RollerTypeAttack = 2;
    static RollerTypeSteal = 3;
    static RollerTypeShield = 4;

    static MapGroupPos = [{ x: -183, y: 270 }, { x: 165, y: 269 }, { x: 507, y: 271 }];

    static BuildingName = ["风景", "船", "神兽", "建筑", "图腾"];
    static BuildingAttackPosX = [316, 476.5, 287, 265, 469];
    static BuildingAttackPosY = [550, 764, 658, 581, 610];
    static BOOMFlipPosX = [-100, 740, 100, 60, 740];
    static BOOMFlipPosY = [900, 950, 1100, 1100, 900];
    static BOOMPosX = [320, 360, 290, 305, 370];
    static BOOMPosY = [800, 960, 840, 870, 820];
    //炮弹偏移角度
    static boonm_fixX = [5, 50, 25, 20, 30];
    static moveTime1 = 600;
    static moveTime2 = 300;
    static moveTime3 = 500;

    static tweenTime1 = 800;//岛屿切换动画时间
    static tweenTime2 = 300;//底部切换动画时间

    static guideData = {
        "2": { "index": 0, "type": 0, "value": 2000 },//金币2000
        "3": { "index": 6, "type": 0, "value": 5000 },//金币5000
        "4": { "index": 7, "type": 1, "value": 10 },//体力
        "5": { "index": 2, "type": 2, "value": 1 },//攻击
        "6": { "index": 3, "type": 0, "value": 15000 },//金币15k
        "7": { "index": 3, "type": 0, "value": 2000 },//金币2k--->特殊处理，正常不需要用到
        "8": { "index": 3, "type": 0, "value": 15000 },//金币15k
        "9": { "index": 4, "type": 4, "value": 1 },//盾
        "10": { "index": 0, "type": 0, "value": 2000 },//金币2000
        "11": { "index": 2, "type": 2, "value": 1 },//攻击
        "12": { "index": 8, "type": 0, "value": 25000 },//金币25k
        "13": { "index": 9, "type": 3, "value": 1 }//偷取
    };
    static KingMoney = 415000;//新手引导偷取的金币数量

    static pet_Sleep = "sleep";//睡觉
    static pet_Wait = "wait";//待机
    static pet_Eat = "eat";//吃
    static pet_Skill = "skill";//护盾防御
    static pet_Enter = "enter";//升级


    static greenColor = 0x19A91C;//绿色字体
    static grayColor = 0x5F5E5E;//灰色字体
    static blueColor = 0x2D6CA7;//蓝色字体
    static yellowColor = 0xC56B16;//黄色字体
    static purpleColor = 0x9B50DA;//紫色字体
    static orangeColor = 0xF6821B;//橙色字体
    static whiteColor = 0xFFFFFF;//白色字体
    static grayColor1 = 0x857C6E;//灰色字体
    //描边颜色
    static lightBlueStroke = 0x007684;
    static blueStroke = 0x0E50A1;
    static greenStroke = 0x1B7E04;
    static redStroke = 0xA71523;
    static yellowStroke = 0xAE5200;
    static grayStroke = 0x676767;

    //男女角色昵称颜值值
    static manNameColor = 0x00A4EF;
    static womanNameColor = 0xF56095;

    //需要异步加载的音效文件
    static SoundLoadArray = ["wheel_button_down", "panel_open", "panel_close", "wheel_rot_start"];

    static worldMapIsland1 = 22;//世界地图亚洲岛数
    static worldMapIsland2 = 25;//世界地图欧洲岛数
    static worldMapIsland3 = 22;//世界地图美洲岛数
    static worldMapIsland4 = 16;//世界地图北非岛数

    //热云
    static H5AppId = "24aeccab4b210e9ccc7fc27c8cc86dae";
    static WXAppId = "511a868cc10712235b6ec779c35f8baf";

    static gashaponNames = ["", "鸣人鹅", "悟空鹅", "柯南鹅", "马里奥鹅", "皮卡丘鹅", "海盗鹅"];
    static octopusNames = ["", "酒杯", "钩子", "望远镜", "短刀", "火枪", "海盗帽"];
    static moonCakeNames = ["", "腊八豆", "腊八蒜", "腊八豆腐", "腊八面", "腊八粥"];
    static annualFontNames = ["", "劳", "动", "人", "民", "最", "光", "荣"];
    static dragonBoatNames = {
        zongzi1: "板栗粽",
        zongzi2: "豆沙粽",
        zongzi3: "鲜肉粽",
        zongzi4: "蛋黄肉粽",
        zongzi5: "蜜枣粽"
    }
    //功能类型
    static JigsawType = "jigsaw";
    static GashaponType = "gashapon";
    static BeachType = "beach";
    static GuildType = "guild";
    static MineType = "mine";
    static MonsterType = "monster";
    static OctopusType = "octopus";
    static MoonCakeType = "moonCake";
    static AnnualType = "annual";
    static KiteType = "kite";
    static AnnualRebate = "annualRebate";
    static AnnualLuckyBox = "annualLuckyBox";
    static PetType = "pet";
    static BeachSailorType = "beachSailor";
    static PlaneType = "plane";
    static RealName = "realname";
    static donateJigsawCount = 5;
    static FlowerRebate = "FlowerRebate";
    static DragonBoatType = "dragonBoat";
    static WorldCupType = "worldCupType";
    static BeachGoldNugget = "beachGoldNugget";//沙滩收藏家金块
    static Bet2Type = "bet2";//多倍转盘次数
    static Bet3Type = "bet3";//3倍转盘次数
    static Bet4Type = "bet4";//4倍转盘次数
    static Bet5Type = "bet5";//5倍转盘次数
    static RecruitType = "recruit";//招募令
    static CoupleType = "couple";//CP系统

    //限制-------start---------

    static OpenBtnLimit = 20;//功能开启按钮的显示限制
    static betLimit = 30;//多倍转盘的限制
    static LimitText_15 = "30星开启";

    static octopusLimit = 55;//进入大章鱼限制
    static LimitText_16 = "55星开启";//进入大章鱼限制

    static monsterLimit = 90;//进入打怪兽限制
    static LimitText_17 = "90星开启";//打怪兽限制

    static mineLimit = 70;//进入金矿限制
    static LimitText_18 = "70星开启";//金矿限制

    static beachLimit = 4;//进入暮光海岸限制
    static beachLimitText = "日本开启";//进入暮光海岸限制

    static guildOpenLimit = 101;//海盗团展示开启
    static guildLimit = 120;//海盗团开启
    static LimitText_20 = "120星开启";//进入海盗团

    static petOpenLimit = 91;//宠物显示限制
    static petLimit = 100;//进入宠物限制
    static LimitText_21 = "100星开启";//宠物限制

    static bet3Limit = 110;//多倍转盘的限制
    static LimitText_35 = "110星开启";
    static bet4Limit = 280;//多倍转盘的限制
    static LimitText_36 = "280星开启";
    static bet5Limit = 500;//多倍转盘的限制
    static LimitText_37 = "500星开启";

    static mapLimit = 25;//地图

    static coupleLimit = 85;//CP系统的限制
    static coupleLimitText = "85星转转盘开启";

    static recruitLimit = 120;//招募令的限制
    static recruitLimitText = "达到120星将开启招募令";

    //轮盘转的次数
    static FocusLimit = 48;//关注公众号
    static CommonUseLimit = 40;//常用小游戏
    static DailyEnergyLimit = 40;//每日能量
    static DailyRedBagLimit = 50;//夏日能量
    static InviteLimit = 80;//邀请奖励
    static RecallLimit = 500;//召回奖励
    static MoneyBoxLimit = 15;//金币宝箱
    static InviteVipLimit = 500;//免费vip
    static JigsawLimit = 54;//拼图碎片    
    static AllinoneLimit = 600;//万能碎片 
    //限制-------end---------

    //聊天进入的时候选择的类型-查看用户的信息
    static QuickFriend = "quickFriend";//好友推荐进入
    static WorldChat = "worldChat";//世界聊天进入
    static FriendInfo = "friendInfo";//好友界面进入
    static Buildings = "buildings";//岛屿进入
    static ChatPerson = "ChatPerson";//私聊进入
    static NewsAndMails = "NewsAndMails";//消息进入
    static GuildsChat = "GuildsChat";//工会聊天进入
    static PlaneRank = "planeRank";//飞机排行榜进入
    static PlaneLogs = "PlaneLogs";//飞机战绩进入
    static FriendCity = "friendCity";//同城交友
    static RankToIsland = "rank";//排行榜
    static HateToIsland = "hate";//仇人榜
    static RecallToIsland = "recall";//老船长回归
    static RecallTaskToIsland = "recallTask";//老船长回归
    static ShareCheerToIsland = "ShareCheerToIsland";//邀请助力礼包
    static BoaterUserInfo = "BoaterUserInfo";//船员系统查看信息

    static islandVersion = "2.0.5";
    static MapIslandVersion = "2.0.9";
    static JigsawVersion = "2.0.0";
    static ShareImageVersion = "2.0.0";
    static BannerImageVersion = "2.2.0";

    static Hamburger = "hamburger";
    static MagicBook = "magicBook";
    static BeachPowerPotion = "beachPowerPotion";

    static BottomLayer = "bottomLayer";
    static EffectLayer = "effectLayer";
    static UiLayer = "uiLayer";
    static FightLayer = "fightLayer";
    static MainLayer = "mainLayer";
    static HighestLayer = "highestLayer";
    static SpecialLayer = "specialLayer";
    static RealHighestLayer = "realHighestLayer";

    static NormalStr = "normal";//判断小游戏中是否是特殊机型--正常
    static SpecialStr = "special";//判断小游戏中是否是特殊机型--带头帘机型例如iPhone X
    static IOS = "iOS";//苹果手机
    static Android = "Android";//安卓手机

    static btnOffY = 90;//按钮之间的间距
    static SpecialMobileOffY = 50;//小游戏中iphonex，主界面右侧按钮的下移距离

    //分享的类型
    static default = "default";//默认的分享
    static island = "island";//过岛
    static boost = "boost";//沙滩助威
    static boostCheer = "boostCheer";//沙滩大螃蟹助威
    static boostInvite = "boostInvite";//沙滩邀请水手
    static boostInviteGift = "boostInviteGift";//沙滩助威邀请礼包
    static octopus = "octopus";//章鱼宝箱
    static kiteAssist = "kiteAssist";// 风筝助力
    static moonCake = "moonCake";//收集活动
    static shareForGold = "shareForGold";//多倍金币分享
    static shareForWxGold = "shareForWxGold";//多倍金币分享-小游戏
    static inviteForVIP = "inviteForVIP";//vip邀请
    static inviteForAllInOne = "inviteForAllInOne";//万能碎片邀请
    static inviteGift = "inviteGift";//邀请礼包分享
    static recruitment = "recruitment";//招募令分享
    static monster = "monster";//打怪兽分享
    static inviteMoney = "inviteMoney";//邀请金币分享
    static annualCollect = "annualCollect";//节日活动，例如抽签分享
    static treasure = "treasure";//海盗宝箱分享
    static annualBalloon = "annualBalloon";//节日气球分享
    static plane = "plane";//飞机分享
    static recall = "recall";//老船长召回分享
    static userRecall = "userRecall";//老玩家召回分享
    static groupRank = "groupRank";//群排行分享
    static wanbanInvite = "wanbanInvite";//玩伴上线邀请
    static dayShare = "dayShare";//每日分享
    static dayShare2 = "dayShare2";//夏日能量
    static shieldShare = "shieldShare";//护盾分享
    static flowerShare = "flower";//鲜花活动
    static treasureMap = "treasureMap";//宝藏地图
    static dragonBoat = "dragonBoat";//端午活动分享助力
    static dragonBoatMoreRewards = "dragonBoatMoreRewards";//分享得兑换额外奖励
    static redPackage = "redPackage";//分享开红包
    static inviteReward = "inviteReward";//邀请新人得奖励
    static carve = "carve";//瓜分活动爱心加成
    static boaterHire = "boaterHire";//船员招募分享
    static boaterHire2 = "boaterHire2";//船员招募分享
    static boaterRecall = "boaterRecall";//船员召回分享
    static tree = "tree";//森林聚餐分享
    static worldCup = "worldCup";   //世界杯竞猜分享
    static worldCup2 = "WorldCup2";   //世界杯竞猜分享
    static shareCheer = "shareCheer";//助力礼包
    static seniorDailyEnergy = "seniorDailyEnergy";//高级夏日能量
    static GameClubInterFaceId = false;//游戏圈是否开启

    static chatLimitTime = 10;//世界聊天时间限制

    static videoType1: number = 1;// 1 每日能量奖励 
    static videoType2: number = 1;// 2 没能量时候看广告

    static Wheel_Energy = "getEnergy";//轮盘转到能量
    static Wheel_Shield = "getShield";//轮盘转到盾牌
    static Wheel_Steal = "getSteal";//轮盘转到偷取
    static Wheel_Attack = "getAttack";//轮盘转到攻击

    //微信小游戏
    static FocusInterFaceId = "client_focus";//诱导关注id
    static ShareInterFaceId = "client_share";//诱导分享
    static PayInterFaceId = "client_pay";//诱导充值
    // static GameClubInterFaceId = "client_gameClub";//游戏圈

    static DayredbagCount: number = 5;//每日红包分享总次数
    static recallLeaveDays: number = 2;//离线重建天数
    // 海盗王分享类型
    static KingBarrierShare = "KingBarrierShare";// 触礁分享
    static KingCircleShare = "KingCircleShare";// 行走一圈分享

    static WXOpenImages = ["wanban_btn.png", "wanban_1.png", "wanban_1_1.png", "wanban_2.png", "wanban_2_1.png", "head_bg7.png", "wanban_star.png"];//微信玩伴缓存图片
    static DeleteFriend = "deleteFriend";//删除好友
    static AddFriend = "addFriend";//添加好友
    static RankWindowBtnLeftX = 4;
    static RankWindowBtnRightX = 136;
    static RankWindowBtnLeftText = "世界排行";
    static RankWindowBtnRightText = "好友排行";
    static wxCanShowAd = false;
    //根据性别 名字、聊天字体颜色
    static genderCorlor1 = 0x00A4EF;
    static genderCorlor2 = 0xFF5997;

    static updateSelfRankUI = "updateSelfRankUI";//排行榜中刷新自己的显示信息
    static rankUpdateFriendList = "rankUpdateFriendList";//排行榜刷新好友列表
    static rankUpdateWorldList = "rankUpdateWorldList";//排行榜刷新世界列表
}

const ShopConst = {
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
}

let Robot = {
    robot0: {
        name: "坤于林",
        headImg: "http://wx.qlogo.cn/mmopen/2WjhI7mNGxlfgPxZTXt2rohktC8JUB32rUHft8vCaWwrJYW6EVhH1eHyOP76ySzY6FtYpx8bibM5LknX7898fdMm1qNGol6pZ/0",
        crowns: 10,
        signature: ""
    },//第一个攻击的机器人或者是随机的假好友
    robot1: {
        name: "坤于林",
        headImg: "http://wx.qlogo.cn/mmopen/2WjhI7mNGxlfgPxZTXt2rohktC8JUB32rUHft8vCaWwrJYW6EVhH1eHyOP76ySzY6FtYpx8bibM5LknX7898fdMm1qNGol6pZ/0",
        crowns: 10,
        signature: ""
    },//11步随机的复仇的人
    robot2: {
        name: "坤于林",
        headImg: "http://wx.qlogo.cn/mmopen/2WjhI7mNGxlfgPxZTXt2rohktC8JUB32rUHft8vCaWwrJYW6EVhH1eHyOP76ySzY6FtYpx8bibM5LknX7898fdMm1qNGol6pZ/0",
        crowns: 0,
        signature: ""
    },//11步随机的机器人
    robotSteal: {
        name: "小公举",
        headImg: "billgates_png",
        crowns: 10,
        signature: ""
    },//富豪随机的机器人
}