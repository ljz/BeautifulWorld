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
* Created by young
* Copyright (c) 2017 HortorGames. All rights reserved.
*/
var game;
(function (game) {
    var WxFriendShare = (function (_super) {
        __extends(WxFriendShare, _super);
        function WxFriendShare() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WxFriendShare.prototype.onShareSuc = function (res) {
            _super.prototype.onShareSuc.call(this, res);
            game.WxFriendShare.WxFriendShareSuccess(res);
        };
        WxFriendShare.prototype.onShareEnter = function (params) {
            console.log("WxFriendShare params ===>", params);
        };
        WxFriendShare.WxFriendShareSuccess = function (res) {
            if (res === void 0) { res = null; }
            TsEngine.TipManager.bubble("\u5206\u4EAB\u6210\u529F\uFF0C\u5FEB\u53BB\u70B9\u51FB\u5206\u4EAB\u94FE\u63A5\u67E5\u770B\u6392\u884C\u5427");
        };
        return WxFriendShare;
    }(game.GameShare));
    game.WxFriendShare = WxFriendShare;
    __reflect(WxFriendShare.prototype, "game.WxFriendShare");
})(game || (game = {}));
//# sourceMappingURL=WxFriendShare.js.map