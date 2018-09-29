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
var TsEngine;
(function (TsEngine) {
    var ArmaturePlayer = (function (_super) {
        __extends(ArmaturePlayer, _super);
        function ArmaturePlayer(rootPath) {
            var _this = _super.call(this) || this;
            _this.isLoading = false;
            var paths = rootPath.split("/");
            var name = paths[paths.length - 1];
            _this.armatureName = "armature_" + name;
            _this.dragonJson = rootPath + "/ske.json";
            _this.textureJson = rootPath + "/tex.json";
            _this.texturePng = rootPath + "/tex.png";
            //如果此资源有键值，但未在group中，动态创建
            var group = [];
            group.push({ url: _this.dragonJson, type: RES.ResourceItem.TYPE_JSON });
            group.push({ url: _this.textureJson, type: RES.ResourceItem.TYPE_JSON });
            group.push({ url: _this.texturePng, type: RES.ResourceItem.TYPE_IMAGE });
            TsEngine.ResourceManager.createGroup(_this.armatureName, group);
            _this.onLoadCallBacks = new Array();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.stop, _this);
            return _this;
        }
        //加载
        ArmaturePlayer.prototype.load = function (onComplete, thisObject) {
            var _this = this;
            if (!this.armature) {
                if (onComplete != null) {
                    this.onLoadCallBacks.push({ func: onComplete, obj: thisObject });
                }
                if (!this.isLoading) {
                    this.isLoading = true;
                    TsEngine.ResourceManager.loadGroup(this.armatureName, function () {
                        _this.buildArmature();
                        while (_this.onLoadCallBacks.length) {
                            var element = _this.onLoadCallBacks.shift();
                            element.func.call(element.obj);
                        }
                    }, function (reason) {
                        if (_this.onPlayComplete) {
                            _this.onPlayComplete.call(_this.thisObj);
                        }
                    });
                }
            }
            else {
                onComplete.call(thisObject);
            }
        };
        //播放(0是循环播放)
        ArmaturePlayer.prototype.play = function (actionName, times, onComplete, thisObj, onStart, startFrame) {
            var _this = this;
            if (times === void 0) { times = 1; }
            if (startFrame === void 0) { startFrame = 0; }
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
            }
            else {
                this.load(function () {
                    _this.play(actionName, times, onComplete, thisObj, onStart, startFrame);
                }, this);
            }
        };
        //初始化龙骨全局时钟
        ArmaturePlayer.prototype.initDragonClock = function () {
            var lastTime;
            if (!ArmaturePlayer.isClockInited) {
                ArmaturePlayer.isClockInited = true;
                egret.startTick(function (timeStamp) {
                    if (!lastTime)
                        lastTime = timeStamp;
                    var passTime = timeStamp - lastTime;
                    lastTime = timeStamp;
                    dragonBones.WorldClock.clock.advanceTime(passTime / 1000);
                    return false;
                }, TsEngine.StageManager.stage);
            }
        };
        //停止播放
        ArmaturePlayer.prototype.stop = function () {
            var _this = this;
            if (this.armature) {
                if (this.armature && this.currentActionName) {
                    this.armature.animation.stop(this.currentActionName);
                    dragonBones.WorldClock.clock.remove(this.armature);
                }
            }
            else {
                this.load(function () {
                    _this.stop();
                }, this);
            }
        };
        //彻底释放
        ArmaturePlayer.prototype.dispose = function (disposeData) {
            if (disposeData === void 0) { disposeData = false; }
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
        };
        /**
         * 设置骨骼卡槽的皮肤
         * @param {string} slotName 卡槽名称
         * @param {string} res 纹理资源
         */
        ArmaturePlayer.prototype.setSlotSkin = function (slotName, res) {
            var _this = this;
            if (this.armature) {
                TsEngine.ResourceManager.loadResource(res, function (data) {
                    replace.call(_this, data);
                }, this, RES.ResourceItem.TYPE_IMAGE);
            }
            else {
                this.load(function () {
                    _this.setSlotSkin(slotName, res);
                }, this);
            }
            function replace(slotTexture) {
                var slot = this.armature.getSlot(slotName);
                if (slot) {
                    var b = new egret.Bitmap();
                    b.texture = slotTexture;
                    b.x = slot.display.x;
                    b.y = slot.display.y;
                    b.width = slot.display.width;
                    b.height = slot.display.height;
                    b.anchorOffsetX = b.width >> 1;
                    b.anchorOffsetY = b.height >> 1;
                    slot.display = b;
                }
                else {
                    console.error("ArmaturePlayer getSlot not found:" + this.armatureName + "," + slotName);
                }
            }
        };
        //设置插槽骨骼
        ArmaturePlayer.prototype.setSlotArmature = function (slotName, armature) {
            var _this = this;
            if (this.armature) {
                var slot = this.armature.getSlot(slotName);
                slot.childArmature = armature;
            }
            else {
                this.load(function () {
                    _this.setSlotArmature(slotName, armature);
                }, this);
            }
        };
        //获取骨骼插槽
        ArmaturePlayer.prototype.getSlotArmature = function (slotName) {
            if (this.armature) {
                var slot = this.armature.getSlot(slotName);
                return slot;
            }
            return null;
        };
        //构建
        ArmaturePlayer.prototype.buildArmature = function () {
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
        };
        //播放侦听
        ArmaturePlayer.prototype.loopComplete = function (evt) {
            if (this.currentActionCount > 0) {
                this.currentActionCount++;
                if (this.currentActionCount >= this.totalActionCount) {
                    if (this.onPlayComplete) {
                        this.onPlayComplete.call(this.thisObj, evt);
                    }
                }
            }
            else {
                if (this.onPlayComplete) {
                    this.onPlayComplete.call(this.thisObj, evt);
                }
            }
        };
        //获取当前播放的龙骨动画名字
        ArmaturePlayer.prototype.getActionName = function () {
            return this.currentActionName;
        };
        ArmaturePlayer.prototype.arAddListener = function (type, listener, thisObject) {
            this.armature.eventDispatcher.addDBEventListener(type, listener, thisObject);
        };
        ArmaturePlayer.isClockInited = false;
        return ArmaturePlayer;
    }(egret.DisplayObjectContainer));
    TsEngine.ArmaturePlayer = ArmaturePlayer;
    __reflect(ArmaturePlayer.prototype, "TsEngine.ArmaturePlayer");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=ArmaturePlayer.js.map