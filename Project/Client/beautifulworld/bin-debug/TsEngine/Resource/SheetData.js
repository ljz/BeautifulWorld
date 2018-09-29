var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var SheetData = (function () {
        function SheetData(name, texture, sheetConfig, spriteSheet) {
            this.name = name;
            this.spriteSheet = spriteSheet;
            this.texture = texture;
            this.isDisposed = false;
            this.sheetConfig = sheetConfig;
        }
        //释放资源
        SheetData.prototype.dispose = function (force) {
            if (force === void 0) { force = false; }
            if (TsEngine.ResourceManager.removeResource(name, force)) {
                this.texture = null;
                this.spriteSheet = null;
                this.sheetConfig = null;
                this.mcFactory = null;
                return true;
            }
            return false;
        };
        //获取材质资源
        SheetData.prototype.getTexture = function (textureName) {
            return this.spriteSheet.getTexture(textureName);
        };
        //获取影片额外配置信息
        SheetData.prototype.getMovieConfig = function (movieName) {
            return this.sheetConfig.mcConfig ? this.sheetConfig.mcConfig[movieName] : null;
        };
        /**-----------------------------------------快速创建--------------------------------------------*/
        /**创建图片*/
        SheetData.prototype.createImage = function (textureName, xpos, ypos, width, height, grid9Rect) {
            if (xpos === void 0) { xpos = 0; }
            if (ypos === void 0) { ypos = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            if (grid9Rect === void 0) { grid9Rect = null; }
            var texture = this.getTexture(textureName);
            if (!texture) {
                return null;
            }
            var image = new eui.Image();
            image.source = this.getTexture(textureName);
            image.x = xpos;
            image.y = ypos;
            image.width = width ? (image.width = width) : image.source.textureWidth;
            image.height = height ? (image.height = height) : image.source.textureHeight;
            if (grid9Rect != null) {
                image.scale9Grid = grid9Rect;
                image.cacheAsBitmap = true;
            }
            image.validateNow();
            return image;
        };
        /**创建影片*/
        SheetData.prototype.createMovieClip = function (movieName, xpos, ypos) {
            if (xpos === void 0) { xpos = 0; }
            if (ypos === void 0) { ypos = 0; }
            if (this.mcFactory == null) {
                this.mcFactory = new egret.MovieClipDataFactory(this.sheetConfig, this.texture);
            }
            var mcData = this.mcFactory.generateMovieClipData(movieName);
            if (mcData == null) {
                return null;
            }
            var movie = new TsEngine.MovieClip(mcData);
            var movieConfig = this.getMovieConfig(movieName);
            //设置影片注册点
            if (movieConfig != null) {
                movie.anchorOffsetX = movieConfig.pivotX;
                movie.anchorOffsetY = movieConfig.pivotY;
            }
            //影片坐标
            movie.x = xpos;
            movie.y = ypos;
            return movie;
        };
        /**根据配置创建影片*/
        SheetData.prototype.createMoviePlayer = function (defaultAnimation, xpos, ypos) {
            if (defaultAnimation === void 0) { defaultAnimation = null; }
            if (xpos === void 0) { xpos = 0; }
            if (ypos === void 0) { ypos = 0; }
            if (!this.sheetConfig.mc) {
                return null;
            }
            var movie = new TsEngine.MoviePlayer(null, defaultAnimation);
            movie.onResource(this);
            movie.x = xpos;
            movie.y = ypos;
            return movie;
        };
        return SheetData;
    }());
    TsEngine.SheetData = SheetData;
    __reflect(SheetData.prototype, "TsEngine.SheetData");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=SheetData.js.map