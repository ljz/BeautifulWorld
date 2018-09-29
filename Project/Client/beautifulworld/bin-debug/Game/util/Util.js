/**
 * Created by zhouchuang on 16/9/7.
 */
var util;
(function (util) {
    //处理头像
    function headImg(url, size) {
        size = size || 96;
        url = url || "";
        var resUrl = url;
        var reg = new RegExp('\/0$');
        resUrl = url.replace(reg, '\/64');
        if (url.indexOf("/132") != -1) {
            resUrl = url.replace(/\/132$/, "\/64");
        }
        return resUrl;
    }
    util.headImg = headImg;
    /**
     * 用户头像
     * @param target
     * @param url
     * @param size //用户头像（有0、46、64、96、132数值可选，0代表640*640正方形头像）
     */
    function setRemoteAvatar(target, url, size) {
        if (size === void 0) { size = 64; }
        if (!target) {
            console.warn('setRemoteAvatar fail, target is null,url=', url);
            return;
        }
        var defaultHead = "common_json.common_img_head" + playerModel.gender;
        target.source = defaultHead;
        if (!url) {
            console.warn('setRemoteAvatar fail, url is null');
            return;
        }
        var resUrl = url;
        var _index = url.indexOf("_png");
        if (_index != -1) {
        }
        else if (resUrl == "/0" || resUrl == "") {
            resUrl = defaultHead;
        }
        else {
            resUrl = url.replace(/\/0$/, "\/" + size);
            if (url.indexOf("/132") != -1) {
                resUrl = url.replace(/\/132$/, "\/" + size);
            }
        }
        util.setRemoteTexture(target, resUrl);
    }
    util.setRemoteAvatar = setRemoteAvatar;
    function setRemoteTexture(target, url) {
        if (url && url != "") {
            RES.getResByUrl(url, function (texture) {
                if (texture) {
                    target.source = texture;
                }
                else {
                    console.warn('load remote res fail, texture is null,url=', url);
                }
            }, this, RES.ResourceItem.TYPE_IMAGE);
        }
    }
    util.setRemoteTexture = setRemoteTexture;
    function setScale(node, scale) {
        node.scaleX = node.scaleY = scale;
    }
    util.setScale = setScale;
    //深克隆
    function deepClone(myObj) {
        if (typeof (myObj) != 'object')
            return myObj;
        if (myObj == null)
            return myObj;
        var myNewObj = new Object();
        for (var i in myObj) {
            if (myObj[i] instanceof Array) {
                myNewObj[i] = util.cloneArr(myObj[i]);
            }
            else {
                myNewObj[i] = util.deepClone(myObj[i]);
            }
        }
        return myNewObj;
    }
    util.deepClone = deepClone;
    function cloneArr(array) {
        var newArr = new Array();
        for (var i = 0; i <= array.length - 1; i++) {
            var itemi = array[i];
            if (itemi && itemi.length && itemi.push) {
                itemi = itemi.clone();
            }
            else if (typeof (itemi) == "object") {
                itemi = util.deepClone(itemi);
            }
            else {
            }
            newArr.push(itemi);
        }
        return newArr;
    }
    util.cloneArr = cloneArr;
    function remove(node) {
        if (node.parent)
            node.parent.removeChild(node);
    }
    util.remove = remove;
    function removeFromParent(obj) {
        if (!obj) {
            return;
        }
        if (obj.parent) {
            if (typeof obj.parent.removeElement == "function") {
                obj.parent.removeElement(obj);
            }
            else {
                obj.parent.removeChild(obj);
            }
        }
    }
    util.removeFromParent = removeFromParent;
    function getUrlParamMap() {
        //正式使用
        if (!location.search && !location.hash)
            return null;
        var params = {};
        var parse = function (str) {
            var fragments = str.split('&');
            for (var i = 0; i < fragments.length; i++) {
                var pairs = fragments[i].split('=');
                params[pairs[0]] = decodeURIComponent(pairs[1]);
            }
        };
        if (location.hash)
            parse(location.hash.substr(1));
        if (location.search) {
            var idx = location.search.indexOf("?");
            if (idx != -1) {
                var hash = location.search.substr(idx + 1);
                hash = hash.split('!')[0];
                parse(hash);
            }
        }
        return params;
    }
    util.getUrlParamMap = getUrlParamMap;
    function formatTime(sec, showHour) {
        var day = Math.floor(sec / 3600 / 24);
        if (day > 0) {
            return day + "天";
        }
        var hour = Math.floor(sec / 3600);
        var second = Math.floor(sec % 3600);
        var minute = Math.floor(second / 60);
        second = second % 60;
        var hourToMinute = hour * 60;
        minute = showHour ? minute : (hourToMinute + minute);
        if (showHour && sec < 0) {
            return "00:00:00";
        }
        if (sec < 0) {
            return "0";
        }
        var str = "";
        if (showHour) {
            if (showHour != "auto" || hour != 0) {
                if (hour >= 10) {
                    str = hour.toString();
                }
                else {
                    str = "0" + hour;
                }
                str = str + ":";
            }
        }
        if (minute >= 10) {
            str = str + minute;
        }
        else {
            str = str + "0" + minute;
        }
        if (second >= 10) {
            str = str + ":" + second;
        }
        else {
            str = str + ":0" + second;
        }
        return str;
    }
    util.formatTime = formatTime;
    /**
      * 计数单位：天，小时，分钟
 
      超过24小时显示为XX天XX时（例如：12天23时）
 
      小于24小时显示为XX时XX分（例如：22时52分）
 
      小于1小时显示为XX分XX秒（例如：53分25秒）
      * @param sec
      * @returns {any}
      */
    function formatTimeCNNew3(sec) {
        if (sec < 0) {
            return "";
        }
        var str = "";
        var day = Math.floor(sec / 3600 / 24);
        var hour = Math.floor(sec / 3600);
        var minute = Math.floor(sec / 60);
        var second = sec;
        if (day > 0) {
            sec = sec % (24 * 3600);
            hour = Math.floor(sec / 3600);
            str += day + "天";
            str += hour >= 10 ? hour + "时" : "0" + hour + "时";
        }
        else if (hour > 0) {
            minute = Math.floor((sec % 3600) / 60);
            str += hour >= 10 ? hour + "时" : "0" + hour + "时";
            str += minute >= 10 ? minute + "分" : "0" + minute + "分";
        }
        else {
            if (minute > 0) {
                str += minute >= 10 ? minute + "分" : "0" + minute + "分";
                second = Math.floor((sec % 3600) % 60);
                str += second >= 10 ? second + "秒" : "0" + second + "秒";
            }
            else {
                str += "00分";
                str += second >= 10 ? second + "秒" : "0" + second + "秒";
            }
        }
        return str;
    }
    util.formatTimeCNNew3 = formatTimeCNNew3;
    /**
     * 00：00：00的显示形式
     */
    function formatTimeHMS(sec) {
        if (sec < 0) {
            return "";
        }
        var str = "";
        var hour = Math.floor(sec / 3600);
        var minute = Math.floor((sec % 3600) / 60);
        var second = Math.floor((sec % 3600) % 60);
        if (hour >= 10) {
            str += hour.toString() + ":";
        }
        else {
            str += "0" + hour + ":";
        }
        if (minute >= 10) {
            str = str + minute;
        }
        else {
            str = str + "0" + minute;
        }
        if (second >= 10) {
            str = str + ":" + second;
        }
        else {
            str = str + ":0" + second;
        }
        return str;
    }
    util.formatTimeHMS = formatTimeHMS;
    function strSub(str, num) {
        if (num >= str.length) {
            return str;
        }
        return str.substring(0, num) + "...";
    }
    util.strSub = strSub;
    //获得两点连线与y轴正半轴之间的夹角
    function getAngle(px, py, mx, my) {
        var x = Math.abs(px - mx);
        var y = Math.abs(py - my);
        var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var cos = y / z;
        var radina = Math.acos(cos); //用反三角函数求弧度
        var angle = Math.floor(180 / (Math.PI / radina)); //将弧度转换成角度
        if (mx > px && my > py) {
            angle = 180 - angle;
        }
        if (mx == px && my > py) {
            angle = 180;
        }
        if (mx > px && my == py) {
            angle = 90;
        }
        if (mx < px && my > py) {
            angle = 180 + angle;
        }
        if (mx < px && my == py) {
            angle = 270;
        }
        if (mx < px && my < py) {
            angle = 360 - angle;
        }
        return angle;
    }
    util.getAngle = getAngle;
    /**
     * 创建富文本
     */
    function createRichText(config, label) {
        var html = config.text || "";
        var list = html.match(/<.+?>[^<]*/g);
        var curFont = config;
        if (label) {
            curFont.size = curFont.size || label.size;
            curFont.textColor = curFont.textColor || label.textColor;
            curFont.stroke = curFont.stroke || label.stroke;
            curFont.strokeColor = curFont.strokeColor || label.strokeColor || 0;
            curFont.bold = label.bold;
        }
        var fonts = [];
        var tag = 0;
        fonts.push(curFont);
        var richText = label || new eui.Label();
        // if (curFont.boundingWidth) {
        // 	richText.width = curFont.boundingWidth;
        // }
        var textFlow = [];
        var text = html.substr(0, list ? html.indexOf("<") : html.length);
        text = text.replace(/\\n/g, "\n");
        var richElement = { text: htmldecode(text), style: curFont };
        textFlow.push(richElement);
        if (!list || list.length <= 0) {
            richText.textFlow = textFlow;
            return richText;
        }
        var handleSpecialTag = function (tag) {
            var font = util.copyData(curFont);
            var fontColor = {
                blue: 0x4CC5FF,
                red: 0xD73826,
                yellow: 0xFFDB00,
                green: 0x23F024,
                smoke: 0xC2C2C2,
            };
            for (var key in fontColor) {
                if (fontColor.hasOwnProperty(key)) {
                    if (new RegExp("<" + key + ">").test(tag)) {
                        font.textColor = fontColor[key];
                        curFont = font;
                        fonts.push(curFont);
                        return true;
                    }
                }
            }
            if (new RegExp("<name>").test(tag)) {
                font.textColor = 0x4CC5FF;
                curFont = font;
                fonts.push(curFont);
                return true;
            }
            if (new RegExp("<s>").test(tag)) {
                font.stroke = Math.round(font.size / 10);
                font.strokeColor = 0x0;
                curFont = font;
                fonts.push(curFont);
                return true;
            }
        };
        for (var i = 0; i < list.length; i++) {
            var func = list[i].match(/<.+>/)[0];
            if (func.indexOf("/") > 0) {
                if (fonts.length > 1) {
                    fonts.pop();
                }
                curFont = fonts[fonts.length - 1];
            }
            else if (/image=/.test(func)) {
                var p = func.split("=");
                p[1] = p[1].replace(/[\"'>]/g, "");
            }
            else if (handleSpecialTag(func)) {
            }
            else {
                curFont = util.copyData(curFont);
                var configs = func.match(/[^<\s]+=.+?(?=[\s>])/g);
                if (configs && configs.length > 0) {
                    for (var j = 0; j < configs.length; j++) {
                        var p = configs[j].split("=");
                        p[1] = p[1].replace("\"", "").replace("'", "");
                        if (p[0].toLowerCase() == "fontsize" || p[0].toLowerCase() == "size") {
                            curFont.size = parseInt(p[1]);
                        }
                        else if (p[0].toLowerCase() == "fontname") {
                            curFont.fontFamily = (p[1]);
                        }
                        else if (p[0].toLowerCase() == "color") {
                            curFont.textColor = parseInt("0x" + p[1].replace("#", "").replace("0x", ""));
                        }
                        else if (p[0].toLowerCase() == "stroke") {
                            curFont.stroke = parseInt(p[1]);
                        }
                        else if (p[0].toLowerCase() == "strokeColor") {
                            curFont.strokeColor = parseInt(p[1].replace("#", "").replace("0x", ""));
                        }
                    }
                    fonts.push(curFont);
                }
            }
            text = list[i].substr(func.indexOf(">") + 1);
            text = text.replace(/\\n/g, "\n");
            var lines = text.split('\n');
            for (var k = 0; k < lines.length; k++) {
                if (lines[k].length > 0) {
                    var richElement_1 = { text: htmldecode(lines[k]), style: curFont };
                    textFlow.push(richElement_1);
                }
                if (k < lines.length - 1) {
                    var richElement_2 = { text: "\n", style: curFont };
                    textFlow.push(richElement_2);
                }
            }
        }
        richText.textFlow = textFlow;
        return richText;
    }
    util.createRichText = createRichText;
    function copyData(data, to, exclude, depth) {
        to = to || {};
        exclude = exclude || {};
        if (!data || depth === 0)
            return;
        for (var key in data) {
            if (typeof (data[key]) !== "object") {
                if (!exclude[key]) {
                    to[key] = data[key];
                }
            }
            else {
                if (data[key] === null) {
                    continue;
                }
                if (!to[key]) {
                    if (typeof data[key].length == "number")
                        to[key] = [];
                    else
                        to[key] = {};
                }
                this.copyData(data[key], to[key], exclude, depth ? depth - 1 : depth);
            }
        }
        return to;
    }
    util.copyData = copyData;
    function htmldecode(str) {
        var s = "";
        if (str.length === 0)
            return "";
        s = str.replace(/&gt;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/'/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "\n");
        return s;
    }
    util.htmldecode = htmldecode;
    /**
     * http特殊字符转义
     * @param n
     * @returns {string|any}
     */
    function enCodeHtml(n) {
        n = n.replace(/%/g, "%25");
        n = n.replace(/\+/g, "%2B");
        n = n.replace(/\//g, "%2F");
        n = n.replace(/\?/g, "%3F");
        n = n.replace(/\#/g, "%23");
        n = n.replace(/\&/g, "%26");
        n = n.replace(/\=/g, "%3d");
        return n;
    }
    util.enCodeHtml = enCodeHtml;
    /**
     * http特殊字符转义
     * @param n
     * @returns {string|any}
     */
    function unCodeHtml(n) {
        n = n.replace(/%25/g, "%");
        n = n.replace(/%2B/g, "+");
        n = n.replace(/%2F/g, "/");
        n = n.replace(/%3F/g, "?");
        n = n.replace(/%23/g, "#");
        n = n.replace(/%26/g, "&");
        n = n.replace(/%3d/g, "=");
        return n;
    }
    util.unCodeHtml = unCodeHtml;
    /**
     * 图片点击效果
     * @param btn
     * @param sScale
     * @param eScale
     * @param notAnchor
     */
    function initBtnAnchorNew(btn, sScale, eScale, notAnchor) {
        if (!notAnchor) {
            btn.anchorOffsetX = btn.width / 2;
            btn.anchorOffsetY = btn.height / 2;
            btn.x = btn.x + btn.width / 2;
            btn.y = btn.y + btn.height / 2;
        }
        var touchBeginFunc = function (event) {
            btn.scaleX = sScale;
            btn.scaleY = sScale;
        };
        var touchEndFunc = function (event) {
            btn.scaleX = eScale;
            btn.scaleY = eScale;
        };
        var objRemove = function (event) {
            console.log("btnRemove");
            btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, touchBeginFunc, this);
            btn.removeEventListener(egret.TouchEvent.TOUCH_END, touchEndFunc, this);
            btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchEndFunc, this);
            btn.removeEventListener(egret.Event.REMOVED_FROM_STAGE, objRemove, this);
        };
        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, touchBeginFunc, this);
        btn.addEventListener(egret.TouchEvent.TOUCH_END, touchEndFunc, this);
        btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchEndFunc, this);
        btn.addEventListener(egret.Event.REMOVED_FROM_STAGE, objRemove, this);
    }
    util.initBtnAnchorNew = initBtnAnchorNew;
    //物品晃动效果
    function rockTween(obj) {
        egret.Tween.get(obj, { loop: true })
            .to({ rotation: 3 }, 50)
            .to({ rotation: 0 }, 50)
            .to({ rotation: -3 }, 50)
            .to({ rotation: 0 }, 50)
            .to({ rotation: 3 }, 50)
            .to({ rotation: 0 }, 50)
            .to({ rotation: -3 }, 50)
            .to({ rotation: 0 }, 50).wait(800);
    }
    util.rockTween = rockTween;
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        if (RES.getRes(name)) {
            var texture = RES.getRes(name);
            result.texture = texture;
        }
        else {
            RES.getResAsync(name, function (data) {
                result.texture = data;
            }, this);
        }
        return result;
    }
    util.createBitmapByName = createBitmapByName;
    util.openJZLog = true;
    function jzlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (util.openJZLog) {
            console.log(args);
        }
    }
    util.jzlog = jzlog;
})(util || (util = {}));
//# sourceMappingURL=Util.js.map