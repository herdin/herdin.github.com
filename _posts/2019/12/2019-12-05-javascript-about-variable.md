---
layout: post
title: "javascript var let const 에 대해서"
date: 2019-12-05
tags: javascript
---

ES5 까지는 변수 선언 키워드가 `var` 밖에 없었다.

## `var` 의 특징
- 함수 레벨의 스코프 : 전역변수 남용 가능성 증가, 반복문의 변수 재사용 가능성
- 키워드 생략 가능 : 전역변수 남용 가능성 증가
- 변수 중복 선언 가능 : 의도치 않은 변수값 변경 가능
- 변수 호이스팅

ES6 에서 이런 문제들을 해결하고자 `let`, `const` 키워드가 도입되었다.

## `let/const` 의 특징

- 블록 레벨의 스코프
- 변수 중복 선언 불가

호이스팅은 되지만, TDZ(Temporal Dead Zone) 에 의해, 변수가 초기화되기 전에 엑세스를 하려고하면 ReferenceError 가 발생한다.

변수는 그들의 어휘적 환경에 포함될 때 생성되지만, 어휘적 바인딩이 실행되기 전까지는 액세스할 수 없다.
어휘적 바인딩이 실행되기 전까지 액세스할 수 없는 현상을 TDZ라고 한다.
> 와 내가 읽어도 뭔지 모르겠네, 아래서 다시설명

## 음, 잘 안와닿는데?

위에서 `var` 는 함수레벨 스코프, 그리고 `let` 은 블록 레벨 스코프라는 말을 썻는데, 직접 보는게 빠르다

``` javascript
function variableTest() {
    //console.log('start of function', var01, let01); // 1)
    var var01 = 10;
    let let01 = 11;
    console.log('inner function, outer block', var01, let01);
    {
        //console.log('inner function, inner block', var01, var02, let01, let02); // 2)
        var var02 = 20;
        let let02 = 22;
        console.log('inner function, inner block', var01, var02, let01, let02);
    }
    //console.log('inner function, outer block', var01, var02, let01, let02); // 3)
    console.log('inner function, outer block', var01, var02, let01);
}
variableTest();
```

- 1), 2) 초기화전에 `let let01` 접근 -> 에러
- 3) 스코프가 종료되어서 변수 역시 사라진다 -> 에러


변수를 선언하고 할당하는 것은 3단계에 걸쳐서 진행된다.
- 선언 단계(Declaration phase) : 변수를 실행 컨텍스트의 변수 객체(Variable Object)에 등록한다. 이 변수 객체는 스코프가 참조하는 대상이 된다.
- 초기화 단계(Initialization phase) : 변수 객체(Variable Object)에 등록된 변수를 위한 공간을 메모리에 확보한다. 이 단계에서 변수는 undefined로 초기화된다.
- 할당 단계(Assignment phase) : undefined로 초기화된 변수에 실제 값을 할당한다.

여기서 `var` 키워드로 선언된 변수는, 선언과 초기화가 동시에 이루어진다.  
하지만 `let` 키워드로 선언된 변수는, 선언과 초기화가 분리되어 이루어진다.  
그리고 초기화 이전의 변수를 접근하려고하면 참조 에러(ReferenceError)가 발생한다.  
스코프의 시작 지점부터 초기화 시작 지점까지의 구간을 일시적 사각지대(Temporal Dead Zone; TDZ) 라고 부른다.

또한 `var` 키워드로 선언된 변수는 함수 스코프 이므로, 함수 밖에 선언되었으면 전역변수이고, 함수안에 선언되었으면, 그것이 함수 내부의 블록이든 아니든 함수 스코프로 고정이 된다.


출처
- [let, const와 블록 레벨 스코프](https://poiemaweb.com/es6-block-scope)
