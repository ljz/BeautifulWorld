


namespace TsEngine {
	export class ModelStoreable extends Model implements IStoreable {

		private m_path: string;

		constructor(path: string, bindSource: any = null) {
			super(bindSource);
			this.m_path = path;
			SystemManager.addStoreable(this);
		}

		public dispose(): void {
			super.dispose();
			SystemManager.removeStoreable(this);
		}

		//保存路径
		public get path(): string {
			return this.m_path;
		}

		//载入保存数据
		public load(data: any): void {

		}

		//保存数据
		public save(data: any): void {

		}
	}
}