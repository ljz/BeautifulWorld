var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WxOpenData = (function () {
    function WxOpenData() {
        //微信玩伴缓存图片
        this.wanbanImages = ["wxhy_img_nan.png", "wxhy_img_nv.png", "wxhy_img_btn.png"];
        //微信老船长缓存图片
        this.recallGroupImages = ["wanban_img_winbj5.png", "wanban_btn.png", "wanban_recall2.png", "wanban_recall.png", "wanban_1.png", "wanban_1_1.png", "wanban_2.png", "wanban_2_1.png", "wanban_star.png"];
    }
    WxOpenData.prototype.saveImages = function (images) {
        if (images) {
            // console.log("开始save")
            for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
                var name_1 = images_1[_i];
                name_1 = name_1.replace(".", "_");
                util.jzlog("name =====", name_1);
                RES.getResAsync(name_1);
            }
            // console.log("停止save")
        }
        else {
            RES.getResAsync("wanban_btn_png");
            RES.getResAsync("wanban_1_png");
            RES.getResAsync("wanban_1_1_png");
            RES.getResAsync("wanban_2_png");
            RES.getResAsync("wanban_2_1_png");
            // RES.getResAsync("head_bg7_png");
            RES.getResAsync("wanban_star_png");
            RES.getResAsync("wanban_recall_png");
            RES.getResAsync("wanban_recall2_png");
            RES.getResAsync("wanban_img_winbj5_png");
            RES.getResAsync("wxhy_img_nan_png");
            RES.getResAsync("wxhy_img_nv_png");
        }
    };
    WxOpenData.prototype.loadImages = function (images, cb) {
        var _self = this;
        var wxFs = wx.getFileSystemManager();
        var WX_ROOT = wx.env ? wx.env.USER_DATA_PATH || "wxfile://usr" : "wxfile://usr";
        wxFs.readdir({
            dirPath: WX_ROOT + "/temp_image/assets/image/wanban",
            success: function (res) {
                var savedImgs = [];
                if (res.files) {
                    var matchLength = 0;
                    for (var _i = 0, images_2 = images; _i < images_2.length; _i++) {
                        var name_2 = images_2[_i];
                        for (var i = 0; i < res.files.length; i++) {
                            // console.log(i, "res.files[i] =", res.files[i])
                            savedImgs.push(res.files[i]);
                            if (res.files[i] == name_2) {
                                matchLength++;
                                break;
                            }
                        }
                    }
                    if (matchLength == images.length) {
                        cb && cb();
                    }
                    else {
                        var toSaveImgs_1 = [];
                        var _index_1 = egret.setTimeout(function () {
                            egret.clearTimeout(_index_1);
                            for (var _i = 0, images_3 = images; _i < images_3.length; _i++) {
                                var img = images_3[_i];
                                if (savedImgs.indexOf(img) < 0) {
                                    toSaveImgs_1.push(img);
                                }
                            }
                            _self.saveImages(toSaveImgs_1);
                            _self.loadImages(images, cb);
                        }, _self, 100);
                    }
                }
            },
            fail: function (res) {
                console.log("fail ==>", res);
            },
            complete: function (res) {
                console.log("complete ==>", res);
            }
        });
    };
    return WxOpenData;
}());
__reflect(WxOpenData.prototype, "WxOpenData");
var wxOpenData = new WxOpenData();
//# sourceMappingURL=WxOpenData.js.map