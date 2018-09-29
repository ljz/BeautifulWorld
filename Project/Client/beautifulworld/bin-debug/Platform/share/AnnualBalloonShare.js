var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 气球分享
 */
var game;
(function (game) {
    var AnnualBalloonShare = (function (_super) {
        __extends(AnnualBalloonShare, _super);
        function AnnualBalloonShare() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AnnualBalloonShare.prototype.onShareSuc = function (res) {
            _super.prototype.onShareSuc.call(this, res);
            AnnualBalloonShare.annualBalloonShareSuccess(res);
        };
        AnnualBalloonShare.prototype.onShareFail = function () {
            // super.onShareFail();
            // let festivalBalloonWindow: game.FestivalBalloonWindow = <game.FestivalBalloonWindow>TsEngine.WindowManager.getWindow(game.WindowType.WINDOW_FESTIVALBALLOON);
            // if (festivalBalloonWindow) {
            // 	festivalBalloonWindow.hasInvite = false;
            // }
        };
        AnnualBalloonShare.prototype.onShareEnter = function (params) {
        };
        //周年气球
        AnnualBalloonShare.annualBalloonShareSuccess = function (res) {
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
        };
        return AnnualBalloonShare;
    }(game.GameShare));
    game.AnnualBalloonShare = AnnualBalloonShare;
    __reflect(AnnualBalloonShare.prototype, "game.AnnualBalloonShare");
})(game || (game = {}));
//# sourceMappingURL=AnnualBalloonShare.js.map