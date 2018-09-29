
module game {
	/**
	 * ui名称类型[引导用]
	 *@author sunxinzhe
	 */
	export class UIModel extends TsEngine.Model {
		constructor() {
			super();
		}
		private uiMap: Object = new Object();
		public static ON_CHANGE: string = "onUIChanged";

		public onState(name: string, instance: egret.DisplayObject, show: boolean): void {
			if (show) {
				this.onShow(name, instance);
			} else {
				this.onHide(name);
			}
		}

		/**添加UI对应*/
		public onShow(name: string, instance: egret.DisplayObject): void {
			this.uiMap[name] = instance;
			TsEngine.NotificationManager.dispatch(UIModel.ON_CHANGE, name, true);
		}

		/**添加UI对应*/
		public onHide(name: string): void {
			delete this.uiMap[name];
			TsEngine.NotificationManager.dispatch(UIModel.ON_CHANGE, name, false);
		}

		/**获取UI实例*/
		public getUI(name: string): egret.DisplayObject {
			return this.uiMap[name];
		}
	}
}
let uiModel: game.UIModel;