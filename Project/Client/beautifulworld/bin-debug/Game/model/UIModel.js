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
    /**
     * ui名称类型[引导用]
     *@author sunxinzhe
     */
    var UIModel = (function (_super) {
        __extends(UIModel, _super);
        function UIModel() {
            var _this = _super.call(this) || this;
            _this.uiMap = new Object();
            return _this;
        }
        UIModel.prototype.onState = function (name, instance, show) {
            if (show) {
                this.onShow(name, instance);
            }
            else {
                this.onHide(name);
            }
        };
        /**添加UI对应*/
        UIModel.prototype.onShow = function (name, instance) {
            this.uiMap[name] = instance;
            TsEngine.NotificationManager.dispatch(UIModel.ON_CHANGE, name, true);
        };
        /**添加UI对应*/
        UIModel.prototype.onHide = function (name) {
            delete this.uiMap[name];
            TsEngine.NotificationManager.dispatch(UIModel.ON_CHANGE, name, false);
        };
        /**获取UI实例*/
        UIModel.prototype.getUI = function (name) {
            return this.uiMap[name];
        };
        UIModel.ON_CHANGE = "onUIChanged";
        return UIModel;
    }(TsEngine.Model));
    game.UIModel = UIModel;
    __reflect(UIModel.prototype, "game.UIModel");
})(game || (game = {}));
var uiModel;
//# sourceMappingURL=UIModel.js.map