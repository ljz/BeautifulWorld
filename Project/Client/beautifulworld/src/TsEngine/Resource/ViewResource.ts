
namespace TsEngine {
    export class ViewResource {
        private resGroup: string;
        private mSheetResources: SheetData[];
        private mIsLoaded: boolean;
        constructor(resGroup: string) {
            this.resGroup = resGroup;
            this.mSheetResources = [];
        }

        //----------------------------------基本方法--------------------------------------------

        //加载资源
        public load(onComplete: Function = null, onProgress: Function = null, thisObject: any = null): void {
            if (this.isLoaded) {
                onResourceComplete.call(this);
            } else {
                ResourceManager.loadGroup(this.resGroup, onResourceComplete, onResourceError, onProgress, this);
            }

            //加载完成
            function onResourceComplete() {
                this.mIsLoaded = true;
                if (this.resGroup) {
                    let items = RES.getGroupByName(this.resGroup);
                    for (var index = 0; index < items.length; index++) {
                        var item = items[index];
                        if (item.type == RES.ResourceItem.TYPE_SHEET) {
                            this.mSheetResources.push(ResourceManager.getSheet(item.name));
                        }
                    }
                }
                if (onComplete != null) {
                    if (onComplete.length == 1) {
                        onComplete.call(thisObject, this);
                    } else {
                        onComplete.call(thisObject);
                    }
                }
            }

            function onResourceError() {

            }
        }

        //是否已加载
        public get isLoaded(): boolean {
            return this.mIsLoaded;
        }

        //获取材质资源
        public getTexture(textureName: string): egret.Texture {
            for (let element of this.mSheetResources) {
                let texture = element.getTexture(textureName);
                if (texture) {
                    return texture;
                }
            }
            return null;
        }

        //释放资源
        public dispose(force: boolean = false): void {
            for (let element of this.mSheetResources) {
                element.dispose(force);
            }
            this.mSheetResources = null;
            this.resGroup = null;
        }

        /**-----------------------------------------快速创建--------------------------------------------*/

        /**创建图片*/
        public createImage(textureName: string, xpos: number = 0, ypos: number = 0, width: number = 0, height: number = 0, grid9Rect: egret.Rectangle = null): eui.Image {
            for (let element of this.mSheetResources) {
                let image = element.createImage(textureName, xpos, ypos, width, height, grid9Rect);
                if (image) {
                    return image;
                }
            }
            return null;
        }

        /**创建影片*/
        public createMovieClip(movieName: string, xpos: number = 0, ypos: number = 0): MovieClip {
            for (let element of this.mSheetResources) {
                let movie = element.createMovieClip(movieName, xpos, ypos);
                if (movie) {
                    return movie;
                }
            }
            return null;
        }

        /**根据配置创建影片集*/
        public createMoviePlayer(defaultAnimation: string = null, xpos: number = 0, ypos: number = 0): MoviePlayer {
            for (let element of this.mSheetResources) {
                let movie = element.createMoviePlayer(defaultAnimation, xpos, ypos);
                if (movie) {
                    return movie;
                }
            }
            return null;
        }
    }
}