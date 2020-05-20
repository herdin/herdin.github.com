---
layout: post
title: "유튜브 영상으로 음악 계속 듣기, keep listening music without disturbing"
date: 2020-05-20
tags: javascript
---

일할떄 유튜브로 음악을 틀어놓는데,

프리미엄이 아니라서 자꾸 광고가 뜨거나, 오래 틀어 놓았을 때, 계속 보냐고 물어보면서 멈출 때가 있다.

그게 귀찮아서 스크립트를 짯다. 언제 유튜브에서 바꿀진 모르겠지만, 2020-05-20 기준 잘된다.

그대로 복붙해서 console 에 넣는다.

``` javascript
let db = (() => {
	let skipCount = 0;
	let watchCount = 0;
	function addSkipCount() {
		skipCount++;
	}
	function addWatchCount() {
		watchCount++;
	}
	function getSkipCount() { return skipCount; }
	function getWatchCount() { return watchCount; }
	return {
		addSkipCount : addSkipCount,
		addWatchCount : addWatchCount,
		getSkipCount : getSkipCount,
		getWatchCount : getWatchCount,
	};
})();

let interval = setInterval(() => {
	let adSkipBtns = document.getElementsByClassName('ytp-ad-skip-button ytp-button');
	let keepWatchBtn = document.getElementById('confirm-button');
	let dialogDiv = keepWatchBtn.parentElement.parentElement.parentElement.parentElement;

	console.clear();
	console.log(new Date(), 'ad skip button checked ->', adSkipBtns, 'keep watch dialog display ->', dialogDiv.style.display);
	console.log('skip count', db.getSkipCount(), 'watch count', db.getWatchCount());

	if(adSkipBtns != null && adSkipBtns.length > 0) {
		document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0].click();
		db.addSkipCount();
	}
	if(dialogDiv.style.display != 'none') {
		keepWatchBtn.click();
		db.addWatchCount();
	}
}, 1*1000);

```
