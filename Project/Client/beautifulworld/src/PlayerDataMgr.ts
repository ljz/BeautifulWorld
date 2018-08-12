//玩家数据
class PlayerDataMgr {
	public isSubscribed = false;//是否关注了公众号
	public isPrivilege = false;//是否有公众号特权
	public privilegeOverplus = 0;//公众号特权剩余时间

	//初始化
	public refresh(data) {
		//刷新数据
		for (let key in data) {
			if (this.hasOwnProperty(key)) {
				this[key] = data[key];
			}
		}
		//公众号特权倒计时
		if (this.isPrivilege) {
			this.refreshPropertyClock("privilegeOverplus", () => {
				this.isPrivilege = false;
				sendEvent(EventType.REFRESHWHEELREDPOINT);
				});
		}
	}

	public get focusAreaAvailable():boolean
	{
		return false;
		// return InitMark.isShowSubscribe == "true" && InitMark.FocusInterFaceId&& InitMark.isWxgame;
	}

	//公众号特权是否有效
	public get privilegeAvailable() {
		return false;
		// console.log("PlayerModel privilegeAvailable isShowSubscribe:" + InitMark.isShowSubscribe + ",FocusInterFaceId:" + InitMark.FocusInterFaceId + ",gotNewSubscribedReward:" + InitMark.gotNewSubscribedReward + ",IsSubscribed:" + dataManager.isSubscribed + ",isWxgame:" + InitMark.isWxgame);
		// return this.focusAreaAvailable&& InitMark.gotNewSubscribedReward && dataManager.isSubscribed;
	}

	//获取属性时钟
	// public getPropertyClock(property: string): framework.TimerClock {

	// 	return framework.TimerManager.getClock(property + "_Timer");
	// }

	//刷新属性计时
	private refreshPropertyClock(property: string, onComplete: Function): void {
		
		/*
		if (this[property] > 0 ){
			let clock = TimerManager.addClock(property + "_Timer", playerModel[property]);
			clock.registCallBack(this, () => {
				this[property] = 0;
				TimerManager.removeClock(property + "_Timer");
				onComplete.call(this);
			}, (p) => {
				this[property] = clock.leftTime / 1000;
			});
		}
		*/
	}
}

let g_PlayerMgr = new PlayerDataMgr();