


class MainUIView extends BaseView {
	public name:string = "MainUIView";

	public midBtn: eui.Button;
	public midBtnType: number;
	
	public constructor() {
		super();
		this.skinName = MainUIViewSkin;
		this.visible = true;
		this.init();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		console.log("MainUIVIew has childrenCreated");
	}

	//绑定ui事件，按钮点击等事件的响应函数
	protected bindEvent() {
		console.log("this.midBtn == ", this.midBtn);
		this.midBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMidBtnClick, this);
	}

	//监听事件：关心的消息广播之后这里就听到了。然后刷新数据
	protected ListenEvent() {
		AddEventListener(EventType.UPDATE_MAINUI, this.onUpdate, this);
	}

	private onMidBtnClick() {
		//广播消息出去。
		console.log("广播消息出去。");
		SendEvent(EventType.CLICK_MID_BTN, this.midBtnType);
	}

	private onUpdate(data: any) {
		console.log("刷新主界面");
		
		this.midBtnType = data.type || this.midBtnType;
		//girls....
	}

}