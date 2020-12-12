---
layout: post
title: "Whiteship Spring JPA, 프로젝트 설정, entity 상태"
date: 2020-07-23
tags: spring jpa
---

#### entity 의 상태
- Transient : JPA 가 모르는 상태, 그냥 객체를 생성만 한 상태. DB 에 들어갈지 안 들어갈지도 모르는 상태.
- Persistent : JPA 가 관리하는 상태. save 를 한 상태. 바로 DB 에 들어가는것은 아니다.
  이제 DB 에 넣어야겠다 라고 JPA 가 결정할 때 들어간다.
  session.save(object); session.load(Object.class, object.getId()); 를 하면 select 를 하지 않는다. -> 1차 캐싱
  Dirty checking -> 객체를 save 로 JPA 가 관리하는 상태로 만든 후, 값을 변경하면, insert 후 update 를 하는데
  값이 변경되다가 다시 save 했을 당시의 값으로 돌아오면 update 도 하지 않는다.
  write behind -> ??
- Detached : JPA 가 관리하지 않는 상태. 객체를 Transactional 스코프에서 사용하다가 해당 함수가 끝났을때.
- Removed : JPA 가 관리하긴 하지만 삭제하기로 한 상태

사용에 따른 entity 의 상태 변화

``` java
Object obj = new Object(); //Transient
Session.save(obj); //Persistent
Session.get();
Session.load();

Session.evict(); //Persistent -> Detached
Session.clear();
Session.close();

Session.update(); //Detached -> Persistent
Session.merge();
Session.saveOrUpdate();

Session.delete(); //Persistent -> Removed
```

`sesion.save(object)` 를 했다고해서 바로 isnert 하지 않는다. save 를 호출하면 Transient -> Persistent 로 entity 의 상태가 변경된다.
psersistance context 에 entity 가 들어간 상태. 1차 캐싱이 이루어진다. 코드로 살펴보면.

``` java
Account account = new Account();
account.setName("herdin-01");
entityManager.persist(account); //분명 psersist 부터 호출하고 (1)
logger.debug("account -> {}", account); //로깅해보고 (2)
account.setName("herdin-02"); //값을 변경하고 persist 를 호출하지 않았지만, (3)
```
실제 실행은 로깅이 먼저 찍히고 (2), insert 가 실행되고 (1), update 가 실행된다 (3)
이런 기능이 dirty checking, write behind 라고 한다.

#### cascade
관계가 `@OneToMany`/`@ManyToOne` 일 경우, 사용한다. entity 의 상태를 전파한다. 기본적으로는 아무것도 전파하지 않는다.
``` java
  @OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
  Set<Skill> ownedSkills;
```
