var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var ObjectPool = (function () {
        function ObjectPool() {
        }
        ObjectPool.getPool = function (type) {
            return ObjectPool.pools.containsKey(type) ? ObjectPool.pools.getValue(type) : (ObjectPool.pools.put(type, new Array()));
        };
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
        ObjectPool.getObject = function (type, id) {
            var parameters = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                parameters[_i - 2] = arguments[_i];
            }
            var pool = ObjectPool.getPool(id ? id : type);
            if (pool.length > 0) {
                return pool.pop();
            }
            else {
                return TsEngine.construct(type, parameters);
            }
        };
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
        ObjectPool.disposeObject = function (object, id) {
            if (id == null) {
                id = object.constructor;
            }
            var pool = ObjectPool.getPool(id);
            pool.push(object);
        };
        ObjectPool.pools = new TsEngine.HashMap();
        return ObjectPool;
    }());
    TsEngine.ObjectPool = ObjectPool;
    __reflect(ObjectPool.prototype, "TsEngine.ObjectPool");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=ObjectPool.js.map