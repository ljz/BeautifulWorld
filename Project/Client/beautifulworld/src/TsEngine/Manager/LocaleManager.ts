
namespace TsEngine {
    export class LocaleManager {
        private static langMap: any;
        public static set lang(lang: any) {
            LocaleManager.langMap = lang;
        }

        /**
         *获取多语言 
         * @param key
         * @param force  为ture则找不到会报错。
         * @return 
         * 
         */
        public static getString(key: string, force: boolean = false): string {
            if (!LocaleManager.langMap) {
                if (!force)
                    return '';
                throw new Error("Locale hasn't been initialized!")
            }

            var obj = LocaleManager.langMap;
            var keys: string[] = key.split(".");
            for (var i = 0; i < keys.length; i++) {
                var oneKey: string = keys[i]
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
        }
    }
}