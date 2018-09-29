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
var game;
(function (game) {
    var DailyModel = (function (_super) {
        __extends(DailyModel, _super);
        function DailyModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.seniorDayShare_remainShareCount = -1;
            _this.seniorDayShare_boxEnergy = -1;
            _this.dailyEventInfo = {};
            _this.dailyPrizeConfs = {};
            _this.dazhangyuShareCount = 0;
            _this.treasureShareCount = 0;
            _this.remainShareCount = 0;
            return _this;
        }
        DailyModel.prototype.update = function (data) {
            this.inject(data, false);
        };
        return DailyModel;
    }(TsEngine.Model));
    game.DailyModel = DailyModel;
    __reflect(DailyModel.prototype, "game.DailyModel");
})(game || (game = {}));
var dailyModel;
//# sourceMappingURL=DailyModel.js.map