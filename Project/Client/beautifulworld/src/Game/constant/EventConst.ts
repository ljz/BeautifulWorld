/**
 * Created by zhouchuang on 16/9/7.
 */
var EventConst = {
    Test: "changeFroze",


    MovieClip_COMPLETE: "movieClipComplete",//序列帧播放完毕
    GoldChange: "goldChange",//金币变化
    EnergyChange: "EnergyChange",//体力变化
    CrownsChange: "CrownsChange",//星星数变化
    RefreshBuilds: "RefreshBuilds",//刷新建筑
    ShieldChange: "shieldChange",//盾牌变化
    OpenMenuBtn: "OpenMenuBtn",//显示菜单所有按钮
    CloseMenuBtn: "CloseMenuBtn",//隐藏菜单按钮
    AttackTarget: "AttackTarget",//选择攻击目标
    CloseShareUI: "CloseShareUI",//关闭分享界面
    RefreshFreeEnergy: "RefreshFreeEnergy",//刷新免费能量界面的已领取
    openDAPAO: "openDAPAO",//大炮
    closeDAPAO: "closeDAPAO",//大炮
    IslandMove: "IslandMove",//岛位移事件
    IslandMoveBack: "IslandMoveBack",//岛位移事件
    WheelMove: "WheelMove",//轮盘位移事件
    WheelForAttack: "WheelForAttack",//轮盘转到攻击
    WheelForAttackBack: "WheelForAttackBack",//攻击结束返回轮盘
    WheelForSteal: "WheelForSteal",//轮盘转到偷取
    WheelForStealBack: "WheelForStealBack",//偷取结束返回轮盘
    WheelForStealOver: "WheelForStealOver",//偷取结束返回轮盘
    CloudGO: "CloudGO",//云朵返回返回轮盘
    CloudBACK: "CloudBACK",//偷取结束返回轮盘
    AdjustDAPAO: "AdjustDAPAO",//调整大炮位置
    AdjustDAPAOOver: "AdjustDAPAOOver",//调整大炮位置结束
    islandOver: "islandOver",//岛屿建造完成
    toBuild: "toBuild",//菜单去建岛
    BuildOrFixEffect: "BuildOrFixEffect",//建筑或修理动画
    BuyMiner: "buyMiner",//购买矿工
    RefreshButton: "RefreshButton",//刷新按钮
    RefreshHateNode: "RefreshHateNode",//刷新仇人列表
    hiddenAttackTop: "hiddenAttackTop",//隐藏攻击顶部菜单栏
    RequestError: "requestError",//post或者get请求出现问题
    toRankIslands: "toRankIslands",//点击排行查看信息
    toRankIslandsNew: "toRankIslandsNew",//再次点击点击排行查看信息
    WheelForRank: "WheelForRank",//点击排行查看他人信息动画
    WheelForRankBack: "WheelForRankBack",//点击排行查看他人信息动画
    toRankIslandsBack: "toRankIslandsBack",//点击排行查看他人信息动画
    CrownsChangeEffect: "CrownsChangeEffect",//增加星星动画
    AllIslandOver: "AllIslandOver",//所有岛屿建造完成
    ShowMapBtn: "ShowMapBtn",//新手引导控制地图按钮
    MenuRedPoint: "MenuRedPoint",//菜单按钮红点
    FoldBtnRedPoint: "FoldBtnRedPoint",//fold按钮红点
    loginRewardRedPoint: "loginRewardRedPoint",//每日登录红点
    RefreshFriendList: "RefreshFriendList",//可以领取的体力
    GuideOver: "guideOver",//新手引导结束
    GuideMark: "guideMark",//新手引导记录
    toBuildRedPointOpen: "toBuildRedPointOpen",//去建设岛屿红点显示
    toBuildRedPointClose: "toBuildRedPointClose",//去建设岛屿红点关闭
    IsShowBtnGroup: "isShowBtnGroup",//右侧的按钮是否显示
    GetSeniorShareEnergy: "GetSeniorShareEnergy",//播放获得高级每日能量奖励的动画
    PlayOpenShareEnergyBoxAnim: "PlayOpenShareEnergyBoxAnim",//播放高级每日能量奖励宝箱打开的动画
    QuickFriendTip: "QuickFriendTip",//显示推荐好友冒泡

    DailyRewardRefresh: "dailyRewardRefresh",//领取签到奖励

    UseJigsaw: "useJigsaw", //使用拼图碎片
    sendJigsaw: "sendJigsaw",//赠送拼图碎片
    CheckJigsawGift: "checkJigsawGift",//检测拼图礼包
    JigsawRefreshTop: "jigsawRefreshTop",//刷新拼图上部分
    JigsawRedPoint: "jigsawRedPoint",//拼图消息红点

    KiteRecvMaterial: "KiteRecvMaterial", // 成功接收材料

    RecallTakeInviteGift: "RecallTakeInviteGift", // 领取被邀请人完成任务之后获得的奖励
    RecallPrivateChatTask: "RecallPrivateChatTesk", // 完成私聊任务

    DealFriendAdd: "dealFriendAdd",//处理好友申请
    MessageRefresh: "messageRefresh",//处理消息
    MailRefresh: "mailRefresh",//处理邮件
    MailSetBan: "mailSetBan",//设置邮件黑名单

    refreshPetStatus: "refreshPetStatus",//刷新宠物状态
    // GuideHideButtonLayer: "GuideHideButtonLayer",//新手引导隐藏buttonLayer
    // GuideShowButtonLayer: "GuideShowButtonLayer",//新手引导显示buttonLayer
    EggHatchOver: "EggHatchOver",//宠物蛋孵化完成
    // RefresMainUIBtnTime: "RefresMainUIBtnTime",
    openButtonLayerButton: "openButtonLayerButton",// buttonlayer按钮
    RefreshPetProps: "RefreshPetProps",// 刷新宠物道具个数
    closeFocusPoint: "closeFocusPoint",// 关闭关注按钮红点
    // addExpEffect: "addExpEffect",// 宠物转盘增加经验
    petGroupDown: "petGroupDown",// 宠物shang sheng
    petGroupUp: "petGroupUp",// 宠物 xiajiang
    hideBuildGroup: "hideBuildGroup",// 宠物 xiajiang
    refreshTaptitansItemCount: "refreshShellCount",//刷新副本打怪兽炮弹
    refreshTaptitansBtnPoint: "refreshTaptitansBtnPoint",//刷新副本打怪兽小红点
    MiniShieldUsed: "MiniShieldUsed",//使用了迷你盾
    MiniShieldRefresh: "MiniShieldRefresh",//刷新迷你盾使用情况
    worldMapRefreshFriendsCountLabel: "worldMapRefreshFriendsCountLabel",//刷新世界地图展示好友个数
    RefreshWorldMapFriends: "RefreshWorldMapFriends",//刷新世界地图展示的好友
    RefreshWorldMapView: "refreshWorldMapView",//刷新世界地图的icon，锁或者是小旗子
    initDoubleGold: "initDoubleGold",//刷新双倍金币活动
    openRecallTips: "openRecallTips",//召回玩家分享提示
    RecallRewardPoint: "RecallRewardPoint",//召回玩家领取奖励后

    SetSignature: "setSignature",//设置签名
    RefreshTreasureUI: "RefreshTreasureUI",//刷新海盗宝藏

    TreasureOpenBox: "TreasureOpenBox",//treasure活动打开宝箱
    refreshTreasureJoinCount: "refreshTreasureJoinCount",//treasure
    TreasureGoldEffect: "TreasureGoldEffect",//treasure
    SendOctopus: "SendOctopus",//treasure
    updateMoonCake: "updateMoonCake",//treasure
    updateMoonCakeBox: "updateMoonCakeBox",//treasure
    GetOctopus: "GetOctopus",//treasure
    GetMoonCake: "GetMoonCake",//treasure
    OctopusRedPoint: "OctopusRedPoint",//treasure

    OctopusRefresh: "OctopusRefresh",//唤醒章鱼
    refreshOctopusProp: "refreshOctopusProp",//刷新打章鱼活动道具
    RefreshOctopusFriendsList: "RefreshOctopusFriendsList",//刷新打章鱼活动好友列表
    OctopusPlayerHide: "octopusPlayerHide",//头像弹上去
    openCloudEffect: "openCloudEffect",//云层打开关闭
    OctopusRefreshGift: "octopusRefreshGift",//刷新礼物和爪子状态
    OctopusDown: "octopusDown",//下沉
    OctopusUp: "octopusUp",//上浮
    TreasureWSNews: "TreasureWSNews",//treasure长连接消息
    TreasureVersion: "TreasureVersion",//treasure长连接消息
    TreasureCloseEffect: "TreasureCloseEffect",//treasure长连接消息
    guildChatMsg: "guildChatMsg",//工会聊天
    guildDonateJigsawSelected: "guildDonateJigsawSelected",//碎片请求选择
    guildDeleteMessage: "guildDeleteMessage",//删除工会聊天内容
    GuildSetting: "guildSetting",//公会设置
    GuildDutyChange: "guildDutyChange",//公会成员职务改变
    guildDonateJigsawClose: "guildDonateJigsawClose",//关闭捐赠界面
    guildDonateRefreshCounts: "guildDonateRefreshCounts",//刷新赠送请求
    GuildChatNodeRefresh: "GuildChatNodeRefresh",//刷新聊天node
    GuildQuitMem: "GuildQuitMem",//开除公会成员
    GuildDealApplyMember: "guildDealApplyMember",//处理公会申请列表中的人
    quitGuild: "quitGuild",//离开公会
    GuildSignReward: "guildSignReward",//签到获得奖励
    GuildMemberChange: "guildMemberChange",//成员数量改变
    GuildHallRefresh: "guildHallRefresh",//刷新大厅界面
    GuildGetTaskReward: "guildGetTaskReward",//领取海盗团任务
    refreshJigsawDonate: "refreshJigsawDonate",//刷新赠送碎片次数
    GuildTaskGoTo: "guildTaskGoTo",//公会任务跳转
    refreshGuildRedPoint: "refreshGuildRedPoint",//公会红点刷新
    PlayGuildTaskMC: "playGuildTaskMC",//播放公会tasknode序列帧
    refreshGuildNoticeBtn: "refreshGuildNoticeBtn",//刷新海盗团公告按钮
    GuildBuyMedal: "guildBuyMedal",//购买海盗勋章
    refreshCashNums: "refreshCashNums",//刷新红包数字
    shareTypeChange: "shareTypeChange",//分享修改
    RefreshBalance: "refreshBalance",//刷新红包余额
    ShareRedBagBack: "shareRedBagBack",//分享红包之后的回调
    closeNotices: "closeNotices",//关闭系统广播
    closeMenuView: "closeMenuView",//关闭菜单界面
    PassIslandOver: "passIslandOver",//过岛重置轮盘的位置
    ShieldEffect: "ShieldEffect",//盾牌和保护罩事件

    ClearAllApplyFriend: "clearAllApplyFriend",//忽略全部好友申请
    DeleteFriend: "deleteFriend",//删除好友
    AddFriend: "addFriend",//添加好友
    RefreshTaptitansRewardUI: "RefreshTaptitansRewardUI",//添加好友
    gainIslandShare: "gainIslandShare",//添加好友
    sailingMatchAdjustBoat: "sailingMatchAdjustBoat",//帆船赛点击积分调整到对应位置
    refreshMatchRank: "refreshMatchRank",//帆船赛点击积分调整到对应位置

    SailingCloseTask: "sailingCloseTask",//帆船赛的推送，其他人任务完成，任务放弃,任务失败
    SailingGetTask: "sailingGetTask",//帆船赛的推送，其他人接受任务
    SailingTearUpTask: "sailingTearUpTask",//帆船赛的推送，其他人撕毁任务
    SailingOver: "sailingOver",//帆船赛结束
    SailingStart: "sailingStart",//帆船赛开始
    SailingGetReward: "sailingGetReward",//领取帆船赛积分奖励
    openChatPersonDelButton: "openChatPersonDelButton",//显示chat person 删除按钮

    WorldChatMsg: "worldChatMsg",//世界聊天
    PersonChatMsg: "personChatMsg",//私人聊天
    refreshHornCount: "refreshHornCount",//刷新喇叭数量
    refreshChatPrivateList: "refreshChatPrivateList",//刷新私聊list

    Guide11Next: "guide11Next",//新手引导11步特殊处理，点击确认按钮继续在转盘引导
    ShareSuccess: "shareSuccess",//分享成功
    RefreshWheelRedPoint: "refreshWheelRedPoint",//刷新转盘界面按钮上面的红点

    RefreshCollection: "refreshCollection",//刷新海滩收藏品
    GetCollection: "getCollection",//获得好友赠送的收藏品
    RefreshBeachPropNode: "RefreshBeachPropNode",//刷新海滩道具node
    playEffectAlphaOut: "playEffectAlphaOut",//海滩道具node渐隐出去
    RefreshMagicBookCount: "refreshMagicBookCount",//刷新加急订单数量
    closeBeachNodeAlert: "closeBeachNodeAlert",//关闭PropAlertView
    ReBeachPowerView: "reBeachPowerView",//刷新沙滩主界面的体力显示


    RefreshOctopusRedPoint: "refreshOctopusRedPoint",//刷新大章鱼界面的红点
    RefreshMapRedPoint: "refreshMapRedPoint",//刷新地图的红点
    refreshFeedbackNode: "refreshFeedbackNode",//刷新回馈礼包node

    RefreshBeachRandom: "refreshBeachRandom",//沙滩随机人node
    SailingStopAction: "SailingStopAction",//帆船赛停止动画
    SailingreStartAction: "SailingreStartAction",//帆船赛继续动画
    refreshMysticalEnergyNode: "refreshMysticalEnergyNode",//刷新神秘商人能量node
    refreshMysticalMoneyNode: "refreshMysticalMoneyNode",//刷新神秘商人金币node

    GetDoubleMoneyCard: "getDoubleMoneyCard",//获得双倍金币卡，刷新轮盘界面
    NightPlayerNode: "NightPlayerNode",//飞机竞速playernode事件
    planeAttackPlayers: "planeAttackPlayers",//飞机竞速攻击

    CheckPaoLock: "checkPaoLock",//轮盘界面是否显示锁定的炮
    WorldMapFriendsGroup: "WorldMapFriendsGroup",//地图事件
    treasureMapDigEvent: "treasureMapDigEvent",//treasureMap
    RBListRefresh: "rbListRefresh",//每日红包刷新列表
    DailyRedPoint: "dailyRedPoint",//每日奖励红点显示

    updateDragonBoatTileData: "updateDragonBoatTileData",//dragonBoat
    GetActivityProp: "getActivityProp",//获取活动的赠送的物品
    updateOrdreHelpData: "updateOrdreHelpData",
    CloseKingEventPanel: "CloseKingEventPanel",// 海盗王活动中，道具使用完毕
    CloseKingFriend: "CloseKingFriend",// 关闭海盗王好友面板
    UpdateBoaterBuff: "UpdateBoaterBuff",//更新船员buff
    RefreshInviteRedPoint: "refreshInviteRedPoint",//刷新邀请界面的红点显示
    ReceiveNotification: "ReceiveNotification",//收到推送通知

    CoupleDivorce: "CoupleDivorce", //cp 分手 
    CPShieldChange: "CPShieldChange", //cp 盾牌的刷新
    OPENFULLBOX_FINISH: "OpenBoxFinish", //打开箱子动画完成
    WXCLUBBUTTONHIDE: "WXCLUBBUTTONHIDE", //游戏圈按钮隐藏
    WXCLUBBUTTONSHOW: "WXCLUBBUTTONSHOW", //游戏圈按钮显示

    //打点需要用到的相关事件
    ReportEnergyCost: "ReportEnergyCost", //转盘能量消耗    
    ReportOctopusOpen: "ReportOctopusOpen", //打章鱼 
    ReportAttackTitan: "ReportAttackTitan",//打怪兽
    ReportSendPrivateMsg: "ReportSendPrivateMsg",//发送私聊消息
    ReportGetFriendEnergy: "ReportGetFriendEnergy",//领取好友能量
    ReportJigsawComplete: "ReportJigsawComplete",//完成拼图
    ReportGive: "ReportGive",//完成赠送
    ReportExchange: "ReportExchange",//完成交换
    ReportSendWorldMsg: "ReportSendWorldMsg",//发送了世界聊天
    ReportBuildStatus: "ReportBuildStatus",//建筑被攻击状态
    ReportShareSuccess: "ReportShareSuccess",//分享成功

    //
    updateFace: "updateFace",

    adaptMailList: "adaptMailList",// 邮件列表适配
    updateFriendList: "updateFriendList",// 更新好友列表数据
    selectExchangeFinish: "selectExchangeFinish",// 交换组件选择道具完毕
    selectExchangeOtherFinish: "selectExchangeOtherFinish",// 交换组件中选择他人道具完成
    exchangeSendSuccess: "exchangeSendSuccess",// 交换消息发送成功, 刷新私聊界面和私聊列表界面
    recvPrivateChatMsg: "recvPrivateChatMsg",// 收到私聊消息推送
    updateRecommendStatus: "updateRecommendStatus",// 更新推荐按钮点击状态
    showSpeedyAddWay:"showSpeedyAddWay",// 快捷添加好友信息
};