---
layout: post
title: "Vue js"
date: 2020-07-08
tags: javascript vuejs
---

> front 를 뭘 쓸까 하다가, 하도 VueJS 가 쉽다고 해서 선택해보았다.
> 당연한 이야기지만, 아무생각없이 쓰기 편하다라는 뜻이다.

[Vue.js](https://kr.vuejs.org/v2/guide/index.html) 라고 하며, 한국 문서가 어느정도 잘 되어있다. 보다보면 아직 번역 안된 부분이 많긴 하다.

사용법은 적지 않고, 사용하면서 학습이 필요했던 부분만 적도록 하겠다.

Vue.js 에선 Hook 이란 것을 지원하는데, 얕게 이해한 바로는 마치 `@PostCreate` 나 Interceptor 의 prehandle(), posthandle() 처럼 인스턴스의 생애주기(Lifecycle)에 커스터마이즈하게 껴들 수 있는 포인트라고 이해를 했다.

<img src="#" post-src="2020-07-08-vue-js-init" />

Vue 인스턴스는
* 생성(create)되고
* DOM에 부착(mount)되고
* 업데이트(update)되며
* 없어지는(destroy)
과정을 거치게 된다.

#### beforeCreate
* Vue 인스턴스 초기화 직후, 호출.
* 컴포넌트가 DOM 에 추가되기 전이기 때문에, `this.$el` 접근 불가.
* data, event, watcher 접근전, data, methods 접근 불가.


#### created
* data 를 반응형으로 추적할 수 있게되고, computed, methods, watch 활성화되어 접근가능
* DOM 에 추가되지 않은 상태
* data 초기화나 이벤트 리스너를 설정하는 단계

#### beforeMount
* DOM 부착 직전에 호출
* 가상 DOM 이 생성되어 있으나, 실제 DOM 에 부착되진 않은 상태

#### mounted
* DOM 에 부착되고 난 후에 실행되므로, `this.$el`, data, computed, methods, watch 모든 요소 접근 가능.

#### beforeUpdate
* data 값이 변해서 DOM 에 적용하기 직전에 호출

#### updated
* DOM 이 변경된 이후에 호출
* 여기서 data 를 변경하면 무한루프가 생길 수 있음

#### beforeDestroy
* 인스턴스 삭제 전 호출
* 모든 속성 접근 가능

#### destroyed
* 인스턴스 삭제 후 호출
* 모든 속성 접근 불가


참고
- [created vs mounted in Vue.js :: 마이구미](https://mygumi.tistory.com/201)
- [Virtual DOM이란 무엇인가? :: 마이구미](https://mygumi.tistory.com/190)
- [Virtual DOM and REACT](https://www.youtube.com/watch?v=BYbgopx44vo)
- [Vue 라이프사이클 이해하기](https://wormwlrm.github.io/2018/12/29/Understanding-Vue-Lifecycle-hooks.html)
