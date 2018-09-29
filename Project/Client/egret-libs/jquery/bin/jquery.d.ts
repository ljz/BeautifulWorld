///**
// * Created by liyang on 16/8/8.
// */
//
///**
// * Allows jQuery Promises to interop with non-jQuery promises
// */
//interface JQueryGenericPromise<T> {
//    /**
//     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
//     *
//     * @param doneFilter A function that is called when the Deferred is resolved.
//     * @param failFilter An optional function that is called when the Deferred is rejected.
//     */
//    then<U>(doneFilter: (value?: T, ...values: any[]) => U|JQueryPromise<U>, failFilter?: (...reasons: any[]) => any, progressFilter?: (...progression: any[]) => any): JQueryPromise<U>;
//
//    /**
//     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
//     *
//     * @param doneFilter A function that is called when the Deferred is resolved.
//     * @param failFilter An optional function that is called when the Deferred is rejected.
//     */
//    then(doneFilter: (value?: T, ...values: any[]) => void, failFilter?: (...reasons: any[]) => any, progressFilter?: (...progression: any[]) => any): JQueryPromise<void>;
//}
//
///**
// * Interface for the JQuery promise/deferred callbacks
// */
//interface JQueryPromiseCallback<T> {
//    (value?: T, ...args: any[]): void;
//}
//
//interface JQueryPromise<T> extends JQueryGenericPromise<T> {
//    /**
//     * Determine the current state of a Deferred object.
//     */
//    state(): string;
//    /**
//     * Add handlers to be called when the Deferred object is either resolved or rejected.
//     *
//     * @param alwaysCallbacks1 A function, or array of functions, that is called when the Deferred is resolved or rejected.
//     * @param alwaysCallbacks2 Optional additional functions, or arrays of functions, that are called when the Deferred is resolved or rejected.
//     */
//    always(alwaysCallback1?: JQueryPromiseCallback<any>|JQueryPromiseCallback<any>[], ...alwaysCallbacksN: Array<JQueryPromiseCallback<any>|JQueryPromiseCallback<any>[]>): JQueryPromise<T>;
//    /**
//     * Add handlers to be called when the Deferred object is resolved.
//     *
//     * @param doneCallbacks1 A function, or array of functions, that are called when the Deferred is resolved.
//     * @param doneCallbacks2 Optional additional functions, or arrays of functions, that are called when the Deferred is resolved.
//     */
//    done(doneCallback1?: JQueryPromiseCallback<T>|JQueryPromiseCallback<T>[], ...doneCallbackN: Array<JQueryPromiseCallback<T>|JQueryPromiseCallback<T>[]>): JQueryPromise<T>;
//    /**
//     * Add handlers to be called when the Deferred object is rejected.
//     *
//     * @param failCallbacks1 A function, or array of functions, that are called when the Deferred is rejected.
//     * @param failCallbacks2 Optional additional functions, or arrays of functions, that are called when the Deferred is rejected.
//     */
//    fail(failCallback1?: JQueryPromiseCallback<any>|JQueryPromiseCallback<any>[], ...failCallbacksN: Array<JQueryPromiseCallback<any>|JQueryPromiseCallback<any>[]>): JQueryPromise<T>;
//    /**
//     * Add handlers to be called when the Deferred object generates progress notifications.
//     *
//     * @param progressCallbacks A function, or array of functions, to be called when the Deferred generates progress notifications.
//     */
//    progress(progressCallback1?: JQueryPromiseCallback<any>|JQueryPromiseCallback<any>[], ...progressCallbackN: Array<JQueryPromiseCallback<any>|JQueryPromiseCallback<any>[]>): JQueryPromise<T>;
//
//    // Deprecated - given no typings
//    pipe(doneFilter?: (x: any) => any, failFilter?: (x: any) => any, progressFilter?: (x: any) => any): JQueryPromise<any>;
//}
//
//interface JQueryXHR extends XMLHttpRequest, JQueryPromise<any> {
//    /**
//     * The .overrideMimeType() method may be used in the beforeSend() callback function, for example, to modify the response content-type header. As of jQuery 1.5.1, the jqXHR object also contains the overrideMimeType() method (it was available in jQuery 1.4.x, as well, but was temporarily removed in jQuery 1.5).
//     */
//    overrideMimeType(mimeType: string): any;
//    /**
//     * Cancel the request.
//     *
//     * @param statusText A string passed as the textStatus parameter for the done callback. Default value: "canceled"
//     */
//    abort(statusText?: string): void;
//    /**
//     * Incorporates the functionality of the .done() and .fail() methods, allowing (as of jQuery 1.8) the underlying Promise to be manipulated. Refer to deferred.then() for implementation details.
//     */
//    then<R>(doneCallback: (data: any, textStatus: string, jqXHR: JQueryXHR) => R, failCallback?: (jqXHR: JQueryXHR, textStatus: string, errorThrown: any) => void): JQueryPromise<R>;
//    /**
//     * Property containing the parsed response if the response Content-Type is json
//     */
//    /**
//     * A function to be called if the request fails.ndex
//     */
//    error(xhr: JQueryXHR, textStatus: string, errorThrown: string): void;
//}
///**
// * Static members of jQuery (those on $ and jQuery themselves)
// */
//interface JQueryStatic {
//
//    /**
//     * Load data from the server using a HTTP POST request.
//     *
//     * @param url A string containing the URL to which the request is sent.
//     * @param data A plain object or string that is sent to the server with the request.
//     * @param success A callback function that is executed if the request succeeds. Required if dataType is provided, but can be null in that case.
//     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
//     */
//    post(url: string, data?: Object|string, success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any, dataType?: string): JQueryXHR;
//    ajax(data:any): JQueryXHR;
//}
//declare var jQuery: JQueryStatic;

declare class jQuery {
    //post(url: string, data?: Object|string, success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any, dataType?: string): any;
    static ajax(data:any): any;
}
