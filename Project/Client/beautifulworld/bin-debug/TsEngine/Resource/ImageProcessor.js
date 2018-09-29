var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var TsEngine;
(function (TsEngine) {
    TsEngine.textureCache = {};
    TsEngine.bitmapDataCache = {};
    TsEngine.needCache = function (url) {
        return false; //RES.hasRes(url);
    };
    function promisify(loader, resource) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (reslove, reject) {
                        var onSuccess = function () {
                            var texture = loader['data'] ? loader['data'] : loader['response'];
                            reslove(texture);
                        };
                        var onError = function () {
                            var e = new RES.ResourceManagerError(1001, resource.url);
                            reject(e);
                        };
                        loader.addEventListener(egret.Event.COMPLETE, onSuccess, _this);
                        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, _this);
                    })];
            });
        });
    }
    TsEngine.promisify = promisify;
    function getURL(resource) {
        if (resource.url.indexOf("://") != -1) {
            return resource.url;
        }
        var prefix = resource.root;
        var url = prefix + resource.url;
        if (RES['getRealURL']) {
            return RES['getRealURL'](url);
        }
        else {
            return url;
        }
    }
    TsEngine.getURL = getURL;
    TsEngine.ImageProcessor = {
        onLoadStart: function (host, resource) {
            return __awaiter(this, void 0, void 0, function () {
                var loader, url, bitmapData, texture, cacheBitmapData, r, list;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            loader = new egret.ImageLoader();
                            url = getURL(resource);
                            loader.load(url);
                            return [4 /*yield*/, promisify(loader, resource)];
                        case 1:
                            bitmapData = _a.sent();
                            if (TsEngine.needCache(url)) {
                                if (TsEngine.textureCache[url] == undefined) {
                                    texture = new egret.Texture();
                                    TsEngine.textureCache[url] = texture;
                                    texture._setBitmapData(bitmapData);
                                    TsEngine.bitmapDataCache[url] = bitmapData;
                                }
                                else {
                                    texture = TsEngine.textureCache[url];
                                    cacheBitmapData = TsEngine.bitmapDataCache[url];
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
                            r = host.resourceConfig["getResource"](resource.name);
                            if (r && r.scale9grid) {
                                list = r.scale9grid.split(",");
                                texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                            }
                            return [2 /*return*/, texture];
                    }
                });
            });
        },
        onRemoveStart: function (host, resource) {
            var texture = host.get(resource);
            var bitmapData = texture.bitmapData;
            var url = getURL(resource);
            if (TsEngine.needCache(url)) {
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
    };
    RES.processor.map("image", TsEngine.ImageProcessor);
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=ImageProcessor.js.map