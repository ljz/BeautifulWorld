namespace TsEngine {
    export class Log {
        private static mShowLog: boolean = false;
        public static showLog(value: boolean): void {
            this.mShowLog = value;
        }

        public static log(target: Object, ...rest): void {
            if (this.mShowLog)
                egret.log(this.getMessage(target, rest));
        }

        public static warn(target: Object, ...rest): void {
            if (this.mShowLog)
                egret.warn(this.getMessage(target, rest));
        }

        public static error(target: Object, ...rest): void {
            if (this.mShowLog)
                egret.error(this.getMessage(target, rest));
        }

        private static getMessage(target: Object, ...rest): string {
            if (!this.mShowLog) return;
            var className: string = (!target || typeof target === "string") ? (<string>target || "") : "[" + egret.getQualifiedClassName(target) + "] ";
            var date: Date = new Date();
            var dateInfo: string = date.getHours() + ":" + date.getMinutes() + ":" + date.getMilliseconds() + " ";
            var info: string = "";
            for (var i = 0; i < rest.length; i++) {
                var str: string = rest[i];
                if (str == null) {
                    continue;
                }
                info += str;
            }
            var message: string = dateInfo + className + info;
            return message;
        }
    }
}