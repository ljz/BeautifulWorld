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
//玩家登陆后需要处理的残留信息
var game;
(function (game) {
    var InitModel = (function (_super) {
        __extends(InitModel, _super);
        function InitModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.dailyPrizeConfs = null;
            _this.friendInfo = null;
            _this.mobileSystem = "";
            _this.signRedPoint = false; //每日签到红点
            return _this;
        }
        //刷新局部数据
        InitModel.prototype.update = function (data) {
            this.inject(data);
        };
        return InitModel;
    }(TsEngine.Model));
    game.InitModel = InitModel;
    __reflect(InitModel.prototype, "game.InitModel");
})(game || (game = {}));
var initModel;
//# sourceMappingURL=InitModel.js.map