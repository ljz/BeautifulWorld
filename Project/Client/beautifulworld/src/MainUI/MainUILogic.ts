

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
	
	protected onClickMidBtn(type){
		console.log(">>>>处理逻辑");
		let func = this.midEvent[type];
		func();
	}

	protected onBegin(){

	}

	protected onEnd(){

	}

	protected onGetNewData(){

	}

}