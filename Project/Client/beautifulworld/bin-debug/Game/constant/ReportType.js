var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ReportType = (function () {
        function ReportType() {
        }
        /** 应用程序开始点 */
        ReportType.LP_PRELOADER = '1000'; //主SWF加载
        return ReportType;
    }());
    game.ReportType = ReportType;
    __reflect(ReportType.prototype, "game.ReportType");
})(game || (game = {}));
//# sourceMappingURL=ReportType.js.map