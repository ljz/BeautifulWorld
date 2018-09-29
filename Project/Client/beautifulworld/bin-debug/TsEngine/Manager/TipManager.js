var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var TipManager = (function () {
        function TipManager() {
        }
        //初始化
        TipManager.initialize = function (stage, defaultAlertType, defaultTipRender, defaultBubbleRender, defaultTargetTipRender) {
            TipManager.stage = stage;
            TipManager.mDefaultAlertType = defaultAlertType;
            TipManager.mDefaultTipType = defaultTipRender;
            TipManager.mDefaultBubbleType = defaultBubbleRender;
            TipManager.mDefaultTargetTipRender = defaultTargetTipRender;
            TipManager.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, TipManager.onStageTouch, TipManager);
            TipManager.modalBlocker = TsEngine.StageManager.createStageModalBlocker(null, null, 0, 0.4);
            (typeof stage);
        };
        //注册tooltip到target
        TipManager.registTargetTip = function (target, tipDataOrFactory, delay, renderer) {
            if (tipDataOrFactory === void 0) { tipDataOrFactory = null; }
            if (delay === void 0) { delay = 0; }
            if (renderer === void 0) { renderer = null; }
            target.touchChildren = false;
            target.touchEnabled = true;
            TipManager.tipDictionary.put(target, { tip: tipDataOrFactory, delay: delay, renderer: renderer });
        };
        //取消tooltip注册
        TipManager.unRegistTip = function (target) {
            TipManager.tipDictionary.remove(target);
        };
        //提示信息
        TipManager.tip = function (data, delay, renderer) {
            if (delay === void 0) { delay = 2000; }
            if (renderer === void 0) { renderer = null; }
            var tipRenderer = renderer || TsEngine.ObjectPool.getObject(TipManager.mDefaultTipType);
            tipRenderer.show(TsEngine.StageManager.getLayer(TsEngine.Layer.TIP), data, null, function () {
                TsEngine.ObjectPool.disposeObject(tipRenderer);
            });
            if (delay > 0)
                TipManager.tipTime = egret.setTimeout(tipRenderer.hide, tipRenderer, delay);
        };
        /**
         * 警告或提示窗口
         * @param data      要提示的数据
         * @param onOk      接受回调
         * @param onCancle  拒绝回调
         * @param thisObj   thisobj
         * @param hasRefuse 是否显示拒绝选项
         * @param renderer  独立render
         */
        TipManager.alert = function (data, onOk, onCancle, thisObj, hasRefuse, renderer) {
            if (hasRefuse === void 0) { hasRefuse = true; }
            if (renderer === void 0) { renderer = null; }
            var acceptArgs = onOk ? (new AlertArg(onOk, thisObj)) : null;
            var refuseArgs = onCancle ? (new AlertArg(onCancle, thisObj)) : null;
            this.alertWithArgment(data, acceptArgs, refuseArgs, hasRefuse, renderer);
        };
        /**
         * 警告或提示窗口
         * @param data               要提示的数据
         * @param acceptArgs      接受参数[icon:String="a",callBack:Function,thisObj:any]
         * @param refuseArgs      拒绝参数[icon:String="b",callBack:Function,thisObj:any]
         * @param hasRefuse       是否有拒绝选项
         * TipManager.alert(-1,"测试数据测试数据测试数据测试数据"+"<font color='#ff0000'>"+ "测试数据"+"</font>");
         */
        TipManager.alertWithArgment = function (data, acceptArgs, refuseArgs, hasRefuse, renderer) {
            if (hasRefuse === void 0) { hasRefuse = true; }
            if (renderer === void 0) { renderer = null; }
            var alertVars = { data: data, acceptArgs: acceptArgs, refuseArgs: refuseArgs, hasRefuse: hasRefuse };
            if (TipManager.modalBlocker.stage == null)
                TsEngine.StageManager.addToLayer(TipManager.modalBlocker, TsEngine.Layer.TIP);
            var alertRenderer = renderer || TsEngine.ObjectPool.getObject(TipManager.mDefaultAlertType);
            alertRenderer.show(TsEngine.StageManager.getLayer(TsEngine.Layer.TIP), alertVars, null, function () {
                var modalBlocker = TipManager.modalBlocker;
                if (modalBlocker.parent)
                    modalBlocker.parent.removeChild(modalBlocker);
                TsEngine.ObjectPool.disposeObject(alertRenderer);
            });
        };
        /**
         *气泡飘起提示
         * @param container         容器
         * @param data              数据[任意类型]
         * @param target            目标对象
         * @param isCrit            是否暴击显示
         * @param onComplete        冒泡完成
         * TipManager.bubble("测试数据测试数据测试数据测试数据"+"<font color='#ff0000'>"+ "测试数据"+"</font>",null,{isCrit:true});
         */
        TipManager.bubble = function (data, target, onComplete, thisObject, renderer) {
            if (target === void 0) { target = null; }
            if (onComplete === void 0) { onComplete = null; }
            if (thisObject === void 0) { thisObject = null; }
            if (renderer === void 0) { renderer = null; }
            target = target || TipManager.stage;
            renderer = renderer || TsEngine.ObjectPool.getObject(TipManager.mDefaultBubbleType);
            renderer.show(TsEngine.StageManager.getLayer(TsEngine.Layer.TIP), data, null, onComplete, thisObject);
        };
        TipManager.showTip = function (target, position, tipDataOrFactory) {
            if (tipDataOrFactory === void 0) { tipDataOrFactory = null; }
            if (TipManager.tipDictionary.containsKey(target)) {
                var tipVars = TipManager.tipDictionary.getValue(target);
                var renderer_1 = tipVars.renderer || TsEngine.ObjectPool.getObject(TipManager.mDefaultTargetTipRender);
                tipDataOrFactory = tipDataOrFactory || tipVars.tip;
                if (tipDataOrFactory instanceof Function) {
                    tipDataOrFactory = tipDataOrFactory();
                }
                //计算正确的位置[舞台范围]
                var viewport = renderer_1.getBounds();
                position.x = Math.min(TsEngine.StageManager.stageWidth - viewport.width - viewport.x, position.x);
                position.y = Math.min(TsEngine.StageManager.stageHeight - viewport.height - viewport.y, position.y);
                position.x = Math.max(-viewport.x, position.x);
                position.y = Math.max(-viewport.y, position.y);
                renderer_1.x = position.x;
                renderer_1.y = position.y;
                TipManager.currentTipRenderer = renderer_1;
                renderer_1.show(TsEngine.StageManager.getLayer(TsEngine.Layer.TIP), tipDataOrFactory, null, function () {
                    TsEngine.ObjectPool.disposeObject(renderer_1);
                });
            }
        };
        TipManager.onStageTouch = function (e) {
            var currentTouchPoint = new egret.Point(e.stageX, e.stageY);
            var target = (e.target);
            if (TipManager.currentTipRenderer != null && !TipManager.currentTipRenderer.hitTestPoint(currentTouchPoint.x, currentTouchPoint.y, false)) {
                TipManager.currentTipRenderer.hide();
            }
            if (TipManager.tipDictionary.containsKey(target)) {
                TipManager.showTip(target, currentTouchPoint);
            }
        };
        TipManager.tipDictionary = new TsEngine.HashMap();
        TipManager.tipTime = 0;
        return TipManager;
    }());
    TsEngine.TipManager = TipManager;
    __reflect(TipManager.prototype, "TsEngine.TipManager");
    var AlertArg = (function () {
        function AlertArg(callBack, thisObj, icon) {
            this.callBack = callBack;
            this.thisObj = thisObj;
            this.icon = icon;
        }
        return AlertArg;
    }());
    __reflect(AlertArg.prototype, "AlertArg");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=TipManager.js.map