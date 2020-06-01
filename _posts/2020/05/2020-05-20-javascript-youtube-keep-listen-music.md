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
let conn = (() => {
	let countSkipAd = 0;
	function addCountSkipAd() { countSkipAd++; }
	function getCountSkipAd() { return countSkipAd; }

	let countStillWatch = 0;
	function addCountStillWatch() { countStillWatch++; }
	function getCountStillWatch() { return countStillWatch; }

	let countCloseOverlayAd = 0;
	function addCountCloseOverlayAd() { countCloseOverlayAd++; }
	function getCountCloseOverlayAd() { return countCloseOverlayAd; }

	function prev() { document.getElementsByClassName('ytp-prev-button ytp-button')[0].click(); }
	function next() { document.getElementsByClassName('ytp-next-button ytp-button')[0].click(); }

	return {
		addCountSkipAd : addCountSkipAd,
		getCountSkipAd : getCountSkipAd,
		addCountStillWatch : addCountStillWatch,
		getCountStillWatch : getCountStillWatch,
		addCountCloseOverlayAd: addCountCloseOverlayAd,
		getCountCloseOverlayAd: getCountCloseOverlayAd,
		prev: prev,
		next: next,
	};
})();

let interval = setInterval(() => {
	let skipAdBtns = document.getElementsByClassName('ytp-ad-skip-button ytp-button');
	let stillWatchBtn = document.getElementById('confirm-button');
	let overlayAdCloseBtns = document.getElementsByClassName('ytp-ad-overlay-close-container');

	console.clear();
	let logText = ''
		+ ' %c skip ad button %c ' + (skipAdBtns != null && skipAdBtns.length > 0)
		+ ' %c still watch button %c ' + (stillWatchBtn != null && stillWatchBtn.parentElement.parentElement.parentElement.parentElement.style.display != 'none')
		+ ' %c close overlay ad button %c ' + (overlayAdCloseBtns != null && overlayAdCloseBtns.length > 0)
		;
	console.log(' ' + new Date());
	console.log(logText,
		'font-weight: normal; color: black',
		'font-weight: bold; color: blue',
		'font-weight: normal; color: black',
		'font-weight: bold; color: red',
		'font-weight: normal; color: black',
		'font-weight: bold; color: green');
	logText = ''
		+ ' %c skip ad %c' + conn.getCountSkipAd()
		+ ' %c still watch %c' + conn.getCountStillWatch()
		+ ' %c close overlay ad %c' + conn.getCountCloseOverlayAd()
		;
	console.log(logText,
		'font-weight: normal; color: black',
		'font-weight: bold; color: blue',
		'font-weight: normal; color: black',
		'font-weight: bold; color: red',
		'font-weight: normal; color: black',
		'font-weight: bold; color: green');

	if(skipAdBtns != null && skipAdBtns.length > 0) {
		skipAdBtns[0].click();
		conn.addCountSkipAd();
	}

	if(stillWatchBtn != null) {
		let dialogDiv = stillWatchBtn.parentElement.parentElement.parentElement.parentElement;
		if(dialogDiv.style.display != 'none') {
			stillWatchBtn.click();
			conn.addCountStillWatch();
		}
	}

	if(overlayAdCloseBtns != null && overlayAdCloseBtns.length > 0) {
		overlayAdCloseBtns[0].click();
		conn.addCountCloseOverlayAd();
	}

}, 1*1000);
```
