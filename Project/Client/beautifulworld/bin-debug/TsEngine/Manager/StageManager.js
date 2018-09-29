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
    var Layer;
    (function (Layer) {
        Layer[Layer["BG"] = 0] = "BG";
        Layer[Layer["SCREEN"] = 1] = "SCREEN";
        Layer[Layer["FACEUI"] = 2] = "FACEUI";
        Layer[Layer["WINDOW"] = 3] = "WINDOW";
        Layer[Layer["TOP"] = 4] = "TOP";
        Layer[Layer["TIP"] = 5] = "TIP";
    })(Layer = TsEngine.Layer || (TsEngine.Layer = {}));
    var StageManager = (function () {
        function StageManager() {
        }
        /**开始构建*/
        StageManager.initialize = function (stage, root) {
            var _this = this;
            StageManager.stage = stage;
            StageManager.root = root;
            stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            window.onresize = function () {
                StageManager.resizeTimer = egret.setTimeout(_this.onStageResize, _this, 300);
            };
            window.onerror = function (errorMessage, scriptURI, lineNumber) {
                console.error(_this, errorMessage, scriptURI, lineNumber);
            };
            /**创建默认层级*/
            var index = 0;
            for (var enumMember in Layer) {
                if (isNaN(parseInt(enumMember))) {
                    this.addLayer(index, enumMember);
                    index++;
                }
            }
            //第一次执行
            this.onStageResize();
        };
        /**
         * 添加层
         * @param	layerIndex
         * @param	layerName
         */
        StageManager.addLayer = function (layerIndex, layerName) {
            if (layerIndex === void 0) { layerIndex = -1; }
            layerIndex = layerIndex == -1 ? this.root.numChildren : layerIndex;
            var layer = (this.root.addChildAt(new egret.Sprite(), layerIndex));
            layer.name = layerName;
        };
        /**
         * 添加显示对象到对应层
         * @param	target
         * @param	layerName
         */
        StageManager.addToLayer = function (target, layerName) {
            var layer = this.getLayer(layerName);
            if (layer != null && target != null) {
                this.showDisplayObject(target, layer);
            }
        };
        /**
         * 从层中移除显示对象
         * @param	target
         * @param	layerName
         */
        StageManager.removeFromLayer = function (target, layerName) {
            var layer = this.getLayer(layerName);
            if (layer != null && target != null) {
                this.hideDisplayObject(target, layer);
            }
        };
        StageManager.getLayer = function (layerName) {
            layerName = typeof (layerName) == "number" ? Layer[layerName] : layerName;
            var layer = this.root.getChildByName(layerName);
            if (layer)
                return layer;
            return null;
        };
        StageManager.showLayer = function (layerName) {
            this.getLayer(layerName).visible = true;
        };
        StageManager.hideLayer = function (layerName) {
            this.getLayer(layerName).visible = false;
        };
        StageManager.showDisplayObject = function (target, layer) {
            if (target.parent == layer) {
                layer.setChildIndex(target, layer.numChildren - 1);
            }
            else {
                layer.addChild(target);
            }
        };
        StageManager.hideDisplayObject = function (target, layer) {
            if (target.parent == layer) {
                layer.removeChild(target);
            }
        };
        /**
        * 创建一个舞台模态蒙板
        * @param onTouch             点击蒙板回调
        * @param modalColor          蒙板颜色
        * @param modalAlpha         蒙板透明度
        */
        StageManager.createStageModalBlocker = function (onTouch, thisObject, modalColor, modalAlpha) {
            if (onTouch === void 0) { onTouch = null; }
            if (thisObject === void 0) { thisObject = null; }
            if (modalColor === void 0) { modalColor = 0x0; }
            if (modalAlpha === void 0) { modalAlpha = 0.6; }
            var blocker = new StageModalBlocker(onTouch, thisObject, modalColor, modalAlpha);
            return blocker;
        };
        Object.defineProperty(StageManager, "stageWidth", {
            /**舞台宽高*/
            get: function () {
                return StageManager.stage.stageWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageManager, "stageHeight", {
            get: function () {
                return StageManager.stage.stageHeight;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加自适应处理函数
         * @param	target           目标对象
         * @param	listener　　　处理函数
         */
        StageManager.addResizeListener = function (listener, thisObject) {
            if (this.getCallBackIndex(StageManager.resizeListeners, listener, thisObject) == -1) {
                StageManager.resizeListeners.push({ func: listener, thisObject: thisObject });
                listener.call(thisObject);
            }
        };
        /**
         * 删除自适应处理函数
         * @param	target           目标对象
         * @param	listener　　　处理函数
         */
        StageManager.removeResizeListener = function (listener, thisObject) {
            var index = this.getCallBackIndex(StageManager.resizeListeners, listener, thisObject);
            if (index != -1)
                StageManager.resizeListeners.splice(index, 1);
        };
        /**屏幕尺寸发生变化*/
        StageManager.onStageResize = function (e) {
            if (e === void 0) { e = null; }
            this.resizeTimer = null;
            //其他处理
            for (var j = 0; j < StageManager.resizeListeners.length; j++) {
                var obj = StageManager.resizeListeners[j];
                var listener = obj["func"];
                var thisObject = obj["thisObject"];
                listener.call(thisObject);
            }
        };
        StageManager.getCallBackIndex = function (callBacks, callback, thisObject) {
            var len = callBacks.length;
            for (var i = 0; i < len; i++) {
                var callObj = callBacks[i];
                if ((callObj["func"] === callback) && (callObj["thisObject"] === thisObject)) {
                    return i;
                }
            }
            return -1;
        };
        StageManager.scaleFactor = 1;
        StageManager.resizeListeners = new Array();
        StageManager.stageOffHeight = 0;
        return StageManager;
    }());
    TsEngine.StageManager = StageManager;
    __reflect(StageManager.prototype, "TsEngine.StageManager");
    /**舞台模态板*/
    var StageModalBlocker = (function (_super) {
        __extends(StageModalBlocker, _super);
        function StageModalBlocker(onTouch, thisObject, modalColor, modalAlpha) {
            if (onTouch === void 0) { onTouch = null; }
            if (thisObject === void 0) { thisObject = null; }
            if (modalColor === void 0) { modalColor = 0x0; }
            if (modalAlpha === void 0) { modalAlpha = 0.6; }
            var _this = _super.call(this, 10, 10, modalColor) || this;
            _this.touchEnabled = true;
            _this.thisObject = thisObject;
            _this.onTouch = onTouch;
            _this.alpha = modalAlpha;
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBlockTouch, _this, false);
            StageManager.addResizeListener(_this.onResize, _this);
            return _this;
        }
        StageModalBlocker.prototype.removeFromParent = function (dispose) {
            if (dispose === void 0) { dispose = false; }
            if (this.stage) {
                this.parent.removeChild(this);
            }
        };
        StageModalBlocker.prototype.onResize = function () {
            this.scaleX = StageManager.stageWidth / this.width;
            this.scaleY = StageManager.stageHeight / this.height;
        };
        StageModalBlocker.prototype.onBlockTouch = function (e) {
            if (this.onTouch != null)
                this.onTouch.call(this.thisObject);
        };
        return StageModalBlocker;
    }(eui.Rect));
    TsEngine.StageModalBlocker = StageModalBlocker;
    __reflect(StageModalBlocker.prototype, "TsEngine.StageModalBlocker");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=StageManager.js.map