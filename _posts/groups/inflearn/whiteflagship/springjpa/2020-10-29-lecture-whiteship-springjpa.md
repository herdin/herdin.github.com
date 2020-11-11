---
layout: post
title: "Whiteship Spring JPA, "
date: 2020-10-29
tags: spring jpa
---

[빠른사용을 위한 링크](https://jobc.tistory.com/120)

스프링 데이터는 여러 프로젝트의 묶음.
- common
- rest
- JPA
- jdbc
- keyValue
- mongoDB
- Redis
- ...

## 스프링 데이터 Common, Repository

package org.springframework.data.jpa.repository;
public interface JpaRepository<T, ID> extends PagingAndSortingRepository<T, ID>, QueryByExampleExecutor<T>

package org.springframework.data.repository;
public interface PagingAndSortingRepository<T, ID> extends CrudRepository<T, ID>
@NorepositoryBean //Repository 를 상속받았기 때문에 Spring 이 bean 을 만들지 않도록 알려줌
public interface CrudRepository<T, ID> extends Repository<T, ID>
public interface Repository<T, ID> //마커용

`JpaRepository` 를 상속받은 interface 를 만들면, 기본적으로 findAll, findById, save, paging 등의 기본적인 기능들이 포함된 상태로 구현된다.

``` java
//기본적인 방법
public interface PostRepository extends JpaRepository<Post, Long> {
}
```

`@RepositoryDefinition` 를 사용해서 기능이 없는 Repository 를 만들고 원하는 기능만 넣는 방법이 있다.

``` java
@RepositoryDefinition(domainClass = Post.class, idClass = Long.class)
public interface CustomPostRepositoryWithRepositoryDefinition {
    Post save(Post post);
    List<Post> findAll();
}
```

공통적인 Repository 를 만들고 상속받아 사용하는 방법도 있다.

``` java
public interface CommonPostRespository<T, ID extends Serializable> extends Repository<T, ID> {
    <E extends T> E save(T t);
    List<T> findAll();
}

@NoRepositoryBean
public interface CustomPostRepositoryWithCommonPostRepository extends CommonPostRespository<Post, Long> {
}
```

## Null 처리

Spring Data 2.0 부터 java 8 의 Optional 지원
