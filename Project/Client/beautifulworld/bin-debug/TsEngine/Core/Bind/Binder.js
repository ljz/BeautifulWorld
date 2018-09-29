var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var Binder = (function () {
        function Binder(source, onChange) {
            if (onChange === void 0) { onChange = null; }
            this.propertys = new Object();
            this.propertyCount = 0;
            this.source = source;
            this.onChange = onChange;
            Binder.bindings.put(source, this);
        }
        /**
         * 绑定目标
         * eg...model.bind("price",price_txt,"text")
         * eg...model.bind("price",price_txt,onPriceChange)
         * @param	property
         * @param	target
         * @param	setterOrFunction
         */
        Binder.prototype.bind = function (property, target, setterOrFunction) {
            if (setterOrFunction === void 0) { setterOrFunction = "text"; }
            var bindProperty = this.propertys[property];
            if (bindProperty == null) {
                bindProperty = new BindProperty(this.source, property, this.onChange);
                this.propertys[property] = bindProperty;
                this.propertyCount++;
            }
            bindProperty.bind(target, setterOrFunction);
        };
        /**
         * 解除绑定
         * @param	target
         * @param	property
         */
        Binder.prototype.unbind = function (target, property) {
            if (property === void 0) { property = "text"; }
            var bindProperty;
            var instance = this;
            if (property) {
                bindProperty = this.propertys[property];
                if (bindProperty)
                    unbindSingle(bindProperty);
            }
            else {
                for (var i in this.propertys) {
                    bindProperty = this.propertys[i];
                    unbindSingle(bindProperty);
                }
            }
            function unbindSingle(bproperty) {
                var hasElement = bproperty.unbind(target);
                if (!hasElement) {
                    delete instance.propertys[bproperty.property];
                    instance.propertyCount--;
                    if (instance.propertyCount <= 0)
                        Binder.bindings.remove(instance.source);
                }
            }
        };
        /**
         * 设置属性，触发绑定
         * @param	property
         * @param	value
         */
        Binder.prototype.setProperty = function (property, value, forceRefresh) {
            if (forceRefresh === void 0) { forceRefresh = false; }
            var bindProperty = this.propertys[property];
            if (bindProperty) {
                bindProperty.forceRefresh = forceRefresh;
                bindProperty.value = value;
            }
            else {
                this.source[property] = value;
            }
        };
        /**
         * 强制更新一次属性
         * @param	property
         */
        Binder.prototype.updateProperty = function (property) {
            var bindProperty = this.propertys[property];
            if (bindProperty)
                this.setProperty(property, this.source[property], true);
        };
        /**
         * 获取属性值
         * @param	property
         * @return
         */
        Binder.prototype.getProperty = function (property) {
            return this.source[property];
        };
        /**
         * 清除
         */
        Binder.prototype.dispose = function () {
            if (this.propertys != null) {
                for (var i in this.propertys) {
                    var item = this.propertys[i];
                    item.dispose();
                    delete this.propertys[item.property];
                }
                this.propertys = null;
            }
            if (this.source != null) {
                Binder.bindings.remove(this.source);
                this.source = null;
            }
            this.propertyCount = 0;
            this.onChange = null;
        };
        Binder.create = function (source, property, target, setterOrFunction) {
            if (setterOrFunction === void 0) { setterOrFunction = "text"; }
            var binder = Binder.bindings.getValue(source) || (new Binder(source));
            binder.bind(property, target, setterOrFunction);
            return binder;
        };
        Binder.remove = function (target, property) {
            if (property === void 0) { property = "text"; }
            var length = Binder.bindings.length;
            for (var i = 0; i < length; i++) {
                var item = Binder.bindings[i];
                item.unbind(target, property);
            }
        };
        Binder.bindings = new TsEngine.HashMap();
        return Binder;
    }());
    TsEngine.Binder = Binder;
    __reflect(Binder.prototype, "TsEngine.Binder");
    var BindProperty = (function () {
        function BindProperty(source, property, onChange) {
            if (onChange === void 0) { onChange = null; }
            this.targets = new TsEngine.HashMap();
            this.targetCount = 0;
            this.source = source;
            this.onChange = onChange;
            this.property = property;
            this.oldValue = this.newValue = source[property];
            var instance = this;
            Object.defineProperty(source, property, {
                set: function (newVal) {
                    instance.value = newVal;
                },
                get: function () {
                    return instance.value;
                }
            });
        }
        BindProperty.prototype.bind = function (target, setterOrFunction) {
            if (setterOrFunction === void 0) { setterOrFunction = null; }
            if (setterOrFunction == null)
                setterOrFunction = this.property;
            if (!this.targets.containsKey(target)) {
                this.targets.put(target, new BindTarget(target, setterOrFunction));
                this.targetCount++;
            }
            this.oldValue = this.value;
            this.fixBind(this.targets.getValue(target), this.oldValue);
        };
        BindProperty.prototype.unbind = function (target) {
            var bindTarget = this.targets.getValue(target);
            if (bindTarget) {
                bindTarget.dispose();
                this.targets.remove(target);
                this.targetCount--;
                return this.targetCount > 0;
            }
            return true;
        };
        Object.defineProperty(BindProperty.prototype, "value", {
            get: function () {
                return this.newValue;
            },
            set: function (val) {
                if (this.forceRefresh || (this.source[this.property] !== val)) {
                    this.oldValue = this.value;
                    this.newValue = val;
                    for (var i in this.targets.content) {
                        var bindTarget = this.targets.content[i];
                        this.fixBind(bindTarget, val);
                    }
                    if (this.onChange != null)
                        this.onChange();
                }
            },
            enumerable: true,
            configurable: true
        });
        BindProperty.prototype.fixBind = function (bindTarget, val) {
            if (bindTarget.targetSetter != null) {
                val = (bindTarget.targetSetter == 'text') ? val : val;
                bindTarget.target[bindTarget.targetSetter] = val;
            }
            else if (bindTarget.targetFunction != null) {
                var len = bindTarget.targetFunction.length;
                if (len == 0) {
                    bindTarget.targetFunction.call(bindTarget.target);
                }
                else if (len == 1) {
                    bindTarget.targetFunction.call(bindTarget.target, val);
                }
                else if (len == 2) {
                    bindTarget.targetFunction.call(bindTarget.target, val, this.oldValue);
                }
                else {
                    throw new Error("绑定属性的回调函数参数错误!");
                }
            }
        };
        BindProperty.prototype.dispose = function () {
            this.source = null;
            this.property = null;
            this.oldValue = null;
            this.targetCount = 0;
            for (var i in this.targets.content) {
                var bindTarget = this.targets.content[i];
                bindTarget.dispose();
            }
            this.targets.clear();
            this.targets = null;
        };
        return BindProperty;
    }());
    __reflect(BindProperty.prototype, "BindProperty");
    var BindTarget = (function () {
        function BindTarget(target, setterOrFunction) {
            if (setterOrFunction === void 0) { setterOrFunction = null; }
            this.target = target;
            if (typeof (setterOrFunction) == 'function') {
                this.targetSetter = null;
                this.targetFunction = setterOrFunction;
            }
            else {
                this.targetSetter = setterOrFunction;
                this.targetFunction = null;
            }
        }
        BindTarget.prototype.dispose = function () {
            this.target = null;
            this.targetSetter = null;
            this.targetFunction = null;
        };
        return BindTarget;
    }());
    __reflect(BindTarget.prototype, "BindTarget");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=Binder.js.map