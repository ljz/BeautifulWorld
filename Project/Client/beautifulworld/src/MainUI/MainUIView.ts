


class MainUIView extends BaseView {
	public name:string = "MainUIView";

	public midBtn: eui.Button;
	public pic1: eui.Image;
	public pic2: eui.Image;
	public pic3: eui.Image;
	public pic4: eui.Image;

	
	
	
	
	
	
	public midBtnType: string;


	public timer:egret.Timer;

	public animIndex :number;
	
	public constructor() {
		super();
		this.skinName = MainUIViewSkin;
		this.visible = true;
		this.init();
		this.midBtnType = MAINUI_MIDBTN_UPDATE_TYPE;
		this.timer = new egret.Timer(100, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, 
			function(){ 
				// console.log("this.animIndex = ", this.animIndex)
				let last = this.animIndex - 1;
				if(last == 0)
					last = 4;
				this["mc"+last].visible = false;
				console.log("显示》〉》〉》", this.animIndex);
				this["mc"+this.animIndex].visible = true;
				let next = this.animIndex+1;
				if (next > 4){
					next = 1;
				}
				this.animIndex = next;
			 },
			 this);


		this.animIndex = 1;
		this.midBtn.label = "刷新";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private mc1:egret.MovieClip;
	private mc2:egret.MovieClip;
	private mc3:egret.MovieClip;
	private mc4:egret.MovieClip;
	protected childrenCreated(): void {
		super.childrenCreated();
		console.log("MainUIVIew has childrenCreated");


		var data = RES.getRes("test_json");
		var txtr = RES.getRes("test_png");
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		this.mc1 = new egret.MovieClip( mcFactory.generateMovieClipData( "test" ) ); 
		this.addChild( this.mc1 );
		// this.mc1.width = 100;
		this.mc1.$setScaleX(0.8);
		this.mc1.x = 0;
		this.mc1.y = 0;
		this.mc1.gotoAndPlay( 1, -1);

		this.mc2 = new egret.MovieClip( mcFactory.generateMovieClipData( "test" ) ); 
		this.addChild( this.mc2 );
		// this.mc1.width = 100;
		this.mc2.$setScaleX(0.8);

		this.mc2.x = 330;
		this.mc2.y = 0;
		this.mc2.gotoAndPlay( 1, -1);

		this.mc4 = new egret.MovieClip( mcFactory.generateMovieClipData( "test" ) ); 
		this.addChild( this.mc4 );
		// this.mc1.width = 100;
		this.mc4.$setScaleX(0.8);
		this.mc4.x = 0;
		this.mc4.y = 450;
		this.mc4.gotoAndPlay( 1, -1);

		this.mc3 = new egret.MovieClip( mcFactory.generateMovieClipData( "test" ) ); 
		this.addChild( this.mc3 );
		// this.mc1.width = 100;
		this.mc3.$setScaleX(0.8);
		this.mc3.x = 330;
		this.mc3.y =450;

		this.mc3.gotoAndPlay( 1, -1);
		this.mc1.visible = false;
		this.mc2.visible = false;
		this.mc3.visible = false;
		this.mc4.visible = false;
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
		console.log("广播消息出去。" , this.midBtnType);
		SendEvent(EventType.CLICK_MID_BTN, this.midBtnType);
	}

	private onUpdate(e: egret.Event) {
		console.log("刷新主界面");
		let data = e.data;
		this.midBtnType = data.type || this.midBtnType;
		if(data.start){
			//开始旋转
			console.log("开始旋转");
			for(let i =1; i<5; i++){
				this["mc"+i].visible = false;
			}
			 this.timer.start();

			 this.midBtnType = MAINUI_MIDBTN_END_TYPE;
			 this.midBtn.label = "停！";
		}else if(data.stop){
			console.log("停止");
			this.animIndex = 1;
			this.timer.stop();
			this.midBtn.label = "开始";
			 this.midBtnType = MAINUI_MIDBTN_START_TYPE;
			
		}

		if(data.data){
			var texture = data.data;
			this.pic1.source = texture[1];
			this.pic2.source = texture[2];
			this.pic3.source = texture[3];
			this.pic4.source = texture[4];
		}
		//girls....
	}

}