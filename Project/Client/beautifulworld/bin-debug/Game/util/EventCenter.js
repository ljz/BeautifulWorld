var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by zhouchuang on 16/9/7.
 */
var EventCenter = (function () {
    function EventCenter() {
    }
    EventCenter.addEventListener = function (type, listener, thisObject, useCapture, priority) {
        this.instance.addEventListener(type, listener, thisObject, useCapture, priority);
    };
    EventCenter.dispatchEvent = function (e) {
        this.instance.dispatchEvent(e);
    };
    EventCenter.hasEventListener = function (type) {
        return this.instance.hasEventListener(type);
    };
    EventCenter.removeEventListener = function (type, listener, thisObject, useCapture) {
        this.instance.removeEventListener(type, listener, thisObject, useCapture);
    };
    EventCenter.sendEvent = function (e, data) {
        var eve = new egret.Event(e);
        eve.data = data;
        this.instance.dispatchEvent(eve);
    };
    EventCenter.instance = new egret.EventDispatcher();
    return EventCenter;
}());
__reflect(EventCenter.prototype, "EventCenter");
//# sourceMappingURL=EventCenter.js.map