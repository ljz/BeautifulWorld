

namespace TsEngine {
    export class ItemRenderer extends eui.ItemRenderer {
        private agent: View;
        constructor() {
            super();
            this.agent = new View();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.resetSkinParts, this);
        }

        //加载
        public load(skinUrl?: string, resGroup?: string, onComplete?: Function, onProgress?: Function, thisObject?: any): void {
            this.agent.load(skinUrl, resGroup, onComplete, onProgress, thisObject);
        }

        //数据设置
        protected dataChanged() {
            this.callSafe(() => {
                this.agent.data = this.data;
                this.invalidateState();
            });
        }

        public get isInitialized(): boolean {
            return this.agent.bInitialized;
        }

        /**
         * 初始化【每个窗口有且仅有一次】
         */
        protected onInit(): void {

        }

        /** 设置数据*/
        protected onData(): void {

        }

        /** 打开node*/
        protected onOpen(): void {

        }

        /** 关闭node*/
        protected onClose(): void {

        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
            this.agent.partAdded(partName, instance);
        }

        /**快捷方法*/
        //重置皮肤信息到初始信息
        public resetSkinParts(): void {
            this.agent.resetSkinParts();
        }

        //安全执行（在view初始化完成之后）
        public callSafe(func: Function, thisObj?: any): void {
            this.agent.callSafe(func, thisObj);
        }

        public addClick(target: egret.EventDispatcher, callBack: Function, thisObj?: any): void {
            this.agent.addClick(target, callBack, thisObj);
        }

        public removeClick(target: egret.EventDispatcher, callBack: Function, thisObj?: any): void {
            this.agent.removeClick(target, callBack, thisObj);
        }

        public removeFromParent(dispose: boolean = false): void {
            this.agent.removeFromParent(dispose);
        }
    }
}