
namespace TsEngine {
	export interface ICommand {
		/**
		 * 命令执行
		 * @param params
		 */
		execute(): void;
	}
}