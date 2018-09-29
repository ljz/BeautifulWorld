
namespace TsEngine {
    export class TipManager {
        private static tipDictionary: HashMap = new HashMap();
        private static stage: egret.Stage;
        private static tipTime: number = 0;
        private static modalBlocker: StageModalBlocker;

        private static currentTipRenderer: Window;
        private static mDefaultAlertType: any;
        private static mDefaultTipType: any;
        private static mDefaultBubbleType: any;
        private static mDefaultTargetTipRender: any;

        //初始化
        public static initialize(stage: egret.Stage, defaultAlertType: new () => IView, defaultTipRender: new () => IView, defaultBubbleRender: new () => IView, defaultTargetTipRender: new () => IView): void {
            TipManager.stage = stage;
            TipManager.mDefaultAlertType = defaultAlertType;
            TipManager.mDefaultTipType = defaultTipRender;
            TipManager.mDefaultBubbleType = defaultBubbleRender;
            TipManager.mDefaultTargetTipRender = defaultTargetTipRender;
            TipManager.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, TipManager.onStageTouch, TipManager);
            TipManager.modalBlocker = StageManager.createStageModalBlocker(null, null, 0, 0.4); (typeof stage)
        }

        //注册tooltip到target
        public static registTargetTip(target: egret.DisplayObjectContainer, tipDataOrFactory: any = null, delay: number = 0, renderer: IView = null): void {
            target.touchChildren = false;
            target.touchEnabled = true;
            TipManager.tipDictionary.put(target, { tip: tipDataOrFactory, delay: delay, renderer: renderer });
        }

        //取消tooltip注册
        public static unRegistTip(target: egret.DisplayObject): void {
            TipManager.tipDictionary.remove(target);
        }

        //提示信息
        public static tip(data: any, delay: number = 2000, renderer: IView = null): void {
            let tipRenderer = renderer || ObjectPool.getObject(TipManager.mDefaultTipType);
            tipRenderer.show(StageManager.getLayer(Layer.TIP), data, null, () => {
                ObjectPool.disposeObject(tipRenderer);
            });
            if (delay > 0)
                TipManager.tipTime = egret.setTimeout(tipRenderer.hide, tipRenderer, delay);
        }

        /**
         * 警告或提示窗口
         * @param data      要提示的数据
         * @param onOk      接受回调
         * @param onCancle  拒绝回调
         * @param thisObj   thisobj
         * @param hasRefuse 是否显示拒绝选项
         * @param renderer  独立render
         */
        public static alert(data: any, onOk?: Function, onCancle?: Function, thisObj?: any, hasRefuse: boolean = true, renderer: IView = null): void {
            let acceptArgs: AlertArg = onOk ? (new AlertArg(onOk, thisObj)) : null;
            let refuseArgs: AlertArg = onCancle ? (new AlertArg(onCancle, thisObj)) : null;
            this.alertWithArgment(data, acceptArgs, refuseArgs, hasRefuse, renderer);
        }

        /**
         * 警告或提示窗口
         * @param data               要提示的数据
         * @param acceptArgs      接受参数[icon:String="a",callBack:Function,thisObj:any]
         * @param refuseArgs      拒绝参数[icon:String="b",callBack:Function,thisObj:any]
         * @param hasRefuse       是否有拒绝选项
         * TipManager.alert(-1,"测试数据测试数据测试数据测试数据"+"<font color='#ff0000'>"+ "测试数据"+"</font>");
         */
        public static alertWithArgment(data: any, acceptArgs?: AlertArg, refuseArgs?: AlertArg, hasRefuse: boolean = true, renderer: IView = null): void {
            var alertVars: any = { data: data, acceptArgs: acceptArgs, refuseArgs: refuseArgs, hasRefuse: hasRefuse };
            if (TipManager.modalBlocker.stage == null)
                StageManager.addToLayer(TipManager.modalBlocker, Layer.TIP);
            let alertRenderer = renderer || ObjectPool.getObject(TipManager.mDefaultAlertType);
            alertRenderer.show(StageManager.getLayer(Layer.TIP), alertVars, null, () => {
                let modalBlocker = TipManager.modalBlocker;
                if (modalBlocker.parent)
                    modalBlocker.parent.removeChild(modalBlocker);
                ObjectPool.disposeObject(alertRenderer);
            });
        }

        /**
         *气泡飘起提示
         * @param container         容器
         * @param data              数据[任意类型]
         * @param target            目标对象
         * @param isCrit            是否暴击显示
         * @param onComplete        冒泡完成
         * TipManager.bubble("测试数据测试数据测试数据测试数据"+"<font color='#ff0000'>"+ "测试数据"+"</font>",null,{isCrit:true});
         */
        public static bubble(data: any, target: egret.DisplayObject = null, onComplete: Function = null, thisObject: any = null, renderer: View = null): void {
            target = target || TipManager.stage;
            renderer = renderer || ObjectPool.getObject(TipManager.mDefaultBubbleType);
            renderer.show(StageManager.getLayer(Layer.TIP), data, null, onComplete, thisObject);
        }

        private static showTip(target: egret.DisplayObject, position: egret.Point, tipDataOrFactory: any = null): void {
            if (TipManager.tipDictionary.containsKey(target)) {
                var tipVars: any = TipManager.tipDictionary.getValue(target);
                let renderer = tipVars.renderer || ObjectPool.getObject(TipManager.mDefaultTargetTipRender);
                tipDataOrFactory = tipDataOrFactory || tipVars.tip;
                if (tipDataOrFactory instanceof Function) {
                    tipDataOrFactory = tipDataOrFactory();
                }

                //计算正确的位置[舞台范围]
                var viewport: egret.Rectangle = renderer.getBounds();
                position.x = Math.min(StageManager.stageWidth - viewport.width - viewport.x, position.x);
                position.y = Math.min(StageManager.stageHeight - viewport.height - viewport.y, position.y);
                position.x = Math.max(-viewport.x, position.x);
                position.y = Math.max(-viewport.y, position.y);
                renderer.x = position.x;
                renderer.y = position.y;
                TipManager.currentTipRenderer = renderer;
                renderer.show(StageManager.getLayer(Layer.TIP), tipDataOrFactory, null, () => {
                    ObjectPool.disposeObject(renderer);
                });
            }
        }

        private static onStageTouch(e: egret.TouchEvent): void {
            let currentTouchPoint = new egret.Point(e.stageX, e.stageY);
            var target: egret.DisplayObject = <egret.DisplayObject>(e.target);
            if (TipManager.currentTipRenderer != null && !TipManager.currentTipRenderer.hitTestPoint(currentTouchPoint.x, currentTouchPoint.y, false)) {
                TipManager.currentTipRenderer.hide();
            }
            if (TipManager.tipDictionary.containsKey(target)) {
                TipManager.showTip(target, currentTouchPoint);
            }
        }
    }

    class AlertArg {
        public icon: string;
        public callBack: Function;
        public thisObj: any;
        constructor(callBack: Function, thisObj?: any, icon?: string) {
            this.callBack = callBack;
            this.thisObj = thisObj;
            this.icon = icon;
        }
    }

}