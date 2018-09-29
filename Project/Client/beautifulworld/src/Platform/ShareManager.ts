namespace game {
    export class ShareManager {
        private static shareConfigMap: Object = {};
        private static shareMap: { [key: string]: BaseShare } = {};

        //初始化
        public static initialize(shareMaterials: any): void {
            //初始化分享文案数据
            if (shareMaterials) {
                for (let i = 0; i < shareMaterials.length; i++) {
                    let share = shareMaterials[i];
                    let shareArray = this.shareConfigMap[share.type];
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
                })
            }
        }

        //注册分享类
        public static registShare<T extends BaseShare>(shareType: string, shareClass: new () => T): void {
            if (this.shareMap[shareType] == null) {
                this.shareMap[shareType] = new shareClass();
                this.shareMap[shareType].type = shareType;
            }
        }

		/** 
		 * 分享统一入口
		 * @param shareInfo: "${activityType},${shareType}"  如 ”luffy,KingCircleShare“ 表示的是 海盗王的一圈分享
		 * (自带shareType，shareConfigId,shareOwnerId参数)
		 */
        public static share(shareInfo: string, customParam?: any, replaceParam?: any): void {
            let shareType: string = "";
            let strArr = shareInfo.split(",");
            if (strArr.length > 1) {
                // 需要打点
                shareType = strArr[1];
                PlatformManager.LogEvent(`share_${strArr[0]}_${strArr[1]}`);
            } else {
                shareType = shareInfo;
            }

            if (this.shareMap[shareType] != null) {
                this.shareMap[shareType].share(customParam, replaceParam);
            } else {
                console.error("PlatformManager error,pls regist share:" + shareType);
            }
        }

        //点击分享链接进入
        public static onShareEnter(params: any): void {
            let type: string = params.shareType;
            if (type) {
                type = type.substring(3);
                let share: BaseShare = this.shareMap[type];
                if (share != null) {
                    share.shareOwnerId = params.shareOwnerId;
                    if (share.shareOwnerId != playerModel.uid.toString()) {
                        share.shareConfigId = params.shareConfigId;
                        share.onShareEnter(params);
                    }
                } else {
                    console.error("PlatformManager error,pls regist share:" + type);
                }
            }
        }

        //分享统一接口
        public static shareSimple(type: string, onShare: Function, onShareFail: Function, thisObj?: any, customParam?: any, replaceParam?: any): void {
            if (PlatformManager.isWxgame) {
                console.log("shareWX")
                this.shareWX(type, onShare, onShareFail, this, customParam, replaceParam);
            } else {
                console.log("shareH5")
                this.shareH5(type, onShare, onShareFail, this, customParam, replaceParam);
            }
        }

		/**
		 * 获取分享的配置
		 * @param type 分享的类型
		 */
        public static getShareConfig(type: string): any {
            let _shareConfig = {
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
                let _maxRand = this.shareConfigMap[type].length - 1;
                let _index = Math.floor(Math.random() * _maxRand);
                _shareConfig = this.shareConfigMap[type][_index];
            }
            return _shareConfig;
        }

        //微信分享
        private static shareWX(type: string, onShare: Function, onShareFail: Function, thisObj?: any, customParam?: any, replaceParam?: any): void {
            let _shareConfig = this.getShareConfig(type);
            let _title = _shareConfig.title.replace("$0", TsEngine.StringUtil.substring(playerModel.name, 10));
            if (replaceParam != null) {
                if (replaceParam.hasOwnProperty("title")) {
                    for (const key in replaceParam.title) {
                        _title = _title.replace(key, replaceParam.title[key]);
                    }
                }
            }
            let _query: string = `shareType=WX_${type}&shareConfigId=${_shareConfig.id}&shareOwnerId=${playerModel.uid}`;
            if (customParam) {
                for (const key in customParam) {
                    _query += '&' + key + '=' + customParam[key];
                }
            }
            _query += `&friendCode=${playerModel.shareCode}`;
            platform.share.shareAppMessage(_title, _shareConfig.img, _query, (res) => {
                if (onShare && typeof onShare == "function") {
                    console.log("分享成功")
                    onShare(res);
                }
            }, () => {
                console.log(`分享失败`);
                if (onShareFail && typeof onShareFail == "function") {
                    onShareFail();
                }
            }, () => {
                console.log(`分享结束`);
            });
        }


        //H5分享
        private static shareH5(type: string, onShare: Function, onShareFail: Function, thisObj?: any, customParam?: any, replaceParam?: any): void {
            //准备分享参数
            let _shareConfig = this.getShareConfig(type);
            if (_shareConfig) {
                let _shareType = "H5_" + type;
                let _title: string = _shareConfig.title.replace("$0", TsEngine.StringUtil.substring(playerModel.name, 10));
                let _desc: string = _shareConfig.desc.replace("$0", TsEngine.StringUtil.substring(playerModel.name, 10));
                //自定义替换参数
                if (replaceParam != null) {
                    if (replaceParam.hasOwnProperty("title")) {
                        for (const key in replaceParam.title) {
                            _title = _title.replace(key, replaceParam.title[key]);
                        }
                    }
                    if (replaceParam.hasOwnProperty("desc")) {
                        for (const key in replaceParam.desc) {
                            _desc = _shareConfig.desc.replace(key, replaceParam.desc[key]);
                        }
                    }
                }
                let _imgUrl: string = playerModel.headImg;
                let _shareCustomParam = {
                    cp_shareType: _shareType,
                    cp_shareConfigId: _shareConfig.id,
                    cp_shareOwnerId: playerModel.uid
                };
                if (customParam) {
                    for (const key in customParam) {
                        _shareCustomParam["cp_" + key] = customParam[key];
                    }
                }
                //调用分享
                TsEngine.WindowManager.currentWindow = WindowType.WINDOW_SHARE_GUIDE;
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
                } catch (e) {
                    onShareFail.call(thisObj);
                    TsEngine.WindowManager.hideWindow(WindowType.WINDOW_SHARE_GUIDE);
                    console.log("share error:" + e);
                }
            }

            function onShareEnd(res): void {
                onShare.call(thisObj, res);
                TsEngine.WindowManager.hideWindow(WindowType.WINDOW_SHARE_GUIDE);
            }
        }
    }

	/**
	* Created by chenqianxu
	* Copyright (c) 2017 HortorGames. All rights reserved.
	*/
    export class BaseShare {
        //分享类型标识
        public type: string;
        //分享进入链接的发送者id
        public shareOwnerId: string;
        //分享进入链接的配置id
        public shareConfigId: string;
        //分享调用
        public share(params: any, replaceParam?: any): void {
            ShareManager.shareSimple(this.type, this.onShareSuc, this.onShareFail, this, params, replaceParam);
        }

        //分享成功
        public onShareSuc(res = null): void {

        }

        //分享失败
        public onShareFail(): void {

        }

        //点击分享进入
        public onShareEnter(params: any): void {

        }
    }
}