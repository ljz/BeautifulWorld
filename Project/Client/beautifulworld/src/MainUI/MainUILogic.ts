class MainUILogic extends BaseLogic{

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
	}



}