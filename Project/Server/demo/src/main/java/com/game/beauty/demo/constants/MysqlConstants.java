package com.game.beauty.demo.constants;

import com.game.beauty.demo.log.LogUtil;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class MysqlConstants {
    public static final String IMAGE_URL_INSERT_SQL = "INSERT INTO imageurls(id, image_url) VALUES (?, ?)";
    public static final String PROFILE_URL_INSERT_SQL = "INSERT INTO profileurls(id, profile_url) VALUES (?, ?)";
    public static final String IMAGE_URL_SELECT_SQL = "SELECT id, image_url FROM imageurls where id=?";
    public static final String IMAGE_URL_RANDOM_SELECT_SQL = "select id, image_url from imageurls limit 1000";
    public static final String PROFILE_URL_SELECT_SQL = "SELECT id, profile_url FROM profileurls where id=?";
    public static final int processors = Runtime.getRuntime().availableProcessors();
    public static final long BATCH_TIME_OUT_LIMIT = 2000L;

    public static final ThreadPoolExecutor URL_BATCH_GET_POOL = new ThreadPoolExecutor(processors, processors * 2, 10L, TimeUnit.SECONDS, new LinkedBlockingQueue<>(20), new ThreadPoolExecutor.AbortPolicy());
    static {
        LogUtil.info("[MysqlConstants] processors num:" + processors);
        URL_BATCH_GET_POOL.prestartAllCoreThreads();
    }
}
