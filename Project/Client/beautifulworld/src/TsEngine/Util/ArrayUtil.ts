namespace TsEngine {
    export class ArrayConstant {
        static CASEINSENSITIVE: number = 1;
        static DESCENDING: number = 2;
        static UNIQUESORT: number = 4;
        static RETURNINDEXEDARRAY: number = 8;
        static NUMERIC: number = 16;
    }

    export class ArrayUtil {
        public static dup_fn(array: Array<any>, field, field_options): any {
            var filtered = (field_options & ArrayConstant.NUMERIC)
                ? array.map(function (item) { return item[field].toFloat(); })
                : (field_options & ArrayConstant.CASEINSENSITIVE)
                    ? array.map(function (item) { return item[field].toLowerCase(); })
                    : array.map(function (item) { return item[field]; });

            return filtered.length !== ArrayUtil.combine([], filtered).length;
        }

        public static sort_fn(item_a, item_b, fields, options): any {
            return (function sort_by(fields, options) {
                var ret, a, b,
                    opts = options[0],
                    sub_fields = fields[0].match(/[^.]+/g);

                (function get_values(s_fields, s_a, s_b) {
                    var field = s_fields[0];
                    if (s_fields.length > 1) {
                        get_values(s_fields.slice(1), s_a[field], s_b[field]);
                    } else {
                        a = s_a[field].toString();
                        b = s_b[field].toString();
                    }
                })(sub_fields, item_a, item_b);

                if (opts & ArrayConstant.NUMERIC) {
                    ret = (parseFloat(a) - parseFloat(b));
                } else {
                    if (opts & ArrayConstant.CASEINSENSITIVE) { a = a.toLowerCase(); b = b.toLowerCase(); }

                    ret = (a > b) ? 1 : (a < b) ? -1 : 0;
                }

                if ((ret === 0) && (fields.length > 1)) {
                    ret = sort_by(fields.slice(1), options.slice(1));
                } else if (opts & ArrayConstant.DESCENDING) {
                    ret *= -1;
                }

                return ret;
            })(fields, options);
        }

        public static combine(array: Array<any>, c): Array<any> {
            for (var b = 0, a = c.length; b < a; b++) {
                ArrayUtil.include(array, c[b]);
            }
            return array;
        }

        public static include(array: Array<any>, a): Array<any> {
            if (!ArrayUtil.contains(array, a)) {
                array.push(a);
            }
            return array;
        }

        public static contains(array: Array<any>, obj): boolean {
            var i = array.length;
            while (i--) {
                if (array[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        public static sortOn(array, fields, options) {
            fields = Array.isArray(fields) ? fields : [fields];
            options = Array.isArray(options) ? options : [options];

            if (options.length !== fields.length) {
                Log.error("ArrayUtil sortOn fields,options�������Ȳ�һ��!");
                options = [];
            }

            if ((options[0] & ArrayConstant.UNIQUESORT) && (fields.some(function (field, i) { return ArrayUtil.dup_fn(array, field, options[i]); }))) return 0;

            var curry_sort = function (item_a, item_b) {
                return ArrayUtil.sort_fn(item_a, item_b, fields, options);
            };

            if (options[0] & ArrayConstant.RETURNINDEXEDARRAY)
                return array.slice().sort(curry_sort);
            else
                return array.sort(curry_sort);

        }
    }

}