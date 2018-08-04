
//----------------触礁等待 分享------------------
class KingBarrierShare extends BaseShare {
    public onShareSuc(): void {
        // super.onShareSuc();
        // MainUIView.getInstance().closeView(ui.PirateKingEventMediator.NAME);
    }

    public onShareEnter(params: any): void {
        egret.log("透传参数为:", params);
        // if (params && params.luffyShareToken) {
        //     URLGetRequest.init(ServerMsg.PIRATEKING_SHARE_NOTIFY, "uid=" + InitMark.uid + "&luffyShareToken=" + params.luffyShareToken, (data) => {
        //         new TextPop(data.message);
        //     });
        // }
    }
}

//----------------达成一圈 分享------------------
class KingCircleShare extends BaseShare {
    public onShareSuc(): void {
        super.onShareSuc();
    }

    public onShareEnter(params: any): void {
        egret.log("透传参数为:", params);
        // if (params && params.luffyShareToken) {
        //     URLGetRequest.init(ServerMsg.PIRATEKING_SHARE_NOTIFY, "uid=" + InitMark.uid + "&luffyShareToken=" + params.luffyShareToken, (data) => {
        //         new TextPop(data.message);
        //     });
        // }
    }
}