var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var ScreenManager = (function () {
        function ScreenManager() {
        }
        ScreenManager.initialize = function (navigator) {
            this.navigator = navigator;
        };
        ScreenManager.registScreen = function (screenId, screen, skinUrl, resGroup) {
            if (skinUrl === void 0) { skinUrl = null; }
            if (ScreenManager.navigator == null) {
                ScreenManager.navigator = new TsEngine.WindowNavigator(TsEngine.StageManager.getLayer(TsEngine.Layer.SCREEN));
            }
            return ScreenManager.navigator.registWindow(screenId, screen, skinUrl, resGroup, false, false);
        };
        ScreenManager.unRegisterScreen = function (screenId) {
            ScreenManager.navigator.unRegisterWindow(screenId);
        };
        ScreenManager.hasScreen = function (screenId) {
            return ScreenManager.navigator.hasWindow(screenId);
        };
        ScreenManager.getScreen = function (screenId) {
            return (ScreenManager.navigator.getWindow(screenId));
        };
        //获取窗口数据
        ScreenManager.getScreenData = function (screenId) {
            return ScreenManager.navigator.getWindowData(screenId);
        };
        Object.defineProperty(ScreenManager, "currentScreen", {
            get: function () {
                return ScreenManager.navigator.currentWindow;
            },
            set: function (value) {
                ScreenManager.navigator.currentWindow = value;
            },
            enumerable: true,
            configurable: true
        });
        //返回上一个
        ScreenManager.back = function () {
            return ScreenManager.navigator.back();
        };
        ScreenManager.showScreen = function (screenId, data, onOpen, onClose, thisObj) {
            if (data === void 0) { data = null; }
            ScreenManager.navigator.showWindow(screenId, data, null, onOpen, onClose, thisObj);
        };
        ScreenManager.hideScreen = function (screenId, onClose, thisObj, destroy) {
            if (destroy === void 0) { destroy = false; }
            ScreenManager.navigator.hideWindow(screenId, onClose, thisObj, destroy);
        };
        ScreenManager.isOpen = function (screenId) {
            return ScreenManager.navigator.isOpen(screenId);
        };
        ScreenManager.isActive = function (screenId) {
            return ScreenManager.navigator.isActive(screenId);
        };
        return ScreenManager;
    }());
    TsEngine.ScreenManager = ScreenManager;
    __reflect(ScreenManager.prototype, "TsEngine.ScreenManager");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=ScreenManager.js.map