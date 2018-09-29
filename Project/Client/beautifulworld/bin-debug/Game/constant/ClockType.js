var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ClockType = (function () {
        function ClockType() {
        }
        ClockType.JIgsawWindow = 'jisgawWindow'; //拼图界面倒计时
        ClockType.OctopusBgMove = 'octopusBgMove'; //大章鱼背景移动
        ClockType.OctopusScreen = 'octopusScreen'; //大章鱼倒计时
        ClockType.OctopusFriend = 'octopusFriend'; //大章鱼好友列表
        ClockType.OctopusWindow = 'octopusWindow'; //大章鱼活动
        ClockType.RunningGiftWindow = "runningGiftWindow"; //飞速礼包
        ClockType.PetSkill = 'petSkill'; //宠物技能
        ClockType.PetHatch = 'petHatch'; //宠物孵化
        ClockType.PetForever = 'petForever'; //宠物孵化
        ClockType.PetHatchWindow = 'petHatchWindow'; //宠物孵化界面
        ClockType.WheelEnergy = 'wheelEnergy'; //轮盘能量倒计时
        ClockType.MapUpdateMoneyBox = 'MapUpdateMoneyBox'; //更新矿工金币
        return ClockType;
    }());
    game.ClockType = ClockType;
    __reflect(ClockType.prototype, "game.ClockType");
})(game || (game = {}));
//# sourceMappingURL=ClockType.js.map