var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var DisplayUtil = (function () {
        function DisplayUtil() {
        }
        //立即刷新，否则需要等到下一帧才会刷新宽高
        DisplayUtil.validateTarget = function (target) {
            if ("validateNow" in target) {
                target["validateNow"]();
            }
            else if (target["numChildren"]) {
                var container = (target);
                var len = container.numChildren;
                for (var i = 0; i < len; i++) {
                    var child = container.getChildAt(i);
                    this.validateTarget(child);
                }
            }
        };
        /**获取有效全局范围*/
        DisplayUtil.getGlobalBounds = function (target) {
            var bounds = DisplayUtil.helpBounds;
            bounds.setEmpty();
            bounds.setTo(0, 0, target.width, target.height);
            var globalPointTl = target.localToGlobal(bounds.x, bounds.y);
            var globalPointRb = target.localToGlobal(bounds.right, bounds.bottom);
            bounds.x = Math.max(globalPointTl.x, 0);
            bounds.y = Math.max(globalPointTl.y, 0);
            bounds.width = globalPointRb.x - globalPointTl.x;
            bounds.height = globalPointRb.y - globalPointTl.y;
            return bounds;
        };
        //全屏居中
        DisplayUtil.fillCenter = function (target, spaceWidth, spaceHeight, showFull) {
            if (showFull === void 0) { showFull = true; }
            var widthRatio = spaceWidth / target.width;
            var heightRatio = spaceHeight / target.height;
            var scale = showFull ? Math.min(widthRatio, heightRatio) : Math.max(widthRatio, heightRatio);
            target.scaleX = scale;
            target.scaleY = scale;
            target.x = (spaceWidth - target.width * target.scaleX) >> 1;
            target.y = (spaceHeight - target.height * target.scaleY) >> 1;
        };
        //使用滤镜灰色
        DisplayUtil.Gray = function (target) {
            if (!target)
                return;
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            target.filters = [colorFlilter];
        };
        //投影滤镜
        DisplayUtil.DropShadow = function (target) {
            var distance = 10; /// 阴影的偏移距离，以像素为单位
            var angle = 90; /// 阴影的角度，0 到 360 度
            var color = 0x000000; /// 阴影的颜色，不包含透明度
            var alpha = 0.7; /// 光晕的颜色透明度，是对 color 参数的透明度设定
            var blurX = 16; /// 水平模糊量。有效值为 0 到 255.0（浮点）
            var blurY = 16; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
            var strength = 0.65; /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
            var quality = 1 /* LOW */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
            var inner = false; /// 指定发光是否为内侧发光，暂未实现
            var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
            var dropShadowFilter = new egret.DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout);
            target.filters = [dropShadowFilter];
        };
        DisplayUtil.helpBounds = new egret.Rectangle();
        return DisplayUtil;
    }());
    TsEngine.DisplayUtil = DisplayUtil;
    __reflect(DisplayUtil.prototype, "TsEngine.DisplayUtil");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=DisplayUtil.js.map