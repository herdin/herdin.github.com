---
layout: post
title: "Promise 의 상태를 보려면"
date: 2019-09-17
tags: javascript promise
---

관련 포스트
- [Promise 가 뭐지]({{ site.url}}/javascript-promise)

> 내마음대로 지껄일거야 틀려도몰라 흥흥

javascript Promise 객체에는 세가지 상태가 있다.
- pending
- resolved
- rejected

명칭만 봐도 직관적으로 알겠다.
> browser console 창에서는 resolved 로 되어있는데 fulfilled 가 맞는지 잘 모르겠다. 아무튼.

아무튼. 이 상태를 직접 읽어올 방법이 없는 듯 한데..

[출처](https://ourcodeworld.com/articles/read/317/how-to-check-if-a-javascript-promise-has-been-fulfilled-rejected-or-resolved)

``` javascript
/**
 * This function allow you to modify a JS Promise by adding some status properties.
 * Based on: http://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved
 * But modified according to the specs of promises : https://promisesaplus.com/
 */
function MakeQuerablePromise(promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isResolved) return promise;

    // Set initial state
    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    var result = promise.then(
        function(v) {
            isFulfilled = true;
            isPending = false;
            return v;
        },
        function(e) {
            isRejected = true;
            isPending = false;
            throw e;
        }
    );

    result.isFulfilled = function() { return isFulfilled; };
    result.isPending = function() { return isPending; };
    result.isRejected = function() { return isRejected; };
    return result;
}
```

사용법은 아래와 같다..
> 그냥 복붙한 것 같아서 꼐림칙하지만.. ㅠㅠ 기록이니깐..

``` javascript
// Your promise won't cast the .then function but the returned by MakeQuerablePromise
var originalPromise = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve("Yeah !");
    },10000);
});

var myPromise = MakeQuerablePromise(originalPromise);

console.log("Initial fulfilled:", myPromise.isFulfilled());//false
console.log("Initial rejected:", myPromise.isRejected());//false
console.log("Initial pending:", myPromise.isPending());//true

myPromise.then(function(data){
    console.log(data); // "Yeah !"
    console.log("Final fulfilled:", myPromise.isFulfilled());//true
    console.log("Final rejected:", myPromise.isRejected());//false
    console.log("Final pending:", myPromise.isPending());//false
});
```

간단한 `wrapping function` 과 `closure scope` 를 이용하여 상태를 알 수 있게 되었다!!
