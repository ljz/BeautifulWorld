
namespace TsEngine {
    export class NumberFormatter {
        private static m_locale: string = "zh_CN";

        public static set locale(value: string) {
            NumberFormatter.m_locale = value;
        }

        public static get locale(): string {
            return NumberFormatter.m_locale;
        }

        /**
         *格式化数字 
         * @param number             源数字
         * @param decimals            小数位
         * @param siStyle               点号千位分隔符            
         * @return 
         */
        public static format(number: any, decimals: number = 0, siStyle: boolean = false): string {
            var i: number = 0;
            var inc: number = Math.pow(10, decimals);
            var str: string = <string><any>(Math.round(inc * <number><any>number) / inc);
            var hasSep: boolean = str.indexOf(".") == -1, sep: number = hasSep ? str.length : str.indexOf(".");
            var ret: string = (hasSep && !decimals ? "" : (siStyle ? "," : ".")) + str.substr(sep + 1);
            if (decimals) {
                for (var j: number = 0; j <= decimals - (str.length - (hasSep ? sep - 1 : sep)); j++) ret += "0";
            }
            while (i + 3 < (str.substr(0, 1) == "-" ? sep - 1 : sep)) ret = (siStyle ? "." : ",") + str.substr(sep - (i += 3), 3) + ret;
            return str.substr(0, sep - i) + ret;
        }

        /**
         *格式化四舍五入 
         * @param number
         * @return 
         */
        public static formatRound(value: any): string {
            if (value == null)
                return "0";
            value = <number>value;
            if (NumberFormatter.locale == "en_US" || NumberFormatter.locale == "vi_VN") {
                return NumberFormatter.formatEngNumber(value);
            } else {
                var localeStrings: Array<any>;
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
        }

        /**
         *格式化时间 
         * @param ms              时间毫秒数
         * @param zhFormat    中文格式
         * @return 
         */
        public static formatTime(ms: number, zhFormat: boolean = false, showDay: boolean = false): string {
            if (isNaN(ms) || ms <= 0)
                return "00:00";
            let sec = Math.floor(ms / 1000);
            let day = 0;
            let dayString = "";
            if (showDay) {
                day = Math.floor(sec / 3600 / 24);
                sec -= day * (24 * 3600);
                dayString = day + (zhFormat ? "天" : ":");
            }
            let hour: number = Math.floor(sec / 3600);
            sec -= hour * 3600;
            let min: number = Math.floor(sec / 60);
            sec -= min * 60;
            let hourString = this.formatTimeNumber(hour) + (zhFormat ? "小时" : ":");
            let minString = this.formatTimeNumber(min) + (zhFormat ? "分" : ":");
            let secString = this.formatTimeNumber(sec) + (zhFormat ? "秒" : "");
            return dayString + hourString + minString + secString;
        }

        public static formatTimeNumber(input: number): string {
            return (input < 10) ? ("0" + input) : input.toString();
        }

        public static formatEngNumber(number: any): string {
            var str: string;
            var num: number;
            number = <number><any>number;

            if (number >= 1000000000) {
                num = number / 1000000000;
                str = (Math.floor(num / 0.01) * 0.01).toFixed(2);
                return NumberFormatter.formatEndingZero(str) + "b";
            } else if (number >= 1000000) {
                num = number / 1000000;
                str = (Math.floor(num / 0.01) * 0.01).toFixed(2);
                return NumberFormatter.formatEndingZero(str) + "m";
            } else if (number >= 1000) {
                num = number / 1000;
                str = (Math.floor(num / 0.01) * 0.01).toFixed(2);
                return NumberFormatter.formatEndingZero(str) + "k";
            } else {
                return number + "";
            }
        }

        private static formatEndingZero(c: string): string {
            if (NumberFormatter.endWith(c, "00")) {
                return c.substring(0, c.length - 3);
            } else if (NumberFormatter.endWith(c, "0")) {
                return c.substring(0, c.length - 1);
            }

            return c;
        }

        private static endWith(c: string, suffix: string): boolean {
            return (suffix == c.substring(c.length - suffix.length));
        }
    }
}