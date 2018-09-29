
namespace TsEngine {
	export class ObjectPool {
		private static pools: HashMap = new HashMap();

		private static getPool(type: any): Array<any> {
			return ObjectPool.pools.containsKey(type) ? ObjectPool.pools.getValue(type) : (ObjectPool.pools.put(type, new Array<any>()));
		}

		/**
		 * Get an object of the specified type. If such an object exists in the pool then 
		 * it will be returned. If such an object doesn't exist, a new one will be created.
		 * 
		 * @param type The type of object required.
		 * @param parameters If there are no instances of the object in the pool, a new one
		 * will be created and these parameters will be passed to the object constrictor.
		 * Because you can't know if a new object will be created, you can't rely on these 
		 * parameters being used. They are here to enable pooling of objects that require
		 * parameters in their constructor.
		 */
		public static getObject(type: any, id?: any, ...parameters): any {
			var pool: Array<any> = ObjectPool.getPool(id ? id : type);
			if (pool.length > 0) {
				return pool.pop();
			}
			else {
				return construct(type, parameters);
			}
		}

		/**
		 * Return an object to the pool for retention and later reuse. Note that the object
		 * still exists, so you need to clean up any event listeners etc. on the object so 
		 * that the events stop occuring.
		 * 
		 * @param object The object to return to the object pool.
		 * @param type The type of the object. If you don't indicate the object type then the
		 * object is inspected to find its type. This is a little slower than specifying the 
		 * type yourself.
		 */
		public static disposeObject(object: any, id?: any): void {
			if (id == null) {
				id = object.constructor;
			}
			var pool: Array<any> = ObjectPool.getPool(id);
			pool.push(object);
		}
	}
}