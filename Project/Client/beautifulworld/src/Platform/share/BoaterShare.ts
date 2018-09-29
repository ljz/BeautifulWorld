/**
* Created by chenqianxu
* Copyright (c) 2017 HortorGames. All rights reserved.
*/
namespace game {
    //----------------船员招募分享------------------
    export class BoaterHireShare extends GameShare {
        public onShareSuc(): void {
            super.onShareSuc();
            //new TextPop("船员招募分享成功");
            //MainUIView.getInstance().closeView(ui.BoaterShareTipMediator.NAME);
        }

        public onShareEnter(params: any): void {
            //BoaterManager.AcceptBoater(this.shareOwnerId);
        }
    }


    //----------------船员召回分享------------------
    export class BoaterRecallShare extends GameShare {
        public onShareSuc(): void {
            super.onShareSuc();
            //new TextPop("船员召回分享成功");
        }

        public onShareEnter(params: any): void {

        }
    }

    //----------------船员招募分享------------------
    export class BoaterHireShare2 extends GameShare {
        public onShareSuc(): void {
            super.onShareSuc();
            //new TextPop("船员招募分享成功");
        }

        public onShareEnter(params: any): void {
            //BoaterManager.AcceptBoater(this.shareOwnerId);
        }
    }
}