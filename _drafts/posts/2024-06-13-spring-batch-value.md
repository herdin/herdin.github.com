---
layout: post
title: "jvm argument, program argument"
date: 2024-06-13
tags: shovel-knight java
---


-D 로 주는 것들은 jvm argument
-DpaulJVMVal=hello-jvm-val

program argument 로 주려면
paulTestVal=hello-argument-val

아니 그럼 --spring.profiles.active=local 이런건 뭔데?



``` java
        @Value("#{jobParameters[paulTestVal]?:'hello-default-val'}") jobParamPaulTestVal: String,
        @Value("\${paulDVal}") paulDVal: String?
```


# 참고
* [spring.profiles.active 인자 전달법 2가지](https://velog.io/@dailylifecoding/Java-%EC%9D%B8%EC%9E%90%EA%B0%92-%EC%A0%84%EB%8B%AC-%EC%8B%9C-%EC%9C%A0%EC%9D%98%EC%82%AC%ED%95%AD)
* [ApplicationArguments javaDoc](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/ApplicationArguments.html)
* [What's the difference between program arguments and VM arguments?](https://stackoverflow.com/questions/5751851/whats-the-difference-between-program-arguments-and-vm-arguments)