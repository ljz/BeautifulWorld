namespace game {
    /** 好友数据类型 */
    export type type_friend_data = {
        "uid": number,                      // 11486,
        "name": string,                     // "张佳旭",
        "headImg": string,                  // "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqgpyzHIJP6VjicYpqQrHVQWPtxwcKfQ2nvZxcvpW8pjxpwrdcuGAYyWSEAmyS2767BOib6EQKib4t3g/132",
        "crowns": number,                   //25,
        "gender": number,                   //1,
        "isVip": boolean,                   //false,
        "province": number,                 //0,
        "city": number,                     // 0,
        "isPrivilege": boolean,             // false,
        "chatSign": number,                 //3879880448,
        "updateElapse": number,             // 1805711,
        "status": number                    //2
        "isCp": boolean                     //是否为cp
    }

    export class FriendModel {
        public friendData: type_friend_data[] = [];
        public sortData(cp: type_friend_data) {
            this.friendData.sort((a, b) => {
                return a.updateElapse - b.updateElapse;
            });
            if (cp) {
                cp.isCp = true;
                this.friendData.unshift(cp);
            }
        }

        // 推荐好友的CD恢复时间
        public mCDNearByTime: number = 0;
        public mCDOnlineTime: number = 0;
        public mCDNearByTimer: egret.Timer;
        public mCDOnlineTimer: egret.Timer;

        // 刷新附近的人倒计时的cd时间
        public countDownNearbyCDTime(): void {
            this.mCDNearByTime = 10;
            if (this.mCDNearByTimer) {
                egret.log("timer未清理干净，此处应该清理");
                this.clearNearByTimer();
            } else {
                this.mCDNearByTimer = new egret.Timer(1000);
                this.mCDNearByTimer.addEventListener(egret.TimerEvent.TIMER, this.updateNearbyCDTime, this);
                this.mCDNearByTimer.start();
            }
        }

        /** 更新附近的人cd时间 */
        public updateNearbyCDTime(): void {
            this.mCDNearByTime--;
            if (this.mCDNearByTime <= 0) {
                this.clearNearByTimer();
            }
            EventCenter.sendEvent(EventConst.updateRecommendStatus);
        }

        /** 清理计时器 */
        public clearNearByTimer(): void {
            if (this.mCDNearByTimer) {
                this.mCDNearByTimer.stop();
                this.mCDNearByTimer.removeEventListener(egret.TimerEvent.TIMER, this.updateNearbyCDTime, this);
                this.mCDNearByTimer = null;
            }
        }





        // 刷新在线的人倒计时的cd时间
        public countDownOnlineCDTime(): void {
            this.mCDOnlineTime = 10;
            if (this.mCDOnlineTimer) {
                egret.log("timer未清理干净，此处应该清理");
                this.clearOnlineTimer();
            } else {
                this.mCDOnlineTimer = new egret.Timer(1000);
                this.mCDOnlineTimer.addEventListener(egret.TimerEvent.TIMER, this.updateOnlineCDTime, this);
                this.mCDOnlineTimer.start();
            }
        }

        /** 更新附近的人cd时间 */
        public updateOnlineCDTime(): void {
            this.mCDOnlineTime = 10;
            this.mCDOnlineTime--;
            if (this.mCDOnlineTime <= 0) {
                this.clearOnlineTimer();
            }
            EventCenter.sendEvent(EventConst.updateRecommendStatus);
        }

        /** 清理计时器 */
        public clearOnlineTimer(): void {
            if (this.mCDOnlineTimer) {
                this.mCDOnlineTimer.stop();
                this.mCDOnlineTimer.removeEventListener(egret.TimerEvent.TIMER, this.updateOnlineCDTime, this);
                this.mCDOnlineTimer = null;
            }
        }

    }
}
let friendModel: game.FriendModel;