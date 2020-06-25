---
layout: post
title: "Instagram API 이관, Open API(Instagram) 캐싱처리"
date: 2020-06-25
tags: web java
---

## 2020년 06월 29일 부터 기존 Instagram API 사용 금지!!

Instagram API 가 Facebook 쪽으로 넘어가면서 아주 살짝 사용법이 달라졌다.

[Instagram Developer Documentation](https://www.instagram.com/developer/) 여기서 client ID/Secret, callback URL 를 관리했었다면,  
이제는 [Facebook 개발자 문서 | Facebook API, SDK 및 가이드](https://developers.facebook.com/docs?locale=ko_KR) 여기에 가서 Facebook App 을 만들고 그 안에서 Instagram 제품을 추가하여 관리해야된다.  
뭐 아무튼.

OAuth flow 는 똑같다. 별거 없음. 심지어 Endpoint 가 똑같다.  
바뀐게 있다면, 처음 받는 Access Token 은 Short Lived Token 이라 1시간 밖에 유효하지 않아서, 아래와 같은 방법으로 Long Lived Token (60일따리) 로 교환해야 된다는 것 정도?  
교환 하고 나서 [사용자 미디어 에지 쿼리](https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-profiles-and-media) 로 질의를 하면 된다.

```
curl -k https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=<YOUR-APP-SECRET>&access_token=<SHORT-LIVED-TOKEN>
```

## 그래, 별거 업네. 근데 쿼리 제한이 시간당 `240`???

원래는 `5,000` 이었던가 그런데..  
보안 문제가 터지고나서 Facebook 에서 민감하게 반응하는 것 같다.  
아무튼 우린 써야하잖아? 캐싱처리를 하자.  
직접 구현해도 되지만, 잘 구현된걸 사용해도 좋다.

> 참고로, 클라이언트에 개인이 접속하고, Instagram 으로 계정을 연동하는 서비스에는 아래 캐싱이 의미가 없을 수 있다. 기업 홈페이지처럼 미리 발급받은 토큰으로 불특정 다수에게 기업의 Instagram 미디어를 보여주어야할 경우에는 캐싱이 의미가 있을 것이다.

`Google Guava` 를 사용했다.

``` xml
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>28.0-jre</version>
</dependency>
```

이미 Access Token 를 발급 받은 상태에서 Media Query 결과만 캐싱하는 소스다.

#### 일단 Acess Token 발급 받았다 치고,

Access Token 을 발급 받을 때, `json` 을 Deserialize 하기 위한 AccessToken
``` java
public static class AccessToken {
    String access_token;
    String user_id;
    //setter, getter 생략
}
```

발급 후에는 미리 넣어 두도록 하자.  
`Optional` 객체로 AccessToken Class 를 받았기 때문에, 쓸데 없이 `.get` 이 한번 더 들어가 있다.
``` java
snsCacheService
  .setAccessToken(
    SnsCacheService.SNS_TYPE.INSTAGRAM,
    accessToken.get().getAccess_token()
  );
```

화면에서는 그냥 `GET` 호출만 하면된다.  
이렇게 호출하면,

``` javascript
axios({
  method: 'get',
  url: '/test/instagram/media',
  data: {},
}).then(function(response){
  ...
})...
;
```

이렇게 받자.
``` java
@GetMapping("/instagram/media")
@ResponseBody
public SnsCacheService.Instagram.Media instagramMedia() {
    return snsCacheService.getData(
      SnsCacheService.SNS_TYPE.INSTAGRAM,
      SnsCacheService.Instagram.Media.class
    );
}
```

#### 실제 Cache Service
`HttpUtils` 은 그냥 각자 만들자. 중요한건 그냥 url 로 요청하는 거다.

``` java
package com.harm.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.harm.util.HttpUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
public class SnsCacheService {
    Logger logger = LoggerFactory.getLogger(SnsCacheService.class);
    public enum SNS_TYPE {
        INSTAGRAM
    }
    private Map<SNS_TYPE, SnsModel> snsModelMap = null;
    private LoadingCache<SNS_TYPE, Object> snsDataCacheRepository;

    public SnsCacheService() {
        snsModelMap = new HashMap<>();
        snsModelMap.put(SNS_TYPE.INSTAGRAM, new Instagram.Model(4L)); //fetch 사이즈는 그냥 넣어봤다.
        snsDataCacheRepository = CacheBuilder.newBuilder()
                .maximumSize(SNS_TYPE.values().length) //SNS TYPE 별 캐싱 사이즈 설정
                .expireAfterWrite(1L, TimeUnit.MINUTES) //1분 캐싱
                .build(new CacheLoader<SNS_TYPE, Object>() {
                    @Override
                    public Object load(SNS_TYPE snsType) throws Exception {
                        logger.debug("{} load data", snsType);
                        SnsModel snsModel = snsModelMap.get(snsType);
                        String data = HttpUtils.sendAndRecv(
                                snsModel.getResourceUrl(),
                                snsModel.getResourceMethod(),
                                snsModel.getResourceParam()
                        );
                        logger.debug("loaded data -> {}", data);
                        return snsModel.parseResource(data);
                    }
                });
    }

    //Access Token 발급 후 저장하는 함수
    public void setAccessToken(SNS_TYPE snsType, String accessToken) {
        snsModelMap.get(snsType).setAccessToken(accessToken);
    }

    //Cache Repository 에서 Caching 된 SNS Data 를 가져오는 함수
    public <T> T getData(SNS_TYPE snsType, Class<T> clazz) {
        T data = null;
        try {
            data =  (T)snsDataCacheRepository.get(snsType);
        } catch (ExecutionException e) {
            logger.error(e.getMessage());
        }
        return data;
    }

    //SNS interface
    public static interface SnsModel<T> {
        String getResourceUrl();
        HttpMethod getResourceMethod();
        String getResourceParam();
        void setAccessToken(String accessToken);
        <T> T parseResource(String data);
    }

    //Instagram 만 했지만, 같은 구조로 Facebook, Goole, Naver 에 맞는 class 를 만들면된다.
    //구조화 하려고 static class depth 가 길어진 건 좀 맘에 안든다.
    public static class Instagram {

        public static class Model implements SnsModel<Media> {
            final long fetchLimit;
            long fetchCount = 0;
            String accessToken;
            public Model(long fetchLimit) {
                this.fetchLimit = fetchLimit;
            }
            @Override
            public void setAccessToken(String accessToken) {
                this.accessToken = accessToken;
            }
            @Override
            public String getResourceUrl() {
                return "https://graph.instagram.com/me/media";
            }
            @Override
            public HttpMethod getResourceMethod() {
                return HttpMethod.GET;
            }
            @Override
            public String getResourceParam() {
                StringBuffer sb = new StringBuffer();
                sb
                .append("fields=id,caption,media_url,permalink")
                .append("&access_token=" + accessToken)
                ;
                return sb.toString();
            }

            @Override
            public Media parseResource(String data) {
                Media media = null;
                ObjectMapper objectMapper = new ObjectMapper();
                try {
                    media = objectMapper.readValue(data, Media.class);
                    fetchCount++;
                    if(media != null && media.getPaging().getNext() != null && media.getPaging().getNext().length() > 0 && fetchCount < fetchLimit) {
                        Media innerMedia = parseResource(HttpUtils.sendAndRecv(media.getPaging().getNext(), HttpMethod.GET, null));
                        Media.Data[] prevDatas = media.getData();
                        Media.Data[] nextDatas = innerMedia.getData();
                        Media.Data[] mergeDatas = new Media.Data[prevDatas.length + nextDatas.length];
                        System.arraycopy(prevDatas, 0, mergeDatas, 0, prevDatas.length);
                        System.arraycopy(nextDatas, 0, mergeDatas, prevDatas.length, nextDatas.length);
                        media.setData(mergeDatas);
                    } else {
                        fetchCount = 0;
                    }
                } catch (IOException e) {
                    LoggerFactory.getLogger(Instagram.Media.class).debug("parse error -> {}", e.getMessage());
                }
                return media;
            }
        }
        public static class Media {
            Data[] data;
            Paging paging;
            public Data[] getData() { return data; }
            public void setData(Data[] data) { this.data = data; }
            public Paging getPaging() { return paging; }
            public void setPaging(Paging paging) { this.paging = paging; }

            public static class Data {
                String id;
                String caption;
                String media_url;
                String permalink;
                public String getId() { return id; }
                public void setId(String id) { this.id = id; }
                public String getCaption() { return caption; }
                public void setCaption(String caption) { this.caption = caption; }
                public String getMedia_url() { return media_url; }
                public void setMedia_url(String media_url) { this.media_url = media_url; }
                public String getPermalink() { return permalink; }
                public void setPermalink(String permalink) { this.permalink = permalink; }
            }//Data

            public static class Paging {
                Cursors cursors;
                String next;
                String previous;
                public Cursors getCursors() { return cursors; }
                public void setCursors(Cursors cursors) { this.cursors = cursors; }
                public String getNext() { return next; }
                public void setNext(String next) { this.next = next; }
                public String getPrevious() { return previous; }
                public void setPrevious(String previous) { this.previous = previous; }
                public static class Cursors {
                    String before;
                    String after;
                    public String getBefore() { return before; }
                    public void setBefore(String before) { this.before = before; }
                    public String getAfter() { return after; }
                    public void setAfter(String after) { this.after = after; }
                }//Cursors
            }//Paging

        }//Media
    }//Instagram
}
```

누가 볼진 모르겠으나, 코드를 보면 fetch Limit 만큼만 쿼리하여 캐싱한다.  
Fetch Limit 없이 모든 데이터를 캐싱하면 너무 많을 수도 있으므로, 제한했다.  
Fetch Limit 이전의 Media 는 가져올 수 없는 구조다.
