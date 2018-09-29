// /**
// * 岛屿数据，建造数据
// * Created by sunxinzhe
// * Copyright (c) 2017 HortorGames. All rights reserved.
// */
// namespace game {
//     export enum IslandStatus {//不要修改枚举位置
//         BUILD,
//         SMALL,
//         ATTACKORSTEAL
//     }
//     export class IslandModel extends TsEngine.Model {
//         public buildings: Array<UserBuilding>;
//         public buildingCost: Array<BuildingCost>;
//         public mapInfo: any;
//         public ableToBuildCount: number;
//         public ableToMineCount: number;
//         public island: number = 0;
//         public robotAvatars: Array<string> = [];
//         private mIslandStatus: IslandStatus;
//         public energyReward: number = 0;
//         public moneyReward: number = 0;
//         public userRecallBuildings: Array<UserBuilding>;//回归建设岛屿
//         //更新好友信息
//         public update(data: any) {
//             if (data.buildings) {
//                 this.buildings = new Array<UserBuilding>();
//                 for (var index = 0; index < data.buildings.length; index++) {
//                     this.buildings.push(new UserBuilding(data.buildings[index]));
//                 }
//                 //检测是否有回归重建
//                 if (playerModel.leaveDays > Const.recallLeaveDays) {
//                     islandModel.userRecallBuildings = util.cloneArr(islandModel.buildings);
//                     for (let i = 0; i < islandModel.buildings.length; i++) {
//                         islandModel.buildings[i].level = 0;
//                         islandModel.buildings[i].status = 2;
//                     }
//                 }
//             }
//             if (data.buildingCost) {
//                 this.buildingCost = new Array<BuildingCost>();
//                 for (var index = 0; index < data.buildingCost.length; index++) {
//                     this.buildingCost.push(new BuildingCost(data.buildingCost[index]));
//                 }
//             }
//             if (data.mapInfo) {
//                 this.mapInfo = data.mapInfo;
//             }
//             if (!MapProxy.clock) {
//                 MapProxy.clock = TsEngine.TimerManager.addClock(game.ClockType.MapUpdateMoneyBox, 60 * 60 * 24);
//                 MapProxy.clock.registCallBack(this, () => { }, () => {
//                     let _mapInfo = islandModel.mapInfo;
//                     if (_mapInfo.producePerSecond && _mapInfo.moneyBox < _mapInfo.limit) {
//                         _mapInfo.moneyBox += _mapInfo.producePerSecond;
//                         if (_mapInfo.moneyBox >= _mapInfo.limit) {
//                             _mapInfo.moneyBox = _mapInfo.limit;
//                             MapProxy.mapFullRedPoint = true;
//                             MapProxy.refreshMapRedPoint();
//                         }
//                     }
//                 });
//             }
//         }
//         //更新数量
//         public updateBuildCount() {
//             this.ableToBuildCount = 0;
//             for (var i = 0; i < 5; i++) {
//                 if (this.buildings[i].status == 1) {
//                     if (playerModel.money >= this.buildingCost[i][this.buildings[i].level - 1] * .5) {
//                         this.ableToBuildCount++;
//                     }
//                 } else {
//                     if (playerModel.money >= this.buildingCost[i][this.buildings[i].level]) {
//                         this.ableToBuildCount++;
//                     }
//                 }
//             }
//             this.ableToMineCount = 0;
//             if (playerModel.island > 1) {
//                 var _mines = this.mapInfo.mines;
//                 for (var i = 0; i < _mines.length; i++) {
//                     if (_mines[i].miner < 5 && _mines[i].island < playerModel.island) {
//                         if (playerModel.money >= _mines[i].costs[_mines[i].miner]) {
//                             this.ableToMineCount++;
//                         }
//                     }
//                 }
//             }
//         }
//         public set islandStatus(value: IslandStatus) {
//             this.mIslandStatus = value;
//             TsEngine.NotificationManager.dispatch(NotificationType.FACEUI_UPDATE);
//         }
//         public get islandStatus(): IslandStatus {
//             return this.mIslandStatus;
//         }
//         /**
//          * 新版本岛屿统一坐标 获取建筑坐标
//          * @param island 
//          */
//         public getCityPoints(island): any {
//             return island > 68 ? IslandLocation[`isLand69`] : IslandLocation[`isLand${island}`];
//         }
//         /**
//          * 新版本岛屿统一坐标 获取神兽高度
//          * @param island 
//          */
//         public getBuilding3Height(island): any {
//             return island > 68 ? IslandLocation.building3Height[68] : IslandLocation.building3Height[island];
//         }
//         /*    
//          * 获取当前岛屿的状态--处理满岛情况
//          * @param data 岛屿的数据
//          */
//         public getIslandData(data: any): any {
//             let d = {
//                 islandId: 0,
//                 island: 0,
//                 buildings: [{ "level": 0, "status": 0 }]
//             };
//             if (data.island >= playerModel.islandCount || data.islandId >= playerModel.islandCount || data.gainIslandReward) {
//                 d.islandId = data.islandId - 1;
//                 d.island = data.island - 1;
//                 d.buildings = [
//                     { "level": 5, "status": 0 },
//                     { "level": 5, "status": 0 },
//                     { "level": 5, "status": 0 },
//                     { "level": 5, "status": 0 },
//                     { "level": 5, "status": 0 }];
//             } else {
//                 d = {
//                     islandId: data.islandId,
//                     island: data.island,
//                     buildings: data.buildings || this.buildings
//                 };
//             }
//             return d;
//         }
//         //抛出刷新世界地图的事件
//         public refreshMapRedPoint(): void {
//             EventCenter.sendEvent(EventConst.MenuRedPoint);
//             EventCenter.sendEvent(EventConst.RefreshMapRedPoint);
//         }
//     }
//     //建筑消耗对象
//     export class BuildingCost {
//         public costs: number[];
//         constructor(data: any) {
//             this.costs = data;
//         }
//     }
//     //建筑对象
//     export class UserBuilding {
//         public attackHeadImg: string;
//         public attackUid: number;
//         public checksum: number;
//         public isShield: boolean;
//         public level: number;
//         public status: number;
//         constructor(data: any) {
//             for (var key in data) {
//                 this[key] = data[key];
//             }
//         }
//     }
// }
// let islandModel: game.IslandModel;
//# sourceMappingURL=IslandModel.js.map