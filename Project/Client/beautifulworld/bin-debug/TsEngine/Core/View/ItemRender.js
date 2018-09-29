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
    var ItemRenderer = (function (_super) {
        __extends(ItemRenderer, _super);
        function ItemRenderer() {
            var _this = _super.call(this) || this;
            _this.agent = new TsEngine.View();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.resetSkinParts, _this);
            return _this;
        }
        //加载
        ItemRenderer.prototype.load = function (skinUrl, resGroup, onComplete, onProgress, thisObject) {
            this.agent.load(skinUrl, resGroup, onComplete, onProgress, thisObject);
        };
        //数据设置
        ItemRenderer.prototype.dataChanged = function () {
            var _this = this;
            this.callSafe(function () {
                _this.agent.data = _this.data;
                _this.invalidateState();
            });
        };
        Object.defineProperty(ItemRenderer.prototype, "isInitialized", {
            get: function () {
                return this.agent.bInitialized;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化【每个窗口有且仅有一次】
         */
        ItemRenderer.prototype.onInit = function () {
        };
        /** 设置数据*/
        ItemRenderer.prototype.onData = function () {
        };
        /** 打开node*/
        ItemRenderer.prototype.onOpen = function () {
        };
        /** 关闭node*/
        ItemRenderer.prototype.onClose = function () {
        };
        ItemRenderer.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            this.agent.partAdded(partName, instance);
        };
        /**快捷方法*/
        //重置皮肤信息到初始信息
        ItemRenderer.prototype.resetSkinParts = function () {
            this.agent.resetSkinParts();
        };
        //安全执行（在view初始化完成之后）
        ItemRenderer.prototype.callSafe = function (func, thisObj) {
            this.agent.callSafe(func, thisObj);
        };
        ItemRenderer.prototype.addClick = function (target, callBack, thisObj) {
            this.agent.addClick(target, callBack, thisObj);
        };
        ItemRenderer.prototype.removeClick = function (target, callBack, thisObj) {
            this.agent.removeClick(target, callBack, thisObj);
        };
        ItemRenderer.prototype.removeFromParent = function (dispose) {
            if (dispose === void 0) { dispose = false; }
            this.agent.removeFromParent(dispose);
        };
        return ItemRenderer;
    }(eui.ItemRenderer));
    TsEngine.ItemRenderer = ItemRenderer;
    __reflect(ItemRenderer.prototype, "TsEngine.ItemRenderer");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=ItemRender.js.map