
namespace TsEngine {
    export interface IEffect {
        start(target: egret.DisplayObject, args?: any): void;

        stop(target: egret.DisplayObject, args?: any): void;
    }
}