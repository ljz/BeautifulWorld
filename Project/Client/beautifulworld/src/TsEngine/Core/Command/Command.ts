
namespace TsEngine {
	export class Command implements ICommand {
		//自动分配的步骤索引,默认值-1
		public step: number = -1;
		constructor() { }

		/**
		 * 抽象执行
		 * @param
		 */
		public execute(): void { }
	}
}