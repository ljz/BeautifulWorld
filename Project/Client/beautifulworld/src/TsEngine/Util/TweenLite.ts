

namespace TweenLite {
    export function to(target: Object, duration: number, vars: any): void {
        if (vars.onUpdate) {
            vars.onChange = vars.onUpdate;
            vars.onChangeObj = vars.onUpdateScope;
        }
        var tw: egret.Tween = egret.Tween.get(target, vars);
        tw.to(vars, duration * 1000, vars.ease);
        if (vars.onComplete) {
            tw.call(vars.onComplete, vars.onCompleteScope);
        }
    }

    export function killTweensOf(target: Object, vars?: any): void {
        egret.Tween.removeTweens(target);
    }

    export function from(target: Object, duration: number, vars: any): void {
        var toVars: any = {};
        for (var id in vars) {
            if (typeof vars[id] == "number") {
                toVars[id] = target[id];
            } else {
                toVars[id] = vars[id];
            }
        }
        TweenLite.fromTo(target, duration, vars, toVars);
    }

    export function fromTo(target: Object, duration: number, fromVars: any, toVars: any): void {
        for (var id in fromVars) {
            if (typeof fromVars[id] == "number") {
                target[id] = fromVars[id];
            }
        }
        TweenLite.to(target, duration, toVars);
    }
}
