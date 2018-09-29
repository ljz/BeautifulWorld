


namespace TsEngine {
    export enum Layer {
        BG,
        SCREEN,
        FACEUI,
        WINDOW,
        TOP,
        TIP
    }
    export class StageManager {
        public static stage: egret.Stage;
        public static scaleFactor: number = 1;
        public static root: egret.DisplayObjectContainer;
        private static resizeTimer: number;
        private static resizeListeners: Array<Object> = new Array<Object>();
        public static stageOffHeight: number = 0;

        /**开始构建*/
        public static initialize(stage: egret.Stage, root: egret.DisplayObjectContainer): void {
            StageManager.stage = stage;
            StageManager.root = root;
            stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            window.onresize = () => {
                StageManager.resizeTimer = egret.setTimeout(this.onStageResize, this, 300);
            };
            window.onerror = (errorMessage, scriptURI, lineNumber) => {
                console.error(this, errorMessage, scriptURI, lineNumber);
            };
            /**创建默认层级*/
            let index = 0;
            for (var enumMember in Layer) {
                if (isNaN(parseInt(enumMember))) {
                    this.addLayer(index, enumMember)
                    index++;
                }
            }
            //第一次执行
            this.onStageResize();
        }

        /**
         * 添加层
         * @param	layerIndex
         * @param	layerName
         */
        public static addLayer(layerIndex: number = -1, layerName: string): void {
            layerIndex = layerIndex == -1 ? this.root.numChildren : layerIndex;
            let layer = <egret.Sprite>(this.root.addChildAt(new egret.Sprite(), layerIndex));
            layer.name = layerName;
        }


        /**
         * 添加显示对象到对应层
         * @param	target
         * @param	layerName
         */
        public static addToLayer(target: egret.DisplayObject, layerName: any): void {
            var layer: egret.DisplayObjectContainer = this.getLayer(layerName);
            if (layer != null && target != null) {
                this.showDisplayObject(target, layer);
            }
        }

        /**
         * 从层中移除显示对象
         * @param	target
         * @param	layerName
         */
        public static removeFromLayer(target: egret.DisplayObject, layerName: any): void {
            var layer: egret.DisplayObjectContainer = this.getLayer(layerName);
            if (layer != null && target != null) {
                this.hideDisplayObject(target, layer);
            }
        }

        public static getLayer(layerName: any): egret.DisplayObjectContainer {
            layerName = typeof (layerName) == "number" ? Layer[layerName] : layerName;
            var layer: egret.DisplayObject = this.root.getChildByName(layerName);
            if (layer)
                return <egret.DisplayObjectContainer><any>layer;

            return null;
        }

        public static showLayer(layerName: any): void {
            this.getLayer(layerName).visible = true;
        }

        public static hideLayer(layerName: any): void {
            this.getLayer(layerName).visible = false;
        }

        private static showDisplayObject(target: egret.DisplayObject, layer: egret.DisplayObjectContainer): void {
            if (target.parent == layer) {
                layer.setChildIndex(target, layer.numChildren - 1);
            } else {
                layer.addChild(target);
            }
        }

        private static hideDisplayObject(target: egret.DisplayObject, layer: egret.DisplayObjectContainer): void {
            if (target.parent == layer) {
                layer.removeChild(target);
            }
        }

        /**
        * 创建一个舞台模态蒙板
        * @param onTouch             点击蒙板回调
        * @param modalColor          蒙板颜色
        * @param modalAlpha         蒙板透明度
        */
        public static createStageModalBlocker(onTouch: Function = null, thisObject: any = null, modalColor: number = 0x0, modalAlpha: number = 0.6): StageModalBlocker {
            var blocker: StageModalBlocker = new StageModalBlocker(onTouch, thisObject, modalColor, modalAlpha);
            return blocker;
        }

        /**舞台宽高*/
        public static get stageWidth(): number {
            return StageManager.stage.stageWidth;
        }

        public static get stageHeight(): number {
            return StageManager.stage.stageHeight;
        }

        /**
         * 添加自适应处理函数
         * @param	target           目标对象
         * @param	listener　　　处理函数
         */
        public static addResizeListener(listener: Function, thisObject: any): void {
            if (this.getCallBackIndex(StageManager.resizeListeners, listener, thisObject) == -1) {
                StageManager.resizeListeners.push({ func: listener, thisObject: thisObject });
                listener.call(thisObject);
            }
        }

        /**
         * 删除自适应处理函数
         * @param	target           目标对象
         * @param	listener　　　处理函数
         */
        public static removeResizeListener(listener: Function, thisObject: any): void {
            var index: number = this.getCallBackIndex(StageManager.resizeListeners, listener, thisObject);
            if (index != -1)
                StageManager.resizeListeners.splice(index, 1);
        }

        /**屏幕尺寸发生变化*/
        private static onStageResize(e: egret.Event = null): void {
            this.resizeTimer = null;
            //其他处理
            for (var j = 0; j < StageManager.resizeListeners.length; j++) {
                var obj: Object = StageManager.resizeListeners[j];
                var listener: Function = obj["func"];
                var thisObject: any = obj["thisObject"];
                listener.call(thisObject);
            }
        }

        private static getCallBackIndex(callBacks: Array<any>, callback: Function, thisObject: any): number {
            var len: number = callBacks.length;
            for (var i = 0; i < len; i++) {
                var callObj: Object = callBacks[i];
                if ((callObj["func"] === callback) && (callObj["thisObject"] === thisObject)) {
                    return i;
                }
            }
            return -1;
        }
    }

    /**舞台模态板*/
    export class StageModalBlocker extends eui.Rect {
        private onTouch: Function;
        private thisObject: any;
        constructor(onTouch: Function = null, thisObject: any = null, modalColor: number = 0x0, modalAlpha: number = 0.6) {
            super(10, 10, modalColor);
            this.touchEnabled = true;
            this.thisObject = thisObject;
            this.onTouch = onTouch;
            this.alpha = modalAlpha;
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onBlockTouch, this, false);
            StageManager.addResizeListener(this.onResize, this);
        }

        public removeFromParent(dispose: boolean = false): void {
            if (this.stage) {
                this.parent.removeChild(this);
            }
        }

        private onResize(): void {
            this.scaleX = StageManager.stageWidth / this.width;
            this.scaleY = StageManager.stageHeight / this.height;
        }

        private onBlockTouch(e: egret.TouchEvent): void {
            if (this.onTouch != null)
                this.onTouch.call(this.thisObject);
        }
    }
}