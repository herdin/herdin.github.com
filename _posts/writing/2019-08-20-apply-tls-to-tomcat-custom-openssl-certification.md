---
layout: post
title: "TOMCAT 에 SSL 적용"
date: 2019-08-19
tags: web
---

> apache-tomcat-9.0.14 에 적용했다.

### 1. OpenSSL 프로그램을 다운받자

[OpenSSL](https://sourceforge.net/projects/openssl/) 그냥 다운 받아서 압축 풀면 됨..

### 2. 개인키를 만들자

다운받은 `OpenSSL` 을 실행시켜서 아래 명령어를 입력해 준다.

``` shell
# 이렇게 하면 password 가 있는 개인키가 나온다.
genrsa -des3 -out <MY PRIVATE KEY FILE NAME> 2048

# EXAMPLE
OpenSSL> genrsa -des3 -out delete.me.plz.private.key 2048
Generating RSA private key, 2048 bit long modulus
............................+++
.........................................+++
unable to write 'random state'
e is 65537 (0x10001)
Enter pass phrase for delete.me.plz.private.key: <TYPE MY PASSWORD>
Verifying - Enter pass phrase for delete.me.plz.private.key: <TYPE MY PASSWORD>

# 비밀번호가 없는 개인키 만들기
genrsa -out <MY PRIVATE KEY FILE NAME> 2048
```

### 3. 개인키를 만들었으면 대응되는 공개키를 만들자.

``` shell
rsa -in <MY PRIVATE KEY FILE NAME> -pubout -out <MY PUBLIC KEY FILE NAME>

# EXAMPLE
OpenSSL> rsa -in delete.me.plz.private.key -pubout -out delete.me.plz.public.key
Enter pass phrase for delete.me.plz.private.key: <TYPE MY PASSWORD>
writing RSA key
```

### 4. `CSR` 인증요청서를 만들자.

`CSR` 은 `Certificate Signing Request` 로 `SSL` 서버를 운영하는 회사의 정보를 암호화하여 인증기관으로 보내 인증서를 발급받게 하는 신청서이다.

``` shell
req -new -key <MY PRIVATE KEY FILE NAME> -out <MY CSR FILE NAME>

# EXAMPLE
OpenSSL> req -new -key delete.me.plz.private.key -out delete.me.plz.csr
Unable to load config info from C:/OpenSSL/openssl.cnf
error in req
```

근데 저렇게 나와서 찾다보니 옵션을 주면 된단다.
참고로 처음 기동할때도 이런 메세지를 보여줬는데..

```
WARNING: can't open config file: C:/OpenSSL/openssl.cnf
```

아무튼...

``` shell
req -config <LOCATION OF openssl.cnf FILE> -new -key <MY PRIVATE KEY FILE NAME> -out <MY CSR FILE NAME>

# EXAMPLE
OpenSSL> req -config ./openssl.cnf -new -key delete.me.plz.private.key -out delete.me.plz.csr
Enter pass phrase for delete.me.plz.private.key:
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:KR
State or Province Name (full name) [Some-State]:Seoul
Locality Name (eg, city) []:Seoul
Organization Name (eg, company) [Internet Widgits Pty Ltd]:HARM
Organizational Unit Name (eg, section) []:harm
Common Name (e.g. server FQDN or YOUR name) []:epu baal
Email Address []:herdin86@gmail.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:1234
An optional company name []:harm
```

저렇게 하면 된다.  
저런 뒤, 만들어진 `CSR` 파일을 열어보면

```
-----BEGIN CERTIFICATE REQUEST-----
어쩌구저쩌구알수없는암호화문자열들...
-----END CERTIFICATE REQUEST-----
```

위와 같은 양식의 요청서를 볼 수 있다. 여기까지했으면, `CA(Certificate Authority)` 인증 기관에 요청하여 `CRT(CeRTificate)` 파일을 받을 수 있다.
> 뭐 메일로 받는다던데.. 안해봐서..

하지만 요청하고 다시 회신받고 귀찮고 난 그냥 로컬서버에 tomcat 이 https 요청을 받아주기만 할 수 있으면 되기 때문에 사설 CA 를 만들고 진행한다.

### 5. root CA 만들기

인증서에 서명을 할 root CA 를 만든다.

``` shell
genrsa -aes256 -out <ROOT CA FILE NAME> 2048

# EXAMPLE
OpenSSL> genrsa -aes256 -out rootCA.key 2048
Generating RSA private key, 2048 bit long modulus
........................................................+++
.....................................................................+++
e is 65537 (0x10001)
Enter pass phrase for rootCA.key:
Verifying - Enter pass phrase for rootCA.key:
```

### 6.  root CA 사설 CSR 생성하기

위에서 만든 root CA 를 이용하여 사설 CSR 을 만든다.
> 위에서 CSR 만들었는데 왜 또 만들지? 잘모르겠지만 root CA 의 CSR 과 개인 CSR 이 둘다 필요한 것 같다. 확장자는 중요하지 않은 것 같다.

``` shell
req -x509 -new -nodes -key <ROOT CA FILE NAME> -days 3650 -out <ROOT CA CSR FILE NAME>

# EXAMPLE
OpenSSL> req -config ./openssl.cnf -x509 -nodes -key rootCA.key -days 3650 -out rootCSR.pem
Enter pass phrase for rootCA.key:
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:KR
State or Province Name (full name) [Some-State]:Seoul
Locality Name (eg, city) []:Seoul
Organization Name (eg, company) [Internet Widgits Pty Ltd]:HARM
Organizational Unit Name (eg, section) []:harm
Common Name (e.g. server FQDN or YOUR name) []:epu baal
Email Address []:herdin86@gmail.com
```

### 7. CRT 인증서 생성하기

``` shell

x509 -req -in <MY CSR FILE NAME> -CA <ROOT CA CSR FILE NAME> -CAkey <ROOT CA FILE NAME> -CAcreateserial -out <MY CRT FILE NAME> -days 3650

x509 -req -in private.csr -CA rootCSR.pem -CAkey rootCA.key -CAcreateserial -out private.crt -days 3650
```

### 8. tomcat 에 적용하기 위해 형식 변경

``` shell
pkcs12 -export -in <MY CRT FILE NAME> -inkey <MY PRIVATE KEY FILE NAME> -out <MY PKCS12 FILE NAME FOR TOMCAT> -name <NAME-여긴 뭘적는건지 모르겠다>

pkcs12 -export -in private.crt -inkey private.key -out .keystore -name tomcat
```

### 9. tomcat 에 HTTPS 커넥터 적용

tomcat `server.xml` 에 아래 내용을 추가한다. 대소문자를 잘 입력하도록하자.
다른 블로그에서 참고하다가 `attribute` 의 대소문자 때문에 안되서 몇시간 낭비했다.

``` xml
<Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150"
        scheme="https"
        secure="true"
        SSLEnabled="true"

        keystorePass="<MY PKCS12 FILE EXPORT PASSWORD>"
        keystoreFile="<MY PKCS12 FILE NAME FOR TOMCAT>"

        clientAuth="false"
        sslProtocol="TLS"
/>
```

### 10. 확인

`https://MY-DOMAIN:8443` 에 접속하여 확인해 보자.

끝.


연관 포스트들
- [HTTPS]({{ site.url }}/https-ssl-tls/)
- [대칭키와 공개키]({{ site.url }}/encryption/)

참고 포스트들
- [OpenSSL 을 이용한 SSL 인증서 발급](https://namjackson.tistory.com/24)
- [SSL TOMCAT 적용1](https://namjackson.tistory.com/25)
- [SSL TOMCAT 적용2](https://joshuajangblog.wordpress.com/tag/%ED%86%B0%EC%BA%A3-ssl-%EC%84%A4%EC%A0%95%EB%B0%A9%EB%B2%95/)
