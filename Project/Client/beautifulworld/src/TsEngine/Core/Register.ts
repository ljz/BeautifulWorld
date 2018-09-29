

namespace TsEngine {
	export class Register {
		constructor() {
			this.initialize();
		}

		public initialize(): void {
			// 留给子类完善
			throw new Error("此接口必须由子类覆盖");
		}

		public static initialize<T extends Register>(c: { new (): T; }): void {
			singletonFactory(c);
		}
	}
}