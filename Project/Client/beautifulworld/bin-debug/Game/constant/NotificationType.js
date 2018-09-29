var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var NotificationType = (function () {
        function NotificationType() {
        }
        NotificationType.ON_GAME_DEACTIVATE = "ON_GAME_DEACTIVATE"; //游戏最小化
        NotificationType.ON_GAME_ACTIVATE = "ON_GAME_ACTIVATE"; //最小化进入游戏
        NotificationType.SCREEN_ENTER = "SCREEN_ENTER"; //场景进入完成
        NotificationType.SCREEN_CLOSE = "SCREEN_CLOSE"; //场景关闭完成
        NotificationType.WINDOW_ENTER = "WINDOW_ENTER"; //窗口进入完成
        NotificationType.WINDOW_CLOSE = "WINDOW_CLOSE"; //窗口关闭完成
        NotificationType.FACEUI_UPDATE = "faceui_update"; //faceui需要更新变化
        NotificationType.CHAT_UPDATE = "chatUpdate"; //聊天更新变化
        NotificationType.RELOGIN = "relogin"; //重新登陆
        //-----------岛屿相关-----------
        NotificationType.ISLAND_BUILD_REFRESH = "ISLAND_BUILD_REFRESH"; //建设刷新
        NotificationType.ISLAND_BUILD_HIDE = "ISLAND_BUILD_HIDE"; //建造按钮隐藏
        NotificationType.ISLAND_NEXTISLAND = "ISLAND_NEXTISLAND"; //进入下一个岛屿
        NotificationType.ISLAND_NEXTISLAND_BACK = "ISLAND_NEXTISLAND_BACK"; //进入下一个岛屿back
        NotificationType.ISLAND_WHEEL_TO_ATTACK = "ISLAND_WHEEL_TO_ATTACK"; //攻击
        NotificationType.ISLAND_ATTACK_TO_WHEEL = "ISLAND_ATTACK_TO_WHEEL"; //攻击返回转盘
        NotificationType.ISLAND_ATTACK_NEW_TARGET = "ISLAND_ATTACK_NEW_TARGET"; //攻击目标调整
        NotificationType.ISLAND_ATTACK_HIDE_BUTTON = "ISLAND_ATTACK_HIDE_BUTTON"; //攻击时候隐藏侧边按钮
        NotificationType.ISLAND_ATTACK_SHOW_BUTTON = "ISLAND_ATTACK_SHOW_BUTTON"; //攻击时候显示侧边按钮
        NotificationType.ISLAND_BUILD_ATTACKED = "ISLAND_BUILD_ATTACKED"; //建筑被攻击
        NotificationType.WHEEL_TO_ISLAND = "WHEEL_TO_ISLAND"; //去岛屿界面
        NotificationType.ISLAND_RETURN_OVER = "ISLAND_RETURN_OVER"; //回归见到引导结束
        NotificationType.ISLAND_ATTACK_HIDELIST = "ISLAND_ATTACK_HIDELIST"; //隐藏list
        //调整背景
        NotificationType.BG_ADJUST = "BG_ADJUST"; //调整背景的高度
        //工会
        NotificationType.GUILD_FEEDBACK_REFFRESH = "GUILD_FEEDBACK_REFFRESH"; //海盗团回馈礼包刷新
        NotificationType.GUILD_WELFARE_BOXESGROUP = "GUILD_WELFARE_BOXESGROUP"; //刷新签到界面boxesgroup
        NotificationType.GUILD_RENAME = "GUILD_RENAME"; //工会改名
        //帆船赛
        NotificationType.SailingStartWave = "SailingStartWave"; //帆船赛 -- 波浪继续
        NotificationType.SailingRefreshRedPoint = "SailingRefreshRedPoint"; //帆船赛 -- 刷新红点
        NotificationType.SailingScoreChange = "SailingScoreChange"; //帆船赛 -- 积分变化
        NotificationType.SailingDepotChange = "SailingDepotChange"; //帆船赛 -- 加油站刷新
        NotificationType.SailingRefreshRewardRedPoint = "SailingRefreshRewardRedPoint"; //帆船赛 -- 刷新奖励界面红点
        NotificationType.PIRATE_TEAM_ENTER = "PIRATE_TEAM_ENTER"; //跳转到海盗团
        NotificationType.FACEUI_corwns_change = "FACEUI_corwns_change"; //faceUI星级变化
        return NotificationType;
    }());
    game.NotificationType = NotificationType;
    __reflect(NotificationType.prototype, "game.NotificationType");
})(game || (game = {}));
//# sourceMappingURL=NotificationType.js.map