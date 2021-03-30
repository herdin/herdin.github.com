---
layout: post
title: "javascript, 남에꺼 갖다 쓰기, google code prettyfy"
date: 2021-03-30
tags: javascript library
---


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


<pre id="target-code" class="prettyprint">
{
  name: 'herdin',
  age: 22
}
</pre>
