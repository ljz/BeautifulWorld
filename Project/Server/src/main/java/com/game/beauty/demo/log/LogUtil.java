package com.game.beauty.demo.log;

import org.apache.log4j.Logger;

public class LogUtil {
	private static final Logger warnLogger = Logger.getLogger("warn");
	private static final Logger errorLogger = Logger.getLogger("error");
	private static final Logger infoLogger = Logger.getLogger("info");

	public static void warn(String msg) {
		warnLogger.warn(msg);
	}

	public static void warn(String msg, Throwable e) {
		warnLogger.warn(msg, e);
	}

	public static void error(String msg) {
		errorLogger.error(msg);
	}

	public static void error(String msg, Throwable e) {
		errorLogger.error(msg, e);
	}

	public static void info(String msg) {
		infoLogger.info(msg);
	}

	public static void info(String msg, Throwable e) {
		infoLogger.info(msg, e);
	}
}
