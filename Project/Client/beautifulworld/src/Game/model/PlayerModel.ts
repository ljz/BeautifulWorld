//玩家数据
namespace game {
	export class PlayerModel extends TsEngine.Model {
		/**设置里开关*/
		public broadcastOff: boolean = false;
		public worldChatOff: boolean = false;
		public recommendOff: boolean = false;
		public musicOff: boolean = false;
		public data: any;

		//新手步骤
		public tutorial: number = 0;
		/**好友数据*/
		public friends: Array<any>;
		/**邀请好友奖励数据*/
		public friendRewards: any;
		/**是否菜单进入*/
		public fromMenu: boolean = false;

		/**用户基础属性 */
		public name: string = "";//名字
		public userId: string = "";//id名字
		public gender: number = 0;//0无性别，1男  2女
		public headImg: string = "";//头像
		public uid: number = 0;//uid
		public money: number = 0;//金币数
		public maxEnergy: number = 0;//能量上限
		public energy: number = 0;//能量
		public recoverEnergy: number = 0;//恢复能量
		public timeToRecover: number = 0;//恢复能量时间
		public island: number = 0;//岛屿id
		public crowns: number = 0;//星数
		public shields: number = 0;//护盾
		public maxBet: number = 0;//最大能量倍数
		public rollBet: number = 0;//当前能量倍数
		public shareCode: string = "";//sharecode
		public friendCode: string = "";//谁邀请的我
		public isAuthed: boolean = false;//认证（平台）
		public platform: number = 0;//平台类型
		public platformId: string = "";//平台id
		public signature: string = "";
		public lastRollerType: number = 0;
		public shareCount: number = 0;//分享次数
		public shareTime: number = 0;
		public dailyPrizeDay: number = 0;//第几天登陆（七日登陆）
		public dailyPrizeTime: number = 0;//七日登陆剩余时间
		public wantedCount: number = 0;
		public wantedName: "";
		public wantedUid: number;
		public ShipwreckCount: number = 0;
		public cookieCount: number = 0;
		public potionCount: number = 0;
		public hatchCount: number = 0;
		public hornCount: number = 0;
		public miniShieldCount: number = 0;
		public monthCardExpired: number = 0;
		public gotNewbieGift: boolean = false;
		public gotOccasionalGift: boolean = false;
		public gotDailyShop: boolean = false;
		public allInOnePiece: number = 0;
		public invitedToKillTitan: boolean = false;
		public invitedActivityId: number = 0;
		public enteredKillTitan: boolean = false;
		public killTitanCannonBall: number = 0;
		public summonStone: number = 0;
		public puffer: number = 0;
		public lolly: number = 0;
		public guild: any = null;
		public guildMedal: number = 0;
		public doubleMoneyCard: number = 0;
		public shieldEnergy: number = 0;
		public shieldEnergyOpenAt: number = 0;
		public province: number = 0;
		public city: number = 0;
		public constellation: number = 0;
		public betCount: number = 0;
		public islandCount: number = 0;
		public isTutorialMiner: boolean = false;
		public gainIslandReward: boolean = false;
		public canIslandShare: boolean = false;
		public isBindingWxGame: boolean = false;
		public petName: string = "";
		public petSleepRemain: number = 0;
		public petExpRemain: number = 0;
		public menuGiftRewardCount: number = 0;
		public loginRewardRemain: number = 0;
		public gotSubscribedReward: boolean = false;
		public gotNewSubscribedReward: boolean = false;
		public gotMonthCardReward: boolean = false;
		public forbiddenPush: boolean = false;
		public nightAllowPush: boolean = false;
		public wechat: string = "";
		public showWechat: boolean = false;
		public isExistConnonContestAward: boolean = false;
		public hasAchievement: boolean = false;
		public hasRecruit: boolean = false;
		public hasMystical: boolean = false;
		public subscribedActive: boolean = false;
		public balloonActive: boolean = false;
		public showBoxType: number = 0;
		public highestCrowns: number = 0;
		public rollTotalCount: number = 0;
		public lastPostFriendSign: number = 0;
		public worldChatRemain: number = 0;
		public idVerifyTime: number = 0;
		public pined: boolean = false;
		public leaveDays: number = 0;
		public inviteCode: string = "";
		public inviteFriendCount: number = 0;
		public inviteFriendRewardCount: number = 0;
		public inviteFirendToday: boolean = false;
		public inviteFriendVIPCount: number = 0;
		public inviteFriendVIPRemain: any = null;
		public inviteMoneyCount: number = 0;
		public recallRewards: any = null;
		public speedGiftRemain: any = null;
		public friendsEnergyCounts: number = 0;//好友赠送体力的数量
		public guide: any[] = [];
		public couple: any = {};//cp
		public dailyEventInfo: any = null;
		public channel: any;// 渠道
		public dailyCount: number;//免费能量-》已领取个数
		public dailyLimit: number;//免费能量-》总的个数
		public gainRecallReward: any = null;// 召回奖励
		public gainReturnReward: any = null;// 回归奖励
		public isShowSubscribe: boolean = false;//公众号礼包开关
		public isPrivilege: boolean = false;//是否公众号特权
		public privilegeOverplus: number = 0;//公众号特权剩余秒数
		public isSubscribed: boolean = false;//是否关注H5公众号
		public isSubscribedWxGame: boolean = false;//是否关注小游戏公众号
		public selectedActivityType: string = "";//当前活动类型
		// public sendJigsawId: number = 1;//赠送的拼图碎片id
		// public sendOctopusId: number = 0;//赠送章鱼道具
		public requestsLength: number = 0;//申请加好友请求数量
		public beRecalledCount: number = 0;//被召回次数

		//刷新局部数据
		public update(data: any) {
			this.inject(data, false);
			if (data.hasOwnProperty("tutorial")) {
				this.tutorial++;
			}
			TsEngine.Log.warn(this, "tutorial:" + this.tutorial);
			// HttpService.secret = GameConfig.apiSecret;
		}

		//刷新所有数据
		public updateAll(data: any): void {
			this.data = data;
			playerModel.update(data);
			initModel.update(data);
			wheelModel.update(data);
			// islandModel.update(data);
			jigsawModel.update(data);
			dailyModel.update(data);
			chatModel.update(data);
			messageModel.update(false, (() => {
				gateModel.update(data);
				activityModel.update(data);
			}));
		}

		//更新好友信息
		public updateFriends(onComplete?: Function, thisobj?: any) {
			HttpService.get(ServerMsg.SHOW_DONATE, "uid=" + playerModel.uid, (data) => {
				if (data) {
					this.friends = data.friends;
					gateModel.updateGate(WindowType.WINDOW_RECOMMEND_NEARBY);
					onComplete && onComplete.call(thisobj, data);
				}
			}, this);
		}

		//更新邀请好友奖励信息
		public static updateFriendRewards(): void {
			HttpService.get(ServerMsg.SHOW_FRIEND_REWARD, `uid=${playerModel.uid}`, (data) => {
				playerModel.friendRewards = data;
			})
		}
		//召回奖励数量
		public get recallRewardCounts(): number {
			let count = 0;
			for (var i = 0; i < this.recallRewards.length; i++) {
				if (!this.recallRewards[i].hasGot) {
					count++;
				}
			}
			return count;
		}

		//邀请好友奖励数量
		public get friendsRewardCounts(): number {
			// 奖励部分
			if (!this.friendRewards) return 0;
			let _fr = this.friendRewards.friendRewards;
			let _rewards = [{ uid: 0, level: 0 }, { uid: 0, level: 0 }, { uid: 0, level: 0 }, { uid: 0, level: 0 }];
			for (let m = 0; m < 4; m++) {
				for (var j = 0; j < _fr.length; j++) {
					if (!_fr[j].gotLevel[m] && _fr[j].crowns >= this.friendRewards.friendRewardsConf[m].target) {
						_rewards[m].uid = _fr[j].uid;
						_rewards[m].level = m + 1;
						break;
					}
				}
			}
			let count = 0
			for (let i = 0; i < _rewards.length; i++) {
				if (_rewards[i].uid > 0 && this.friendRewards.friendRewardsCount[i] < this.friendRewards.friendRewardsConf[i].limit) {
					count++;
					break;
				}
			}
			return count;
		}

		public get dailyPrizeConfs() {
			return this.data.dailyPrizeConfs;
		}
	}
	/**
	* Created by young
	* Copyright (c) 2017 HortorGames. All rights reserved.
	*/
	export class PlayerSettingInfo {
		public uid: number = 0;
		public fid: number = 0;
		public checksum: string = ``;
		public algorithm: string = ``;
		public showDetails: boolean = false;
		constructor(uid: number, fid: number, checksum: string, algorithm: string, showDetails: boolean) {
			this.uid = uid;
			this.fid = fid;
			this.checksum = checksum;
			this.algorithm = algorithm;
			this.showDetails = showDetails;
		}

	}
}



let playerModel: game.PlayerModel;