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
    var Window = (function (_super) {
        __extends(Window, _super);
        function Window(autoCenter) {
            if (autoCenter === void 0) { autoCenter = true; }
            var _this = _super.call(this) || this;
            _this.autoCenter = autoCenter;
            _this.touchEnabled = true;
            return _this;
        }
        Window.prototype.load = function (skinUrl, resGroup, onComplete, onProgress, thisObject) {
            var _this = this;
            _super.prototype.load.call(this, skinUrl, resGroup, function () {
                if (_this.skin) {
                    TsEngine.StageManager.addResizeListener(function () {
                        if (_this.autoCenter)
                            _this.centerStage();
                        _this.onResize();
                    }, _this);
                }
                if (onComplete != null)
                    onComplete.call(thisObject, _this);
            }, onProgress, thisObject);
        };
        /** 窗口尺寸变化*/
        Window.prototype.onResize = function () {
        };
        Object.defineProperty(Window.prototype, "backGround", {
            set: function (value) {
                TsEngine.ResourceManager.loadResource(value, onGetResource, this);
                function onGetResource(content) {
                    if (this.backGroundContent == null) {
                        this.backGroundContent = new egret.Bitmap();
                        this.addChildAt(this.backGroundContent, 0);
                    }
                    this.backGroundContent.texture = content;
                    this.validate();
                }
            },
            enumerable: true,
            configurable: true
        });
        return Window;
    }(TsEngine.View));
    TsEngine.Window = Window;
    __reflect(Window.prototype, "TsEngine.Window", ["TsEngine.IWindow"]);
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=Window.js.map