---
layout: post
title: "spring boot 3.2 spring cloud open feign client test 만들기"
date: 2024-01-17
tags: kotlin spring-boot spring-cloud feign
---

# GOAL
`@FeignClient` 와 `@EnableFeignClients` 로 feign client 를 만들었을때, feign client 만 올려서 테스트를 하고싶다.
> 찾아봐도 없어서 기록한다

# not mock test

``` kotlin
@EnableFeignClients(
    basePackages = ["your.feign.client.package"]
//    clients = [YourFeignClient::class] // choose basePackages or clients
)
@ImportAutoConfiguration(
    classes = [FeignAutoConfiguration::class]
)
@SpringBootTest(
    properties = [
        "if.you.use.feign.url.as.property.use.this=http://localhost:8080"
    ],
    classes = [YourFeignClientContractTest::class], // disabled other bean creation
)
internal class YourFeignClientContractTest(
    @Autowired private val yourFeignClient: YourFeignClient
) {

    @Test
    fun test() {
        // write your test code for yourFeignClient
    }
}
```

# mock test

``` kotlin
@EnableFeignClients(
    basePackages = ["your.feign.client.package"]
//    clients = [YourFeignClient::class] // choose basePackages or clients
)
@ImportAutoConfiguration(
    classes = [FeignAutoConfiguration::class]
)
@SpringBootTest(
    properties = [
        "if.you.use.feign.url.as.property.use.this=http://localhost:8080"
    ],
    classes = [YourFeignClientContractTest::class], // disabled other bean creation
)
internal class YourFeignClientMockTest (
    @Autowired private val yourFeignClient: YourFeignClient,
    @Autowired private var wireMockServer: WireMockServer
) {

    @BeforeEach
    fun setUpMockServer() {
        YourFeignClientWireMockServerConfig.setUpMockResponse(wireMockServer)
    }

    @Test
    fun test() {
        // write your test code for yourFeignClient
    }
}

@TestConfiguration
class YourFeignClientWireMockServerConfig {
    companion object {
        const val wireMockServerPort = 12345

        fun setUpMockResponse(wireMockServer: WireMockServer) {
            wireMockServer.stubFor(
                WireMock.get(
                    WireMock.urlEqualTo("/your/api/path.v1")
                )
                    .willReturn(
                        WireMock.aResponse()
                            .withStatus(HttpStatus.OK.value())
                            .withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                            .withBody(
                                """
                                    {
                                      "name": "foo",
                                      "age": 22
                                    }
                                """.trimIndent()
                            )
                    )
            )
        }
    }

    @Bean(initMethod = "start", destroyMethod = "stop")
    fun wireMockServer(): WireMockServer {
        return WireMockServer(wireMockServerPort)
    }
}
```