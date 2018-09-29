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
    var View = (function (_super) {
        __extends(View, _super);
        function View() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.waitFuncList = [];
            _this.initPartMap = {};
            return _this;
        }
        View.prototype.load = function (skinUrl, resGroup, onComplete, onProgress, thisObject) {
            function loadSkin() {
                if (skinUrl != null && this.skinName == null) {
                    TsEngine.ResourceManager.loadSkin(skinUrl, initSkin, this);
                }
                else {
                    initSkin();
                }
            }
            function initSkin(clazz, url) {
                if (clazz === void 0) { clazz = null; }
                if (url === void 0) { url = null; }
                if (clazz != null) {
                    this.skinName = clazz;
                }
                else {
                    console.warn(this, "not found SkinClass :" + url);
                }
                if (!this.bInitialized) {
                    this.bInitialized = true;
                    this.onInit();
                    for (var key in this.initPartMap) {
                        this.initPartMap[key].init();
                    }
                    if (onComplete != null)
                        onComplete.call(thisObject, this);
                    //初始化完成后需要执行的函数列表
                    if (this.waitFuncList.length > 0) {
                        for (var _i = 0, _a = this.waitFuncList; _i < _a.length; _i++) {
                            var func = _a[_i];
                            func();
                        }
                        this.waitFuncList = [];
                    }
                }
            }
        };
        View.prototype.show = function (container, data, onOpenFunc, onCloseFunc, thisObject) {
        };
        View.prototype.hide = function (destroy) {
        };
        /**准备窗口(主要用于窗口数据的请求回调)*/
        View.prototype.prepare = function (onComplete) {
        };
        //宽高自适应舞台居中
        View.prototype.centerStage = function () {
        };
        //销毁
        View.prototype.destroy = function () { };
        /** 窗口打开*/
        View.prototype.onOpen = function () { };
        /** 窗口关闭[清除状态等]*/
        View.prototype.onClose = function () { };
        /** 设置数据*/
        View.prototype.onData = function () { };
        /** 窗口销毁[销毁整个窗口，数据等]*/
        View.prototype.onDestroy = function () { };
        /**快捷方法*/
        //安全执行（在view初始化完成之后）
        View.prototype.partAdded = function (partName, instance) { };
        //重置皮肤信息到初始信息
        View.prototype.resetSkinParts = function () { };
        //设置元素刘海适配
        View.prototype.setNotchFit = function (element) { };
        View.prototype.callSafe = function (func, self) {
            if (this.bInitialized) {
                func.call(self);
            }
            else {
                func = self ? func.bind(self) : func;
                this.waitFuncList.push(func);
            }
        };
        View.prototype.addClick = function (target, callBack, thisObj) { };
        View.prototype.removeClick = function (target, callBack, thisObj) { };
        View.prototype.removeFromParent = function (bDestroy) { };
        return View;
    }(eui.Component));
    TsEngine.View = View;
    __reflect(View.prototype, "TsEngine.View", ["TsEngine.IView"]);
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=View.js.map