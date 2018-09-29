
namespace game {

	export class NotificationType {
		public static ON_GAME_DEACTIVATE: string = "ON_GAME_DEACTIVATE"; //游戏最小化
		public static ON_GAME_ACTIVATE: string = "ON_GAME_ACTIVATE"; //最小化进入游戏
		public static SCREEN_ENTER: string = "SCREEN_ENTER"; //场景进入完成
		public static SCREEN_CLOSE: string = "SCREEN_CLOSE"; //场景关闭完成
		public static WINDOW_ENTER: string = "WINDOW_ENTER"; //窗口进入完成
		public static WINDOW_CLOSE: string = "WINDOW_CLOSE"; //窗口关闭完成
		public static FACEUI_UPDATE: string = "faceui_update"; //faceui需要更新变化
		public static CHAT_UPDATE: string = "chatUpdate"; //聊天更新变化
		public static RELOGIN: string = "relogin"; //重新登陆

		//-----------岛屿相关-----------
		public static ISLAND_BUILD_REFRESH: string = "ISLAND_BUILD_REFRESH"; //建设刷新
		public static ISLAND_BUILD_HIDE: string = "ISLAND_BUILD_HIDE"; //建造按钮隐藏
		public static ISLAND_NEXTISLAND: string = "ISLAND_NEXTISLAND"; //进入下一个岛屿
		public static ISLAND_NEXTISLAND_BACK: string = "ISLAND_NEXTISLAND_BACK"; //进入下一个岛屿back
		public static ISLAND_WHEEL_TO_ATTACK: string = "ISLAND_WHEEL_TO_ATTACK"; //攻击
		public static ISLAND_ATTACK_TO_WHEEL: string = "ISLAND_ATTACK_TO_WHEEL"; //攻击返回转盘
		public static ISLAND_ATTACK_NEW_TARGET: string = "ISLAND_ATTACK_NEW_TARGET"; //攻击目标调整
		public static ISLAND_ATTACK_HIDE_BUTTON: string = "ISLAND_ATTACK_HIDE_BUTTON"; //攻击时候隐藏侧边按钮
		public static ISLAND_ATTACK_SHOW_BUTTON: string = "ISLAND_ATTACK_SHOW_BUTTON"; //攻击时候显示侧边按钮
		public static ISLAND_BUILD_ATTACKED: string = "ISLAND_BUILD_ATTACKED";//建筑被攻击
		public static WHEEL_TO_ISLAND: string = "WHEEL_TO_ISLAND";//去岛屿界面
		public static ISLAND_RETURN_OVER: string = "ISLAND_RETURN_OVER";//回归见到引导结束
		public static ISLAND_ATTACK_HIDELIST: string = "ISLAND_ATTACK_HIDELIST";//隐藏list

		//调整背景
		public static BG_ADJUST: string = "BG_ADJUST";//调整背景的高度

		//工会
		public static GUILD_FEEDBACK_REFFRESH: string = "GUILD_FEEDBACK_REFFRESH";//海盗团回馈礼包刷新
		public static GUILD_WELFARE_BOXESGROUP: string = "GUILD_WELFARE_BOXESGROUP";//刷新签到界面boxesgroup
		public static GUILD_RENAME: string = "GUILD_RENAME";//工会改名

		//帆船赛
		public static SailingStartWave: string = `SailingStartWave`;//帆船赛 -- 波浪继续
		public static SailingRefreshRedPoint: string = `SailingRefreshRedPoint`;//帆船赛 -- 刷新红点
		public static SailingScoreChange: string = `SailingScoreChange`;//帆船赛 -- 积分变化
		public static SailingDepotChange: string = `SailingDepotChange`;//帆船赛 -- 加油站刷新
		public static SailingRefreshRewardRedPoint: string = `SailingRefreshRewardRedPoint`;//帆船赛 -- 刷新奖励界面红点


		public static PIRATE_TEAM_ENTER: string = `PIRATE_TEAM_ENTER`;//跳转到海盗团
		public static FACEUI_corwns_change: string = `FACEUI_corwns_change`;//faceUI星级变化
	}
}