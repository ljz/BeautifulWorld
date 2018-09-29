//玩家登陆后需要处理的残留信息
namespace game {
	export class InitModel extends TsEngine.Model {
		public dailyPrizeConfs: any = null;
		public friendInfo: any = null;
		public mobileSystem = "";
		public timeStamp: any;
		public signRedPoint: boolean = false;//每日签到红点
		//刷新局部数据
		public update(data: any) {
			this.inject(data);
		}
	}
}
let initModel: game.InitModel;