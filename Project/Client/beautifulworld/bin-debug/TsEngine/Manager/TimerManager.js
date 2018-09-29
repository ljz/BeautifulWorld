var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var TimerManager = (function () {
        function TimerManager() {
        }
        /**
         * 添加时钟
         * @param clockID            时钟ID[int或字符串]
         * @param seconds          剩余秒数
         * @param updateDelay    更新频率时间[毫秒为单位]
         * @param repeatCount    重复次数
         * @param totalSeconds   总秒数[默认等于seconds剩余秒数]
         * @param speedFactor    时间速度系数[用于加速减速]
         * @return
         */
        TimerManager.addClock = function (clockID, seconds, updateDelay, repeatCount, totalSeconds, speedFactor) {
            if (seconds === void 0) { seconds = 0; }
            if (updateDelay === void 0) { updateDelay = 1000; }
            if (repeatCount === void 0) { repeatCount = 1; }
            if (totalSeconds === void 0) { totalSeconds = -1; }
            if (speedFactor === void 0) { speedFactor = 1; }
            var clock = TimerManager.getClock(clockID);
            if (clock == null) {
                updateDelay = Math.min(seconds * 1000, updateDelay);
                clock = new TimerClock(clockID, updateDelay);
                TimerManager.clockMap[clockID] = clock;
            }
            if (seconds >= 0) {
                TimerManager.start();
                clock.start(seconds, repeatCount, totalSeconds, speedFactor);
            }
            else {
                throw new Error("[TimerManager]addClock seconds不允许小于0.");
            }
            return clock;
        };
        //移除时钟
        TimerManager.removeClock = function (clockID) {
            if (TimerManager.clockMap[clockID]) {
                TimerManager.getClock(clockID).stop();
                delete TimerManager.clockMap[clockID];
            }
        };
        //获取时钟
        TimerManager.getClock = function (clockID, autoCreate) {
            if (autoCreate === void 0) { autoCreate = false; }
            var clock = TimerManager.clockMap[clockID];
            if (autoCreate && clock == null) {
                clock = new TimerClock(clockID);
                TimerManager.clockMap[clockID] = clock;
            }
            return clock;
        };
        //开始
        TimerManager.start = function () {
            if (TimerManager.running)
                return;
            TimerManager.shape = TimerManager.shape || (new egret.Shape);
            TimerManager.shape.addEventListener(egret.Event.ENTER_FRAME, TimerManager.tick, TimerManager);
            TimerManager.lastTime = egret.getTimer();
            TimerManager.running = true;
        };
        //停止
        TimerManager.stop = function (clockID) {
            if (clockID === void 0) { clockID = null; }
            if (clockID == null) {
                if (!TimerManager.running)
                    return;
                TimerManager.shape.removeEventListener(egret.Event.ENTER_FRAME, TimerManager.tick, TimerManager);
                TimerManager.running = false;
            }
            else {
                if (TimerManager.clockMap[clockID])
                    TimerManager.getClock(clockID).stop();
            }
        };
        //暂停
        TimerManager.pause = function (clockID) {
            if (clockID === void 0) { clockID = null; }
            if (clockID == null) {
                if (!TimerManager.running)
                    return;
                TimerManager.shape.removeEventListener(egret.Event.ENTER_FRAME, TimerManager.tick, TimerManager);
                TimerManager.running = false;
            }
            else {
                if (TimerManager.clockMap[clockID])
                    TimerManager.getClock(clockID).pause();
            }
        };
        //恢复
        TimerManager.resume = function (clockID) {
            if (clockID === void 0) { clockID = null; }
            if (clockID == null) {
                if (TimerManager.running)
                    return;
                TimerManager.shape.addEventListener(egret.Event.ENTER_FRAME, TimerManager.tick, TimerManager);
                TimerManager.running = true;
                TimerManager.lastTime = egret.getTimer();
            }
            else {
                if (TimerManager.clockMap[clockID])
                    TimerManager.getClock(clockID).resume();
            }
        };
        //帧频更新
        TimerManager.tick = function (e) {
            if (!TimerManager.running)
                return;
            //当前时间
            var currentTime = egret.getTimer();
            var passedTime = currentTime - TimerManager.lastTime;
            TimerManager.lastTime = currentTime;
            //检测
            for (var i in this.clockMap) {
                var clock = TimerManager.clockMap[i];
                if (clock.running) {
                    clock.update(passedTime, TimerManager, TimerManager.checkActive);
                }
            }
        };
        //检查活动个数
        TimerManager.checkActive = function () {
            var activeCount = 0;
            for (var i in this.clockMap) {
                var clock = TimerManager.clockMap[i];
                activeCount += clock.running ? 1 : 0;
            }
            //活动个数为0，停止驱动
            if (activeCount == 0)
                TimerManager.pause();
            else
                TimerManager.resume();
        };
        TimerManager.clockMap = {};
        TimerManager.lastTime = 0;
        return TimerManager;
    }());
    TsEngine.TimerManager = TimerManager;
    __reflect(TimerManager.prototype, "TsEngine.TimerManager");
    var TimerClock = (function () {
        function TimerClock(id, updateDelay) {
            if (updateDelay === void 0) { updateDelay = 1000; }
            this.repeatCount = 0; //重复次数
            this.currentCount = 0; //当前次数
            this.updateDelay = 0; //进度更新间隔[毫秒单位]
            this.currentUpdateDelay = 0; //当前进度更新间隔[毫秒单位，修正剩下时间不足updateDelay]
            this.passedUpdateTime = 0;
            this.callBackMap = new TsEngine.HashMap();
            this.id = id;
            this.running = false;
            this.updateDelay = updateDelay;
        }
        //注册回调函数
        TimerClock.prototype.registCallBack = function (thisObject, onComplete, onProgress) {
            this.callBackMap.put(thisObject, { thisObject: thisObject, onComplete: onComplete, onProgress: onProgress });
            if (onProgress != null) {
                onProgress.call(thisObject, this.progress);
            }
            if (onComplete != null) {
                if (this.progress == 1)
                    onComplete.call(thisObject);
            }
        };
        //删除回调函数
        TimerClock.prototype.removeCallBack = function (thisObject) {
            this.callBackMap.remove(thisObject);
        };
        //开始(秒为单位)
        TimerClock.prototype.start = function (seconds, repeatCount, totalSeconds, speedFactor) {
            if (repeatCount === void 0) { repeatCount = 1; }
            if (totalSeconds === void 0) { totalSeconds = -1; }
            if (speedFactor === void 0) { speedFactor = 1; }
            if (this.running)
                this.stop();
            totalSeconds = (totalSeconds > 0) ? totalSeconds : seconds;
            this.totalTime = totalSeconds * 1000;
            this.passedTime = (totalSeconds - seconds) * 1000;
            this.speedFactor = speedFactor;
            this.currentCount = 1;
            this.repeatCount = repeatCount;
            this.currentUpdateDelay = Math.min(this.updateDelay, this.totalTime);
            if (this.totalTime > 0) {
                this.running = true;
            }
            else {
                this.callBackMap.eachValue(this.postComplete, this);
            }
        };
        //暂停
        TimerClock.prototype.pause = function () {
            this.running = false;
        };
        //恢复
        TimerClock.prototype.resume = function () {
            if (this.leftTime > 0)
                this.running = true;
        };
        //停止
        TimerClock.prototype.stop = function () {
            this.running = false;
            this.passedUpdateTime = 0;
            this.passedTime = 0;
            this.currentCount = 1;
        };
        //销毁
        TimerClock.prototype.dispose = function () {
            this.stop();
            this.callBackMap.clear();
        };
        //更新显示
        TimerClock.prototype.update = function (deltaTime, thisObject, onComplete) {
            if (!this.running)
                return;
            deltaTime *= this.speedFactor;
            this.passedTime += deltaTime;
            this.passedUpdateTime += deltaTime;
            while (this.passedUpdateTime > this.currentUpdateDelay) {
                this.passedUpdateTime -= this.currentUpdateDelay;
                if (this.leftTime > 0) {
                    this.currentUpdateDelay = Math.min(this.currentUpdateDelay, this.leftTime);
                }
                this.callBackMap.eachValue(this.postProgress, this);
                if (this.passedTime >= this.totalTime) {
                    this.currentCount++;
                    if (this.currentCount > this.repeatCount) {
                        this.running = false;
                        this.callBackMap.eachValue(this.postComplete, this);
                        onComplete.call(thisObject);
                    }
                    else {
                        this.passedTime -= this.totalTime;
                    }
                }
            }
        };
        Object.defineProperty(TimerClock.prototype, "leftTime", {
            //剩余时间[毫秒单位]
            get: function () {
                return this.totalTime - this.passedTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimerClock.prototype, "leftTimeFormat", {
            //剩余时间格式化字符[毫秒单位]
            get: function () {
                return TsEngine.NumberFormatter.formatTime(this.leftTime);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimerClock.prototype, "leftTimeFormatZh", {
            //剩余时间格式化字符[毫秒单位]
            get: function () {
                return TsEngine.NumberFormatter.formatTime(this.leftTime, true, true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimerClock.prototype, "passedTime", {
            get: function () {
                return this.m_passedTime;
            },
            set: function (value) {
                this.m_passedTime = Math.min(value, this.totalTime);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimerClock.prototype, "progress", {
            //进度
            get: function () {
                return this.m_passedTime ? (this.m_passedTime / this.totalTime) : 0;
            },
            enumerable: true,
            configurable: true
        });
        TimerClock.prototype.postProgress = function (value) {
            var func = value.onProgress;
            var thisObject = value.thisObject;
            if (func)
                func.call(thisObject, this.progress);
        };
        TimerClock.prototype.postComplete = function (value) {
            var func = value.onComplete;
            var thisObject = value.thisObject;
            if (func)
                func.call(thisObject);
        };
        return TimerClock;
    }());
    __reflect(TimerClock.prototype, "TimerClock");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=TimerManager.js.map