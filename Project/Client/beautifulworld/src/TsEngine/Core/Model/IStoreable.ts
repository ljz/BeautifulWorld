
namespace TsEngine {
	export interface IStoreable {
		path: string;
		load(data: any): void;
		save(data: any): void;
	}
}