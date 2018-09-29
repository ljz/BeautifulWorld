var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var ViewResource = (function () {
        function ViewResource(resGroup) {
            this.resGroup = resGroup;
            this.mSheetResources = [];
        }
        //----------------------------------基本方法--------------------------------------------
        //加载资源
        ViewResource.prototype.load = function (onComplete, onProgress, thisObject) {
            if (onComplete === void 0) { onComplete = null; }
            if (onProgress === void 0) { onProgress = null; }
            if (thisObject === void 0) { thisObject = null; }
            if (this.isLoaded) {
                onResourceComplete.call(this);
            }
            else {
                TsEngine.ResourceManager.loadGroup(this.resGroup, onResourceComplete, onResourceError, onProgress, this);
            }
            //加载完成
            function onResourceComplete() {
                this.mIsLoaded = true;
                if (this.resGroup) {
                    var items = RES.getGroupByName(this.resGroup);
                    for (var index = 0; index < items.length; index++) {
                        var item = items[index];
                        if (item.type == RES.ResourceItem.TYPE_SHEET) {
                            this.mSheetResources.push(TsEngine.ResourceManager.getSheet(item.name));
                        }
                    }
                }
                if (onComplete != null) {
                    if (onComplete.length == 1) {
                        onComplete.call(thisObject, this);
                    }
                    else {
                        onComplete.call(thisObject);
                    }
                }
            }
            function onResourceError() {
            }
        };
        Object.defineProperty(ViewResource.prototype, "isLoaded", {
            //是否已加载
            get: function () {
                return this.mIsLoaded;
            },
            enumerable: true,
            configurable: true
        });
        //获取材质资源
        ViewResource.prototype.getTexture = function (textureName) {
            for (var _i = 0, _a = this.mSheetResources; _i < _a.length; _i++) {
                var element = _a[_i];
                var texture = element.getTexture(textureName);
                if (texture) {
                    return texture;
                }
            }
            return null;
        };
        //释放资源
        ViewResource.prototype.dispose = function (force) {
            if (force === void 0) { force = false; }
            for (var _i = 0, _a = this.mSheetResources; _i < _a.length; _i++) {
                var element = _a[_i];
                element.dispose(force);
            }
            this.mSheetResources = null;
            this.resGroup = null;
        };
        /**-----------------------------------------快速创建--------------------------------------------*/
        /**创建图片*/
        ViewResource.prototype.createImage = function (textureName, xpos, ypos, width, height, grid9Rect) {
            if (xpos === void 0) { xpos = 0; }
            if (ypos === void 0) { ypos = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            if (grid9Rect === void 0) { grid9Rect = null; }
            for (var _i = 0, _a = this.mSheetResources; _i < _a.length; _i++) {
                var element = _a[_i];
                var image = element.createImage(textureName, xpos, ypos, width, height, grid9Rect);
                if (image) {
                    return image;
                }
            }
            return null;
        };
        /**创建影片*/
        ViewResource.prototype.createMovieClip = function (movieName, xpos, ypos) {
            if (xpos === void 0) { xpos = 0; }
            if (ypos === void 0) { ypos = 0; }
            for (var _i = 0, _a = this.mSheetResources; _i < _a.length; _i++) {
                var element = _a[_i];
                var movie = element.createMovieClip(movieName, xpos, ypos);
                if (movie) {
                    return movie;
                }
            }
            return null;
        };
        /**根据配置创建影片集*/
        ViewResource.prototype.createMoviePlayer = function (defaultAnimation, xpos, ypos) {
            if (defaultAnimation === void 0) { defaultAnimation = null; }
            if (xpos === void 0) { xpos = 0; }
            if (ypos === void 0) { ypos = 0; }
            for (var _i = 0, _a = this.mSheetResources; _i < _a.length; _i++) {
                var element = _a[_i];
                var movie = element.createMoviePlayer(defaultAnimation, xpos, ypos);
                if (movie) {
                    return movie;
                }
            }
            return null;
        };
        return ViewResource;
    }());
    TsEngine.ViewResource = ViewResource;
    __reflect(ViewResource.prototype, "TsEngine.ViewResource");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=ViewResource.js.map