var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var ResourceManager = (function () {
        function ResourceManager() {
        }
        //初始化资源管理器,加载配置
        ResourceManager.initialize = function (configUrl, resourceRoot, version, onComplete, thisObject) {
            if (configUrl === void 0) { configUrl = null; }
            if (onComplete === void 0) { onComplete = null; }
            if (thisObject === void 0) { thisObject = null; }
            ResourceManager.resourceRoot = resourceRoot ? resourceRoot : "";
            ResourceManager.resourceVersion = version;
            console.log("ResourceManager initialize resourceRoot:" + resourceRoot + ",resourceVersion:" + version);
            //注入自定义的素材解析器
            RES.setMaxLoadingThread(4);
            egret.registerImplementation("eui.IAssetAdapter", new ResourceAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new TsEngine.ThemeAdapter());
            RES.processor.map(RES.ResourceItem.TYPE_SHEET, TsEngine.SheetProcessor);
            //加载初始化配置
            if (onComplete != null)
                RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onConfigComplete, this);
            if (configUrl)
                RES.loadConfig(configUrl, resourceRoot);
            function onConfigComplete(event) {
                console.log("ResourceManager:default.res.json load suc");
                RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onConfigComplete, this);
                onComplete.call(thisObject);
            }
        };
        Object.defineProperty(ResourceManager, "jsonSkinMode", {
            //皮肤是否json加载模式
            get: function () {
                return typeof generateJSON !== 'undefined';
            },
            enumerable: true,
            configurable: true
        });
        //加载视图模块资源，以组为单位
        ResourceManager.loadViewResource = function (resGroupName, onComplete, onProgress, thisObject) {
            if (onComplete === void 0) { onComplete = null; }
            if (onProgress === void 0) { onProgress = null; }
            if (thisObject === void 0) { thisObject = null; }
            var resource = ResourceManager.getViewResource(resGroupName);
            if (resource == null) {
                resource = new TsEngine.ViewResource(resGroupName);
                ResourceManager.viewResMap[resGroupName] = resource;
            }
            resource.load(onComplete, onProgress, thisObject);
            return resource;
        };
        //获取视图模块资源
        ResourceManager.getViewResource = function (resGroupName) {
            return this.viewResMap[resGroupName];
        };
        //加载图集资源
        ResourceManager.loadSheet = function (nameOrUrl, onComplete, onProgress, thisObject) {
            if (onComplete === void 0) { onComplete = null; }
            if (onProgress === void 0) { onProgress = null; }
            if (thisObject === void 0) { thisObject = null; }
            this.loadResource(nameOrUrl, onComplete, thisObject, RES.ResourceItem.TYPE_SHEET);
        };
        //加载皮肤资源
        ResourceManager.loadSkin = function (url, onComplete, thisObject) {
            if (thisObject === void 0) { thisObject = null; }
            EXML.load(url, onComplete, thisObject);
        };
        //加载皮肤json文件并解析
        ResourceManager.loadSkinJson = function (url, onComplete, thisObject) {
            var _this = this;
            if (thisObject === void 0) { thisObject = null; }
            ResourceManager.loadResource(url, function (data) {
                console.log(_this, "load SkinJson:" + url);
                window["JSONParseClass"]["setData"](data);
                onComplete.call(thisObject, generateJSON);
            }, this, RES.ResourceItem.TYPE_JSON);
        };
        //创建组
        ResourceManager.createGroup = function (name, resourceList) {
            if (!RES.hasRes(name)) {
                var urls = [];
                for (var index = 0; index < resourceList.length; index++) {
                    var element = resourceList[index];
                    var type = element.type;
                    var url = element.url;
                    if (!RES.hasRes(url)) {
                        RES.config.addResourceData({ name: url, url: ResourceManager.getResUrlByVersion(url), type: type });
                    }
                    urls.push(url);
                }
                RES.createGroup(name, urls);
            }
        };
        //获取图集资源
        ResourceManager.getSheet = function (nameOrUrl) {
            var resource = this.getResource(nameOrUrl);
            return resource ? resource : null;
        };
        //加载组资源
        ResourceManager.loadGroup = function (groupName, onComplete, onError, onProgress, thisObject) {
            var _this = this;
            RES.loadGroup(groupName).then(function () {
                onComplete && onComplete.call(thisObject);
            }, function (reason) {
                console.error(_this, "Group loaderror:" + groupName + "(" + reason + ")");
                onError && onError.call(thisObject, reason);
            });
        };
        //按地址加载图片[onComplete(data:any),onProgress(p:number)]
        ResourceManager.loadImage = function (url, onComplete, thisObject) {
            if (onComplete === void 0) { onComplete = null; }
            if (thisObject === void 0) { thisObject = null; }
            this.loadResource(url, onComplete, thisObject, RES.ResourceItem.TYPE_IMAGE);
        };
        //通用资源加载，支持本地及远程(url/DisplayObject/Texture/class)
        ResourceManager.loadResource = function (source, onComplete, thisObject, type, onError) {
            var _this = this;
            function onGetRes(data) {
                if (onComplete.length == 1) {
                    onComplete.call(thisObject, data);
                }
                else if (onComplete.length == 2) {
                    onComplete.call(thisObject, data, source);
                }
                else {
                    onComplete.call(thisObject);
                }
            }
            var content = source;
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
                }
                else {
                    RES.getResAsync(source).then(function (data) {
                        onGetRes(data);
                    }, function (reason) {
                        if (onError)
                            onError.call(thisObject, source);
                        console.error(_this, "Load error:" + source + "(" + reason + ")");
                    });
                }
            }
            else {
                onComplete.call(thisObject, content, source);
            }
        };
        //获取资源
        ResourceManager.getResource = function (nameOrUrl) {
            var res = RES.getRes(nameOrUrl);
            return res;
        };
        //删除资源标记
        ResourceManager.removeResource = function (nameOrUrl, forceRemove) {
            if (forceRemove === void 0) { forceRemove = false; }
            var count = this.countFlagMap[nameOrUrl] ? this.countFlagMap[nameOrUrl] : 0;
            if (count > 0) {
                if (forceRemove) {
                    this.countFlagMap[nameOrUrl] = 0;
                }
                else {
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
        };
        //使用资源标记
        ResourceManager.useResource = function (nameOrUrl) {
            if (!this.countFlagMap[nameOrUrl])
                this.countFlagMap[nameOrUrl] = 0;
            this.countFlagMap[nameOrUrl]++;
        };
        //加载一个文本文件，json或xml，独立于RES模块
        ResourceManager.loadText = function (url, onComplete, thisObj, hasVersion) {
            var _this = this;
            if (hasVersion === void 0) { hasVersion = true; }
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            if (hasVersion)
                url = this.getResUrlByVersion(url);
            request.open(url, "get");
            request.send();
            var onSuccess = function () {
                var data = request['data'] ? request['data'] : request['response'];
                onComplete.call(thisObj, data);
            };
            var onError = function () {
                TsEngine.Log.error(_this, "loadText failed:" + url);
            };
            request.addEventListener(egret.Event.COMPLETE, onSuccess, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, this);
        };
        /**
         * 通过url获取文件类型
         */
        ResourceManager.getTypeByUrl = function (url) {
            var suffix = url.toLowerCase().split("?")[0];
            suffix = suffix.substr(suffix.lastIndexOf(".") + 1);
            if (suffix) {
                suffix = suffix.toLowerCase();
            }
            var type;
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
        };
        ResourceManager.getResUrlByVersion = function (url) {
            return ResourceManager.resourceRoot + url + "?v=" + ResourceManager.resourceVersion;
        };
        ResourceManager.viewResMap = new Object();
        ResourceManager.countFlagMap = new Object();
        ResourceManager.resourceRoot = "";
        return ResourceManager;
    }());
    TsEngine.ResourceManager = ResourceManager;
    __reflect(ResourceManager.prototype, "TsEngine.ResourceManager");
    var ResourceAdapter = (function () {
        function ResourceAdapter() {
        }
        ResourceAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
            ResourceManager.loadResource(source, compFunc, thisObject);
        };
        return ResourceAdapter;
    }());
    __reflect(ResourceAdapter.prototype, "ResourceAdapter", ["eui.IAssetAdapter"]);
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=ResourceManager.js.map