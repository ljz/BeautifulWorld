package com.game.beauty.demo.dao.Impl;

import com.game.beauty.demo.constants.MysqlConstants;
import com.game.beauty.demo.dao.MySQLDao;
import com.game.beauty.demo.log.LogUtil;
import com.game.beauty.demo.model.ImageUrl;
import com.game.beauty.demo.model.ProfileUrl;
import com.game.beauty.demo.util.FutureUtil;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.Future;

@Component("mySQLDao")
public class MySQLDaoImpl implements MySQLDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public boolean insertImageUrl(ImageUrl imageUrl) {
        if (imageUrl == null || StringUtils.isBlank(imageUrl.getImageUrl())) {
            return false;
        }

        return jdbcTemplate.update(MysqlConstants.IMAGE_URL_INSERT_SQL, new Object[]{imageUrl.getId(), imageUrl.getImageUrl()}) > 0;
    }

    @Override
    public ImageUrl getImageUrl(long id) {
        return jdbcTemplate.query(MysqlConstants.IMAGE_URL_SELECT_SQL, new Long[]{id}, rs -> {
            try {
                if(rs.next()){
                    long id1 = rs.getLong("id");
                    String imageUrl = rs.getString("image_url");
                    return new ImageUrl(id1, imageUrl);
                } else {
                    return null;
                }
            } catch (Exception e) {
                LogUtil.error("[MySQLDao] getImageUrl error, ", e);
            }

            return null;
        });
    }

    @Override
    public List<ImageUrl> getImageUrls(long[] ids) {
        final Map<Long, ImageUrl> imageUrlMap = Maps.newConcurrentMap();

        List<Future<Boolean>> futureList = Lists.newArrayList();
        for (long id : ids) {
            final long idFinal = id;
            futureList.add(MysqlConstants.URL_BATCH_GET_POOL.submit(new Callable<Boolean>() {
                @Override
                public Boolean call() throws Exception {
                    ImageUrl imageUrl = getImageUrl(idFinal);
                    if (imageUrl != null) {
                        imageUrlMap.put(idFinal, imageUrl);
                        return Boolean.TRUE;
                    } else {
                        return Boolean.FALSE;
                    }
                }
            }));
        }

        FutureUtil.getFutureResult(futureList, MysqlConstants.BATCH_TIME_OUT_LIMIT, "[MySQLDao] getImageUrls");
        return Lists.newArrayList(imageUrlMap.values());
    }

    @Override
    public List<ImageUrl> getRandomImageUrls(int count) {
        List<ImageUrl> imageUrlList = Lists.newArrayList();
        jdbcTemplate.query(MysqlConstants.IMAGE_URL_RANDOM_SELECT_SQL, rs -> {
            long id = rs.getLong("id");
            String imageUrl = rs.getString("image_url");
            imageUrlList.add(new ImageUrl(id, imageUrl));
        });

        Collections.shuffle(imageUrlList);
        if (CollectionUtils.isEmpty(imageUrlList) || imageUrlList.size() <= count) {
            return imageUrlList;
        } else {
            return imageUrlList.subList(0, count);
        }
    }

    @Override
    public boolean insertProfileUrl(ProfileUrl profileUrl) {
        if (profileUrl == null || StringUtils.isBlank(profileUrl.getProfileUrl())) {
            return false;
        }

        return jdbcTemplate.update(MysqlConstants.PROFILE_URL_INSERT_SQL, new Object[]{profileUrl.getId(), profileUrl.getProfileUrl()}) > 0;
    }

    @Override
    public ProfileUrl getProfileUrl(long id) {
        return jdbcTemplate.query(MysqlConstants.PROFILE_URL_SELECT_SQL, new Long[]{id}, rs -> {
            if(rs.next()){
                long id1 = rs.getLong("id");
                String profileUrl = rs.getString("profile_url");
                return new ProfileUrl(id1, profileUrl);
            } else {
                return null;
            }
        });
    }

    @Override
    public List<ProfileUrl> getProfileUrls(long[] ids) {
        final Map<Long, ProfileUrl> profileUrlMap = Maps.newConcurrentMap();

        List<Future<Boolean>> futureList = Lists.newArrayList();
        for (long id : ids) {
            final long idFinal = id;
            futureList.add(MysqlConstants.URL_BATCH_GET_POOL.submit(new Callable<Boolean>() {
                @Override
                public Boolean call() throws Exception {
                    ProfileUrl profileUrl = getProfileUrl(idFinal);
                    if (profileUrl != null) {
                        profileUrlMap.put(idFinal, profileUrl);
                        return Boolean.TRUE;
                    } else {
                        return Boolean.FALSE;
                    }
                }
            }));
        }

        FutureUtil.getFutureResult(futureList, MysqlConstants.BATCH_TIME_OUT_LIMIT, "[MySQLDao] getProfileUrls");
        return Lists.newArrayList(profileUrlMap.values());
    }
}
