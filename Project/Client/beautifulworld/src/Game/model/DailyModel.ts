
namespace game {
    export class DailyModel extends TsEngine.Model {
        public seniorDayShare_remainShareCount: number = -1;
        public seniorDayShare_boxEnergy: number = -1;

        public dailyEventInfo: any = {};
        public dailyPrizeConfs: any = {};
        public dazhangyuShareCount: number = 0;
        public treasureShareCount: number = 0;
        public remainShareCount: number = 0;

        public update(data: any) {
            this.inject(data, false);
        }
    }
}

let dailyModel: game.DailyModel;
