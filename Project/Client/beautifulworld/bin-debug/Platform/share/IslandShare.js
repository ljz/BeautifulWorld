// /**
// * Created by zyx
// * Copyright (c) 2017 HortorGames. All rights reserved.
// */
// namespace game {
// 	export class IslandShare extends GameShare {
// 		public onShareSuc(res): void {
// 			super.onShareSuc(res);
// 			let self = this;
// 			if (res && res.shareTickets) {
// 				if (platform.common.checkSetUserStorage()) {
// 					//MainUIView.getInstance().showView(new ui.WxOpenView("group", res.shareTickets), ui.WxOpenMediator.NAME, true, Const.SpecialLayer);
// 				}
// 			} else {
// 				TsEngine.TipManager.alert("分享到群才能查看群排行");
// 			}
// 			if (playerModel.canIslandShare) {
// 				HttpService.post(ServerMsg.ISLAND_SHARE, "uid=" + playerModel.uid, function (data) {
// 					//console.log("分享奖励返回：" + JSON.stringify(data));
// 					playerModel.energy += 20;
// 					playerModel.canIslandShare = false;
// 					TsEngine.WindowManager.showWindow(WindowType.WINDOW_REWARD, { energy: 20 }, null, null, () => {
// 						let island: any = TsEngine.WindowManager.getWindow(WindowType.WINDOW_SHAREISLAND);
// 						if (island) {
// 							island.nextIsland();
// 						}
// 					});
// 					EventCenter.sendEvent(EventConst.EnergyChange);
// 				})
// 			}
// 		}
// 		public onShareEnter(params: any): void {
// 		}
// 	}
// } 
//# sourceMappingURL=IslandShare.js.map