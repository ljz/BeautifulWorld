var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* 用户消息数据
* Created by sunxinzhe
* Copyright (c) 2017 HortorGames. All rights reserved.
*/
var game;
(function (game) {
    var MessageModel = (function () {
        function MessageModel() {
            this.newMsgCount = 0; // 新消息的数量
            this.mailsCount = 0; // 邮件数量
        }
        //更新好友信息
        MessageModel.prototype.update = function (onlyNew, onComplete, thisobj) {
            var _this = this;
            if (onlyNew === void 0) { onlyNew = false; }
            HttpService.get(game.ServerMsg.MESSAGE, "uid=" + playerModel.uid + "&onlyNew=" + onlyNew + "&fromMenu=" + playerModel.fromMenu, function (data) {
                if (data) {
                    for (var key in data) {
                        _this[key] = data[key];
                    }
                    _this.mailsCount = _this.mails.length;
                    _this.newMsgCount = _this.messages.length;
                    onComplete && onComplete.call(thisobj);
                }
            }, this);
        };
        Object.defineProperty(MessageModel.prototype, "mailCountNotOpen", {
            get: function () {
                var count = 0;
                for (var i = 0; i < this.mails.length; i++) {
                    if (!this.mails[i].hasOpened) {
                        count++;
                    }
                }
                return count;
            },
            enumerable: true,
            configurable: true
        });
        return MessageModel;
    }());
    game.MessageModel = MessageModel;
    __reflect(MessageModel.prototype, "game.MessageModel");
})(game || (game = {}));
var messageModel;
//# sourceMappingURL=MessageModel.js.map