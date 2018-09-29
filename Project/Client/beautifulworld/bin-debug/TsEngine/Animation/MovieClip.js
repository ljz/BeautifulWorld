var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TsEngine;
(function (TsEngine) {
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip(movieClipData, autoPlay) {
            if (autoPlay === void 0) { autoPlay = true; }
            var _this = _super.call(this, movieClipData) || this;
            _this.autoPlay = autoPlay;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
            _this.addEventListener(egret.Event.COMPLETE, _this.onPlayComplete, _this);
            return _this;
        }
        MovieClip.prototype.play = function (loopCount, reset, onComplete, thisObject) {
            if (loopCount === void 0) { loopCount = -1; }
            if (reset === void 0) { reset = true; }
            if (onComplete === void 0) { onComplete = null; }
            if (thisObject === void 0) { thisObject = null; }
            this.visible = true;
            this.onComplete = onComplete;
            this.thisObject = thisObject;
            this.loopCount = loopCount;
            if (reset) {
                this.gotoAndStop(0);
            }
            _super.prototype.play.call(this, loopCount);
        };
        /** 销毁 */
        MovieClip.prototype.dispose = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.removeEventListener(egret.Event.COMPLETE, this.onPlayComplete, this);
        };
        /**添加到舞台*/
        MovieClip.prototype.onAdded = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            if (this.autoPlay && this.loopCount == -1)
                this.play();
        };
        /**移除舞台*/
        MovieClip.prototype.onRemove = function (e) {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.stop();
        };
        MovieClip.prototype.onPlayComplete = function (e) {
            this.visible = false;
            if (this.onComplete != null) {
                this.onComplete.call(this.thisObject);
            }
        };
        return MovieClip;
    }(egret.MovieClip));
    TsEngine.MovieClip = MovieClip;
    __reflect(MovieClip.prototype, "TsEngine.MovieClip");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=MovieClip.js.map