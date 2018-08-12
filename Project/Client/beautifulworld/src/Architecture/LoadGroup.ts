

class LoadResGroup {
    private groupName:string = "";
    private _cb:any;
    private noLoadingViews = ["octopus", ]

    constructor(groupName:string, cb:any) {
        this.groupName = groupName;
        this._cb = cb;
        if(groupName != "octopus") {
        }
        this._showLoadingView(groupName);
        this.addResListener();
        RES.loadGroup(groupName);
    }

    private _showLoadingView(groupName){
        if (this.noLoadingViews.indexOf(groupName) == -1){
            // showLoading(); //应该封装一个这种接口。
            // MainUIView.getInstance().showView(new ui.LoadingUIView(), ui.LoadingUIMediator.NAME, true);            
        }
    }

    private addResListener(){
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
    }

    private removeResListener(){
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
    }

    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName != this.groupName)
            return;
        this.onProcessFinish(event);
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        if (event.groupName != this.groupName)
            return;
        console.warn("Url:" + event.resItem.url + " has failed to load");
        this.removeResListener();     
    }

    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        if (event.groupName != this.groupName)
            return;
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onProcessFinish(event);
    }

    private onProcessFinish(event:RES.ResourceEvent){
        this.removeResListener();
        if (this._cb && typeof (this._cb) == "function") {
            this._cb();

            // closeLoading();//封装一个这个接口.
            // MainUIView.getInstance().closeView(ui.LoadingUIMediator.NAME);
        }
    }
}