
namespace game {
	//注册分享类
	export class ShareRegister extends TsEngine.Register {

		private registShare<T extends BaseShare>(shareType: string, shareClass: new () => T): void {
			PlatformManager.registShare(shareType, shareClass);
		}

		public initialize(): void {
			// this.registShare(ShareType.boaterHire, BoaterHireShare);//船员招募分享
			// this.registShare(ShareType.boaterRecall, BoaterRecallShare);//船员召回分享
			// this.registShare(ShareType.boaterHire2, BoaterHireShare2);//船员招募分享
			// // 注册海盗王分享
			// this.registShare(ShareType.KingBarrierShare, KingBarrierShare);//海盗王障碍物分享
			// this.registShare(ShareType.KingCircleShare, KingCircleShare);//海盗王达成一圈分享
			// this.registShare(ShareType.Island, IslandShare);//过岛分享
			// this.registShare(ShareType.SeniorDailyEnergyShare, SeniorDailyEnergyShare);
			// this.registShare(ShareType.InviteJBBXShare, InviteJBBXShare);
			// this.registShare(ShareType.InviteRewardShare, InviteRewardShare);
			// this.registShare(ShareType.WnspShare, WnspShare);
			// this.registShare(ShareType.InviteVipShare, InviteVipShare);
			// this.registShare(ShareType.monster, MonsterShare);//打怪兽
			// this.registShare(ShareType.RecallRewardShare, RecallRewardShare);//召回
			// this.registShare(ShareType.UserRecallShare, UserRecallShare);//召回
			// this.registShare(ShareType.wanbanInvite, game.WxFriendShare);//玩吧分享
			// this.registShare(ShareType.groupRank, game.WxFriendShare);//玩吧分享
			// this.registShare(ShareType.shareForGold, MultipleGoldShare);// 多倍分享
			// this.registShare(ShareType.tree, TreeShare);//海盗商人分享
		}
	}
}
let shareRegister: game.ShareRegister;
