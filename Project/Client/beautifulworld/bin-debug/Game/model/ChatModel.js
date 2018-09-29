var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Created by young on 17/6/17.
 */
var game;
(function (game) {
    var ChatModel = (function (_super) {
        __extends(ChatModel, _super);
        function ChatModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.delPersonButton = false; //私聊列表界面底部的删除按钮
            _this.chatBubbleIsShow = false; //聊天气泡是否显示
            _this.broadcastChannel = 0; // 世界聊天频道
            // 世界聊天记录
            _this.ChatCache = {
                Messages: [],
                NewMessages: [],
                PrivateMsgList: [],
                chatPanelType: null,
                selectChatIndex: 0,
                chatPrivateList: [],
                chatBtnPoint: false //
            };
            // 个人聊天记录
            _this.ChatPersonCache = {
                Messages: [],
                NewMessages: [] //新聊天内容
            };
            // 好友信息
            _this.PersonInfo = {
                uid: 0,
                headImg: "",
                name: "",
                gender: 1,
                crowns: 0,
                inviteCode: "",
                chatSign: 0,
                isVip: 0,
                swapState: 0,
                swapSponsor: 0,
                province: 0,
                city: 0,
                hasBanned: false,
                isPrivilege: false
            };
            return _this;
        }
        // 更新数据
        ChatModel.prototype.update = function (data) {
            this.inject(data, false);
        };
        /**
         * 展示与好友的私聊面板
         * @param fid: 好友uid
         * @param chatSign: 聊天关系的key
         */
        ChatModel.prototype.showPrivateChat = function (fid, chatSign) {
            var _this = this;
            var index = this.ChatCache.chatPrivateList.indexOf(fid);
            if (index > -1) {
                this.ChatCache.chatPrivateList.splice(index, 1);
                this.ChatCache.chatBtnPoint = this.ChatCache.chatPrivateList.length > 0;
                EventCenter.sendEvent(EventConst.FoldBtnRedPoint);
            }
            HttpService.get(game.ServerMsg.CHAT_PRIVATE_DETAIL, "uid=" + playerModel.uid + "&fid=" + fid + "&chatSign=" + chatSign, function (data) {
                if (true) {
                    console.log("CHAT_PRIVATE_DETAIL：" + JSON.stringify(data));
                }
                var _friendInfo = data.friendInfo;
                for (var key in _this.PersonInfo) {
                    _this.PersonInfo[key] = _friendInfo[key];
                }
                //特殊处理-》后来加的两个交换属性
                _this.PersonInfo.swapState = data.swapState || 0;
                _this.PersonInfo.swapSponsor = data.swapSponsor || false;
                //是否拉黑
                _this.PersonInfo.hasBanned = data.hasBanned || false;
                _this.ChatPersonCache.Messages = data.messages;
                TsEngine.WindowManager.showWindow(game.WindowType.WINDOW_PRIVATE_CHAT);
            });
        };
        return ChatModel;
    }(TsEngine.Model));
    game.ChatModel = ChatModel;
    __reflect(ChatModel.prototype, "game.ChatModel");
})(game || (game = {}));
var chatModel;
//# sourceMappingURL=ChatModel.js.map