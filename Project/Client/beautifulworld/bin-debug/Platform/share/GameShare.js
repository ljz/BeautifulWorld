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
* Created by chenqianxu
* Copyright (c) 2017 HortorGames. All rights reserved.
*/
var game;
(function (game) {
    var GameShare = (function (_super) {
        __extends(GameShare, _super);
        function GameShare() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //分享调用
        GameShare.prototype.share = function (params, replaceParam) {
            game.PlatformManager.LogEvent(this.type + "_share");
            _super.prototype.share.call(this, params, replaceParam);
        };
        //分享成功
        GameShare.prototype.onShareSuc = function (res) {
            //InitMark.wxSharing = true;
        };
        //分享失败
        GameShare.prototype.onShareFail = function () {
        };
        //点击分享进入
        GameShare.prototype.onShareEnter = function (params) {
        };
        return GameShare;
    }(game.BaseShare));
    game.GameShare = GameShare;
    __reflect(GameShare.prototype, "game.GameShare");
})(game || (game = {}));
//# sourceMappingURL=GameShare.js.map