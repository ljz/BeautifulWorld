var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var LocaleManager = (function () {
        function LocaleManager() {
        }
        Object.defineProperty(LocaleManager, "lang", {
            set: function (lang) {
                LocaleManager.langMap = lang;
            },
            enumerable: true,
            configurable: true
        });
        /**
         *获取多语言
         * @param key
         * @param force  为ture则找不到会报错。
         * @return
         *
         */
        LocaleManager.getString = function (key, force) {
            if (force === void 0) { force = false; }
            if (!LocaleManager.langMap) {
                if (!force)
                    return '';
                throw new Error("Locale hasn't been initialized!");
            }
            var obj = LocaleManager.langMap;
            var keys = key.split(".");
            for (var i = 0; i < keys.length; i++) {
                var oneKey = keys[i];
                if ("@text" == oneKey) {
                    continue;
                }
                oneKey = oneKey.replace("@", "");
                obj = obj[oneKey];
                if (!obj) {
                    if (!force) {
                        return "";
                    }
                    throw new Error("unknow locale definition for key:: " + key);
                }
            }
            return obj;
        };
        return LocaleManager;
    }());
    TsEngine.LocaleManager = LocaleManager;
    __reflect(LocaleManager.prototype, "TsEngine.LocaleManager");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=LocaleManager.js.map