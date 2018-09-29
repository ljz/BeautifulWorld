// /**
// * Created by zyx
// * Copyright (c) 2017 HortorGames. All rights reserved.
// */
// namespace game {
//     export class MonsterShare extends GameShare {
//         public onShareSuc(res): void {
//             super.onShareSuc(res);
//             game.MonsterShare.monsterShareSuccess(res);
//         }
//         public onShareEnter(params: any): void {
//         }
//         public static monsterShareSuccess(res = null) {
//             //res:是分享
//             //res.shareTickets:是分享给群
//             TsEngine.Log.log(this, res);
//             if (res && !res.shareTickets) { //分享给个人
//                 //TsEngine.TipManager.tip('分享到群才会获得奖励哦');
//                 return;
//             }
//             //看视频或者分享到群
//             HttpService.post(ServerMsg.KILLTITAN_SHARE_REWARD, "uid=" + playerModel.uid, function (data) {
//                 if (DEBUG) {
//                     console.log("KILLTITAN_SHARE_REWARD=> " + JSON.stringify((data)));
//                 }
//                 playerModel.killTitanCannonBall = data.cannonBallCount;
//                 TaptitansInfo.info.shareCount = data.shareCount;
//                 TsEngine.WindowManager.hideWindow(WindowType.WINDOW_TAPTITANSFREESHELL);
//                 let taptitansMainScreen: any = TsEngine.ScreenManager.getScreen(WindowType.WINDOW_TAPTITANS);
//                 if (taptitansMainScreen) {
//                     taptitansMainScreen.refreshShellNum();
//                 }
//                 //获得奖励
//                 TsEngine.WindowManager.showWindow(WindowType.WINDOW_REWARD, { killTitanCannonBall: data.reward });
//             });
//         }
//     }
// } 
//# sourceMappingURL=MonsterShare.js.map