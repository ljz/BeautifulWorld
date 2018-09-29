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
var game;
(function (game) {
    var JigsawModel = (function (_super) {
        __extends(JigsawModel, _super);
        function JigsawModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.jigsawInfo = {};
            //全局变量
            _this.newJigsawNews = false;
            _this.sendData = { uid: -1 }; //赠送人的信息
            _this.sendId = 0; //赠送的拼图id
            return _this;
        }
        //刷新局部数据
        JigsawModel.prototype.update = function (data) {
            // this.inject(data);
            console.log('jigsawMode-->>>>>>>>>>>data: ', data);
            if (data.hasOwnProperty('jigsawInfo')) {
                this.jigsawInfo = data.jigsawInfo;
            }
            else {
                for (var key in data) {
                    if (this.jigsawInfo.hasOwnProperty(key)) {
                        this.jigsawInfo[key] = data[key];
                    }
                }
            }
        };
        return JigsawModel;
    }(TsEngine.Model));
    game.JigsawModel = JigsawModel;
    __reflect(JigsawModel.prototype, "game.JigsawModel");
    // export class JigsawInfo {
    //     public openTime: number;
    //     public closeTime: number;
    //     public series: number;
    //     public pieces: any[];
    //     public allInOnes: any[];
    //     public bags: any[];
    //     public RewardCount: number;
    //     public rewardLimit: number;
    //     public rewardList: any;
    //     public step: number;
    //     constructor(data: any) {
    //         for (let key in data) {
    //             this[key] = data[key];
    //         }
    //     }
    // }
})(game || (game = {}));
var jigsawModel;
//# sourceMappingURL=JigsawModel.js.map