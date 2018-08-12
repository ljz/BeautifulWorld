

class MainUILogic extends BaseLogic{


	private midEvent = {MAINUI_MIDBTN_START_TYPE:this.onBegin, MAINUI_MIDBTN_END_TYPE:this.onEnd, MAINUI_MIDBTN_UPDATE_TYPE:this.onGetNewData};
	
	public constructor() {
		super();	
		console.log(">>>>>创建了MainUILogic对象");	
		this.onGetNewData();
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
		sendEvent(EventType.UPDATE_MAINUI, {start:true});
	}

	protected onEnd(){
		sendEvent(EventType.UPDATE_MAINUI, {stop:true});
	}

	protected onGetNewData(){
		console.log(">>>发送请求， 请求链接");
		RES.getResByUrl("http://154.8.151.240:8090/get/image/urls?count=5", this.onGetComplete, this, RES.ResourceItem.TYPE_TEXT);
	}

	// private urlloader:egret.URLLoader; 
	// this.urlloader = new egret.URLLoader(); 

	// private urlreq:egret.URLRequest; 
	// this.urlreq = new egret.URLRequest(); 
	// urlreq.url = "http://httpbin.org/user-agent"; 

	// this.urlloader.load( urlreq ); 


	// this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this); 
	// 	private onComplete(event:egret.Event):void{ 
	// 	console.log(this.urlloader.data); 
	// } 




	public onGetComplete(event:any):void{

        console.log(">>>>>>>>>>>>>>>>>>>>>>onGetComplete", event);
		let data = JSON.parse(event).images	;
        console.log(">>>>>>>>>>>>>>>>>>>>>>onGetComplete22...", data);

		for(let i = 0; i < 5; i++){
			
			console.log(">>>>data_",i , "[id]= ", data[i]["id"] );
			console.log(">>>>data_",i , "[cerate_at]= ", data[i].cerate_at );
			console.log(">>>>data_",i , "[image_url]= ", data[i].image_url );

		}
		
        
        // var img: egret.Texture = <egret.Texture>event;//new egret.Texture();
		SendEvent(EventType.UPDATE_MAINUI, {data});
    }



}