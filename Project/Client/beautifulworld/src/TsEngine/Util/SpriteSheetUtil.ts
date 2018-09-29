namespace TsEngine {
    export class SpriteSheetUtil {

        /** 获取相同前缀材质组*/
        public static getTextures(spriteSheet: egret.SpriteSheet, prefix: string = ""): Array<egret.Texture> {
            var result: Array<egret.Texture> = new Array<egret.Texture>();
            var names: Array<string> = new Array<string>();
            for (var name in spriteSheet._textureMap) {
                if (name.indexOf(prefix) == 0)
                    names.push(name);
            }
            names.sort();
            for (var i = 0; i < names.length; i++) {
                var textureName: string = names[i];
                result.push(spriteSheet.getTexture(textureName));
            }
            return result;
        }
    }
}