/**
 * Created by young on 17/6/17.
 */
namespace game {
    export class ChatModel extends TsEngine.Model {
        public delPersonButton = false;  //私聊列表界面底部的删除按钮
        public chatBubbleIsShow = false; //聊天气泡是否显示
        public broadcastChannel: number = 0; // 世界聊天频道

        // 更新数据
        public update(data): void {
            this.inject(data, false);
        }

        // 世界聊天记录
        public ChatCache = {
            Messages: [],//聊天记录
            NewMessages: [],//新聊天内容
            PrivateMsgList: [],//私聊list
            chatPanelType: null,//
            selectChatIndex: 0,//
            chatPrivateList: [],//
            chatBtnPoint: false//
        };

        // 个人聊天记录
        public ChatPersonCache = {
            Messages: [],//聊天记录
            NewMessages: []//新聊天内容
        };

        // 好友信息
        public PersonInfo = {
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

        /** 
         * 展示与好友的私聊面板
         * @param fid: 好友uid
         * @param chatSign: 聊天关系的key
         */
        public showPrivateChat(fid: number, chatSign: number): void {
            let index = this.ChatCache.chatPrivateList.indexOf(fid);
            if (index > -1) {
                this.ChatCache.chatPrivateList.splice(index, 1);
                this.ChatCache.chatBtnPoint = this.ChatCache.chatPrivateList.length > 0;
                EventCenter.sendEvent(EventConst.FoldBtnRedPoint);
            }
            HttpService.get(ServerMsg.CHAT_PRIVATE_DETAIL, `uid=${playerModel.uid}&fid=${fid}&chatSign=${chatSign}`, (data) => {
                if (DEBUG) {
                    console.log("CHAT_PRIVATE_DETAIL：" + JSON.stringify(data));
                }
                let _friendInfo = data.friendInfo;
                for (let key in this.PersonInfo) {
                    this.PersonInfo[key] = _friendInfo[key];
                }

                //特殊处理-》后来加的两个交换属性
                this.PersonInfo.swapState = data.swapState || 0;
                this.PersonInfo.swapSponsor = data.swapSponsor || false;

                //是否拉黑
                this.PersonInfo.hasBanned = data.hasBanned || false;
                this.ChatPersonCache.Messages = data.messages;
                TsEngine.WindowManager.showWindow(WindowType.WINDOW_PRIVATE_CHAT);
            });
        }
    }
}
let chatModel: game.ChatModel;