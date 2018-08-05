package com.game.beauty.uuidfactory.service;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service("uuidGenerator")
@Scope("singleton")
public class UuidGenerator {
    /**
     * INITIAL_TIME_STAMP 初始时间截 (2018-08-01)
     * SEQUENCE_BITS 序列在id中占的位数
     * TIMESTAMP_ID_BITS 时间戳使用的位数
     * WORKER_ID_BITS 机器id所占的位数
     * DATACENTER_ID_BITS 数据标识id所占的位数
     *
     * TIMESTAMP_OFFSET 时间截的偏移量(5+5+12)
     * WORKERID_OFFSET 机器ID的偏移量(12)
     * DATACENTERID_OFFSET 数据中心ID的偏移量(12+5)
     *
     *
     * SEQUENCE_MASK 生成序列的掩码，这里为4095
     * TIMESTAMP_ID_MASK 支持的最大时间id，结果是2^41，70年
     * WORKER_ID_MASK 支持的最大机器id，结果是31
     * DATACENTER_ID_MASK 支持的最大数据标识id，结果是31
     *
     * workerId 工作节点ID(0~31)
     * datacenterId 数据中心ID(0~31)
     * sequence 毫秒内序列(0~4095)
     * lastTimestamp 上次生成ID的时间截
     */
    private static final long INITIAL_TIME_STAMP = 1533052800000L;
    private static final long SEQUENCE_BITS = 12L;
    private static final long TIMESTAMP_ID_BITS = 41L;
    private static final long WORKER_ID_BITS = 5L;
    private static final long DATACENTER_ID_BITS = 5L;

    private static final long TIMESTAMP_OFFSET = SEQUENCE_BITS;
    private static final long WORKERID_OFFSET = SEQUENCE_BITS + TIMESTAMP_ID_BITS;
    private static final long DATACENTERID_OFFSET = SEQUENCE_BITS + TIMESTAMP_ID_BITS + WORKER_ID_BITS;

    private static final long SEQUENCE_MASK = ~(-1L << SEQUENCE_BITS);
    private static final long TIMESTAMP_ID_MASK = ~(-1L << TIMESTAMP_ID_BITS);
    private static final long WORKER_ID_MASK = ~(-1L << WORKER_ID_BITS);
    private static final long DATACENTER_ID_MASK = ~(-1L << DATACENTER_ID_BITS);

    private long workerId;
    private long datacenterId;
    private long sequence = 0L;
    private long lastTimestamp = -1L;


    public UuidGenerator() {
        this.workerId = 1;
        this.datacenterId = 1;
    }

    /**
     * 构造函数
     *
     * @param workerId     工作ID (0~31)
     * @param datacenterId 数据中心ID (0~31)
     */
    public UuidGenerator(long workerId, long datacenterId) {
        if (workerId > WORKER_ID_MASK || workerId < 0) {
            throw new IllegalArgumentException(String.format("WorkerID 不能大于 %d 或小于 0", WORKER_ID_MASK));
        }
        if (datacenterId > DATACENTER_ID_MASK || datacenterId < 0) {
            throw new IllegalArgumentException(String.format("DataCenterID 不能大于 %d 或小于 0", DATACENTER_ID_MASK));
        }
        this.workerId = workerId;
        this.datacenterId = datacenterId;
    }

    /**
     * 获得下一个ID (用同步锁保证线程安全)
     *
     * @return SnowflakeId
     */
    public synchronized long nextId() {
        long timestamp = System.currentTimeMillis();

        /**
         * 如果当前时间小于上一次ID生成的时间戳，说明系统时钟回退过这个时候应当抛出异常
         */
        if (timestamp < lastTimestamp) {
            throw new RuntimeException("当前时间小于上一次记录的时间戳！");
        }

        /**
         * 如果是同一时间生成的，则进行毫秒内序列
         *
         * sequence等于0说明毫秒内序列已经增长到最大值
         *
         * 时间戳改变，毫秒内序列重置
         */
        if (lastTimestamp == timestamp) {
            sequence = (sequence + 1) & SEQUENCE_MASK;
            if (sequence == 0) {
                timestamp = tilNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0L;
        }

        /**
         * 上次生成ID的时间截
         * 移位并通过或运算拼到一起组成64位的ID
         */
        lastTimestamp = timestamp;

        return (datacenterId << DATACENTERID_OFFSET)
                | (workerId << WORKERID_OFFSET)
                | ((timestamp - INITIAL_TIME_STAMP) << TIMESTAMP_OFFSET)
                | sequence;
    }

    /**
     * 获得下一个ID (用同步锁保证线程安全)
     *
     * @return SnowflakeId
     */
    public static long getTimeMillisFromId(long id) {
        if (id < 0 || id > Long.MAX_VALUE) {
            return 0;
        }

        return ((id >> SEQUENCE_BITS) & TIMESTAMP_ID_MASK) + INITIAL_TIME_STAMP;
    }

    /**
     * 阻塞到下一个毫秒，直到获得新的时间戳
     *
     * @param lastTimestamp 上次生成ID的时间截
     * @return 当前时间戳
     */
    protected long tilNextMillis(long lastTimestamp) {
        long timestamp = System.currentTimeMillis();
        while (timestamp <= lastTimestamp) {
            timestamp = System.currentTimeMillis();
        }
        return timestamp;
    }
}
