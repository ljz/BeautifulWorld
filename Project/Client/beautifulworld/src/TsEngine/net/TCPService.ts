/**
 * @desc [description]
 * * tcp长链接服务,支持命令注册与自动回调执行
 * 支持自动重连
*/
namespace TsEngine {
    export class TCPService {
        private socket: egret.WebSocket;
        private handleMap: Object = new Object();
        private retryInterval = 5000;
        private retryMaxCount = 3;
        private retryCount = 0;
        private timer: egret.Timer;
        private url: string;
        private sign: string;

        /**
         * @param type           传输类型
         * @param retryMaxCount  重试最大次数(网络关闭后开始重试)
         * @param retryInterval  重试时间间隔
         */
        constructor(type: string = egret.WebSocket.TYPE_STRING, retryMaxCount = 3, retryInterval = 5000) {
            this.socket = new egret.WebSocket();
            this.socket.type = type;
            this.retryMaxCount = retryMaxCount;
            this.retryInterval = retryInterval;
            this.socket.addEventListener(egret.Event.CONNECT, this.onOpenSocket, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onDataSocket, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onCloseSocket, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIoErrorSocket, this);
        }

        //连接服务器
        public connectByUrl(url: string, sign?: string, reset: boolean = true) {
            this.url = url;
            this.sign = sign;
            if (!this.socket.connected) {
                console.log("TCPService connect:" + url);
                reset && this.reset();
                this.socket.connectByUrl(url);
            }
        }

        //关闭连接
        public close(): void {
            if (this.socket.connected) {
                console.log("TCPService close");
                this.socket.close();
            }
        }

        /**
         * 发送通信包
         * @param	cmd
         * @param	body
         */
        public sendPackage(cmd: number, body: string): void {
            if (!this.connected) {
                console.log("TCPService not connect Send:" + cmd);
                return;
            }
        }

        //是否连接状态
        public get connected(): boolean {
            return this.socket.connected;
        }

        //可覆写方法
        protected onOpen(): void { }

        protected onData(action: string, data: any): void { }

        protected onClose(): void { }

        protected onError(): void { }

        /**
         * 注册handler
         * @param	cmd
         * @param	handle
         */
        public registerHandler(type: any, handle: Function): void {
            if (handle == null)
                return;

            if (type in this.handleMap) {
                console.warn("TCPService " + type + " has already registed");
            }
            this.handleMap[type] = handle;
        }

        /**
         * 取消
         * @param	cmd
         */
        public unRegisterHandler(type: any): void {
            if (type in this.handleMap) {
                delete this.handleMap[type];
            }
            else {
                console.error("TCPService Cannot find the type: " + type);
            }
        }

        //注册消息接收器
        public registerReciever(reciever: AbstractMessageReceiver): void {
            var dic: any = reciever.collectObservers();
            for (var key in dic) {
                this.registerHandler(key, dic[key]);
            }
        }

        //移除消息注册器
        public removeReciver(reciever: AbstractMessageReceiver): void {
            var dic: any = reciever.collectObservers();
            for (var key in dic) {
                this.unRegisterHandler(key);
            }
        }

        /**
         * 执行handler
         * @param	cmd
         * @param	content
         */
        private excuteHandler(type: any, content: any): boolean {
            console.log("TCPService Recived cmd: " + type);

            if (type in this.handleMap) {
                let handler = this.handleMap[type];
                handler.func.call(handler.obj, content);
                return true;
            }
            else {
                console.warn(this, "TCPService No handle was found for type: " + type);
            }
            return false;
        }

        //私有方法
        private onOpenSocket(e: egret.Event): void {
            console.log("TCPService onOpenSocket");
            if (this.sign) {
                this.socket.writeUTF(this.sign);
            }
            this.reset();
            this.onOpen();
        }

        private onCloseSocket(e: egret.Event): void {
            console.log("TCPService onClose");
            this.onClose();
            if (this.retryCount < this.retryMaxCount) {
                this.retry();
            }
        }

        private onDataSocket(e: egret.Event): void {
            var data = JSON.parse(this.socket.readUTF());
            this.excuteHandler(data.action, data);
            this.onData(data.action, data);
        }

        private onIoErrorSocket(e: egret.Event): void {
            console.log("TCPService onIoError");
            this.onError();
        }

        private retry(): void {
            if (this.timer == null) {
                this.timer = new egret.Timer(this.retryInterval);
                this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                    this.retryCount++;
                    this.connectByUrl(this.url, this.sign, false);
                }, this);
            }
            this.timer.reset();
            this.timer.start();
        }

        private reset(): void {
            this.retryCount = 0;
            if (this.timer != null) { this.timer.stop(); }
        }
    }

    //消息接收器
    export class AbstractMessageReceiver {
        private cmdObservers: any = new Object;//命令字典
        private hasCollected: boolean = false;

        /**获取命令观察列表**/
        public collectObservers(): any {
            if (!this.hasCollected) {
                this.registObservers();
                this.hasCollected = true;
            }
            return this.cmdObservers;
        }

        /**注册命令列表**/
        public registObservers(): void {
            throw new Error("collectObservers must be implemented by subclass");
        }

        /**
         * 注册命令及对应处理函数
         * @param	cmd
         * @param	excuter
         */
        public register(cmd: number, excuter: Function, thisObj?: any): void {
            if (cmd in this.cmdObservers) {
                egret.log("Warning  " + cmd + " has already been registed");
            }
            if (excuter == null) {
                throw new Error("Cannot registe a null hanlder")
            }
            this.cmdObservers[cmd] = { func: excuter, obj: thisObj };
        }
    }
}
