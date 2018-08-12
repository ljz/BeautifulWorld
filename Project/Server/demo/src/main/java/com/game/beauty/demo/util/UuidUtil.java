package com.game.beauty.demo.util;

public class UuidUtil {
    /**
     * INITIAL_TIME_STAMP 初始时间截 (2018-08-01)
     * SEQUENCE_BITS 序列在id中占的位数
     * TIMESTAMP_ID_BITS 时间戳使用的位数
     *
     * TIMESTAMP_ID_MASK 支持的最大时间id，结果是2^41，70年
     */
    private static final long INITIAL_TIME_STAMP = 1533052800000L;
    private static final long SEQUENCE_BITS = 12L;
    private static final long TIMESTAMP_ID_BITS = 41L;

    private static final long TIMESTAMP_ID_MASK = ~(-1L << TIMESTAMP_ID_BITS);
    private static final String GET_UUID_URL = "http://localhost:8100/getuuid";

    /**
     * 从ID中获取时间
     */
    public static long getTimeMillisFromId(long id) {
        if (id < 0 || id > Long.MAX_VALUE) {
            return 0;
        }

        return ((id >> SEQUENCE_BITS) & TIMESTAMP_ID_MASK) + INITIAL_TIME_STAMP;
    }
}
