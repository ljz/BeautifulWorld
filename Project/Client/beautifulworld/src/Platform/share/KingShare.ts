/**
* Created by liuyang
* Copyright (c) 2017 HortorGames. All rights reserved.
*/
namespace game {
    //----------------触礁等待 分享------------------
    export class KingBarrierShare extends GameShare {
        public onShareSuc(): void {
            super.onShareSuc();
            //MainUIView.getInstance().closeView(ui.PirateKingEventMediator.NAME);
        }

        public onShareEnter(params: any): void {
            egret.log("kingShare透传参数为:", params);
            if (params && params.luffyShareToken) {
                //URLGetRequest.init(ServerMsg.PIRATEKING_SHARE_NOTIFY, "uid=" + InitMark.uid + "&luffyShareToken=" + params.luffyShareToken, (data) => {
                   // new TextPop(data.message);
               // });
            }
        }
    }

    //----------------达成一圈 分享------------------
    export class KingCircleShare extends GameShare {
        public onShareSuc(): void {
            super.onShareSuc();
        }

        public onShareEnter(params: any): void {
            egret.log("kingShare透传参数为:", params);
           // if (params && params.luffyShareToken) {
               // URLGetRequest.init(ServerMsg.PIRATEKING_SHARE_NOTIFY, "uid=" + InitMark.uid + "&luffyShareToken=" + params.luffyShareToken, (data) => {
                 //   new TextPop(data.message);
               // });
            //}
        }
    }
}