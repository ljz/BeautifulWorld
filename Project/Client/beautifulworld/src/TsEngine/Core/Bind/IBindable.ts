/*
绑定interface

*/


namespace TsEngine {
	export interface IBindable {

		//绑定变量到ui元素
		//param：ui元素
		//param：ts的变量
		//param：改变时调用函数
		bind(property: string, target: any, setterOrFunction?: any): void;

		//解除绑定
		//param：ui元素
		//param：ts的变量
		unbind(target: any, property?: string): void;

	}
}