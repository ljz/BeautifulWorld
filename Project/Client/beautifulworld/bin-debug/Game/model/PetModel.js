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
    var PetModel = (function (_super) {
        __extends(PetModel, _super);
        function PetModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.pets = {};
            //全局变量
            _this.stageHeight = TsEngine.StageManager.stageHeight;
            _this.stageWidth = TsEngine.StageManager.stageWidth;
            _this.stageOffHeight = TsEngine.StageManager.stageHeight - 1039;
            _this.petNowStatus = "sleep"; //宠物当前状态
            return _this;
        }
        //刷新局部数据
        PetModel.prototype.update = function (data) {
            console.log('PetModel-->>>>>>>>>>>data: ', data);
            for (var key in data) {
                if (this.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }
        };
        return PetModel;
    }(TsEngine.Model));
    game.PetModel = PetModel;
    __reflect(PetModel.prototype, "game.PetModel");
})(game || (game = {}));
var petModel;
//# sourceMappingURL=PetModel.js.map