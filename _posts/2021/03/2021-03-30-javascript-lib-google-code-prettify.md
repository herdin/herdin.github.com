---
layout: post
title: "javascript, 남에꺼 갖다 쓰기, google code prettyfy"
date: 2021-03-30
tags: javascript library
---

[code-prettify](https://github.com/googlearchive/code-prettify), 웹에서 code syntax coloring 을 해주는 라이브러리다.

아래와 같이 `pre` 또는 `code` 태그와 class 로 `prettyprint` 를 명시해주기만 하면, `run_prettify.js` 가 로드되면서, 이쁘게 syntax 를 꾸며주고, `prettyprinted` class 를 추가해준다.

``` html
<pre id="target-code" class="prettyprint">
{
  name: 'herdin',
  age: 22
}
</pre>
```

<pre id="target-code" class="prettyprint">
{
  name: 'herdin',
  age: 22
}
</pre>


`run_prettify.js` 의 로드시점 이후에 동적으로 추가된 값에 대해서는 `prettyprinted` class 를 제거하고, `PR.prettyPrint()` 를 호출하면 된다.

끝.


<script>
dependencyPromise
.then(() =>
  Promise.all([
    includeResource('/assets/vendor/google-code-prettfy/sunburst.css', css),
    includeResource('/assets/vendor/google-code-prettfy/run_prettify.js', script),
  ])
)
.then(() => {
  document.querySelector('#target-code').classList.remove('prettyprinted');
  PR.prettyPrint();
});
</script>
