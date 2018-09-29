// /**
// * Created by liuyang
// * Copyright (c) 2017 HortorGames. All rights reserved.
// */
// namespace game {
//     export class MultipleGoldShare extends GameShare {
//         public onShareSuc(res): void {
//             super.onShareSuc(res);
//             HttpService.post(ServerMsg.SHARE_COIN_REWARD, "uid=" + playerModel.uid, (data) => {
//                 playerModel.money = data.money;
//                 EventCenter.sendEvent(EventConst.GoldChange);
//                 TsEngine.WindowManager.showWindow(WindowType.WINDOW_REWARD, { money: data.reward });
//                 if (TsEngine.WindowManager.isOpen(WindowType.WINDOW_MULTIPLE_GOLD)) {
//                     TsEngine.WindowManager.hideWindow(WindowType.WINDOW_MULTIPLE_GOLD);
//                 }
//             })
//         }
//         public onShareEnter(params: any): void {
//         }
//     }
// } 
//# sourceMappingURL=MultipleGoldShare.js.map