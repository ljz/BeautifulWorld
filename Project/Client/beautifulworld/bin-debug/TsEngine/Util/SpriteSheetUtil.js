var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var SpriteSheetUtil = (function () {
        function SpriteSheetUtil() {
        }
        /** 获取相同前缀材质组*/
        SpriteSheetUtil.getTextures = function (spriteSheet, prefix) {
            if (prefix === void 0) { prefix = ""; }
            var result = new Array();
            var names = new Array();
            for (var name in spriteSheet._textureMap) {
                if (name.indexOf(prefix) == 0)
                    names.push(name);
            }
            names.sort();
            for (var i = 0; i < names.length; i++) {
                var textureName = names[i];
                result.push(spriteSheet.getTexture(textureName));
            }
            return result;
        };
        return SpriteSheetUtil;
    }());
    TsEngine.SpriteSheetUtil = SpriteSheetUtil;
    __reflect(SpriteSheetUtil.prototype, "TsEngine.SpriteSheetUtil");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=SpriteSheetUtil.js.map