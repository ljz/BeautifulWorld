var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var ArrayConstant = (function () {
        function ArrayConstant() {
        }
        ArrayConstant.CASEINSENSITIVE = 1;
        ArrayConstant.DESCENDING = 2;
        ArrayConstant.UNIQUESORT = 4;
        ArrayConstant.RETURNINDEXEDARRAY = 8;
        ArrayConstant.NUMERIC = 16;
        return ArrayConstant;
    }());
    TsEngine.ArrayConstant = ArrayConstant;
    __reflect(ArrayConstant.prototype, "TsEngine.ArrayConstant");
    var ArrayUtil = (function () {
        function ArrayUtil() {
        }
        ArrayUtil.dup_fn = function (array, field, field_options) {
            var filtered = (field_options & ArrayConstant.NUMERIC)
                ? array.map(function (item) { return item[field].toFloat(); })
                : (field_options & ArrayConstant.CASEINSENSITIVE)
                    ? array.map(function (item) { return item[field].toLowerCase(); })
                    : array.map(function (item) { return item[field]; });
            return filtered.length !== ArrayUtil.combine([], filtered).length;
        };
        ArrayUtil.sort_fn = function (item_a, item_b, fields, options) {
            return (function sort_by(fields, options) {
                var ret, a, b, opts = options[0], sub_fields = fields[0].match(/[^.]+/g);
                (function get_values(s_fields, s_a, s_b) {
                    var field = s_fields[0];
                    if (s_fields.length > 1) {
                        get_values(s_fields.slice(1), s_a[field], s_b[field]);
                    }
                    else {
                        a = s_a[field].toString();
                        b = s_b[field].toString();
                    }
                })(sub_fields, item_a, item_b);
                if (opts & ArrayConstant.NUMERIC) {
                    ret = (parseFloat(a) - parseFloat(b));
                }
                else {
                    if (opts & ArrayConstant.CASEINSENSITIVE) {
                        a = a.toLowerCase();
                        b = b.toLowerCase();
                    }
                    ret = (a > b) ? 1 : (a < b) ? -1 : 0;
                }
                if ((ret === 0) && (fields.length > 1)) {
                    ret = sort_by(fields.slice(1), options.slice(1));
                }
                else if (opts & ArrayConstant.DESCENDING) {
                    ret *= -1;
                }
                return ret;
            })(fields, options);
        };
        ArrayUtil.combine = function (array, c) {
            for (var b = 0, a = c.length; b < a; b++) {
                ArrayUtil.include(array, c[b]);
            }
            return array;
        };
        ArrayUtil.include = function (array, a) {
            if (!ArrayUtil.contains(array, a)) {
                array.push(a);
            }
            return array;
        };
        ArrayUtil.contains = function (array, obj) {
            var i = array.length;
            while (i--) {
                if (array[i] === obj) {
                    return true;
                }
            }
            return false;
        };
        ArrayUtil.sortOn = function (array, fields, options) {
            fields = Array.isArray(fields) ? fields : [fields];
            options = Array.isArray(options) ? options : [options];
            if (options.length !== fields.length) {
                TsEngine.Log.error("ArrayUtil sortOn fields,options�������Ȳ�һ��!");
                options = [];
            }
            if ((options[0] & ArrayConstant.UNIQUESORT) && (fields.some(function (field, i) { return ArrayUtil.dup_fn(array, field, options[i]); })))
                return 0;
            var curry_sort = function (item_a, item_b) {
                return ArrayUtil.sort_fn(item_a, item_b, fields, options);
            };
            if (options[0] & ArrayConstant.RETURNINDEXEDARRAY)
                return array.slice().sort(curry_sort);
            else
                return array.sort(curry_sort);
        };
        return ArrayUtil;
    }());
    TsEngine.ArrayUtil = ArrayUtil;
    __reflect(ArrayUtil.prototype, "TsEngine.ArrayUtil");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=ArrayUtil.js.map