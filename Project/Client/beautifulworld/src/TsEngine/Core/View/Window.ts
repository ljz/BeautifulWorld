


namespace TsEngine {

    export class Window extends View implements IWindow {
        public backGroundContent: egret.Bitmap;
        private autoCenter: boolean;
        constructor(autoCenter: boolean = true) {
            super();
            this.autoCenter = autoCenter;
            this.touchEnabled = true;
        }

        public load(skinUrl?: string, resGroup?: string, onComplete?: Function, onProgress?: Function, thisObject?: any): void {
            super.load(skinUrl, resGroup, () => {
                if (this.skin) {
                    StageManager.addResizeListener(() => {
                        if (this.autoCenter)
                            this.centerStage();
                        this.onResize();
                    }, this)
                }
                if (onComplete != null) onComplete.call(thisObject, this);
            }, onProgress, thisObject);
        }

        /** 窗口尺寸变化*/
        protected onResize(): void {

        }

        public set backGround(value: any) {
            ResourceManager.loadResource(value, onGetResource, this);

            function onGetResource(content: egret.Texture): void {
                if (this.backGroundContent == null) {
                    this.backGroundContent = new egret.Bitmap();
                    this.addChildAt(this.backGroundContent, 0);
                }
                this.backGroundContent.texture = content;
                this.validate();
            }
        }

    }
}
