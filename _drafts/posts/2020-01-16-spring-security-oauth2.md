---
layout: post
title: "Spring Boot Security OAuth2.."
date: 2020-01-16
tags: spring
---

## 의존성 설정

``` groovy
implementation 'org.springframework.boot:spring-boot-starter-security'
implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
```
## 프로퍼티

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
1. OAuth Client properties 의 기본 prefix
2. registration Id

위의 설정으로 아래와 같은 end-point 들이 만들어 진다.
* authorization server 로 인증요청을 보내기위한 end-point : `{baseUrl}/oauth2/authorization/{registrationId}`
* resource owner 가 authorization server 에서 인증을 한뒤에 callback end-point : `{baseUrl}/login/oauth2/code/{registrationId}`

## 설정 클래스

``` java
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  //...
  @Override
  protected void configure(HttpSecurity http) throws Exception {
      http
          .csrf()
          .ignoringAntMatchers("/h2/**") //for h2-console
      .and()
          .headers().frameOptions().disable() //for h2-console
      ;
      //미리 정의한 enum 에 따라 모두 허용, 여기선 안보여줌
      for (ACL.PERMIT_ALL permitAll : ACL.PERMIT_ALL.values()) {
          http.authorizeRequests().antMatchers(permitAll.getPath()).permitAll();
      }
      //미리 정의한 enum 에 따라 모두 롤 체크, 여기선 안보여줌
      for (ACL.PERMIT_WITH_ROLE permitWithRole : ACL.PERMIT_WITH_ROLE.values()) {
          http.authorizeRequests().antMatchers(permitWithRole.getPath()).hasRole(permitWithRole.getRole().getRoleForCheck());
      }
      //그외에는 인증해야 접근 가능
      http.authorizeRequests().anyRequest().authenticated();

      http
          .formLogin() //이건 있어야하나?
          .loginPage("/") //이것도 잘 모르겠다.
      .and()
          .logout()
          .logoutUrl("/login/logout") //로그아웃 url 정의 -> 따로 controller 에서 처리한다. SecurityContext.clear(), session.invalidate()
      .and()
          .oauth2Login() //OAuth2 로그인 사용 설정
          /** authorizationEndpoint
           * authorization url 을 구성하고 리다이렉션을 진행하는 부분
           * OAuth2AuthorizationRequestRedirectFilter 필터에서 authorizationRequestResolver(DefaultOAuth2AuthorizationRequestResolver) 를 사용하여 redirect
           * authorizationRequestResolver 는 redirect 정보를 OAuth2AuthorizationRequest 에 구성하여 return
           * state 정보를 담을 authorizationRequestRepository 도 설정할 수 있는데,
           * 별도 설정이 안되어 있다면 기본으로 HttpSessionOAuth2AuthorizationRequestRepository 가 설정이 됨
           */
//            .authorizationEndpoint()
//                .authorizationRequestRepository()
//                .authorizationRequestResolver()
          /** redirectionEndpoint
           * authorization server 에서 callback 할 주소를 커스터마이징
           * ClientRegistration.redirectUri 과 맞춰줘야한다고 한다.
           */
//            .redirectionEndpoint()
//                .baseUri("/hello/callback")
//            .redirectionEndpoint(redirectionEndpointConfig -> {
//                redirectionEndpointConfig.baseUri("/hello/callback");
//            })
          /** token end point : authorization code 를 받은 것으로 token 을 교환
           * 기본 accessTokenResponseClient : DefaultAuthorizationCodeTokenResponseClient
           * 파라미터의 authorizationCodeGrantRequest 를 RequestEntity<?> request 로 변환시켜주는 Convert : OAuth2AuthorizationCodeGrantRequestEntityConverter
           * rest template 을 사용하여, json -> OAuth2AccessTokenResponse 변환한다.
           */
//            .tokenEndpoint()
//                .accessTokenResponseClient(authorizationGrantRequest -> {
//                    return null;
//                })
//            .and()

          .defaultSuccessUrl("/")
          .userInfoEndpoint()
          .userService(oAuth2UserService)
      ;

  }
}
```

## 조금 더 보자
### 자동설정의 시작, `OAuth2ClientAutoConfiguration`

`sprong-boot-autoconfiguration/META-INF/spring.factories` 에 `OAuth2ClientAutoConfiguration` 가 등록되어 있음.

``` java
@Configuration(proxyBeanMethods = false)
@AutoConfigureBefore(SecurityAutoConfiguration.class)
@ConditionalOnClass({ EnableWebSecurity.class, ClientRegistration.class })
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
@Import({ OAuth2ClientRegistrationRepositoryConfiguration.class, OAuth2WebSecurityConfiguration.class })
public class OAuth2ClientAutoConfiguration {}
```

`OAuth2ClientRegistrationRepositoryConfiguration` 와 `OAuth2WebSecurityConfiguration` 를 `@Import` 하고 있다.

#### `OAuth2ClientRegistrationRepositoryConfiguration`

``` java
@Configuration(proxyBeanMethods = false)
@EnableConfigurationProperties(OAuth2ClientProperties.class)
@Conditional(ClientsConfiguredCondition.class)
class OAuth2ClientRegistrationRepositoryConfiguration {
	@Bean
	@ConditionalOnMissingBean(ClientRegistrationRepository.class)
	InMemoryClientRegistrationRepository clientRegistrationRepository(OAuth2ClientProperties properties) {
		List<ClientRegistration> registrations = new ArrayList<>(
				OAuth2ClientPropertiesRegistrationAdapter.getClientRegistrations(properties).values());
		return new InMemoryClientRegistrationRepository(registrations);
	}
}
```

프로퍼티로 받는 `OAuth2ClientProperties` 의 모습은 아래와 같다

``` java
@ConfigurationProperties(prefix = "spring.security.oauth2.client")
public class OAuth2ClientProperties implements InitializingBean {
  private final Map<String, Provider> provider = new HashMap<>();
  private final Map<String, Registration> registration = new HashMap<>();
  //...
}
```

위에선 필수요소만 yaml 에 넣었지만, 프리픽스가 `spring.security.oauth2.client` 로 지정되어있으므로, 아래와 같이 설정을 더 할 수 있다.

``` yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            clientId: your-client-id
            clientSecret: your-client-secret
            //...
        provider:
          google:
              authorizationUri: https://...
              tokenUri: https://...
              userInfoUri: https://...
              //...
```


OAuth2ClientAutoConfiguration : (OAuth2ClientRegistrationRepositoryConfiguration + OAuth2WebSecurityConfiguration)
OAuth2ClientRegistrationRepositoryConfiguration : 설정으로부터 OAuth2ClientProperties 을 읽어들이고 그것들을 기반으로 InMemoryClientRegistrationRepository 를 채워넣는다.
OAuth2WebSecurityConfiguration : ClientRegistrationRepository 를 이용한 서비스 제공 및 OAuth 설정이 들어간 WebSecurityConfigurerAdapter 기본 빈 설정

ClientRegistration : 우리가 OAuth2 를 사용하여 만들 서비스를 의미함. clientId, clientSecret, redirectUrl 등..
ClientRegistrationRepository : 앞에 있는 ClientRegistration 를 저장/관리, 대표 구현체 InMemoryClientRegistrationRepository
CommonOAuth2Provider : 열거형으로 Google, Github, Facebook, Okta 등 유명한 OAuth Provider 를 미리 정의 해 놓았음.




참고
- [공식 Spring Security](https://docs.spring.io/spring-security/site/docs/5.3.0.M1/reference/htmlsingle/#oauth2login)
- [공식 번역](https://godekdls.github.io/Spring%20Security/oauth2/#redirection-endpoint)
- [스프링 부트로 OAuth2 구현(페이스북, 구글, 카카오, 네이버)](https://engkimbs.tistory.com/849)
- [SpringSecurity - Kakao OAuth2 Client 사용하기 ](https://galid1.tistory.com/582)
- [Spring Security 처리 과정 및 구현 예제](https://mangkyu.tistory.com/77)
- [SpringBoot로 SpringSecurity 기반의 JWT 토큰 구현하기](https://mangkyu.tistory.com/57)
