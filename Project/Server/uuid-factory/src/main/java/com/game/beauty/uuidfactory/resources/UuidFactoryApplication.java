package com.game.beauty.uuidfactory.resources;

import com.game.beauty.uuidfactory.config.ScopeConfig;
import com.game.beauty.uuidfactory.service.UuidGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@SpringBootApplication
public class UuidFactoryApplication {
    @Resource
    private UuidGenerator uuidGenerator;

    @RequestMapping("/getuuid")
    public long index() {
        return uuidGenerator.nextId();
    }

    public static void main(String[] args) {
        SpringApplication.run(new Class[]{UuidFactoryApplication.class, ScopeConfig.class}, args);
    }
}
