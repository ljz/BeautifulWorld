var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UiManager = (function () {
    function UiManager() {
        this.UiList = {};
    }
    UiManager.prototype.openPanel = function (name, parent, args) {
        if (!UiInfoList[name]) {
            console.log("没有找到这个名字，换一个名字试试看");
            return;
        }
        console.log("parent=== ", parent);
        var info = UiInfoList[name];
        var viewClass = info[0];
        var logicClass = info[1];
        console.log("viewClass == ", viewClass);
        // console.log("window[viewClass] = ", window[viewClass])
        var viewObj = new MainUIView(); // new window[viewClass]();
        var logicObj = new MainUILogic(); //window[logicClass]();
        this.UiList[name] = { viewObj: viewObj, logicObj: logicObj };
        parent.addChild(viewObj);
        console.log("viewObj=== ", viewObj, viewObj.parent);
        console.log(">>>>>>>>", parent.getChildByName("MainUIView"));
        viewObj.setShowArgs(args);
    };
    UiManager.prototype.closePanel = function (name) {
        if (!UiInfoList[name])
            return;
        var viewObj, logicObj = this.UiList[name];
        viewObj.close();
        logicObj.close();
        this.UiList[name] = null;
    };
    return UiManager;
}());
__reflect(UiManager.prototype, "UiManager");
var g_UiMgr = new UiManager();
function OpenPanel(name, parent, args) {
    g_UiMgr.openPanel(name, parent, args);
    console.log("parent.child = ", parent.getChildByName("MainUIView"));
}
function ClosePanel(name) {
    g_UiMgr.closePanel(name);
}
