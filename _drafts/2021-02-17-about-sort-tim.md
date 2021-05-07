---
layout: post
title: "간단한 정렬 정리"
date: 2021-01-08
tags: algorithm
---

#### Tim sort, best=O(n), average=O(nlogn), worst=O(nlogn), memory=O(n)
> memory 는 O(n) 보다 적은 수준

2002년, Tim Peters 가 개발. Insertion sort 와 Merge sort 를 결합한 모양이다.

Insertion Sort 는 average=O(n^2) 이다. 하지만 인접한 메모리의 비교를 하기 때문에, 참조 지역성의 원리를 잘 만족하고, n 이 작은 경우에는 Quick Sort 보다 Insertion Sort 가 더 빠르다고 한다.

> Insertion Sort = Ci * O(n^2)  
> Quick Sort     = Cq * O(n * log n) 이라고 할때, (C 는 상수)  
> 작은 n 에 한하여 (Ci * n^2) < (Cq * n * log n) 이 성립한다고 한다. 는데 이해가 안된다.  
> 작은 n 이라면..  
> n=1,   
> Ci * 1 < Cq * 1 * log 1 ---> Ci < 0 ??  
> n=2,  
> Ci * 2 * 2 < Cq * 2 * log 2 ---> 4Ci < 2Cq ??  
> Ci * 3 * 3 < Cq * 3 * log 3 ---> 9Ci < 3Cq * log 3 ??  
> 이해가 안되면 외우자 ^^; 아무튼 그래

위의 원리를 이용하여, 작은 덩어리로 자른 뒤, 각 덩어리에 대해서 Insertion Sort 를 하면 더 빠르지 않을까 라고 생각한 것이 기본 아이디어다.

참고
- [Tim sort에 대해 알아보자](https://d2.naver.com/helloworld/0315536)
- [Tim sort - wikipedia](https://en.wikipedia.org/wiki/Timsort)
