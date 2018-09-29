
namespace TsEngine {
	export interface IScreen extends IWindow {
		currentView: number;
		registView(viewId: number, view: any): void;
		unRegisterView(viewId: number): void;
		hasView(viewId: number): boolean;
		getView(viewId: number): IWindow;
		showView(viewID: number, data?: any): void;
	}
}