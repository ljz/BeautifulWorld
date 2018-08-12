package com.game.beauty.demo.util;

import com.game.beauty.demo.model.ImageUrl;
import com.game.beauty.demo.model.ProfileUrl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.ArrayUtils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class ImageJsonUtil {
    public static String getInsertUrlJson(long[] ids, Map<Long, ImageUrl> imageUrlMap, Map<Long, ProfileUrl> profileUrlMap) {
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        if (ArrayUtils.isNotEmpty(ids) && MapUtils.isNotEmpty(imageUrlMap) && MapUtils.isNotEmpty(profileUrlMap)) {
            SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy:MM:dd HH:mm:ss");
            for (long id : ids) {
                ImageUrl imageUrl = imageUrlMap.get(id);
                ProfileUrl profileUrl = profileUrlMap.get(id);

                JSONObject object = new JSONObject();
                object.put("id", String.valueOf(id));
                object.put("cerate_at", dateFormater.format(new Date(UuidUtil.getTimeMillisFromId(id))));
                object.put("image_url", imageUrl.getImageUrl());
                object.put("profile_url", profileUrl.getProfileUrl());
                jsonArray.add(object.toString());
            }
        }
        jsonObject.element("results", jsonArray.toString());
        return jsonObject.toString();
    }

    public static String getImageUrlsJson(List<ImageUrl> imageUrlList) {
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        if (CollectionUtils.isNotEmpty(imageUrlList)) {
            SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy:MM:dd HH:mm:ss");
            for (ImageUrl imageUrlEntity : imageUrlList) {
                long id = imageUrlEntity.getId();
                String imageUrl = imageUrlEntity.getImageUrl();
                JSONObject imageObject = new JSONObject();
                imageObject.put("id", String.valueOf(id));
                imageObject.put("cerate_at", dateFormater.format(new Date(UuidUtil.getTimeMillisFromId(id))));
                imageObject.put("image_url", imageUrl);
                jsonArray.add(imageObject.toString());
            }
        }
        jsonObject.element("images", jsonArray.toString());
        return jsonObject.toString();
    }

    public static String getProfileUrlJson(List<ProfileUrl> profileUrlList) {
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        if (CollectionUtils.isNotEmpty(profileUrlList)) {
            SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy:MM:dd HH:mm:ss");
            for (ProfileUrl profileUrlEntity : profileUrlList) {
                long id = profileUrlEntity.getId();
                String profileUrl = profileUrlEntity.getProfileUrl();
                JSONObject profileObject = new JSONObject();
                profileObject.put("id", String.valueOf(id));
                profileObject.put("cerate_at", dateFormater.format(new Date(UuidUtil.getTimeMillisFromId(id))));
                profileObject.put("profile_url", profileUrl);
                jsonArray.add(profileObject.toString());
            }
        }
        jsonObject.element("profiles", jsonArray.toString());
        return jsonObject.toString();
    }
}
