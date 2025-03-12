---
layout: post
title: "linux logrotate"
date: 2024-10-07
tags: linux
---

``` shell
# 데몬
# /usr/sbin/logrotate

# 로그로테이트 설정 파일
# /etc/logrotate.conf
# 프로세스 설정 파일
# /etc/logrotate.d/
# 작업 내역 로그
# /etc/cron.dailylogrotate
# 로테이션 상태
# /var/lib/logrotate/logrotate.status

# logrotate 설치 확인
which logrotate
# config file
/etc/logrotate.conf

/etc/logrotate.d

# log파일이 이상이면 삭제
# rotate {file count}
# rotate 5

# log파일이 이상이면 삭제
# maxage {file age (day)}
# maxage 30

# 지정된 용량보다 클 경우 로테이트 실행
# size {file size}
# size +100k

# 로테이트 되는 log파일 권한 지정
# create [auth][user][group]
# create 644 root root

# 로그 내용이 없으면 로테이트 하지 않음	
# notifempty
# 로그 내용이 없어도 로테이트	
# ifempty

# 월 단위 로테이트 진행	
# monthly
# 주 단위 로테이트 진행	
# weekly
# 일 단위 로테이트 진행	
# daily

# 로테이트 되는 log파일 압축	
# compress
# 로테이트 되는 log파일 압축 하지 않음	
# nocompress

# log파일이 발견되지 않은 경우 에러처리 하지 않음	
# missingok
# 백업파일의 이름에 날짜가 들어가도록 함	
# dateext
# 복사본을 만들고 크기를 0으로	
# copytruncate
#C logrotate output을 생성하고 실행
# lastaction-endscript
# lastaction
# endscript

/home/log/*.log
{
   su root root
   daily
   missingok
   rotate 1
   create || nocreate || copytruncate
}
```