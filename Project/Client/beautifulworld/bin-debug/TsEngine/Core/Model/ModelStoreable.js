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
var TsEngine;
(function (TsEngine) {
    var ModelStoreable = (function (_super) {
        __extends(ModelStoreable, _super);
        function ModelStoreable(path, bindSource) {
            if (bindSource === void 0) { bindSource = null; }
            var _this = _super.call(this, bindSource) || this;
            _this.m_path = path;
            TsEngine.SystemManager.addStoreable(_this);
            return _this;
        }
        ModelStoreable.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            TsEngine.SystemManager.removeStoreable(this);
        };
        Object.defineProperty(ModelStoreable.prototype, "path", {
            //保存路径
            get: function () {
                return this.m_path;
            },
            enumerable: true,
            configurable: true
        });
        //载入保存数据
        ModelStoreable.prototype.load = function (data) {
        };
        //保存数据
        ModelStoreable.prototype.save = function (data) {
        };
        return ModelStoreable;
    }(TsEngine.Model));
    TsEngine.ModelStoreable = ModelStoreable;
    __reflect(ModelStoreable.prototype, "TsEngine.ModelStoreable", ["TsEngine.IStoreable"]);
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=ModelStoreable.js.map