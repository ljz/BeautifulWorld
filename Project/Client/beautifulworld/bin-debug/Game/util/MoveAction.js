var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MoveAction = (function () {
    function MoveAction(target, points, time, ease, cb, rotation) {
        var _this = this;
        this.points = [];
        this.target = target;
        this.points = points;
        this.Oldrotation = target.rotation;
        this.rotation = rotation;
        egret.Tween.get(this).to({ factor: 1 }, time, (ease || egret.Ease.quadOut)).call(function () {
            if (!_this)
                return;
            egret.Tween.removeTweens(_this);
            cb && cb();
        });
    }
    Object.defineProperty(MoveAction.prototype, "factor", {
        get: function () {
            return 0;
        },
        set: function (num) {
            var _p = this.PointOnCubicBezier(this.points, num);
            this.target.x = _p.x;
            this.target.y = _p.y;
            if (this.rotation) {
                this.target.rotation = this.Oldrotation + this.rotation * num;
            }
        },
        enumerable: true,
        configurable: true
    });
    MoveAction.prototype.PointOnCubicBezier = function (cp, t) {
        var ax, bx, cx;
        var ay, by, cy;
        var tSquared, tCubed;
        var result = new egret.Point;
        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;
        tSquared = t * t;
        tCubed = tSquared * t;
        result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
        result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
        return result;
    };
    return MoveAction;
}());
__reflect(MoveAction.prototype, "MoveAction");
//# sourceMappingURL=MoveAction.js.map