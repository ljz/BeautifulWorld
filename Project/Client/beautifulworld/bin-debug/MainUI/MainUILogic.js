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
        console.log(">>>>>创建了MainUILogic对象");
        return _this;
    }
    //监听事件：关心的消息广播之后这里就听到了。然后刷新数据
    MainUILogic.prototype.listenEvent = function () {
        AddEventListener(EventType.CLICK_MID_BTN, this.onClickMidBtn, this);
    };
    MainUILogic.prototype.onClickMidBtn = function (type) {
        console.log(">>>>处理逻辑");
    };
    return MainUILogic;
}(BaseLogic));
__reflect(MainUILogic.prototype, "MainUILogic");
//# sourceMappingURL=MainUILogic.js.map