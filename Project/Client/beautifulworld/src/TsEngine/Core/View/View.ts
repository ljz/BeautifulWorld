

namespace TsEngine {
    export class View extends eui.Component implements IView {

        data: any

        id: number

        effect: IEffect

        bOpen: boolean

        bInitialized: boolean

        resource: ViewResource

        waitFuncList: any[] = [];
        initPartMap: {} = {};

        public load(skinUrl?: string, resGroup?: string, onComplete?: Function, onProgress?: Function, thisObject?: any): void {
            function loadSkin() {
                if (skinUrl != null && this.skinName == null) {
                    ResourceManager.loadSkin(skinUrl, initSkin, this);
                } else {
                    initSkin();
                }
            }

            function initSkin(clazz: any = null, url: string = null) {
                if (clazz != null) {
                    this.skinName = clazz;
                } else {
                    console.warn(this, "not found SkinClass :" + url);
                }
                if (!this.bInitialized) {
                    this.bInitialized = true;
                    this.onInit();
                    for (const key in this.initPartMap) {
                        this.initPartMap[key].init();
                    }
                    if (onComplete != null) onComplete.call(thisObject, this);
                    //初始化完成后需要执行的函数列表
                    if (this.waitFuncList.length > 0) {
                        for (const func of this.waitFuncList) {
                            func();
                        }
                        this.waitFuncList = [];
                    }
                }
            }
        }

        public show(container: egret.DisplayObjectContainer, data?: any, onOpenFunc?: Function, onCloseFunc?: Function, thisObject?: any) {

        }

        public hide(destroy?: boolean) {

        }

        /**准备窗口(主要用于窗口数据的请求回调)*/
        public prepare(onComplete: Function): void {

        }

        //宽高自适应舞台居中
        public centerStage(): void {

        }
        //销毁
        public destroy(): void { }

        /** 窗口打开*/
        public onOpen(): void { }

        /** 窗口关闭[清除状态等]*/
        public onClose(): void { }

        /** 设置数据*/
        public onData(): void { }

        /** 窗口销毁[销毁整个窗口，数据等]*/
        public onDestroy(): void { }

        /**快捷方法*/
        //安全执行（在view初始化完成之后）
        public partAdded(partName: string, instance: any): void { }

        //重置皮肤信息到初始信息
        public resetSkinParts(): void { }

        //设置元素刘海适配
        public setNotchFit(element: egret.DisplayObject): void { }

        public callSafe(func: Function, self?: any): void {
            if (this.bInitialized) {
                func.call(self);
            } else {
                func = self ? func.bind(self) : func;
                this.waitFuncList.push(func);
            }
        }

        public addClick(target: egret.EventDispatcher, callBack: Function, thisObj?: any): void { }

        public removeClick(target: egret.EventDispatcher, callBack: Function, thisObj?: any): void { }

        public removeFromParent(bDestroy: boolean): void { }
    }
}