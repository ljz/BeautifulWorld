

class UiManager {
    private UiList = {}

    constructor() {

    }

    public openPanel(name: string, parent, args?) {
        if (!UiInfoList[name])
        {

            console.log("没有找到这个名字，换一个名字试试看");
            return;
        }            
        console.log("parent=== ", parent)
        let info = UiInfoList[name];
        let viewClass = info[0];
        let logicClass = info[1];
        console.log("viewClass == ", viewClass);
        // console.log("window[viewClass] = ", window[viewClass])
        let viewObj = new MainUIView();// new window[viewClass]();

        let logicObj = new MainUILogic(); //window[logicClass]();
        this.UiList[name] = { viewObj, logicObj };
        parent.addChild(viewObj);
        
        console.log("viewObj=== ", viewObj, viewObj.parent);
        console.log(">>>>>>>>",parent.getChildByName("MainUIView"));
        viewObj.setShowArgs(args);
    }

    public closePanel(name: string) {
        if (!UiInfoList[name])
            return;
        let viewObj, logicObj = this.UiList[name];
        viewObj.close();
        logicObj.close();
        this.UiList[name] = null;
    }
}

let g_UiMgr = new UiManager();

function OpenPanel(name: string, parent, args?) {
    g_UiMgr.openPanel(name, parent, args);
    console.log("parent.child = ",parent.getChildByName("MainUIView"))
}

function ClosePanel(name: string) {
    g_UiMgr.closePanel(name);
}
