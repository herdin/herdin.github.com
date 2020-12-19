---
layout: post
title: "Whiteship Spring JPA, Custom Repository"
date: 2020-12-12
tags: spring jpa
---

### 기본으로 제공되는 쿼리 메소드로 해결이 되지 않는 경우,
- 직접 구현하거나
- 기본으로 제공되는 기능을 덮어 쓸 수도 있다.
- Repository class 에 JpaRepository 를 상속받고 추가로 직접 구현한 implementation class 를 상속받는 방식.
- implementation class 에 기본적인 naming convention 이 존재한다. 기본 postfix `Impl` (ex: `내가만든클래스명Imple`)
- 기본 naming convention 은 `@EnableJpaRepositories(repositoryImplementationPostfix = "PostfixWhatIWant")` 로 변경가능


### 예제
먼저 요딴식으로  interface 를 만들고, 직접 구현할 또는 덮어 쓸 기능을 추가한다.
``` java
public interface MyCustomPostRepository {
    List<Post> findMyPost();
}
```

그리고 직접 구현한다. 구현 class 의 postfix 는 `Impl` 이다.  
postfix 를 바꾸려면 main class 에 `@EnableJpaRepositories(repositoryImplementationPostfix = "MyPostFix")` 로 변경해야함
`String repositoryImplementationPostfix() default "Impl";` 기본값이 Impl 임.

``` java
@Repository
@Transactional
public class MyCustomPostRepositoryImpl implements MyCustomPostRepository {
    Logger logger = LoggerFactory.getLogger(MyCustomPostRepository.class);
    @Autowired
    EntityManager entityManager;

    @Override
    public List<Post> findMyPost() {
        logger.debug("called!");
        return entityManager.createQuery("select p from Post as p", Post.class).getResultList();
    }
}
```

그리고 JpaRepository 와 만들어둔 interface 를 둘 다 상속받은 Repository 를 만든다.

``` java
public interface PostRepository extends JpaRepository<Post, Long>, MyCustomPostRepository {
}
```

그리고 사용하면 끝.

어느 글에 보면 JpaRepository 의 기본 구현체에서 사용하는 delete 는 cascade 나 entity manager 의 1차 캐싱 등 여러 작업을 하기 때문에, 비효율적으로 보일 수 있지만 그렇지 않다.

아무튼 내가 원하는 방식으로 함수를 덮어 쓰고싶다고하면, interface 에 같은 타입의 함수를 넣고 구현하면 된다.
