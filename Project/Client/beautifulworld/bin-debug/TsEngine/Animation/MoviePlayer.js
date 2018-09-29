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
    var MoviePlayer = (function (_super) {
        __extends(MoviePlayer, _super);
        /**
         * 动作集播放器
         * @param sheetResource            sheet资源
         * @param defaultAnimation        默认动作
         */
        function MoviePlayer(sheetUrl, defaultAnimation, preParse) {
            if (preParse === void 0) { preParse = true; }
            var _this = _super.call(this) || this;
            _this.animations = {};
            _this.isLoading = false;
            _this.sheetUrl = sheetUrl;
            _this.defaultAnimation = defaultAnimation;
            _this.preParse = preParse;
            _this.onLoadCallBacks = new Array();
            return _this;
        }
        //资源加载完成
        MoviePlayer.prototype.onResource = function (sheetResource) {
            this.sheetResource = sheetResource;
            if (this.preParse) {
                var mcData = sheetResource.sheetConfig.mc;
                if (mcData) {
                    for (var mcName in mcData) {
                        if (!this.defaultAnimation) {
                            this.defaultAnimation = mcName;
                        }
                        this.addMovieClip(mcName);
                    }
                }
            }
        };
        //加载
        MoviePlayer.prototype.load = function (onComplete, thisObject) {
            var _this = this;
            if (!this.sheetResource && this.sheetUrl) {
                if (onComplete != null) {
                    this.onLoadCallBacks.push({ func: onComplete, obj: thisObject });
                }
                if (!this.isLoading) {
                    this.isLoading = true;
                    TsEngine.ResourceManager.loadSheet(this.sheetUrl, function (sheet) {
                        _this.onResource(sheet);
                        while (_this.onLoadCallBacks.length) {
                            var element = _this.onLoadCallBacks.shift();
                            element.func.call(element.obj);
                        }
                    }, null, this);
                }
            }
            else {
                onComplete.call(thisObject);
            }
        };
        /**
         * 播放动画
         * @param	animationName      动画名称
         * @param	loopTimes          播放次数
         * @param	onComplete         播放完成
         */
        MoviePlayer.prototype.play = function (loopTimes, onComplete, thisObject) {
            if (loopTimes === void 0) { loopTimes = -1; }
            if (onComplete === void 0) { onComplete = null; }
            if (thisObject === void 0) { thisObject = null; }
            return this.playAnimation(this.defaultAnimation, loopTimes, true, onComplete, thisObject);
        };
        /**
         * 播放动画
         * @param	animationName      动画名称
         * @param	loopTimes          播放次数
         * @param	onComplete         播放完成
         */
        MoviePlayer.prototype.playAnimation = function (animationName, loopTimes, reset, onComplete, thisObject) {
            var _this = this;
            if (loopTimes === void 0) { loopTimes = -1; }
            if (reset === void 0) { reset = true; }
            if (onComplete === void 0) { onComplete = null; }
            if (thisObject === void 0) { thisObject = null; }
            if (this.sheetResource) {
                if (!(this.animations[animationName])) {
                    if (!this.addMovieClip(animationName)) {
                        throw new Error("找不到对应动作集合:" + animationName);
                    }
                }
                var movie;
                if (this.currentAnimation != animationName) {
                    if (this.currentAnimation) {
                        this.removeChild(this.animations[this.currentAnimation]);
                    }
                    this.currentAnimation = animationName;
                    movie = this.animations[animationName];
                    this.addChild(movie);
                }
                else {
                    movie = this.animations[animationName];
                }
                movie.play(loopTimes, reset, onComplete, thisObject);
                return movie;
            }
            else {
                this.load(function () {
                    _this.playAnimation(animationName || _this.defaultAnimation, loopTimes, reset, onComplete, thisObject);
                }, this);
            }
            return null;
        };
        //暂停
        MoviePlayer.prototype.pause = function (value) {
            if (!this.currentAnimation || this.animations[this.currentAnimation] == null)
                return;
            var movie = this.animations[this.currentAnimation];
            value ? movie.stop() : movie.play();
        };
        //停止播放
        MoviePlayer.prototype.stop = function () {
            if (!this.currentAnimation || this.animations[this.currentAnimation] == null)
                return;
            var movie = this.animations[this.currentAnimation];
            movie.stop();
        };
        MoviePlayer.prototype.dispose = function () {
            if (this.currentAnimation != null) {
                this.removeChild(this.animations[this.currentAnimation]);
                this.currentAnimation = null;
            }
            if (this.animations != null) {
                for (var animationName in this.animations) {
                    (this.animations[animationName]).dispose();
                    delete this.animations[animationName];
                }
                this.animations = null;
            }
            this.sheetResource = null;
        };
        /**添加一个影片到动作集合*/
        MoviePlayer.prototype.addMovieClip = function (movieName) {
            var movie = this.sheetResource.createMovieClip(movieName);
            if (movie) {
                movie.name = movieName;
                this.animations[movieName] = movie;
            }
            return movie;
        };
        return MoviePlayer;
    }(egret.Sprite));
    TsEngine.MoviePlayer = MoviePlayer;
    __reflect(MoviePlayer.prototype, "TsEngine.MoviePlayer");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=MoviePlayer.js.map