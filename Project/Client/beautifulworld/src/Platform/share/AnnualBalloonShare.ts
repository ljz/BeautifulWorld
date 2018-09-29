/**
 * 气球分享
 */
namespace game {
	export class AnnualBalloonShare extends GameShare {
		public onShareSuc(res): void {
			super.onShareSuc(res);
			AnnualBalloonShare.annualBalloonShareSuccess(res);
		}

		public onShareFail(): void {
			// super.onShareFail();
			// let festivalBalloonWindow: game.FestivalBalloonWindow = <game.FestivalBalloonWindow>TsEngine.WindowManager.getWindow(game.WindowType.WINDOW_FESTIVALBALLOON);
			// if (festivalBalloonWindow) {
			// 	festivalBalloonWindow.hasInvite = false;
			// }
		}

		public onShareEnter(params: any): void {

		}

		//周年气球
		public static annualBalloonShareSuccess(res?: any): void {
			// if (res) {
			// 	if (res.shareTickets) {
			// 		TsEngine.WindowManager.hideWindow(game.WindowType.WINDOW_FESTIVALBALLOON);
			// 		// new TextPop(`分享成功，快通知小伙伴吧！`);
			// 		HttpService.post(ServerMsg.ANNUAL_BALLOON_REWARD, "uid=" + playerModel.uid + "&share=true", function (data) {
			// 			TsEngine.WindowManager.hideWindow(game.WindowType.WINDOW_FESTIVALBALLOON);
			// 			playerModel.updateAll(data);
			// 			TsEngine.WindowManager.showWindow(game.WindowType.WINDOW_REWARD, data.rewards);
			// 		});
			// 	} else {
			// 		// new TextPop(`分享到群才会获得奖励哦`);
			// 		let festivalBalloonWindow: game.FestivalBalloonWindow = <game.FestivalBalloonWindow>TsEngine.WindowManager.getWindow(game.WindowType.WINDOW_FESTIVALBALLOON);
			// 		if (festivalBalloonWindow) {
			// 			festivalBalloonWindow.hasInvite = false;
			// 		}
			// 	}
			// } else {
			// 	TsEngine.WindowManager.hideWindow(game.WindowType.WINDOW_FESTIVALBALLOON);
			// 	// new TextPop(`分享成功，快通知小伙伴吧！`);
			// 	HttpService.post(ServerMsg.ANNUAL_BALLOON_REWARD, "uid=" + playerModel.uid + "&share=true", function (data) {
			// 		TsEngine.WindowManager.hideWindow(game.WindowType.WINDOW_FESTIVALBALLOON);
			// 		playerModel.updateAll(data);
			// 		TsEngine.WindowManager.showWindow(game.WindowType.WINDOW_REWARD, data.rewards);
			// 	});
			// }

		}
	}
}
