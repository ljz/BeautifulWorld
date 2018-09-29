/**
 * 通用支付管理器
* Created by sunxinzhe
* Copyright (c) 2017 HortorGames. All rights reserved.
*/
namespace game {
    export class IapManager {
        /**
         * 购买商品
         * @param goodsId 物品的标识
         * @param count 数量
         */
        public static wxPaying: boolean;
        public static pay(goodsId: string, count: number = 1, aid?: any): void {
            //appleappstore特殊设置的
            // if (playerModel.channel == "appleappstore") {
            //     TsEngine.TipManager.alert("iOS系统无法充值");
            //     return;
            // }

            let aidStr = "";
            if (aid) {
                aidStr = `&aid=${aid}`;
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
        }

        //小游戏支付接口调用
        private static wxPayByOrder(orderData: any) {
            if (!orderData) return;

            IapManager.wxPaying = true;
            platform.common.payByOrder(orderData.data, function (err) {
                console.log("payByOrder->>err :", err);
                if (err == null) {
                    console.log("充值成功");
                    IapManager.onPaySuc();
                } else if (err.errCode && err.errCode == 1003) {
                    console.log("充值失败");
                    IapManager.onPayError();
                }
            });
        }

        //小游戏二维码支付接口调用
        private static QRCodePay(orderData: any, goodsId: string) {
            if (!orderData) return;
            let imageUrl = goodsId;

            if (goodsId.indexOf("giftPackage") != -1) {
                imageUrl = goodsId.split("#")[0];
            }

            let backUrl = `http://pirate-release-1251003184.cosbj.myqcloud.com/share/QRCodePay/QRCodePay_${imageUrl}.png`;

            IapManager.wxPaying = true;
            let obj = {
                "orderId": orderData.data.orderId,
                "backUrl": backUrl
            }

            console.log(`obj == >`, obj);
            platform.common.QRCodePay(obj, function (res) {
                console.log("QRCodePay->>res :", res);
                if (res == null) {
                    // console.log("充值成功");
                    IapManager.onPaySuc();
                } else if (res.errCode && res.errCode == 1003) {
                    // console.log("充值失败");
                    IapManager.onPayError();
                }
            });
        }

        private static onPaySuc(): void {
            IapManager.wxPaying = false;
        }

        private static onPayError(): void {
            IapManager.wxPaying = false;
            PlatformManager.openEvent("wxPayFailed");
            TsEngine.TipManager.alert("当前网络状态不佳，请重试\n\n如无法解决，请通过公众号联系客服进行解决",
                () => {
                    IapManager.reportFailOrders();
                },
                () => {
                    TsEngine.TipManager.alert("关闭将会导致订单失效，请通过关注公众号联系客服进行解决");
                }
            )
        }

        //小游戏购买道具时，网络不好失败了，重新发送订单
        private static reportFailOrders(): void {
            platform.common.showLoading("加载中", true);
            platform.common.reportFailOrders(() => {
                // console.log("reportFailOrders-》》成功");
                platform.common.hideLoading();
            }, () => {
                platform.common.hideLoading();
                // console.log("reportFailOrders-》》失败");
            });
        }
    }
}