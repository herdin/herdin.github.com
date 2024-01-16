---
layout: post
title: "Spring Boot, Gradlew, AWS Codebuild"
date: 2020-04-22
tags: shovel-knight
---


ClassPathBeanDefinitionScanner

#### ClassPathScanningCandidateComponentProvider
//AnnotationConfigServletWebServerApplicationContext
Resource[] resources = getResourcePatternResolver().getResources(packageSearchPath);
에서 가져오는 리소스 순서가 aws codebuild 에서 반대로된다..

* ClassPathBeanDefinitionScanner 에서 먼저 basepackage 의 모든 빈 후보자를 불러옴
* ConfigurationClassBeanDefinitionReader 에서 @Bean 을 등록함 생성하진않음
* ConfigurationClassEnhancer 가 EnhancerBySpringCGLIB 를 사용하여 빈을 바꿔주고, ConfigurationClassPostProcessor 가 호출됨
* CommonAnnotationBeanPostProcessor 에 의해 @PostConstructor 같은 함수들이 호출된다.

```
.
├── MainApp.main()
│ └── SpringApplication.run()
│  ├── prepareContext()
│  │ └── load()
│  ├── refreshContext()
│  │ └── refresh()
│  │  └── AbstractApplicationContext.refresh() -> 여기가 두번호출됨
│  │   ├── invokeBeanFactoryPostProcessors()
│  │   │ └── PostProcessorRegistrationDelegate.invokeBeanFactoryPostProcessors()
│  │   │  └── invokeBeanDefinitionRegistryPostProcessors()
│  │   │   └── ConfigurationClassPostProcessor.postProcessBeanDefinitionRegistry()
│  │   │    └── processConfigBeanDefinitions()
│  │   │     └── ConfigurationClassParser.parse()
│  │   │      ├── parse()
│  │   │      ├── processConfigurationClass()
│  │   │      ├── doProcessConfigurationClass() -> 여기서 읽어온 bean definition 을 만듬
│  │   │      └── ComponentScanAnnotationParser.parse()
│  │   │       └── ClassPathBeanDefinitionScanner.doScan()
│  │   │        ├── findCandidateComponents()
│  │   │        └── scanCandidateComponents() -> 컴포넌트 스캔
│  │   │         └── Resource[] resources = getResourcePatternResolver().getResources(packageSearchPath);
│  │   └── finishBeanFactoryInitialization() -> 여기서 Bean 생성
│  │    └── DefaultListableBeanFactory.preInstantiateSingletons()
AbstractBeanFactory.getBean
doGetBean




packageSearchPath = classpath*:app/**/*.class
getResourcePatternResolver = AnnotationConfigServletWebServerApplicationContext <- GenericApplicationContext
GenericApplicationContext.getResources("classpath*:app/**/*.class")


PathMatchingResourcePatternResolver.findPathMatchingResources()
findAllClassPathResources("app/")
AppClassLoader












SpringApplication.
│  ├──
│  └── gradle-wrapper.properties
```
* main, SpringApplication run
* SpringApplication.prepareContext
* SpringApplication.refreshContext
* AbstractApplicationContext.refresh
* AbstractApplicationContext.invokeBeanFactoryPostProcessors
* PostProcessorRegistrationDelegate.invokeBeanFactoryPostProcessors
