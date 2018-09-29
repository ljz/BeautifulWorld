var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var Model = (function () {
        function Model(source) {
            if (source === void 0) { source = null; }
            if (source != null) {
                this.inject(source);
            }
        }
        /**
         * 绑定对象
         * @param	property
         * @param	target
         * @param	setterOrFunction
         * @return
         */
        Model.prototype.bind = function (property, target, setterOrFunction) {
            if (setterOrFunction === void 0) { setterOrFunction = "text"; }
            if (this._binder == null)
                this._binder = new TsEngine.Binder(this, this.onPropertyChange);
            if (property == null && (setterOrFunction instanceof Function)) {
                this._onChangeFunc = setterOrFunction;
            }
            else {
                this._binder.bind(property, target, setterOrFunction);
            }
        };
        /**
         * 解除绑定
         * @param	target
         * @param	property
         */
        Model.prototype.unbind = function (target, property) {
            if (property === void 0) { property = null; }
            if (this._binder != null)
                this._binder.unbind(target, property);
        };
        Model.prototype.dispose = function () {
            if (!this.isPersistant) {
                if (this._binder) {
                    this._binder.dispose();
                    this._binder = null;
                }
                this._onChangeFunc = null;
            }
        };
        /**
         * 为模型注入新的数据
         **/
        Model.prototype.inject = function (data, bindInject) {
            if (bindInject === void 0) { bindInject = true; }
            for (var key in data) {
                if (this.hasOwnProperty(key)) {
                    if (bindInject) {
                        this.setProperty(key, data[key]);
                    }
                    else {
                        this[key] = data[key];
                    }
                }
            }
        };
        /**设置属性值*/
        Model.prototype.setProperty = function (property, value, forceRefresh) {
            if (forceRefresh === void 0) { forceRefresh = false; }
            if (this._binder != null)
                this._binder.setProperty(property, value, forceRefresh);
            else
                this[property] = value;
        };
        /**
         * 强制更新一次属性
         * @param	property
         */
        Model.prototype.updateProperty = function (property) {
            if (this._binder != null)
                this._binder.updateProperty(property);
        };
        Object.defineProperty(Model.prototype, "source", {
            /**
             * 获取模型的数据源表示形式,可遍历的Object类型
             * @param	property
             */
            get: function () {
                return this._binder ? this._binder.source : this;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 克隆
         */
        Model.prototype.clone = function () {
            var newModel = TsEngine.construct(this);
            newModel.inject(this.source);
            return newModel;
        };
        /**
         * 当属性发生变化
         */
        Model.prototype.onPropertyChange = function () {
            if (this._onChangeFunc != null)
                this._onChangeFunc();
        };
        return Model;
    }());
    TsEngine.Model = Model;
    __reflect(Model.prototype, "TsEngine.Model", ["TsEngine.IBindable"]);
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=Model.js.map