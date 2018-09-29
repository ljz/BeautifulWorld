
namespace TsEngine {
	export interface ILoading extends IWindow {
		onLoading(progress: number, message?: string): void;
	}
}