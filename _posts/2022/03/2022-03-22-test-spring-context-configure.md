---
layout: post
title: "JUnit Spring Context Configure"
date: 2022-03-22
tags: spring test
---

``` java
@ContextHierarchy({
    @ContextConfiguration(
        locations = {
        "classpath:/something-config-app.xml",
        "classpath:/something-config-datasource.xml",
        "classpath:/META-INF/something/**/*.xml"
    },
        classes = {
                SpringTest.CustomConfig.class
        }
    ),
    @ContextConfiguration({"classpath:/something-child-config.xml" })
})
public class SpringTest {
}
```


``` java
@ContextConfiguration
public class SpringTest {
	
    @Configuration
    @Import(CustomConfig.class)
    @ImportResource({
        "classpath:/something-config-app.xml",
        "classpath:/something-config-datasource.xml",
        "classpath:/META-INF/something/**/*.xml"
    })
    @EnableAspectJAutoProxy(proxyTargetClass = true)
    @ComponentScan(
    	basePackages = {"org.my.app"},
    	excludeFilters = {
            @ComponentScan.Filter(value = {Controller.class}),
    	}
	)
    public static class ConfigMarker {
    }

    @Configuration
    public static class CustomConfig {
    	@Bean
    	public SomethingBean somethingBean() {
    		return new SomethingBean();
    	}
    }
}
```