package com.game.beauty.demo.util;

import com.game.beauty.demo.log.LogUtil;
import org.apache.commons.collections.CollectionUtils;

import java.util.List;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class FutureUtil {
    public static <T> void getFutureResult(List<Future<T>> futureList, long timeOut, String debugInfo) {
        if (CollectionUtils.isEmpty(futureList)) { return; }
        int listSize = futureList.size();

        long timeoutCountdown = timeOut;
        long start = 0;
        int finished = 0;

        try {
            for (int i = 0; i < listSize; i++) {
                Future<T> future = futureList.get(i);
                if (future == null) { finished++; continue; }

                start = System.currentTimeMillis();
                try {
                    future.get(timeoutCountdown, TimeUnit.MILLISECONDS);
                    finished++;
                } catch (TimeoutException timeoutException) {
                    LogUtil.warn("[FutureUtil] futureList inner, getFutureResult timeout " + debugInfo);
                } catch (Exception e) {
                    LogUtil.error("[FutureUtil] futureList inner, getFutureResult error " + debugInfo, e);
                } finally {
                    timeoutCountdown -= (System.currentTimeMillis() - start);
                }

                if (timeoutCountdown <= 0 && i < listSize - 1) {
                    LogUtil.warn("[FutureUtil] futureList inner, getFutureResult countdown timeout" + debugInfo);
                    return;
                }
            }
        } catch(Exception e) {
            LogUtil.error("[FutureUtil] futureList getFutureResult error" + debugInfo);
        } finally {
            if (finished != listSize) {
                for (int i = finished; i < listSize; i++) {
                    Future<T> future = futureList.get(i);
                    if (future != null) { future.cancel(true); }
                }
            }
        }
    }

    public static <T> void getFutureResult(Future<T> future, long timeOut, String debugInfo) {
        if (future == null) { return; }

        try {
            future.get(timeOut, TimeUnit.MILLISECONDS);
        } catch (TimeoutException timeoutException) {
            LogUtil.warn("[FutureUtil], getFutureResult timeout " + debugInfo);
        } catch (Exception e) {
            LogUtil.error("[FutureUtil], getFutureResult error " + debugInfo, e);
        } finally {
            if (future != null) { future.cancel(true); }
        }
    }
}
