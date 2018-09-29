var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TsEngine;
(function (TsEngine) {
    var QueueCommand = (function (_super) {
        __extends(QueueCommand, _super);
        function QueueCommand(name) {
            if (name === void 0) { name = null; }
            var _this = _super.call(this) || this;
            //总步骤数
            _this.stepCount = 0;
            //已完成到步骤索引
            _this.doneStep = -1;
            _this.queueName = "QueueCommand";
            _this.queueName = name || _this.queueName;
            _this.queues = new TsEngine.HashMap();
            //注册回调
            TsEngine.NotificationManager.add(_this.queueName, _this.execute, _this);
            return _this;
        }
        /**
         * 添加命令
         * @param	command   命令
         * @param	step      指定步骤索引,一般省略
         */
        QueueCommand.prototype.addCommand = function (command, step) {
            if (step === void 0) { step = -1; }
            var index = (step == -1) ? this.queues.length : step;
            this.queues.put(index, command);
            //记录总步骤数
            this.stepCount = this.queues.length;
            //分配命令一个步骤索引
            command.step = index;
        };
        Object.defineProperty(QueueCommand.prototype, "progress", {
            /**
             * 获取执行进度
             */
            get: function () {
                return (this.stepCount - this.queues.length) / this.stepCount;
            },
            enumerable: true,
            configurable: true
        });
        QueueCommand.prototype.onProgress = function (value) {
        };
        //执行
        QueueCommand.prototype.execute = function () {
            this.onProgress(this.progress);
            //已完成返回
            if (this.queues.length < 1) {
                TsEngine.NotificationManager.remove(this.queueName, this.execute, this);
                this.isRunning = false;
                this.done();
                return;
            }
            //繼續
            this.isRunning = true;
            this.doNextCommand();
        };
        //暂停
        QueueCommand.prototype.pause = function () {
            this.isRunning = false;
        };
        //恢复运行
        QueueCommand.prototype.resume = function (run) {
            if (run === void 0) { run = true; }
            this.isRunning = true;
            if (run)
                this.execute();
        };
        //取消
        QueueCommand.prototype.cancel = function () {
            this.queues.clear();
            TsEngine.NotificationManager.remove(this.queueName, null, this);
            this.done();
        };
        //执行下一个
        QueueCommand.prototype.doNextCommand = function () {
            //继续执行
            if (this.queues.length > 0) {
                var command = this.getNextCommand(this.doneStep);
                if (command) {
                    command.execute();
                    //记录当前正在执行的步骤索引
                    this.doneStep = Math.max(command.step, this.doneStep);
                    this.queues.remove(this.doneStep);
                }
                else {
                    console.log("doNextCommand: step超出索引范围!");
                }
            }
        };
        /**
         * 获取下一个命令
         * @param	curStep
         * @return
         */
        QueueCommand.prototype.getNextCommand = function (curStep) {
            if (curStep === void 0) { curStep = 0; }
            var step = -1;
            for (var i in this.queues.content) {
                var index = parseInt(i);
                if ((index > curStep) && ((index < step) || (step == -1))) {
                    step = index;
                }
            }
            return this.queues.getValue(step);
        };
        /**
         * 执行结束
         */
        QueueCommand.prototype.done = function () {
        };
        return QueueCommand;
    }(TsEngine.Command));
    TsEngine.QueueCommand = QueueCommand;
    __reflect(QueueCommand.prototype, "TsEngine.QueueCommand");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=QueueCommand.js.map