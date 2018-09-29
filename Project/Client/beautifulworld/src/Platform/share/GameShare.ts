/**
* Created by chenqianxu
* Copyright (c) 2017 HortorGames. All rights reserved.
*/
namespace game {
      export class GameShare extends BaseShare {

            //分享调用
            public share(params: any, replaceParam?: any): void {
                  PlatformManager.LogEvent(this.type + "_share");
                  super.share(params, replaceParam);
            }

            //分享成功
            public onShareSuc(res?: any): void {
                  //InitMark.wxSharing = true;
            }

            //分享失败
            public onShareFail(): void {

            }

            //点击分享进入
            public onShareEnter(params: any): void {

            }
      }
}