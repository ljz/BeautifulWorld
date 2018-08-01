
class BaseShare {
	//分享类型标识
	public type: string;

	//分享进入链接的发送者id
	public shareOwnerId: string;

	//分享进入链接的配置id
	public shareConfigId: string;

	//微信分享
	public wxShare(title, img, query){
		platform.share.shareAppMessage(
            title, img, query,
            this.onShareSuc.bind(this),
            this.onShareFail.bind(this),
            this.onShareFinish.bind(this)
        );
        PostRequest.openEvent(this.type + "_share");

	}

	//H5分享
	public h5Share(title, img, desc, shareId, _shareCustomParam){
		HORTOR_AGENT.config({
					share: {
						timeline: {
							title: title,
							imgUrl: img,
							success: this.onShareSuc
						},
						friend: {
							title: title,
							imgUrl: img,
							desc: desc,
							shareConfigId: shareId,
							success: this.onShareSuc
						},
						shareCustomParam: _shareCustomParam
					}
				});
	}

	//分享成功
	public onShareSuc(): void {
        InitMark.wxSharing = true;
		console.error("未实现onShareSuc");
	}

    public onShareFail():void{
		console.log(`分享失败`);
    }

    public onShareFinish():void{
		console.log(`分享结束`);
    }

	//点击分享进入
	public onShareEnter(params: any): void {
		console.error("未实现onShareEnter");
	}
}