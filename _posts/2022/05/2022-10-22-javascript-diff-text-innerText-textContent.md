---
layout: post
title: "javascript text innerText textContent 차이"
date: 2022-10-22
tags: javascript html
---

## TL;DR
* innerHTML : html 을 그대로 가져옴
* innerText : 보이는 text
* textContent : 보이든지 말든지 text 로 인식되는 내용 모두
--- 
* HTMLElement.innerText : 사람이 읽을 수 있는 컨텐츠만 포함
* HTMLElement.textContent : `<script>` 등을 포함한 모든 element 를 포함

## 예제

##### html
``` html
<p id="target">
    this is visible
    <span style="display:none;">this is invisible</span>
</p>
```

##### console
``` javascript
document.querySelector('#target').outerHTML
// '<p id="target">this is visible<span style="display:none;">this is invisible</span></p>'
document.querySelector('#target').innerHTML
// 'this is visible<span style="display:none;">this is invisible</span>'
document.querySelector('#target').innerText
// 'this is visible'
document.querySelector('#target').textContent
// 'this is visiblethis is invisible'
```


참고
* [mdn textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)