class WxOpenData {
    //微信玩伴缓存图片
    public wanbanImages = ["wxhy_img_nan.png", "wxhy_img_nv.png", "wxhy_img_btn.png"];

    //微信老船长缓存图片
    public recallGroupImages = ["wanban_img_winbj5.png", "wanban_btn.png", "wanban_recall2.png", "wanban_recall.png", "wanban_1.png", "wanban_1_1.png", "wanban_2.png", "wanban_2_1.png", "wanban_star.png"];
    constructor() {
    }

    public saveImages(images?: Array<string>): void {
        if (images) {
            // console.log("开始save")
            for (let name of images) {
                name = name.replace(".", "_")
                util.jzlog("name =====", name)
                RES.getResAsync(name);
            }
            // console.log("停止save")
        } else {
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
    }

    public loadImages(images, cb): void {
        let _self = this;
        var wxFs = wx.getFileSystemManager();
        var WX_ROOT = wx.env ? wx.env.USER_DATA_PATH || "wxfile://usr" : "wxfile://usr";
        wxFs.readdir({
            dirPath: `${WX_ROOT}/temp_image/assets/image/wanban`,
            success: function (res) {
                let savedImgs = []
                if (res.files) {
                    let matchLength = 0;
                    for (let name of images) {
                        for (let i = 0; i < res.files.length; i++) {
                            // console.log(i, "res.files[i] =", res.files[i])
                            savedImgs.push(res.files[i]);
                            if (res.files[i] == name) {
                                matchLength++;
                                break;
                            }
                        }
                    }

                    if (matchLength == images.length) {
                        cb && cb();
                    } else {
                        let toSaveImgs = [];
                        let _index = egret.setTimeout(() => {
                            egret.clearTimeout(_index);
                            for (let img of images) {
                                if (savedImgs.indexOf(img) < 0) {
                                    toSaveImgs.push(img)
                                }
                            }
                            _self.saveImages(toSaveImgs);
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
    }
}
let wxOpenData = new WxOpenData();
