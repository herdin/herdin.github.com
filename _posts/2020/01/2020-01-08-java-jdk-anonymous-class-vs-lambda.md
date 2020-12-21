---
layout: post
title: "self-reference in initializer, Anonymous class vs Lambda"
date: 2020-01-08
tags: java lambda
---

사무실에서 갑자기 누가 뭘 물어봐서.. 알게된 사실..


``` java
public enum ABC {
    A("ABC A", new Supplier<String>() {
        @Override
        public String get() {
            return ABC.A.value + ", from anonymous class";
        }
    }),
    B("ABC B", () -> {
       String value = ABC.B.value;
       return value + ", from lambda"; // 1)
       //return ABC.B.value + ", from lambda"; // 2)
    }),
    ;
    private String value;
    private Supplier<String> supplier;
    ABC(String value, Supplier<String> supplier) { MainApp.looger.debug("ABC Constructor {}", this.toString()); this.value = value; this.supplier = supplier;}

    public String getSupplier() {
        return supplier.get();
    }
}
```

1) 대신 2) 를 사용하면, `error: self-reference in initializer` 컴파일 에러가 난다.

참고 페이지들을 보면, 버그는 아니고.. 람다는 원래 그래! 이러고 있는 듯하다. 람다가 내부적으로 클래스를 만들지만, 문법적으로는 표현식으로 평가해주기 바라는 걸까?

참고
- [Why do lambdas in Java 8 disallow forward reference to member variables where anonymous classes don't?](https://stackoverflow.com/questions/24509441/why-do-lambdas-in-java-8-disallow-forward-reference-to-member-variables-where-an)
- [javac fails with "self-reference in initializer" when referencing the static field from lambda](https://bugs.openjdk.java.net/browse/JDK-8027941)
