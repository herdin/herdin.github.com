// ######################################################
// nightcrows
// ######################################################
// https://www.nightcrows.co.kr/guide/probability/3
// 확율 계산표
Array.from(document.querySelectorAll('table')[4].querySelectorAll('tr')).forEach(tr => {
	console.log(tr);
	let tds = tr.querySelectorAll('td');
	if (tds)
	console.log(tds);
});


Array.from(document.querySelectorAll('table')[4].querySelectorAll('tr')).reduce((result, curr, index, arr) => {
	let tds = Array.from(curr.querySelectorAll('td'));
	if (tds.length != 4) {
		return result;
	}
	let name = tds[0].innerText;
	let grade = tds[1].innerText;
	let count = tds[2].innerText;
	let perStr = tds[3].innerText;
	console.log(`${name} - ${grade} - ${count} - ${perStr}`);
	if (grade == '전설') {
		result = result + Number(perStr.replace('%', ''))
		console.log('found 전설', result);
		return result;
	}
	return result;
}, 0);