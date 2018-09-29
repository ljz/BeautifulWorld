var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var Dictionary = (function () {
        function Dictionary() {
        }
        return Dictionary;
    }());
    TsEngine.Dictionary = Dictionary;
    __reflect(Dictionary.prototype, "TsEngine.Dictionary");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=Dictionary.js.map