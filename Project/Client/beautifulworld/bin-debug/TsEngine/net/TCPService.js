var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @desc [description]
 * * tcp长链接服务,支持命令注册与自动回调执行
 * 支持自动重连
*/
var TsEngine;
(function (TsEngine) {
    var TCPService = (function () {
        /**
         * @param type           传输类型
         * @param retryMaxCount  重试最大次数(网络关闭后开始重试)
         * @param retryInterval  重试时间间隔
         */
        function TCPService(type, retryMaxCount, retryInterval) {
            if (type === void 0) { type = egret.WebSocket.TYPE_STRING; }
            if (retryMaxCount === void 0) { retryMaxCount = 3; }
            if (retryInterval === void 0) { retryInterval = 5000; }
            this.handleMap = new Object();
            this.retryInterval = 5000;
            this.retryMaxCount = 3;
            this.retryCount = 0;
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
        TCPService.prototype.connectByUrl = function (url, sign, reset) {
            if (reset === void 0) { reset = true; }
            this.url = url;
            this.sign = sign;
            if (!this.socket.connected) {
                console.log("TCPService connect:" + url);
                reset && this.reset();
                this.socket.connectByUrl(url);
            }
        };
        //关闭连接
        TCPService.prototype.close = function () {
            if (this.socket.connected) {
                console.log("TCPService close");
                this.socket.close();
            }
        };
        /**
         * 发送通信包
         * @param	cmd
         * @param	body
         */
        TCPService.prototype.sendPackage = function (cmd, body) {
            if (!this.connected) {
                console.log("TCPService not connect Send:" + cmd);
                return;
            }
        };
        Object.defineProperty(TCPService.prototype, "connected", {
            //是否连接状态
            get: function () {
                return this.socket.connected;
            },
            enumerable: true,
            configurable: true
        });
        //可覆写方法
        TCPService.prototype.onOpen = function () { };
        TCPService.prototype.onData = function (action, data) { };
        TCPService.prototype.onClose = function () { };
        TCPService.prototype.onError = function () { };
        /**
         * 注册handler
         * @param	cmd
         * @param	handle
         */
        TCPService.prototype.registerHandler = function (type, handle) {
            if (handle == null)
                return;
            if (type in this.handleMap) {
                console.warn("TCPService " + type + " has already registed");
            }
            this.handleMap[type] = handle;
        };
        /**
         * 取消
         * @param	cmd
         */
        TCPService.prototype.unRegisterHandler = function (type) {
            if (type in this.handleMap) {
                delete this.handleMap[type];
            }
            else {
                console.error("TCPService Cannot find the type: " + type);
            }
        };
        //注册消息接收器
        TCPService.prototype.registerReciever = function (reciever) {
            var dic = reciever.collectObservers();
            for (var key in dic) {
                this.registerHandler(key, dic[key]);
            }
        };
        //移除消息注册器
        TCPService.prototype.removeReciver = function (reciever) {
            var dic = reciever.collectObservers();
            for (var key in dic) {
                this.unRegisterHandler(key);
            }
        };
        /**
         * 执行handler
         * @param	cmd
         * @param	content
         */
        TCPService.prototype.excuteHandler = function (type, content) {
            console.log("TCPService Recived cmd: " + type);
            if (type in this.handleMap) {
                var handler = this.handleMap[type];
                handler.func.call(handler.obj, content);
                return true;
            }
            else {
                console.warn(this, "TCPService No handle was found for type: " + type);
            }
            return false;
        };
        //私有方法
        TCPService.prototype.onOpenSocket = function (e) {
            console.log("TCPService onOpenSocket");
            if (this.sign) {
                this.socket.writeUTF(this.sign);
            }
            this.reset();
            this.onOpen();
        };
        TCPService.prototype.onCloseSocket = function (e) {
            console.log("TCPService onClose");
            this.onClose();
            if (this.retryCount < this.retryMaxCount) {
                this.retry();
            }
        };
        TCPService.prototype.onDataSocket = function (e) {
            var data = JSON.parse(this.socket.readUTF());
            this.excuteHandler(data.action, data);
            this.onData(data.action, data);
        };
        TCPService.prototype.onIoErrorSocket = function (e) {
            console.log("TCPService onIoError");
            this.onError();
        };
        TCPService.prototype.retry = function () {
            if (this.timer == null) {
                this.timer = new egret.Timer(this.retryInterval);
                this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                    this.retryCount++;
                    this.connectByUrl(this.url, this.sign, false);
                }, this);
            }
            this.timer.reset();
            this.timer.start();
        };
        TCPService.prototype.reset = function () {
            this.retryCount = 0;
            if (this.timer != null) {
                this.timer.stop();
            }
        };
        return TCPService;
    }());
    TsEngine.TCPService = TCPService;
    __reflect(TCPService.prototype, "TsEngine.TCPService");
    //消息接收器
    var AbstractMessageReceiver = (function () {
        function AbstractMessageReceiver() {
            this.cmdObservers = new Object; //命令字典
            this.hasCollected = false;
        }
        /**获取命令观察列表**/
        AbstractMessageReceiver.prototype.collectObservers = function () {
            if (!this.hasCollected) {
                this.registObservers();
                this.hasCollected = true;
            }
            return this.cmdObservers;
        };
        /**注册命令列表**/
        AbstractMessageReceiver.prototype.registObservers = function () {
            throw new Error("collectObservers must be implemented by subclass");
        };
        /**
         * 注册命令及对应处理函数
         * @param	cmd
         * @param	excuter
         */
        AbstractMessageReceiver.prototype.register = function (cmd, excuter, thisObj) {
            if (cmd in this.cmdObservers) {
                egret.log("Warning  " + cmd + " has already been registed");
            }
            if (excuter == null) {
                throw new Error("Cannot registe a null hanlder");
            }
            this.cmdObservers[cmd] = { func: excuter, obj: thisObj };
        };
        return AbstractMessageReceiver;
    }());
    TsEngine.AbstractMessageReceiver = AbstractMessageReceiver;
    __reflect(AbstractMessageReceiver.prototype, "TsEngine.AbstractMessageReceiver");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=TCPService.js.map