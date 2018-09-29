namespace game {
	export class PlatformManager {
		public static isWxgame: boolean;
		private static isInited: boolean;
		private static eventAppId: string;

		//初始化
		public static initialize(data: any): void {
			this.isWxgame = TsEngine.SystemManager.isWxGame;
			PlatformManager.isInited = true;
			//初始化
			if (!this.isWxgame) {
				// try {
				// 	.init();
				// } catch (e) {

				// 	PlatformManager.isInited = false;
				// 	TsEngine.TipManager.alert("游戏中心init初始化失败，您将暂时无法使用分享和充值功能，请稍后刷新重试");
				// }
			} else {
				platform.user.getSystemInfo(function (data) {
					WxSystemInfo = data;//系统信息;
				});

				//上报用户数据
				PlatformManager.setUserCloudStorage();
			}
			ShareManager.initialize(data.shareMaterials);

			//热云
			// this.eventAppId = gateModel.isWxgame ? Const.WXAppId : Const.H5AppId;
		}

		/**
         * 购买商品
         * @param goodsId 物品的标识
         * @param count 数量
         */
		public static pay(goodsId: string, count: number = 1, aid?: any): void {
			IapManager.pay(goodsId, count, aid);
		}

		/**
		 * 小游戏播放视频广告
		 * @param adUnitId 广告id(AdType)
		 * @param onCloseCallback   关闭的回调 
		 * @param onErrorCallback   出错的回调
		 * @param noSupportBack     基础库太低不支持的回调
		 */
		public static showVideoAd(adUnitId: string, onCloseCallback: any, onErrorCallback?: any, noSupportBack?: any): void {
			let _compare = PlatformManager.compareVersion(WxSystemInfo.SDKVersion, "2.0.4");
			if (_compare > -1) {
				platform.common.createRewardedVideoAd(adUnitId, (res) => {
					if (res && res.isEnded || res === undefined) {
						// 正常播放结束，可以下发游戏奖励
						onCloseCallback();
					} else {
						//重置按钮的状态
						if (noSupportBack) {
							noSupportBack();
						}
					}
				}, () => {
					onErrorCallback && onErrorCallback();
				});
			} else {
				if (noSupportBack) {
					noSupportBack();
				}
				TsEngine.TipManager.bubble('微信版本过低暂不支持观看视频，请升级微信版本');
			}
		}

		/**
		 * 比较版本号
		 * compareVersion('1.11.0', '1.9.9') // => 1 // 1 表示 1.11.0 比 1.9.9 要新
			compareVersion('1.11.0', '1.11.0') // => 0 // 0 表示 1.11.0 和 1.11.0 是同一个版本
			compareVersion('1.11.0', '1.99.0') // => -1 // -1 表示 1.11.0 比 1.99.0 要老
		 */
		public static compareVersion(v1, v2): number {
			v1 = v1.split('.');
			v2 = v2.split('.');
			let len = Math.max(v1.length, v2.length)
			while (v1.length < len) {
				v1.push('0');
			}
			while (v2.length < len) {
				v2.push('0');
			}
			for (let i = 0; i < len; i++) {
				let num1 = parseInt(v1[i]);
				let num2 = parseInt(v2[i]);
				if (num1 > num2) {
					return 1;
				} else if (num1 < num2) {
					return -1;
				}
			}
			return 0;
		}

		/**
		 * 打点统计
		 * @param tp: 必填，事件类型，游戏事件类型，与后端定义好，方便统计
		 * @param extra: 必填，附加数据，游戏自定义数据 
		 * @param refer: 可选，来源记录
		 */
		public static LogEvent(type: string, extra: any = {}, refer?: any) {
			if (!this.isWxgame) return;
			let statisticsObj = {
				tp: type,
				extra: extra,
				refer: refer
			}
			platform.common.statLog(statisticsObj);
		}

		/**
		 * 热云打点
		 * @param eventName 事件的名字
		 */
		public static openEvent(eventName: string): void {
			// if (!playerModel) return;

			// let _islandLv = (playerModel.island + 1);
			// let _obj = {
			// 	"appid": PlatformManager.eventAppId,
			// 	"context": {
			// 		"deviceid": playerModel.userId,
			// 		"level": _islandLv
			// 	},
			// 	"what": eventName,
			// 	"who": playerModel.userId
			// };
			//TODO:ZC
			// HttpService.post("https://log.reyun.com/receive/rest/event", _obj, () => {
			// 	console.log("openEvent suc")
			// });
		}

		//屏蔽区域检测
		public static checkIPAvailable(type: string, callBack: Function): void {
			if (this.isWxgame) {
				platform.common.checkIP(type, (res) => {
					callBack(res);
				});
			} else {
				callBack(false);
			}
		}

		//注册分享类
		public static registShare<T extends BaseShare>(shareType: string, shareClass: new () => T): void {
			ShareManager.registShare(shareType, shareClass);
		}

		/** 
		 * 分享统一入口
		 * @param shareInfo: "${activityType},${shareType}"  如 ”luffy,KingCircleShare“ 表示的是 海盗王的一圈分享
		 * (自带shareType，shareConfigId,shareOwnerId参数)
		 */
		public static share(shareInfo: string, customParam?: any, replaceParam?: any): void {
			ShareManager.share(shareInfo, customParam, replaceParam);
		}

		//点击分享链接进入
		public static onShareEnter(params: any): void {
			ShareManager.onShareEnter(params);
		}

		/**
		 * 小游戏播放视频广告
		 * @param adUnitId 广告id
		 * @param onCloseCallback   关闭的回调 
		 * @param onErrorCallback   出错的回调
		 * @param noSupportBack     基础库太低不支持的回调
		 */
		public static createVideoAd(adUnitId: string, onCloseCallback: any, onErrorCallback: any, noSupportBack?: any): void {
			if (!TsEngine.SystemManager.isWxGame) return;
			let _compare = game.ComFunc.compareVersion(WxSystemInfo.SDKVersion, "2.0.4");
			if (_compare > -1) {
				// gateModel.wxSharing = true;
				// platform.common.createRewardedVideoAd(adUnitId, (res) => {
				// 	// console.log("关闭视频--->");
				// 	if (res && res.isEnded || res === undefined) {
				// 		// 正常播放结束，可以下发游戏奖励
				// 		onCloseCallback();
				// 	} else {
				// 		//重置按钮的状态
				// 		if (noSupportBack && typeof (noSupportBack) == "function") {
				// 			noSupportBack();
				// 		}
				// 	}
				// 	gateModel.wxSharing = false;
				// }, () => {
				// 	onErrorCallback();
				// 	gateModel.wxSharing = false;
				// 	gateModel.wxCanShowAd = false;
				// });
			} else {
				if (noSupportBack && typeof (noSupportBack) == "function") {
					noSupportBack();
				}
				TsEngine.TipManager.alert('微信版本过低暂不支持观看视频，请升级微信版本');
			}
		}

		//保存用户数据到微信开放域
		private static setUserCloudStorage(): void {
			let _crown = playerModel.crowns + "";
			let _uid = playerModel.uid + "";
			let _timestamp = (gateModel.timestamp || Math.floor(new Date().getTime() / 1000)) + "";
			let _island = playerModel.island + "";
			let _inviteCode = playerModel.inviteCode + "";
			let beRecalledCount = playerModel.beRecalledCount + "";

			if (platform.common.checkSetUserStorage()) {
				var timestamp = new Date().getTime();
				platform.common.setUserCloudStorage([{ key: "crowns", value: _crown }, { key: "uid", value: _uid }, { key: "timestamp", value: _timestamp }, { key: "island", value: _island }, { key: "inviteCode", value: _inviteCode },
				{ key: "score", value: "{\"wxgame\":{\"score\":" + _crown + ",\"update_time\": " + timestamp + "}}" }, { key: "beRecalledCount", value: beRecalledCount }], (res) => {
					console.log("设置用户的开放数据域成功->>>", res);
				}, (res) => {
					// console.log("设置用户的开放数据域失败->>>", res);
				}, (res) => {
					// console.log("设置用户的开放数据域完成->>>", res);
				});
			}
		}
	}

	//系统信息
	export let WxSystemInfo = {
		SDKVersion: "1.0.0",
		batteryLevel: 100,
		benchmarkLevel: 1,
		brand: "devtools",
		devicePixelRatio: 2,
		fontSizeSetting: 16,
		language: "zh_CN",
		model: "iPhone",
		pixelRatio: 2,
		platform: "devtools",
		screenHeight: 667,
		screenWidth: 375,
		statusBarHeight: 20,
		system: "iOS 10.0.1",
		version: "6.6.3",
		windowHeight: 667,
		windowWidth: 375
	}
}