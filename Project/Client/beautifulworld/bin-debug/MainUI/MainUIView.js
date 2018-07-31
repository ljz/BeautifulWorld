var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MainUIView = (function (_super) {
    __extends(MainUIView, _super);
    function MainUIView() {
        var _this = _super.call(this) || this;
        _this.name = "MainUIView";
        _this.skinName = MainUIViewSkin;
        _this.visible = true;
        _this.init();
        return _this;
    }
    MainUIView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MainUIView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        console.log("MainUIVIew has childrenCreated");
    };
    //绑定ui事件，按钮点击等事件的响应函数
    MainUIView.prototype.bindEvent = function () {
        console.log("this.midBtn == ", this.midBtn);
        this.midBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMidBtnClick, this);
    };
    //监听事件：关心的消息广播之后这里就听到了。然后刷新数据
    MainUIView.prototype.ListenEvent = function () {
        AddEventListener(EventType.UPDATE_MAINUI, this.onUpdate, this);
    };
    MainUIView.prototype.onMidBtnClick = function () {
        //广播消息出去。
        console.log("广播消息出去。");
        SendEvent(EventType.CLICK_MID_BTN, 1);
    };
    MainUIView.prototype.onUpdate = function (data) {
        console.log("刷新主界面");
    };
    return MainUIView;
}(BaseView));
__reflect(MainUIView.prototype, "MainUIView");
//# sourceMappingURL=MainUIView.js.map