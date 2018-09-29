
// /**
// * Created by liaojiangzheng
// * Copyright (c) 2018 HortorGames. All rights reserved.
// */
// namespace game {
//     //----------------召回奖励分享------------------
//     export class RecallRewardShare extends GameShare {
//         public onShareSuc(res?: any): void {
//             util.jzlog("召回奖励分享>>>>分享成功回调", this.onShareSuc)
//             super.onShareSuc();

//             util.jzlog("res = ", res)
//             if (res) {
//                 if (res.shareTickets) {
//                     wxOpenData.loadImages(wxOpenData.recallGroupImages, () => {
//                         TsEngine.WindowManager.showWindow(WindowType.WINDOW_RECALLFRIEND_GROUP, res);
//                     })
//                 } else {
//                     TsEngine.TipManager.bubble("快去点击分享链接查看吧")
//                 }
//             }
//         }

//         public onShareEnter(params: any): void {
//             util.jzlog("召回奖励分享>>>>从链接进入");
//             TsEngine.WindowManager.showWindow(WindowType.WINDOW_RECALLFRIEND_GROUP, params)
//             // TsEngine.WindowManager.currentWindow = 
//             // WINDOW_RECALLFRIEND_GROUP


//         }
//     }


//     // //----------------船员召回分享------------------
//     // export class SignShare extends GameShare {
//     //     public onShareSuc(): void {
//     //         super.onShareSuc();
//     //         //new TextPop("船员召回分享成功");
//     //     }

//     //     public onShareEnter(params: any): void {

//     //     }
//     // }

//     // //----------------船员招募分享------------------
//     // export class BoaterHireShare2 extends GameShare {
//     //     public onShareSuc(): void {
//     //         super.onShareSuc();
//     //         //new TextPop("船员招募分享成功");
//     //     }

//     //     public onShareEnter(params: any): void {
//     //         //BoaterManager.AcceptBoater(this.shareOwnerId);
//     //     }
//     // }
// }