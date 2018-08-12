package com.game.beauty.demo.scope;

import com.game.beauty.demo.filter.RequestFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Component
public class InterceptorConfiguration extends WebMvcConfigurerAdapter {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册拦截器
        InterceptorRegistration interceptorRegistration = registry.addInterceptor(new RequestFilter());

        // 配置拦截和不拦截的路径
        interceptorRegistration.addPathPatterns("/**");
        interceptorRegistration.excludePathPatterns("/**.html");
    }
}
