package com.game.beauty.demo.filter;

import com.game.beauty.demo.log.LogUtil;
import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class LoggingFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        LogUtil.info("logging filter, method: " + req.getMethod() + ", uri:" + req.getRequestURI());
        res.setHeader("Access-Control-Allow-Origin", "*");
        filterChain.doFilter(request, response);
        LogUtil.info("logging filter, method: " + req.getMethod() + ", uri:" + req.getRequestURI());
    }

    @Override
    public void destroy() {

    }
}
