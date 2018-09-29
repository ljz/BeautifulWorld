var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ScreenType = (function () {
        function ScreenType() {
        }
        //测试demo场景
        ScreenType.TEST_SCREEN = 0;
        ScreenType.LOADING_SCREEN = 1000;
        //游戏进入加载界面
        ScreenType.PRELOAD_SCREEN = 1;
        //主场景转盘
        ScreenType.WHEEL_SCREEN = 2;
        //岛屿建筑场景
        ScreenType.ISLAND_SCREEN = 3;
        //世界地图场景
        ScreenType.WORLD_SCREEN = 4;
        //地图场景，包含金矿
        ScreenType.MAP_SCREEN = 5;
        //宠物场景
        ScreenType.PET_SCREEN = 6;
        //海盗团场景
        ScreenType.GUILD_SCREEN = 7;
        /**活动场景*/
        //打怪兽
        ScreenType.KILLTITAN_SCREEN = 8;
        //大章鱼
        ScreenType.OCTOPUS_SCREEN = 9;
        //沙滩
        ScreenType.BEACH_SCREEN = 10;
        //圣诞树
        ScreenType.TREE_SCREEN = 11;
        //风筝
        ScreenType.KITE_SCREEN = 12;
        //飞机
        ScreenType.PLANE_SCREEN = 13;
        //端午节
        ScreenType.DRAGONBOAT_SCREEN = 14;
        //周一能量瓜分
        ScreenType.MONDAY_SCREEN = 15;
        //海盗之王活动
        ScreenType.PIRATEKING_SCREEN = 16;
        //藏宝图
        ScreenType.TREASUREMAP_SCREEN = 17;
        //cp
        ScreenType.CP_SCREEN = 18;
        ScreenType.GUILD_JOINSCREEN = 19; //公会加入
        ScreenType.GUILD_SAILING = 20; //公会帆船赛
        ScreenType.ISLANDSPACE = 21; //参观时别人家的岛屿
        return ScreenType;
    }());
    game.ScreenType = ScreenType;
    __reflect(ScreenType.prototype, "game.ScreenType");
})(game || (game = {}));
//# sourceMappingURL=ScreenType.js.map