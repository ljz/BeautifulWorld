var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseLogic = (function () {
    function BaseLogic() {
        this.listenEvent();
    }
    BaseLogic.prototype.destroy = function () {
        this.removeEvent();
    };
    BaseLogic.prototype.listenEvent = function () {
        console.trace("未实现这个接口");
    };
    BaseLogic.prototype.removeEvent = function () {
        RemoveAllEventByObj(this);
    };
    BaseLogic.prototype.close = function () {
        this.destroy();
    };
    return BaseLogic;
}());
__reflect(BaseLogic.prototype, "BaseLogic");
