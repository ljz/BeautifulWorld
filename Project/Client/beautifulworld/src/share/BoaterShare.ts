
//----------------船员招募分享------------------
class BoaterHireShare extends BaseShare {
    public onShareSuc(): void {
       super.onShareSuc();
    //    new TextPop("船员招募分享成功");
    //    MainUIView.getInstance().closeView(ui.BoaterShareTipMediator.NAME);
    }

    public onShareEnter(params: any): void {
        //BoaterManager.AcceptBoater(this.shareOwnerId);
    }
}


//----------------船员召回分享------------------
class BoaterRecallShare extends BaseShare {
    public onShareSuc(): void {
        // super.onShareSuc();
        // new TextPop("船员召回分享成功");
    }

    public onShareEnter(params: any): void {
        
    }
}

//----------------船员招募分享------------------
class BoaterHireShare2 extends BaseShare {
    public onShareSuc(): void {
        // super.onShareSuc();
       //new TextPop("船员招募分享成功");
    }

    public onShareEnter(params: any): void {
       //BoaterManager.AcceptBoater(this.shareOwnerId);
    }
}