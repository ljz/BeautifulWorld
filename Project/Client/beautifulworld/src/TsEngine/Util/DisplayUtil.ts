
namespace TsEngine {
    export class DisplayUtil {
        private static helpBounds: egret.Rectangle = new egret.Rectangle();
        //立即刷新，否则需要等到下一帧才会刷新宽高
        public static validateTarget(target: egret.DisplayObject): void {
            if ("validateNow" in target) {
                target["validateNow"]();
            } else if (target["numChildren"]) {
                var container: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>(target);
                var len: number = container.numChildren;
                for (var i = 0; i < len; i++) {
                    var child: egret.DisplayObject = container.getChildAt(i);
                    this.validateTarget(child);
                }
            }
        }

        /**获取有效全局范围*/
        public static getGlobalBounds(target: egret.DisplayObject): egret.Rectangle {
            let bounds = DisplayUtil.helpBounds;
            bounds.setEmpty();
            bounds.setTo(0, 0, target.width, target.height);
            var globalPointTl: egret.Point = target.localToGlobal(bounds.x, bounds.y);
            var globalPointRb: egret.Point = target.localToGlobal(bounds.right, bounds.bottom);
            bounds.x = Math.max(globalPointTl.x, 0);
            bounds.y = Math.max(globalPointTl.y, 0);
            bounds.width = globalPointRb.x - globalPointTl.x;
            bounds.height = globalPointRb.y - globalPointTl.y;

            return bounds;
        }

        //全屏居中
        public static fillCenter(target: egret.DisplayObject, spaceWidth: number, spaceHeight: number, showFull: boolean = true): void {
            var widthRatio: number = spaceWidth / target.width;
            var heightRatio: number = spaceHeight / target.height;
            var scale: number = showFull ? Math.min(widthRatio, heightRatio) : Math.max(widthRatio, heightRatio);
            target.scaleX = scale;
            target.scaleY = scale;
            target.x = (spaceWidth - target.width * target.scaleX) >> 1;
            target.y = (spaceHeight - target.height * target.scaleY) >> 1;
        }

        //使用滤镜灰色
        public static Gray(target: any): void {
            if (!target) return;
            let colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            let colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            target.filters = [colorFlilter];
        }

        //投影滤镜
        public static DropShadow(target: any): void {
            var distance: number = 10;           /// 阴影的偏移距离，以像素为单位
            var angle: number = 90;              /// 阴影的角度，0 到 360 度
            var color: number = 0x000000;        /// 阴影的颜色，不包含透明度
            var alpha: number = 0.7;             /// 光晕的颜色透明度，是对 color 参数的透明度设定
            var blurX: number = 16;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
            var blurY: number = 16;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
            var strength: number = 0.65;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
            var quality: number = egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
            var inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
            var knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
            var dropShadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(distance, angle, color, alpha, blurX, blurY,
                strength, quality, inner, knockout);

            target.filters = [dropShadowFilter];
        }
    }
}