var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var SharedObject = (function () {
        function SharedObject(path) {
            this.path = path;
            this.parseLocalData();
        }
        SharedObject.prototype.parseLocalData = function () {
            this.mData = {};
            var result = egret.localStorage.getItem(this.path);
            if (result) {
                var resultArray = result.split(",");
                for (var i = 0; i < resultArray.length; i++) {
                    var keyValue = resultArray[i].split("|");
                    var valueType = keyValue[1];
                    var value = keyValue[2];
                    switch (valueType) {
                        case "n":
                            value = parseInt(value);
                            break;
                        case "b":
                            value = (value == "true");
                            break;
                    }
                    this.mData[keyValue[0]] = value;
                }
            }
        };
        SharedObject.prototype.flush = function () {
            var result = "";
            for (var key in this.mData) {
                var value = this.mData[key];
                if (value != undefined) {
                    var valueType = (typeof value).substr(0, 1);
                    result += key + "|" + valueType + "|" + value + ",";
                }
            }
            result = result.substring(0, result.length - 1);
            egret.localStorage.setItem(this.path, result);
        };
        SharedObject.prototype.clear = function () {
            egret.localStorage.removeItem(this.path);
        };
        Object.defineProperty(SharedObject.prototype, "data", {
            get: function () {
                return this.mData;
            },
            enumerable: true,
            configurable: true
        });
        SharedObject.getLocal = function (path) {
            var obj = this.sharedMap[path];
            if (!obj) {
                obj = new SharedObject(path);
                this.sharedMap[path] = obj;
            }
            return obj;
        };
        SharedObject.clear = function (path) {
            if (path === void 0) { path = null; }
            if (path) {
                this.getLocal(path).clear();
            }
            else {
                egret.localStorage.clear();
            }
        };
        SharedObject.sharedMap = {};
        return SharedObject;
    }());
    TsEngine.SharedObject = SharedObject;
    __reflect(SharedObject.prototype, "TsEngine.SharedObject");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=SharedObject.js.map