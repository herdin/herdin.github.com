---
layout: post
title: "jacoco report, sonar exclude 처리 (gradle kotlin dsl, 8.5)"
date: 2024-01-16
tags: gradle jacoco sonar
---

# GOAL
jacoco 와 sonar 가 도입되었는데,
jacoco report 생성에서 config package 를 제거하고 싶었고
sonar 에서도 config package 를 제거하고 싶었다.

> jacoco report 에서 제외가 되더라도 sonar 에서는 잡는다.
> 따로 따로 적용하는 것이 맞다.

# jacoco report 생성에서 제외하기
``` java
    tasks.withType<JacocoReport> {
        dependsOn(tasks.test)
        reports {
            xml.required.set(true)
            xml.outputLocation.set(file(jacocoReportPath))
        }
        // 구글링한 결과가 이부분이 많이 달라서 애먹었음. 보통 구글링에서는
        // classDirectories.files.collect 를 사용하는데 없는 메소드임.
        // 아마도 kotlin 버전차이가 아닐까 추측
        afterEvaluate {
            classDirectories.setFrom(files(classDirectories.files.map {
                fileTree(it).matching {
                    excludes.addAll(setOf("**/config/**"))
                }
            }
            ))
       }
    }
```

# sonar 에서 제외하기
``` java
    configure<SonarExtension> {
        properties {
            // ...
            property("sonar.exclusions", "**/config/**")
        }
    }
```