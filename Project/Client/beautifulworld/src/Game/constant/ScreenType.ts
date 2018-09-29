
namespace game {

	export class ScreenType {
		//测试demo场景
		public static TEST_SCREEN: number = 0;
		public static LOADING_SCREEN: number = 1000;

		//游戏进入加载界面
		public static PRELOAD_SCREEN: number = 1;

		//主场景转盘
		public static WHEEL_SCREEN: number = 2;

		//岛屿建筑场景
		public static ISLAND_SCREEN: number = 3;

		//世界地图场景
		public static WORLD_SCREEN: number = 4;

		//地图场景，包含金矿
		public static MAP_SCREEN: number = 5;

		//宠物场景
		public static PET_SCREEN: number = 6;

		//海盗团场景
		public static GUILD_SCREEN: number = 7;

		/**活动场景*/
		//打怪兽
		public static KILLTITAN_SCREEN: number = 8;
		//大章鱼
		public static OCTOPUS_SCREEN: number = 9;
		//沙滩
		public static BEACH_SCREEN: number = 10;
		//圣诞树
		public static TREE_SCREEN: number = 11;
		//风筝
		public static KITE_SCREEN: number = 12;
		//飞机
		public static PLANE_SCREEN: number = 13;
		//端午节
		public static DRAGONBOAT_SCREEN: number = 14;
		//周一能量瓜分
		public static MONDAY_SCREEN: number = 15;
		//海盗之王活动
		public static PIRATEKING_SCREEN: number = 16;
		//藏宝图
		public static TREASUREMAP_SCREEN: number = 17;
		//cp
		public static CP_SCREEN: number = 18;

		public static GUILD_JOINSCREEN: number = 19;//公会加入
		public static GUILD_SAILING: number = 20;//公会帆船赛
		public static ISLANDSPACE:number = 21;//参观时别人家的岛屿
	}
}