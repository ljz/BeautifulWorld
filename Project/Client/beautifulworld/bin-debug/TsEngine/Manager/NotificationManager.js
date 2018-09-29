var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var NotificationManager = (function () {
        function NotificationManager() {
        }
        /**
         * 注册回调函数
         * @param message 消息名字
         * @param callback 回调函数
         */
        NotificationManager.add = function (message, callback, thisObject) {
            var callbacks = (this.notificationMap[message]) || (new Array());
            //过滤
            if (this.getCallBackIndex(callbacks, callback, thisObject) == -1) {
                callbacks.push({ func: callback, thisObject: thisObject });
                this.notificationMap[message] = callbacks;
            }
        };
        /**
         * 注册命令
         * @param message 消息名字
         * @param command 命令
         */
        NotificationManager.addCommand = function (message, command) {
            var commands = (this.notificationMap[message]) || (new Array());
            if (commands.indexOf(command) == -1) {
                commands.push(command);
                this.notificationMap[message] = commands;
            }
        };
        /**
         * 执行Notification
         * @param message 消息名字
         * @param contents 参数，可以无限多个
         */
        NotificationManager.dispatch = function (message) {
            var contents = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                contents[_i - 1] = arguments[_i];
            }
            this.dispatchByArray(message, contents);
        };
        /**
         * 执行Notification， 参数以数组形式传递。
         * @param message 消息名字
         * @param contents 参数，可以无限多个
         */
        NotificationManager.dispatchByArray = function (message, contents) {
            var observers = this.notificationMap[message];
            if (!observers) {
                return;
            }
            var length = observers.length;
            for (var i = 0; i < length; i++) {
                var obj = observers[i];
                if (obj) {
                    if (obj["execute"]) {
                        var command = obj;
                        command.execute();
                    }
                    else if (obj["func"]) {
                        var func = obj["func"];
                        if (func.length == 0) {
                            func.apply(obj["thisObject"]);
                        }
                        else {
                            func.apply(obj["thisObject"], contents);
                        }
                    }
                }
            }
        };
        /**
         * 移除 Callback，监听到message的时候不在处罚callback
         * @param message 消息名字
         * @param callback 回调
         */
        NotificationManager.remove = function (message, callback, thisObject) {
            if (!callback) {
                delete this.notificationMap[message];
            }
            else {
                var callbacks = this.notificationMap[message];
                if (callbacks) {
                    var index = this.getCallBackIndex(callbacks, callback, thisObject);
                    if (index >= 0) {
                        callbacks.splice(index, 1);
                        if (callbacks.length <= 0) {
                            delete this.notificationMap[message];
                        }
                    }
                }
            }
        };
        /**
         * 移除 Callback，监听到message的时候不在触发command
         * @param message 消息名字
         * @param command 回调命令
         */
        NotificationManager.removeCommand = function (message, command) {
            var commands = this.notificationMap[message];
            if (commands) {
                var index = commands.indexOf(command);
                if (index >= 0) {
                    commands.splice(index, 1);
                    if (commands.length <= 0) {
                        delete this.notificationMap[message];
                    }
                }
            }
        };
        NotificationManager.clear = function () {
            this.notificationMap = new Object();
        };
        /**
         *  调试 检查 Notification
         * 	指定message时 检查指定message触发的callback数
         *  否则 显示所有的 Notification
         * @param message 信息名字
         */
        NotificationManager.debug = function (message) {
            if (message === void 0) { message = null; }
            console.log('------------------NotificationObserver Dump---------------------');
            if (message) {
                if (this.notificationMap[message]) {
                    console.log(message + ': has ' + this.notificationMap[message].length + ' callbacks.');
                }
            }
            else {
                for (var j in this.notificationMap) {
                    console.log(j + ': has ' + this.notificationMap[j].length + ' callbacks.');
                }
            }
            console.log('--------------------------Dump End-----------------------------');
        };
        NotificationManager.getCallBackIndex = function (callBacks, callback, thisObject) {
            var len = callBacks.length;
            for (var i = 0; i < len; i++) {
                var callObj = callBacks[i];
                if ((callObj["func"] === callback) && (callObj["thisObject"] === thisObject)) {
                    return i;
                }
            }
            return -1;
        };
        NotificationManager.notificationMap = new Object(); // 通知载体map
        return NotificationManager;
    }());
    TsEngine.NotificationManager = NotificationManager;
    __reflect(NotificationManager.prototype, "TsEngine.NotificationManager");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=NotificationManager.js.map