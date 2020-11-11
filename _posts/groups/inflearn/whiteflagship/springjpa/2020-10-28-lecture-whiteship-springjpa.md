---
layout: post
title: "Whiteship Spring JPA, fetch, query, repository"
date: 2020-10-28
tags: spring jpa
---

#### fetch
- eager : 바로 가져옴
- lazy : 나중에 가져옴.
기본적으로 oneToMany 의 경우, fetch 의 기본값은 lazy 이다. post-comment(one to many) 의 관계에서 post 를 조회했다고하여 comment 를 모두 조회하는 것은 낭비.
ManyToOne 의 경우, fetch 기본값은 eager

session.load, 가져올떄 없으면 예외 발생, 프록시에서 가져올 수도 있음
session.get, null 이 나올 수 있음. db 에서 가져옴.
session 은 hibernate api

javax.persistence.EntityManager 는 interface 이고 구현체로 hibernate 를 사용한다.
org.hibernate.Session


EntityManager 를 사용하여 native query 를 사용할 수도 있다.

#### Query

JPQL(Java Persistent Query Language)/HQL(Hibernate Query Language)
entity 기준으로 쿼리를 작성하며(JPQL/HQL) 이것을 각 db 에 맞는 sql 로 변환을 하여 쿼리가 실행된다.

``` java
TypedQuery<Account> query = null;

//JPQL 생성
query = entityManager.createQuery("SELECT a FROM Account As a", Account.class);
query.getResultList().forEach(item -> logger.debug("result jpql query -> {}", item));

//Type-safe 한 JPQL 생성
CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
CriteriaQuery<Account> query2 = criteriaBuilder.createQuery(Account.class);
Root<Account> from = query2.from(Account.class);
query2.select(from);
query = entityManager.createQuery(query2);
query.getResultList().forEach(item -> logger.debug("result with criteria query -> {}", item));

//Native query 생성
entityManager.createNativeQuery("SELECT * FROM Account", Account.class).getResultList().forEach(item -> logger.debug("result with native query -> {}", item));
```




#### JpaRepository

원래 이렇게 간단하진 않았으나 버전업을 거듭하며 간단해졌다.

``` java
public interface PostRepository extends JpaRepository<Post, Long> {}
```

이 원리는 `@EnableJpaRepositories` 에서 시작되어 `ImportBeanDefinitionRegistrar` 의 구현체로 끝나게된다.
`@EnableJpaRepositories` 이 없더라도 Spring boot 의 자동 설정에 의해 repository class 들이 빈등록이 되는데, 정확히는 모르겠지만,
spring-data-jpa/spring.factories 에서 답을 찾은 것 같다.

```
org.springframework.data.repository.core.support.RepositoryFactorySupport=org.springframework.data.jpa.repository.support.JpaRepositoryFactory
org.springframework.data.util.ProxyUtils$ProxyDetector=org.springframework.data.jpa.util.HibernateProxyDetector
```

`JpaRepositoryFactory` 가 해당 repository 들을 등록하는 것 같다.
