---
layout: post
title: "Whiteship Spring JPA, Custom Default Repository"
date: 2020-12-19
tags: spring jpa
---

### 기본 Repository 를 Customizing 하는 방법.

JpaRepository interface 를 상속받는 Customizing interface 를 하나 만든다.  
`@NoRepositoryBean` 를 꼭 붙여서 spring 이 bean 으로 만들지 않도록 한다.
> 아마 spring 이 bean 을 만들지 않고 jpa 쪽에서 bean 으로 만들기 때문이 아닐까?  
> 없는 기본함수들을 다 만들어 주는 것을 보면..

``` java
@NoRepositoryBean
public interface MyCustomDefaultRepository<T, ID> extends JpaRepository<T, ID> {
    boolean contains(T entity);
}
```

위에서 만든 interface 를 구현한다. JpaRepository 의 구현체는 SimpleJpaRepository 로 한다.

``` java
//postfix 아님 그냥 Impl 쓴것
public class MyCustomDefaultRepositoryImpl<T, ID> extends SimpleJpaRepository<T, ID> implements MyCustomDefaultRepository<T, ID> {
    Logger logger = LoggerFactory.getLogger(MyCustomDefaultRepositoryImpl.class);
    EntityManager entityManager;
    public MyCustomDefaultRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityManager = entityManager;
    }

    //추가함수
    @Override
    public boolean contains(T entity) {
        return entityManager.contains(entity);
    }

    //변경함수
    @Override
    public List<T> findAll() {
        logger.debug("find all by my custom default repository");
        return super.findAll();
    }
}
```

`@EnableJpaRepositories` 의 repositoryBaseClass 설정으로 base class 를 알려준다.

``` java
@SpringBootApplication
@EnableJpaRepositories(repositoryBaseClass = MyCustomDefaultRepositoryImpl.class)
public class MainApp {
    public static void main(String[] args) {
        SpringApplication.run(MainApp.class);
    }
}
```

그리고 customizing default repository 를 상속받은 interface 를 만들어서 사용하자.
``` java
public interface PostRepository extends MyCustomDefaultRepository<Post, Long> {
}
```

끝.
