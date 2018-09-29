namespace game {
    export class OctopusModel extends TsEngine.Model {
        public jewelConfs: any = { epic: [], excellent: [], normal: [] };
        public octopusInfo: any = { "uid": 0, "color": "normal", "ownerName": "GreenDay", "ownerHeadImg": "", "ownerGotGoods": 0, "openingRemain": 0, "boxes": [] }
        public octopusPlayer: any = { "puffer": 0, "lolly": 0, "DonateCount": 0, "ReceiveCount": 0, "Jewels": [] };
        public rewardConfs: any[] = [];
        public shareCount: number = 0;
        public showTutorial: boolean = false;
        //全局变量
        public stageHeight: number = TsEngine.StageManager.stageHeight;
        public stageWidth: number = TsEngine.StageManager.stageWidth;
        public stageOffHeight: number = TsEngine.StageManager.stageHeight - 1039;

        public dazhangyuShareCount: number = 2;
        public octopusMessageRedPoint: boolean = false;
        public octopusLogRedPoint: boolean = false;
        public octopusRedPoint: boolean = false;
        public gainRewardList: any[] = [];
        public octopusTimer: number = 0;
        public newOctopusNews: boolean = false;
        public sendId: number = -1;
        public sendData: any = {};
        //刷新局部数据
        public update(data: any) {
            // console.log('OctopusModel-->>>>>>>>>>>data: ', data);
            for (let key in data) {
                if (this.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }
        }

        /**
        * 检测章鱼的新手引导到第几步，用于显示
        * @returns {number}
        */
        public checkOctopusGuide(): number {
            let _guideStep = 5;
            let _num = 9;
            if (this.octopusInfo && this.octopusInfo.uid != 0) {
                let _boxes = this.octopusInfo.boxes;
                for (let i = 1; i < _boxes.length; i++) {
                    let _box = _boxes[i];
                    if (_box == 0) {
                        _num--;
                    }
                }
            }
            return _guideStep - _num;
        }
    }
}
let octopusModel: game.OctopusModel;