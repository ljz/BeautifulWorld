/**
* Created by young
* Copyright (c) 2017 HortorGames. All rights reserved.
*/
namespace game {
    export class WxFriendShare extends GameShare {

        public onShareSuc(res): void {
            super.onShareSuc(res);
            game.WxFriendShare.WxFriendShareSuccess(res);
        }

        public onShareEnter(params: any): void {
            console.log(`WxFriendShare params ===>`, params)
        }

        public static WxFriendShareSuccess(res = null) {
            TsEngine.TipManager.bubble(`分享成功，快去点击分享链接查看排行吧`);
        }
    }
}