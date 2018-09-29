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
var TsEngine;
(function (TsEngine) {
    var Screen = (function (_super) {
        __extends(Screen, _super);
        function Screen() {
            return _super.call(this) || this;
        }
        Screen.prototype.registView = function (viewId, view) {
            if (this.viewNavigator == null) {
                this.viewNavigator = new TsEngine.WindowNavigator(this);
            }
            this.viewNavigator.registWindow(viewId, view, null, null, false, false);
        };
        Screen.prototype.unRegisterView = function (viewId) {
            this.viewNavigator.unRegisterWindow(viewId);
        };
        Screen.prototype.hasView = function (viewId) {
            return this.viewNavigator.hasWindow(viewId);
        };
        Screen.prototype.getView = function (viewId) {
            return this.viewNavigator.getWindow(viewId);
        };
        Object.defineProperty(Screen.prototype, "currentView", {
            get: function () {
                return this.viewNavigator.currentWindow;
            },
            set: function (value) {
                this.viewNavigator.currentWindow = value;
            },
            enumerable: true,
            configurable: true
        });
        Screen.prototype.showView = function (viewId, data) {
            if (data === void 0) { data = null; }
            this.viewNavigator.showWindow(viewId, data);
        };
        Screen.prototype.onClose = function () {
            _super.prototype.onClose.call(this);
            if (this.viewNavigator) {
                this.viewNavigator.currentWindow = -1;
            }
        };
        return Screen;
    }(TsEngine.Window));
    TsEngine.Screen = Screen;
    __reflect(Screen.prototype, "TsEngine.Screen", ["TsEngine.IScreen", "TsEngine.IView"]);
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=Screen.js.map