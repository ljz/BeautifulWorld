//轮盘的信息
namespace game {
    export class WheelModel extends TsEngine.Model {
        //数据传输属性
        public attackTarget: AttackTarget;//攻击随机目标
        public stealTarget: StealTarget;//偷取目标
        public rollerItems: Array<RollItem>;//轮盘信息
        public stealIslands: any;//偷取岛屿信息

        //自定义全局属性
        public markStealTarget: StealTarget;//临时偷取目标--全局-偷取结束判断是否需要更换土豪
        public markAttackTarget: AttackTarget;//临时攻击目标--全局
        public robotSteal: StealTarget;//新手引导的偷取对象
        public isRotate: boolean = false;//轮盘是否旋转中
        public selectWheelBet: number = 1;//轮盘倍率
        public newMsgCount: number = 0;//新消息的数量
        readonly rollTweenTime: number = 2000;//轮盘旋转时间
        public markAttacking: boolean = false;//攻击动画期间

        //刷新局部数据
        public update(data: any) {
            if (data.rollerItems) {
                this.rollerItems = new Array<RollItem>();
                for (let index = 0; index < data.rollerItems.length; index++) {
                    this.rollerItems.push(new RollItem(data.rollerItems[index]));
                }
            }
            if (data.attackTarget) {
                this.attackTarget = new AttackTarget(data.attackTarget);
            }
            if (data.stealTarget) {
                this.stealTarget = new StealTarget(data.stealTarget);
            }
            // if (data.stealIslands || _.isNull(data.stealIslands)) {
            // this.stealIslands = data.stealIslands;
            // }
        }
    }

    //攻击对象
    export class AttackTarget {
        public buildings: any;
        public city: number;
        public gender: number;
        public headImg: string;
        public isPrivilege: boolean;
        public isVip: boolean;
        public islandId: number;
        public name: string;
        public province: any;
        public signature: string;
        public uid: number;
        public crowns: number;
        public island: number;
        constructor(data: any) {
            for (let key in data) {
                this[key] = data[key];
            }
        }
    }

    //偷取对象
    export class StealTarget {
        public crowns: number;
        public city: number;
        public gender: number;
        public headImg: string;
        public isPrivilege: boolean;
        public isVip: boolean;
        public isRichMan: boolean;
        public name: string;
        public province: any;
        public uid: number;
        public money: number;
        constructor(data: any) {
            for (let key in data) {
                this[key] = data[key];
            }
        }
    }

    //转盘对象
    export class RollItem {
        public index: number;
        public type: number;
        public value: number;
        constructor(data: any) {
            for (let key in data) {
                this[key] = data[key];
            }
        }
    }
}
let wheelModel: game.WheelModel;