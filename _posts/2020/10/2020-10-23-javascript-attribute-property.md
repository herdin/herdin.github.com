---
layout: post
title: "javascript, attribute 와 property"
date: 2020-10-23
tags: javascript
---

> 경력이 10년이 다되가는데 이걸 이제야 알았습니다. 흑흑
>
> 흔히 javascript 로 볼 수 있는 코드에 document.body.id 로 body 의 id 속성을 접근하는 것은, DOM 객체의 body 객체의 id property 에 접근하는 것이었다. `body.getAttribute('id')` 나 `body.id` 나 같은건줄 알았는데..

html 이 브라우저에 다운로드 되면, 브라우저는 html 을 읽어 DOM(Document Object Model) 객체를 생성한다. 화면의 html tag 는 Element 이고, 해당 html tag 를 읽어 DOM 을 만드는 것이다.

브라우저가 DOM 을 생성할 때, 표준으로 정해진 Element 의 attribute 는 DOM 객체의 property 로 넣어주고 또 동기화가 되지만, 비표준인 attribute 에 대해선 DOM 객체의 property 로 만들지 않는다.

#### Element 의 attribute 를 접근할 때는,
`document.getElementById('some-id')` 와 같은 함수는 Element 를 읽어서 `document.getElementById('some-id').setAttribute('some-attr', 'some-value');` 로 attribute 를 설정한다.

#### DOM 의 객체의 property 를 접근할 때는,
`let bodyId = documnet.body.id;` 또는 `document.body.name = 'some-name';` 와 같이 직접 property 를 접근하면된다.

#### 예를 들어,
나무위키의 html 파일에 아래와 같은 내용이 있다.

```html
<html>
  <!-- ... -->
  <body>
    <div id="app">
      <!-- ... -->
    </div>
  </body>
  <!-- ... -->
</html>
```

여기서 attribute 와 property 의 차이점을 알아보자면,

html Element 의 표준 attribute 인 id 에 대해서는 DOM 객체로 파싱되어 접근이 되고, 변경이 가해졌을때, html Element 상에서도 변경됐음을 확인할 수 있다.
``` javascript
console.log('DOM ID : ', document.body.children[0].id);
// DOM ID :  app
document.body.children[0].id = 'app-herdin';
console.log('DOM ID : ', document.body.children[0].id);
// DOM ID :  app-herdin
console.log('Element ID : ', document.getElementById('app-herdin').getAttribute('id'));
// Element ID :  app-herdin
```

표준인 attribute 인 name 을 DOM 생성이 끝난 뒤 설정해도 DOM 에는 반영되지 않음을 확인할 수 있다.

``` javascript
document.getElementById('app-herdin').setAttribute('name', 'herdin');
console.log('DOM name : ', document.body.name);
// DOM name :  undefined
```

표준인 attribute 를 생성해도 DOM 에 반영되지 않으니, 비표준 attribute 는 직접해보는 것이 의미가 없다.

#### 비표준 attribute 를 DOM 과 같이 다루고 싶은데?
그렇다면, 비표준 attribute 를 DOM 과 함께 다루고 싶다면 어떻게 해야할까? 그런 attribute 를 위해 `data-*` 가 있다. 아마 html5 에 나온 듯한데, 귀찮아서 언제 나온건지는 찾아보지 않았다.

`data-어쩌구` 라고 attribute 를 개발자 입맛에 맞도록 정의해놓으면, 브라우저가 DOM 객체의 `dataset` property 에 key-value 형태로 담아준다.


다시 한번 나무위키의 html 파일을 보면

```html
<html>
  <!-- ... -->
  <body>
    <div id="app">
      <div class="app senkawa-fixed-size senkawa-fixed-1300" data-v-477a60af="">
      <!-- ... -->
    </div>
  </body>
  <!-- ... -->
</html>
```

DOM 에는 해당 property 가 없다. 하지만, `dataset` property 에 key-value 로 담겨있는 것을 확인할 수 있다.

``` javascript
// DOM 에는 없음
console.log('data value : ', document.body.children[0].children[0]['data-v-477a60af']);
// undefined

// 다른 형태로 담겨있다.
console.log('dataset value : ', document.body.children[0].children[0].dataset);
// dataset value :  DOMStringMap {v-477a60af: ""}
```

하지만 위의 dataset 역시 신규 표준인지라 구버전의 브라우저나 신버전이라도 브라우저에 따라 다르게 행동할 수 있다는 것을 명심해야한다.
