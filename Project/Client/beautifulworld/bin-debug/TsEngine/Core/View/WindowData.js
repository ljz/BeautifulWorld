var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var WindowState;
    (function (WindowState) {
        WindowState[WindowState["CLOSE"] = -1] = "CLOSE";
        WindowState[WindowState["PREPARE"] = 0] = "PREPARE";
        WindowState[WindowState["LOADING"] = 1] = "LOADING";
        WindowState[WindowState["OPEN"] = 2] = "OPEN";
    })(WindowState = TsEngine.WindowState || (TsEngine.WindowState = {}));
    var WindowData = (function () {
        function WindowData(id, typeClass, hasModal, modalClickHide, manualCloseOnly, skinUrl, resGroup, windowLevel) {
            if (hasModal === void 0) { hasModal = true; }
            if (modalClickHide === void 0) { modalClickHide = true; }
            if (manualCloseOnly === void 0) { manualCloseOnly = false; }
            if (skinUrl === void 0) { skinUrl = null; }
            if (windowLevel === void 0) { windowLevel = 1; }
            this.id = 0;
            this.modalAlpha = 0.6;
            this.id = id;
            this.typeClass = typeClass;
            this.manualCloseOnly = manualCloseOnly;
            this.resGroup = resGroup;
            this.skinUrl = skinUrl;
            this.hasModal = hasModal;
            this.level = windowLevel;
            this.modalClickHide = modalClickHide;
            this.state = WindowState.CLOSE;
        }
        Object.defineProperty(WindowData.prototype, "instance", {
            get: function () {
                if (this.mInstance == null) {
                    this.mInstance = new this.typeClass();
                }
                if ("dataProvider" in this.mInstance && this.fullList) {
                    this.mInstance.dataProvider = this.openList;
                }
                return this.mInstance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WindowData.prototype, "fullList", {
            get: function () {
                return this.mFullList;
            },
            set: function (value) {
                this.mFullList = value;
                this.openList = new eui.ArrayCollection();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WindowData.prototype, "isOpen", {
            get: function () {
                return this.state == WindowState.OPEN;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WindowData.prototype, "isLoading", {
            get: function () {
                return this.state == WindowState.LOADING;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WindowData.prototype, "isActive", {
            get: function () {
                return this.state > WindowState.CLOSE;
            },
            enumerable: true,
            configurable: true
        });
        return WindowData;
    }());
    TsEngine.WindowData = WindowData;
    __reflect(WindowData.prototype, "TsEngine.WindowData");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=WindowData.js.map