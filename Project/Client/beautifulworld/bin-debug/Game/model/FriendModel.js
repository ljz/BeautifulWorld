var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var FriendModel = (function () {
        function FriendModel() {
            this.friendData = [];
            // 推荐好友的CD恢复时间
            this.mCDNearByTime = 0;
            this.mCDOnlineTime = 0;
        }
        FriendModel.prototype.sortData = function (cp) {
            this.friendData.sort(function (a, b) {
                return a.updateElapse - b.updateElapse;
            });
            if (cp) {
                cp.isCp = true;
                this.friendData.unshift(cp);
            }
        };
        // 刷新附近的人倒计时的cd时间
        FriendModel.prototype.countDownNearbyCDTime = function () {
            this.mCDNearByTime = 10;
            if (this.mCDNearByTimer) {
                egret.log("timer未清理干净，此处应该清理");
                this.clearNearByTimer();
            }
            else {
                this.mCDNearByTimer = new egret.Timer(1000);
                this.mCDNearByTimer.addEventListener(egret.TimerEvent.TIMER, this.updateNearbyCDTime, this);
                this.mCDNearByTimer.start();
            }
        };
        /** 更新附近的人cd时间 */
        FriendModel.prototype.updateNearbyCDTime = function () {
            this.mCDNearByTime--;
            if (this.mCDNearByTime <= 0) {
                this.clearNearByTimer();
            }
            EventCenter.sendEvent(EventConst.updateRecommendStatus);
        };
        /** 清理计时器 */
        FriendModel.prototype.clearNearByTimer = function () {
            if (this.mCDNearByTimer) {
                this.mCDNearByTimer.stop();
                this.mCDNearByTimer.removeEventListener(egret.TimerEvent.TIMER, this.updateNearbyCDTime, this);
                this.mCDNearByTimer = null;
            }
        };
        // 刷新在线的人倒计时的cd时间
        FriendModel.prototype.countDownOnlineCDTime = function () {
            this.mCDOnlineTime = 10;
            if (this.mCDOnlineTimer) {
                egret.log("timer未清理干净，此处应该清理");
                this.clearOnlineTimer();
            }
            else {
                this.mCDOnlineTimer = new egret.Timer(1000);
                this.mCDOnlineTimer.addEventListener(egret.TimerEvent.TIMER, this.updateOnlineCDTime, this);
                this.mCDOnlineTimer.start();
            }
        };
        /** 更新附近的人cd时间 */
        FriendModel.prototype.updateOnlineCDTime = function () {
            this.mCDOnlineTime = 10;
            this.mCDOnlineTime--;
            if (this.mCDOnlineTime <= 0) {
                this.clearOnlineTimer();
            }
            EventCenter.sendEvent(EventConst.updateRecommendStatus);
        };
        /** 清理计时器 */
        FriendModel.prototype.clearOnlineTimer = function () {
            if (this.mCDOnlineTimer) {
                this.mCDOnlineTimer.stop();
                this.mCDOnlineTimer.removeEventListener(egret.TimerEvent.TIMER, this.updateOnlineCDTime, this);
                this.mCDOnlineTimer = null;
            }
        };
        return FriendModel;
    }());
    game.FriendModel = FriendModel;
    __reflect(FriendModel.prototype, "game.FriendModel");
})(game || (game = {}));
var friendModel;
//# sourceMappingURL=FriendModel.js.map