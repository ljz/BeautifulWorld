var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var NumberFormatter = (function () {
        function NumberFormatter() {
        }
        Object.defineProperty(NumberFormatter, "locale", {
            get: function () {
                return NumberFormatter.m_locale;
            },
            set: function (value) {
                NumberFormatter.m_locale = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         *格式化数字
         * @param number             源数字
         * @param decimals            小数位
         * @param siStyle               点号千位分隔符
         * @return
         */
        NumberFormatter.format = function (number, decimals, siStyle) {
            if (decimals === void 0) { decimals = 0; }
            if (siStyle === void 0) { siStyle = false; }
            var i = 0;
            var inc = Math.pow(10, decimals);
            var str = (Math.round(inc * number) / inc);
            var hasSep = str.indexOf(".") == -1, sep = hasSep ? str.length : str.indexOf(".");
            var ret = (hasSep && !decimals ? "" : (siStyle ? "," : ".")) + str.substr(sep + 1);
            if (decimals) {
                for (var j = 0; j <= decimals - (str.length - (hasSep ? sep - 1 : sep)); j++)
                    ret += "0";
            }
            while (i + 3 < (str.substr(0, 1) == "-" ? sep - 1 : sep))
                ret = (siStyle ? "." : ",") + str.substr(sep - (i += 3), 3) + ret;
            return str.substr(0, sep - i) + ret;
        };
        /**
         *格式化四舍五入
         * @param number
         * @return
         */
        NumberFormatter.formatRound = function (value) {
            if (value == null)
                return "0";
            value = value;
            if (NumberFormatter.locale == "en_US" || NumberFormatter.locale == "vi_VN") {
                return NumberFormatter.formatEngNumber(value);
            }
            else {
                var localeStrings;
                switch (NumberFormatter.locale) {
                    case "zh_CN":
                        localeStrings = ["亿", "万"];
                        break;
                    case "zh_TW":
                        localeStrings = ["億", "萬"];
                        break;
                    case "ja_JP":
                        localeStrings = ["億", "万"];
                        break;
                    case "ko_KR":
                        localeStrings = ["억", "만"];
                        break;
                }
                if (localeStrings != null) {
                    if (value >= 100000000)
                        return Math.floor(value / 100000000) + localeStrings[0];
                    else if (value >= 100000)
                        return Math.floor(value / 10000) + localeStrings[1];
                }
            }
            return value.toString();
        };
        /**
         *格式化时间
         * @param ms              时间毫秒数
         * @param zhFormat    中文格式
         * @return
         */
        NumberFormatter.formatTime = function (ms, zhFormat, showDay) {
            if (zhFormat === void 0) { zhFormat = false; }
            if (showDay === void 0) { showDay = false; }
            if (isNaN(ms) || ms <= 0)
                return "00:00";
            var sec = Math.floor(ms / 1000);
            var day = 0;
            var dayString = "";
            if (showDay) {
                day = Math.floor(sec / 3600 / 24);
                sec -= day * (24 * 3600);
                dayString = day + (zhFormat ? "天" : ":");
            }
            var hour = Math.floor(sec / 3600);
            sec -= hour * 3600;
            var min = Math.floor(sec / 60);
            sec -= min * 60;
            var hourString = this.formatTimeNumber(hour) + (zhFormat ? "小时" : ":");
            var minString = this.formatTimeNumber(min) + (zhFormat ? "分" : ":");
            var secString = this.formatTimeNumber(sec) + (zhFormat ? "秒" : "");
            return dayString + hourString + minString + secString;
        };
        NumberFormatter.formatTimeNumber = function (input) {
            return (input < 10) ? ("0" + input) : input.toString();
        };
        NumberFormatter.formatEngNumber = function (number) {
            var str;
            var num;
            number = number;
            if (number >= 1000000000) {
                num = number / 1000000000;
                str = (Math.floor(num / 0.01) * 0.01).toFixed(2);
                return NumberFormatter.formatEndingZero(str) + "b";
            }
            else if (number >= 1000000) {
                num = number / 1000000;
                str = (Math.floor(num / 0.01) * 0.01).toFixed(2);
                return NumberFormatter.formatEndingZero(str) + "m";
            }
            else if (number >= 1000) {
                num = number / 1000;
                str = (Math.floor(num / 0.01) * 0.01).toFixed(2);
                return NumberFormatter.formatEndingZero(str) + "k";
            }
            else {
                return number + "";
            }
        };
        NumberFormatter.formatEndingZero = function (c) {
            if (NumberFormatter.endWith(c, "00")) {
                return c.substring(0, c.length - 3);
            }
            else if (NumberFormatter.endWith(c, "0")) {
                return c.substring(0, c.length - 1);
            }
            return c;
        };
        NumberFormatter.endWith = function (c, suffix) {
            return (suffix == c.substring(c.length - suffix.length));
        };
        NumberFormatter.m_locale = "zh_CN";
        return NumberFormatter;
    }());
    TsEngine.NumberFormatter = NumberFormatter;
    __reflect(NumberFormatter.prototype, "TsEngine.NumberFormatter");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=NumberFormatter.js.map