namespace TsEngine {


    export class SheetData {
        //是否释放了贴图
        public isDisposed: boolean;
        //名称
        public name: string;
        //贴图
        public texture: egret.Texture;
        //材质集
        public spriteSheet: egret.SpriteSheet;
        //贴图配置信息
        public sheetConfig: any;
        //mc工厂
        private mcFactory: egret.MovieClipDataFactory;
        constructor(name: string, texture: egret.Texture, sheetConfig: any, spriteSheet?: egret.SpriteSheet) {
            this.name = name;
            this.spriteSheet = spriteSheet;
            this.texture = texture;
            this.isDisposed = false;
            this.sheetConfig = sheetConfig;
        }

        //释放资源
        public dispose(force: boolean = false): boolean {
            if (ResourceManager.removeResource(name, force)) {
                this.texture = null;
                this.spriteSheet = null;
                this.sheetConfig = null;
                this.mcFactory = null;
                return true;
            }
            return false;
        }

        //获取材质资源
        public getTexture(textureName: string): egret.Texture {
            return this.spriteSheet.getTexture(textureName);
        }

        //获取影片额外配置信息
        public getMovieConfig(movieName: string): any {
            return this.sheetConfig.mcConfig ? this.sheetConfig.mcConfig[movieName] : null;
        }

        /**-----------------------------------------快速创建--------------------------------------------*/

        /**创建图片*/
        public createImage(textureName: string, xpos: number = 0, ypos: number = 0, width: number = 0, height: number = 0, grid9Rect: egret.Rectangle = null): eui.Image {
            var texture: egret.Texture = this.getTexture(textureName);
            if (!texture) {
                return null;
            }
            var image: eui.Image = new eui.Image();
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
        }

        /**创建影片*/
        public createMovieClip(movieName: string, xpos: number = 0, ypos: number = 0): MovieClip {
            if (this.mcFactory == null) {
                this.mcFactory = new egret.MovieClipDataFactory(this.sheetConfig, this.texture);
            }
            let mcData = this.mcFactory.generateMovieClipData(movieName);
            if (mcData == null) {
                return null;
            }
            let movie = new MovieClip(mcData);
            let movieConfig = this.getMovieConfig(movieName);
            //设置影片注册点
            if (movieConfig != null) {
                movie.anchorOffsetX = movieConfig.pivotX;
                movie.anchorOffsetY = movieConfig.pivotY;
            }
            //影片坐标
            movie.x = xpos;
            movie.y = ypos;
            return movie;
        }

        /**根据配置创建影片*/
        public createMoviePlayer(defaultAnimation: string = null, xpos: number = 0, ypos: number = 0): MoviePlayer {
            if (!this.sheetConfig.mc) {
                return null;
            }
            var movie: MoviePlayer = new MoviePlayer(null, defaultAnimation);
            movie.onResource(this);
            movie.x = xpos;
            movie.y = ypos;
            return movie;
        }
    }
}