---
layout: post
title: "java, Linked Hash Map"
date: 2021-01-21
tags: java collections
---

알고리즘 문제를 풀다가 Hashing 의 O(1) 상수 시간 복잡도와 순서가 필요해서 고민하다 찾은 Collection 이다.

이름에서도 알 수 있듯이, Linked List 와 Hash Map 의 혼-종인 듯 하다. 순서를 유지하는, Hash Map 이다.

생성자의 파라미터는 3개가 있는데,

``` java
public LinkedHashMap(int initialCapacity, float loadFactor, boolean accessOrder)
```

## initialCapacity
초기 맵의 크기(용량)
## loadFactor
맵에 데이터가 어느정도 찼을때 맵의 크기를 늘릴지 정하는 인자
기본값이 0.75f 인데, 0.75 의 의미는 맵에 들어있는 데이터가 맵의 capacity 의 75퍼센트가 되면 맵의 capacity 를 늘린다는 의미이다.

## accessOrder
기본적으로 linked hash map 은 데이터가 들어온 순서를 기억하고 있지만(accessOrder 의 기본값은 false), accessOrder 의 값을 true 로 준다면, 데이터의 순서를 access order (접근 순서) 로 맞춰준다. LRU 캐시를 위해 만들어진 것 같다.

entry 나 iterator 로 순회했을때, 해당 순서대로 나오게 된다.
