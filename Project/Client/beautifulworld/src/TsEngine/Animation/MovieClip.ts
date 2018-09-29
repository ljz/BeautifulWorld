
namespace TsEngine {
    export class MovieClip extends egret.MovieClip {
        private autoPlay: any;
        private onComplete: Function;
        private thisObject: any;
        private loopCount: number;
        constructor(movieClipData?: egret.MovieClipData, autoPlay: boolean = true) {
            super(movieClipData);
            this.autoPlay = autoPlay;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.COMPLETE, this.onPlayComplete, this);
        }

        public play(loopCount: number = -1, reset: boolean = true, onComplete: Function = null, thisObject: any = null): void {
            this.visible = true;
            this.onComplete = onComplete;
            this.thisObject = thisObject;
            this.loopCount = loopCount;
            if (reset) {
                this.gotoAndStop(0);
            }
            super.play(loopCount);
        }

        /** 销毁 */
        public dispose(): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.removeEventListener(egret.Event.COMPLETE, this.onPlayComplete, this);
        }

        /**添加到舞台*/
        private onAdded(e: egret.Event): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            if (this.autoPlay && this.loopCount == -1) this.play();
        }

        /**移除舞台*/
        private onRemove(e: egret.Event): void {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.stop();
        }

        private onPlayComplete(e: egret.Event): void {
            this.visible = false;
            if (this.onComplete != null) {
                this.onComplete.call(this.thisObject);
            }
        }
    }
}