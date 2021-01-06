---
layout: post
title: "javascript async await keyword"
date: 2019-12-18
tags: javascript writing
---

출처
- [자바스크립트 개발자라면 알아야 할 33가지 개념 #26 자바스크립트 : Async / Await](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-26-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Async-Await-2bjygyrlgw)


``` javascript
async function asyncTest() {
	let promise = new Promise((res,rej) => {
		setTimeout(() => {
			res('hello, async and await');
		}, 2000);
	});

	let waitfor = await promise;

	console.log('finnaly!! done');
}
```
