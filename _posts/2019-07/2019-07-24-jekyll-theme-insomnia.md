---
layout: post
title: "Github page + Jekyll 사용하기."
date: 2019-07-24
tags: web githubpage jekyll
---
- Jekyll theme candidates
  - [사용중 - 튜토리얼에서 알게된 나우마스터](https://github.com/barryclark/jekyll-now)
    - [튜토리얼](https://thdev.net/653)
  - [두번째 후보자 플레인 화이트](http://jekyllthemes.org/themes/PlainWhite-Jekyll/)
  - [중국 개발자의 미니멀리즘](http://jekyllthemes.org/themes/Biu/)

> 아 `gitbook` 겁나 열심히 쓰고있었는데, 이걸로 갈아타나 젠자아앙 어쩌지지이이이이이

## 테마 갖다 쓰기
- [Jekyll Theme](http://jekyllthemes.org/) 에 가서 원하는 테마를 다운로드 받는다.
- 본인의 `Github page repository` 를 `clone` 받은 곳에 폴더들을 덮어 쓴다.
- `_config.yml` 파일에 본인 설정에 맞게 정보들을 적는다.
- `commit && push` 후 확인

## ~Kakao 기술 블로그에서 보고 따라한 tag 모아보기 만들기 는 태생적인 한계가 있음~
[해당포스트](http://tech.kakao.com/2016/07/07/tech-blog-story/) 를 보면 [Jekyll 공식 Github Page](https://jekyllrb-ko.github.io/) 에서 가이드한 [Collectioin](https://jekyllrb-ko.github.io/docs/collections/) 을 사용하여 `tag` 를 구현하고 있다.

처음에는 저 방법을 따라했으나, 해당 포스트에도 말했듯이 저 방법은 새로운 `tag` 가 만들어 질 때마다 `_tags` 폴더 안에 `tag` 의 정보를 가진 파일들을 직접 만들어줘야 한다.

## Tag Cloud 만들기
{% raw %}
{% assign tags = site.tags | sort %}
{% endraw %}
## 포스트에 Tag 노출
## 댓글 (Disqus) 추가
## 구글 아날리틱스(Google Analytics) 추가
## 메뉴를 설정파일(_config.xml)로 관리하기
## 네이버 검색엔진 최적화
