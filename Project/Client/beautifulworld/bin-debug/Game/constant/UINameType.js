var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var UINameType = (function () {
        function UINameType() {
        }
        UINameType.mainMenuBtn = 'mainMenuBtn'; //主界面主菜单按钮
        UINameType.actMenuBtn = 'actMenuBtn'; //主界面活动入口
        UINameType.actBtnGroup = 'actBtnGroup'; //主界面活动group
        UINameType.mineMenuBtn = 'mineMenuBtn'; //主界面金矿入口
        UINameType.menu = 'menu'; //主界面菜单(menu_id)
        UINameType.mainWheelBtn = 'mainWheelBtn'; //主界面轮盘按钮
        UINameType.mainBuildBtn = 'mainBuildBtn'; //主界面建造按钮
        UINameType.buildItem = 'buildItem'; //建筑面板行列物品(buildItem0_0代表第一行第一个建筑)
        UINameType.buildWheelBtn = 'buildWheelBtn'; //岛屿界面返回轮盘按钮
        UINameType.buildBtn = 'buildBtn'; //建造界面建造按钮
        UINameType.attackItem = 'attackItem'; //岛屿攻击气泡(attackItem1代表第一个建筑)
        UINameType.attackHateBtn = 'attackHateBtn'; //攻击界面仇人按钮按钮
        UINameType.attackFriendBtn = 'attackFriendBtn'; //攻击界面好友按钮按钮
        UINameType.attackItemBtn = 'attackItemBtn'; //仇人列表攻击按钮(attackItemBtn1代表第2个人)
        UINameType.attackTipOkBtn = 'attackTipOkBtn'; //攻击完成的底部面板确认按钮
        UINameType.stealTipOkBtn = 'stealTipOkBtn'; //偷取完成的底部面板确认按钮
        UINameType.mainTipOkBtn = 'mainTipOkBtn'; //主界面底部提示面板确认按钮
        UINameType.sugarGroup = 'sugarGroup'; //章鱼棒棒糖
        UINameType.payConfirmOkBtn = 'payConfirmOkBtn'; //章鱼使用棒棒糖
        //宠物
        UINameType.petGroup = 'petGroup'; //宠物蛋引导
        UINameType.mineGroup = 'mineGroup'; //金矿引导
        UINameType.eggOverBtn = 'eggOverBtn'; //宠物界面-立即孵化
        UINameType.expGroup = 'expGroup'; //宠物-吃经验
        UINameType.lvUpBtn = 'lvUpBtn'; //宠物-升级
        UINameType.foodGroup = 'foodGroup'; //宠物-饼干
        //金矿
        UINameType.getMoney = "getMoney"; //金矿收钱
        UINameType.addMine = "addMine"; //添加旷工
        UINameType.buyBtn0 = "buyBtn0"; //购买旷工
        //海盗商人
        UINameType.fruit1 = "fruit1"; //水果
        UINameType.dressBtn = "dressBtn"; //放置水果按钮
        return UINameType;
    }());
    game.UINameType = UINameType;
    __reflect(UINameType.prototype, "game.UINameType");
})(game || (game = {}));
//# sourceMappingURL=UINameType.js.map