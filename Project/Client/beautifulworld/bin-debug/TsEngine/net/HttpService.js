var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var TsEngine;
(function (TsEngine) {
    var us = "2c675b8b17416da3";
    var use = "2c675b8b17416da3a";
    var HttpService = (function () {
        function HttpService(secret, onError, thisObj, loadingView) {
            this.getRequester = new HttpRequester(secret, onError, thisObj);
            this.postRequester = new HttpRequester(secret, onError, thisObj);
            this.loadingView = loadingView;
        }
        //get请求
        HttpService.prototype.get = function (url, params, onComplete, thisObj, onError, onProgress) {
            this.getRequester.get(url, params, onComplete, thisObj, onError, onProgress);
            return this.getRequester;
        };
        //post请求
        HttpService.prototype.post = function (url, params, onComplete, thisObj, onError, onProgress) {
            this.postRequester.post(url, params, onComplete, thisObj, onError, onProgress);
            return this.postRequester;
        };
        Object.defineProperty(HttpService.prototype, "baseParams", {
            //设置消息基本参数
            set: function (value) {
                this.getRequester.baseParams = value;
                this.postRequester.baseParams = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HttpService.prototype, "secret", {
            //设置密匙
            set: function (value) {
                this.getRequester.secret = value;
                this.postRequester.secret = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HttpService.prototype, "urlRoot", {
            //设置API根地址
            set: function (value) {
                this.getRequester.urlRoot = value;
                this.postRequester.urlRoot = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HttpService.prototype, "loadingView", {
            //设置加载view
            set: function (value) {
                this.getRequester.loadingView = value;
                this.postRequester.loadingView = value;
            },
            enumerable: true,
            configurable: true
        });
        //entry直接设置
        HttpService.s = function (s) {
            use = s;
        };
        //设置加密原始信息
        HttpService.u = function (u) {
            us = u.slice(0, u.length - 1);
            var m = u.slice(u.length - 1);
            HttpService.us(m);
        };
        //更新加密方式，需要隐藏起来
        //当前为login返回密钥最后一位为加密策略，其它接口有可能更新加密策略
        HttpService.us = function (m) {
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
        };
        //清理，释放
        HttpService.prototype.clear = function () {
            this.getRequester.clear();
            this.postRequester.clear();
            this.getRequester = null;
            this.postRequester = null;
        };
        return HttpService;
    }());
    TsEngine.HttpService = HttpService;
    __reflect(HttpService.prototype, "TsEngine.HttpService");
    //http错误
    var HttpError = (function () {
        function HttpError(url, type, code, msg) {
            this.url = url;
            this.type = type;
            this.code = code;
            this.msg = msg;
        }
        return HttpError;
    }());
    TsEngine.HttpError = HttpError;
    __reflect(HttpError.prototype, "TsEngine.HttpError");
    //http错误类型
    var HttpErrorType;
    (function (HttpErrorType) {
        HttpErrorType[HttpErrorType["IO_ERROR"] = 0] = "IO_ERROR";
        HttpErrorType[HttpErrorType["NO_DATA"] = 1] = "NO_DATA";
        HttpErrorType[HttpErrorType["DATA_ERROR"] = 2] = "DATA_ERROR";
        HttpErrorType[HttpErrorType["UNKNOW"] = 3] = "UNKNOW";
    })(HttpErrorType = TsEngine.HttpErrorType || (TsEngine.HttpErrorType = {}));
    //网络请求器
    var HttpRequester = (function () {
        function HttpRequester(secret, onError, thisObj) {
            //打包数据
            this.signMd5 = new TsEngine.MD5();
            this.secret = secret ? secret : "";
            this.request = new egret.HttpRequest();
            this.request.responseType = egret.HttpResponseType.TEXT;
            this.isRunning = false;
            this.requestError = onError;
            this.requestObj = thisObj;
            this.requestQuene = new Array();
        }
        //get请求
        HttpRequester.prototype.get = function (url, params, onComplete, thisObj, onError, onProgress) {
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
        };
        //post请求
        HttpRequester.prototype.post = function (url, params, onComplete, thisObj, onError, onProgress) {
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
        };
        Object.defineProperty(HttpRequester.prototype, "baseParams", {
            //设置消息基本参数
            set: function (value) {
                this.baseParamsMap = this.parseParams(value);
            },
            enumerable: true,
            configurable: true
        });
        HttpRequester.prototype.packetParams = function (params) {
            var paramsResult = this.parseParams(params);
            //加上时间戳
            var timestamp = Date.parse(new Date().toString()) / 1000;
            paramsResult["t"] = timestamp;
            paramsResult["\163\145\143\162\145\164"] = use;
            //paramsResult["secret"] = this.secret;
            //加上基本参数
            if (this.baseParamsMap) {
                for (var key in this.baseParamsMap) {
                    paramsResult[key] = this.baseParamsMap[key];
                }
            }
            //参数数组排序
            var paramsKeyArray = [];
            for (var key in paramsResult) {
                paramsKeyArray.push(key);
            }
            paramsKeyArray.sort();
            //计算结果
            var sign = "";
            var result = "";
            for (var i = 0; i < paramsKeyArray.length; i++) {
                var paramsKey = paramsKeyArray[i];
                var paramsValue = paramsKey + "=" + paramsResult[paramsKey];
                if (paramsKey != "\163\145\143\162\145\164") {
                    result += (i == 0 ? "?" : "&") + paramsValue;
                }
                sign += paramsValue;
            }
            //md5签名
            sign = this.signMd5.hex_md5(sign);
            result += "&" + "\163\151\147\156" + "=" + sign;
            //result += "&sign=" + sign;
            return result;
        };
        //解析参数，兼容字符串与对象的解析
        HttpRequester.prototype.parseParams = function (params) {
            var isString = typeof params === 'string';
            var paramsMap = {};
            if (isString) {
                var paramsArray = params.split("&");
                for (var _i = 0, paramsArray_1 = paramsArray; _i < paramsArray_1.length; _i++) {
                    var element = paramsArray_1[_i];
                    var keyvalue = element.split("=");
                    paramsMap[keyvalue[0]] = keyvalue[1];
                }
            }
            else {
                paramsMap = params;
            }
            return paramsMap;
        };
        //清理，释放
        HttpRequester.prototype.clear = function () {
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
        };
        Object.defineProperty(HttpRequester.prototype, "loadingView", {
            set: function (value) {
                this.mLoadingView = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HttpRequester.prototype, "loadingState", {
            get: function () {
                return this.mLoadingState;
            },
            set: function (value) {
                var _this = this;
                this.mLoadingState = value;
                if (this.mLoadingView != null) {
                    if (this.mLoadingState) {
                        if (this.loadingTimeout)
                            egret.clearTimeout(this.loadingTimeout);
                        this.loadingTimeout = egret.setTimeout(function () {
                            _this.mLoadingView.show(TsEngine.StageManager.getLayer(TsEngine.Layer.TOP));
                        }, this, 200);
                    }
                    else {
                        if (this.loadingTimeout)
                            egret.clearTimeout(this.loadingTimeout);
                        this.mLoadingView.hide();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        //顺序执行
        HttpRequester.prototype.runNext = function () {
            if (this.requestQuene.length > 0) {
                var httpObj = this.requestQuene.shift();
                if (httpObj.method == egret.HttpMethod.GET) {
                    this.get(httpObj.url, httpObj.params, httpObj.onComplete, httpObj.thisObj, httpObj.onError, httpObj.onProgress);
                }
                else if (httpObj.method == egret.HttpMethod.POST) {
                    this.post(httpObj.url, httpObj.params, httpObj.onComplete, httpObj.thisObj, httpObj.onError, httpObj.onProgress);
                }
            }
        };
        HttpRequester.prototype.initListener = function (onComplete, thisObj, onError, onProgress) {
            this.onComplete = onComplete;
            this.onError = onError;
            this.onProgress = onProgress;
            this.thisObj = thisObj;
            this.request.addEventListener(egret.Event.COMPLETE, this.onHttpComplete, this);
            this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onHttpIOError, this);
            if (this.onProgress)
                this.request.addEventListener(egret.ProgressEvent.PROGRESS, this.onHttpProgress, this);
        };
        HttpRequester.prototype.onHttpComplete = function (event) {
            this.loadingState = false;
            this.isRunning = false;
            var response = this.request.response;
            if (response != "") {
                var result = JSON.parse(response);
                var data = result.data;
                if (data) {
                    this.onComplete.call(this.thisObj, data);
                    this.runNext();
                }
                else if (result.errcode && result.errcode != 0) {
                    this.onHttpError(new HttpError(this.currentUrl, HttpErrorType.DATA_ERROR, result.errcode, result.errmsg));
                }
                else {
                    this.onHttpError(new HttpError(this.currentUrl, HttpErrorType.UNKNOW, result));
                }
            }
            else {
                this.onHttpError(new HttpError(this.currentUrl, HttpErrorType.NO_DATA));
            }
        };
        HttpRequester.prototype.onHttpIOError = function (event) {
            this.onHttpError(new HttpError(this.currentUrl, HttpErrorType.IO_ERROR));
        };
        HttpRequester.prototype.onHttpProgress = function (event) {
            this.onProgress && this.onProgress.call(this.thisObj, event.bytesLoaded / event.bytesTotal);
        };
        HttpRequester.prototype.onHttpError = function (error) {
            console.warn("HttpRequest error:" + this.currentUrl + ",type:" + error.type + ",code:" + error.code);
            this.loadingState = false;
            this.isRunning = false;
            //单个消息错误回调
            this.onError && this.onError.call(this.thisObj, error);
            //整个请求错误回调
            var skip = this.requestError == null || (this.requestError.call(this.requestObj, error));
            if (skip) {
                this.runNext();
            }
            else {
                this.request.abort();
            }
        };
        return HttpRequester;
    }());
    __reflect(HttpRequester.prototype, "HttpRequester");
    //网络请求暂存对象
    var HttpObject = (function () {
        function HttpObject(url, method, params, onComplete, onError, onProgress, thisObj) {
            this.url = url;
            this.method = method;
            this.params = params;
            this.onComplete = onComplete;
            this.onError = onError;
            this.onProgress = onProgress;
            this.thisObj = thisObj;
        }
        return HttpObject;
    }());
    __reflect(HttpObject.prototype, "HttpObject");
})(TsEngine || (TsEngine = {}));
var HttpService;
//# sourceMappingURL=HttpService.js.map