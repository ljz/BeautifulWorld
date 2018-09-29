var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    //横竖屏
    var AspectRatio;
    (function (AspectRatio) {
        AspectRatio[AspectRatio["Auto"] = 0] = "Auto";
        AspectRatio[AspectRatio["Portrait"] = 1] = "Portrait";
        AspectRatio[AspectRatio["Landscape"] = 2] = "Landscape";
    })(AspectRatio = TsEngine.AspectRatio || (TsEngine.AspectRatio = {}));
    ;
    var SystemManager = (function () {
        function SystemManager() {
        }
        /**初始化*/
        SystemManager.initialize = function () {
            SystemManager.initVisibility();
        };
        /**初始化后台切换侦听*/
        SystemManager.initVisibility = function () {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                return;
            }
            var visProp = getHiddenProp();
            if (visProp) {
                var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
                document.addEventListener(evtname, visChange);
            }
            function visChange() {
                if (isHidden())
                    SystemManager.onAppDeactivate();
                else
                    SystemManager.onAppActivate();
            }
            function getHiddenProp() {
                var prefixes = ['webkit', 'moz', 'ms', 'o'];
                if ('hidden' in document)
                    return 'hidden';
                for (var i = 0; i < prefixes.length; i++) {
                    if ((prefixes[i] + 'Hidden') in document)
                        return prefixes[i] + 'Hidden';
                }
                return null;
            }
            function isHidden() {
                var prop = getHiddenProp();
                if (!prop)
                    return false;
                return document[prop];
            }
        };
        Object.defineProperty(SystemManager, "aspectRatio", {
            //横竖屏
            get: function () {
                SystemManager.mAspectRatio = SystemManager.fullScreenWidth > SystemManager.fullScreenHeight ? AspectRatio.Landscape : AspectRatio.Portrait;
                return SystemManager.mAspectRatio;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SystemManager, "isWxGame", {
            //是否微信game
            get: function () {
                return egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SystemManager, "deactivateFrameRate", {
            get: function () {
                return this.mDeactivateFrameRate;
            },
            set: function (value) {
                this.mDeactivateFrameRate = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SystemManager, "fullScreenWidth", {
            /**获取舞台宽*/
            get: function () {
                var result = 0;
                if (SystemManager.isMobile) {
                    result = egret.MainContext.instance.stage.stageWidth;
                }
                else {
                    result = document.documentElement.clientWidth;
                }
                //设备像素比,这里如果获取不到就自动默认为1,如果有特殊需求可以自行修改
                var radio = window.devicePixelRatio || 1;
                result *= radio;
                return result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SystemManager, "fullScreenHeight", {
            /**获取舞台高*/
            get: function () {
                var result = 0;
                if (SystemManager.isMobile) {
                    result = egret.MainContext.instance.stage.stageHeight;
                }
                else {
                    result = document.documentElement.clientHeight;
                }
                //设备像素比,这里如果获取不到就自动默认为1,如果有特殊需求可以自行修改
                var radio = window.devicePixelRatio || 1;
                result *= radio;
                return result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SystemManager, "isMobile", {
            /**是否是手持设备*/
            get: function () {
                return egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SystemManager, "isIOS", {
            /**是否苹果设备*/
            get: function () {
                return egret.Capabilities.os == "iOS";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SystemManager, "isAndroid", {
            /**是否Android设备*/
            get: function () {
                return egret.Capabilities.os == "Android";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SystemManager, "isPC", {
            /**是否是pc*/
            get: function () {
                return egret.MainContext.deviceType == egret.MainContext.DEVICE_PC;
            },
            enumerable: true,
            configurable: true
        });
        /**注册设备状态回调*/
        SystemManager.registDeviceState = function (thisObject, onDeactivate, onActive, onBack, onSuspend) {
            if (onActive === void 0) { onActive = null; }
            if (onBack === void 0) { onBack = null; }
            if (onSuspend === void 0) { onSuspend = null; }
            this.thisObject = thisObject;
            this.onDeactivateFunc = onDeactivate;
            this.onBackFunc = onBack;
            this.onActiveFunc = onActive;
            this.onSuspendFunc = onSuspend;
        };
        /**退出,只对andriod有效，ios系统由ios自己统一管理,需配置<key>UIApplicationExitsOnSuspend</key><true/>*/
        SystemManager.exit = function () {
            var length = this.models.length;
            for (var i = 0; i < length; i++) {
                var model = this.models[i];
                this.saveModel(model);
            }
        };
        /**加载本地model数据*/
        SystemManager.loadModel = function (model) {
            var shareObject = TsEngine.SharedObject.getLocal(model.path);
            model.load(shareObject.data);
        };
        /**保存model数据到本地*/
        SystemManager.saveModel = function (model) {
            var shareObject = TsEngine.SharedObject.getLocal(model.path);
            model.save(shareObject.data);
            shareObject.flush();
        };
        /**添加可保存的model*/
        SystemManager.addStoreable = function (model) {
            this.models.push(model);
            this.loadModel(model);
        };
        /**删除可保存的model*/
        SystemManager.removeStoreable = function (model) {
            var index = this.models.indexOf(model);
            if (index != -1) {
                this.models.splice(index, 1);
            }
        };
        Object.defineProperty(SystemManager, "platform", {
            /*获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook*/
            get: function () {
                var ua = SystemManager.getUserAgent();
                var microStr = "" + ua.match(/MicroMessenger/i);
                if (("" + ua.match(/windows nt/i)) == "windows nt") {
                    return "windows";
                }
                else if (("" + ua.match(/iphone/i)) == "iphone") {
                    return "ios";
                }
                else if (("" + ua.match(/android/i)) == "android") {
                    return "android";
                }
                else if (("" + ua.match(/ipad/i)) == "ipad") {
                    return "ipad";
                }
                else if (("" + ua.match(/linux/i)) == "linux") {
                    return "linux";
                }
                else if (("" + ua.match(/mac/i)) == "mac") {
                    return "mac";
                }
                else if (("" + ua.match(/ucbrower/i)) == "ucbrower") {
                    return "ucbrower";
                }
                else {
                    console.log("未知系统类型");
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        SystemManager.getUserAgent = function () {
            if (window.navigator && window.navigator.userAgent) {
                return window.navigator.userAgent.toLowerCase();
            }
            return "runtime";
        };
        /**当应用处于活动状态*/
        SystemManager.onAppActivate = function () {
            var length = this.models.length;
            for (var i = 0; i < length; i++) {
                var model = this.models[i];
                SystemManager.loadModel(model);
            }
            if (SystemManager.onActiveFunc) {
                SystemManager.onActiveFunc.call(SystemManager.thisObject);
            }
        };
        /**当应用处于非活动状态*/
        SystemManager.onAppDeactivate = function () {
            var length = this.models.length;
            for (var i = 0; i < length; i++) {
                var model = this.models[i];
                this.saveModel(model);
            }
            if (SystemManager.onDeactivateFunc) {
                SystemManager.onDeactivateFunc.call(SystemManager.thisObject);
            }
        };
        /**IOS退出处理*/
        SystemManager.onIosSuspend = function (e) {
        };
        /**键盘侦听*/
        SystemManager.stageKeyDownHandler = function (event) {
        };
        SystemManager.isNotchMobile = false; //是否刘海屏
        SystemManager.models = new Array();
        SystemManager.mDeactivateFrameRate = 0.01;
        return SystemManager;
    }());
    TsEngine.SystemManager = SystemManager;
    __reflect(SystemManager.prototype, "TsEngine.SystemManager");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=SystemManager.js.map