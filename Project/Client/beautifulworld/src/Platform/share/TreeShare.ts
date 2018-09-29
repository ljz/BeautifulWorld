// namespace game {
// 	export class TreeShare extends game.GameShare {
// 		public onShareSuc(): void {
// 			super.onShareSuc();
// 			TsEngine.TipManager.alert('分享成功，快去让好友帮忙找水果吧');
// 		}

// 		public onShareEnter(params: any): void {
// 			let _params = params;
// 			let _fid = _params.shareOwnerId;
// 			if (_fid > 0 && _fid != playerModel.uid) {
// 				let fruitId = _params.fruitId;
// 				TreeFunc.helpOthers(playerModel.uid, _fid, fruitId);
// 			}
// 		}
// 	}
// }