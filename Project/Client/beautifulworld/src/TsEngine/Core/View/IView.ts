
namespace TsEngine {
    export interface IView {

        data: any;

        id: number;

        effect: IEffect;

        bOpen: boolean;

        bInitialized: boolean;

        resource: ViewResource;

        load(skinUrl?: string, resGroup?: string, onComplete?: Function, onProgress?: Function, thisObject?: any);

        show(container: egret.DisplayObjectContainer, data?: any, onOpenFunc?: Function, onCloseFunc?: Function, thisObject?: any);

        hide(destroy?: boolean);



        /**准备窗口(主要用于窗口数据的请求回调)*/
        prepare(onComplete: Function): void;

        //宽高自适应舞台居中
        centerStage(): void
        //销毁
        destroy(): void;

        /** 窗口打开*/
        onOpen(): void;

        /** 窗口关闭[清除状态等]*/
        onClose(): void;

        /** 设置数据*/
        onData(): void;

        /** 窗口销毁[销毁整个窗口，数据等]*/
        onDestroy(): void;

        /**快捷方法*/
        //安全执行（在view初始化完成之后）
        partAdded(partName: string, instance: any): void;

        //重置皮肤信息到初始信息
        resetSkinParts(): void;

        //设置元素刘海适配
        setNotchFit(element: egret.DisplayObject): void;

        callSafe(func: Function, thisObj?: any): void;

        addClick(target: egret.EventDispatcher, callBack: Function, thisObj?: any): void;

        removeClick(target: egret.EventDispatcher, callBack: Function, thisObj?: any): void;

        removeFromParent(bDestroy: boolean): void;
    }
}