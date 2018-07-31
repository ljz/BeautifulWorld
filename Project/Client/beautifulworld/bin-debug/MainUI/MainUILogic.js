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
var MainUILogic = (function (_super) {
    __extends(MainUILogic, _super);
    function MainUILogic() {
        var _this = _super.call(this) || this;
        _this.midEvent = { MAINUI_MIDBTN_START_TYPE: _this.onBegin, MAINUI_MIDBTN_END_TYPE: _this.onEnd, MAINUI_MIDBTN_UPDATE_TYPE: _this.onGetNewData };
        console.log(">>>>>创建了MainUILogic对象");
        return _this;
    }
    //监听事件：关心的消息广播之后这里就听到了。然后刷新数据
    MainUILogic.prototype.listenEvent = function () {
        AddEventListener(EventType.CLICK_MID_BTN, this.onClickMidBtn, this);
    };
    MainUILogic.prototype.onClickMidBtn = function (e) {
        var type = e.data;
        var func = this.midEvent[type];
        console.log(">>>>处理逻辑,func = ", func, "type = ", type);
        func();
    };
    MainUILogic.prototype.onBegin = function () {
        console.log("开始");
        SendEvent(EventType.UPDATE_MAINUI, { start: true });
    };
    MainUILogic.prototype.onEnd = function () {
        SendEvent(EventType.UPDATE_MAINUI, { stop: true });
    };
    MainUILogic.prototype.onGetNewData = function () {
        console.log(">>>发送请求， 请求链接");
        RES.getResByUrl("http://74.82.198.32:8090/get/image/url", this.onGetComplete, this, RES.ResourceItem.TYPE_TEXT);
    };
    MainUILogic.prototype.onGetComplete = function (data) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>onGetComplete", data);
        // var img: egret.Texture = <egret.Texture>event;//new egret.Texture();
        // SendEvent(EventType.UPDATE_MAINUI, {data:texture});
    };
    return MainUILogic;
}(BaseLogic));
__reflect(MainUILogic.prototype, "MainUILogic");
//# sourceMappingURL=MainUILogic.js.map