---
layout: post
title: "Spring Boot Security OAuth2.."
date: 2020-01-16
tags: spring
---


Spring Boot 2.x 버전에선 OAuth2.0 Login 자동설정이 되어있다고 한다.

- Initial setup
- Setting the redirect URI
- Configure application.yml
- Boot up the application

# Initial setup
OAuth2.0 provider 에서 앱을 만들고 세팅한다. ex) google, facebook, instagram

# Setting the redirect URI
OAuth2.0 provider 에 redirect URI 를 세팅한다.
> 기본설정은 {baseUrl}/login/oauth2/code/{registrationId} 이다.
> registrationId 는 ClientRegistration 의 유일한 ID 이다.

# Configure application.yml

``` yaml
spring:
  security:
    oauth2:
      client:
        registration:   #1
          google:       #2
            client-id: google-client-id
            client-secret: google-client-secret
```
`1` OAuth Client properties 의 기본 prefix
`2` registration Id

# Boot up the application

자동으로 만들어진 login page 에서 OAuth2.0 로그인이 가능해진다! 근데 난 자동으로 만들어진 페이지 안쓸꺼잖아!
그래서..

# CommonOAuth2Provider
Google, GitHub, Facebook, Okta 들은 미리 정의된 client properties 이다.

---------------------------





------------------------------
OAuth2ClientAutoConfiguration : (OAuth2ClientRegistrationRepositoryConfiguration + OAuth2WebSecurityConfiguration)
OAuth2ClientRegistrationRepositoryConfiguration : 설정으로부터 OAuth2ClientProperties 을 읽어들이고 그것들을 기반으로 InMemoryClientRegistrationRepository 를 채워넣는다.
OAuth2WebSecurityConfiguration : ClientRegistrationRepository 를 이용한 서비스 제공 및 OAuth 설정이 들어간 WebSecurityConfigurerAdapter 기본 빈 설정

ClientRegistration : 우리가 OAuth2 를 사용하여 만들 서비스를 의미함. clientId, clientSecret, redirectUrl 등..
ClientRegistrationRepository : 앞에 있는 ClientRegistration 를 저장/관리, 대표 구현체 InMemoryClientRegistrationRepository

CommonOAuth2Provider : 열거형으로 GOOGLE, GITHUB 등 유명한 OAuth Provider

OAuth2ClientRegistration

OAuth2ClientRegistrationRepository


------------------------




참고
- [Spring Security](https://docs.spring.io/spring-security/site/docs/5.3.0.M1/reference/htmlsingle/#oauth2login)
- [스프링 부트로 OAuth2 구현(페이스북, 구글, 카카오, 네이버)](https://engkimbs.tistory.com/849)
