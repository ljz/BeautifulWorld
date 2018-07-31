

class BaseView extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
        
	}

    public init()
    {
        this.bindEvent();
        this.ListenEvent();
    }

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

    public setShowArgs(args){

    }


    //绑定ui控件的事件
	protected bindEvent() {
	
    }

	//监听事件：关心的消息广播之后这里就听到了。然后刷新数据
	protected ListenEvent() {
	
    }

    public close()
    {

    }


}