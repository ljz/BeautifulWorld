var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var Register = (function () {
        function Register() {
            this.initialize();
        }
        Register.prototype.initialize = function () {
            // 留给子类完善
            throw new Error("此接口必须由子类覆盖");
        };
        Register.initialize = function (c) {
            TsEngine.singletonFactory(c);
        };
        return Register;
    }());
    TsEngine.Register = Register;
    __reflect(Register.prototype, "TsEngine.Register");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=Register.js.map