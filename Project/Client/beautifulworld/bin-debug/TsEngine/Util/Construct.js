/**
 * This function is used to construct an object from the class and an array of parameters.
 *
 * @param type The class to construct.
 * @param parameters An array of up to ten parameters to pass to the constructor.
 */
var TsEngine;
(function (TsEngine) {
    function construct(type, parameters) {
        if (parameters === void 0) { parameters = null; }
        //如果不为class，解析对应class
        if (!(type.prototype)) {
            type = type.constructor;
        }
        if (parameters == null)
            return new type();
        switch (parameters.length) {
            case 0:
                return new type();
            case 1:
                return new type(parameters[0]);
            case 2:
                return new type(parameters[0], parameters[1]);
            case 3:
                return new type(parameters[0], parameters[1], parameters[2]);
            case 4:
                return new type(parameters[0], parameters[1], parameters[2], parameters[3]);
            case 5:
                return new type(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4]);
            case 6:
                return new type(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5]);
            case 7:
                return new type(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5], parameters[6]);
            case 8:
                return new type(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5], parameters[6], parameters[7]);
            case 9:
                return new type(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5], parameters[6], parameters[7], parameters[8]);
            case 10:
                return new type(parameters[0], parameters[1], parameters[2], parameters[3], parameters[4], parameters[5], parameters[6], parameters[7], parameters[8], parameters[9]);
            default:
                return null;
        }
    }
    TsEngine.construct = construct;
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=Construct.js.map