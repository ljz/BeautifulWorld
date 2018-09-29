
namespace TsEngine {
	export class MacroCommand extends Command {
		private subCommands: Array<Command>;
		private commandName: string = "MacroCommand";

		constructor(name: string = null) {
			super();
			this.commandName = name || this.commandName;
			this.subCommands = new Array<Command>();

			//注册回调
			NotificationManager.add(this.commandName, this.execute, this);
		}

		//添加命令类
		public addCommand(command: Command): void {
			this.subCommands.push(command);
		}

		//执行方法
		public execute(): void {
			while (this.subCommands.length > 0) {
				var command: any = this.subCommands.shift();
				command.execute();
			}
		}
	}
}