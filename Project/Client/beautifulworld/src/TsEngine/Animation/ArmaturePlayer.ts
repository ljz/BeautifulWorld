
namespace TsEngine {
    export class ArmaturePlayer extends egret.DisplayObjectContainer {
        private armatureName: string;
        private armature: dragonBones.Armature;
        private display: dragonBones.EgretArmatureDisplay;
        private dragonbonesFactory: dragonBones.EgretFactory
        private dragonJson: string;
        private textureJson: string;
        private texturePng: string;
        private currentActionName: string;
        private currentActionCount: number;
        private totalActionCount: number;
        private onPlayComplete: Function;
        private thisObj: any;
        private isLoading: boolean = false;
        private onLoadCallBacks: Array<any>;
        private static isClockInited: boolean = false;
        constructor(rootPath: string) {
            super();
            var paths: string[] = rootPath.split("/");
            var name = paths[paths.length - 1];
            this.armatureName = "armature_" + name;
            this.dragonJson = rootPath + "/ske.json";
            this.textureJson = rootPath + "/tex.json";
            this.texturePng = rootPath + "/tex.png";
            //如果此资源有键值，但未在group中，动态创建
            let group = [];
            group.push({ url: this.dragonJson, type: RES.ResourceItem.TYPE_JSON });
            group.push({ url: this.textureJson, type: RES.ResourceItem.TYPE_JSON });
            group.push({ url: this.texturePng, type: RES.ResourceItem.TYPE_IMAGE });
            ResourceManager.createGroup(this.armatureName, group);
            this.onLoadCallBacks = new Array<any>();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.stop, this);
        }

        //加载
        public load(onComplete?: Function, thisObject?: any) {
            if (!this.armature) {
                if (onComplete != null) {
                    this.onLoadCallBacks.push({ func: onComplete, obj: thisObject });
                }
                if (!this.isLoading) {
                    this.isLoading = true;
                    ResourceManager.loadGroup(this.armatureName, () => {
                        this.buildArmature();
                        while (this.onLoadCallBacks.length) {
                            const element = this.onLoadCallBacks.shift();
                            element.func.call(element.obj);
                        }
                    }, (reason) => {
                        if (this.onPlayComplete) {
                            this.onPlayComplete.call(this.thisObj);
                        }
                    });
                }
            } else {
                onComplete.call(thisObject);
            }
        }

        //播放(0是循环播放)
        public play(actionName: string, times: number = 1, onComplete?: Function, thisObj?: any, onStart?: Function, startFrame: number = 0) {
            this.currentActionName = actionName;
            this.currentActionCount = 0;
            this.onPlayComplete = onComplete;
            this.totalActionCount = times;
            this.thisObj = thisObj;
            if (this.armature) {
                this.initDragonClock();
                if (!dragonBones.WorldClock.clock.contains(this.armature)) {
                    dragonBones.WorldClock.clock.add(this.armature);
                }
                onStart && onStart.call(thisObj);
                this.display.animation.gotoAndPlayByFrame(actionName, startFrame, times);
            } else {
                this.load(() => {
                    this.play(actionName, times, onComplete, thisObj, onStart, startFrame);
                }, this);
            }
        }

        //初始化龙骨全局时钟
        private initDragonClock(): void {
            let lastTime: number;
            if (!ArmaturePlayer.isClockInited) {
                ArmaturePlayer.isClockInited = true;
                egret.startTick((timeStamp: number): boolean => {
                    if (!lastTime) lastTime = timeStamp;
                    let passTime = timeStamp - lastTime;
                    lastTime = timeStamp;
                    dragonBones.WorldClock.clock.advanceTime(passTime / 1000);
                    return false;
                }, StageManager.stage);
            }
        }

        //停止播放
        public stop(): void {
            if (this.armature) {
                if (this.armature && this.currentActionName) {
                    this.armature.animation.stop(this.currentActionName);
                    dragonBones.WorldClock.clock.remove(this.armature);
                }
            } else {
                this.load(() => {
                    this.stop();
                }, this);
            }
        }

        //彻底释放
        public dispose(disposeData: boolean = false): void {
            this.stop();
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.stop, this);
            if (this.armature) {
                this.armature.eventDispatcher.removeDBEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.loopComplete, this);
                this.armature.dispose();
                this.armature = null;
                this.dragonbonesFactory.clear(disposeData);
                this.dragonbonesFactory = null;
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        /**
         * 设置骨骼卡槽的皮肤
         * @param {string} slotName 卡槽名称
         * @param {string} res 纹理资源
         */
        public setSlotSkin(slotName: string, res: string): void {
            if (this.armature) {
                ResourceManager.loadResource(res, (data) => {
                    replace.call(this, data);
                }, this, RES.ResourceItem.TYPE_IMAGE);
            } else {
                this.load(() => {
                    this.setSlotSkin(slotName, res);
                }, this);
            }


            function replace(slotTexture: egret.Texture) {
                let slot: dragonBones.Slot = this.armature.getSlot(slotName);
                if (slot) {
                    let b: egret.Bitmap = new egret.Bitmap();
                    b.texture = slotTexture;
                    b.x = slot.display.x;
                    b.y = slot.display.y;
                    b.width = slot.display.width;
                    b.height = slot.display.height;
                    b.anchorOffsetX = b.width >> 1;
                    b.anchorOffsetY = b.height >> 1;
                    slot.display = b;
                } else {
                    console.error("ArmaturePlayer getSlot not found:" + this.armatureName + "," + slotName);
                }
            }
        }

        //设置插槽骨骼
        public setSlotArmature(slotName: string, armature: any) {
            if (this.armature) {
                var slot: dragonBones.Slot = this.armature.getSlot(slotName);
                slot.childArmature = armature;
            } else {
                this.load(() => {
                    this.setSlotArmature(slotName, armature);
                }, this);
            }
        }

        //获取骨骼插槽
        public getSlotArmature(slotName: string): dragonBones.Slot {
            if (this.armature) {
                let slot: dragonBones.Slot = this.armature.getSlot(slotName);
                return slot;
            }

            return null;
        }

        //构建
        private buildArmature(): void {
            var dragonbonesData = RES.getRes(this.dragonJson);
            var textureData = RES.getRes(this.textureJson);
            var texture = RES.getRes(this.texturePng);

            this.dragonbonesFactory = new dragonBones.EgretFactory();
            this.dragonbonesFactory.parseDragonBonesData(dragonbonesData);
            this.dragonbonesFactory.parseTextureAtlasData(textureData, texture);

            this.display = this.dragonbonesFactory.buildArmatureDisplay(dragonbonesData.armature[0].name);
            this.armature = this.display.armature;

            this.addChild(this.display);
            //console.log(`buildArmature name = ${this.armatureName}  width = ${this.armature.display.width}  height = ${this.armature.display.height}`);
            this.display.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.loopComplete, this);
        }

        //播放侦听
        private loopComplete(evt: dragonBones.EgretEvent) {
            if (this.currentActionCount > 0) {
                this.currentActionCount++;
                if (this.currentActionCount >= this.totalActionCount) {
                    if (this.onPlayComplete) {
                        this.onPlayComplete.call(this.thisObj, evt);
                    }
                }
            } else {
                if (this.onPlayComplete) {
                    this.onPlayComplete.call(this.thisObj, evt);
                }
            }
        }

        //获取当前播放的龙骨动画名字
        public getActionName(): string {
            return this.currentActionName;
        }

        public arAddListener(type: string, listener: Function, thisObject: any) {
            this.armature.eventDispatcher.addDBEventListener(type, listener, thisObject)
        }

    }
}