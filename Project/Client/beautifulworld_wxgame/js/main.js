var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        return _super.call(this) || this;
    }
    BaseView.prototype.init = function () {
        this.bindEvent();
        this.ListenEvent();
    };
    BaseView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BaseView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    BaseView.prototype.setShowArgs = function (args) {
    };
    //绑定ui控件的事件
    BaseView.prototype.bindEvent = function () {
    };
    //监听事件：关心的消息广播之后这里就听到了。然后刷新数据
    BaseView.prototype.ListenEvent = function () {
    };
    BaseView.prototype.close = function () {
    };
    return BaseView;
}(eui.Component));
__reflect(BaseView.prototype, "BaseView", ["eui.UIComponent", "egret.DisplayObject"]);
var BaseLogic = (function () {
    function BaseLogic() {
        this.listenEvent();
    }
    BaseLogic.prototype.destroy = function () {
        this.removeEvent();
    };
    BaseLogic.prototype.listenEvent = function () {
        console.trace("未实现这个接口");
    };
    BaseLogic.prototype.removeEvent = function () {
        RemoveAllEventByObj(this);
    };
    BaseLogic.prototype.close = function () {
        this.destroy();
    };
    return BaseLogic;
}());
__reflect(BaseLogic.prototype, "BaseLogic");
var BaseShare = (function () {
    function BaseShare() {
    }
    //微信分享
    BaseShare.prototype.wxShare = function (title, img, query) {
        // platform.share.shareAppMessage(
        //     title, img, query,
        //     this.onShareSuc.bind(this),
        //     this.onShareFail.bind(this),
        //     this.onShareFinish.bind(this)
        // );
        // PostRequest.openEvent(this.type + "_share");
    };
    //H5分享
    BaseShare.prototype.h5Share = function (title, img, desc, shareId, _shareCustomParam) {
        // HORTOR_AGENT.config({
        // 			share: {
        // 				timeline: {
        // 					title: title,
        // 					imgUrl: img,
        // 					success: this.onShareSuc
        // 				},
        // 				friend: {
        // 					title: title,
        // 					imgUrl: img,
        // 					desc: desc,
        // 					shareConfigId: shareId,
        // 					success: this.onShareSuc
        // 				},
        // 				shareCustomParam: _shareCustomParam
        // 			}
        // 		});
    };
    //分享成功
    BaseShare.prototype.onShareSuc = function () {
        // InitMark.wxSharing = true;
        // console.error("未实现onShareSuc");
    };
    BaseShare.prototype.onShareFail = function () {
        console.log("\u5206\u4EAB\u5931\u8D25");
    };
    BaseShare.prototype.onShareFinish = function () {
        console.log("\u5206\u4EAB\u7ED3\u675F");
    };
    //点击分享进入
    BaseShare.prototype.onShareEnter = function (params) {
        console.error("未实现onShareEnter");
    };
    return BaseShare;
}());
__reflect(BaseShare.prototype, "BaseShare");
var UiManager = (function () {
    function UiManager() {
        this.UiList = {};
    }
    UiManager.prototype.openPanel = function (name, parent, args) {
        if (!UiInfoList[name]) {
            console.log("没有找到这个名字，换一个名字试试看");
            return;
        }
        console.log("parent=== ", parent);
        var info = UiInfoList[name];
        var viewClass = info[0];
        var logicClass = info[1];
        console.log("viewClass == ", viewClass);
        // console.log("window[viewClass] = ", window[viewClass])
        var viewObj = new MainUIView(); // new window[viewClass]();
        var logicObj = new MainUILogic(); //window[logicClass]();
        this.UiList[name] = { viewObj: viewObj, logicObj: logicObj };
        parent.addChild(viewObj);
        console.log("viewObj=== ", viewObj, viewObj.parent);
        console.log(">>>>>>>>", parent.getChildByName("MainUIView"));
        viewObj.setShowArgs(args);
    };
    UiManager.prototype.closePanel = function (name) {
        if (!UiInfoList[name])
            return;
        var viewObj, logicObj = this.UiList[name];
        viewObj.close();
        logicObj.close();
        this.UiList[name] = null;
    };
    return UiManager;
}());
__reflect(UiManager.prototype, "UiManager");
var g_UiMgr = new UiManager();
function OpenPanel(name, parent, args) {
    g_UiMgr.openPanel(name, parent, args);
    console.log("parent.child = ", parent.getChildByName("MainUIView"));
}
function ClosePanel(name) {
    g_UiMgr.closePanel(name);
}
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        console.log(">>>>创建游戏场景");
        OpenPanel("MainUIView", this);
        console.log(">>>>>已经打开了界面");
        // return;
        // let sky = this.createBitmapByName("mainBg_jpg");
        // this.addChild(sky);
        // let stageW = this.stage.stageWidth;
        // let stageH = this.stage.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;
        // let topMask = new egret.Shape();
        // topMask.graphics.beginFill(0x000000, 0.5);
        // topMask.graphics.drawRect(0, 0, stageW, 172);
        // topMask.graphics.endFill();
        // topMask.y = 33;
        // this.addChild(topMask);
        // let icon = this.createBitmapByName("title_jpg");
        // this.addChild(icon);
        // icon.width = 175
        // icon.height = 172
        // icon.x = 0;
        // icon.y = 33;
        // let button = new eui.Button();
        // button.label = "刷新";
        // button.horizontalCenter = 0;
        // button.verticalCenter = 0;
        // this.addChild(button);
        // button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.share = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var UiInfoList = {
    "MainUIView": ["MainUIView", "MainUILogic"],
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
/**
 * Created by liaojiangzheng on 18/7/31.
 */
function AddEventListener(type, listener, thisObject, useCapture, priority) {
    g_Dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
    if (!g_EventsByObj[thisObject]) {
        g_EventsByObj[thisObject] = {};
    }
    g_EventsByObj[thisObject][type] = { listener: listener, useCapture: useCapture };
}
function DispatchEvent(e) {
    g_Dispatcher.dispatchEvent(e);
}
function HasEventListener(type) {
    return g_Dispatcher.hasEventListener(type);
}
function RemoveEventListener(type, listener, thisObject, useCapture) {
    g_Dispatcher.removeEventListener(type, listener, thisObject, useCapture);
    g_EventsByObj[thisObject][type] = null;
}
function RemoveAllEventByObj(thisObject) {
    if (!g_EventsByObj[thisObject])
        return;
    for (var type in g_EventsByObj[thisObject]) {
        var listener = void 0, useCapture = g_EventsByObj[thisObject][type];
        RemoveEventListener(type, listener, useCapture);
    }
    g_EventsByObj[thisObject] = null;
}
function SendEvent(e, data) {
    var eve = new egret.Event(e);
    eve.data = data;
    g_Dispatcher.dispatchEvent(eve);
}
var g_Dispatcher = new egret.EventDispatcher();
var g_EventsByObj = {};
//事件类型
var EventType = {
    UPDATE_MAINUI: "updateMainUI",
    CLICK_MID_BTN: "clickMidBtn",
    START_ROLL: "startRoll",
    STOP_ROLL: "stopRoll",
};
var MainUILogic = (function (_super) {
    __extends(MainUILogic, _super);
    function MainUILogic() {
        var _this = _super.call(this) || this;
        _this.midEvent = { MAINUI_MIDBTN_START_TYPE: _this.onBegin, MAINUI_MIDBTN_END_TYPE: _this.onEnd, MAINUI_MIDBTN_UPDATE_TYPE: _this.onGetNewData };
        console.log(">>>>>创建了MainUILogic对象");
        return _this;
    }
    //监听事件：关心的消息广播之后这里就听到了。然后刷新数据
    MainUILogic.prototype.listenEvent = function () {
        AddEventListener(EventType.CLICK_MID_BTN, this.onClickMidBtn, this);
    };
    MainUILogic.prototype.onClickMidBtn = function (e) {
        var type = e.data;
        var func = this.midEvent[type];
        console.log(">>>>处理逻辑,func = ", func, "type = ", type);
        func();
    };
    MainUILogic.prototype.onBegin = function () {
        console.log("开始");
        SendEvent(EventType.UPDATE_MAINUI, { start: true });
    };
    MainUILogic.prototype.onEnd = function () {
        SendEvent(EventType.UPDATE_MAINUI, { stop: true });
    };
    MainUILogic.prototype.onGetNewData = function () {
        console.log(">>>发送请求， 请求链接");
        RES.getResByUrl("http://74.82.198.32:8090/get/image/url", this.onGetComplete, this, RES.ResourceItem.TYPE_TEXT);
    };
    // private urlloader:egret.URLLoader; 
    // this.urlloader = new egret.URLLoader(); 
    // private urlreq:egret.URLRequest; 
    // this.urlreq = new egret.URLRequest(); 
    // urlreq.url = "http://httpbin.org/user-agent"; 
    // this.urlloader.load( urlreq ); 
    // this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this); 
    // 	private onComplete(event:egret.Event):void{ 
    // 	console.log(this.urlloader.data); 
    // } 
    MainUILogic.prototype.onGetComplete = function (data) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>onGetComplete", data);
        // var img: egret.Texture = <egret.Texture>event;//new egret.Texture();
        // SendEvent(EventType.UPDATE_MAINUI, {data:texture});
    };
    return MainUILogic;
}(BaseLogic));
__reflect(MainUILogic.prototype, "MainUILogic");
var MainUIView = (function (_super) {
    __extends(MainUIView, _super);
    function MainUIView() {
        var _this = _super.call(this) || this;
        _this.name = "MainUIView";
        _this.skinName = MainUIViewSkin;
        _this.visible = true;
        _this.init();
        _this.midBtnType = MAINUI_MIDBTN_START_TYPE;
        _this.timer = new egret.Timer(100, 0);
        _this.timer.addEventListener(egret.TimerEvent.TIMER, function () {
            console.log("定时函数执行");
            // console.log("this.animIndex = ", this.animIndex)
            var last = this.animIndex - 1;
            if (last == 0)
                last = 4;
            //1.显示边框帧动画
            // this["mc"+last].visible = false;
            console.log("显示》〉》〉》", this.animIndex);
            // this["mc"+this.animIndex].visible = true;
            //2.图片自身缩放
            // this.tw = egret.Tween.get(this["pic"+this.animIndex], { loop: false });
            // this.tw.to({ scaleX: 1.06, scaleY: 1.06 }, 10)
            // .to({ scaleX: 0.8, scaleY: 0.8 }, 10)
            // .to({ scaleX: 1, scaleY: 1 }, 10);
            for (var i = 1; i <= 4; i++) {
                this["pic" + i].filters = null;
            }
            //3.使用发光滤镜
            // let color = 0x33CCFF;
            // var alpha = 0.8;
            // let blurX = 35;
            // let blurY = 35;
            // let strength = 2;
            // let quality = egret.BitmapFilterQuality.HIGH;
            // let inner = false;
            // let knockout = false;
            // let glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
            // this["pic"+this.animIndex].filters = [glowFilter];
            //4.使用投影滤镜
            var distance = 6;
            var angle = 45;
            var color = 0X000000;
            var alpha = 0.8;
            var blurX = 16;
            var blurY = 16;
            var strength = 0.65;
            var quality = 1 /* LOW */;
            var inner = false;
            var knockout = false;
            var drawShadowFilter = new egret.DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout);
            this["pic" + this.animIndex].filters = [drawShadowFilter];
            var next = this.animIndex + 1;
            if (next > 4) {
                next = 1;
            }
            this.animIndex = next;
        }, _this);
        _this.animIndex = 1;
        _this.midBtn.label = "刷新";
        return _this;
    }
    MainUIView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MainUIView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        console.log("MainUIVIew has childrenCreated");
        var data = RES.getRes("test_json");
        var txtr = RES.getRes("test_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this.mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("test"));
        this.addChild(this.mc1);
        // this.mc1.width = 100;
        this.mc1.$setScaleX(0.8);
        this.mc1.x = 0;
        this.mc1.y = 0;
        this.mc1.gotoAndPlay(1, -1);
        this.mc2 = new egret.MovieClip(mcFactory.generateMovieClipData("test"));
        this.addChild(this.mc2);
        // this.mc1.width = 100;
        this.mc2.$setScaleX(0.8);
        this.mc2.x = 330;
        this.mc2.y = 0;
        this.mc2.gotoAndPlay(1, -1);
        this.mc4 = new egret.MovieClip(mcFactory.generateMovieClipData("test"));
        this.addChild(this.mc4);
        // this.mc1.width = 100;
        this.mc4.$setScaleX(0.8);
        this.mc4.x = 0;
        this.mc4.y = 450;
        this.mc4.gotoAndPlay(1, -1);
        this.mc3 = new egret.MovieClip(mcFactory.generateMovieClipData("test"));
        this.addChild(this.mc3);
        // this.mc1.width = 100;
        this.mc3.$setScaleX(0.8);
        this.mc3.x = 330;
        this.mc3.y = 450;
        this.mc3.gotoAndPlay(1, -1);
        this.mc1.visible = false;
        this.mc2.visible = false;
        this.mc3.visible = false;
        this.mc4.visible = false;
    };
    //绑定ui事件，按钮点击等事件的响应函数
    MainUIView.prototype.bindEvent = function () {
        console.log("this.midBtn == ", this.midBtn);
        this.midBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMidBtnClick, this);
        this.midRightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightBtnClick, this);
        this.pic1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic1Click, this);
        this.pic2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic2Click, this);
        this.pic3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic3Click, this);
        this.pic3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic4Click, this);
    };
    //监听事件：关心的消息广播之后这里就听到了。然后刷新数据
    MainUIView.prototype.ListenEvent = function () {
        AddEventListener(EventType.UPDATE_MAINUI, this.onUpdate, this);
    };
    MainUIView.prototype.onMidBtnClick = function () {
        //广播消息出去。
        console.log("广播消息出去。", this.midBtnType);
        SendEvent(EventType.CLICK_MID_BTN, this.midBtnType);
    };
    MainUIView.prototype.onRightBtnClick = function () {
        console.log("请求数据");
    };
    MainUIView.prototype.onPic1Click = function () {
    };
    MainUIView.prototype.onPic2Click = function () {
    };
    MainUIView.prototype.onPic3Click = function () {
    };
    MainUIView.prototype.onPic4Click = function () {
    };
    MainUIView.prototype.onUpdate = function (e) {
        console.log("刷新主界面");
        var data = e.data;
        this.midBtnType = data.type || this.midBtnType;
        if (data.start) {
            //开始旋转
            console.log("开始旋转2222");
            // for(let i =1; i<5; i++){
            // 	this["mc"+i].visible = false;
            // }
            this.timer.stop();
            this.timer.start();
            this.midBtnType = MAINUI_MIDBTN_END_TYPE;
            this.midBtn.label = "停！";
        }
        else if (data.stop) {
            console.log("停止:this.animIndex = ", this.animIndex - 1);
            this.animIndex = 1;
            this.timer.stop();
            this.midBtn.label = "开始";
            this.midBtnType = MAINUI_MIDBTN_START_TYPE;
        }
        if (data.data) {
            var texture = data.data;
            this.pic1.source = texture[1];
            this.pic2.source = texture[2];
            this.pic3.source = texture[3];
            this.pic4.source = texture[4];
        }
        //girls....
    };
    return MainUIView;
}(BaseView));
__reflect(MainUIView.prototype, "MainUIView");
var MAINUI_MIDBTN_START_TYPE = "MAINUI_MIDBTN_START_TYPE";
var MAINUI_MIDBTN_END_TYPE = "MAINUI_MIDBTN_END_TYPE";
var MAINUI_MIDBTN_UPDATE_TYPE = "MAINUI_MIDBTN_UPDATE_TYPE";
//----------------船员招募分享------------------
var BoaterHireShare = (function (_super) {
    __extends(BoaterHireShare, _super);
    function BoaterHireShare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoaterHireShare.prototype.onShareSuc = function () {
        _super.prototype.onShareSuc.call(this);
        //    new TextPop("船员招募分享成功");
        //    MainUIView.getInstance().closeView(ui.BoaterShareTipMediator.NAME);
    };
    BoaterHireShare.prototype.onShareEnter = function (params) {
        //BoaterManager.AcceptBoater(this.shareOwnerId);
    };
    return BoaterHireShare;
}(BaseShare));
__reflect(BoaterHireShare.prototype, "BoaterHireShare");
//----------------船员召回分享------------------
var BoaterRecallShare = (function (_super) {
    __extends(BoaterRecallShare, _super);
    function BoaterRecallShare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoaterRecallShare.prototype.onShareSuc = function () {
        // super.onShareSuc();
        // new TextPop("船员召回分享成功");
    };
    BoaterRecallShare.prototype.onShareEnter = function (params) {
    };
    return BoaterRecallShare;
}(BaseShare));
__reflect(BoaterRecallShare.prototype, "BoaterRecallShare");
//----------------船员招募分享------------------
var BoaterHireShare2 = (function (_super) {
    __extends(BoaterHireShare2, _super);
    function BoaterHireShare2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoaterHireShare2.prototype.onShareSuc = function () {
        // super.onShareSuc();
        //new TextPop("船员招募分享成功");
    };
    BoaterHireShare2.prototype.onShareEnter = function (params) {
        //BoaterManager.AcceptBoater(this.shareOwnerId);
    };
    return BoaterHireShare2;
}(BaseShare));
__reflect(BoaterHireShare2.prototype, "BoaterHireShare2");
//----------------触礁等待 分享------------------
var KingBarrierShare = (function (_super) {
    __extends(KingBarrierShare, _super);
    function KingBarrierShare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KingBarrierShare.prototype.onShareSuc = function () {
        // super.onShareSuc();
        // MainUIView.getInstance().closeView(ui.PirateKingEventMediator.NAME);
    };
    KingBarrierShare.prototype.onShareEnter = function (params) {
        egret.log("透传参数为:", params);
        // if (params && params.luffyShareToken) {
        //     URLGetRequest.init(ServerMsg.PIRATEKING_SHARE_NOTIFY, "uid=" + InitMark.uid + "&luffyShareToken=" + params.luffyShareToken, (data) => {
        //         new TextPop(data.message);
        //     });
        // }
    };
    return KingBarrierShare;
}(BaseShare));
__reflect(KingBarrierShare.prototype, "KingBarrierShare");
//----------------达成一圈 分享------------------
var KingCircleShare = (function (_super) {
    __extends(KingCircleShare, _super);
    function KingCircleShare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KingCircleShare.prototype.onShareSuc = function () {
        _super.prototype.onShareSuc.call(this);
    };
    KingCircleShare.prototype.onShareEnter = function (params) {
        egret.log("透传参数为:", params);
        // if (params && params.luffyShareToken) {
        //     URLGetRequest.init(ServerMsg.PIRATEKING_SHARE_NOTIFY, "uid=" + InitMark.uid + "&luffyShareToken=" + params.luffyShareToken, (data) => {
        //         new TextPop(data.message);
        //     });
        // }
    };
    return KingCircleShare;
}(BaseShare));
__reflect(KingCircleShare.prototype, "KingCircleShare");
var g_ShareManager;
function createShareManager(isWxgame, shareMaterials) {
    g_ShareManager = new ShareManager(isWxgame, shareMaterials);
    registAllShare();
}
function shareEnter(params) {
    g_ShareManager.onShareEnter(params);
}
function shareOut(shareType, activityType, customParam, replaceParam) {
    g_ShareManager.onShareOut(shareType, activityType, customParam, replaceParam);
}
function getShareConfig(type) {
    return g_ShareManager.getShareConfig(type);
}
var ShareManager = (function () {
    function ShareManager(isWxgame, shareMaterials) {
        this.shareConfigs = {};
        this.shareObjects = {};
        this.isWxgame = isWxgame;
        var shareMaterial;
        var shareType;
        //初始化分享文案数据			
        for (var i = 0; i < shareMaterials.length; i++) {
            shareMaterial = shareMaterials[i];
            shareType = shareMaterial.type;
            this.shareConfigs[shareType] = this.shareConfigs[shareType] || [];
            this.shareConfigs[shareType].push(shareMaterial);
        }
    }
    //注册分享类
    ShareManager.prototype.registShare = function (shareClassName) {
        if (this.shareObjects[shareClassName] == null)
            this.shareObjects[shareClassName] = new window[shareClassName]();
        else
            console.error("regist class existed. ClassName = ", shareClassName);
    };
    /**
     * 分享统一入口
     * @param shareInfo: "${activityType},${shareType}"  如 ”luffy,KingCircleShare“ 表示的是 海盗王的一圈分享
     * (自带shareType，shareConfigId,shareOwnerId参数)
     */
    ShareManager.prototype.onShareOut = function (shareType, activityType, customParam, replaceParam) {
        // 需要打点	
        /*
        if (activityType)
            SDK_statistics.Statistics(`share_${activityType}_${shareType}`);
        
        let shareObject = this.shareObjects[shareType];
        if (shareObject) {
            let _shareConfig = this.getShareConfig(shareType);
            let _title = _shareConfig.title.replace("$0", util.strSub(dataManager.data.name, 10));
            if (replaceParam != null) {
                for (const key in replaceParam) {
                    _title = _title.replace(key, replaceParam[key]);
                }
            }
            let _query: string = `shareType=WX_${shareType}&shareConfigId=${_shareConfig.id}&shareOwnerId=${InitMark.uid}`;
            if (customParam) {
                for (const key in customParam) {
                    _query += '&' + key + '=' + customParam[key];
                }
            }
            _query += `&friendCode=${InitMark.shareCode}`;


            if(this.isWxgame)
                shareObject.wxShare(_title, _shareConfig.img, _query);
            else
            {
                let _desc: string = _shareConfig.desc.replace("$0", util.strSub(dataManager.data.name, 10));

                let _shareCustomParam = {
                    cp_shareType: shareType,
                    cp_shareConfigId: _shareConfig.id,
                    cp_shareOwnerId: InitMark.uid
                };
                if (customParam) {
                    for (const key in customParam) {
                        _shareCustomParam["cp_" + key] = customParam[key];
                    }
                }

                shareObject.h5Share(_title, _shareConfig.img, _desc, _shareConfig.id, _shareCustomParam);
            }
        } else {
            console.error("PlatformManager error,pls regist share:" + shareType);
        }

        */
    };
    //点击分享链接进入
    ShareManager.prototype.onShareEnter = function (params) {
        var type = params.shareType;
        if (!type) {
            console.error("PlatformManager error,pls regist share:" + type);
            return;
        }
        type = type.substring(3);
        var shareObject = this.shareObjects[type];
        if (!shareObject) {
            console.error("PlatformManager error,pls regist share:" + type);
            return;
        }
        shareObject.shareOwnerId = params.shareOwnerId;
        // if (shareObject.shareOwnerId != InitMark.uid.toString()) {
        // 	shareObject.shareConfigId = params.shareConfigId;
        // 	shareObject.onShareEnter(params);
        // }
    };
    /**
     * 获取分享的配置
     * @param type 分享的类型
     */
    ShareManager.prototype.getShareConfig = function (type) {
        var _shareConfig = {
            "id": "0",
            "category": 1,
            "type": "default",
            "name": "默认",
            "title": "我靠！刚才我竟然挨了一炮！",
            "desc": "没有什么是一炮解决不了的，如果有，那就两炮",
            "img": "",
            "active": true
        };
        // if (this.shareConfigs[type] && this.shareConfigs[type].length > 0) {
        // 	let _maxRand = this.shareConfigs[type].length - 1;
        // 	let _index = _.random(0, _maxRand);
        // 	_shareConfig = this.shareConfigs[type][_index];
        // }
        return _shareConfig;
    };
    return ShareManager;
}());
__reflect(ShareManager.prototype, "ShareManager");
//注册所有分享事件
function registAllShare() {
    g_ShareManager.registShare("BoaterHireShare"); //船员招募分享
    g_ShareManager.registShare("BoaterRecallShare"); //船员召回分享
    g_ShareManager.registShare("BoaterHireShare2"); //船员招募分享
    // 注册海盗王分享
    g_ShareManager.registShare("KingBarrierShare"); //海盗王障碍物分享
    g_ShareManager.registShare("KingCircleShare"); //海盗王达成一圈分享
}
;window.Main = Main;