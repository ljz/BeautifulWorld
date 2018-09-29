namespace TsEngine {
    export class ResourceManager {
        private static viewResMap: any = new Object();
        private static countFlagMap: any = new Object();
        private static resourceRoot: string = "";
        private static resourceVersion: string;
        //初始化资源管理器,加载配置
        public static initialize(configUrl: string = null, resourceRoot: string, version: string, onComplete: Function = null, thisObject: any = null): void {
            ResourceManager.resourceRoot = resourceRoot ? resourceRoot : "";
            ResourceManager.resourceVersion = version;
            console.log("ResourceManager initialize resourceRoot:" + resourceRoot + ",resourceVersion:" + version);
            //注入自定义的素材解析器
            RES.setMaxLoadingThread(4);
            egret.registerImplementation("eui.IAssetAdapter", new ResourceAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
            RES.processor.map(RES.ResourceItem.TYPE_SHEET, SheetProcessor);
            //加载初始化配置
            if (onComplete != null)
                RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onConfigComplete, this);
            if (configUrl)
                RES.loadConfig(configUrl, resourceRoot);

            function onConfigComplete(event: RES.ResourceEvent) {
                console.log("ResourceManager:default.res.json load suc");
                RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onConfigComplete, this);
                onComplete.call(thisObject);
            }
        }

        //皮肤是否json加载模式
        public static get jsonSkinMode(): boolean {
            return typeof generateJSON !== 'undefined';
        }

        //加载视图模块资源，以组为单位
        public static loadViewResource(resGroupName: string, onComplete: Function = null, onProgress: Function = null, thisObject: any = null): ViewResource {
            var resource: ViewResource = ResourceManager.getViewResource(resGroupName);
            if (resource == null) {
                resource = new ViewResource(resGroupName);
                ResourceManager.viewResMap[resGroupName] = resource;
            }
            resource.load(onComplete, onProgress, thisObject);
            return resource;
        }

        //获取视图模块资源
        public static getViewResource(resGroupName: string): ViewResource {
            return this.viewResMap[resGroupName];
        }

        //加载图集资源
        public static loadSheet(nameOrUrl: string, onComplete: Function = null, onProgress: Function = null, thisObject: any = null): void {
            this.loadResource(nameOrUrl, onComplete, thisObject, RES.ResourceItem.TYPE_SHEET);
        }

        //加载皮肤资源
        public static loadSkin(url: string, onComplete?: (clazz: any, url: string) => void, thisObject: any = null): void {
            EXML.load(url, onComplete, thisObject);
        }

        //加载皮肤json文件并解析
        public static loadSkinJson(url: string, onComplete?: Function, thisObject: any = null): void {
            ResourceManager.loadResource(url, (data) => {
                console.log(this, "load SkinJson:" + url);
                window["JSONParseClass"]["setData"](data);
                onComplete.call(thisObject, generateJSON);
            }, this, RES.ResourceItem.TYPE_JSON);
        }

        //创建组
        public static createGroup(name: string, resourceList: any[]): void {
            if (!RES.hasRes(name)) {
                let urls = [];
                for (var index = 0; index < resourceList.length; index++) {
                    var element = resourceList[index];
                    let type = element.type;
                    let url = element.url;
                    if (!RES.hasRes(url)) {
                        RES.config.addResourceData({ name: url, url: ResourceManager.getResUrlByVersion(url), type: type });
                    }
                    urls.push(url);
                }
                RES.createGroup(name, urls);
            }
        }

        //获取图集资源
        public static getSheet(nameOrUrl: any): SheetData {
            let resource = this.getResource(nameOrUrl);
            return resource ? resource as SheetData : null;
        }

        //加载组资源
        public static loadGroup(groupName: string, onComplete?: Function, onError?: Function, onProgress?: Function, thisObject?: any): void {
            RES.loadGroup(groupName).then(() => {
                onComplete && onComplete.call(thisObject);
            }, (reason) => {
                console.error(this, "Group loaderror:" + groupName + "(" + reason + ")");
                onError && onError.call(thisObject, reason);
            });
        }

        //按地址加载图片[onComplete(data:any),onProgress(p:number)]
        public static loadImage(url: string, onComplete: Function = null, thisObject: any = null): void {
            this.loadResource(url, onComplete, thisObject, RES.ResourceItem.TYPE_IMAGE);
        }

        //通用资源加载，支持本地及远程(url/DisplayObject/Texture/class)
        public static loadResource(source: any, onComplete: Function, thisObject: any, type?: string, onError?: Function): void {
            function onGetRes(data: any): void {
                if (onComplete.length == 1) {
                    onComplete.call(thisObject, data);
                } else if (onComplete.length == 2) {
                    onComplete.call(thisObject, data, source);
                } else {
                    onComplete.call(thisObject);
                }
            }

            var content: any = source;
            if (source.prototype) {
                content = new source();
            }
            if (content instanceof egret.DisplayObject || content instanceof egret.Texture) {
                onComplete.call(thisObject, content, source);
            }
            else if (typeof (source) == "string") {
                if (!type)
                    type = ResourceManager.getTypeByUrl(source);
                if (!RES.hasRes(source)) {
                    RES.getResByUrl(ResourceManager.getResUrlByVersion(source), onGetRes, this, type);
                } else {
                    RES.getResAsync(source).then((data) => {
                        onGetRes(data);
                    }, (reason) => {
                        if (onError) onError.call(thisObject, source);
                        console.error(this, "Load error:" + source + "(" + reason + ")");
                    });
                }
            }
            else {
                onComplete.call(thisObject, content, source);
            }
        }

        //获取资源
        public static getResource(nameOrUrl: string): any {
            var res: any = RES.getRes(nameOrUrl);
            return res;
        }

        //删除资源标记
        public static removeResource(nameOrUrl: string, forceRemove: boolean = false): boolean {
            var count: number = this.countFlagMap[nameOrUrl] ? this.countFlagMap[nameOrUrl] : 0;
            if (count > 0) {
                if (forceRemove) {
                    this.countFlagMap[nameOrUrl] = 0;
                } else {
                    this.countFlagMap[nameOrUrl]--;
                }
            }
            if (!this.countFlagMap[nameOrUrl] || this.countFlagMap[nameOrUrl] <= 0) {
                if (RES.hasRes(nameOrUrl)) {
                    RES.destroyRes(nameOrUrl);
                }
                delete this.countFlagMap[nameOrUrl];
                return true;
            }
            return false;
        }

        //使用资源标记
        public static useResource(nameOrUrl: string): void {
            if (!this.countFlagMap[nameOrUrl])
                this.countFlagMap[nameOrUrl] = 0;
            this.countFlagMap[nameOrUrl]++;
        }

        //加载一个文本文件，json或xml，独立于RES模块
        public static loadText(url: string, onComplete: Function, thisObj: any, hasVersion: boolean = true): void {
            var request: egret.HttpRequest = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            if (hasVersion)
                url = this.getResUrlByVersion(url);
            request.open(url, "get");
            request.send();

            let onSuccess = () => {
                let data = request['data'] ? request['data'] : request['response'];
                onComplete.call(thisObj, data);
            }

            let onError = () => {
                Log.error(this, "loadText failed:" + url);
            }
            request.addEventListener(egret.Event.COMPLETE, onSuccess, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, this);
        }

        /**
         * 通过url获取文件类型
         */
        public static getTypeByUrl(url: string): string {
            var suffix: string = url.toLowerCase().split("?")[0];
            suffix = suffix.substr(suffix.lastIndexOf(".") + 1);
            if (suffix) {
                suffix = suffix.toLowerCase();
            }
            var type: string;
            switch (suffix) {
                case RES.ResourceItem.TYPE_XML:
                case RES.ResourceItem.TYPE_JSON:
                case RES.ResourceItem.TYPE_SHEET:
                    type = suffix;
                    break;
                case "png":
                case "jpg":
                case "gif":
                    type = RES.ResourceItem.TYPE_IMAGE;
                    break;
                case "fnt":
                    type = RES.ResourceItem.TYPE_FONT;
                    break;
                case "txt":
                case "exml":
                    type = RES.ResourceItem.TYPE_TEXT;
                    break;
                case "mp3":
                case "ogg":
                case "mpeg":
                case "wav":
                case "m4a":
                case "mp4":
                case "aiff":
                case "wma":
                case "mid":
                    type = RES.ResourceItem.TYPE_SOUND;
                    break;
                default:
                    type = RES.ResourceItem.TYPE_BIN;
                    break;
            }
            return type;
        }

        public static getResUrlByVersion(url: string): string {
            return ResourceManager.resourceRoot + url + "?v=" + ResourceManager.resourceVersion;
        }
    }

    class ResourceAdapter implements eui.IAssetAdapter {
        public getAsset(source: string, compFunc: Function, thisObject: any): void {
            ResourceManager.loadResource(source, compFunc, thisObject);
        }
    }
}

