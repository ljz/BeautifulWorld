
namespace TsEngine {


    export const textureCache = {};
    export const bitmapDataCache = {};

    export const needCache = function (url: string) {
        return false;//RES.hasRes(url);
    }

    export async function promisify(loader: egret.ImageLoader | egret.HttpRequest | egret.Sound, resource: RES.ResourceInfo): Promise<any> {
        return new Promise((reslove, reject) => {
            let onSuccess = () => {
                let texture = loader['data'] ? loader['data'] : loader['response'];
                reslove(texture);
            }

            let onError = () => {
                let e = new RES.ResourceManagerError(1001, resource.url);
                reject(e);
            }
            loader.addEventListener(egret.Event.COMPLETE, onSuccess, this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, this);
        })
    }

    export function getURL(resource: RES.ResourceInfo) {
        if (resource.url.indexOf("://") != -1) {
            return resource.url;
        }
        let prefix = resource.root;
        let url = prefix + resource.url;
        if (RES['getRealURL']) { //todo: shim native
            return RES['getRealURL'](url);
        }
        else {
            return url;
        }
    }

    export var ImageProcessor: RES.processor.Processor = {
        async onLoadStart(host, resource) {
            var loader = new egret.ImageLoader();
            const url = getURL(resource);
            loader.load(url);
            const bitmapData = await promisify(loader, resource);
            let texture;
            if (needCache(url)) {
                if (textureCache[url] == undefined) {
                    texture = new egret.Texture();
                    textureCache[url] = texture;
                    texture._setBitmapData(bitmapData);
                    bitmapDataCache[url] = bitmapData;
                }
                else {
                    texture = textureCache[url];
                    const cacheBitmapData = bitmapDataCache[url];
                    cacheBitmapData.source = bitmapData.source;
                    cacheBitmapData.width = bitmapData.width;
                    cacheBitmapData.height = bitmapData.height;
                    texture._setBitmapData(cacheBitmapData);
                }
            }
            else {
                texture = new egret.Texture();
                texture._setBitmapData(bitmapData);
            }
            let r = host.resourceConfig["getResource"](resource.name);
            if (r && r.scale9grid) {
                var list: Array<string> = r.scale9grid.split(",");
                texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
            }
            return texture;
        },

        onRemoveStart(host, resource) {
            const texture: egret.Texture = host.get(resource);
            const bitmapData = texture.bitmapData;
            const url = getURL(resource);
            if (needCache(url)) {
                if (egret.Capabilities.renderMode == "webgl" && bitmapData.webGLTexture) {
                    egret.WebGLUtils.deleteWebGLTexture(bitmapData.webGLTexture);
                    bitmapData.webGLTexture = null;
                }
                bitmapData.source = null;
            }
            else {
                texture.dispose();
            }
            return Promise.resolve();
        }
    }

    RES.processor.map("image", ImageProcessor);
}