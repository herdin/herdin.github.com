---
layout: post
title: "사용하면서 알아가는 jekyll"
date: 2021-01-06
tags:  web githubpage jekyll
---

## 아직 작성 중인데.. 온라인에 배포하고싶진 않고, commit 은 때리고 싶어..

프로젝트 최상단에 `_drafts` 폴더를 만들고 넣으면 된다.

## 포스팅 중에 내가 쓴 다른 포스팅을 링크 걸고 싶은데..

자꾸 url 이 변경 될까봐 걱정이야

아래와 같이 링크를 걸자.
```
{% raw %}
[여기를 참고하세요]({% post_url 2010-07-21-name-of-post %})
{% endraw %}
```
만약 `_posts` 하위에 디렉토리구조로 포스트를 관리했다면,

예를 들어 _posts/2020/04/2020-04-13-some-post.md 의 포스트를 참고하고 싶다.

그럼 아래와 같이 사용하자.
```
{% raw %}
[여기를 참고하세요]({% post_url /2020/04/2020-04-13-some-post %})
{% endraw %}
```






참고
- [Jekyll 공식 문서](http://jekyllrb-ko.github.io/docs/)
