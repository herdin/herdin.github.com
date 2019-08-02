---
layout: post
title: "Builder Pattern"
date: 2019-07-30
tags: design-pattern writing
---

- 객체를 생성 시, 초기화 할 변수가 많으면..
  - 생성자로 받는 방식
    - 파라미터가 많아지면, 파라미터간 식별이 힘들어짐.
    - 다양한 파라미터를 받는 생성자가 필요할 수도 있음.
      - 그럼 생성자가 많아지고, 위와 같은 문제(파라미터간 식별불가)가 또 발생할 수 있음.
  - setter 로 받는 방식.
    - 객체 안의 변수가 언제든 바뀔 수 있는 가능성이 존재.

위의 문제를 해결하기 위해 나온 디자인 패턴인 것 같다.
우아한 불변객체생성과 변수 초기화의 가독성을 해결.

예제. `String` 타입의 불변의 멤버변수 3개 (`innerId`, `innerName`, `innerAlias`) 를 갖는 `SchemaObject003001` class
> jaxb schema object 로 사용하던 클래스라 명칭이 좀 더럽다.
>
> 내부 `Builder` class 의 생성자에 필수 멤버변수를 둘 수도 있고, (그때는 해당 멤버변수를 final 로 선언)
>
> 빌더 패턴으로 변수 초기화 시 변수 값을 validation 할 수도 있다.

{% highlight java %}
public class SchemaObject003001 {
    private final String innerId;
    private final String innerName;
    private final String innerAlias;
    public static class Builder {
        private String innerId;
        private String innerName;
        private String innerAlias;
        public Builder innerId(String innerId) {
            this.innerId = innerId;
            return this;
        }
        public Builder innerName(String innerName) {
            this.innerName = innerName;
            return this;
        }
        public Builder innerAlias(String innerAlias) {
            this.innerAlias = innerAlias;
            return this;
        }
        public SchemaObject003001 build() {
            return new SchemaObject003001(this);
        }
    }
    private SchemaObject003001(Builder builder) {
        this.innerId = builder.innerId;
        this.innerName = builder.innerName;
        this.innerAlias = builder.innerAlias;
    }
    public String getInnerId() {
        return innerId;
    }

    public String getInnerName() {
        return innerName;
    }

    public String getInnerAlias() {
        return innerAlias;
    }
}
{% endhighlight %}

{% highlight java %}

SchemaObject003001 so = new SchemaObject003001
  .Builder()
  .innerId("inner-id1")
  .innerName("inner-name1")
  .innerAlias("inner-alias1")
  .build();

{% endhighlight %}
- [참고자료1](https://johngrib.github.io/wiki/builder-pattern/)
