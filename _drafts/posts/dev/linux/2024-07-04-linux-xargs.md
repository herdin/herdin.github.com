---
layout: post
title: "linux xargs 사용법"
date: 2024-07-09
tags: linux command
---



``` shell

# 사용법
$ xargs [OPTIONS] [COMMAND [initial-arguments]]

# -t, --verbose : 실행 전 명령어 인쇄
# -p, --interactive : 실행 여부 확인.
# -n, --max-args : 인수의 갯수를 제한.
# -P, --max-procs : 최대로 사용할 process 개수. 0으로 실행시 최대로 사용.

# 아무런 옵션을 주지 않는 경우 /bin/echo 가 실행됨
$ echo "file1 file2 file3" | xargs
file1 file2 file3

# -I {replace_str} 대체 텍스트를 정의하고 이것을 여러 명령에 넘기는 방법
# 보통 % 를 사용한다고 한다.
$ echo "file1 file2 file3" | xargs -t -n 1 -I % sh -c '{ echo % > %.txt; cat %.txt; }'
$ echo "file1 file2 file3" | xargs -t -n 1 -I % sh -c '{ echo % > %.txt; cat %.txt; }'
$ echo "file1 file2 file3" | xargs -t -n 1 -I xx sh -c '{ echo xx > xx.txt; cat xx.txt; }'
$ echo "file1 file2 file3" | xargs -t -n 1 -I xx cat xx.txt
$ echo "file1 file2 file3" | xargs -t -n 1 -I xx rm xx.txt

cat output.out | awk '{print $8}' | xargs -n 1 -P 0 -I xx sh -c '{ echo "$$ : xx"; sleep 3; }'


# -

```

# 참고
* [SW/리눅스 Linux : Xargs 사용 방법, 예제, 명령어](https://jjeongil.tistory.com/1574)
