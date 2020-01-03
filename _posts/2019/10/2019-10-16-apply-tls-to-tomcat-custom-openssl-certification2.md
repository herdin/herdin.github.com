---
layout: post
title: "TOMCAT 에 SSL 적용2"
date: 2019-10-16
tags: web
---

분명 [이때]({{ site.url }}/apply-tls-to-tomcat-custom-openssl-certification/) 적용된걸 확인했는데, 다시 만드니 뭔가 안되서 다시 정리한다.

[여기](https://www.lesstif.com/pages/viewpage.action?pageId=6979614#)를 참고 했다. 순서도 좀 다르고.. 암튼.. 따라해본다.

### Root CA (Certificate Authority) 만들기

``` shell
genrsa -aes256 -out <ROOT CA PRIVATE KEY FILE LOCATION> 2048
#example
genrsa -aes256 -out ./certs/herdin-rootca.key 2048
```

### Root CSR (Certificate Signing Request) 만들기

사용될 설정파일 내용

```
[ req ]
default_bits            = 2048
default_md              = sha1
default_keyfile         = herdin-rootca.key
distinguished_name      = req_distinguished_name
extensions             = v3_ca
req_extensions = v3_ca

[ v3_ca ]
basicConstraints       = critical, CA:TRUE, pathlen:0
subjectKeyIdentifier   = hash
##authorityKeyIdentifier = keyid:always, issuer:always
keyUsage               = keyCertSign, cRLSign
nsCertType             = sslCA, emailCA, objCA
[req_distinguished_name ]
countryName                     = Country Name (2 letter code)
countryName_default             = KR
countryName_min                 = 2
countryName_max                 = 2

# 회사명 입력
organizationName              = Organization Name (eg, company)
organizationName_default      = HARM

# 부서 입력
#organizationalUnitName          = Organizational Unit Name (eg, section)
#organizationalUnitName_default  = harm

# SSL 서비스할 domain 명 입력
commonName                      = Common Name (eg, your name or your server's hostname)
commonName_default             = herdin's Self Signed CA
commonName_max                  = 64
```

위의 설정파일을 저장하고 CSR 만들 때 사용한다.

``` shell
req -new -key <ROOT CA PRIVATE KEY FILE LOCATION> -out <ROOT CSR FILE LOCATIOIN> -config <CONFIG FILE LOCATION>
#example
req -new -key ./certs/herdin-rootca.key -out ./certs/herdin-rootca.csr -config ./certs/herdin-rootca.cnf
```

### Root CRT (certificate) 만들기

``` shell
x509 -req \
  -days 3650 \
  -extensions v3_ca \
  -set_serial 1 \
  -in <ROOT CSR FILE LOCATION> \
  -signkey <ROOT CA PRIVATE KEY FILE LOCATION> \
  -out <ROOT CRT FILE LOCATION> \
  -extfile <CONFIG FILE LOCATION>
#example
x509 -req \
  -days 3650 \
  -extensions v3_ca \
  -set_serial 1 \
  -in ./certs/herdin-rootca.csr \
  -signkey ./certs/herdin-rootca.key \
  -out ./certs/herdin-rootca.crt \
  -extfile ./certs/herdin.cnf
```

만들어진 CRT 파일을 확인한다.

``` shell
x509 -text -in <CRT FILE LOCATION>
#example
x509 -text -in ./certs/herdin-rootca.crt
```

### 인증서 만들기

``` shell
genrsa -aes256 -out <PRIVATE KEY FILE LOCATION> 2048
#example
genrsa -aes256 -out ./certs/herdin.key 2048
```

### CSR (Certificate Signing Request) 만들기

사용될 설정파일 내용

```
[ req ]
default_bits            = 2048
default_md              = sha1
default_keyfile         = lesstif-rootca.key
distinguished_name      = req_distinguished_name
extensions             = v3_user
## 인증서 요청시에도 extension 이 들어가면 authorityKeyIdentifier 를 찾지 못해 에러가 나므로 막아둔다.
## req_extensions = v3_user

[ v3_user ]
# Extensions to add to a certificate request
basicConstraints = CA:FALSE
authorityKeyIdentifier = keyid,issuer
subjectKeyIdentifier = hash
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
## SSL 용 확장키 필드
extendedKeyUsage = serverAuth,clientAuth
subjectAltName          = @alt_names
[ alt_names]
## Subject AltName의 DNSName field에 SSL Host 의 도메인 이름을 적어준다.
## 멀티 도메인일 경우 *.lesstif.com 처럼 쓸 수 있다.
DNS.1   = local.anmani.link
DNS.2   = anmani.link
DNS.3   = *.anmani.link

[req_distinguished_name ]
countryName                     = Country Name (2 letter code)
countryName_default             = KR
countryName_min                 = 2
countryName_max                 = 2

# 회사명 입력
organizationName              = Organization Name (eg, company)
organizationName_default      = HARM

# 부서 입력
organizationalUnitName          = Organizational Unit Name (eg, section)
organizationalUnitName_default  = harm

# SSL 서비스할 domain 명 입력
commonName                      = Common Name (eg, your name or your server's hostname)
commonName_default             = epu baal
commonName_max                  = 64
```

``` shell
req -new  -key <PRIVATE KEY FILE LOCATION> -out <CSR FILE LOCATION> -config <CONFIG FILE LOCATION>
#example
req -new  -key ./certs/herdin.key -out ./certs/herdin.csr -config ./certs/herdin.cnf
```

### CRT (certificate) 만들기

``` shell
x509 \
  -req \
  -days 1825 \
  -extensions v3_user \
  -in <CSR FILE LOCATION> \
  -CA <ROOT CRT FILE LOCATION> \
  -CAcreateserial \
  -CAkey  <ROOT CA PRIVATE KEY FILE LOCATION> \
  -out <CRT FILE LOCATION> \
  -extfile <CONFIG FILE LOCATIOIN>
#example
-extensions v3_user \
x509 \
  -req \
  -days 1825 \
  -in ./certs/herdin.csr \
  -CA ./certs/herdin-rootca.crt \
  -CAcreateserial \
  -CAkey ./certs/herdin-rootca.key \
  -out ./certs/herdin.crt \
  -extfile ./certs/herdin.cnf
```

확인해보자.

``` shell
x509 -text -in <CRT FILE LOCATION>
#example
x509 -text -in ./certs/herdin.crt
```


### Tomcat 에 적용

적용하기 위해 포멧을 변경해주고

``` shell
pkcs12 -export -in <CRT FILE LOCATION> -inkey <PRIVATE KEY FILE LOCATION> -out <TOMCAT CERT FILE LOCATIOIN> -name tomcat
#example
pkcs12 -export -in ./certs/herdin.crt -inkey ./certs/herdin.key -out ./certs/herdin.keystore -name tomcat
```

`server.xml` 에 적용해주자

```
<Connector
  SSLEnabled="true"
  clientAuth="false"
  keystoreFile="C:\noneedinstall\OpenSSL\bin\certs\herdin.keystore"
  keystorePass="1235"
  maxThreads="150"
  port="8443"
  protocol="org.apache.coyote.http11.Http11NioProtocol"
  scheme="https"
  secure="true"
  sslProtocol="TLS"
/>
```

끝!
