


namespace TsEngine {
	export class ScreenManager {
		private static navigator: WindowNavigator;

		public static initialize(navigator: WindowNavigator): void {
			this.navigator = navigator;
		}

		public static registScreen<T extends IScreen>(screenId: number, screen: new () => T, skinUrl: string = null, resGroup?: string): WindowData {
			if (ScreenManager.navigator == null) {
				ScreenManager.navigator = new WindowNavigator(StageManager.getLayer(Layer.SCREEN));
			}

			return ScreenManager.navigator.registWindow(screenId, screen, skinUrl, resGroup, false, false);
		}

		public static unRegisterScreen(screenId: number): void {
			ScreenManager.navigator.unRegisterWindow(screenId);
		}

		public static hasScreen(screenId: number): boolean {
			return ScreenManager.navigator.hasWindow(screenId);
		}

		public static getScreen(screenId: number): IScreen {
			return <IScreen><any>(ScreenManager.navigator.getWindow(screenId));
		}

		//获取窗口数据
		public static getScreenData(screenId: number): WindowData {
			return ScreenManager.navigator.getWindowData(screenId);
		}

		public static get currentScreen(): number {
			return ScreenManager.navigator.currentWindow;
		}

		public static set currentScreen(value: number) {
			ScreenManager.navigator.currentWindow = value;
		}

		//返回上一个
		public static back(): void {
			return ScreenManager.navigator.back();
		}

		public static showScreen(screenId: number, data: any = null, onOpen?: Function, onClose?: Function, thisObj?: any, ): void {
			ScreenManager.navigator.showWindow(screenId, data, null, onOpen, onClose, thisObj);
		}

		public static hideScreen(screenId: number, onClose?: Function, thisObj?: any, destroy: boolean = false): void {
			ScreenManager.navigator.hideWindow(screenId, onClose, thisObj, destroy);
		}

		public static isOpen(screenId: number): boolean {
			return ScreenManager.navigator.isOpen(screenId);
		}

		public static isActive(screenId: number): boolean {
			return ScreenManager.navigator.isActive(screenId);
		}
	}
}