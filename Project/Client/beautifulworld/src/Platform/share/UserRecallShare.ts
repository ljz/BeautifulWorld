
/**
* Created by liaojiangzheng
* Copyright (c) 2018 HortorGames. All rights reserved.
*/
namespace game {
    //----------------关系链召回分享------------------
    export class UserRecallShare extends GameShare {
        public onShareSuc(res?: any): void {
            util.jzlog("关系链召回分享>>>>分享成功回调", this.onShareSuc)
            super.onShareSuc();
        }

        public onShareEnter(params: any): void {
            util.jzlog("召回奖励分享>>>>从链接进入");
        }
    }


    // //----------------船员召回分享------------------
    // export class SignShare extends GameShare {
    //     public onShareSuc(): void {
    //         super.onShareSuc();
    //         //new TextPop("船员召回分享成功");
    //     }

    //     public onShareEnter(params: any): void {

    //     }
    // }

    // //----------------船员招募分享------------------
    // export class BoaterHireShare2 extends GameShare {
    //     public onShareSuc(): void {
    //         super.onShareSuc();
    //         //new TextPop("船员招募分享成功");
    //     }

    //     public onShareEnter(params: any): void {
    //         //BoaterManager.AcceptBoater(this.shareOwnerId);
    //     }
    // }
}