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
참고한 글목록 - 참고한 것
- [모르는외국인1](https://superdevresources.com/tag-cloud-jekyll/) - `tag` 별 `font size` 조정
- [기계인간](https://johngrib.github.io/tag/) - `tag` 클릭시 관련 포스트 표출
- [최혜선](https://hyesun03.github.io/2016/12/05/jekyllTag/) - `tag` 목록 관리 및 `_config.xml` 로 메뉴관리
- [모르는외국인2](http://longqian.me/2017/02/09/github-jekyll-tag/) - `liquid` 전반적인 것
- [Liquid from Shopify](https://shopify.github.io/liquid/) - `Liquid` 문법?

`repository` 최상위 폴더에 `tags.html` 파일을 만든다.
[최혜선](https://hyesun03.github.io/2016/12/05/jekyllTag/) 님은 `tags/index.html` 로 만드셨다. 이거나 저거나 `https://myGithubID.github.io/tags` 로 연결이 된다.

{% highlight html %}
  {% raw %}
  ---
  layout: default
  permalink: /tags/
  ---
  <!-- tag click 을 위한 jquery, cdn 말고 다운 받아서 사용헀음 -->
  <script src="/assets/js/jquery-3.4.1.min.js"></script>

  <!-- site.tags 가 site 의 모든 tag 별 포스트 들을 갖고 있다 -->
  {% assign tags = site.tags | sort %}
  <div class="site-tags">
    {% for tag in tags %}
    <!-- tag[0] 에는 tag 명칭, tag[1] 에는 해당 포스트들이 들어 있다. -->
    <li id="{{ tag[0] }}" class="site-tag">
      <!-- tag 배열의 마지막은 아마 tag[1] 포스트들인데 해당 사이즈*4+80 한 수치를 font-size 로 사용하여 tag 별 경중을 표현한다. -->
      <a href="#" style="font-size: {{ tag | last | size  |  times: 4 | plus: 80  }}%">
        <!-- tag name -->
        <span>{{ tag[0] }}</span>
        <!-- tag count -->
        <span class="count">{{ tag | last | size }}</span>
      </a>
    </li>
    {% endfor %}
  </div>

  <!-- 기본적으로 숨겨져있을 tag 별 포스트들 -->
  <div class="site-tagged-posts">
    {% for post in site.posts %}
      <!-- 포스트의 tag 배열 인자 사이에 " " 를 추가하여 class 로 넣어준다. -->
      <li style="display:none;" class="{{ post.tags | join  " " }}">
        <span>
          {{ post.date | date: "%Y-%m-%d" }}
        </span>
        »
        <a href="{{ post.url }}" title="{{ post.title }}">
          {{ post.title }}
        </a>
      </li>
    {% endfor %}
  </div>

  <script>
    $(document).ready(function(){
      $('.site-tag').click(function(){
        $('.site-tagged-posts > li').hide();
        var delay = 100;
        var tag = $(this).attr('id');
        var visibility = $($('.' + tag).get(0)).is(':visible');
        if(visibility) {
          $('.' + tag).fadeOut(delay);
        } else {
          $('.' + tag).fadeIn(delay);
        }
      });
    });
  </script>
  {% endraw %}
{% endhighlight %}

`_sass\_tags.scss` 파일을 만들었다.

특별한건 없고 여기저기에서 `F12` 개발자도구로 까서 보고 훔쳐왔다.

{% highlight scss %}
.site-tags {
  li {
    display: inline;
    margin: 0px;
    font-weight: 300;
    a {
      display: inline-block;
      margin: 1px;
      color: #343a40;
      background-color: #e9ecef;
      border-radius: 3px 0px 0px 3px;
      span {
        float: left;
        padding: .5px 5px;
      }
      span.count {
        background-color: #dee2e6;
        border-radius: 0px 3px 3px 0px;
      }
    }
  }
}

{% endhighlight %}

## 포스트에 Tag 노출

포스트에 사용할 `layout` 파일에 원하는 위치에 `Tag cloud` 만든 방식으로 `tag` 들을 넣어주면 된다.

## 댓글 (Disqus) 추가

[Disqus](https://disqus.com/) 에 가서 `Site` 하나 만들고 `isntallation` 에서  `Universal Code` 에서 준걸 `layout` 파일에 복붙해주면 되는데, 본인 스타일에 따라서 포스트 별 댓글을 넣고 싶으면 주석에서 시키는대로 하면되고, 홈페이지 도메인을 넣어 버리면 댓글이 어느 포스트에 가도 공유되게 할 수도 있다.
{% highlight html %}
{% raw %}
<div class="comments">
	<div id="disqus_thread"></div>
	<script type="text/javascript">
		var disqus_config = function () {
			this.page.url = '{{ site.url }}' + '{{ page.url }}';  // Replace PAGE_URL with your page's canonical URL variable
			this.page.identifier = '{{ page.title }}'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
		};
    var disqus_shortname = '{{ site.disqus | replace: "'", "\'"}}';

    (function() {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();

	</script>
	<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
</div>
{% endraw %}
{% endhighlight %}

## 구글 아날리틱스(Google Analytics) 추가

위와 비슷함. 아날리틱스 계정 만들고 나오는 `tracking id` 를 아래 `UA-XXXXX-Y` 에다가 대신 넣어주고 `layout` 파일 같은데다가 복붙하면 끝.
{% highlight javascript %}
<!-- Google Analytics -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<!-- End Google Analytics -->
{% endhighlight %}

## 메뉴를 설정파일 `_config.xml` 로 관리하기

[최혜선](https://hyesun03.github.io/2016/12/05/jekyllTag/) 님 `Github` 구경하다가 `_config.xml` 에 메뉴 관리를 우아하게 하시는 것 같아서 훔쳐왔다.
{% highlight yaml %}
...
navigation:
  - name: Log
    url: /
  - name: About
    url: /about
  - name: Tags
    url: /tags
...
{% endhighlight %}

{% highlight liquid %}
{% raw %}
{% for nav in site.navigation %}
  <a href="{{ site.baseurl }}{{ nav.url}}">{{ nav.name }}</a>
{% endfor %}
{% endraw %}
{% endhighlight %}

## 네이버 검색엔진 최적화

[네이버 웹마스터도구](https://webmastertool.naver.com/) 에 로그인해서 도메인 등록하고 다운로드한 파일을 루트에 넣어준다. 끝.

> 이렇게 하니까 마음에 쏙 들진 않지만 좀 쓸만해 진 것 같다.

## 구글 검색엔진 최적화

구글은 검색을 위한 크롤링을 `sitemap.xml` 을 통해서 한다고 한다.
아마 루트에 두면 알아서 크롤링해가는 것 같은데, `sitemap.xml` 의 [형식](https://www.sitemaps.org/protocol.html) 은 이렇다.

참고하여 `sitemap.xml` 을 만들어 보았다.

{% highlight liquid %}
{% raw %}

---
layout: null
---
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	{% for post in site.posts %}
		<url>
       <loc>{{ site.url }}{{ post.url }}</loc>
       <lastmod>{{ post.date | date: "%Y-%m-%d" }}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
    </url>
	{% endfor %}
</urlset>


{% endraw %}
{% endhighlight %}

이렇게하고 네이버처럼 [구글 서치콘솔](https://search.google.com/search-console/about?hl=ko) 에 가서 잘 등록되었는지 확인하고 잘안되었으면 `sitemap.xml` 위치를 제출하면된다.

> 되는..건가..?

[Github Page 의 Github 주소](https://github.com/herdin/herdin.github.com)
