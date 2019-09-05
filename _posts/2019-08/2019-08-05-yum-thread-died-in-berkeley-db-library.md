---
layout: post
title: "BDB1507 Thread died in Berkeley DB library"
date: 2019-08-15
tags: linux
---

[2019 카카오 오프라인 2차 코딩 테스트 해설](https://tech.kakao.com/2018/10/23/kakao-blind-recruitment-round-2/) 을 보고 재밌어보이는데다가, 서버프로그램을 `Github` 에 올렸다고하여 그대로 `fork` 해서 실행해보았다.

엘레베이터 서버를 실행하면, 아래와 같은 에러가 난다.

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

찾아보니 python 라이브러리가 없는듯.. 그래서 설치하려고하니..

``` shell
[root@instance-20190319-second example]# yum install python-pip
error: rpmdb: BDB0113 Thread/process 25892/140479827851072 failed: BDB1507 Thread died in Berkeley DB library
error: db5 error(-30973) from dbenv->failchk: BDB0087 DB_RUNRECOVERY: Fatal error, run database recovery
error: cannot open Packages index using db5 -  (-30973)
error: cannot open Packages database in /var/lib/rpm
CRITICAL:yum.main:

Error: rpmdb open failed
```

띠용.. 또 검색하니 아래와같이 조치를 해주면 된다고 한다.
> 뭐하는건진 잘모름..

``` shell
rm /var/lib/rpm/__db*
```

아래 `requests` 모듈을 설치해주면 해결!

``` shell
yum install python-pip
pip install requests
```
