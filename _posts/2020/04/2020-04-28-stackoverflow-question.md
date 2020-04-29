---
layout: post
title: "Spring boot Jar act different when build on AWS codebuild with gradlew"
date: 2020-04-28
tags: stackoverflow
---

I have weird situation now..

Spring boot, Graldew, Github, Aws Codebuild

and [this](https://github.com/herdin/GradleSpringBootMybatis/tree/aws-codebuild-problem) is my humble git repository..

my project structure below.

```
.
├── build.gradle
├── settings.gradle
├── gradle
│ └── wrapper
│   ├── gradle-wrapper.jar
│   └── gradle-wrapper.properties
├── gradlew
└── gradlew.bat
└── src
│ └── main
│  ├── java
│  │ └── app
│  │  ├── config //config package
│  │  │ ├── VaultConfiguration //configuration for vault properties
│  │  │ └── TestConfA //configuration for test
│  │  ├── controller //controller package
│  │  ├── ...
│  │  └ MainApp.java //Spring Boot Main java
│  └── resources
│    ├── app
│    │ └── mapper
│    │   └── ... //mybatis xml path
│    ├── application.yaml
│    └── logback-spring.xml //logback config xml
└ .... project files ...
```

#### VaultConfiguration.java
``` java
package app.config;

import ...

@Configuration
@Order
public class VaultConfiguration {
    private Logger logger = LoggerFactory.getLogger(VaultConfiguration.class);
    public enum VAULT_ENVIRONMENT_KEY {
        ... enums
    }
    public enum VAULT_KEY {
        ... enums
    }
    public enum SPRING_DATABASE_PROPERTY_KEY {
        ... enums
    }

    public VaultConfiguration(Environment environment) throws URISyntaxException {
        ...
        /*
         * below code do
         * System.setProperty("spring.datasource.url", url from vault)
         * System.setProperty("spring.datasource.username", username from vault)
         * System.setProperty("spring.datasource.password", password from vault)
         * for spring datasource
         */
        VaultTemplate vaultTemplate = new VaultTemplate(VaultEndpoint.from(new URI(vaultEndpoint.get())), new TokenAuthentication(vaultToken.get()));
        Optional<VaultResponse> vaultResponse = Optional.of(vaultTemplate.read(vaultPathDatabaseInfo.get()));
        logger.debug("vault read -> {}", vaultResponse.get().getData());
        setSystemPropertyFromVaultDataByKey(SPRING_DATABASE_PROPERTY_KEY.URL, vaultResponse, VAULT_KEY.URL);
        setSystemPropertyFromVaultDataByKey(SPRING_DATABASE_PROPERTY_KEY.USERNAME, vaultResponse, VAULT_KEY.USERNAME);
        setSystemPropertyFromVaultDataByKey(SPRING_DATABASE_PROPERTY_KEY.PASSWORD, vaultResponse, VAULT_KEY.PASSWORD);
    }

    private void setSystemPropertyFromVaultDataByKey(SPRING_DATABASE_PROPERTY_KEY springDatabasePropertyKey, Optional<VaultResponse> vaultResponse, VAULT_KEY vaultKey) {
        System.setProperty(springDatabasePropertyKey.value(), String.valueOf(vaultResponse.get().getData().get(vaultKey.value())));
    }
}
```

#### TestConfA.java
just class for configuration load check
``` java
@Configuration
public class TestConfA {
    public TestConfA() {
        System.out.println(this.getClass().getSimpleName());
    }
}
```

Simple example for me to study spring boot with gradle.

When build myself on local or ec2(amazon linux2) works find. just same sources.

build process like below..

``` shell
$ git clone <my-git-hub-repository-url>
$ chmod +x ./gradlew
$ ./gradlew bootJar
$ java -jar ./build/libs/<my-boot-jar>.jar

$ java -version
openjdk version "13.0.2" 2020-01-14
OpenJDK Runtime Environment (build 13.0.2+8)
OpenJDK 64-Bit Server VM (build 13.0.2+8, mixed mode, sharing)

$ java -jar ./build/libs/GradleSpringBootMybatis-1.0-SNAPSHOT.jar
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.2.6.RELEASE)

2020-04-28 02:56:41.451 INFO  --- [ main ] app.MainApp : Starting MainApp on my-ip.ap-northeast-2.compute.internal with PID 1966 (/home/ec2-user/deleteme/GradleSpringBootMybatis/build/libs/GradleSpringBootMybatis-1.0-SNAPSHOT.jar started by ec2-user in /home/ec2-user/deleteme/GradleSpringBootMybatis)
...
2020-04-28 02:56:44.618 INFO  --- [ main ] o.s.w.c.ContextLoader : Root WebApplicationContext: initialization completed in 3026 ms
TestConfA$$EnhancerBySpringCGLIB$$2c9c0e05
TestConfB$$EnhancerBySpringCGLIB$$64feb126
TestConfC$$EnhancerBySpringCGLIB$$9d615447
...
2020-04-28 02:56:45.157 ERROR --- [ main ] o.s.b.SpringApplication : Application run failed
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'vaultConfiguration' defined in URL [jar:file:/home/ec2-user/deleteme/GradleSpringBootMybatis/build/libs/GradleSpringBootMybatis-1.0-SNAPSHOT.jar!/BOOT-INF/classes!/app/config/VaultConfiguration.class]: Bean instantiation via constructor failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [app.config.VaultConfiguration$$EnhancerBySpringCGLIB$$4ca1e1fc]: Constructor threw exception; nested exception is java.lang.NullPointerException
        at org.springframework.beans.factory.support.ConstructorResolver.instantiate(ConstructorResolver.java:314)
        at org.springframework.beans.factory.support.ConstructorResolver.autowireConstructor(ConstructorResolver.java:295)
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.autowireConstructor(AbstractAutowireCapableBeanFactory.java:1358)

```

Upper error is normal. because `VaultConfiguration` needs OS environment. and java code like below.

``` java
Optional.of(System.getenv(VAULT_ENVIRONMENT_KEY.TOKEN.value()));
```

So error is just find.

And, also I can see `TestConfA`, `TestConfB`, `TestConfC` crerator log.


But.. jar file build with aws codebuild/gradlew doesn't works.

`buildspec.yml` Codebuild below.

``` yaml
version: 0.2

phases:
  install:
    commands:
    ... print info for phases
      - curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
      - unzip awscliv2.zip
      - ./aws/install
  build:
    commands:
    ... print info for phases
      - chmod +x ./gradlew
      - ./gradlew bootJar
  post_build:
    commands:
      - aws s3 sync ./build/libs/ s3://my-s3-bucket

cache:
  paths:
    - '/root/.gradle/caches/**/*'
```

excute jar log form s3 below.
```
$ java -jar GradleSpringBootMybatis-1.0-SNAPSHOT.jar

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.2.6.RELEASE)

2020-04-28 03:03:03.754 INFO  --- [ main ] app.MainApp : Starting MainApp on ip-my-ip.ap-northeast-2.compute.internal with PID 2090 (/home/ec2-user/deleteme/build/libs-20200427-185700/GradleSpringBootMybatis-1.0-SNAPSHOT.jar started by ec2-user in /home/ec2-user/deleteme/build/libs-20200427-185700)
2020-04-28 03:03:03.762 DEBUG --- [ main ] app.MainApp : Running with Spring Boot v2.2.6.RELEASE, Spring v5.2.5.RELEASE
2020-04-28 03:03:03.762 INFO  --- [ main ] app.MainApp : No active profile set, falling back to default profiles: default
2020-04-28 03:03:06.860 INFO  --- [ main ] o.s.b.w.e.t.TomcatWebServer : Tomcat initialized with port(s): 8080 (http)
2020-04-28 03:03:06.884 INFO  --- [ main ] o.a.c.h.Http11NioProtocol : Initializing ProtocolHandler ["http-nio-8080"]
2020-04-28 03:03:06.886 INFO  --- [ main ] o.a.c.c.StandardService : Starting service [Tomcat]
2020-04-28 03:03:06.886 INFO  --- [ main ] o.a.c.c.StandardEngine : Starting Servlet engine: [Apache Tomcat/9.0.33]
2020-04-28 03:03:07.013 INFO  --- [ main ] o.a.c.c.C.[.[.[/] : Initializing Spring embedded WebApplicationContext
2020-04-28 03:03:07.017 INFO  --- [ main ] o.s.w.c.ContextLoader : Root WebApplicationContext: initialization completed in 3123 ms
2020-04-28 03:03:07.689 WARN  --- [ main ] o.s.b.w.s.c.AnnotationConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'postgreSQLRunner': Unsatisfied dependency expressed through field 'testMapper'; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'testMapper' defined in URL [jar:file:/home/ec2-user/deleteme/build/libs-20200427-185700/GradleSpringBootMybatis-1.0-SNAPSHOT.jar!/BOOT-INF/classes!/app/mapper/TestMapper.class]: Unsatisfied dependency expressed through bean property 'sqlSessionFactory'; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'sqlSessionFactory' defined in class path resource [org/mybatis/spring/boot/autoconfigure/MybatisAutoConfiguration.class]: Unsatisfied dependency expressed through method 'sqlSessionFactory' parameter 0; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'dataSource' defined in class path resource [org/springframework/boot/autoconfigure/jdbc/DataSourceConfiguration$Hikari.class]: Bean instantiation via factory method failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [com.zaxxer.hikari.HikariDataSource]: Factory method 'dataSource' threw exception; nested exception is org.springframework.boot.autoconfigure.jdbc.DataSourceProperties$DataSourceBeanCreationException: Failed to determine a suitable driver class
2020-04-28 03:03:07.698 INFO  --- [ main ] o.a.c.c.StandardService : Stopping service [Tomcat]
2020-04-28 03:03:07.742 INFO  --- [ main ] o.s.b.a.l.ConditionEvaluationReportLoggingListener :

Error starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled.
2020-04-28 03:03:07.749 ERROR --- [ main ] o.s.b.d.LoggingFailureAnalysisReporter :

***************************
APPLICATION FAILED TO START
***************************

Description:

Failed to configure a DataSource: 'url' attribute is not specified and no embedded datasource could be configured.

Reason: Failed to determine a suitable driver class
```

Spring act like there is no `@Configuration` java config..

There is no log for `VaultConfiguration`, `TestConfA`..

why is this different??



-------

Some people told me that that source not works. because of application.yaml doesn't have database information(url/username/password).. and Can't config like that..

So I'll show log when It build myself, run with OS enviroment variable.
Not modified Source. just `./gradlew bootJar`, `java -jar ./build/libs/~~~.jar`

```

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.2.6.RELEASE)

2020-04-28 08:12:19.052 INFO  --- [ main ] app.MainApp : Starting MainApp on f89a6da9a330 with PID 1 (/msa/GradleSpringBootMybatis-1.0-SNAPSHOT.jar started by root in /msa/GradleSpringBootMybatis)
2020-04-28 08:12:19.060 DEBUG --- [ main ] app.MainApp : Running with Spring Boot v2.2.6.RELEASE, Spring v5.2.5.RELEASE
2020-04-28 08:12:19.062 INFO  --- [ main ] app.MainApp : No active profile set, falling back to default profiles: default
2020-04-28 08:12:22.421 INFO  --- [ main ] o.s.b.w.e.t.TomcatWebServer : Tomcat initialized with port(s): 8080 (http)
2020-04-28 08:12:22.446 INFO  --- [ main ] o.a.c.h.Http11NioProtocol : Initializing ProtocolHandler ["http-nio-8080"]
2020-04-28 08:12:22.450 INFO  --- [ main ] o.a.c.c.StandardService : Starting service [Tomcat]
2020-04-28 08:12:22.450 INFO  --- [ main ] o.a.c.c.StandardEngine : Starting Servlet engine: [Apache Tomcat/9.0.33]
2020-04-28 08:12:22.644 INFO  --- [ main ] o.a.c.c.C.[.[.[/] : Initializing Spring embedded WebApplicationContext
2020-04-28 08:12:22.644 INFO  --- [ main ] o.s.w.c.ContextLoader : Root WebApplicationContext: initialization completed in 3453 ms
TestConfA$$EnhancerBySpringCGLIB$$9c73851a
TestConfB$$EnhancerBySpringCGLIB$$d4d6283b
TestConfC$$EnhancerBySpringCGLIB$$d38cb5c
2020-04-28 08:12:23.201 DEBUG --- [ main ] a.c.VaultConfiguration : creator
2020-04-28 08:12:23.203 INFO  --- [ main ] a.c.VaultConfiguration : system enviroment -> VAULT_ENDPOINT, ***my-vault-endpoint***
2020-04-28 08:12:23.207 INFO  --- [ main ] a.c.VaultConfiguration : system enviroment -> VAULT_PATH_DATABASE_INFO, ***my-vault-database-path***
2020-04-28 08:12:23.207 INFO  --- [ main ] a.c.VaultConfiguration : system enviroment -> PATH, /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
2020-04-28 08:12:23.207 INFO  --- [ main ] a.c.VaultConfiguration : system enviroment -> VAULT_TOKEN, ***my-vault-token***
2020-04-28 08:12:23.208 INFO  --- [ main ] a.c.VaultConfiguration : system enviroment -> HOSTNAME, f89a6da9a330
2020-04-28 08:12:23.208 INFO  --- [ main ] a.c.VaultConfiguration : system enviroment -> LD_LIBRARY_PATH, /usr/lib/jvm/java-11-openjdk/lib/server:/usr/lib/jvm/java-11-openjdk/lib:/usr/lib/jvm/java-11-openjdk/../lib
2020-04-28 08:12:23.208 INFO  --- [ main ] a.c.VaultConfiguration : system enviroment -> HOME, /root
2020-04-28 08:12:23.208 DEBUG --- [ main ] a.c.VaultConfiguration : property TOKEN -> ***my-vault-token***
2020-04-28 08:12:23.209 DEBUG --- [ main ] a.c.VaultConfiguration : property ENDPOINT -> ***my-vault-endpoint***
2020-04-28 08:12:23.618 DEBUG --- [ main ] a.c.VaultConfiguration : vault read -> {password=***passowrd***, url=jdbc:postgresql://***databaseurl/databasename***, username=***username***}
TestCompA
TestCompB
TestCompC
2020-04-28 08:12:24.573 INFO  --- [ main ] o.h.v.i.util.Version : HV000001: Hibernate Validator 6.0.18.Final
2020-04-28 08:12:25.193 INFO  --- [ main ] o.s.s.c.ThreadPoolTaskExecutor : Initializing ExecutorService 'applicationTaskExecutor'
2020-04-28 08:12:25.586 INFO  --- [ main ] o.a.c.h.Http11NioProtocol : Starting ProtocolHandler ["http-nio-8080"]
2020-04-28 08:12:25.653 INFO  --- [ main ] o.s.b.w.e.t.TomcatWebServer : Tomcat started on port(s): 8080 (http) with context path ''
2020-04-28 08:12:25.659 INFO  --- [ main ] app.MainApp : Started MainApp in 8.077 seconds (JVM running for 9.391)
2020-04-28 08:12:25.662 DEBUG --- [ main ] a.r.PostgreSQLRunner : hello! PostgreSQLRunner
2020-04-28 08:12:25.663 DEBUG --- [ main ] a.r.PostgreSQLRunner : database url in property -> jdbc:postgresql://***databaseurl/databasename***
2020-04-28 08:12:25.665 DEBUG --- [ main ] a.r.PostgreSQLRunner : database username in property -> ***username***
2020-04-28 08:12:25.665 DEBUG --- [ main ] a.r.PostgreSQLRunner : database password in property -> ***passowrd***
2020-04-28 08:12:25.705 INFO  --- [ main ] c.z.h.HikariDataSource : HikariPool-1 - Starting...
2020-04-28 08:12:25.942 INFO  --- [ main ] c.z.h.HikariDataSource : HikariPool-1 - Start completed.
2020-04-28 08:12:25.961 DEBUG --- [ main ] a.m.T.getAllTest : ==>  Preparing: select test_id ,test_data from test where 1=1
2020-04-28 08:12:26.004 DEBUG --- [ main ] a.m.T.getAllTest : ==> Parameters:
2020-04-28 08:12:26.083 DEBUG --- [ main ] a.m.T.getAllTest : <==      Total: 9
2020-04-28 08:12:26.098 DEBUG --- [ main ] a.r.PostgreSQLRunner : get test -> [TestModel{testId=1, testData='data-1'}, TestModel{testId=2, testData='data-2'}, TestModel{testId=4, testData='data-2'}, TestModel{testId=3, testData='hello'}, TestModel{testId=10, testData='herdin'}, TestModel{testId=101, testData='data-101'}, TestModel{testId=1000, testData='test-1000'}, TestModel{testId=102, testData='data-102'}, TestModel{testId=1001, testData='test-1001'}]
```

dataSource creation ok, and connect and select my postgresql success.


---

Compared with using jar command, There is a differency.
#### `jar xvf aws-codebuild-bootJar.jar`
```
0 Mon Apr 27 08:43:36 UTC 2020 BOOT-INF/
0 Mon Apr 27 08:43:36 UTC 2020 BOOT-INF/classes/
0 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/
0 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/runner/
2792 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/runner/PostgreSQLRunner.class
0 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/controller/
632 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/controller/TestCompA.class
4220 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/controller/SampleController.class
632 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/controller/TestCompC.class
687 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/controller/TestCompB.class
0 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/dto/
0 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/dto/request/
1257 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/dto/request/UserReqeust.class
0 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/dto/model/
1403 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/dto/model/TestModel.class
0 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/service/
672 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/service/UserService.class
0 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/mapper/
531 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/mapper/TestMapper.class
0 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/config/
691 Mon Apr 27 08:43:28 UTC 2020 BOOT-INF/classes/app/config/TestConfB.class
```
#### `jar xvf aws-ec2-command-build-bootJar.jar`
```
0 Wed Apr 29 06:21:42 UTC 2020 BOOT-INF/
0 Wed Apr 29 06:21:42 UTC 2020 BOOT-INF/classes/
0 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/
812 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/MainApp.class
0 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/config/
422 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/config/ElasticsearchConfiguration.class
2821 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/config/RetryableRestTemplateConfiguration$1.class
1414 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/config/RetryableRestTemplateConfiguration.class
636 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/config/TestConfA.class
691 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/config/TestConfB.class
636 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/config/TestConfC.class
1643 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/config/VaultConfiguration$VAULT_ENVIRONMENT_KEY.class
1517 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/config/VaultConfiguration$VAULT_KEY.class
1704 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/config/VaultConfiguration$SPRING_DATABASE_PROPERTY_KEY.class
5046 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/config/VaultConfiguration.class
0 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/controller/
4220 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/controller/SampleController.class
632 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/controller/TestCompA.class
687 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/controller/TestCompB.class
632 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/controller/TestCompC.class
0 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/service/
672 Wed Apr 29 06:21:40 UTC 2020 BOOT-INF/classes/app/service/UserService.class
```

And that Order is same as getResources for bean definition order.
