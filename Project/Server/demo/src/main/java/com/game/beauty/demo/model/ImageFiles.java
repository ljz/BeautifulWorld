package com.game.beauty.demo.model;

import com.google.common.collect.Lists;

import java.util.List;
import java.util.Random;

public class ImageFiles {
    private static List<String> imageList = Lists.newArrayList();
    private static Random random = new Random();

    static {
        imageList.add("https://wx4.sinaimg.cn/mw690/9218a9eegy1ftoltm2ul5j20qo13zjyn.jpg");
        imageList.add("https://wx1.sinaimg.cn/mw690/ed59c3d4gy1ft9nyshsnwj22c02c04qr.jpg");
        imageList.add("https://wx3.sinaimg.cn/mw690/005xtYiYgy1fsd6ubswpfj30e60e6tap.jpg");
        imageList.add("https://wx4.sinaimg.cn/mw690/a5b05126gy1ftottzb0arj20u0190jzr.jpg");
        imageList.add("https://wx3.sinaimg.cn/mw690/744c1daely1ftnj9spm69j20ct0ezaby.jpg");
        imageList.add("https://wx1.sinaimg.cn/mw690/6be79474ly1ftmk3bztphj20rs1xf7wh.jpg");
        imageList.add("https://wx1.sinaimg.cn/mw690/6a9d9890gy1fthtcrl5fbj23o72pxqva.jpg");
        imageList.add("https://wx3.sinaimg.cn/mw690/006CQy1qgy1ftofa1a52ej31s016o4qp.jpg");
        imageList.add("https://wx2.sinaimg.cn/mw690/7d53935cgy1ftnm1hjm63j20xc1e0e81.jpg");
    }

    public static String getImageUrl() {
        int size = ImageFiles.imageList.size();
        return ImageFiles.imageList.get(random.nextInt(size));
    }
}
