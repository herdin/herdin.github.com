---
layout: post
title: "Spring Boot Property + .yaml 설정"
date: 2020-02-04
tags: spring
---

맨날 property 쓰려고하면 검색해서 겨우 사용법만 알아내는게 너무 짜증나!!!!
> 그렇지만 또 사용법만 정리한다...

`application.properties`, `*.properties` 같은 파일들은 그냥
 `@PropertySource("PROPERTY_FILE_PATH")` 로 쓰고 아무 생각 없이 `Environment` 를 `@Autowired` 받아서 사용하곤 했다.

 그런데 .properties 파일 대신 .yaml 파일을 사용하려다 보니 `@PropertySource` 는 yaml 을 지원하지 않고, 그나마 있던 `@ConfigurationProeprties` 의 location 이 `@Deprecated` 된것이다.

<img src='#' post-src='2020-02-04-spring-property.gif' />
> 젠장 원리도 사용법도 모르는데 뭐 자꾸 못쓰게하는거야

원리는 **여전히** 모르지만 사용법이라도 정리를 해놔야 정신건강에 이로울 것 같아서 정리해놓는다.

# property 를 설정하는 몇가지 방법.

## ~~.yaml 안써 .properties 로 해결 볼 거야.~~
`@PropertySource("PROPERTY_FILE_PATH")` 를 사용하면된다. 그런데 스프링 부트에서는 이 방법을 권장하지 않는다고 한다. 권장하지 않다고하니 잘모르겠지만 사용하지말자. 멍청하면 말이라도 잘듣자.
> While using @PropertySource on your @SpringBootApplication may seem to be a convenient way to load a custom resource in the Environment, we do not recommend it. **Such property sources are not added to the Environment until the application context is being refreshed.** This is too late to configure certain properties such as logging.* and spring.main.* which are read before refresh begins. [출처](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-customize-the-environment-or-application-context)

## 대상 설정 파일 custom-config.yaml 은 아래와 같다.
``` yaml
my:
  config:
    name: myconfig!!
    data:
      -
        order: 0
        value: 10
      -
        order: 1
        value: 11
```

## 1. 환경변수/설정 파일이니까 실행옵션으로 준다.

`ConfigFileApplicationListener` 를 보면
```java
private static final String DEFAULT_SEARCH_LOCATIONS = "classpath:/,classpath:/config/,file:./,file:./config/";
private static final String DEFAULT_NAMES = "application";
public static final String CONFIG_NAME_PROPERTY = "spring.config.name";
public static final String CONFIG_LOCATION_PROPERTY = "spring.config.location";
```
`DEFAULT_SEARCH_LOCATIONS` 위치의 `application` 파일명을 가진 환경변수는 로드 된다.
> 어떻게 되는진 모르겠지만.

또는 program argument 로
``` shell
java -jar myApplication.jar --spring.config.name=custom-config.yaml
java -jar myApplication.jar --spring.config.location=classpath:/custom-config.yaml
```
주면 된다.

기본 application.yaml 을 같이 사용하고 싶으면 빼먹지말고 , 로 구분해 같이 넣어주도록 하자.

## 2. (Programmatically) `SpringApplicationBuilder.properties()` 사용

SpringBootApplication 실행 전, property 를 설정한다.


### main

``` java
public static void main(String[] args) {
//        SpringApplication.run(MainApp.class); //이렇게 쓰던걸 아래와 같이 변경
    new SpringApplicationBuilder(MainApp.class)
            .properties("spring.config.location=classpath:/application.yaml, classpath:/custom-config.yaml")
            .run(args)
    ;
}
```

아래와 같이 사용하면 된다. 아래의 모든 설정 후, `Environment` 에서 꺼내 사용하려면 사용법은 똑같다.

``` java
@Autowired
Environment environment;

@Override
public void run(ApplicationArguments args) throws Exception {
    logger.debug("{}", environment.getProperty("my.config.name"));
    logger.debug("{}", environment.getProperty("my.config.data[1].value"));
}
```

## (Declaratively) `initializer` 또는 `listener` 에서 property 를 설정한다.

### main

``` java
public static void main(String[] args) {
    new SpringApplicationBuilder(MainApp.class)
            .initializers(new CustomApplicationContextInitializer()) //이렇게
//                .listeners(new CustomApplicationListener()) //또는 이렇게
            .run(args)
    ;
}
```
### CustomApplicationContextInitializer
``` java
public class CustomApplicationContextInitializer implements ApplicationContextInitializer {
    private ResourceLoader loader = new DefaultResourceLoader();
    @Override
    public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
        try {
            Resource resource = loader.getResource("classpath:/custom-config.yaml");
            PropertySource<?> propertySource = new YamlPropertySourceLoader().load("custom-config", resource).get(0);
            configurableApplicationContext.getEnvironment().getPropertySources().addLast(propertySource);
        } catch (IOException ex) {
            throw new IllegalStateException(ex);
        }
    }
}
```
### CustomApplicationListener
``` java
public class CustomApplicationListener implements ApplicationListener<ApplicationEnvironmentPreparedEvent> {
    private ResourceLoader loader = new DefaultResourceLoader();

    @Override
    public void onApplicationEvent(ApplicationEnvironmentPreparedEvent applicationEnvironmentPreparedEvent) {
        try {
            Resource resource = loader.getResource("classpath:/custom-config.yaml");
            PropertySource<?> propertySource = new YamlPropertySourceLoader().load("custom-config", resource).get(0);
            applicationEnvironmentPreparedEvent.getEnvironment().getPropertySources().addLast(propertySource);
        } catch (IOException ex) {
            throw new IllegalStateException(ex);
        }
    }
}
```

## (Declaratively) `META-INF/spring.factories` 에 `EnvironmentPostProcessor` 설정

classpath 에 `META-INF/spring.factories` 파일을 만들고, `EnvironmentPostProcessor` 위치를 알려준다.

### META-INF/spring.factories
```
org.springframework.boot.env.EnvironmentPostProcessor=com.harm.postprocessor.CustomEnvironmentPostProcessor
```

그리고 구현해주면 된다. 내부 로직은 하나같다.

### CustomEnvironmentPostProcessor.java

``` java
public class CustomEnvironmentPostProcessor implements EnvironmentPostProcessor {
        private ResourceLoader loader = new DefaultResourceLoader();
    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        try {
            Resource resource = loader.getResource("classpath:/custom-config.yaml");
            PropertySource<?> propertySource = new YamlPropertySourceLoader().load("custom-config", resource).get(0);
            environment.getPropertySources().addLast(propertySource);
        } catch (IOException ex) {
            throw new IllegalStateException(ex);
        }
    }
}
```

## 좀 더 아름답게 사용할 수 없을까?

~~`@PropertySource` 는 빼고~~ Spring boot 에서 property 를 설정하는 방법 몇 가지를 알았다.

- program argument 로 위치를 알려주는 방법.
- `SpringApplicationBuilder.properties()` 를 사용하는 방법.
- `initializer` 또는 `listener` 를 사용하는 방법.
- `META-INF/spring.factories` 에 `EnvironmentPostProcessor` 를 등록하고 사용하는 방법.

그럼 이거 해놓고 `Environment` 를 `@Autowired` 받아서

``` java
environment.getProperty("my.config.data[1].value"));
```

이짓거리 해야해??

### `@ConfigurationProperties` 를 사용해 보자.

설정 파일 내용에 대응하는 class 를 하나 만든다.

### MyConfigProperties

``` java
@ConfigurationProperties(prefix = "my.config")
public class MyConfigProperties {
    String name;
    List<MyConfigData> data;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<MyConfigData> getData() {
        return data;
    }

    public void setData(List<MyConfigData> data) {
        this.data = data;
    }
}
```

### MyConfigData.java

``` java
public class MyConfigData {
    String order;
    String value;

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
```

그리고 `@SpringBootApplication` 가 붙어있는 main class 에 `@EnableConfigurationProperties` 를 이용해서 `MyConfigProperties` 등록한다.
```java
@EnableConfigurationProperties(MyConfigProperties.class)
```

그리고 받아서 사용하세용.

``` java
@Autowired
MyConfigProperties myConfigProperties;

@Override
public void run(ApplicationArguments args) throws Exception {
    logger.debug("myConfigProperties.getName() -> {}", myConfigProperties.getName());
    logger.debug("myConfigProperties.getData().get(0).getOrder() -> {}", myConfigProperties.getData().get(0).getOrder());
    logger.debug("myConfigProperties.getData().get(0).getValue() -> {}", myConfigProperties.getData().get(0).getValue());
}
```

출처
- [Externalized Configuration](https://docs.spring.io/spring-boot/docs/2.2.2.RELEASE/reference/html/spring-boot-features.html#boot-features-external-config)
- [Spring Boot 와 Properties(or Yaml) Environment](https://kingbbode.tistory.com/39)
