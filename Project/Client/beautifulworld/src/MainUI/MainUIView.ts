


class MainUIView extends BaseView {
	public name:string = "MainUIView";

	public midBtn: eui.Button;
	public midRightBtn: eui.Button;
	public pic1: eui.Image;
	public pic2: eui.Image;
	public pic3: eui.Image;
	public pic4: eui.Image;

	
	
	
	
	
	
	public midBtnType: string;


	public timer:egret.Timer;

	public animIndex :number;
	
	private tw;
	public constructor() {
		super();
		this.skinName = MainUIViewSkin;
		this.visible = true;
		this.init();
		this.midBtnType = MAINUI_MIDBTN_START_TYPE;
		this.timer = new egret.Timer(100, 0);

		this.timer.addEventListener(egret.TimerEvent.TIMER, 
			function(){ 
				console.log("定时函数执行")
				
				// console.log("this.animIndex = ", this.animIndex)
				let last = this.animIndex - 1;
				if(last == 0)
					last = 4;
				
				//1.显示边框帧动画
				// this["mc"+last].visible = false;
				console.log("显示》〉》〉》", this.animIndex);
				// this["mc"+this.animIndex].visible = true;
				
				//2.图片自身缩放
				// this.tw = egret.Tween.get(this["pic"+this.animIndex], { loop: false });
            	// this.tw.to({ scaleX: 1.06, scaleY: 1.06 }, 10)
				// .to({ scaleX: 0.8, scaleY: 0.8 }, 10)
                // .to({ scaleX: 1, scaleY: 1 }, 10);

				for(let i = 1; i<=4; i++){
					this["pic"+i].filters = null;
				}
				//3.使用发光滤镜
				// let color = 0x33CCFF;
				// var alpha = 0.8;
				// let blurX = 35;
				// let blurY = 35;
				// let strength = 2;
				// let quality = egret.BitmapFilterQuality.HIGH;
				// let inner = false;
				// let knockout = false;
				// let glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
			
				// this["pic"+this.animIndex].filters = [glowFilter];

				//4.使用投影滤镜
				let distance = 6;
				let angle = 45;
				let color = 0X000000;
				var alpha = 0.8;
				let blurX = 16;
				let blurY = 16;
				let strength = 0.65;
				let quality = egret.BitmapFilterQuality.LOW;
				let inner = false;
				let knockout = false;
				let drawShadowFilter = new egret.DropShadowFilter(distance, angle, color, 
								alpha, blurX, blurY, strength, quality, inner, knockout);
			
				this["pic"+this.animIndex].filters = [drawShadowFilter];









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
		this.midRightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightBtnClick, this);

		
		this.pic1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic1Click, this);
		this.pic2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic2Click, this);
		this.pic3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic3Click, this);
		this.pic3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPic4Click, this);
	}

	//监听事件：关心的消息广播之后这里就听到了。然后刷新数据
	protected ListenEvent() {
		AddEventListener(EventType.UPDATE_MAINUI, this.onUpdate, this);
	}

	private onMidBtnClick() {
		//广播消息出去。
		console.log("广播消息出去。" , this.midBtnType);
		sendEvent(EventType.CLICK_MID_BTN, this.midBtnType);
	}

	private onRightBtnClick() {
		console.log("请求数据");
	}

	private onPic1Click() {

	}

	private onPic2Click() {

	}

	private onPic3Click() {

	}

	private onPic4Click() {

	}

	private onUpdate(e: egret.Event) {
		console.log("刷新主界面");
		let data = e.data;
		this.midBtnType = data.type || this.midBtnType;
		if(data.start){
			//开始旋转
			console.log("开始旋转2222");
			// for(let i =1; i<5; i++){
			// 	this["mc"+i].visible = false;
			// }
			this.timer.stop();
			 this.timer.start();

			 this.midBtnType = MAINUI_MIDBTN_END_TYPE;
			 this.midBtn.label = "停！";
		}else if(data.stop){
			console.log("停止:this.animIndex = ", this.animIndex-1);
			this.animIndex = 1;
			this.timer.stop();
			this.midBtn.label = "开始";
			this.midBtnType = MAINUI_MIDBTN_START_TYPE;

			
		}else{
			console.log(">>>>>>>>>>>>>>>>收到数据",data);
			let arr = data.data;
			for(let i = 0; i < 4; i++){
				
				// console.log(">>>>data_",i , "[id]= ", data[i]["id"] );
				// console.log(">>>>data_",i , "[cerate_at]= ", data[i].cerate_at );
				// let data = e;
				console.log("data ========",i, arr[i])
				console.log(">>>>data_",arr, i , "[image_url]= ", arr[i].image_url );

				let request = new egret.HttpRequest();
				request.responseType = egret.HttpResponseType.ARRAY_BUFFER;
				request.open(arr[i].image_url,egret.HttpMethod.GET);
				// request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				
				
				// request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				// request.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36");
				// request.setRequestHeader("Referer", "http://www.mzitu.com");

				request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				request.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36");
				request.setRequestHeader("Referer", "http://www.mzitu.com");
				request.send();
				request.addEventListener(egret.Event.COMPLETE,this["onGetComplete"+(i+1)],this);
				// request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
				// request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
				// RES.getResByUrl(arr[i].image_url,  this["onGetComplete"+(i+1)], this, RES.ResourceItem.TYPE_IMAGE);


				// this["pic"+i+1].source = texture[1];

			}
		}

		// if(data.data){
		// 	var texture = data.data;
		// 	this.pic1.source = texture[1];
		// 	this.pic2.source = texture[2];
		// 	this.pic3.source = texture[3];
		// 	this.pic4.source = texture[4];
		// }
		//girls....
	}

	private onGetComplete1(data){
		// var img: egret.Texture = <egret.Texture>data;
        // var bitmap: egret.Bitmap = new egret.Bitmap(<egret.Texture>data);
		// this.pic1.source = img;
		;
		this.pic1.$setTexture(<egret.Texture>data.currentTarget.response);
	}

	private onGetComplete2(data){
		// this.pic2.source = data;
		this.pic2.$setTexture(<egret.Texture>data.currentTarget.response);
		
	}

	private onGetComplete3(data){
		// this.pic3.source = data;
		this.pic3.$setTexture(<egret.Texture>data.currentTarget.response);
		
	}

	private onGetComplete4(data){
		// this.pic4.source = data;
		this.pic4.$setTexture(<egret.Texture>data.currentTarget.response);
		
	}

}