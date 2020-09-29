---
layout: post
title: "Spring @Import, @Enable 어노테이션 활용"
date: 2020-09-29
tags: java spring
---

Spring JPA 를 공부하다가.. `@EnableJpaRepositories` 가 `@Import` 하는 `JpaRepositoriesRegistrar` 가 spring 의 `ImportBeanDefinitionRegistrar` interface 를 구현하게되어서 보게되었다.

`@Enable` 라는 어노테이션이 있는 것은 아니고, 수많은 설정을 하나로 모으기 위한 어노테이션 설정 패턴인 것 같다는 생각이 들었다.

`@Import` 는 XML 설정에서 `<import/>` 와 동일하다고 한다.
- `@Configuration` class
- `ImportSelector` 또는 `ImportBeanDefinitionRegistrar` 의 구현체
- `@Component`

를 import 하는 기능을 한다.


일단 학습을 위한 Bean 들의 기본 interface

#### Bean interface

뭔가 하는 interface
``` java
public interface DoSomething {
    public void doSomething();
}
```

#### Bean class

BeanA, BeanB, BeanC, ... 모두 다 요딴식으로 만들었다. 별의미없다 그냥 같은 interface 에 다른 class 라는 것이 중요하다.

``` java
public class BeanA implements DoSomething {
    String value = "default A";
    public BeanA() {}
    public BeanA(String value) {
        this.value = value;
    }
    public void doSomething() {
        System.out.println(this.getClass().getName() + " do something with " + value);
    }
}
```

#### 설정이 되었다 치고 DI 받아서 사용하는 부분

``` java
@Component
public class AwareSeriesResource implements ResourceLoaderAware {
    Logger logger = LoggerFactory.getLogger(AwareSeriesResource.class);

    @Autowired
    DoSomething doSomething; //여기서 받아서

    @Override
    public void setResourceLoader(ResourceLoader resourceLoader) {
        logger.debug("hello!!, {}", resourceLoader);
        logger.debug("hello!!, do something!!");
        doSomething.doSomething(); //이렇게 사용한다.
    }
}
```

## `@Configuration` 를 import 하는 방법

아래와 같이 Enable... 로 시작하는(명칭은 상관없음) annotation class 를 만들어서 필요한 Configuration class 들을 줄줄히 넣거나,

``` java
@Retention(RetentionPolicy.RUNTIME)
@Import(ConfigA.class)
public @interface EnableConfigA {
}
```

Component class 에 그냥 Import 를 해도 된다.

``` java
@Import(ConfigA.class)
@Component
public class AwareSeriesResource implements ResourceLoaderAware {
  //...
}
```

## `ImportSelector` 를 사용하는 방법

Enable annotation class 를 만들고,

``` java
@Import(ConfigBCSelector.class)
public @interface EnableConfigBCSelector {
    enum TYPE {
        B, C, SimpleB, SimpleC
    }
    TYPE type() default TYPE.B;
}
```

Enable annotation class 에서 설정한 파라미터에 따라서 어떤 Configuration class 또는 Component class 를 Import 할 것인지 판단하는 ImportSelector 를 구현한다.

``` java
public class ConfigBCSelector implements ImportSelector {
    @Override
    public String[] selectImports(AnnotationMetadata annotationMetadata) {
        Map<String, Object> annotationAttributesMap = annotationMetadata.getAnnotationAttributes(EnableConfigBCSelector.class.getName(), false);
        AnnotationAttributes annotationAttributes = AnnotationAttributes.fromMap(annotationAttributesMap);
        EnableConfigBCSelector.TYPE type = annotationAttributes.<EnableConfigBCSelector.TYPE>getEnum("type");
        switch(type) {
            case B:
                return new String[]{ConfigB.class.getName()};
            case C:
                return new String[]{ConfigC.class.getName()};
            case SimpleB:
                return new String[]{BeanB.class.getName()};
            case SimpleC:
                return new String[]{BeanC.class.getName()};
            default:
                throw new IllegalArgumentException("NOT SUPPORTED TYPE ->" + type.toString());
        }
    }
}
```

사용할때는 이렇게 쓰면 된다.

``` java
@EnableConfigBCSelector(type = EnableConfigBCSelector.TYPE.C)
@Component
public class AwareSeriesResource implements ResourceLoaderAware {
  //...
}
```

## `ImportBeanDefinitionRegistrar` 사용하는 방법

ImportSelector 와 유사하다.

``` java
@Retention(RetentionPolicy.RUNTIME)
@Import({ConfigDERegistrar.class})
public @interface EnableConfigDE {
    enum TYPE {
        D, E
    }
    EnableConfigDE.TYPE type() default TYPE.D;
}
```

ImportSelector 는 class 의 이름을 String 으로 반환해야하는데 반해, ImportBeanDefinitionRegistrar 는 BeanDefinition 을 반환하기 때문에 Type Safe 한 것 같은데 잘 모르겠구만..

``` java
public class ConfigDERegistrar implements ImportBeanDefinitionRegistrar {
    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        Map<String, Object> annotationAttributesMap = importingClassMetadata.getAnnotationAttributes(EnableConfigDE.class.getName(), false);
        AnnotationAttributes annotationAttributes = AnnotationAttributes.fromMap(annotationAttributesMap);
        EnableConfigDE.TYPE type = annotationAttributes.<EnableConfigDE.TYPE>getEnum("type");
        BeanDefinition beanDefinition = null;
        switch(type) {
            case D:
                beanDefinition = new RootBeanDefinition(BeanD.class.getName());
                registry.registerBeanDefinition(BeanD.class.getSimpleName(), beanDefinition);
                break;
            case E:
                beanDefinition = new RootBeanDefinition(BeanE.class.getName());
                registry.registerBeanDefinition(BeanE.class.getSimpleName(), beanDefinition);
                break;
            default:
                throw new IllegalArgumentException("NOT SUPPORTED TYPE ->" + type.toString());
        }
    }
}
```

사용할때는 ImportSelector 사용할 때와 같다.
``` java
@EnableConfigDE(type = EnableConfigDE.TYPE.D)
@Component
public class AwareSeriesResource implements ResourceLoaderAware {
  //...
}
```
