var TweenLite;
(function (TweenLite) {
    function to(target, duration, vars) {
        if (vars.onUpdate) {
            vars.onChange = vars.onUpdate;
            vars.onChangeObj = vars.onUpdateScope;
        }
        var tw = egret.Tween.get(target, vars);
        tw.to(vars, duration * 1000, vars.ease);
        if (vars.onComplete) {
            tw.call(vars.onComplete, vars.onCompleteScope);
        }
    }
    TweenLite.to = to;
    function killTweensOf(target, vars) {
        egret.Tween.removeTweens(target);
    }
    TweenLite.killTweensOf = killTweensOf;
    function from(target, duration, vars) {
        var toVars = {};
        for (var id in vars) {
            if (typeof vars[id] == "number") {
                toVars[id] = target[id];
            }
            else {
                toVars[id] = vars[id];
            }
        }
        TweenLite.fromTo(target, duration, vars, toVars);
    }
    TweenLite.from = from;
    function fromTo(target, duration, fromVars, toVars) {
        for (var id in fromVars) {
            if (typeof fromVars[id] == "number") {
                target[id] = fromVars[id];
            }
        }
        TweenLite.to(target, duration, toVars);
    }
    TweenLite.fromTo = fromTo;
})(TweenLite || (TweenLite = {}));
//# sourceMappingURL=TweenLite.js.map