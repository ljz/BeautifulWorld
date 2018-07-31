/**
 * Created by liaojiangzheng on 18/7/31.
 */
function AddEventListener(type, listener, thisObject, useCapture, priority) {
    g_Dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
    if (!g_EventsByObj[thisObject]) {
        g_EventsByObj[thisObject] = {};
    }
    g_EventsByObj[thisObject][type] = { listener: listener, useCapture: useCapture };
}
function DispatchEvent(e) {
    g_Dispatcher.dispatchEvent(e);
}
function HasEventListener(type) {
    return g_Dispatcher.hasEventListener(type);
}
function RemoveEventListener(type, listener, thisObject, useCapture) {
    g_Dispatcher.removeEventListener(type, listener, thisObject, useCapture);
    g_EventsByObj[thisObject][type] = null;
}
function RemoveAllEventByObj(thisObject) {
    if (!g_EventsByObj[thisObject])
        return;
    for (var type in g_EventsByObj[thisObject]) {
        var listener = void 0, useCapture = g_EventsByObj[thisObject][type];
        RemoveEventListener(type, listener, useCapture);
    }
    g_EventsByObj[thisObject] = null;
}
function SendEvent(e, data) {
    var eve = new egret.Event(e);
    eve.data = data;
    g_Dispatcher.dispatchEvent(eve);
}
var g_Dispatcher = new egret.EventDispatcher();
var g_EventsByObj = {};
//# sourceMappingURL=EventCenter.js.map