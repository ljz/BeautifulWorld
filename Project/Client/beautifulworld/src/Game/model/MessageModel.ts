/**
* 用户消息数据
* Created by sunxinzhe
* Copyright (c) 2017 HortorGames. All rights reserved.
*/
namespace game {
    export class MessageModel {
        public mails: any[];
        public messages: any[];
        public notices: any[];
        public opStatus: number;
        public requests: any[];
        public showGift: boolean;
        public showShare: boolean;
        public newMsgCount: number = 0; // 新消息的数量
        public mailsCount: number = 0;  // 邮件数量
        //更新好友信息
        public update(onlyNew: boolean = false, onComplete?: Function, thisobj?: any) {
            HttpService.get(ServerMsg.MESSAGE, "uid=" + playerModel.uid + "&onlyNew=" + onlyNew + "&fromMenu=" + playerModel.fromMenu, (data) => {
                if (data) {
                    for (const key in data) {
                        this[key] = data[key];
                    }
                    this.mailsCount = this.mails.length;
                    this.newMsgCount = this.messages.length;
                    onComplete && onComplete.call(thisobj);
                }
            }, this);
        }

        public get mailCountNotOpen(): number {
            var count = 0;
            for (let i = 0; i < this.mails.length; i++) {
                if (!this.mails[i].hasOpened) {
                    count++;
                }
            }
            return count;
        }
    }
}
let messageModel: game.MessageModel;