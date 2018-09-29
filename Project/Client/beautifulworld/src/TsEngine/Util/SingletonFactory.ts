namespace TsEngine {
	export function singletonFactory(type: any): any {
		var instanse: any = instances.getValue(type);
		return instanse ? instanse : instances.put(type, new type());
	}


	var instances: HashMap = new HashMap();
}