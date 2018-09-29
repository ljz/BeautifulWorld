var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var HashMap = (function () {
        function HashMap() {
            this.mLength = 0;
            this.mLength = 0;
            this.content = new Object();
        }
        Object.defineProperty(HashMap.prototype, "length", {
            //-------------------公共方法--------------------
            /**
             * 返回长度
             */
            get: function () {
                return this.mLength;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 返回是否为空
         */
        HashMap.prototype.isEmpty = function () {
            return (this.mLength == 0);
        };
        /**
         * 返回所有键
         */
        HashMap.prototype.keys = function () {
            var temp = new Array(this.mLength);
            var index = 0;
            for (var i in this.content) {
                temp[index] = i;
                index++;
            }
            return temp;
        };
        /**
       * 函数执行每一个键
       * @param 函数
       */
        HashMap.prototype.eachKey = function (func, thisObject) {
            for (var i in this.content) {
                func.call(thisObject, i);
            }
        };
        /**
       * 函数执行每一个值
       * @param 函数
       */
        HashMap.prototype.eachValue = function (func, thisObject) {
            for (var i in this.content) {
                var value = this.content[i];
                func.call(thisObject, value);
            }
        };
        /**
         * 数组形式返回map内容
         */
        HashMap.prototype.values = function () {
            var temp = new Array(this.mLength);
            var index = 0;
            for (var i in this.content) {
                temp[index] = this.content[i];
                index++;
            }
            return temp;
        };
        /**
         * 检查是否存在某值
         */
        HashMap.prototype.containsValue = function (value) {
            for (var i in this.content) {
                var result = this.content[i];
                if (result === value) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 检查是否存在某键
         */
        HashMap.prototype.containsKey = function (key) {
            key = this.generateKey(key);
            if (this.content[key] != undefined) {
                return true;
            }
            return false;
        };
        /**
       * 获取键值
       */
        HashMap.prototype.getValue = function (key) {
            key = this.generateKey(key);
            var value = this.content[key];
            if (value !== undefined) {
                return value;
            }
            return null;
        };
        /**
       * 加入元素
     * 新值替换旧值；空则删；返回旧值
         */
        HashMap.prototype.put = function (key, value) {
            key = this.generateKey(key);
            if (key == null) {
                throw new Error("cannot put a value with undefined or null key!");
            }
            else if (value == null) {
                return this.remove(key);
            }
            else {
                var exist = this.containsKey(key);
                if (!exist) {
                    this.mLength++;
                }
                this.content[key] = value;
                return value;
            }
        };
        /**
     * 移除键及内容
         */
        HashMap.prototype.remove = function (key) {
            key = this.generateKey(key);
            var exist = this.containsKey(key);
            if (!exist) {
                return null;
            }
            var temp = this.content[key];
            this.content[key] = null;
            delete this.content[key];
            this.mLength--;
            return temp;
        };
        /**
       * 清除所有
       */
        HashMap.prototype.clear = function () {
            this.mLength = 0;
            this.content = new Object();
        };
        /**
       * 克隆
       */
        HashMap.prototype.clone = function () {
            var temp = new HashMap();
            for (var i in this.content) {
                temp.put(i, this.content[i]);
            }
            return temp;
        };
        /**
     * 打印字符串形式
     * @return
     */
        HashMap.prototype.toString = function () {
            var ks = this.keys();
            var vs = this.values();
            var temp = "HashMap Content:\n";
            for (var i = 0; i < ks.length; i++) {
                temp += ks[i] + " -> " + vs[i] + "\n";
            }
            return temp;
        };
        HashMap.prototype.generateKey = function (key) {
            if (key && typeof key != "string" && typeof key != "number") {
                if (key._hashtableUniqueId == undefined) {
                    key._hashtableUniqueId = "___HID___" + (HashMap.id++);
                }
                key = key._hashtableUniqueId;
            }
            return key;
        };
        /**
        * 生成每个物品唯一key
        * @return
        */
        HashMap.id = 0;
        return HashMap;
    }());
    TsEngine.HashMap = HashMap;
    __reflect(HashMap.prototype, "TsEngine.HashMap");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=HashMap.js.map