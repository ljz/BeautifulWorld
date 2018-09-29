var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var Log = (function () {
        function Log() {
        }
        Log.showLog = function (value) {
            this.mShowLog = value;
        };
        Log.log = function (target) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            if (this.mShowLog)
                egret.log(this.getMessage(target, rest));
        };
        Log.warn = function (target) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            if (this.mShowLog)
                egret.warn(this.getMessage(target, rest));
        };
        Log.error = function (target) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            if (this.mShowLog)
                egret.error(this.getMessage(target, rest));
        };
        Log.getMessage = function (target) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            if (!this.mShowLog)
                return;
            var className = (!target || typeof target === "string") ? (target || "") : "[" + egret.getQualifiedClassName(target) + "] ";
            var date = new Date();
            var dateInfo = date.getHours() + ":" + date.getMinutes() + ":" + date.getMilliseconds() + " ";
            var info = "";
            for (var i = 0; i < rest.length; i++) {
                var str = rest[i];
                if (str == null) {
                    continue;
                }
                info += str;
            }
            var message = dateInfo + className + info;
            return message;
        };
        Log.mShowLog = false;
        return Log;
    }());
    TsEngine.Log = Log;
    __reflect(Log.prototype, "TsEngine.Log");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=Log.js.map