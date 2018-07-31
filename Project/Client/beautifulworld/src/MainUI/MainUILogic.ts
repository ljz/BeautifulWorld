

class MainUILogic extends BaseLogic{


	private midEvent = {MAINUI_MIDBTN_START_TYPE:this.onBegin, MAINUI_MIDBTN_END_TYPE:this.onEnd, MAINUI_MIDBTN_UPDATE_TYPE:this.onGetNewData};
	
	public constructor() {
		super();	
		console.log(">>>>>创建了MainUILogic对象");	
	}
	
	//监听事件：关心的消息广播之后这里就听到了。然后刷新数据
	protected listenEvent() {

		AddEventListener(EventType.CLICK_MID_BTN, this.onClickMidBtn, this);
		
	}
	
	protected onClickMidBtn(e: egret.Event){
		let type = e.data;
		let func = this.midEvent[type];
		console.log(">>>>处理逻辑,func = ", func, "type = ", type);

		func();
	}

	protected onBegin(){
		console.log("开始");
		SendEvent(EventType.UPDATE_MAINUI, {start:true});
	}

	protected onEnd(){
		SendEvent(EventType.UPDATE_MAINUI, {stop:true});
	}

	protected onGetNewData(){

	}

}