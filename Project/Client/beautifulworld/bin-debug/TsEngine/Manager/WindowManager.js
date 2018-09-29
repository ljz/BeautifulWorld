var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var WindowManager = (function () {
        function WindowManager() {
        }
        WindowManager.initialize = function (navigator) {
            this.navigator = navigator;
        };
        WindowManager.registWindow = function (windowId, typeClass, skinUrl, resGroup, hasModal, modalClickHide, manualCloseOnly, windowLevel) {
            if (skinUrl === void 0) { skinUrl = null; }
            if (hasModal === void 0) { hasModal = true; }
            if (modalClickHide === void 0) { modalClickHide = true; }
            if (manualCloseOnly === void 0) { manualCloseOnly = false; }
            if (windowLevel === void 0) { windowLevel = 1; }
            if (this.navigator == null) {
                this.navigator = new TsEngine.WindowNavigator(TsEngine.StageManager.getLayer(TsEngine.Layer.WINDOW));
            }
            return WindowManager.navigator.registWindow(windowId, typeClass, skinUrl, resGroup, hasModal, modalClickHide, manualCloseOnly, windowLevel);
        };
        WindowManager.unRegisterWindow = function (windowId) {
            if (windowId === void 0) { windowId = 0; }
            WindowManager.navigator.unRegisterWindow(windowId);
        };
        WindowManager.hasWindow = function (windowId) {
            if (windowId === void 0) { windowId = 0; }
            return WindowManager.navigator.hasWindow(windowId);
        };
        WindowManager.getWindow = function (windowId) {
            if (windowId === void 0) { windowId = 0; }
            return WindowManager.navigator.getWindow(windowId);
        };
        //获取窗口数据
        WindowManager.getWindowData = function (windowId) {
            return WindowManager.navigator.getWindowData(windowId);
        };
        Object.defineProperty(WindowManager, "currentWindow", {
            get: function () {
                return WindowManager.navigator.currentWindow;
            },
            set: function (value) {
                WindowManager.navigator.currentWindow = value;
            },
            enumerable: true,
            configurable: true
        });
        //参数传递可考虑设计成...args或数组，便于与配置数据适应
        WindowManager.showWindow = function (windowId, data, parent, onOpen, onClose, thisObj, windowLevel) {
            if (data === void 0) { data = null; }
            if (parent === void 0) { parent = null; }
            if (windowLevel === void 0) { windowLevel = -1; }
            WindowManager.navigator.showWindow(windowId, data, parent, onOpen, onClose, thisObj, windowLevel);
        };
        //隐藏窗口
        WindowManager.hideWindow = function (windowId, onClose, thisObj, destroy) {
            if (windowId === void 0) { windowId = 0; }
            if (destroy === void 0) { destroy = false; }
            WindowManager.navigator.hideWindow(windowId, onClose, thisObj, destroy);
        };
        //隐藏所有活动窗口
        WindowManager.hideAllWindow = function () {
            WindowManager.navigator.hideAllWindow();
        };
        //切换窗口
        WindowManager.toggleWindow = function (windowId) {
            if (windowId === void 0) { windowId = 0; }
            WindowManager.navigator.toggleWindow(windowId);
        };
        //是否打开
        WindowManager.isOpen = function (windowId) {
            if (windowId === void 0) { windowId = 0; }
            return WindowManager.navigator.isOpen(windowId);
        };
        //是否处于活动状态
        WindowManager.isActive = function (windowId) {
            if (windowId === void 0) { windowId = 0; }
            return WindowManager.navigator.isActive(windowId);
        };
        WindowManager.setOpenList = function (funcTypeList, update) {
            if (update === void 0) { update = false; }
            WindowManager.navigator.setOpenList(funcTypeList, update);
        };
        WindowManager.setOpen = function (windowId, open) {
            WindowManager.navigator.setOpen(windowId, open);
        };
        return WindowManager;
    }());
    TsEngine.WindowManager = WindowManager;
    __reflect(WindowManager.prototype, "TsEngine.WindowManager");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=WindowManager.js.map