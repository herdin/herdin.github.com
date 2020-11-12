---
layout: post
title: "javascript, throttle 과 debounce"
date: 2020-11-10
tags: web javascript
---

> 회사 시험때 나왔던 문젠데, 속시원하게 답을 못적었는데,
> 블로그 태그 검색 기능을 추가하면서 제대로 정리하게 되었다.

화면에서 사용자의 입력을 받거나 감시하는 이벤트 리스너에선 과도하게 많은 트래픽이 발생할 수 있는데, 이를 방지하고자 나온 방법이다.

사용자가 입력을 다 하지도 않았는데 매 입력이나 이벤트마다 무의미한 처리를 하는 것은 클라이언트/서버 성능 관점에서 심각한 손해이다.

동일한 이벤트가 짧은 시간에 많이 발생하는 경우,
- `Throttle` 는 일정 간격 마다 이벤트가 실행이 된다.
- `Debounce` 는 일정 간격 동안의 마지막 이벤트만 실행이 된다.

예제를 잘 만들어주셔서 [Throttle 와 Debounce 개념 정리하기](https://medium.com/@pks2974/throttle-%EC%99%80-debounce-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-2335a9c426ff) 에서 퍼와서 아주조금 변경했다.

``` javascript
var debounce = null;
var throttle = null;
$('#search').keyup(function(el) {
  let targetValue = el.target.value;
  console.log('normal', targetValue, new Date().getTime());

  // debounce
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    console.log(
      'debounce',
      targetValue, new Date().getTime());
  }, 1000);

  // throttle
  if(!throttle) {
    throttle = setTimeout(() => {
      console.log('throttle', targetValue, new Date().getTime());
      throttle = null;
    }, 1000);
  }
});
```

아무리 생각해도 debounce 방식이 좋은 것 같은데, 그건 단순히 성능측면에서 그렇고, 사용자 경험 측면에서는 throttle 방식이 좋은 것 같다.


참고
- [Throttle 와 Debounce 개념 정리하기](https://medium.com/@pks2974/throttle-%EC%99%80-debounce-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-2335a9c426ff)
