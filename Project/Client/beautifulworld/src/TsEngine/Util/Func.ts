// namespace TsEngine {
//     export class Func {
//         public static initBtnAnchorNew(btn, sScale, eScale, notAnchor?) {
//             if (!notAnchor) {
//                 btn.anchorOffsetX = btn.width / 2;
//                 btn.anchorOffsetY = btn.height / 2;
//                 btn.x = btn.x + btn.width / 2;
//                 btn.y = btn.y + btn.height / 2;
//             }

//             let touchBeginFunc = function (event: egret.TouchEvent) {
//                 btn.scaleX = sScale;
//                 btn.scaleY = sScale;
//             };

//             let touchEndFunc = function (event: egret.TouchEvent) {
//                 btn.scaleX = eScale;
//                 btn.scaleY = eScale;
//             };

//             var objRemove = function (event: egret.Event) {
//                 //console.log("btnRemove");
//                 btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, touchBeginFunc, this);
//                 btn.removeEventListener(egret.TouchEvent.TOUCH_END, touchEndFunc, this);
//                 btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchEndFunc, this);
//                 btn.removeEventListener(egret.Event.REMOVED_FROM_STAGE, objRemove, this);
//             };
//             btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, touchBeginFunc, this);
//             btn.addEventListener(egret.TouchEvent.TOUCH_END, touchEndFunc, this);
//             btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchEndFunc, this);
//             btn.addEventListener(egret.Event.REMOVED_FROM_STAGE, objRemove, this);
//         }


//         public static setMainSceneVisible(isVisible: boolean): void {
//             // if (isVisible) {
//             //     MainUIView.getInstance().showViewByMediatorName(ui.MainTopMediator.NAME);
//             //     MainUIView.getInstance().showViewByMediatorName(ui.WheelMediator.NAME);
//             //     MainUIView.getInstance().showViewByMediatorName(ui.MainCityMediator.NAME);
//             //     MainUIView.getInstance().showViewByMediatorName(ui.ButtonLayerMediator.NAME);
//             // } else {
//             //     MainUIView.getInstance().hideView(ui.MainTopMediator.NAME);
//             //     MainUIView.getInstance().hideView(ui.WheelMediator.NAME);
//             //     MainUIView.getInstance().hideView(ui.MainCityMediator.NAME);
//             //     MainUIView.getInstance().hideView(ui.ButtonLayerMediator.NAME);
//             // }
//         }

//         //判断是否是特殊机型-》在小游戏中带有头帘的手机，例如iPhone X
//         public static dealSpecialMobile(cb: any): void {
//             // if (!InitMark.isWxgame) return;//H5上

//             // if (InitMark.isSpecialMobile === "") {
//             //     platform.user.getSystemInfo(function (data) {
//             //         console.log("userSyestem==>>>", data);
//             //         WxSystemInfo = data;//系统信息;
//             //         let _mobile = ComFunc.trim(data.model, true);
//             //         if (_mobile.indexOf("iPhoneX") != -1 || _mobile.indexOf("vivoX21A") != -1 || _mobile.indexOf("PADM00") != -1) {
//             //             InitMark.isSpecialMobile = Const.SpecialStr;
//             //             if (cb && typeof (cb) == "function") {
//             //                 cb();
//             //             }
//             //         } else {
//             //             InitMark.isSpecialMobile = Const.NormalStr;
//             //         }

//             //         InitMark.mobileSystem = data.system.indexOf(Const.IOS) != -1 ? Const.IOS : Const.Android;//判断手机机型
//             //         // console.log(`InitMark.mobileSystem = ${InitMark.mobileSystem}`);
//             //     });
//             // } else if (InitMark.isSpecialMobile === Const.SpecialStr) {
//             //     if (cb && typeof (cb) == "function") {
//             //         cb();
//             //     }
//             // }
//         }

//         public static closeViewEffect(object: any, cb?: any) {
//             if (!object) {
//                 return;
//             }
//             if (cb && typeof (cb) == "function") {
//                 cb();
//             }
//             //if (view && view.maskImage) {
//             //    egret.Tween.get(view.maskImage).to({alpha: 0}, 300);
//             //}
//             //egret.Tween.get(view).to({
//             //    scaleX: 0.7,
//             //    scaleY: 0.7
//             //}, 300, egret.Ease.backIn).call(cb)
//         }

//         public static openInviteView(type: string, cb?: Function): void {
//             // if (((type == InviteShowType.Share && dataManager.data.guide[AcLockType.invite]) || type != InviteShowType.Share) && InitMark.ShareBtnFaceId) {

//             // MainUIView.getInstance().showView(new ui.InviteView(type, cb), ui.InviteMediator.NAME, true);
//             // } else {
//             //MainUIView.getInstance().showView(new ui.FriendCityView(), ui.FriendCityMediator.NAME, true);
//             // openWorldChat(Const.FriendInfo);
//             // }
//         }

//         /**
//          * 打开通用的帮助界面
//          * @param title 标题名字
//          * @param text 帮助描述内容
//          */
//         public static openHelpPanel(text: string, parentLayer?: string): void {
//             soundModel.playSound(game.SoundType.SOUND_PANEL_OPEN);
//             WindowManager.showWindow(game.WindowType.WINDOW_HELPLABEL, text);
//             // MainUIView.getInstance().showView(new ui.HelpPanelView(text), ui.HelpPanelMediator.NAME, true, parentLayer);
//         }


//         //打开世界聊天
//         // function openWorldChat(type: string): void {
//         //     const chatMsgLength = 20;
//         //     ChatCache.NewMessages = [];

//         //     //console.log(`打开世界聊天未处理之前==>> ChatCache.Messages.length = ${ChatCache.Messages.length}`);
//         //     let _mesOverLength = ChatCache.Messages.length - chatMsgLength > 0 ? ChatCache.Messages.length - chatMsgLength : 0;
//         //     if (_mesOverLength > 0) {
//         //         ChatCache.Messages.splice(0, _mesOverLength);
//         //     }
//         //     //console.log(`打开世界聊天处理之后 ==>> ChatCache.Messages.length = ${ChatCache.Messages.length}`);
//         //     //ChatCache.Messages = _messageArr;
//         //     MainUIView.getInstance().showView(new ui.ChatMainView(type), ui.ChatMainMediator.NAME, true);
//         // }


//         /**
//              * 购买商品
//              * @param goodsId 物品的标识
//              * @param count 数量
//              */
//         public static payFunc(goodsId: string, count: number = 1, aid?: any): void {
//             TipManager.bubble(`${goodsId}===${count}乘以 quantity个`);

//             //appleappstore特殊设置的

//             // if (InitMark.channel == "appleappstore") {
//             //     Func.PopConfirmView("iOS系统无法充值");
//             //     return;
//             // }

//             let aidStr = "";
//             if (aid) {
//                 aidStr = `&aid=${aid}`;
//             }
//             // util.jzlog("ljz/todo:>>>发送购买商品的协议", goodsId, ";count = ", count, ";aid =", aid)
//             // "uid=" + playerModel.uid + "&goodsId=" + goodsId + "&count=" + count + "&miPay=" + (gateModel.isWxgame && InitMark.mobileSystem == Const.Android) + aidStr
//             // HttpService.post(game.ServerMsg.SHOP_ORDER, "uid=" + playerModel.uid, function (data) {
//             // console.log("请求订单==" + JSON.stringify(data));
//             // if (!InitMark.isWxgame) {
//             //     .pay({
//             //         order_id: data.order_id,
//             //         app_id: data.app_id,
//             //         timestamp: data.timestamp,
//             //         nonce_str: data.nonce_str,
//             //         package: data.package,
//             //         sign_type: data.sign_type,
//             //         pay_sign: data.pay_sign
//             //     });
//             // } else {

//             //     if (Func.checkIOSPay()) {
//             //         MainUIView.getInstance().closeView(ui.LoadingUIMediator.NAME);
//             //         Func.PopConfirmView("该功能暂未开放");
//             //     } else {
//             //         if (InitMark.mobileSystem == Const.IOS) {
//             //             Func.QRCodePay(data, goodsId);
//             //         } else {
//             //             Func.wxPayByOrder(data);
//             //         }
//             //     }
//             // }

//             // });
//         }

//         /**
//      * 刷新道具事件
//      */
//         public static refreshDataEvent(data: any): void {
//             //刷新道具
//             if (_.has(data, ShopConst.Money)) {
//                 EventCenter.sendEvent(EventConst.GoldChange);
//             }
//             if (_.has(data, ShopConst.Energy)) {
//                 EventCenter.sendEvent(EventConst.EnergyChange);
//             }
//             if (_.has(data, "doubleMoneyCard")) {
//                 EventCenter.sendEvent(EventConst.GetDoubleMoneyCard);
//             }
//             if (_.has(data, ShopConst.Monthcard)) {
//                 EventCenter.sendEvent(EventConst.RefreshWheelRedPoint);
//             }
//             if (_.has(data, ShopConst.Horn)) {
//                 EventCenter.sendEvent(EventConst.refreshHornCount);
//             }
//             if (_.has(data, ShopConst.MagicBook)) {
//                 EventCenter.sendEvent(EventConst.RefreshMagicBookCount);
//             }
//             // if (_.has(data, "oCard") || _.has(data, "fCard")) {
//             //     let _mediator = Func.getMediator(ui.DragonBoatMediator.NAME);
//             //     if (_mediator) {
//             //         _mediator.initFriendInfo();
//             //     }
//             // }
//             // if (_.has(data, "shovel")) {
//             //     let _mediator = Func.getMediator(ui.TreasureMapMainMediator.NAME);
//             //     if (_mediator) {
//             //         TMEnterData.shovel += data["shovel"];
//             //         _mediator.initShovel();
//             //     }
//             // }
//         }

//         /**
//          * 获取某个mediator
//          * @param mediatorName 需要获取的mediatorName
//          */
//         // public static getMediator(mediatorName: string): any {
//         //     let viewMediator = AppFacade.getInstance().getMediatorByName(mediatorName);
//         //     if (viewMediator) {
//         //         return viewMediator;
//         //     }
//         //     return null;
//         // }



//     }
// }