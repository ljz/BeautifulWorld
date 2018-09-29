var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        /**
         * 寻找字符串中是否存在某字符串
         * @param	sourceStr
         * @param	checkStr
         * @return
         */
        StringUtil.existString = function (sourceStr, checkStr) {
            if (sourceStr == null)
                return false;
            var myPattern = new RegExp(checkStr, "i");
            return sourceStr.match(myPattern) != null;
        };
        /**
         * 脏话过滤
         * @param	str   源字符
         * @param	rep   替换字符
         * @return        过滤后的字符
         */
        StringUtil.strFilter = function (str, rep) {
            if (rep === void 0) { rep = null; }
            var myPattern;
            if (rep) {
                myPattern = /fuck|操|this.cao|傻逼|屄|this.sb|日|this.ri|骚|this.sao|激情|脱|this.tuo|贱|this.jianren|妈的|傻逼|騷|脫|賤|媽的/gi;
                return str.replace(myPattern, rep);
            }
            else {
                myPattern = /fuck|操|this.cao|傻逼|屄|this.sb|日|this.ri|骚|this.sao|激情|脱|this.tuo|贱|this.jianren|妈的|傻逼|騷|脫|賤|媽的/i;
                if (str.match(myPattern) != null) {
                    return "包含非法字符!";
                }
                else {
                    return str;
                }
            }
        };
        /**
         * 字符全排列
         * 来源:http://flash.9ria.com/thread-41115-1-2.html
         * @param	target
         * @param	result
         */
        StringUtil.prototype.runPerm = function (target, result) {
            if (result === void 0) { result = ""; }
            var _list = [];
            for (var i = 0; i < target.length; i++) {
                var str = target.charAt(target.length - 1) + target;
                target = str.substr(0, str.length - 1);
                if (target.length == 2)
                    _list.push(target + result);
                str = target.substr(1);
                this.runPerm(str, result + target.charAt(0));
            }
            return _list;
        };
        /**
         * 获取中英文字符真实字符长度
         * @param	Str
         * @return
         */
        StringUtil.getStringLen = function (Str) {
            var n = 0;
            var len = Str.length;
            for (var i = 0; i < len; i++) {
                if (Str.charCodeAt(i) < 0 || Str.charCodeAt(i) > 255) {
                    n += 2;
                }
                else {
                    n++;
                }
            }
            return n;
        };
        /**
         * 截取前Len个字符  后面省略号代替
         * @param	Str1   源字符
         * @param	Len    保留长度(英文单位)
         * @param	Str2   超过长度字符的代替符号
         * @return
         */
        StringUtil.getCutString = function (Str1, Len, Str2) {
            if (Str2 === void 0) { Str2 = "..."; }
            var n = 0;
            var k = 0;
            for (var i = 0; n < Len; i++) {
                if (Str1.charCodeAt(i) < 0 || Str1.charCodeAt(i) > 255) {
                    n += 2;
                    if (n > Len) {
                        k--;
                    }
                }
                else {
                    n++;
                }
                k++;
            }
            var Str3 = Str1.substring(0, k);
            if (Str3 == Str1) {
                return Str1;
            }
            else {
                return Str3 + Str2;
            }
        };
        /**
         * 去掉文本多余的空白(如输入文本多行状态输入的文本打印出来会多出一行空白，可用此方法也可设置成单行模式)
         * @param	string
         * @param	stripTabs
         * @param	stripReturns
         * @param	stripNewLines
         * @param	compressSpaces
         * @return
         */
        StringUtil.stripWhitespace = function (string, stripTabs, stripReturns, stripNewLines, compressSpaces) {
            if (stripTabs === void 0) { stripTabs = true; }
            if (stripReturns === void 0) { stripReturns = true; }
            if (stripNewLines === void 0) { stripNewLines = true; }
            if (compressSpaces === void 0) { compressSpaces = true; }
            var result = string;
            var resultArray;
            if (stripTabs) {
                result = result.split("\t").join(" ");
            }
            if (stripReturns) {
                result = result.split("\r").join(" ");
            }
            if (stripNewLines) {
                result = result.split("\n").join(" ");
            }
            if (compressSpaces) {
                resultArray = result.split(" ");
                for (var idx = 0; idx < resultArray.length; idx++) {
                    if (resultArray[idx] == "") {
                        resultArray.splice(idx, 1);
                        idx--;
                    }
                }
                result = resultArray.join(" ");
            }
            return result;
        };
        /**
         * http://bbs.9ria.com/thread-204708-1-1.html
         *  使用传入的各个参数替换指定的字符串内的 <code>{n}</code> 标记。
         *
         *  @param str  - 用来进行替换的源字符串。
         *  @param rest  - 可在 str 参数中的每个 <code>{n}</code> 位置被替换的值。
         *  如果第一个参数是一个数组，则该数组将用作参数列表。若第一个参数为数据对象，则会进行全局替换，否则为顺序替换。
         *
         *  <p>源字符串可包含 <code>{n}</code> 形式的特殊标记，其中 n 为任意标识符（由字母、数字、下划线组成），
         *  它将被替换成具体的值。</p>
         *  <p>因为允许 rest 第一个参数为数组，因此允许在其它想要使用... rest 参数的方法中重复使用此例程。
         *  @return 使用指定的各个参数替换了所有 <code>{n}</code> 标记的新字符串。
         *
         * eg.
         * trace( StringUtil.substitute( "您确定要花费{money}金币，来购买{amount}个红瓶吗？", 100, 5 ));
         trace( StringUtil.substitute( "{name}公会全体成员完成公会任务，奖励{name}公会所有成员{money}金币和{exp}经验。", { name: "天地会", money: 100, exp: 2000 }));
         */
        StringUtil.substitute = function (str) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            if (str == null || str == "")
                return "";
            var lng = 0; // 最终需要计算替换的次数
            var args; // 最终需要替换的数据
            var i = 0;
            switch (typeof (rest[0])) {
                case "number":
                case "boolean":
                case "string": {
                    lng = rest.length;
                    args = rest;
                    for (i = 0; i < lng; i++) {
                        str = str.replace(new RegExp("\\{" + i + "\\}", "gm"), args[i]);
                    }
                    break;
                }
                case "object": {
                    if (rest[0] instanceof Array) {
                        args = rest[0];
                        lng = args.length;
                        for (i = 0; i < lng; i++) {
                            str = str.replace(new RegExp("\\{" + i + "\\}", "gm"), args[i]);
                        }
                    }
                    else {
                        var reg;
                        for (var prop in rest[0]) {
                            reg = new RegExp("\{" + prop + "\}", "ig");
                            str = str.replace(reg, rest[0][prop]);
                        }
                    }
                    break;
                }
            }
            return str;
        };
        /**
         * 创建一个HTML字符
         * @param	a_text
         * @param	a_color
         * @param	a_size
         * @param	a_font
         * @return
         */
        StringUtil.createHtmlText = function (a_text, a_color, a_size, a_font) {
            if (a_color === void 0) { a_color = "#ff6600"; }
            if (a_size === void 0) { a_size = 12; }
            if (a_font === void 0) { a_font = "Arial"; }
            a_color = a_color.substr(0, 1) == "#" ? a_color : "#" + a_color.substr(2);
            return "<font color='" + a_color + "' size='" + a_size + "' font='" + a_font + "' >" + a_text + "</font>";
        };
        //增加超文本链接
        StringUtil.createTextLink = function (text, linkName) {
            return "<a href='event:" + linkName + "'><u>" + text + "</u></a>";
        };
        //是否为数字
        StringUtil.isNumber = function (text) {
            var pattern = new RegExp("[^0-9]");
            return !text.match(pattern);
        };
        //截取固定长度文本，以...结尾
        StringUtil.substring = function (str, num) {
            if (num >= str.length) {
                return str;
            }
            return str.substring(0, num) + "...";
        };
        return StringUtil;
    }());
    TsEngine.StringUtil = StringUtil;
    __reflect(StringUtil.prototype, "TsEngine.StringUtil");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=StringUtil.js.map