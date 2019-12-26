---
layout: post
title: "HTTPS, TLS, SSL ..."
date: 2019-08-19
tags: web https
---

### HTTPS 와 SSL, TLS 그게 다 뭐지?
> 나는 그냥 HTTPS 만 알고싶은데 왜 하나만 알 면 안되는거야 행복할수가업서...ㅠㅠ

`HTTP` 는 `HyperText Transfer Protocol` 이다.  웹상에서 정보를 주고 받기 위한 프로토콜이다.

`HTTPS` 는 `HyperText Transfer Protocol over Secure Socket Layer` 이다. 즉, `SSL` 위에서 동작하는 `HTTP` 인것이다.  

그럼 `SSL` 은 뭐냐. `SSL` 은 `Secure Socket Layer` 이다.  

그럼 `TLS` 는 또 뭐냐. `TLS` 는 `Transport Layer Security` 이다.
> 넷스케이프 커뮤니케이션스사가 개발한 SSL(Secure Sockets Layer)에 기반한 기술로, 국제 인터넷 표준화 기구에서 표준으로 인정받은 프로토콜이다. 표준에 명시된 정식 명칭은 TLS지만 아직도 SSL이라는 용어가 많이 사용되고 있다. [출처](https://namu.wiki/w/TLS)

`SSL` 기반으로 `TLS` 가 표준으로 명시되었지만(정확히는 `SSL 3.0` 기반으로 `TLS 1.0` 을 만듬), 그냥 `SSL` 이란 용어를 혼용해서 사용하고 있는 것 같다.

### `TLS` 의 순서
1. 먼저 클라이언트에서 서버에 ClientHello 메시지를 보낸다. 여기에는 클라이언트에서 가능한 TLS 버전, 서버 도메인, 세션 식별자, 암호 설정 등의 정보가 포함된다.
2. 클라이언트의 메시지를 받은 서버는 ServerHello 메시지를 클라이언트에게 보낸다. 여기에는 ClientHello 메시지의 정보 중 서버에서 사용하기로 선택한 TLS 버전, 세션 식별자, 암호 설정 등의 정보가 포함된다.
3. 서버가 클라이언트에 Certificate 메시지를 보낸다. 여기에는 서버의 인증서가 들어간다. 이 인증서는 별도의 인증 기관에서 발급받은 것이며, 서버가 신뢰할 수 있는 자임을 인증한다. 전송이 끝나면 ServerHelloDone 메시지를 보내 끝났음을 알린다.
4. 클라이언트는 서버에서 받은 인증서를 검증한다. 인증서의 유효 기간이 만료되지 않았는지, 그 인증서가 해당 서버에게 발급된 인증서가 맞는지 등을 확인한다. 인증서를 신뢰할 수 있다고 판단하였다면 다음 단계로 넘어간다.
5. 클라이언트는 임의의 pre-master secret을 생성한 뒤, 서버가 보낸 인증서에 포함된 공개 키를 사용해 암호화한다. 이렇게 암호화된 pre-master secret을 ClientKeyExchange 메시지에 포함시켜 서버에 전송한다.
6. 서버는 전송받은 정보를 복호화하여 pre-master secret을 알아낸 뒤, 이 정보를 사용해 master secret을 생성한다. 그 뒤 master secret에서 세션 키를 생성해내며, 이 세션 키는 앞으로 서버와 클라이언트 간의 통신을 암호화하는데 사용할 것이다. 물론 클라이언트 역시 자신이 만들어낸 pre-master secret을 알고 있으므로, 같은 과정을 거쳐 세션 키를 스스로 만들 수 있다.
7. 이제 서버와 클라이언트는 각자 동일한 세션 키를 가지고 있으며, 이를 사용해 대칭 키 암호를 사용하는 통신을 할 수 있다. 따라서 우선 서로에게 ChangeCipherSpec 메시지를 보내 앞으로의 모든 통신 내용은 세션 키를 사용해 암호화해 보낼 것을 알려준 뒤, Finished 메시지를 보내 각자의 핸드셰이킹 과정이 끝났음을 알린다.
8. 이제 서버와 클라이언트 간에 보안 통신이 구성된다. [출처](https://namu.wiki/w/TLS)

> 음 좀 더 자세히 알고 싶지만 가성비가 격하게 떨어질 것 같은 느낌..

### `TLS` 관련 확장자들
`.pem` :
  - `X.509` v3 파일의 한 형태
  - `Privacy Enhanced Mail` 은 Base64인코딩된 ASCII text file.
  - 원래는 secure email에 사용되는 인코딩 포멧이었는데 더이상 email쪽에서는 잘 쓰이지 않고 인증서 또는 키값을 저장하는데 많이 사용.
  - `-----BEGIN XXX-----` , `-----END XXX-----` 로 묶여있는 text file을 보면 이 형식으로 인코딩. (담고있는 내용에 따라 XXX 위치에 CERTIFICATE, RSA PRIVATE KEY 등을 사용)
  - 인증서(Certificate = public key), 비밀키(private key), 인증서 발급 요청을 위해 생성하는 CSR (certificate signing request) 등을 저장하는데 사용.

`.crt`/`.cer` :
  - 인증서를 나타내는 확장자. (cer은 MS 제품군에서 많이 사용, crt는 unix, linux 계열에서 많이 사용.)

`.key` :
  - 개인 또는 공개 PKCS#8 키를 의미

[출처](https://www.letmecompile.com/certificate-file-format-extensions-comparison/)

### 인증서가 한개가 아니야?

`DV(Domain Validation)` 인증서는 인증서를 발급한 요청자가 그 도메인의 소유주가 맞는지만을 확인하여 발급을 하기 때문에, 비용만 내면 아무나 인증서를 발급 받을 수 있다. 이런 문제를 해결하기 위해 `EV-SSL` 이 나왔다.

`EV-SSL` 은 공신력 있는 인증 기관에서 더욱 엄격한 심사 기준으로 발급한 `EV(Extended Validation)` 인증서를 사용하여 보안을 강화한 프로토콜이다. 상위
> EV 인증서를 발급 받기 위해서는 까다로운 인증절차 및 신원보증 등이 확인되어야만 구축이 가능하기 때문에 피싱(Phishing)과 파밍(Pharming) 등의 공격으로부터 엔드 유저와 일반 사용자를 보호할 수 있습니다.

> 어찌 선점 고인물 같은데
