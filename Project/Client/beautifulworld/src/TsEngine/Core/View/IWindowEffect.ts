

namespace TsEngine {
	export interface IWindowEffect extends IEffect {
		//显示效果
		show(target: egret.DisplayObject, onComplete: Function, args?: any): void;

		//隐藏效果
		hide(target: egret.DisplayObject, onComplete: Function, args?: any): void;
	}
}