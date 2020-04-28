---
layout: post
title: "Spring boot Jar act different when build on AWS codebuild with gradlew"
date: 2020-04-28
tags: stackoverflow
---

I have weird situation now..

Spring boot, Graldew, Github, Aws Codebuild

and [this](https://github.com/herdin/GradleSpringBootMybatis) is my humble git repository..

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
