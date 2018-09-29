var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var WindowType = (function () {
        function WindowType() {
        }
        ;
        /**每日登陆面板*/
        WindowType.WINDOW_TEST = 1000;
        /**邀请奖励*/
        WindowType.WINDOW_INVITE = 1001;
        /**关注礼包*/
        WindowType.WINDOW_FOCUS_DAILY = 1004;
        /**微信关注礼包*/
        WindowType.WINDOW_WXGAME_FOCUS = 1005;
        /**诱导关注*/
        WindowType.WINDOW_FOCUS_REWARD_TIP = 1007;
        WindowType.WINDOW_FOCUS_GAME = 1001;
        WindowType.WINDOW_FOCUS_FORWXGAME = 1008;
        /**邀请送vip*/
        WindowType.WINDOW_INVITE_VIP = 1009;
        /**月卡*/
        WindowType.WINDOW_MONTHCARD = 1010;
        /**节日活动*/
        WindowType.WINDOW_FESTERVAL = 1011;
        /**神秘商人*/
        WindowType.WINDOW_MYSTICAL = 1012;
        /**礼包含有邀请*/
        WindowType.WINDOW_INVITE_GIFT = 1013;
        /**每日礼包固定奖励版*/
        WindowType.WINDOW_DAILYGIFT = 1014;
        /**实名认证*/
        WindowType.WINDOW_REALNAME_GIFT = 1015;
        /**端午邀请多个礼包*/
        WindowType.WINDOW_DRAGONBOAT = 1016;
        /**邀请助力礼包*/
        WindowType.WINDOW_SHARECHEER = 1017;
        /**新手礼包*/
        WindowType.WINDOW_NEWBIE_GIFT = 1018;
        /**飞速礼包*/
        WindowType.WINDOW_RUNNINGGIFT = 1019;
        /**海盗礼包*/
        WindowType.WINDOW_PIRATEGIFT = 1021;
        /**风筝礼包*/
        WindowType.WINDOW_KITEGIFT = 1022;
        /**宝藏礼包*/
        WindowType.WINDOW_MEASUREGIFT = 1023;
        /**森林聚餐礼包*/
        WindowType.WINDOW_PARTYGIFT = 1024;
        /**设置面板*/
        WindowType.WINDOW_SETTING = 1025;
        /**推荐好友*/
        WindowType.WINDOW_QUICKFRIEND = 1026;
        /**微信玩伴排行*/
        WindowType.WINDOW_WXRANK = 1027;
        /**商店*/
        WindowType.WINDOW_SHOP = 1028;
        /**活动列表*/
        WindowType.WINDOW_JIGSAW = 1029; //拼图
        WindowType.WINDOW_FESTEVAL = 1030; //节日活动
        WindowType.WINDOW_INVITEGIFT = 1031; //礼包含有邀请
        WindowType.WINDOW_NEWYEAR = 1032; //新年
        WindowType.WINDOW_RECALL = 1033; //老船长召回
        //召回奖励集合
        WindowType.WINDOW_INVITEREWARD = 1034; //邀请奖励
        WindowType.WINDOW_BOATER = 1035; //船员活动
        WindowType.WINDOW_WORLDCUP = 1036; //世界杯竞猜
        WindowType.WINDOW_HELPGIFT = 1037; //助力礼包
        /**公告面板*/
        WindowType.WINDOW_NOTICE = 1038;
        /**通用奖励面板*/
        WindowType.WINDOW_REWARD = 1039;
        WindowType.WINDOW_RANK = 1040;
        WindowType.WINDOW_SETTINGINFO = 1041;
        /**信息编辑面板*/
        WindowType.WINDOW_PLAYER_EDIT = 1042;
        /**攻击面板*/
        WindowType.WINDOW_ATTACK_LIST = 1043;
        /**主菜单面板*/
        WindowType.WINDOW_MAIN_MENU = 1044;
        /**主活动入口面板*/
        WindowType.WINDOW_ACT_MENU = 1045;
        /**微信圈面板*/
        WindowType.WINDOW_WX_CLUB = 1046;
        /**仇人榜面板*/
        WindowType.WINDOW_ENEMY = 1047;
        /**邮件消息面板*/
        WindowType.WINDOW_MAIL = 1048;
        /**建造面板*/
        WindowType.WINDOW_ISLANDBUIND = 1050;
        //
        WindowType.WINDOW_HELPLABEL = 1051;
        //
        WindowType.WINDOW_WANTED = 1052;
        WindowType.WINDOW_OPENBOX = 1053;
        /**过岛分享面板*/
        WindowType.WINDOW_SHAREISLAND = 1054;
        //偷取界面
        WindowType.WINDOW_STEAL = 1055;
        /**过岛动画面板*/
        WindowType.WINDOW_ISLANDOVEREFFECT = 1056;
        /**过岛奖励面板 */
        WindowType.WINDOW_ISLANDOVERREWARD = 1057;
        //每日福利合集
        WindowType.GROUP_DAILYREWARD = 1002;
        WindowType.GROUP_INVITEREWARD = 1003;
        WindowType.WINDOW_DAILY_SIGN = 1058;
        WindowType.WINDOW_DAILY_ENERGY = 1059;
        WindowType.WINDOW_FREE_ENERGY = 1060;
        //邀请奖励
        WindowType.WINDOW_RECALL_REWARD = 1061;
        WindowType.WINDOW_RECALLFRIEND_PLAYERS = 1062;
        WindowType.WINDOW_RECALLFRIEND_GROUP = 1063;
        /**新好友面板 */
        WindowType.WINDOW_NEWFRIEND = 1064;
        //攻击岛屿界面
        WindowType.WINDOW_ATTACK_ISLAND = 1065;
        /** 消息界面 */
        WindowType.WINDOW_WNSP = 1066; //万能碎片
        WindowType.GROUP_NEWS = 1067;
        WindowType.WINDOW_NEWS = 1068;
        /**个人信息界面 */
        WindowType.WINDOW_PLAYERINFO = 1069;
        /**新手目标*/
        WindowType.WINDOW_ACHIEVE = 1070;
        /**邀请获得金币*/
        WindowType.WINDOW_INVITE_JBBX = 1071;
        /**加好友界面 */
        WindowType.WINDOW_ADDFRIEND = 1072;
        //商店物品详情
        WindowType.WINDOW_SHOP_GOODS = 1073;
        /**下方通知栏界面 */
        WindowType.WINDOW_NOTICEBAR = 1074;
        /**回归玩家领取礼包感谢界面 */
        WindowType.WINDOW_REGRESSGIFT = 1075;
        /**打怪兽界面*/
        WindowType.WINDOW_TAPTITANS = 1076;
        /**打怪兽邀请好友界面*/
        WindowType.WINDOW_TAPTITANS_FRIEND = 1077;
        /**拼图赠送交换按钮界面 */
        WindowType.WINDOW_JIGSAWBTN = 1078;
        WindowType.WINDOW_INVITATIONLIST = 1079;
        /**打怪兽相关界面 */
        WindowType.WINDOW_TAPTITANSFREESHELL = 1080;
        WindowType.WINDOW_TAPTITANSAWARD = 1081;
        WindowType.WINDOW_TAPTITANSASSIST = 1082;
        //限时特惠合集
        WindowType.GROUP_LIMITSALE = 1083;
        //拼图相关
        WindowType.WINDOW_JIGSAWFRIEND = 1084; //拼图-好友列表
        WindowType.WINDOW_JIGSAWSENDPROP = 1085; //拼图-送道具
        WindowType.WINDOW_JIGSAWGETPROP = 1086; //拼图-领取道具
        WindowType.WINDOW_JIGSAWNEWS = 1087; //拼图-赠送消息
        WindowType.WINDOW_JIGSAWOVER = 1088; //拼图-完成
        WindowType.WINDOW_JIGSAWUSEMAGNA = 1089; //拼图-使用万能碎片
        WindowType.WINDOW_TAPTITANSWIN = 1090;
        WindowType.WINDOW_TAPTITANSHELP = 1091;
        WindowType.WINDOW_COMHELP = 1092;
        WindowType.WINDOW_JIGSAWREWARD = 1093; //拼图-完成领取奖励
        WindowType.WINDOW_PROTROCOL = 1094; //用户服务协议
        WindowType.WINDOW_PRIVACY = 1095; //隐私协议
        WindowType.WINDOW_EXCHANGEBYCODE = 1096; //兑换奖励
        // 好友相关
        WindowType.GROUP_FRIEND = 1097; // 好友组
        WindowType.WINDOW_FRIEND = 1098; // 好友面板
        WindowType.WINDOW_PRIVATE_CHAT_LIST = 1099; // 私聊消息面板
        WindowType.WINDOW_WORLD_CHAT = 1100; // 世界聊天
        WindowType.WINDOW_EXCHANGE = 1137; // 交换面板
        WindowType.GROUP_FRIEND_RECOMMEND = 1101; // 推荐好友面板组
        WindowType.WINDOW_RECOMMEND_NEARBY = 1155; // 附近的人
        WindowType.WINDOW_RECOMMEND_ONLINE = 1156; // 在线玩家
        WindowType.WINDOW_NEW_FRIEND = 1157; // 新的好友
        //大章鱼
        WindowType.WINDOW_OCTOPUS_FRIEND = 1102; //章鱼-好友列表
        WindowType.WINDOW_OCTOPUS_MES = 1103; //章鱼-消息
        WindowType.WINDOW_OCTOPUS_REWARD = 1104; //章鱼-兑换奖励
        WindowType.WINDOW_OCTOPUS_REWARDPOP = 1105; //章鱼-兑换奖励弹窗
        WindowType.WINDOW_OCTOPUS_NEWS = 1106; //章鱼-赠送消息
        WindowType.WINDOW_OCTOPUS_GETPROP = 1107; //章鱼-领取道具
        WindowType.WINDOW_OCTOPUS_BTN = 1108; //章鱼-赠送交换按钮
        WindowType.WINDOW_OCTOPUS_SENDPROP = 1109; //章鱼-送道具
        WindowType.WINDOW_OCTOPUS_SENDFRIEND = 1110; //章鱼-送道具的好友列表
        WindowType.WINDOW_RETURN = 1111; //回归奖励
        WindowType.WINDOW_RETURN_SHOW = 1112; //回归建岛展示
        WindowType.WINDOW_OCTOPUS_HELP = 1113; //章鱼-主界面帮助
        WindowType.WINDOW_OCTOPUS_PAYCONFIRM = 1114; //章鱼-使用棒棒糖界面
        WindowType.WINDOW_OCTOPUS_GAINREWARD = 1115; //章鱼-打到物品
        /**公众号特权*/
        WindowType.WINDOW_OFFICIALVIP = 1016; //公众号特权窗口
        WindowType.WINDOW_OFFICIALVIP_GET = 1117; //获得公众号特权
        WindowType.WINDOW_OFFICIALVIP_GUIDE = 1118; //关注公众号引导
        WindowType.WINDOW_SHARE_GUIDE = 1119; //分享引导窗口
        //金矿和地图相关
        WindowType.WINDOW_MAP = 1126; //地图面板
        WindowType.WINDOW_MAP_MINE = 1127; //购买矿工面板
        WindowType.WINDOW_WORLDMAP = 1128; //世界地图面板
        WindowType.WINDOW_WXFOCUSTIP = 1129; //公众号关注窗口
        WindowType.WINDOW_OPEN_FUNC = 1130; //功能开放解锁窗口
        WindowType.WINDOW_PRIVATE_CHAT = 1131; // 私聊面板
        //功能解锁开启
        WindowType.WINDOW_MODULEUNLOCK = 1140; //功能解锁弹框
        //带头像的确认弹框
        WindowType.WINDOW_COMWITHHEADPANEL = 1145;
        //海盗商人
        WindowType.WINDOW_TREESEEKHELPSHARE = 1146; //海盗商人求助分享界面
        WindowType.WINDOW_TREEAIDFRIEND = 1147; //海盗商人好友求助列表界面
        WindowType.WINDOW_TREEDRESS = 1148; //海盗商人求助好友界面
        WindowType.WINDOW_TREENEWS = 1149; //海盗商人消息界面
        WindowType.WINDOW_ITEM_TIP = 1145; //获得物品彩虹提示
        WindowType.WINDOW_PET_HATCH = 1158; //孵化界面
        WindowType.WINDOW_PET_OPENEGG = 1159; //孵化完成界面
        WindowType.WINDOW_GUIDE_OVER = 1160; //新手奖励
        WindowType.WINDOW_WHEEL_COUPLESHIELD = 1161; //轮盘赠送cp盾界面
        WindowType.WINDOW_WHEEL_GOTOWHEELALERT = 1162; //去轮盘提示
        //海盗团相关
        WindowType.WINDOW_GUILD_DONATE = 1200; //海盗团-碎片捐赠
        WindowType.WINDOW_GUILD_WELFARE = 1201; //海盗团-每日签到
        WindowType.WINDOW_GUILD_WELFARE_SHOW = 1202; //海盗团-每日签到-奖励展示
        WindowType.WINDOW_GUILD_APPLY = 1203; //海盗团-申请列表
        WindowType.WINDOW_GUILD_MEMBERLIST = 1204; //海盗团-成员列表系列
        WindowType.WINDOW_GUILD_SUC = 1205; //海盗团-加入或创建成功
        WindowType.WINDOW_GUILD_FEEDBACK = 1206; //海盗团-回馈礼包
        WindowType.WINDOW_GUILD_FEEDBACK_SHOW = 1207; //海盗团-回馈礼包
        WindowType.WINDOW_GUILD_SETTING = 1208; // 海盗团-设置名字等
        WindowType.WINDOW_GUILD_SHOP = 1209; // 海盗团-商店
        WindowType.WINDOW_GUILD_BUY = 1210; // 海盗团-商店购买
        WindowType.WINDOW_GUILD_NOTICE = 1211; // 海盗团-公告
        WindowType.WINDOW_GUILD_SYSTEM_NEWS = 1212; // 海盗团-系统消息
        WindowType.WINDOW_GUILD_DONATE_NEWS = 1213; // 海盗团-碎片消息
        WindowType.WINDOW_GUILD_POSTION = 1214; // 海盗团-职务
        WindowType.WINDOW_GUILD_OPERATION = 1215; // 海盗团-操作团员
        WindowType.WINDOW_GUILD_INVITE = 1216; // 海盗团-招募
        WindowType.WINDOW_GUILD_RENAME = 1217; // 海盗团-改名
        //帆船赛
        WindowType.WINDOW_SAILING_DEPOT_INFO = 1218; //帆船赛 加油站info
        WindowType.WINDOW_SAILING_REWARD_OPERATION = 1219; //帆船赛 奖励展示
        WindowType.WINDOW_SAILING_MATCH_INFO = 1220; //帆船赛 赛事
        WindowType.WINDOW_SAILING_MATCH_OPERATION = 1221; //帆船赛 
        WindowType.WINDOW_SAILING_MATCH_CUP = 1222; //帆船赛 奖杯展示
        WindowType.WINDOW_SAILING_FINAL_REWARD = 1223; //
        WindowType.WINDOW_SAILING_REWARD = 1224; //
        WindowType.WINDOW_SAILING_RANK = 1225; //帆船赛 排行榜
        WindowType.WINDOW_SAILING_TASK = 1226; //帆船赛 任务
        WindowType.WINDOW_SAILING_SCORE_RANK = 1227; //帆船赛 积分排行
        WindowType.WINDOW_SAILING_WHEEL = 1228; //帆船赛 奖励轮盘
        WindowType.WINDOW_SAILING_DEPOT = 1229; //帆船赛 加油站
        WindowType.WINDOW_ADDREGRESSFRIEND = 1230; //加回归好友界面
        //wx好友
        WindowType.WINDOW_WX_FRIEND = 1231; //微信好友
        WindowType.WINDOW_FESTIVALBALLOON = 1232; //气球
        WindowType.WINDOW_WXFOCUS_DESCNEW = 1233; //公众号关注描述窗口
        WindowType.WINDOW_MULTIPLE_GOLD = 1234; //多倍金币
        WindowType.WINDOW_REWARD_WITH_ACTION = 1235; //轮盘获得道具界面
        WindowType.WINDOW_JIGSAW_EXCHANG = 1236; //拼图交换列表
        WindowType.WINDOW_OCTOPUS_EXCHANG = 1237; //章鱼交换列表
        WindowType.WINDOW_EXCHANGE_RESPONSE = 1238; // 交换请求反馈
        WindowType.WINDOW_RANKUP = 1239; //排名提升
        WindowType.WINDOW_WXFOCUS_NOREWARD = 1240; //屏蔽区的关注公众号引导界面
        return WindowType;
    }());
    game.WindowType = WindowType;
    __reflect(WindowType.prototype, "game.WindowType");
})(game || (game = {}));
//# sourceMappingURL=WindowType.js.map