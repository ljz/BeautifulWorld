namespace game {
    export class JigsawModel extends TsEngine.Model {
        public jigsawInfo: any = {};

        //全局变量
        public newJigsawNews: boolean = false;
        public sendData: any = { uid: -1 };//赠送人的信息
        public sendId: number = 0;//赠送的拼图id

        //刷新局部数据
        public update(data: any) {
            // this.inject(data);
            console.log('jigsawMode-->>>>>>>>>>>data: ', data);
            if (data.hasOwnProperty('jigsawInfo')) {
                this.jigsawInfo = data.jigsawInfo;
            } else {
                for (let key in data) {
                    if (this.jigsawInfo.hasOwnProperty(key)) {
                        this.jigsawInfo[key] = data[key];
                    }
                }
            }
        }
    }

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
}
let jigsawModel: game.JigsawModel;