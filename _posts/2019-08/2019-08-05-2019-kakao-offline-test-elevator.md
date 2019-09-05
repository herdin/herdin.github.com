---
layout: post
title: "2019 카카오 오프라인 2차 테스트 개인 공부"
date: 2019-08-15
tags: algorithm
---

> 카카오에서 `Github` 에도 올리고 포스트도 올렸으니 막 갖다 써도되것지.......

[엘레베이터 서버](https://github.com/kakao-recruit/2019-blind-2nd-elevator)를 실행했더니, 아래와 같은 에러가 난다.

``` shell
[root@instance-20190319-second example]# python example.py
Token for tester is wYlzh
Traceback (most recent call last):
  File "example.py", line 114, in <module>
    p0_simulator()
  File "example.py", line 38, in p0_simulator
    action(token, [{'elevator_id': 0, 'command': 'UP'}, {'elevator_id': 1, 'command': 'ENTER', 'call_ids': [2, 3]}])
  File "example.py", line 19, in action
    return requests.post(uri, headers={'X-Auth-Token': token}, json={'commands': cmds}).json()
  File "/usr/lib/python2.7/site-packages/requests/models.py", line 802, in json
    return json.loads(self.text, **kwargs)
  File "/usr/lib64/python2.7/json/__init__.py", line 338, in loads
    return _default_decoder.decode(s)
  File "/usr/lib64/python2.7/json/decoder.py", line 366, in decode
    obj, end = self.raw_decode(s, idx=_w(s, 0).end())
  File "/usr/lib64/python2.7/json/decoder.py", line 384, in raw_decode
    raise ValueError("No JSON object could be decoded")
ValueError: No JSON object could be decoded
```

구글링하니까 `requests` 모듈이 없나보다..  
그래서 없는 애를 설치하려고 보니 `python-pip` 도 없어서 설치하려 했더니...

``` shell
[root@instance-20190319-second example]# yum install python-pip
error: rpmdb: BDB0113 Thread/process 25892/140479827851072 failed: BDB1507 Thread died in Berkeley DB library
error: db5 error(-30973) from dbenv->failchk: BDB0087 DB_RUNRECOVERY: Fatal error, run database recovery
error: cannot open Packages index using db5 -  (-30973)
error: cannot open Packages database in /var/lib/rpm
CRITICAL:yum.main:

Error: rpmdb open failed
```

yum install 이 안될땐 [이렇게]({{ site.url}}/yum-thread-died-in-berkeley-db-library/) 하면 된다.

암튼 다 깔고 실행하면 되긴하는데... 이러면 `python` 도 깔아야하고..  
테스트 환경은 공짜 `GCP` 라 자원이 열악한데 이렇게 다 깔면 왠지 싫어서.. `Docker` 로 실행하려했다.

`Docker` 파일이 있길래 빌드를 했더니 또 안돼...
> 글을 쓰기 시작한날이 2019/08/05 이고 지금은 2019/09/05 라.. 기록도 안남아있고 간략하게 남기겠다.

`dataset` 폴더와 `log` 폴더가 `Docker file context` 위치에 없어서 오류가 나서
`Dockerfile` 위치를 옮기고, `dataset` 폴더를 복사하고, `log` 폴더를 만들어준 [Branch](https://github.com/herdin/2019-blind-2nd-elevator/tree/develop) 를 `Pull request` 를 날렸는데, 관심이 없는건지 내가 잘못 고친건지 피드백이 없다..
> 헤헤. 뭐 내가 잘 썻으면 됐지.

아무튼

`docker run -d -p 8000:8000 --name kakaoelevator epubaal/kakao-2019-offline-test-elevator`

> 도커이미지도 떠서 허브에 올렸다!!

![yes](/assets/images/posts/kakao-offline-test-elevator-01.PNG)

짜잔.
