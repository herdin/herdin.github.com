---
layout: post
title: "AWS CLI Linux install, ec2 start and stop"
date: 2020-03-19
tags: aws
---

### AWS CLI 를 사용해서 EC2 껐다 켜기.

[AWS CLI window install](https://herdin.github.io/2019/08/09/aws-cli-window-install) 에서 윈도우에서 `pip3` 을 이용해서 설치했었다.

프리티어가 끝났는데, 새로 계정파긴 귀찮고, 돈많이 나오는건 싫고, web console 에 들어가서 켯다 껏다가 귀찮아서 결국

cli 를 쓰려고한다....

버전2가 나와서 이제 `pip3` 로 안깔아도 된다고 한다

> 야호

``` shell
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

잘 깔렸나 확인해보자

``` shell
$ aws --version
aws-cli/2.0.4 Python/3.7.3 Linux/4.18.0-80.7.1.el8_0.x86_64 botocore/2.0.0dev8
```

> 만세!

`json` 타입의 출력을 파싱하기 위해 `jq` 를 사용한다. 일단 파싱되는지 확인

``` shell
$ aws ec2 describe-instances | jq '.'
{
  "Reservations": [
    {
      "Groups": [],
      "Instances": [
        {
          "AmiLaunchIndex": 0,
          "ImageId": "ami-0db78afd3d150fc18",
          "InstanceId": "i-0e1d2727510a8c991",
          "InstanceType": "t2.small",
          "KeyName": "herdin-aws-key",
          "LaunchTime": "2020-03-18T03:11:50+00:00",
          "Monitoring": {
            "State": "disabled"
          },
          ...
        }
      ]
    }
  ]
}

#모든 인스턴스들의 인스턴스ID 가져오기
$ aws ec2 describe-instances | jq '.Reservations[0].Instances[].InstanceId'

#특정 태그로 해당 인스턴스ID 만 가져오기
$ aws ec2 describe-instances | jq 'if if .Reservations[0].Instances[].Tags[].Key == "Name" then .Reservations[0].Instances[].Tags[].Value else "notok" end == "ec2-docker-postgresql-new" then .Reservations[0].Instances[].InstanceId else "notok2" end'
```

아무튼 인스턴스ID 를 알았으면 실행하자

``` shell
$ aws ec2 start-instances --instance-ids "인스턴스ID"
```

명령어들은 [AWS CLI DOC](https://docs.aws.amazon.com/ko_kr/cli/latest/reference/) 여기에서 확인하자.


출처
- [Linux에 AWS CLI 버전 2 설치](https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/install-cliv2-linux.html)
- [AWS CLI DOC](https://docs.aws.amazon.com/ko_kr/cli/latest/reference/)
