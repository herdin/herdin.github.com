---
layout: post
title: "URL encoding 이 뭐지"
date: 2020-11-26
tags: web
---

URL 에는 공백과 같은 특수문자들이 허용되지 않는다. 따라서 특수문자를 URL 에 파라미터로 담고 싶다면, 인코딩 해야한다. [RFC 3986](https://tools.ietf.org/html/rfc3986#section-2.2) 의 `section 2.2 Reserved Characters` 을 확인해보자.

##### 예약어로 지정되어 사용하면 안되는 특수문자들
```
!	*	'	(	)	;	:	@	&	=	+	$	,	/	?	#	[	]
```

##### 그냥 써도되는 애들
```
A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z
a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z
0	1	2	3	4	5	6	7	8	9	-	_	.	~
```

URL 인코딩하는 방식은 검색하면 많이나오니 적어놓을 필요까진 없고,  
% 에 ASCII 문자를 16진수 TEXT 로 적는 방식이다.
