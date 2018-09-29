
namespace TsEngine {
    export const SheetProcessor: RES.processor.Processor = {
        async onLoadStart(host, resource): Promise<any> {
            let data = await host.load(resource, "json");
            let r: RES.ResourceInfo = host.resourceConfig["getResource"](RES.nameSelector(data.file));
            if (!r) {
                let imageName = RES.processor.getRelativePath(resource.url, data.file);
                r = { name: imageName, url: imageName, type: 'image', root: resource.root };
            }
            var texture: egret.Texture = await host.load(r);
            var frames: any = data.frames;
            var spriteSheet = new egret.SpriteSheet(texture);
            spriteSheet["$resourceInfo"] = r;
            for (var subkey in frames) {
                var config: any = frames[subkey];
                var subTexture = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
                if (config["scale9grid"]) {
                    var str: string = config["scale9grid"];
                    var list: Array<string> = str.split(",");
                    subTexture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                }
            }
            let sheetData = new SheetData(r.name, texture, data, spriteSheet);
            host.save(r, sheetData);
            return sheetData;
        },


        getData(host, resource, key, subkey) {
            let data: SheetData = host.get(resource);
            if (data) {
                return data.getTexture(subkey);
            }
            else {
                return null;
            }
        },


        onRemoveStart(host, resource): Promise<any> {
            const sheet: egret.SpriteSheet = host.get(resource);
            const r = sheet["$resourceInfo"];
            sheet.dispose();
            host.unload(r);
            return Promise.resolve();
        }

    }
}