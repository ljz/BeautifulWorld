//绑定器，绑定数据模型中的属性。
//一个绑定器可以绑定很多属性。

namespace TsEngine {
	export class Binder {
		//绑定的内容，这个是一个static的字典，所有绑定相关的内容存到这个里面
		private static bindings: HashMap = new HashMap();//source，binder

		public source: any;//数据模型对象，数据源， 在数据模型中调用Binder(this, ...),将自己传入
		private propertys: Object = new Object();//绑定的属性集合
		private propertyCount: number = 0;//属性数量
		private onChange: Function;//改变函数，改变了就调用这个函数。
		/*
		source：
		onChange：
		*/
		constructor(source: any, onChange: Function = null) {
			this.source = source;
			this.onChange = onChange;
			Binder.bindings.put(source, this);
		}

		/**
		 * 绑定目标
		 * eg...model.bind("price",price_txt,"text")
		 * eg...model.bind("price",price_txt,onPriceChange)
		 * @param	property
		 * @param	target
		 * @param	setterOrFunction
		 */
		public bind(property: string, target: any, setterOrFunction: any = "text"): void {
			var bindProperty: BindProperty = this.propertys[property];
			if (bindProperty == null) {
				bindProperty = new BindProperty(this.source, property, this.onChange);
				this.propertys[property] = bindProperty;
				this.propertyCount++;
			}
			bindProperty.bind(target, setterOrFunction);
		}

		/**
		 * 解除绑定
		 * @param	target
		 * @param	property：如果为空的话就解绑定这个target所有的数据绑定
		 */
		public unbind(target: any, property: string = "text"): void {
			var bindProperty: BindProperty;
			var instance: Binder = this;
			if (property) {
				bindProperty = this.propertys[property];
				if (bindProperty)
					this.unbindSingle(bindProperty, target);
			} else {
				for (var i in this.propertys) {
					bindProperty = this.propertys[i];
					this.unbindSingle(bindProperty, target);
				}
			}
		}

		//解除单个
		public unbindSingle(bproperty: BindProperty, target: any): void {
			var hasElement: boolean = bproperty.unbind(target);
			if (!hasElement) {
				delete this.propertys[bproperty.property];
				this.propertyCount--;
				if (this.propertyCount <= 0)
					Binder.bindings.remove(this.source);
			}
		}


		/**
		 * 设置属性，触发绑定
		 * @param	property
		 * @param	value
		 *@param	forceRefresh
		 */
		public setProperty(property: string, value: any, forceRefresh: boolean = false): void {
			var bindProperty: BindProperty = this.propertys[property];
			if (bindProperty) {
				bindProperty.forceRefresh = forceRefresh;
				bindProperty.value = value;
			} else {//没有绑定这个属性，简单存储即可。
				this.source[property] = value;//从这里可以看出，source是用于存储属性和值的关系表的。
			}
		}

		/**
		 * 强制更新一次属性
		 * @param	property
		 *ps:update只是刷新，并不是设置，注意区分。
		 */
		public updateProperty(property: string): void {
			var bindProperty: BindProperty = this.propertys[property];
			if (bindProperty)
				this.setProperty(property, this.source[property], true);
		}

		/**
		 * 获取属性值
		 * @param	property
		 * @return
		 */
		public getProperty(property: string): any {
			return this.source[property];
		}

		/**
		 * 清除
		 */
		public dispose(): void {
			if (this.propertys != null) {
				for (var i in this.propertys) {
					var item: BindProperty = this.propertys[i];
					item.dispose();
					delete this.propertys[item.property];
				}
				this.propertys = null;
			}
			if (this.source != null) {
				Binder.bindings.remove(this.source);//从root中干掉。
				this.source = null;
			}

			this.propertyCount = 0;
			this.onChange = null;
		}

		public static create(source: any, property: string, target: any, setterOrFunction: any = "text"): Binder {
			var binder: Binder = Binder.bindings.getValue(source) || (new Binder(source));
			binder.bind(property, target, setterOrFunction);
			return binder;
		}

		public static remove(target: any, property: string = "text"): void {
			var length: number = Binder.bindings.length;
			for (var i: number = 0; i < length; i++) {
				var item: Binder = Binder.bindings[i];
				item.unbind(target, property);
			}
		}
	}



	/*
	*绑定属性对象
	*/
	class BindProperty {
		public source: any;//数据源，gateModel，playerModel等等，Model的子类
		public property: string;//数据属性
		public oldValue: any;
		public newValue: any;
		public forceRefresh: boolean;
		public targets: HashMap = new HashMap();//一个属性可以绑定到多个UI元素上。
		private targetCount: number = 0;//UI元素的个数。
		private onChange: Function;
		/*
		source:数据源
		property：属性名称
		onChange：绑定器的onChange函数，这个是创建绑定器的时候传入的。比如：this._binder = new Binder(this, this.onPropertyChange);这里的onPropertyChange。
		*/
		constructor(source: any, property: string, onChange: Function = null) {
			this.source = source;
			this.onChange = onChange;
			this.property = property;
			this.oldValue = this.newValue = source[property];
			let instance = this;

			//加了这个东西，就是说给source定义了一个叫做property的属性，这个属性的设置的时候就是执行下面的set接口了。get也是执行下面的get接口。
			//牛逼呀，如果没有属性，但是设置绑定属性了，那么就相当于定义了这个属性。
			Object.defineProperty(source, property, {
				set: function (newVal) {
					instance.value = newVal;
				},
				get: function () {
					return instance.value;
				}
			});
		}

		//把这个属性绑定到一个新的UI元素：target上。
		public bind(target: any, setterOrFunction: any = null): void {
			if (setterOrFunction == null) setterOrFunction = this.property;
			if (!this.targets.containsKey(target)) {//没有，创建一个新的加进去。
				this.targets.put(target, new BindTarget(target, setterOrFunction));
				this.targetCount++;
			}
			//设置数据
			this.oldValue = this.value;
			this.fixBind(this.targets.getValue(target), this.oldValue);
		}

		public unbind(target: any): boolean {
			var bindTarget: BindTarget = this.targets.getValue(target);
			if (bindTarget) {
				bindTarget.dispose();
				this.targets.remove(target);
				this.targetCount--;
				return this.targetCount > 0;
			}
			return true;
		}

		//定义一个属性，get/set
		public get value(): any {
			return this.newValue;
		}

		public set value(val: any) {//设置值的时候
			//强制刷新或者改变了值那么就设置值，
			if (this.forceRefresh || (this.source[this.property] !== val)) {
				this.oldValue = this.value;
				this.newValue = val;
				for (var i in this.targets.content) {//遍历每个UI元素（目标），然后设置为新数据。
					var bindTarget: BindTarget = this.targets.content[i];
					this.fixBind(bindTarget, val);
				}
				if (this.onChange != null) this.onChange();//调用一下onChange
			}
		}

		private fixBind(bindTarget: BindTarget, val: any): void {
			if (bindTarget.targetSetter != null) {
				val = (bindTarget.targetSetter == 'text') ? <string><any>val : val;
				bindTarget.target[bindTarget.targetSetter] = val;
			} else if (bindTarget.targetFunction != null) {
				var len: number = bindTarget.targetFunction.length;
				if (len == 0) {
					bindTarget.targetFunction.call(bindTarget.target);
				} else if (len == 1) {
					bindTarget.targetFunction.call(bindTarget.target, val);
				} else if (len == 2) {
					bindTarget.targetFunction.call(bindTarget.target, val, this.oldValue);
				} else {
					throw new Error("绑定属性的回调函数参数错误!");
				}
			}
		}

		public dispose(): void {
			this.source = null;
			this.property = null;
			this.oldValue = null;
			this.targetCount = 0;
			for (var i in this.targets.content) {
				var bindTarget: BindTarget = this.targets.content[i];
				bindTarget.dispose();
			}
			this.targets.clear();
			this.targets = null;
		}
	}

	class BindTarget {
		public target: any;
		public targetSetter: string;
		public targetFunction: Function;
		constructor(target: any, setterOrFunction: any = null) {
			this.target = target;
			if (typeof (setterOrFunction) == 'function') {
				this.targetSetter = null;
				this.targetFunction = <Function><any>setterOrFunction;
			} else {
				this.targetSetter = <string><any>setterOrFunction;
				this.targetFunction = null;
			}
		}

		public dispose(): void {
			this.target = null;
			this.targetSetter = null;
			this.targetFunction = null;
		}
	}
}