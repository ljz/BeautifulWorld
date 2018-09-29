var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ShareManager = (function () {
        function ShareManager() {
        }
        //初始化
        ShareManager.initialize = function (shareMaterials) {
            //初始化分享文案数据
            if (shareMaterials) {
                for (var i = 0; i < shareMaterials.length; i++) {
                    var share = shareMaterials[i];
                    var shareArray = this.shareConfigMap[share.type];
                    if (!shareArray) {
                        shareArray = [];
                    }
                    shareArray.push(share);
                    this.shareConfigMap[share.type] = shareArray;
                }
            }
            if (TsEngine.SystemManager.isWxGame) {
                wx.updateShareMenu({
                    withShareTicket: true
                });
            }
        };
        //注册分享类
        ShareManager.registShare = function (shareType, shareClass) {
            if (this.shareMap[shareType] == null) {
                this.shareMap[shareType] = new shareClass();
                this.shareMap[shareType].type = shareType;
            }
        };
        /**
         * 分享统一入口
         * @param shareInfo: "${activityType},${shareType}"  如 ”luffy,KingCircleShare“ 表示的是 海盗王的一圈分享
         * (自带shareType，shareConfigId,shareOwnerId参数)
         */
        ShareManager.share = function (shareInfo, customParam, replaceParam) {
            var shareType = "";
            var strArr = shareInfo.split(",");
            if (strArr.length > 1) {
                // 需要打点
                shareType = strArr[1];
                game.PlatformManager.LogEvent("share_" + strArr[0] + "_" + strArr[1]);
            }
            else {
                shareType = shareInfo;
            }
            if (this.shareMap[shareType] != null) {
                this.shareMap[shareType].share(customParam, replaceParam);
            }
            else {
                console.error("PlatformManager error,pls regist share:" + shareType);
            }
        };
        //点击分享链接进入
        ShareManager.onShareEnter = function (params) {
            var type = params.shareType;
            if (type) {
                type = type.substring(3);
                var share = this.shareMap[type];
                if (share != null) {
                    share.shareOwnerId = params.shareOwnerId;
                    if (share.shareOwnerId != playerModel.uid.toString()) {
                        share.shareConfigId = params.shareConfigId;
                        share.onShareEnter(params);
                    }
                }
                else {
                    console.error("PlatformManager error,pls regist share:" + type);
                }
            }
        };
        //分享统一接口
        ShareManager.shareSimple = function (type, onShare, onShareFail, thisObj, customParam, replaceParam) {
            if (game.PlatformManager.isWxgame) {
                console.log("shareWX");
                this.shareWX(type, onShare, onShareFail, this, customParam, replaceParam);
            }
            else {
                console.log("shareH5");
                this.shareH5(type, onShare, onShareFail, this, customParam, replaceParam);
            }
        };
        /**
         * 获取分享的配置
         * @param type 分享的类型
         */
        ShareManager.getShareConfig = function (type) {
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
            if (this.shareConfigMap[type] && this.shareConfigMap[type].length > 0) {
                var _maxRand = this.shareConfigMap[type].length - 1;
                var _index = Math.floor(Math.random() * _maxRand);
                _shareConfig = this.shareConfigMap[type][_index];
            }
            return _shareConfig;
        };
        //微信分享
        ShareManager.shareWX = function (type, onShare, onShareFail, thisObj, customParam, replaceParam) {
            var _shareConfig = this.getShareConfig(type);
            var _title = _shareConfig.title.replace("$0", TsEngine.StringUtil.substring(playerModel.name, 10));
            if (replaceParam != null) {
                if (replaceParam.hasOwnProperty("title")) {
                    for (var key in replaceParam.title) {
                        _title = _title.replace(key, replaceParam.title[key]);
                    }
                }
            }
            var _query = "shareType=WX_" + type + "&shareConfigId=" + _shareConfig.id + "&shareOwnerId=" + playerModel.uid;
            if (customParam) {
                for (var key in customParam) {
                    _query += '&' + key + '=' + customParam[key];
                }
            }
            _query += "&friendCode=" + playerModel.shareCode;
            platform.share.shareAppMessage(_title, _shareConfig.img, _query, function (res) {
                if (onShare && typeof onShare == "function") {
                    console.log("分享成功");
                    onShare(res);
                }
            }, function () {
                console.log("\u5206\u4EAB\u5931\u8D25");
                if (onShareFail && typeof onShareFail == "function") {
                    onShareFail();
                }
            }, function () {
                console.log("\u5206\u4EAB\u7ED3\u675F");
            });
        };
        //H5分享
        ShareManager.shareH5 = function (type, onShare, onShareFail, thisObj, customParam, replaceParam) {
            //准备分享参数
            var _shareConfig = this.getShareConfig(type);
            if (_shareConfig) {
                var _shareType = "H5_" + type;
                var _title = _shareConfig.title.replace("$0", TsEngine.StringUtil.substring(playerModel.name, 10));
                var _desc = _shareConfig.desc.replace("$0", TsEngine.StringUtil.substring(playerModel.name, 10));
                //自定义替换参数
                if (replaceParam != null) {
                    if (replaceParam.hasOwnProperty("title")) {
                        for (var key in replaceParam.title) {
                            _title = _title.replace(key, replaceParam.title[key]);
                        }
                    }
                    if (replaceParam.hasOwnProperty("desc")) {
                        for (var key in replaceParam.desc) {
                            _desc = _shareConfig.desc.replace(key, replaceParam.desc[key]);
                        }
                    }
                }
                var _imgUrl = playerModel.headImg;
                var _shareCustomParam = {
                    cp_shareType: _shareType,
                    cp_shareConfigId: _shareConfig.id,
                    cp_shareOwnerId: playerModel.uid
                };
                if (customParam) {
                    for (var key in customParam) {
                        _shareCustomParam["cp_" + key] = customParam[key];
                    }
                }
                //调用分享
                TsEngine.WindowManager.currentWindow = game.WindowType.WINDOW_SHARE_GUIDE;
                try {
                    SDK.config({
                        share: {
                            timeline: {
                                title: _title,
                                imgUrl: _imgUrl,
                                success: onShareEnd.bind(thisObj, type)
                            },
                            friend: {
                                title: _title,
                                imgUrl: _imgUrl,
                                desc: _desc,
                                shareConfigId: _shareConfig.id,
                                success: onShareEnd.bind(thisObj, type)
                            },
                            shareCustomParam: _shareCustomParam
                        }
                    });
                }
                catch (e) {
                    onShareFail.call(thisObj);
                    TsEngine.WindowManager.hideWindow(game.WindowType.WINDOW_SHARE_GUIDE);
                    console.log("share error:" + e);
                }
            }
            function onShareEnd(res) {
                onShare.call(thisObj, res);
                TsEngine.WindowManager.hideWindow(game.WindowType.WINDOW_SHARE_GUIDE);
            }
        };
        ShareManager.shareConfigMap = {};
        ShareManager.shareMap = {};
        return ShareManager;
    }());
    game.ShareManager = ShareManager;
    __reflect(ShareManager.prototype, "game.ShareManager");
    /**
    * Created by chenqianxu
    * Copyright (c) 2017 HortorGames. All rights reserved.
    */
    var BaseShare = (function () {
        function BaseShare() {
        }
        //分享调用
        BaseShare.prototype.share = function (params, replaceParam) {
            ShareManager.shareSimple(this.type, this.onShareSuc, this.onShareFail, this, params, replaceParam);
        };
        //分享成功
        BaseShare.prototype.onShareSuc = function (res) {
            if (res === void 0) { res = null; }
        };
        //分享失败
        BaseShare.prototype.onShareFail = function () {
        };
        //点击分享进入
        BaseShare.prototype.onShareEnter = function (params) {
        };
        return BaseShare;
    }());
    game.BaseShare = BaseShare;
    __reflect(BaseShare.prototype, "game.BaseShare");
})(game || (game = {}));
//# sourceMappingURL=ShareManager.js.map