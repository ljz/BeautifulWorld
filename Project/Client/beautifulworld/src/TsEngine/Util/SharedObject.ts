namespace TsEngine {
    export class SharedObject {
        private path: string;
        private mData: any;
        private static sharedMap: Object = {};
        constructor(path: string) {
            this.path = path;
            this.parseLocalData();
        }

        private parseLocalData(): void {
            this.mData = {};
            var result: string = egret.localStorage.getItem(this.path);
            if (result) {
                var resultArray: Array<string> = result.split(",");
                for (var i = 0; i < resultArray.length; i++) {
                    var keyValue: Array<string> = resultArray[i].split("|");
                    var valueType: any = keyValue[1];
                    var value: any = keyValue[2];
                    switch (valueType) {
                        case "n":
                            value = parseInt(value);
                            break;
                        case "b":
                            value = (value == "true");
                            break;
                    }
                    this.mData[keyValue[0]] = value;
                }
            }
        }

        public flush(): void {
            var result: string = "";
            for (var key in this.mData) {
                var value: any = this.mData[key];
                if (value != undefined) {
                    var valueType: string = (typeof value).substr(0, 1);
                    result += key + "|" + valueType + "|" + value + ",";
                }
            }
            result = result.substring(0, result.length - 1);
            egret.localStorage.setItem(this.path, result);
        }

        public clear(): void {
            egret.localStorage.removeItem(this.path);
        }

        public get data(): any {
            return this.mData;
        }

        public static getLocal(path: string): SharedObject {
            var obj: SharedObject = this.sharedMap[path];
            if (!obj) {
                obj = new SharedObject(path);
                this.sharedMap[path] = obj;
            }
            return obj;
        }

        public static clear(path: string = null): void {
            if (path) {
                this.getLocal(path).clear();
            } else {
                egret.localStorage.clear();
            }
        }
    }
}