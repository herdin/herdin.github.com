---
layout: post
title: "AWS CLI Linux install, ec2 start and stop"
date: 2020-03-19
tags: aws
---


## 일단 AWS CLI 를 깔자.

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

## AWS Cli 를 사용하여, EC2 껐다 켜기.
#### AWS Cli, EC2 Start/Stop/Status

아무튼 인스턴스ID 를 알았으면 실행/종료/상태

``` shell
$ aws ec2 start-instances --instance-ids "인스턴스ID"
$ aws ec2 stop-instances --instance-ids "인스턴스ID"
$ aws ec2 describe-instance-status --instance-ids "인스턴스ID" --include-all-instances
```

인스턴스ID 를 외우는건 귀찮잖아? 태깅정보로 변경해보자.
EC2 의 태그가 Key=Name,Value=ec2-docker-postgresql 인 인스턴스를 시작/종료/상태
shell 하나 짜서 넣으면 된다.

``` shell
$ aws ec2 start-instances --instance-ids `aws ec2 describe-instances | jq -r '.Reservations[].Instances[] | select(.Tags[]?.Key == "Name" and .Tags[]?.Value == "ec2-docker-postgresql") | .InstanceId'`
$ aws ec2 stop-instances --instance-ids `aws ec2 describe-instances | jq -r '.Reservations[].Instances[] | select(.Tags[]?.Key == "Name" and .Tags[]?.Value == "ec2-docker-postgresql") | .InstanceId'`
$ aws ec2 describe-instance-status --instance-ids `aws ec2 describe-instances | jq -r '.Reservations[].Instances[] | select(.Tags[]?.Key == "Name" and .Tags[]?.Value == "ec2-docker-postgresql") | .InstanceId'`
```


그런데.. 껏다 켯다하다보면 IP 가 계속 바뀌잖아?  
난 도메인에다 연결해서 쓰고싶은데... 탄력적 IP 를 EC2 에 연결을 안하면 또 돈이 나가고..  
그래서..


### AWS Cli 를 사용하여, 탄력적IP 할당/태깅/연결/연결해제/릴리스
#### AWS Cli, Elastic IP address Allocating/Tagging/Associating/Disassociating/Releasing

- [allocate-address](https://docs.aws.amazon.com/cli/latest/reference/ec2/allocate-address.html)
- [associate-address](https://docs.aws.amazon.com/cli/latest/reference/ec2/associate-address.html)
- [disassociate-address](https://docs.aws.amazon.com/cli/latest/reference/ec2/disassociate-address.html)
- [release-address](https://docs.aws.amazon.com/cli/latest/reference/ec2/release-address.html)


먼저 할당하자. 포메팅을 위해 `jq` 를 그냥 썻다.

``` shell
$ aws ec2 allocate-address | jq '.'
{
  "PublicIp": "3.34.62.143",
  "AllocationId": "eipalloc-0d081f7208413d1e7",
  "PublicIpv4Pool": "amazon",
  "NetworkBorderGroup": "ap-northeast-2",
  "Domain": "vpc"
}
```

할당된 내역 확인.
```shell
$ aws ec2 describe-addresses | jq '.'
```

할당된 탄력적IP 에 태깅을 하자.
``` shell
$ aws ec2 create-tags --resources eipalloc-0d081f7208413d1e7 --tags Key=Name,Value=tempEIP
```

할당된 탄력적IP 를 EC2에 연결하자.
``` shell
$ aws ec2 associate-address --instance-id i-0e1d2727510a8c991 --allocation-id eipalloc-0d081f7208413d1e7
```

다 썻으면 탄력적IP 를 EC2 에서 연결해제하자.
> allocation-id 와 association-id 는 다르다!

``` shell
$ aws ec2 disassociate-address --association-id eipassoc-0225fb61c5657d975
```

연결해제 까지 했으면, 삭제(릴리즈)하자.
``` shell
$ aws ec2 release-address --allocation-id eipalloc-0d081f7208413d1e7
```

마찬가지로 `instance-id`, `allocation-id`, `association-id` 이런거 외우기 싫으니까 `jq` 를 사용하여 다 해결 볼 수 있다.

``` shell
# 탄력적IP 할당 및 태깅 Key=Name,Value=tempEIP
aws ec2 create-tags --resources `aws ec2 allocate-address | jq -r '.AllocationId'` --tags Key=Name,Value=tempEIP

# 태그가 Key=Name,Value=tempEIP 인 탄력적IP 를  태그가 Key=Name,Value=ec2-docker-postgresql 인 EC2 에 연결
$ aws ec2 associate-address --instance-id `aws ec2 describe-instances | jq -r '.Reservations[].Instances[] | select(.Tags[]?.Key == "Name" and .Tags[]?.Value == "ec2-docker-postgresql") | .InstanceId'` --allocation-id `aws ec2 describe-addresses | jq -r '.Addresses[] | select(.Tags[]?.Key == "Name" and .Tags[]?.Value == "tempEIP") | .AllocationId'`

# 태그가 Key=Name,Value=tempEIP 인 탄력적IP 를 연결 해제
$ aws ec2 disassociate-address --association-id `aws ec2 describe-addresses | jq -r '.Addresses[] | select(.Tags[]?.Key == "Name" and .Tags[]?.Value == "tempEIP") | .AssociationId'`

# 태그가 Key=Name,Value=tempEIP 인 탄력적IP 를 삭제(릴리즈)
$ aws ec2 release-address --allocation-id `aws ec2 describe-addresses | jq -r '.Addresses[] | select(.Tags[]?.Key == "Name" and .Tags[]?.Value == "tempEIP") | .AllocationId'`
```

### 어?

탄력적IP 를 할당하고 해제하면 어차피 IP 가 바뀌잖아..??

> ^^ 학습했다고 생각하자. 정신승리.









출처
- [Linux에 AWS CLI 버전 2 설치](https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/install-cliv2-linux.html)
- [AWS CLI DOC](https://docs.aws.amazon.com/ko_kr/cli/latest/reference/)
- [Elastic IP addresses](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-associating)
