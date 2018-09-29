var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//轮盘的信息
var game;
(function (game) {
    var WheelModel = (function (_super) {
        __extends(WheelModel, _super);
        function WheelModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isRotate = false; //轮盘是否旋转中
            _this.selectWheelBet = 1; //轮盘倍率
            _this.newMsgCount = 0; //新消息的数量
            _this.rollTweenTime = 2000; //轮盘旋转时间
            _this.markAttacking = false; //攻击动画期间
            return _this;
        }
        //刷新局部数据
        WheelModel.prototype.update = function (data) {
            if (data.rollerItems) {
                this.rollerItems = new Array();
                for (var index = 0; index < data.rollerItems.length; index++) {
                    this.rollerItems.push(new RollItem(data.rollerItems[index]));
                }
            }
            if (data.attackTarget) {
                this.attackTarget = new AttackTarget(data.attackTarget);
            }
            if (data.stealTarget) {
                this.stealTarget = new StealTarget(data.stealTarget);
            }
            // if (data.stealIslands || _.isNull(data.stealIslands)) {
            // this.stealIslands = data.stealIslands;
            // }
        };
        return WheelModel;
    }(TsEngine.Model));
    game.WheelModel = WheelModel;
    __reflect(WheelModel.prototype, "game.WheelModel");
    //攻击对象
    var AttackTarget = (function () {
        function AttackTarget(data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        return AttackTarget;
    }());
    game.AttackTarget = AttackTarget;
    __reflect(AttackTarget.prototype, "game.AttackTarget");
    //偷取对象
    var StealTarget = (function () {
        function StealTarget(data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        return StealTarget;
    }());
    game.StealTarget = StealTarget;
    __reflect(StealTarget.prototype, "game.StealTarget");
    //转盘对象
    var RollItem = (function () {
        function RollItem(data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        return RollItem;
    }());
    game.RollItem = RollItem;
    __reflect(RollItem.prototype, "game.RollItem");
})(game || (game = {}));
var wheelModel;
//# sourceMappingURL=WheelModel.js.map