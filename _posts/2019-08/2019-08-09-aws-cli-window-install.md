---
layout: post
title: "AWS CLI window install"
date: 2019-08-09
tags: aws
---
> `gitbook` 에서 자료를 옮기다보니 같은날 여러자료가 올라간다.
> `CLI` 는 `Command Line Interface` 이다.

# window 환경에서 python 부터 깔자

[공식 가이드](https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/cli-chap-configure.html)

그리고 pip3 을 사용하여 awscli 를 깔자.

``` shell
> pip3 install awscli --upgrade --user
```

다 깔렸으면 버전정보 확인을 하며 설치 확인을 하자.

``` shell
> aws --version
aws-cli/1.16.189 Python/3.7.2 Windows/10 botocore/1.12.179
```

버전확인이 되면 설정을 위해 AWS IAM 에서 사용자를 추가하자.  
> IAM 에서 사용자 추가 AWS Management Console 액세스 체크  
> Group 생성 AdministratorAccess 체크  
> IAM 사용자 세부정보 액세스키 만들기, csv 를 저장하던지 어디다적어두던지

``` shell
>aws configure
AWS Access Key ID [****************VAU3]: 너의엑세세키를복-붙
AWS Secret Access Key [****************TwYV]: 너의엑세스시크릿을복-붙
Default region name [ap-northeast-2]: ap-northeast-2
Default output format [json]:
> aws ec2 describe-vpcs
{
    "Vpcs": [
        {
            "CidrBlock": "123.12.0.0/16",
            "DhcpOptionsId": "abc-abc123ab",
            "State": "available",
            "VpcId": "vpc-abcd1234",
            "OwnerId": "123456789012",
            "InstanceTenancy": "default",
            "CidrBlockAssociationSet": [
                {
                    "AssociationId": "vpc-cidr-assoc-12345678",
                    "CidrBlock": "123.12.0.0/16",
                    "CidrBlockState": {
                        "State": "associated"
                    }
                }
            ],
            "IsDefault": true,
            "Tags": [
                {
                    "Key": "Name",
                    "Value": "vpc-default"
                }
            ]
        }
    ]
}
```

> 완료! 축하한다!

[참고로 이런놈도 있다. 더 좋아 보이긴한데...](https://github.com/awslabs/aws-shell)
