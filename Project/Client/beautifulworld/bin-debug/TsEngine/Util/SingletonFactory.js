var TsEngine;
(function (TsEngine) {
    function singletonFactory(type) {
        var instanse = instances.getValue(type);
        return instanse ? instanse : instances.put(type, new type());
    }
    TsEngine.singletonFactory = singletonFactory;
    var instances = new TsEngine.HashMap();
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=SingletonFactory.js.map