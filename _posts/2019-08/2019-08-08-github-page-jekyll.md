---
layout: post
title: "Github page Jekyll Syntax Highlighter"
date: 2019-08-08
tags: web githubpage jekyll
---
> 아래서 적는 내용은 그냥 기록입니다.  
> 확실한 정보가 아닙니다.

`jekyll` 의 기본 `Syntax Highlighter` 는 `Python` 으로 만든 `pygments` 라고한다.  
근데 `pygments` 는 업데이트가 된지 엄청 오래된 놈이고 업데이트가 되더라도 그걸 `Github` 에서 받아줄지도 모른다고 한다.  

`pygments` 는 이런 문법을 사용한다.
{% raw %}
{% highlight javascript %}
console.log('hello?');
{% endhighlight %}
{% endraw %}

`jekyll` 에서 사용할 수 있는 다른 선택지는 `rouge` 인데

\`\`\`javascript
console.log('hello?');
\`\`\`

요렇게 쓰면 되나보다..

대체.. 이놈들이 해당 문법으로 코드를 써놓으면 형태소단위로 분리하여 `css` 를 입힐 수 있는 태그로 감싸주는건지..
색까지 입혀주는건지 모르겠는데 아무래도 색은 입혀주지않는 것 같고 `css` 를 따로 넣어줘야되는 것 같은데 연병 알 수가없네..
[`pygments` 는 css theme 홈페이지도 있던데..](http://jwarby.github.io/jekyll-pygments-themes/languages/javascript.html)


그러던 와중에

![rouge rocks](/assets/images/posts/2019-08-08-github-page-jekyll.PNG)

**Pygments Compatible**
Rouge themes are 100% compatible with **Pygments**' stylesheets. No need to remake your theme, and no need to spawn a Python process either. Rouge is made in Ruby.

야호! 그냥 갖다 쓰면되나보다
