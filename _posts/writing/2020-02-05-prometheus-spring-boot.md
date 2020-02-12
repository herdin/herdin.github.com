---
layout: post
title: "Prometheus-Grafana with Spring Boot"
date: 2020-02-05
tags: spring
---

제공된 exporter 로는 Business Logic 을 모니터링할 수 없으니, exporter 를 만들어야한다.

## 의존성 설정
``` xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId><!-- metric expose to endpoint -->
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-core</artifactId><!-- Micrometer core dependecy  -->
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId><!-- Micrometer Prometheus registry  -->
</dependency>
```

## property 설정
``` yaml
management:
  endpoint:
    metrics:
      enabled: true
    prometheus:
      enabled: true
  endpoints:
    web:
      exposure:
        include: '*' # 그냥 * 하면 에러남
  metrics:
    export:
      prometheus:
        enabled: true
```

혹시 Spring Security 를 사용중이면, 자동으로 생기는 endpoint 인 `/actuator` 를 인증없이 타도록 설정하자.

``` java
http.authorizeRequests().antMatchers("/actuator").permitAll();
```

저 상태로 서버를 올렸을때

### `/actuator` 요청

> 뭐가 엄청 많다. * 실행 해서 그런갑다. 원하는 exposure endpoint 만 쓰면 좀 더 간결해진다.
metric, health 이런식으로..

```
{
  "_links": {
    "self": {
      "href": "https://your.domain.com/actuator",
      "templated": false
    },
    "auditevents": {
      "href": "https://your.domain.com/actuator/auditevents",
      "templated": false
    },
    "beans": {
      "href": "https://your.domain.com/actuator/beans",
      "templated": false
    },
    "caches-cache": {
      "href": "https://your.domain.com/actuator/caches/{cache}",
      "templated": true
    },
    "caches": {
      "href": "https://your.domain.com/actuator/caches",
      "templated": false
    },
    "health-component": {
      "href": "https://your.domain.com/actuator/health/{component}",
      "templated": true
    },
    "health-component-instance": {
      "href": "https://your.domain.com/actuator/health/{component}/{instance}",
      "templated": true
    },
    "health": {
      "href": "https://your.domain.com/actuator/health",
      "templated": false
    },
    "conditions": {
      "href": "https://your.domain.com/actuator/conditions",
      "templated": false
    },
    "configprops": {
      "href": "https://your.domain.com/actuator/configprops",
      "templated": false
    },
    "env": {
      "href": "https://your.domain.com/actuator/env",
      "templated": false
    },
    "env-toMatch": {
      "href": "https://your.domain.com/actuator/env/{toMatch}",
      "templated": true
    },
    "info": {
      "href": "https://your.domain.com/actuator/info",
      "templated": false
    },
    "loggers": {
      "href": "https://your.domain.com/actuator/loggers",
      "templated": false
    },
    "loggers-name": {
      "href": "https://your.domain.com/actuator/loggers/{name}",
      "templated": true
    },
    "heapdump": {
      "href": "https://your.domain.com/actuator/heapdump",
      "templated": false
    },
    "threaddump": {
      "href": "https://your.domain.com/actuator/threaddump",
      "templated": false
    },
    "prometheus": {
      "href": "https://your.domain.com/actuator/prometheus",
      "templated": false
    },
    "metrics": {
      "href": "https://your.domain.com/actuator/metrics",
      "templated": false
    },
    "metrics-requiredMetricName": {
      "href": "https://your.domain.com/actuator/metrics/{requiredMetricName}",
      "templated": true
    },
    "scheduledtasks": {
      "href": "https://your.domain.com/actuator/scheduledtasks",
      "templated": false
    },
    "httptrace": {
      "href": "https://your.domain.com/actuator/httptrace",
      "templated": false
    },
    "mappings": {
      "href": "https://your.domain.com/actuator/mappings",
      "templated": false
    }
  }
}
```

### `/actuator/prometheus` 요청
```
# HELP jvm_gc_memory_promoted_bytes_total Count of positive increases in the size of the old generation memory pool before GC to after GC
# TYPE jvm_gc_memory_promoted_bytes_total counter
jvm_gc_memory_promoted_bytes_total 16384.0
# HELP tomcat_threads_current_threads  
# TYPE tomcat_threads_current_threads gauge
tomcat_threads_current_threads{name="https-jsse-nio-443",} 10.0
# HELP hikaricp_connections_idle Idle connections
# TYPE hikaricp_connections_idle gauge
hikaricp_connections_idle{pool="HikariPool-1",} 4.0
# HELP jvm_memory_max_bytes The maximum amount of memory in bytes that can be used for memory management
# TYPE jvm_memory_max_bytes gauge
jvm_memory_max_bytes{area="heap",id="PS Survivor Space",} 1.5204352E7
jvm_memory_max_bytes{area="heap",id="PS Old Gen",} 2.847932416E9
jvm_memory_max_bytes{area="heap",id="PS Eden Space",} 1.390936064E9
jvm_memory_max_bytes{area="nonheap",id="Metaspace",} -1.0
jvm_memory_max_bytes{area="nonheap",id="Code Cache",} 2.5165824E8
jvm_memory_max_bytes{area="nonheap",id="Compressed Class Space",} 1.073741824E9
...
```
## 커스텀 태그 추가
커스텀 태그를 추가하기 위해 설정 class 를 추가해본다.
``` java
@Configuration
public class PrometheusCustomConfig {
    @Bean
    MeterRegistryCustomizer<MeterRegistry> metricsCommonTags() {
        return registry -> registry.config().commonTags("application", "PROMETHEUS-SAMPLE-SERVER");
    }
}
```

아래와 같이 태그가 적용된 것을 확인할 수 있다.

> `/actuator/prometheus`

```
# HELP hikaricp_connections Total connections
# TYPE hikaricp_connections gauge
hikaricp_connections{application="PROMETHEUS-SAMPLE-SERVER",pool="HikariPool-1",} 4.0
# HELP my_counter_one_total  
# TYPE my_counter_one_total counter
my_counter_one_total{application="PROMETHEUS-SAMPLE-SERVER",mytag="my tag counter 01",} 816.0
# HELP jvm_gc_max_data_size_bytes Max size of old generation memory pool
# TYPE jvm_gc_max_data_size_bytes gauge
jvm_gc_max_data_size_bytes{application="PROMETHEUS-SAMPLE-SERVER",} 0.0
# HELP logback_events_total Number of error level events that made it to the logs
# TYPE logback_events_total counter
logback_events_total{application="PROMETHEUS-SAMPLE-SERVER",level="trace",} 0.0
logback_events_total{application="PROMETHEUS-SAMPLE-SERVER",level="info",} 14.0
logback_events_total{application="PROMETHEUS-SAMPLE-SERVER",level="error",} 0.0
logback_events_total{application="PROMETHEUS-SAMPLE-SERVER",level="warn",} 0.0
logback_events_total{application="PROMETHEUS-SAMPLE-SERVER",level="debug",} 574.0
```

## spring exporter - prometheus 연동

`Prometheus` 가 수집할 수 있도록 `metrics_path` 의 `/actuator/prometheus` 를 추가해준다.

``` yaml
# 전역 설정
global:
  scrape_interval:     15s # 15초마다 매트릭을 수집한다. 기본은 1분.
  evaluation_interval: 15s # 15초마다 규칙을 평가한다. 기본은 1분.

  # 외부 시스템에 표시할 이 서버의 레이블
  external_labels:
      monitor: 'codelab-monitor'

# 규칙을 로딩하고 'evaluation_interval' 설정에 따라 정기적으로 평가한다.
rule_files:
  # - "first.rules"
  # - "second.rules"

# 매트릭을 수집할 엔드포인드
scrape_configs:
  - job_name: 'my-prometheus'
    # metrics_path의 기본 경로는 '/metrics'이고 scheme의 기본값은 `http`다
    static_configs:
      - targets: ['localhost:9090']
  # 아래서 설정할 postgresql 서버에 대한 node exporter 를 미리 설정한다.
  - job_name: 'my-postgresql'
    static_configs:
      - targets: ['mypostgresqlurl:9100']
  - job_name: 'my-application'
    scheme: https
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['my-domain']
```

## 커스텀 매트릭 설정

위의 의존성으로 가져온 class 중에 `io.prometheus.client.*` 의 metric class 를 사용하면 안되고, `io.micrometer.core.instrument.*` 의 metric class 를 사용해야 한다.
> stackoverflow 어디선가 그러라는걸 봤는데 출처를 못찾겠다.

Spring bean 으로 설정되는 class 에 `io.micrometer.core.instrument.binder.MeterBinder` 를 구현하거나 `io.micrometer.core.instrument.MeterRegistry` 을 주입받아서 class 초기화 부분에서 metric 정보들을 등록/초기화 하여 사용하면 된다.

### MicrometerController.java
``` java
@RestController
public class MicrometerController implements MeterBinder {
  @Override
  public void bindTo(MeterRegistry meterRegistry) {
    //meterRegistry 를 이용하여 custom metric 을 초기화하고 등록하면 된다.
  }
```

### Counter 예제

증가하기만 하는 metric 이다. 줄어들면 오류가 난다.

아래 예제에서 `/exporter/micro/counter/1/inc/123` 요청을 하면 `/actuator/prometheus` 에서 counter 값이 123만큼 증가한 것을 확인할 수 있다.

``` java
@RestController
public class MicrometerController implements MeterBinder {
  private Logger logger = LoggerFactory.getLogger(MicrometerController.class);
  private Counter counter;
  @Override
  public void bindTo(MeterRegistry meterRegistry) {
    counter = meterRegistry.counter("my.micrometer.counter.01", "tag name", "counter 1 tag"); //metric name 은 . 으로 계층을 나누는 것이 convention 이다.
  }

  @GetMapping("/exporter/micro/counter/1/inc/{val}")
  public String counter1(@PathVariable long val) {
      double previous = counter.count();
      counter.increment(val);
      logger.debug("counter-1 previous {} increase {} current {}", previous, val, counter.count());
      return "counter-1 increase " + val;
  }
```

### Gauge 예제

Gauge 는 다른 metric 과 는 좀 다르게 등록하고 사용한다. 아래 예제는 두가지 케이스를 보여주는데, `List` 를 등록하고 List 의 size 를 등록하는 방법과
> 보통 Thread Pool, Collection 을 등록해서 사용한다고 한다.

`Atomic` class 를 등록하고 직접 변경하는 방법이 있다고 한다.

Counter 로 가능한 것을 Gauge 로 대체하지 말아야하고, `http request count` 처럼 너무 빈번하게 일어나는 일을 Gauge 로 등록하지 말라고 한다. Gauge 는 다른 meter 와는 다르게 `관찰` 당할 때, 값이 변경 된다고 한다.
> 공식문서에서는 heisen-gauge 라고 이해를 돕기위한 단어를 쓰고있는 것 같다.

``` java
@RestController
public class MicrometerController implements MeterBinder {
  private Logger logger = LoggerFactory.getLogger(MicrometerController.class);
  private List<Long> observedList = new ArrayList<>();
  private AtomicLong observedLong;
  @Override
  public void bindTo(MeterRegistry meterRegistry) {
    Gauge.builder("my.micrometer.gauge.01", observedList, List::size).tags(Arrays.asList(Tag.of("tag name", "gauge 2 tag"))).register(meterRegistry);
    observedLong = meterRegistry.gauge("my.micrometer.gauge.02", new AtomicLong(0));
  }

  @GetMapping("/exporter/micro/gauge/1/inc/{val}")
  public String gauge1(@PathVariable long val) {
      observedList.add(val);
      logger.debug("gauge-1 increase {}, observedList size is {}", val, observedList.size());
      return "gauge-1 add " + val + ", now size " + observedList.size();
  }

  @GetMapping("/exporter/micro/gauge/2/inc/{val}")
  public String gauge2(@PathVariable long val) {
      long previous = observedLong.get();
      observedLong.set(val);
      logger.debug("gauge-2 previous {} increase {} current {}", previous, val, observedLong.get());
      return "gauge-2 add " + val;
  }
```

## Timer 예제

짧은 시간을 재거나, 잰 시간의 총합과 횟수를 측정하는 metric. 측정 시간이 nanoseconds 로 `Long.MAX_VALUE` (292.3 years) 를 넘을 경우, overflow 가 발생한다.

``` java
@RestController
public class MicrometerController implements MeterBinder {
  private Logger logger = LoggerFactory.getLogger(MicrometerController.class);
  private Timer timer;
  @Override
  public void bindTo(MeterRegistry meterRegistry) {
    timer = meterRegistry.timer("my.micrometer.timer.01", Arrays.asList(Tag.of("tag name", "timer 1 tag")));
  }

  @GetMapping("/exporter/micro/timer/1/inc/{val}")
  public String timer1(@PathVariable long val) {
      timer.record(() -> {
          try {
              TimeUnit.MILLISECONDS.sleep(1500);
          } catch (InterruptedException e) {
              e.printStackTrace();
              logger.error(e.getMessage());
          }
      });

      timer.record(2000, TimeUnit.MILLISECONDS );

      return "timer-1 received " + val;
  }
```

## LongTaskTimer 예제

Timer 로 재지 않는 긴 시간을 측정할 떄 사용한다. Timer 는 잰 시간과 횟수를 저장하지만, LongTaskTimer 는 재고 있는 시간만 측정가능하고, 측정이 끝나면 초기화 된다.

``` java
@RestController
public class MicrometerController implements MeterBinder {
  private Logger logger = LoggerFactory.getLogger(MicrometerController.class);
  private Counter counter;
  @Override
  public void bindTo(MeterRegistry meterRegistry) {
    longTaskTimer = LongTaskTimer.builder("my.micrometer.longtasktimer.01").tags(Arrays.asList(Tag.of("tag name", "long task timer 1 tag"))).register(meterRegistry);
  }

  @GetMapping("/exporter/micro/longtasktimer/1/inc/{val}")
  public String longTaskTimer1(@PathVariable long val) {
      longTaskTimer.record(() -> {
          try {
              TimeUnit.MILLISECONDS.sleep(5000);
          } catch (InterruptedException e) {
              e.printStackTrace();
          }
      });

      return "longtasktimer-1 received " + val;
  }
```

출처
- [MICROMETER Concepts](https://micrometer.io/docs/concepts)
- [Prometheus 공부 및 Java client 연동](https://gompangs.github.io/2018/12/14/prometheus/)
- [Custom Metrics With Micrometer And Prometheus Using Spring Boot Actuator](https://www.atlantbh.com/blog/custom_metrics_micrometer_prometheus_spring_boot_actuator/)
