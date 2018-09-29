// /**
// * Created by liaojiangzheng
// * Copyright (c) 2018 HortorGames. All rights reserved.
// */
// namespace game {
//     //----------------高级夏日能量分享------------------
//     export class SeniorDailyEnergyShare extends GameShare {
//         public onShareSuc(res): void {
//             util.jzlog("高级夏日能量>>>>分享成功回调", res)
//             super.onShareSuc();
//             HttpService.post(ServerMsg.WX_SENIORDAYREDBAGSHARE, `uid=${playerModel.uid}`, function (data) {
//                 util.jzlog(">>>服务器返回的数据是：", data)
//                 EventCenter.sendEvent(EventConst.GetSeniorShareEnergy, data);
//             })
//         }
//         public onShareEnter(params: any): void {
//             let _params = util.getUrlParamMap();
//             util.jzlog("高级夏日能量>>>>从链接进入", _params);
//             if (!_params || !_params.shareUid) {
//                 return;
//             }
//             //给服务器发送链接
//             HttpService.post(ServerMsg.WX_SENOIRDAYREDBAGSHARE_LINK, `uid=${playerModel.uid}&fid=${_params.shareUid}`, (data) => {
//             });
//         }
//     }
// } 
//# sourceMappingURL=SeniorDailyEnergyShare.js.map