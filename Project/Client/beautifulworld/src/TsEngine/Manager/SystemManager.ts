
namespace TsEngine {
    //横竖屏
    export enum AspectRatio { Auto, Portrait, Landscape };

    export class SystemManager {
        public static isNotchMobile: boolean = false;//是否刘海屏
        private static models: Array<IStoreable> = new Array<IStoreable>();
        private static nativeStage: egret.Stage;
        private static stageFrameRate: number;
        private static mDeactivateFrameRate: number = 0.01;
        private static mAspectRatio: AspectRatio;

        private static onDeactivateFunc: Function;
        private static onBackFunc: Function;
        private static onActiveFunc: Function;
        private static onSuspendFunc: Function;
        private static thisObject: any;

        /**初始化*/
        public static initialize(): void {
            SystemManager.initVisibility();
        }

        /**初始化后台切换侦听*/
        private static initVisibility(): void {
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
                if ('hidden' in document) return 'hidden';
                for (var i = 0; i < prefixes.length; i++) {
                    if ((prefixes[i] + 'Hidden') in document)
                        return prefixes[i] + 'Hidden';
                }
                return null;
            }

            function isHidden() {
                var prop = getHiddenProp();
                if (!prop) return false;
                return document[prop];
            }
        }

        //横竖屏
        public static get aspectRatio(): AspectRatio {
            SystemManager.mAspectRatio = SystemManager.fullScreenWidth > SystemManager.fullScreenHeight ? AspectRatio.Landscape : AspectRatio.Portrait;
            return SystemManager.mAspectRatio;
        }

        //是否微信game
        public static get isWxGame(): boolean {
            return egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME;
        }

        public static get deactivateFrameRate(): number {
            return this.mDeactivateFrameRate;
        }

        public static set deactivateFrameRate(value: number) {
            this.mDeactivateFrameRate = value;
        }

        /**获取舞台宽*/
        public static get fullScreenWidth(): number {
            var result: number = 0;
            if (SystemManager.isMobile) {
                result = egret.MainContext.instance.stage.stageWidth;
            } else {
                result = document.documentElement.clientWidth;
            }
            //设备像素比,这里如果获取不到就自动默认为1,如果有特殊需求可以自行修改
            var radio: number = window.devicePixelRatio || 1;
            result *= radio;
            return result;
        }

        /**获取舞台高*/
        public static get fullScreenHeight(): number {
            var result: number = 0;
            if (SystemManager.isMobile) {
                result = egret.MainContext.instance.stage.stageHeight;
            } else {
                result = document.documentElement.clientHeight;
            }
            //设备像素比,这里如果获取不到就自动默认为1,如果有特殊需求可以自行修改
            var radio: number = window.devicePixelRatio || 1;
            result *= radio;
            return result;
        }

        /**是否是手持设备*/
        public static get isMobile(): boolean {
            return egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE;
        }

        /**是否苹果设备*/
        public static get isIOS(): boolean {
            return egret.Capabilities.os == "iOS";
        }

        /**是否Android设备*/
        public static get isAndroid(): boolean {
            return egret.Capabilities.os == "Android";
        }

        /**是否是pc*/
        public static get isPC(): boolean {
            return egret.MainContext.deviceType == egret.MainContext.DEVICE_PC;
        }

        /**注册设备状态回调*/
        public static registDeviceState(thisObject: any, onDeactivate: Function, onActive: Function = null, onBack: Function = null, onSuspend: Function = null): void {
            this.thisObject = thisObject;
            this.onDeactivateFunc = onDeactivate;
            this.onBackFunc = onBack;
            this.onActiveFunc = onActive;
            this.onSuspendFunc = onSuspend;
        }

        /**退出,只对andriod有效，ios系统由ios自己统一管理,需配置<key>UIApplicationExitsOnSuspend</key><true/>*/
        public static exit(): void {
            var length: number = this.models.length;
            for (var i: number = 0; i < length; i++) {
                var model: IStoreable = this.models[i];
                this.saveModel(model);
            }
        }


        /**加载本地model数据*/
        public static loadModel(model: IStoreable): void {
            var shareObject: SharedObject = SharedObject.getLocal(model.path);
            model.load(shareObject.data);
        }


        /**保存model数据到本地*/
        public static saveModel(model: IStoreable): void {
            var shareObject: SharedObject = SharedObject.getLocal(model.path);
            model.save(shareObject.data);
            shareObject.flush();
        }

        /**添加可保存的model*/
        public static addStoreable(model: IStoreable): void {
            this.models.push(model);
            this.loadModel(model);
        }

        /**删除可保存的model*/
        public static removeStoreable(model: IStoreable): void {
            var index: number = this.models.indexOf(model);
            if (index != -1) {
                this.models.splice(index, 1);
            }
        }

        /*获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook*/
        public static get platform(): string {
            var ua = SystemManager.getUserAgent();
            var microStr = "" + ua.match(/MicroMessenger/i);
            if (("" + ua.match(/windows nt/i)) == "windows nt") {
                return "windows";
            } else if (("" + ua.match(/iphone/i)) == "iphone") {
                return "ios";
            } else if (("" + ua.match(/android/i)) == "android") {
                return "android";
            } else if (("" + ua.match(/ipad/i)) == "ipad") {
                return "ipad";
            } else if (("" + ua.match(/linux/i)) == "linux") {
                return "linux";
            } else if (("" + ua.match(/mac/i)) == "mac") {
                return "mac";
            } else if (("" + ua.match(/ucbrower/i)) == "ucbrower") {
                return "ucbrower";
            } else {
                console.log("未知系统类型");
            }
            return "";
        }

        public static getUserAgent(): string {
            if (window.navigator && window.navigator.userAgent) {
                return window.navigator.userAgent.toLowerCase();
            }
            return "runtime";
        }


        /**当应用处于活动状态*/
        private static onAppActivate(): void {
            var length: number = this.models.length;
            for (var i: number = 0; i < length; i++) {
                var model: IStoreable = this.models[i];
                SystemManager.loadModel(model);
            }
            if (SystemManager.onActiveFunc) {
                SystemManager.onActiveFunc.call(SystemManager.thisObject);
            }
        }

        /**当应用处于非活动状态*/
        private static onAppDeactivate(): void {
            var length: number = this.models.length;
            for (var i: number = 0; i < length; i++) {
                var model: IStoreable = this.models[i];
                this.saveModel(model);
            }
            if (SystemManager.onDeactivateFunc) {
                SystemManager.onDeactivateFunc.call(SystemManager.thisObject);
            }
        }

        /**IOS退出处理*/
        private static onIosSuspend(e: egret.Event): void {

        }

        /**键盘侦听*/
        private static stageKeyDownHandler(event: KeyboardEvent): void {

        }
    }
}    
