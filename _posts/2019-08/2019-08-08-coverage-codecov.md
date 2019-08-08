---
layout: post
title: "Coverage tool Codecov"
date: 2019-08-08
tags: coverage codecov
---

<img data-v-b7054844="" alt="Logo" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI1LjAxNCAwQzExLjIzLjAxLjAxIDExLjE0OSAwIDI0LjgzMnYuMDYybDQuMjU0IDIuNDgyLjA1OC0uMDM5YTEyLjIzOCAxMi4yMzggMCAwIDEgOS4wNzgtMS45MjggMTEuODQ0IDExLjg0NCAwIDAgMSA1Ljk4IDIuOTc1bC43My42OC40MTMtLjkwNGMuNC0uODc0Ljg2Mi0xLjY5NiAxLjM3NC0yLjQ0My4yMDYtLjMuNDMzLS42MDQuNjkyLS45MjlsLjQyNy0uNTM1LS41MjYtLjQ0YTE3LjQ1IDE3LjQ1IDAgMCAwLTguMS0zLjc4MSAxNy44NTMgMTcuODUzIDAgMCAwLTguMzc1LjQ5YzIuMDIzLTguODY4IDkuODItMTUuMDUgMTkuMDI3LTE1LjA1NyA1LjE5NSAwIDEwLjA3OCAyLjAwNyAxMy43NTIgNS42NTIgMi42MTkgMi41OTggNC40MjIgNS44MzUgNS4yMjQgOS4zNzJhMTcuOTA4IDE3LjkwOCAwIDAgMC01LjIwOC0uNzlsLS4zMTgtLjAwMWExOC4wOTYgMTguMDk2IDAgMCAwLTIuMDY3LjE1M2wtLjA4Ny4wMTJjLS4zMDMuMDQtLjU3LjA4MS0uODEzLjEyNi0uMTE5LjAyLS4yMzcuMDQ1LS4zNTUuMDY4LS4yOC4wNTctLjU1NC4xMTktLjgxNi4xODVsLS4yODguMDczYy0uMzM2LjA5LS42NzUuMTkxLTEuMDA2LjNsLS4wNjEuMDJjLS43NC4yNTEtMS40NzguNTU4LTIuMTkuOTE0bC0uMDU3LjAyOWMtLjMxNi4xNTgtLjYzNi4zMzMtLjk3OC41MzRsLS4wNzUuMDQ1YTE2Ljk3IDE2Ljk3IDAgMCAwLTQuNDE0IDMuNzhsLS4xNTcuMTkxYy0uMzE3LjM5NC0uNTY3LjcyNy0uNzg3IDEuMDQ4LS4xODQuMjctLjM2OS41Ni0uNi45NDJsLS4xMjYuMjE3Yy0uMTg0LjMxOC0uMzQ4LjYyMi0uNDg3LjlsLS4wMzMuMDYxYy0uMzU0LjcxMS0uNjYxIDEuNDU1LS45MTcgMi4yMTRsLS4wMzYuMTExYTE3LjEzIDE3LjEzIDAgMCAwLS44NTUgNS42NDRsLjAwMy4yMzRhMjMuNTY1IDIzLjU2NSAwIDAgMCAuMDQzLjgyMmMuMDEuMTMuMDIzLjI1OS4wMzYuMzg4LjAxNS4xNTguMDM0LjMxNi4wNTMuNDcxbC4wMTEuMDg4LjAyOC4yMTRjLjAzNy4yNjQuMDguNTI1LjEzLjc4Ny41MDMgMi42MzcgMS43NiA1LjI3NCAzLjYzNSA3LjYyNWwuMDg1LjEwNi4wODctLjEwNGMuNzQ4LS44ODQgMi42MDMtMy42ODcgMi43Ni01LjM2OWwuMDAzLS4wMzEtLjAxNS0uMDI4YTExLjczNiAxMS43MzYgMCAwIDEtMS4zMzMtNS40MDdjMC02LjI4NCA0Ljk0LTExLjUwMiAxMS4yNDMtMTEuODhsLjQxNC0uMDE1YzIuNTYxLS4wNTggNS4wNjQuNjczIDcuMjMgMi4xMzZsLjA1OC4wMzkgNC4xOTctMi40NC4wNTUtLjAzM3YtLjA2MmMuMDA2LTYuNjMyLTIuNTkyLTEyLjg2NS03LjMxNC0xNy41NTFDMzcuOTcgMi41NzYgMzEuNjk1IDAgMjUuMDE0IDAiIGZpbGw9IiNGMDFGN0EiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==" />

[Codecov 공식홈페이지](https://codecov.io/)
> Improve your code review workflow and quality. Codecov provides highly integrated tools to group, merge, archive, and compare coverage reports.  
> Free for open source. Plans starting at $2.50/month per repository.

라고 설명한다.

코드 커버리지 오픈소스 툴이고 `Github` 연동이다.  
오픈소스는 무료! 그외엔 월당 2.5$  

### 그래서 뭐에 쓰는건데?

`Codecov` 에선 `code coverage` 측정을 아래와 같이 한다고 한다.
> - **hit** indicates that the source code was executed by the test suite.
> **partial** indicates that the source code was not fully executed by the test suite; there are remaining branches that were not executed.
> **miss** indicates that the source code was not executed by the test suite.
>
> Coverage is the ratio of hits / (sum of hit + partial + miss)

테스트케이스에서 실제로 몇라인이나 사용했는지를 테스트케이스의 성공유무 상관없이 정적 분석을 하는 듯 하다. 명시적으로 불리지 않는 코드는 카운트가 안되는 것 같다.
> 자존감이 낮아 확신도 없다.


### Slack 연동 하다가 실패.. 는 성공의 어머니!!!!

[공식 문서](https://docs.codecov.io/docs/notifications)

공식문서에 나온대로 `.codecov.yml` 파일을 만들고 url 만 변경하여 커밋을 했는데 메세지가 안온다..
> 아래 텍스트는 가이드에있는 것을 그대로 복붙 한 것이다.

``` yaml
coverage:
  notify:
    slack:
      default:
        url: "https://hooks.slack.com/your/webhook/url"
        threshold: 1%
			  only_pulls: false
        branches: null
        flags: null
				paths: null
```

이것저것 검색하다보니 설정파일이 좀 수상해서  
양식을 체크하기위해 공식문서에선 `Powershell` 에서 아래의 명령어로 확인하라고 한다

```shell
# PowerShell Sample
Invoke-RestMethod -Uri https://codecov.io/validate -Body (Get-Content -Raw -LiteralPath .\.codecov.yml) -Method post
```

그럼 아래와 같은 에러가 난다.

```shell
Invoke-RestMethod : 요청이 중단되었습니다. SSL/TLS 보안 채널을 만들 수 없습니다.
위치 줄:1 문자:1
+ Invoke-RestMethod -Uri https://codecov.io/validate -Body (Get-Content ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-RestMethod], WebExc
   eption
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeRestMethodCommand
```

구글링을 해보면 `god stackoverflow` 형님들이 아래와같은 명령어를 치라고 한다.
> 이쯤되면 마리오네뜨..

```shell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
#또는
[Net.ServicePointManager]::SecurityProtocol =
  [Net.SecurityProtocolType]::Tls12 -bor `
  [Net.SecurityProtocolType]::Tls11 -bor `
  [Net.SecurityProtocolType]::Tls
#또는
[Net.ServicePointManager]::SecurityProtocol = "tls12, tls11, tls"
#나는 마지막 명령어를 사용했다.
```

> Powershell 의 TLS 버전과 서버의 TLS 버전이 다른다는데 TLS 가 뭔지는.. [따로 공부하도록 하자](https://soul0.tistory.com/510)

아무튼 위의 설정파일 양식설정을 이리저리 만지다보면 아래와 같은 설정으로 조정할 수 있다.

```yaml
coverage:
  notify:
    slack:
      default:
        url: "https://hooks.slack.com/your/webhook/url"
        threshold: 1%
        only_pulls: false
        branches: master
        flags: null
        paths: null
```

위의 설정파일은 아래와 같은 성공 메세지를 주지만..

```shell
Invoke-RestMethod -Uri https://codecov.io/validate -Body (G
et-Content -Raw -LiteralPath .\.codecov.yml) -Method post
Valid!

{
  "coverage": {
    "notify": {
      "slack": {
        "default": {
          "paths": null,
          "branches": [
            "^master$"
          ],
          "url": "https://hooks.slack.com/your/webhook/url",
          "only_pulls": false,
          "threshold": 1.0,
          "flags": null
        }
      }
    }
  }
}
```

문제는 `Codecov` 가 웹훅메세지를 안쏜다....................................................  
내심 별 문제가 아니길 빈다.  

`Codecov` 에 메일로 물어봤더니 오픈소스는 포럼에다물어보라길래  
포럼을 뒤적거렸더니 누군가 나와같은 바보짓을 하고있었고  
답변은 threshold 보다 코드커버리지가 변동이 없어서 그렇다라는것을 보고  
물론 물어본자식은 0.0으로 해도 안되고 없애도 안된다고 징징대긴 했다만..  
테스트케이스를 추가해서 코드커버리지를 늘렸더니

![yes](/assets/images/posts/2019-08-08-coverage-codecov.PNG)

> `threshold` 를 없애면 변동이 없어도 알람이 온다.

### token 이 들어가있는 webhook url 를 그냥 사용하지 말자

`Codecov` 의 repository 의 setting 의 yaml 쪽 메뉴를 보면 `Secret string` 을 생성하는 기능이 있다.  

```shell
this_is_secret!
```
위의 데이터를 해당 기능으로 암호화하면

``` shell
secret:7OiGq3efZNP1c75xP85gj7twlp8xTnbhmB0TgQ+3EGgyulX1Q5OST73yMET+jsom8j8SSUVN6bEB4c+5UtGRQQ==
```

위와 같은 텍스트를 주는데 이걸 `.codecov.yml` 파일에서 사용하면 된다.
