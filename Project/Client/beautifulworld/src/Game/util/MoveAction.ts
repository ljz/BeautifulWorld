class MoveAction {
    public points = []
    public target: any;
    public rotation: number;
    public Oldrotation: number;
    constructor(target: any, points: any, time: number, ease?: Function, cb?: Function, rotation?) {
        this.target = target;
        this.points = points;
        this.Oldrotation = target.rotation;
        this.rotation = rotation;

        egret.Tween.get(this).to({ factor: 1 }, time, (ease || egret.Ease.quadOut)).call(() => {
            if (!this) return;
            egret.Tween.removeTweens(this);
            cb && cb();
        });
    }

    public get factor() {
        return 0;
    }

    public set factor(num: number) {
        let _p = this.PointOnCubicBezier(this.points, num);
        this.target.x = _p.x;
        this.target.y = _p.y;
        if (this.rotation) {
            this.target.rotation = this.Oldrotation + this.rotation * num;
        }
    }

    public PointOnCubicBezier(cp, t) {
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
    }
}