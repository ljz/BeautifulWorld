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
    var OctopusModel = (function (_super) {
        __extends(OctopusModel, _super);
        function OctopusModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.jewelConfs = { epic: [], excellent: [], normal: [] };
            _this.octopusInfo = { "uid": 0, "color": "normal", "ownerName": "GreenDay", "ownerHeadImg": "", "ownerGotGoods": 0, "openingRemain": 0, "boxes": [] };
            _this.octopusPlayer = { "puffer": 0, "lolly": 0, "DonateCount": 0, "ReceiveCount": 0, "Jewels": [] };
            _this.rewardConfs = [];
            _this.shareCount = 0;
            _this.showTutorial = false;
            //全局变量
            _this.stageHeight = TsEngine.StageManager.stageHeight;
            _this.stageWidth = TsEngine.StageManager.stageWidth;
            _this.stageOffHeight = TsEngine.StageManager.stageHeight - 1039;
            _this.dazhangyuShareCount = 2;
            _this.octopusMessageRedPoint = false;
            _this.octopusLogRedPoint = false;
            _this.octopusRedPoint = false;
            _this.gainRewardList = [];
            _this.octopusTimer = 0;
            _this.newOctopusNews = false;
            _this.sendId = -1;
            _this.sendData = {};
            return _this;
        }
        //刷新局部数据
        OctopusModel.prototype.update = function (data) {
            // console.log('OctopusModel-->>>>>>>>>>>data: ', data);
            for (var key in data) {
                if (this.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }
        };
        /**
        * 检测章鱼的新手引导到第几步，用于显示
        * @returns {number}
        */
        OctopusModel.prototype.checkOctopusGuide = function () {
            var _guideStep = 5;
            var _num = 9;
            if (this.octopusInfo && this.octopusInfo.uid != 0) {
                var _boxes = this.octopusInfo.boxes;
                for (var i = 1; i < _boxes.length; i++) {
                    var _box = _boxes[i];
                    if (_box == 0) {
                        _num--;
                    }
                }
            }
            return _guideStep - _num;
        };
        return OctopusModel;
    }(TsEngine.Model));
    game.OctopusModel = OctopusModel;
    __reflect(OctopusModel.prototype, "game.OctopusModel");
})(game || (game = {}));
var octopusModel;
//# sourceMappingURL=OctopusModel.js.map