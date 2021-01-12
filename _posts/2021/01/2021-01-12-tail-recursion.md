---
layout: post
title: "Tail Call, Tail Recursion"
date: 2021-01-07
tags: optimazation
---

> 9년차 개발자란놈이 어떻게 매일매일 신기한걸 배울 수 있을까. 한-심.

## Tail Call ?
함수에서 리턴되기 마지막 연산이 함수호출일 경우, 그 호출을 `Tail Call` 이라부른다.

## Tail Recursion ?
재귀함수의 가장 큰 문제인 Stack Overflow 를 컴파일러 단계에서 해결해주는 것으로,
재귀함수를 Tail Call 형식으로 짜게되면, 컴파일 단계에서 재귀가 아닌 loop 형식으로 변경해준다.

그리고 이렇게 컴파일링 단계에서 재귀함수를 변경시켜주는 작업을 Tail Call Recursive Optimization 라 한다.

* javascript 는 ES2015(ES6) 에서 Tail Call Recursive Optimization 을 지원하지만, 그 당시 브라우저는 지원하지 않았고, 현재는 브라우져 별로 확인해봐야한다.
* java 는 jdk8 기준으로 지원하지 않는다. 추후에 지원할거라 한다.

## 예제

``` javascript
//일반적인 피보나치 재귀함수
function fibonacci_recursion(n) {
    if(n <= 1) {
        return n;
    }
    return fibonacci_recursion(n-2) + fibonacci_recursion(n-1);
}
//루프를 이용한 피보나치 재귀함수
function fibonacci_loop(n) {
    if(n <= 1) {
        return n;
    }
    let pre_2 = 0;
    let pre_1 = 1;
    let fibonacci = 1;

    for(let i=2; i<=n; i++) {
        fibonacci = pre_2 + pre_1;
        pre_2 = pre_1;
        pre_1 = fibonacci;
    }
    return fibonacci;
}
//tail call 을 이용한 피보나치 재귀함수
function fibonacci_tailRecursion(n) {
    function innerFibonacci(n, start, ppFibo, pFibo) {
        if(n > start) {
            return innerFibonacci(n, start+1, pFibo, ppFibo + pFibo);
        } else {
            return ppFibo + pFibo;
        }
    }
    return innerFibonacci(n, 2, 0, 1);
}

//각 함수별 비교를 위한 실행/로깅함수
function fibonacci_logger(fibonacciFunc, n) {
    let start, end;
    start = new Date().getTime();
    let result = fibonacciFunc(n);
    end = new Date().getTime();
    console.log(`fibonacci ${n} with ${fibonacciFunc.name} is ${result}, execution time ${end-start}`);
}

//각 함수를 비교
function fibonacci_diff(n) {
    fibonacci_logger(fibonacci_recursion, n);
    fibonacci_logger(fibonacci_loop, n);
    fibonacci_logger(fibonacci_tailRecursion, n);
}

fibonacci_diff(10);
fibonacci_diff(20);
fibonacci_diff(30);
fibonacci_diff(40);
fibonacci_diff(50);
fibonacci_diff(60);
```

비교해보면, 어느순간부터 `fibonacci_recursion` 때문에 브라우저가 맛탱이가 간다. 일반 재귀함수만 제거하고 돌려보면 잘 도는 것을 확인할 수 있다.

참고
- [재귀, 반복, Tail Recursion](https://homoefficio.github.io/2015/07/27/%EC%9E%AC%EA%B7%80-%EB%B0%98%EB%B3%B5-Tail-Recursion/)
- [Tail Call Optimization implementation in Javascript Engines](https://stackoverflow.com/questions/54719548/tail-call-optimization-implementation-in-javascript-engines)
- [Tail call Optimization](http://wiki.sys4u.co.kr/display/SOWIKI/Tail+call+Optimization)
