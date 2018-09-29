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
    TsEngine.SheetProcessor = {
        onLoadStart: function (host, resource) {
            return __awaiter(this, void 0, void 0, function () {
                var data, r, imageName, texture, frames, spriteSheet, subkey, config, subTexture, str, list, sheetData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, host.load(resource, "json")];
                        case 1:
                            data = _a.sent();
                            r = host.resourceConfig["getResource"](RES.nameSelector(data.file));
                            if (!r) {
                                imageName = RES.processor.getRelativePath(resource.url, data.file);
                                r = { name: imageName, url: imageName, type: 'image', root: resource.root };
                            }
                            return [4 /*yield*/, host.load(r)];
                        case 2:
                            texture = _a.sent();
                            frames = data.frames;
                            spriteSheet = new egret.SpriteSheet(texture);
                            spriteSheet["$resourceInfo"] = r;
                            for (subkey in frames) {
                                config = frames[subkey];
                                subTexture = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
                                if (config["scale9grid"]) {
                                    str = config["scale9grid"];
                                    list = str.split(",");
                                    subTexture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                                }
                            }
                            sheetData = new TsEngine.SheetData(r.name, texture, data, spriteSheet);
                            host.save(r, sheetData);
                            return [2 /*return*/, sheetData];
                    }
                });
            });
        },
        getData: function (host, resource, key, subkey) {
            var data = host.get(resource);
            if (data) {
                return data.getTexture(subkey);
            }
            else {
                return null;
            }
        },
        onRemoveStart: function (host, resource) {
            var sheet = host.get(resource);
            var r = sheet["$resourceInfo"];
            sheet.dispose();
            host.unload(r);
            return Promise.resolve();
        }
    };
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=SheetProcessor.js.map