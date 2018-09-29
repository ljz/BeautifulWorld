var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var WindowNavigator = (function () {
        function WindowNavigator(container, defaultEffectType) {
            this.windowMap = new Object();
            this.mWindowScaleFactor = 1;
            this.modalId = 0;
            this.windowContainer = container;
            this.defaultEffectType = defaultEffectType;
            this.activeWindows = new Array();
            this.windowSequence = [];
            this.modalBlocker = TsEngine.StageManager.createStageModalBlocker(this.onStageModalTouch, this);
        }
        Object.defineProperty(WindowNavigator.prototype, "windowScaleFactor", {
            get: function () {
                return this.mWindowScaleFactor;
            },
            set: function (value) {
                this.mWindowScaleFactor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WindowNavigator.prototype, "defaultEffectType", {
            /** 设置默认效果*/
            get: function () {
                return this.mDefaultEffectType;
            },
            set: function (value) {
                this.mDefaultEffectType = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 注册View
         * hasModal 是否有模态
         * modalAutoHide
         */
        WindowNavigator.prototype.registWindow = function (windowId, typeClass, skinUrl, resGroup, hasModal, modalClickHide, manualCloseOnly, windowLevel) {
            if (skinUrl === void 0) { skinUrl = null; }
            if (hasModal === void 0) { hasModal = true; }
            if (modalClickHide === void 0) { modalClickHide = true; }
            if (manualCloseOnly === void 0) { manualCloseOnly = false; }
            if (windowLevel === void 0) { windowLevel = 1; }
            if (this.windowMap[windowId] == null) {
                this.windowMap[windowId] = new TsEngine.WindowData(windowId, typeClass, hasModal, modalClickHide, manualCloseOnly, skinUrl, resGroup, windowLevel);
            }
            return this.windowMap[windowId];
        };
        //解除View
        WindowNavigator.prototype.unRegisterWindow = function (windowId) {
            if (windowId in this.windowMap) {
                delete this.windowMap[windowId];
            }
        };
        //是否存在View
        WindowNavigator.prototype.hasWindow = function (windowId) {
            return windowId in this.windowMap;
        };
        //获取View
        WindowNavigator.prototype.getWindow = function (windowId) {
            if (!(windowId in this.windowMap)) {
                TsEngine.Log.error(this, "ViewNavigator未找到对应的windowId！");
            }
            var windowData = this.windowMap[windowId];
            var window = windowData.instance;
            window.id = windowId;
            if (typeof (window.effect) == "undefined" && this.defaultEffectType)
                window.effect = new this.defaultEffectType();
            return window;
        };
        //获取窗口数据
        WindowNavigator.prototype.getWindowData = function (windowId) {
            return this.windowMap[windowId];
        };
        Object.defineProperty(WindowNavigator.prototype, "currentWindow", {
            //获取当前窗口
            get: function () {
                var len = this.activeWindows.length;
                if (len > 0) {
                    return this.activeWindows[len - 1];
                }
                return -1;
            },
            //设置当前窗口
            set: function (value) {
                if (value != -1 && !(value in this.windowMap))
                    TsEngine.Log.warn(this, "ViewNavigator未找到对应的windowId:" + value);
                var instance = this;
                var index;
                var windowData;
                if (value == -1) {
                    //隐藏当前打开的窗口
                    this.hideCurrentOpen(1);
                }
                else if (this.windowMap[value]) {
                    //组窗口处理
                    var realWindowId = instance.getRealWindowId(value);
                    TsEngine.Log.log(this, "打开窗口 ID:" + value + "|realWindowId:" + realWindowId);
                    if (instance.isWindowGroup(realWindowId)) {
                        windowData = this.windowMap[value];
                        var groupWindowData = instance.getWindowData(realWindowId);
                        var selectedId = groupWindowData.openList.getItemAt(0);
                        if ((value != realWindowId)) {
                            selectedId = value;
                            windowData.manualCloseOnly = false; //tab子窗口强制自动关闭
                            //活动状态直接打开子窗口
                            if (this.isActive(realWindowId)) {
                                realWindowId = value;
                            }
                        }
                        groupWindowData.groupCurrentOpen = selectedId;
                        groupWindowData.data = { selectedID: selectedId, tabData: windowData.data };
                    }
                    //显示窗口
                    var window = this.getWindow(realWindowId);
                    windowData = this.windowMap[realWindowId];
                    if (!this.isActive(realWindowId)) {
                        prepare(window);
                    }
                    else if (windowData.isOpen) {
                        window.data = windowData.data;
                        windowData.parent = null;
                    }
                }
                //开始准备数据并打开
                function prepare(win) {
                    var _this = this;
                    windowData = instance.windowMap[win.id];
                    instance.changeWindowState(win, TsEngine.WindowState.PREPARE);
                    instance.activeWindows.push(realWindowId);
                    win.prepare(function (data) {
                        if (!data || !(data instanceof TsEngine.HttpError)) {
                            if (data) {
                                windowData = instance.windowMap[win.id];
                                windowData.data = data;
                            }
                            load(win);
                        }
                        else {
                            instance.activeWindows.splice(_this.activeWindows.indexOf(win.id), 1);
                            instance.changeWindowState(win, TsEngine.WindowState.CLOSE);
                        }
                    });
                }
                //开始加载
                function load(win) {
                    windowData = instance.windowMap[win.id];
                    if (windowData.state != TsEngine.WindowState.CLOSE) {
                        if (!window.bInitialized) {
                            //以打开子标签的资源为预加载资源
                            if (windowData.groupCurrentOpen) {
                                windowData.resGroup = instance.getWindowData(windowData.groupCurrentOpen).resGroup;
                            }
                            window.load(windowData.skinUrl, windowData.resGroup, open);
                            instance.changeWindowState(win, TsEngine.WindowState.LOADING);
                        }
                        else {
                            open(window);
                        }
                    }
                }
                //开始准备数据并打开
                function open(win) {
                    windowData = instance.windowMap[win.id];
                    if (windowData.state != TsEngine.WindowState.CLOSE) {
                        //隐藏当前最上层窗口
                        instance.hideCurrentOpen(windowData.level);
                        //记录历史窗口顺序
                        instance.windowSequence.push(value);
                        //显示当前
                        win.scaleX = win.scaleY = instance.mWindowScaleFactor;
                        win.show(windowData.parent || instance.windowContainer, windowData.data, onOpen, onClose);
                        instance.changeWindowState(win, TsEngine.WindowState.OPEN);
                        windowData.parent = null;
                    }
                }
                //窗口打开
                function onOpen(win) {
                    windowData = instance.windowMap[win.id];
                    windowData.onOpen && windowData.onOpen.call(windowData.thisObj);
                }
                //窗口关闭
                function onClose(win) {
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
                    instance.changeWindowState(win, TsEngine.WindowState.CLOSE);
                }
            },
            enumerable: true,
            configurable: true
        });
        //返回
        WindowNavigator.prototype.back = function () {
            if (this.windowSequence.length > 1) {
                this.windowSequence.pop();
                this.currentWindow = this.windowSequence.pop();
            }
        };
        //隐藏view
        WindowNavigator.prototype.hideWindow = function (windowId, onClose, thisObj, destroy) {
            if (destroy === void 0) { destroy = false; }
            if (this.windowMap[windowId]) {
                var data = this.windowMap[windowId];
                if (onClose) {
                    data.onClose = onClose;
                    data.thisObj = thisObj;
                }
                var window = this.getWindow(windowId);
                if (data.isOpen) {
                    window.hide(destroy);
                }
                else if (data.isActive) {
                    this.changeWindowState(window, TsEngine.WindowState.CLOSE);
                    this.activeWindows.splice(this.activeWindows.indexOf(windowId), 1);
                }
                return true;
            }
            return false;
        };
        //隐藏所有活动视图
        WindowNavigator.prototype.hideAllWindow = function (destroy) {
            if (destroy === void 0) { destroy = false; }
            for (var i = 0; i < this.activeWindows.length; i++) {
                this.hideWindow(this.activeWindows[i], null, null, destroy);
                i--;
            }
        };
        //切换窗口
        WindowNavigator.prototype.toggleWindow = function (windowId) {
            var viewContent = this.getWindow(windowId);
            if (viewContent.bOpen)
                this.hideWindow(viewContent.id);
            else
                this.showWindow(viewContent.id);
        };
        //是否已打开
        WindowNavigator.prototype.isOpen = function (windowId) {
            if (this.windowMap[windowId]) {
                return this.windowMap[windowId].isOpen;
            }
            return false;
        };
        //是否处于活动状态
        WindowNavigator.prototype.isActive = function (windowId) {
            if (this.windowMap[windowId]) {
                return this.windowMap[windowId].isActive;
            }
            return false;
        };
        //是否处于加载状态
        WindowNavigator.prototype.isLoading = function (windowId) {
            if (this.windowMap[windowId]) {
                return this.windowMap[windowId].isLoading;
            }
            return false;
        };
        //显示view
        WindowNavigator.prototype.showWindow = function (windowId, data, parent, onOpen, onClose, thisObj, windowLevel) {
            if (data === void 0) { data = null; }
            if (parent === void 0) { parent = null; }
            if (windowLevel === void 0) { windowLevel = -1; }
            var windowData = this.windowMap[windowId];
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
        };
        //改变窗口状态
        WindowNavigator.prototype.changeWindowState = function (window, state) {
            var windowData = this.windowMap[window.id];
            if (windowData) {
                windowData.state = state;
                this.onStateChanged(window, state);
                this.checkWindowModal();
            }
        };
        WindowNavigator.prototype.onStateChanged = function (window, state) {
            TsEngine.Log.log(this, "WindowState changed ID:" + window.id + ",state:" + state);
        };
        //隐藏当前打开窗口
        WindowNavigator.prototype.hideCurrentOpen = function (windowLevel) {
            var count = this.activeWindows.length;
            if (count > 0) {
                for (var i = count - 1; i >= 0; i--) {
                    var windowId = this.activeWindows[i];
                    var windowData = this.windowMap[windowId];
                    var levelChecked = windowLevel == undefined || windowData.level == windowLevel;
                    if (levelChecked && windowData.isOpen && !windowData.manualCloseOnly) {
                        this.hideWindow(windowId);
                        return windowId;
                    }
                }
            }
            return -1;
        };
        WindowNavigator.prototype.checkWindowModal = function () {
            if (this.modalBlocker.parent != null)
                this.modalBlocker.parent.removeChild(this.modalBlocker);
            var activeCount = this.activeWindows.length;
            var windowData;
            for (var i = activeCount - 1; i >= 0; i--) {
                windowData = this.getWindowData(this.activeWindows[i]);
                if (windowData.hasModal) {
                    this.modalId = this.activeWindows[i];
                    var index = this.windowContainer.getChildIndex((this.getWindow(this.activeWindows[i])));
                    this.modalBlocker.alpha = windowData.modalAlpha;
                    this.windowContainer.addChildAt(this.modalBlocker, Math.max(index, 0));
                    break;
                }
            }
        };
        WindowNavigator.prototype.onStageModalTouch = function () {
            var windowData = this.getWindowData(this.modalId);
            if (windowData.modalClickHide && windowData.isOpen)
                this.hideWindow(this.modalId);
        };
        //-----------------------------------功能开放----------------------------------------
        /**
         * 设置功能开放列表
         * @param funcTypeList
         */
        WindowNavigator.prototype.setOpenList = function (funcTypeList, update) {
            if (update === void 0) { update = false; }
            for (var j = 0; j < funcTypeList.length; j++) {
                var funcTypeId = funcTypeList[j];
                this.setOpen(funcTypeId, true);
            }
        };
        /**
         * 控制tab页的开放与关闭
         * @param funcTypeList
         */
        WindowNavigator.prototype.setOpen = function (windowId, open) {
            for (var winId in this.windowMap) {
                var windowData = this.getWindowData(parseInt(winId));
                if (windowData.fullList) {
                    var openList = windowData.openList;
                    for (var i = 0; i < windowData.fullList.length; i++) {
                        var checkId = windowData.fullList[i];
                        if (windowId == checkId) {
                            var index = openList.getItemIndex(windowId);
                            if (open) {
                                if (index == -1) {
                                    openList.addItemAt(windowId, this.getInsertIndex(windowData, windowId));
                                }
                            }
                            else if (index != -1) {
                                openList.removeItemAt(index);
                            }
                        }
                    }
                }
            }
        };
        /**
         * 是否为组窗口
         */
        WindowNavigator.prototype.isWindowGroup = function (windowID) {
            if (windowID === void 0) { windowID = 0; }
            var windowData = this.getWindowData(windowID);
            return windowData && (windowData.fullList != null);
        };
        /**
         * 获取插入的序号
         */
        WindowNavigator.prototype.getInsertIndex = function (windowData, id) {
            var index = 0;
            for (var i = 0; i < windowData.fullList.length; i++) {
                var winId = windowData.fullList[i];
                if (winId != id) {
                    if (windowData.openList.getItemIndex(winId) != -1) {
                        index++;
                    }
                }
                else {
                    break;
                }
            }
            return index;
        };
        /**
         * 获取窗口的真实ID
         */
        WindowNavigator.prototype.getRealWindowId = function (checkWindowId) {
            if (checkWindowId === void 0) { checkWindowId = 0; }
            for (var windowId in this.windowMap) {
                var windowData = this.getWindowData(parseInt(windowId));
                if (windowData.fullList) {
                    var length = windowData.fullList.length;
                    for (var i = 0; i < length; i++) {
                        var id = windowData.fullList[i];
                        if (id == checkWindowId)
                            return parseInt(windowId);
                    }
                }
            }
            return checkWindowId;
        };
        return WindowNavigator;
    }());
    TsEngine.WindowNavigator = WindowNavigator;
    __reflect(WindowNavigator.prototype, "TsEngine.WindowNavigator");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=WindowNavigator.js.map