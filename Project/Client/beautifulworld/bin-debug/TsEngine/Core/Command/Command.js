var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var Command = (function () {
        function Command() {
            //自动分配的步骤索引,默认值-1
            this.step = -1;
        }
        /**
         * 抽象执行
         * @param
         */
        Command.prototype.execute = function () { };
        return Command;
    }());
    TsEngine.Command = Command;
    __reflect(Command.prototype, "TsEngine.Command", ["TsEngine.ICommand"]);
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=Command.js.map