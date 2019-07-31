---
layout: post
title: "javascript 에서 local file 읽기"
date: 2019-07-31
tags: web javascript api shovel-knight enctype
---

다른 파트에서 문의가 들어왔다.

`multipart/form-data` 로 서버에 데이터를 전송할때, 간헐적으로 서버에러가 난다고 한다.  

> `form enctype`
> - `application/x-www-form-urlencoded` - default, data 는 `URL-encode` 된다.
> - `multipart/form-data` - 다른 타입의 데이터를 전송할 때 사용한다. 주로 `file`.
> - `text/plain` - encoding 하지 않고 보낸다.공백은 +로 치환하는 것 같은데 아무튼.

에러로그를 찾아보면 `Servlet` 까지는 오지않고, `org.apache.commons.fileupload.FileUploadBase` 이쯤 패키지에서 `timed out` 오류가 나거나, 예기치못한 접속종료(영어로) 이런 로그가 나는데 완벽하게 해결하지 못했다.

보안솔루션이 문제인지 `framework` 구간에서 데이터 파싱 중에 뭔가 접속을 끊어 버리는 기분이 나는데...

아무튼 해결은..
1. `form submit` 시  파일전송을 하는 `multipart/form-data` 를 따로 `ajax` 로 호출하여 파일전송 결과 유무에 따라 `submit` 처리를 한다. >> `multipart/form-data` 에러핸들링을 직접할 수 있음.
2. `javascript` 로 file read 를 하여 `base64 encoding` 을 한 뒤, `application/x-www-form-urlencoded` 으로 요청. >> 프로젝트환경이 `IE9`인데 `IE10` 부터 `FileReader API` 를 지원한다고한다.

환경적인 문제로 1.으로 진행..

참고로 `local file` 을 접근하는 `FileReader API` 의 예제를 남긴다.

```javascript
  var fileInputId = 'file-input-id';
  var fileInput = $('#' + fileInputId);
  var result;
  var reader = new FileReader(fileInput);
  reader.onload = function() {
    result = reader.result;
  }
  reader.readAsDataURL(fileInput[0].files[0]); //URL 타입으로 base64 encoded 데이터를 읽는다.
```
