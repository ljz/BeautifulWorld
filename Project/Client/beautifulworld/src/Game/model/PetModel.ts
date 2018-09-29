namespace game {
    export class PetModel extends TsEngine.Model {
        public pets: any = {};

        //全局变量
        public stageHeight: number = TsEngine.StageManager.stageHeight;
        public stageWidth: number = TsEngine.StageManager.stageWidth;
        public stageOffHeight: number = TsEngine.StageManager.stageHeight - 1039;
        public petNowStatus: string = "sleep";//宠物当前状态
        //刷新局部数据
        public update(data: any) {
            console.log('PetModel-->>>>>>>>>>>data: ', data);
            for (let key in data) {
                if (this.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }
        }
    }
}
let petModel: game.PetModel;