var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TsEngine;
(function (TsEngine) {
    var MacroCommand = (function (_super) {
        __extends(MacroCommand, _super);
        function MacroCommand(name) {
            if (name === void 0) { name = null; }
            var _this = _super.call(this) || this;
            _this.commandName = "MacroCommand";
            _this.commandName = name || _this.commandName;
            _this.subCommands = new Array();
            //注册回调
            TsEngine.NotificationManager.add(_this.commandName, _this.execute, _this);
            return _this;
        }
        //添加命令类
        MacroCommand.prototype.addCommand = function (command) {
            this.subCommands.push(command);
        };
        //执行方法
        MacroCommand.prototype.execute = function () {
            while (this.subCommands.length > 0) {
                var command = this.subCommands.shift();
                command.execute();
            }
        };
        return MacroCommand;
    }(TsEngine.Command));
    TsEngine.MacroCommand = MacroCommand;
    __reflect(MacroCommand.prototype, "TsEngine.MacroCommand");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=MacroCommand.js.map