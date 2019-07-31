---
layout: post
title: "javascript 에서 local file 읽기"
date: YYYY-MM-DD
tags: javascript api
---

다른 파트에서 문의가 들어왔다.  
`multipart/form-data` 로 서버에 데이터를 전송할때, 간헐적으로 서버에러가 난다고 한다.

에러로그를 찾아보면 `Servlet` 까지는 오지않고 `org.apache.commons.fileupload.FileUploadBase` 이쯤 패키지에서 `timed out` 오류가 나거나, 예기치못한 접속종료(영어로) 이런 로그가 나....
