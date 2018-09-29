
namespace TsEngine {
    export class WindowNavigator {
        private windowMap: Object = new Object();
        private windowContainer: egret.DisplayObjectContainer;
        private mWindowScaleFactor: number = 1;
        private activeWindows: Array<number>;
        private mDefaultEffectType: any;
        private windowSequence: number[];
        constructor(container: egret.DisplayObjectContainer, defaultEffectType?: any) {
            this.windowContainer = container;
            this.defaultEffectType = defaultEffectType;
            this.activeWindows = new Array<number>();
            this.windowSequence = [];

            this.modalBlocker = StageManager.createStageModalBlocker(this.onStageModalTouch, this);
        }

        public get windowScaleFactor(): number {
            return this.mWindowScaleFactor;
        }

        public set windowScaleFactor(value: number) {
            this.mWindowScaleFactor = value;
        }

        /** 设置默认效果*/
        public get defaultEffectType(): any {
            return this.mDefaultEffectType;
        }

        public set defaultEffectType(value: any) {
            this.mDefaultEffectType = value;
        }

        /**
         * 注册View
         * hasModal 是否有模态
         * modalAutoHide
         */

        public registWindow<T extends IWindow>(windowId: number, typeClass: new () => T, skinUrl: string = null, resGroup?: string, hasModal: boolean = true, modalClickHide: boolean = true, manualCloseOnly: boolean = false, windowLevel: number = 1): WindowData {
            if (this.windowMap[windowId] == null) {
                this.windowMap[windowId] = new WindowData(windowId, typeClass, hasModal, modalClickHide, manualCloseOnly, skinUrl, resGroup, windowLevel);
            }
            return this.windowMap[windowId];
        }

        //解除View
        public unRegisterWindow(windowId: number): void {
            if (windowId in this.windowMap) {
                delete this.windowMap[windowId];
            }
        }

        //是否存在View
        public hasWindow(windowId: number): boolean {
            return windowId in this.windowMap;
        }

        //获取View
        public getWindow(windowId: number): IWindow {
            if (!(windowId in this.windowMap)) {
                Log.error(this, "ViewNavigator未找到对应的windowId！");
            }

            let windowData: WindowData = this.windowMap[windowId];
            let window: IWindow = windowData.instance;
            window.id = windowId;
            if (typeof (window.effect) == "undefined" && this.defaultEffectType) window.effect = new this.defaultEffectType();
            return window;
        }

        //获取窗口数据
        public getWindowData(windowId: number): WindowData {
            return this.windowMap[windowId];
        }

        //获取当前窗口
        public get currentWindow(): number {
            var len: number = this.activeWindows.length;
            if (len > 0) {
                return this.activeWindows[len - 1];
            }
            return -1;
        }

        //返回
        public back(): void {
            if (this.windowSequence.length > 1) {
                this.windowSequence.pop();
                this.currentWindow = this.windowSequence.pop();
            }
        }

        //设置当前窗口
        public set currentWindow(value: number) {
            if (value != -1 && !(value in this.windowMap))
                Log.warn(this, "ViewNavigator未找到对应的windowId:" + value);

            var instance: WindowNavigator = this;
            var index: number;
            var windowData: WindowData;
            if (value == -1) {
                //隐藏当前打开的窗口
                this.hideCurrentOpen(1);
            } else if (this.windowMap[value]) {
                //组窗口处理
                var realWindowId: number = instance.getRealWindowId(value);
                Log.log(this, "打开窗口 ID:" + value + "|realWindowId:" + realWindowId);
                if (instance.isWindowGroup(realWindowId)) {
                    windowData = this.windowMap[value];
                    var groupWindowData: WindowData = instance.getWindowData(realWindowId);
                    let selectedId = groupWindowData.openList.getItemAt(0);
                    if ((value != realWindowId)) {
                        selectedId = value;
                        windowData.manualCloseOnly = false;//tab子窗口强制自动关闭
                        //活动状态直接打开子窗口
                        if (this.isActive(realWindowId)) {
                            realWindowId = value;
                        }
                    }
                    groupWindowData.groupCurrentOpen = selectedId;
                    groupWindowData.data = { selectedID: selectedId, tabData: windowData.data };
                }
                //显示窗口
                var window: IWindow = this.getWindow(realWindowId);
                windowData = this.windowMap[realWindowId];
                if (!this.isActive(realWindowId)) {
                    prepare(window);
                } else if (windowData.isOpen) {
                    window.data = windowData.data;
                    windowData.parent = null;
                }
            }

            //开始准备数据并打开
            function prepare(win: IWindow): void {
                windowData = instance.windowMap[win.id];
                instance.changeWindowState(win, WindowState.PREPARE);
                instance.activeWindows.push(realWindowId);
                win.prepare((data) => {
                    if (!data || !(data instanceof HttpError)) {
                        if (data) {
                            windowData = instance.windowMap[win.id];
                            windowData.data = data;
                        }
                        load(win);
                    } else {
                        instance.activeWindows.splice(this.activeWindows.indexOf(win.id), 1);
                        instance.changeWindowState(win, WindowState.CLOSE);
                    }
                });
            }

            //开始加载
            function load(win: IWindow): void {
                windowData = instance.windowMap[win.id];
                if (windowData.state != WindowState.CLOSE) {
                    if (!window.bInitialized) {
                        //以打开子标签的资源为预加载资源
                        if (windowData.groupCurrentOpen) {
                            windowData.resGroup = instance.getWindowData(windowData.groupCurrentOpen).resGroup;
                        }
                        window.load(windowData.skinUrl, windowData.resGroup, open);
                        instance.changeWindowState(win, WindowState.LOADING);
                    } else {
                        open(window);
                    }
                }
            }

            //开始准备数据并打开
            function open(win: IWindow): void {
                windowData = instance.windowMap[win.id];
                if (windowData.state != WindowState.CLOSE) {
                    //隐藏当前最上层窗口
                    instance.hideCurrentOpen(windowData.level);
                    //记录历史窗口顺序
                    instance.windowSequence.push(value);
                    //显示当前
                    (<egret.DisplayObject><any>win).scaleX = (<egret.DisplayObject><any>win).scaleY = instance.mWindowScaleFactor;
                    win.show(windowData.parent || instance.windowContainer, windowData.data, onOpen, onClose);
                    instance.changeWindowState(win, WindowState.OPEN);
                    windowData.parent = null;
                }
            }

            //窗口打开
            function onOpen(win: IWindow) {
                windowData = instance.windowMap[win.id];
                windowData.onOpen && windowData.onOpen.call(windowData.thisObj);
            }

            //窗口关闭
            function onClose(win: IWindow) {
                windowData = instance.windowMap[win.id];
                windowData.onClose && windowData.onClose.call(windowData.thisObj);
                windowData.data = null;
                windowData.onOpen = null;
                windowData.onClose = null;
                index = instance.activeWindows.indexOf(win.id);
                if (index >= 0) {
                    instance.activeWindows.splice(index, 1);
                    if (instance.isWindowGroup(win.id)) {
                        instance.hideWindow(windowData.groupCurrentOpen);
                        windowData.groupCurrentOpen = -1;
                    }
                }
                instance.changeWindowState(win, WindowState.CLOSE);
            }
        }

        //隐藏view
        public hideWindow(windowId: number, onClose?: Function, thisObj?: any, destroy: boolean = false): boolean {
            if (this.windowMap[windowId]) {
                var data: WindowData = this.windowMap[windowId];
                if (onClose) {
                    data.onClose = onClose;
                    data.thisObj = thisObj;
                }
                var window: IWindow = this.getWindow(windowId);
                if (data.isOpen) {
                    window.hide(destroy);
                } else if (data.isActive) {
                    this.changeWindowState(window, WindowState.CLOSE);
                    this.activeWindows.splice(this.activeWindows.indexOf(windowId), 1);
                }
                return true;
            }
            return false;
        }

        //隐藏所有活动视图
        public hideAllWindow(destroy: boolean = false): void {
            for (var i: number = 0; i < this.activeWindows.length; i++) {
                this.hideWindow(this.activeWindows[i], null, null, destroy);
                i--;
            }
        }

        //切换窗口
        public toggleWindow(windowId: number): void {
            var viewContent: IWindow = this.getWindow(windowId);
            if (viewContent.bOpen)
                this.hideWindow(viewContent.id);
            else
                this.showWindow(viewContent.id);
        }

        //是否已打开
        public isOpen(windowId: number): boolean {
            if (this.windowMap[windowId]) {
                return (<WindowData>this.windowMap[windowId]).isOpen;
            }

            return false;
        }

        //是否处于活动状态
        public isActive(windowId: number): boolean {
            if (this.windowMap[windowId]) {
                return (<WindowData>this.windowMap[windowId]).isActive;
            }
            return false;
        }

        //是否处于加载状态
        public isLoading(windowId: number): boolean {
            if (this.windowMap[windowId]) {
                return (<WindowData>this.windowMap[windowId]).isLoading;
            }
            return false;
        }

        //显示view
        public showWindow(windowId: number, data: any = null, parent: egret.DisplayObjectContainer = null, onOpen?: Function, onClose?: Function, thisObj?: any, windowLevel: number = -1): void {
            var windowData: WindowData = this.windowMap[windowId];
            if (windowData) {
                if (windowLevel != -1) {
                    windowData.level = windowLevel;
                }
                windowData.onOpen = onOpen;
                windowData.onClose = onClose;
                windowData.thisObj = thisObj;
                windowData.data = data;
                windowData.parent = parent;
                this.currentWindow = windowId;
            }
        }

        //改变窗口状态
        private changeWindowState(window: IWindow, state: WindowState): void {
            var windowData: WindowData = this.windowMap[window.id];
            if (windowData) {
                windowData.state = state;
                this.onStateChanged(window, state);
                this.checkWindowModal();
            }
        }

        protected onStateChanged(window: IWindow, state: WindowState): void {
            Log.log(this, "WindowState changed ID:" + window.id + ",state:" + state);
        }

        //隐藏当前打开窗口
        private hideCurrentOpen(windowLevel?: number): number {
            var count: number = this.activeWindows.length;
            if (count > 0) {
                for (var i: number = count - 1; i >= 0; i--) {
                    var windowId = this.activeWindows[i];
                    var windowData: WindowData = this.windowMap[windowId];
                    var levelChecked: boolean = windowLevel == undefined || windowData.level == windowLevel;
                    if (levelChecked && windowData.isOpen && !windowData.manualCloseOnly) {
                        this.hideWindow(windowId);
                        return windowId;
                    }
                }
            }
            return -1;
        }

        /**---------------------------------窗口蒙板----------------------------------*/
        private modalBlocker: egret.DisplayObject;
        private modalId: number = 0;
        private checkWindowModal(): void {
            if (this.modalBlocker.parent != null)
                this.modalBlocker.parent.removeChild(this.modalBlocker);
            var activeCount: number = this.activeWindows.length;
            var windowData: WindowData;
            for (var i: number = activeCount - 1; i >= 0; i--) {
                windowData = this.getWindowData(this.activeWindows[i]);
                if (windowData.hasModal) {
                    this.modalId = this.activeWindows[i];
                    var index: number = this.windowContainer.getChildIndex(<egret.DisplayObject><any>(this.getWindow(this.activeWindows[i])));
                    this.modalBlocker.alpha = windowData.modalAlpha;
                    this.windowContainer.addChildAt(this.modalBlocker, Math.max(index, 0));
                    break;
                }
            }
        }

        private onStageModalTouch(): void {
            var windowData: WindowData = this.getWindowData(this.modalId);
            if (windowData.modalClickHide && windowData.isOpen) this.hideWindow(this.modalId);
        }


        //-----------------------------------功能开放----------------------------------------
        /**
         * 设置功能开放列表
         * @param funcTypeList
         */
        public setOpenList(funcTypeList: Array<any>, update: boolean = false): void {
            for (var j = 0; j < funcTypeList.length; j++) {
                var funcTypeId: number = funcTypeList[j];
                this.setOpen(funcTypeId, true);
            }
        }

        /**
         * 控制tab页的开放与关闭
         * @param funcTypeList
         */
        public setOpen(windowId: number, open: boolean): void {
            for (var winId in this.windowMap) {
                var windowData: WindowData = this.getWindowData(parseInt(winId));
                if (windowData.fullList) {
                    var openList: eui.ArrayCollection = windowData.openList;
                    for (var i: number = 0; i < windowData.fullList.length; i++) {
                        var checkId: number = windowData.fullList[i];
                        if (windowId == checkId) {
                            var index: number = openList.getItemIndex(windowId);
                            if (open) {
                                if (index == -1) {
                                    openList.addItemAt(windowId, this.getInsertIndex(windowData, windowId));
                                }
                            } else if (index != -1) {
                                openList.removeItemAt(index);
                            }
                        }
                    }
                }
            }
        }

        /**
         * 是否为组窗口
         */
        public isWindowGroup(windowID: number = 0): boolean {
            var windowData: any = this.getWindowData(windowID);
            return windowData && (windowData.fullList != null);
        }

        /**
         * 获取插入的序号
         */
        private getInsertIndex(windowData: WindowData, id: number): number {
            var index: number = 0;
            for (var i = 0; i < windowData.fullList.length; i++) {
                var winId: number = windowData.fullList[i];
                if (winId != id) {
                    if (windowData.openList.getItemIndex(winId) != -1) {
                        index++;
                    }
                } else {
                    break;
                }
            }
            return index;
        }

        /**
         * 获取窗口的真实ID
         */
        private getRealWindowId(checkWindowId: number = 0): number {
            for (var windowId in this.windowMap) {
                var windowData: any = this.getWindowData(parseInt(windowId));
                if (windowData.fullList) {
                    var length: number = windowData.fullList.length;
                    for (var i: number = 0; i < length; i++) {
                        var id: number = windowData.fullList[i];
                        if (id == checkWindowId)
                            return parseInt(windowId);
                    }
                }
            }

            return checkWindowId;
        }
    }
}