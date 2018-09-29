namespace TsEngine {
    export class HashMap {

        private mLength: number = 0;
        public content: Object;

        constructor() {
            this.mLength = 0;
            this.content = new Object();
        }

        //-------------------公共方法--------------------

        /**
         * 返回长度
         */
        public get length(): number {
            return this.mLength;
        }

        /**
         * 返回是否为空
         */
        public isEmpty(): boolean {
            return (this.mLength == 0);
        }

        /**
         * 返回所有键
         */
        public keys(): Array<any> {
            var temp: Array<any> = new Array<any>(this.mLength);
            var index: number = 0;
            for (var i in this.content) {
                temp[index] = i;
                index++;
            }
            return temp;
        }

        /**
       * 函数执行每一个键
       * @param 函数
       */
        public eachKey(func: Function, thisObject: any): void {
            for (var i in this.content) {
                func.call(thisObject, i);
            }
        }

        /**
       * 函数执行每一个值
       * @param 函数
       */
        public eachValue(func: Function, thisObject: any): void {
            for (var i in this.content) {
                var value: any = this.content[i];
                func.call(thisObject, value);
            }
        }

        /**
         * 数组形式返回map内容
         */
        public values(): Array<any> {
            var temp: Array<any> = new Array<any>(this.mLength);
            var index: number = 0;
            for (var i in this.content) {
                temp[index] = this.content[i];
                index++;
            }
            return temp;
        }

        /**
         * 检查是否存在某值
         */
        public containsValue(value: any): boolean {

            for (var i in this.content) {
                var result: any = this.content[i];
                if (result === value) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 检查是否存在某键
         */
        public containsKey(key: any): boolean {
            key = this.generateKey(key);
            if (this.content[key] != undefined) {
                return true;
            }
            return false;
        }

        /**
       * 获取键值
       */
        public getValue(key: any): any {
            key = this.generateKey(key);
            var value: any = this.content[key];
            if (value !== undefined) {
                return value;
            }
            return null;
        }

        /**
       * 加入元素
     * 新值替换旧值；空则删；返回旧值
         */
        public put(key: any, value: any): any {
            key = this.generateKey(key);
            if (key == null) {
                throw new Error("cannot put a value with undefined or null key!");
            } else if (value == null) {
                return this.remove(key);
            } else {
                var exist: boolean = this.containsKey(key);
                if (!exist) {
                    this.mLength++;
                }
                this.content[key] = value;
                return value;
            }
        }

        /**
     * 移除键及内容
         */
        public remove(key: any): any {
            key = this.generateKey(key);
            var exist: boolean = this.containsKey(key);
            if (!exist) {
                return null;
            }
            var temp: any = this.content[key];
            this.content[key] = null;
            delete this.content[key];
            this.mLength--;
            return temp;
        }

        /**
       * 清除所有
       */
        public clear(): void {
            this.mLength = 0;
            this.content = new Object();
        }

        /**
       * 克隆
       */
        public clone(): HashMap {
            var temp: HashMap = new HashMap();
            for (var i in this.content) {
                temp.put(i, this.content[i]);
            }
            return temp;
        }

        /**
     * 打印字符串形式
     * @return
     */
        public toString(): string {
            var ks: Array<any> = this.keys();
            var vs: Array<any> = this.values();
            var temp: string = "HashMap Content:\n";
            for (var i: number = 0; i < ks.length; i++) {
                temp += ks[i] + " -> " + vs[i] + "\n";
            }
            return temp;
        }


        /**
        * 生成每个物品唯一key
        * @return
        */
        private static id: number = 0;
        private generateKey(key: any): any {
            if (key && typeof key != "string" && typeof key != "number") {
                if (key._hashtableUniqueId == undefined) {
                    key._hashtableUniqueId = "___HID___" + (HashMap.id++);
                }
                key = key._hashtableUniqueId;
            }

            return key;
        }
    }
}