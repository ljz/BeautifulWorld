package com.game.beauty.demo.dao;

import com.game.beauty.demo.model.ImageUrl;
import com.game.beauty.demo.model.ProfileUrl;

import java.util.List;

public interface MySQLDao {
    /**
     * 插入图片url
     * @param imageUrl
     * @return
     */
    boolean insertImageUrl(ImageUrl imageUrl);

    /**
     * 获取图片url
     * @param id
     * @return
     */
    ImageUrl getImageUrl(long id);

    /**
     * 批量获取图片url
     * @param ids
     * @return
     */
    List<ImageUrl> getImageUrls(long[] ids);

    /**
     * 随机获取评论
     * @param count
     * @return
     */
    List<ImageUrl> getRandomImageUrls(int count);

    /**
     * 插入个人页链接
     * @param profileUrl
     * @return
     */
    boolean insertProfileUrl(ProfileUrl profileUrl);

    /**
     * 获取个人页链接
     * @param id
     * @return
     */
    ProfileUrl getProfileUrl(long id);

    /**
     * 批量获取个人页URL
     * @param ids
     * @return
     */
    List<ProfileUrl> getProfileUrls(long[] ids);
}
