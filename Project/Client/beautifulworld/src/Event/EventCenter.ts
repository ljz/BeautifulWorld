/**
 * Created by liaojiangzheng on 18/7/31.
 */


function AddEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number) {
    g_Dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
    if(!g_EventsByObj[thisObject]){
        g_EventsByObj[thisObject] = {}
    }
    g_EventsByObj[thisObject][type] ={listener, useCapture};
}

function DispatchEvent(e: egret.Event) {
    g_Dispatcher.dispatchEvent(e);
}

function HasEventListener(type: string): boolean {
    return g_Dispatcher.hasEventListener(type)
}

function RemoveEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean) {
    g_Dispatcher.removeEventListener(type, listener, thisObject, useCapture);
    g_EventsByObj[thisObject][type]=null;
}

function RemoveAllEventByObj(thisObject: any){
    if(!g_EventsByObj[thisObject])
        return;
    for (let type in g_EventsByObj[thisObject]){
        let listener, useCapture =  g_EventsByObj[thisObject][type];
        RemoveEventListener(type, listener, useCapture);
    }
    g_EventsByObj[thisObject] = null;
}

function sendEvent(e: string, data?: any) {
    var eve = new egret.Event(e);
    eve.data = data;
    g_Dispatcher.dispatchEvent(eve);
}

let g_Dispatcher: egret.EventDispatcher = new egret.EventDispatcher();

let g_EventsByObj = {};

