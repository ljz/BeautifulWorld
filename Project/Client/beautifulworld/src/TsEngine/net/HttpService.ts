/**
 * @desc [description]
 * * 网络请求服务,简化调用方式，支持多条请求自动get,post队列
 *  HttpService=new TsEngine.HttpService(InitMark.secret);//创建网络服务
    HttpService.baseParams={isWxGame:InitMark.isWxgame,userId:InitMark.userId,secret:InitMark.secret};//设置服务基本参数
    //post请求
    HttpService.post(ServerMsg.LOGIN,"userId=" + InitMark.userId+"&friendCode="+ WxQueryData[`friendCode`],(data) => {
        console.log(data);
    }, this);
    //get请求
    HttpService.get(ServerMsg.SHOW_DONATE,{uid:InitMark.uid},(data) => {
        console.log(data);
    }, this);
*/
namespace TsEngine {
    let us = "2c675b8b17416da3";
    let use = "2c675b8b17416da3a";
    export class HttpService {
        private getRequester: HttpRequester;
        private postRequester: HttpRequester;
        constructor(secret?: string, onError?: Function, thisObj?: any, loadingView?: ILoading) {
            this.getRequester = new HttpRequester(secret, onError, thisObj);
            this.postRequester = new HttpRequester(secret, onError, thisObj);
            this.loadingView = loadingView;
        }

        //get请求
        public get(url: string, params: any, onComplete: Function, thisObj?: any, onError?: Function, onProgress?: Function): HttpRequester {
            this.getRequester.get(url, params, onComplete, thisObj, onError, onProgress);
            return this.getRequester;
        }

        //post请求
        public post(url: string, params: any, onComplete: Function, thisObj?: any, onError?: Function, onProgress?: Function): HttpRequester {
            this.postRequester.post(url, params, onComplete, thisObj, onError, onProgress);
            return this.postRequester;
        }

        //设置消息基本参数
        public set baseParams(value: any) {
            this.getRequester.baseParams = value;
            this.postRequester.baseParams = value;
        }

        //设置密匙
        public set secret(value: string) {
            this.getRequester.secret = value;
            this.postRequester.secret = value;
        }

        //设置API根地址
        public set urlRoot(value: string) {
            this.getRequester.urlRoot = value;
            this.postRequester.urlRoot = value;
        }

        //设置加载view
        public set loadingView(value: ILoading) {
            this.getRequester.loadingView = value;
            this.postRequester.loadingView = value;
        }

        //entry直接设置
        public static s(s: string): void {
            use = s;
        }

        //设置加密原始信息
        public static u(u: string): void {
            us = u.slice(0, u.length - 1);
            const m = u.slice(u.length - 1);
            HttpService.us(m);
        }

        //更新加密方式，需要隐藏起来
        //当前为login返回密钥最后一位为加密策略，其它接口有可能更新加密策略
        public static us(m: string): void {
            switch (m.charCodeAt(0)) {
                case 97:
                    var arr = us.split("");
                    arr.reverse();
                    use = arr.join("");
                    break;
                case 98:
                    use = us + 17785;
                    break;
            }
        }

        //清理，释放
        public clear(): void {
            this.getRequester.clear();
            this.postRequester.clear();
            this.getRequester = null;
            this.postRequester = null;
        }
    }


    //http错误
    export class HttpError {
        public type: HttpErrorType;
        public code: number;
        public url: string;
        public msg: string;

        constructor(url: string, type: HttpErrorType, code?: number, msg?: string) {
            this.url = url;
            this.type = type;
            this.code = code;
            this.msg = msg;
        }
    }

    //http错误类型
    export enum HttpErrorType {
        IO_ERROR,
        NO_DATA,
        DATA_ERROR,
        UNKNOW
    }

    //网络请求器
    class HttpRequester {

        private request: egret.HttpRequest;
        private requestError: Function;
        private requestObj: any;
        private onComplete: Function;
        private onError: Function;
        private onProgress: Function;
        private thisObj: any;
        private isRunning: boolean;
        private requestQuene: Array<HttpObject>;
        private baseParamsMap: Object;
        private currentUrl: string;
        public secret: string;
        public urlRoot: string;
        private mLoadingView: ILoading;
        private mLoadingState: boolean;
        private loadingTimeout: number;
        constructor(secret?: string, onError?: Function, thisObj?: any) {
            this.secret = secret ? secret : "";
            this.request = new egret.HttpRequest();
            this.request.responseType = egret.HttpResponseType.TEXT;
            this.isRunning = false;
            this.requestError = onError;
            this.requestObj = thisObj;
            this.requestQuene = new Array<HttpObject>();
        }

        //get请求
        public get(url: string, params: any, onComplete: Function, thisObj?: any, onError?: Function, onProgress?: Function): void {
            if (this.isRunning) {
                this.requestQuene.push(new HttpObject(url, egret.HttpMethod.GET, params, onComplete, onError, onProgress, thisObj));
                return;
            }
            this.currentUrl = url.replace(/\s/gi, '');
            this.currentUrl = (this.urlRoot && (this.currentUrl.indexOf("http") == -1)) ? this.urlRoot + this.currentUrl : this.currentUrl;
            this.isRunning = true;
            this.initListener(onComplete, thisObj, onError, onProgress);
            params = this.packetParams(params);
            this.request.open(this.currentUrl + params, egret.HttpMethod.GET);
            this.request.send();
            this.loadingState = true;
        }

        //post请求
        public post(url: string, params: any, onComplete: Function, thisObj?: any, onError?: Function, onProgress?: Function): void {
            if (this.isRunning) {
                this.requestQuene.push(new HttpObject(url, egret.HttpMethod.POST, params, onComplete, onError, onProgress, thisObj));
                return;
            }
            this.currentUrl = url.replace(/\s/gi, '');
            this.currentUrl = (this.urlRoot && (this.currentUrl.indexOf("http") == -1)) ? this.urlRoot + this.currentUrl : this.currentUrl;
            this.isRunning = true;
            this.initListener(onComplete, thisObj, onError, onProgress);
            params = this.packetParams(params);
            this.request.open(this.currentUrl + params, egret.HttpMethod.POST);
            this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.request.send();
            this.loadingState = true;
        }

        //设置消息基本参数
        public set baseParams(value: any) {
            this.baseParamsMap = this.parseParams(value);
        }

        //打包数据
        private signMd5 = new MD5();
        private packetParams(params: any): string {
            let paramsResult = this.parseParams(params);
            //加上时间戳
            let timestamp: number = Date.parse(new Date().toString()) / 1000;
            paramsResult["t"] = timestamp;
            paramsResult["\163\145\143\162\145\164"] = use;
            //paramsResult["secret"] = this.secret;
            //加上基本参数
            if (this.baseParamsMap) {
                for (const key in this.baseParamsMap) {
                    paramsResult[key] = this.baseParamsMap[key];
                }
            }
            //参数数组排序
            let paramsKeyArray = [];
            for (const key in paramsResult) {
                paramsKeyArray.push(key);
            }
            paramsKeyArray.sort();
            //计算结果
            let sign = "";
            let result = "";
            for (let i = 0; i < paramsKeyArray.length; i++) {
                let paramsKey = paramsKeyArray[i];
                let paramsValue = paramsKey + "=" + paramsResult[paramsKey];
                if (paramsKey != "\163\145\143\162\145\164") {
                    result += (i == 0 ? "?" : "&") + paramsValue;
                }
                sign += paramsValue;
            }
            //md5签名
            sign = this.signMd5.hex_md5(sign);
            result += `&${"\163\151\147\156"}=` + sign;
            //result += "&sign=" + sign;
            return result;
        }

        //解析参数，兼容字符串与对象的解析
        private parseParams(params: any): Object {
            let isString = typeof params === 'string';
            let paramsMap = {};
            if (isString) {
                let paramsArray: Array<string> = params.split("&");
                for (const element of paramsArray) {
                    let keyvalue = element.split("=");
                    paramsMap[keyvalue[0]] = keyvalue[1];
                }
            } else {
                paramsMap = params;
            }
            return paramsMap;
        }

        //清理，释放
        public clear(): void {
            this.request.removeEventListener(egret.Event.COMPLETE, this.onHttpComplete, this);
            this.request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onHttpIOError, this);
            if (this.onProgress)
                this.request.removeEventListener(egret.ProgressEvent.PROGRESS, this.onHttpProgress, this);
            this.onComplete = null;
            this.onError = null;
            this.onProgress = null;
            this.request = null;
            this.requestQuene.length = 0;
            this.requestQuene = null;
        }

        public set loadingView(value: ILoading) {
            this.mLoadingView = value;
        }

        public get loadingState(): boolean {
            return this.mLoadingState;
        }

        public set loadingState(value: boolean) {
            this.mLoadingState = value;
            if (this.mLoadingView != null) {
                if (this.mLoadingState) {
                    if (this.loadingTimeout) egret.clearTimeout(this.loadingTimeout);
                    this.loadingTimeout = egret.setTimeout(() => {
                        this.mLoadingView.show(StageManager.getLayer(Layer.TOP));
                    }, this, 200);
                } else {
                    if (this.loadingTimeout) egret.clearTimeout(this.loadingTimeout);
                    this.mLoadingView.hide();
                }
            }
        }

        //顺序执行
        private runNext(): void {
            if (this.requestQuene.length > 0) {
                let httpObj = this.requestQuene.shift();
                if (httpObj.method == egret.HttpMethod.GET) {
                    this.get(httpObj.url, httpObj.params, httpObj.onComplete, httpObj.thisObj, httpObj.onError, httpObj.onProgress);
                } else if (httpObj.method == egret.HttpMethod.POST) {
                    this.post(httpObj.url, httpObj.params, httpObj.onComplete, httpObj.thisObj, httpObj.onError, httpObj.onProgress);
                }
            }
        }

        private initListener(onComplete: Function, thisObj: any, onError?: Function, onProgress?: Function): void {
            this.onComplete = onComplete;
            this.onError = onError;
            this.onProgress = onProgress;
            this.thisObj = thisObj;
            this.request.addEventListener(egret.Event.COMPLETE, this.onHttpComplete, this);
            this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onHttpIOError, this);
            if (this.onProgress)
                this.request.addEventListener(egret.ProgressEvent.PROGRESS, this.onHttpProgress, this);
        }

        private onHttpComplete(event: egret.Event): void {
            this.loadingState = false;
            this.isRunning = false;
            let response = this.request.response;
            if (response != "") {
                let result = JSON.parse(response);
                let data = result.data;
                if (data) {
                    this.onComplete.call(this.thisObj, data);
                    this.runNext();
                } else if (result.errcode && result.errcode != 0) {
                    this.onHttpError(new HttpError(this.currentUrl, HttpErrorType.DATA_ERROR, result.errcode, result.errmsg));
                } else {
                    this.onHttpError(new HttpError(this.currentUrl, HttpErrorType.UNKNOW, result));
                }
            } else {
                this.onHttpError(new HttpError(this.currentUrl, HttpErrorType.NO_DATA));
            }
        }

        private onHttpIOError(event: egret.IOErrorEvent): void {
            this.onHttpError(new HttpError(this.currentUrl, HttpErrorType.IO_ERROR));
        }

        private onHttpProgress(event: egret.ProgressEvent): void {
            this.onProgress && this.onProgress.call(this.thisObj, event.bytesLoaded / event.bytesTotal);
        }

        private onHttpError(error: HttpError): void {
            console.warn("HttpRequest error:" + this.currentUrl + ",type:" + error.type + ",code:" + error.code);
            this.loadingState = false;
            this.isRunning = false;
            //单个消息错误回调
            this.onError && this.onError.call(this.thisObj, error);
            //整个请求错误回调
            let skip = this.requestError == null || (this.requestError.call(this.requestObj, error));
            if (skip) {
                this.runNext();
            } else {
                this.request.abort();
            }
        }
    }

    //网络请求暂存对象
    class HttpObject {
        public url: string;
        public method: string;
        public params: any;
        public onComplete: Function;
        public onError: Function;
        public onProgress: Function;
        public thisObj: any;
        constructor(url: string, method: string, params: any, onComplete: Function, onError: Function, onProgress: Function, thisObj: any) {
            this.url = url;
            this.method = method;
            this.params = params;
            this.onComplete = onComplete;
            this.onError = onError;
            this.onProgress = onProgress;
            this.thisObj = thisObj;
        }
    }
}
let HttpService: TsEngine.HttpService;
