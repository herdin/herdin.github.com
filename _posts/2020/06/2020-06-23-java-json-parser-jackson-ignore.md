---
layout: post
title: "Java, Jackson ObjectMapper serialize/deserialize"
date: 2020-06-23
tags: java json
---

`Spring` 쓸 떄랑 왜 다른거야..........................
아무튼 정리 시작..

대상이 될 json
```
{
  id: "22",
  name: "herdin",
  level: "45",
  desc: "rekt-developer",
  timestamp: "20200623111213"
}
```

java code 로 표현하면 이렇다.
``` java
String jsonStr = "{ id: \"22\", name: \"herdin\", level: \"45\", desc: \"rekt-developer\", timestamp: \"20200623111213\" }";
```

아무 생각 없이 `deserialize` 하면
``` java
ObjectMapper objectMapper = new ObjectMapper();
Champion champion = objectMapper.readValue(jsonStr, Champion.class);

@Data
public static class Champion {
    Integer id;
    String name;
    Long level;
    String desc;
}
```

아래와 같은 오류가 난다.
```
com.fasterxml.jackson.core.JsonParseException: Unexpected character ('i' (code 105)): was expecting double-quote to start field name
```

쌍따옴표로 json object 의 키값이 쌓여져있지 않다는 건데, 설정을 해주면 된다.

``` java
objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
```

다시한번 하면, 아래와 같은 오류가 난다.

```
com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException: Unrecognized field "timestamp" (class com.harm.unit.data.json.JacksonStudy001$Champion), not marked as ignorable (4 known properties: "desc", "id", "level", "name"])
```

일부러 deserialize class 에 timestamp 를 만들지 않았다. class field 에 없는 json field 는 무시하고 싶으면 두가지 방법이 있다.

ObjectMapper 에 설정을 추가하는 방법

``` java
objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
```

deserialize class 에 annotation 을 추가하는 방법

``` java
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public static class Champion {
    Integer id;
    String name;
    Long level;
    String desc;
}
```

이번엔 만들지 않았던 timestamp 변수도 추가했다.

``` java
@Data
public static class Champion {
    Integer id;
    String name;
    Long level;
    String desc;
    private LocalDateTime timestamp;
}
```

그래도 오류가 나는데,

```
com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Cannot construct instance of `java.time.LocalDateTime` (no Creators, like default construct, exist): no String-argument constructor/factory method to deserialize from String value ('20200623111213')
```

뭐라는지 보면, `LocalDateTime` 을 생성할 수 없는데 String 타입을 받는 생성자/팩토리 가 없다고한다.

`LocalDateTime` 을 뒤져보면 정말 없다. 이거 스프링은 어떻게 해주는거야..??



아래와 같은 Deserializer 를 만들고,

``` java
public static class CustomLocalDateTimeDeserializer extends StdDeserializer<LocalDateTime> {
    private static DateTimeFormatter formatter =
            DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
    public CustomLocalDateTimeDeserializer() {
        this(null);
    }
    @Override
    public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        String date = p.getText();
        return LocalDateTime.parse(date, formatter);
    }
    public CustomLocalDateTimeDeserializer(Class<LocalDateTime> t) {
        super(t);
    }
}
```

deserialize class field 에 annotation 으로 알려주면 되는데, 뭔가 이상하다..
이렇게 안해도 될것같은데..

``` java
@Data
public static class Champion {
    Integer id;
    String name;
    Long level;
    String desc;
    @JsonDeserialize(using = CustomLocalDateTimeDeserializer.class)
    private LocalDateTime timestamp;
}
```
