var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 通用支付管理器
* Created by sunxinzhe
* Copyright (c) 2017 HortorGames. All rights reserved.
*/
var game;
(function (game) {
    var IapManager = (function () {
        function IapManager() {
        }
        IapManager.pay = function (goodsId, count, aid) {
            //appleappstore特殊设置的
            // if (playerModel.channel == "appleappstore") {
            //     TsEngine.TipManager.alert("iOS系统无法充值");
            //     return;
            // }
            if (count === void 0) { count = 1; }
            var aidStr = "";
            if (aid) {
                aidStr = "&aid=" + aid;
            }
            // HttpService.post(ServerMsg.SHOP_ORDER, "uid=" + playerModel.uid + "&goodsId=" + goodsId + "&count=" + count + "&miPay=" + (gateModel.isWxgame && TsEngine.SystemManager.isAndroid) + aidStr, function (data) {
            //     console.log("请求订单==" + JSON.stringify(data));
            //     if (!gateModel.isWxgame) {
            //         .pay({
            //             order_id: data.order_id,
            //             app_id: data.app_id,
            //             timestamp: data.timestamp,
            //             nonce_str: data.nonce_str,
            //             package: data.package,
            //             sign_type: data.sign_type,
            //             pay_sign: data.pay_sign
            //         });
            //     } else {
            //         if (!gateModel.iosPay) {
            //             TsEngine.TipManager.alert("该功能暂未开放");
            //         } else {
            //             if (TsEngine.SystemManager.isIOS) {
            //                 IapManager.QRCodePay(data, goodsId);
            //             } else {
            //                 IapManager.wxPayByOrder(data);
            //             }
            //         }
            //     }
            // });
        };
        //小游戏支付接口调用
        IapManager.wxPayByOrder = function (orderData) {
            if (!orderData)
                return;
            IapManager.wxPaying = true;
            platform.common.payByOrder(orderData.data, function (err) {
                console.log("payByOrder->>err :", err);
                if (err == null) {
                    console.log("充值成功");
                    IapManager.onPaySuc();
                }
                else if (err.errCode && err.errCode == 1003) {
                    console.log("充值失败");
                    IapManager.onPayError();
                }
            });
        };
        //小游戏二维码支付接口调用
        IapManager.QRCodePay = function (orderData, goodsId) {
            if (!orderData)
                return;
            var imageUrl = goodsId;
            if (goodsId.indexOf("giftPackage") != -1) {
                imageUrl = goodsId.split("#")[0];
            }
            var backUrl = "http://pirate-release-1251003184.cosbj.myqcloud.com/share/QRCodePay/QRCodePay_" + imageUrl + ".png";
            IapManager.wxPaying = true;
            var obj = {
                "orderId": orderData.data.orderId,
                "backUrl": backUrl
            };
            console.log("obj == >", obj);
            platform.common.QRCodePay(obj, function (res) {
                console.log("QRCodePay->>res :", res);
                if (res == null) {
                    // console.log("充值成功");
                    IapManager.onPaySuc();
                }
                else if (res.errCode && res.errCode == 1003) {
                    // console.log("充值失败");
                    IapManager.onPayError();
                }
            });
        };
        IapManager.onPaySuc = function () {
            IapManager.wxPaying = false;
        };
        IapManager.onPayError = function () {
            IapManager.wxPaying = false;
            game.PlatformManager.openEvent("wxPayFailed");
            TsEngine.TipManager.alert("当前网络状态不佳，请重试\n\n如无法解决，请通过公众号联系客服进行解决", function () {
                IapManager.reportFailOrders();
            }, function () {
                TsEngine.TipManager.alert("关闭将会导致订单失效，请通过关注公众号联系客服进行解决");
            });
        };
        //小游戏购买道具时，网络不好失败了，重新发送订单
        IapManager.reportFailOrders = function () {
            platform.common.showLoading("加载中", true);
            platform.common.reportFailOrders(function () {
                // console.log("reportFailOrders-》》成功");
                platform.common.hideLoading();
            }, function () {
                platform.common.hideLoading();
                // console.log("reportFailOrders-》》失败");
            });
        };
        return IapManager;
    }());
    game.IapManager = IapManager;
    __reflect(IapManager.prototype, "game.IapManager");
})(game || (game = {}));
//# sourceMappingURL=IapManager.js.map