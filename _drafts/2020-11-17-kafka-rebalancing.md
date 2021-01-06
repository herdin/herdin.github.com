---
layout: post
title: "Apache Kafka 리밸런싱"
date: 2020-11-17
tags: middleware queue kafka
---

> Kafka 로 실습을 해보던 중에, 컨슈머 그룹에 컨슈머가 새로 들어오거나 사라져서 리밸런싱이 필요하게되면  
> 컨슈머 코디네이터는 그룹 리밸런싱 메세지를 받고, generation 이 증가하면서 새로 메세지를 받는다.  
> 예전에 모두 처리한 메세지임에도 불구하고!!  
> 이거 왜이러지? 이러면 계속 재처리될거아냐. 그래서 찾아보게되었다.  
> 하지만 별게아니었다..... 그냥 내가 잘 모르고 못쓰는거..


참고
- [What happens when a new consumer joins the group in Kafka?](https://chrzaszcz.dev/2019/06/kafka-rebalancing/)
