---
layout: post
title: "Whiteship Spring MVC 10 Component"
date: 2019-07-23
tags: web spring
---
# Spring with Whiteship
`gitbook` 이랑 `gitpage` 랑 뭘 해야될지 모르겠다.
`gitbook` 이 좀 더 편하긴한데...
`gitpage` 는 뭔가 내맘대로 만들 수 있어서..
죽도 밥도 안될 것 같은 느낌..

아무튼 기선이형과 함께하는 `spring` !

이미 좀 들었지만. 강의를 들으며 기억할만 것을 여기다 끄적이려한다.

### `Spring MVC` 강의를 들으며 스프링 MVC 구성요소에서 `FlashMapManager` 를 이야기하던 중...
- `FlashMapManager` 는 `FlashMap` 인스턴스를 가져오고 저장하는 인터페이스
- `FlashMap` 은 주로 리다이렉션을 사용할때 요청 매개변수를 사용하지 않고 데이터를 전달하고 정리할 때 사용한다.
> 어떤 데이터 요청을 받고 저장을하고 그다음에 `redirect` 를 하는데, 이는 화면에서 form submit 이 있었을때 뒤로가기나 새로고침 등으로 form submit POST 요청을 다시한번 받지 않기 위한 패턴이라고 한다.
중복 form submit 을 방지하기 위한 패턴

뭔뜻이냐면.. 일단 막 적고 봤는데..
form submit request 를 받으면 뭔가 데이터를 저장하고 다음 화면에서 뒤로가기나 화면 리프레쉬로 중복 form submit 을 막기 위해 `redirect:/event/id/2019072310000` 등으로 리다이렉션을 하는데 이때, 매개변수를 사용하지 않고도 데이터를 전달할 때 사용한다고 한다.

우와 뭔가 이해가 안간다. 어떻게그렇게할까?

아하 세션기반이란다. 시무룩.

마침 구성요소 강의의 마지막이라 이게 끝인데, 좀더 알고 싶으면
`HandlerMapping` 과 `HandlerAdapter` 의 인터페이스를 알아보라고 한다.
`HandlerAdapter` 여기가 복잡하다고 한다.

하지만 가성비는 여기까지만 알아도 된다.
