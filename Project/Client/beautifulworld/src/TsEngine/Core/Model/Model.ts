//mvc中的m：数据模型基类

namespace TsEngine {
	//实现绑定接口
	export class Model implements IBindable {

		private _binder: Binder;//绑定器
		private _onChangeFunc: Function;
		public isPersistant: boolean;//是否持久保存
		constructor(source: any = null) {
			if (source != null) {
				this.inject(source);
			}
		}

		/**
		 * 绑定对象
		 * @param	property
		 * @param	target
		 * @param	setterOrFunction
		 * @return
		 */
		public bind(property: string, target: any, setterOrFunction: any = "text"): void {
			if (this._binder == null)
				this._binder = new Binder(this, this.onPropertyChange);

			if (property == null && (setterOrFunction instanceof Function)) {
				this._onChangeFunc = setterOrFunction;
			} else {
				this._binder.bind(property, target, setterOrFunction);
			}
		}

		/**
		 * 解除绑定
		 * @param	target
		 * @param	property
		 */
		public unbind(target: any, property: string = null): void {
			if (this._binder != null)
				this._binder.unbind(target, property);
		}

		public dispose(): void {
			if (!this.isPersistant) {
				if (this._binder) {
					this._binder.dispose();
					this._binder = null;
				}
				this._onChangeFunc = null;
			}
		}

		/**
		 * 为模型注入新的数据
		 **/
		public inject(data: any, bindInject: boolean = true): void {
			for (let key in data) {
				if (this.hasOwnProperty(key)) {
					if (bindInject) {
						this.setProperty(key, data[key]);
					} else {
						this[key] = data[key];
					}
				}
			}
		}

		/**设置属性值*/
		public setProperty(property: string, value: any, forceRefresh: boolean = false): void {
			if (this._binder != null)
				this._binder.setProperty(property, value, forceRefresh);
			else
				this[property] = value;
		}

		/**
		 * 强制更新一次属性
		 * @param	property
		 */
		public updateProperty(property: string): void {
			if (this._binder != null)
				this._binder.updateProperty(property);
		}

		/**
		 * 获取模型的数据源表示形式,可遍历的Object类型
		 * @param	property
		 */
		public get source(): any {
			return this._binder ? this._binder.source : this;
		}

		/**
		 * 克隆
		 */
		public clone(): Model {
			var newModel: Model = construct(this);
			newModel.inject(this.source);
			return newModel;
		}

		/**
		 * 当属性发生变化
		 */
		public onPropertyChange(): void {
			if (this._onChangeFunc != null)
				this._onChangeFunc();
		}

	}
}