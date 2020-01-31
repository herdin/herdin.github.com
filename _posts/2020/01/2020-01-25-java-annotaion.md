---
layout: post
title: "java, annotaion"
date: 2020-01-20
tags: java
---

> 백기선님의 인프런 강의, 스프링 웹 MVC 의 요청 맵핑하기 6부 커스텀 애노테이션 을 보다가 정리한다.


spring 에서 custom mapping annotaion 을 만들다

``` java
package com.harm.annotaion;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping(method = RequestMethod.GET, value = "/usage02/hello3", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
@ResponseBody
public @interface Usage02Hello3GetMediaTypeJsonMapping {
}
```

요딴 걸 만들었는데, 테스트케이스에서 자꾸 404가 떨어져서 한참 찾았는데, `@Retention` 라는 meta annotaion 이 없어서 그렇다는것을 알았다. 겸사겸사 meta annotaion 에 대해서 알아본다.

meta annotaion 에는 몇 가지가 있는데

### `@Retention`

`enum RetentionPolicy` 을 매개변수로 받는다.
- SOURCE : 컴파일러가 버림. 의존성이 있는 어노테이션의 경우, 컴파일 에러가 나기도 한다.
- CLASS : 클래스파일에는 존재하지만 vm 에선 버린다. 런타임에서 읽기 불가.
- RUNTIME : 런타임에도 남아있는다.

### `@Repeatable`

annotaion 을 반복해서 사용할 수 있도록 해준다. 다수의 어노테이션 그룹핑해주는 기능인 것 같다.

### annotaion 에 파라미터로 사용될 열거형
```java
public enum REPEATABLE_VALUE {
    REPEATABLE_ONE,
    REPEATABLE_TWO,
    REPEATABLE_THREE
}
```

### 반복사용될 annotaion

```java
@Repeatable(value = RepeatableGroup.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface RepeatableItem {
    REPEATABLE_VALUE value();
}
```

### 그룹핑할 annotaion

```java
@Retention(RetentionPolicy.RUNTIME)
public @interface RepeatableGroup {
    RepeatableItem[] value();
}
```

### 테스트 케이스로 알아보자

```java
package com.harm.unit.reflect.annotaion.repeatable;

import org.junit.Assert;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.annotation.Annotation;

public class RepeatableTest {
    private Logger logger = LoggerFactory.getLogger(RepeatableTest.class);

    @Test
    public void repeatableTest01() {
        @RepeatableItem(REPEATABLE_VALUE.REPEATABLE_ONE)
        @RepeatableItem(REPEATABLE_VALUE.REPEATABLE_TWO)
        @RepeatableItem(REPEATABLE_VALUE.REPEATABLE_THREE)
        class RepeatableTestTarget01 { }

        Annotation[] annotations = RepeatableTestTarget01.class.getAnnotationsByType(RepeatableItem.class);

        Assert.assertTrue(annotations.length == 3); //그룹핑 없이 읽는 법

    }

    @Test
    public void repeatableTest02() {
        @RepeatableItem(REPEATABLE_VALUE.REPEATABLE_ONE)
        @RepeatableItem(REPEATABLE_VALUE.REPEATABLE_THREE)
        class RepeatableTestTarget02 { }

        Annotation[] annotations = RepeatableTestTarget02.class.getAnnotations();
        Assert.assertTrue(annotations.length == 1); //RepeatableGroup 1 그룹핑된 annotaion 한개가 나온다.

        RepeatableGroup repeatableGroup = RepeatableTestTarget02.class.getAnnotation(RepeatableGroup.class);
        Assert.assertTrue(repeatableGroup.value().length == 2); //repeatableGroup values 2 이렇게 읽을 수 있다.

    }

    @Test
    public void repeatableTest03() {
        @RepeatableItem(REPEATABLE_VALUE.REPEATABLE_THREE)
        class RepeatableTestTarget03 { }

        RepeatableGroup repeatableGroup = RepeatableTestTarget03.class.getAnnotation(RepeatableGroup.class);
        Assert.assertTrue(repeatableGroup == null); //annotaion 이 한개면 그룹핑이 안된다.

        RepeatableItem[] repeatableItems = RepeatableTestTarget03.class.getAnnotationsByType(RepeatableItem.class);
        Assert.assertTrue(repeatableItems.length == 1); //그룹핑 되지 않아도 읽을 수 있도록 RepeatableItem 에 @Retention(RetentionPolicy.RUNTIME) 을 붙이도록 하자.
    }
}
```

### `@Target`

annotaion 을 어디에 붙일지 `enum ElementType` 로 설명한다. 잘못 붙이면 컴파일 에러가 난다.


### `@Documented`
annotaion 정보를 java doc 에 표시해준다.

### `@Inherited`

annotaion 이 붙은 클래스의 자식 클래스에도 annotaion 이 적용되도록 한다. 뭔 뜻이냐면

요딴 annotaion 을 하나 정의해놓고,

``` java
@Inherited
@Retention(RetentionPolicy.RUNTIME)
public @interface InheritedItem {
    String name() default "";
    String[] value() default {};
}
```

아래와 같이 테스트를 해보자

``` java
@InheritedItem({"hello", "world"})
class InheritedTarget { }
class InheritedTargetChild extends InheritedTarget { }

Annotation[] annotations = InheritedTargetChild.class.getAnnotations();
logger.debug("annotations.length -> {}", annotations.length);
for(Annotation annotation : annotations) {
    logger.debug("{}", annotation);
}

InheritedItem inheritedItem = InheritedTargetChild.class.getAnnotation(InheritedItem.class);
for(String val : inheritedItem.value()) {
    logger.debug("inheritedItem.value() -> {}", val);
}
```

그럼 자식클래스에선 annotaion 을 붙이지 않았는데도 붙은 것처럼 확인할 수가 있다. Runtime 에도 확인할 수 있도록 `@Retention(RetentionPolicy.RUNTIME)` 을 붙이는 것을 잊지 말도록 하자.
``` shell
2020-01-28 16:18:04.765 DEBUG --- [ main ] c.h.u.r.a.i.InheritedTest : annotations.length -> 1
2020-01-28 16:18:04.770 DEBUG --- [ main ] c.h.u.r.a.i.InheritedTest : @com.harm.unit.reflect.annotaion.inherited.InheritedItem(name=, value=[hello, world])
2020-01-28 16:18:04.770 DEBUG --- [ main ] c.h.u.r.a.i.InheritedTest : inheritedItem.value() -> hello
2020-01-28 16:18:04.770 DEBUG --- [ main ] c.h.u.r.a.i.InheritedTest : inheritedItem.value() -> world
```
