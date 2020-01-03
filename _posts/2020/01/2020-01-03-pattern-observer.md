---
layout: post
title: "Observer pattern"
date: 2020-01-03
tags: design-pattern
---

따로 interface 를 만들지 않고 jdk 의 `java.util.Observable` class 와 `java.util.Observer` interface 를 이용했다.
`Observable` 에 `Observer` 구현체를 등록하고 이벤트가 생겼을 시 `Observable` 의 `setChanged()`, `notifyObservers(textInfo)` 두 함수를 호출하는 것이 핵심이다. 내부를 들여다보면 특별할 것은 없는 것 같은데, 멀티스레딩을 염두에 두고 만들어 진 구현체이니 굳이 내가 구현할 필요는 없을 듯 하다.

``` java
package com.harm.unit;

public interface Unit {
	public Object execute(Object[] obj) throws Exception;
}//END OF INTERFACE
```

``` java
package com.harm.unit.pattern.observer;

import com.harm.unit.Unit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ObserverPatternStudy001 implements Unit {

	private Logger logger = LoggerFactory.getLogger(ObserverPatternStudy001.class);

	@Override
	public Object execute(Object[] obj) throws Exception {
		final int observerCnt = (Integer)obj[0];
		final int maxRandomValue = (Integer)obj[1];
		final int testCriteria = (Integer)obj[2];

		this.logger.debug("OBSERVER COUNT : {}", observerCnt);
		this.logger.debug("MAX RANDOM VALUE : {}", maxRandomValue);
		this.logger.debug("TEST CRITERIA : {}", testCriteria);
		boolean flag = true;

		/* ObservableExte extends java.util.Observable
		 * ObservableExte can change its status and notify to observer
		 * by calling Observable.setChanged() and Observable.notifyObservers(Object arg);
		 *
		 */
		ObservableExte observable = new ObservableExte();
		for(int i=0; i<observerCnt; i++) {
			observable.addObserver(new ObserverImpl());
		}

		while(flag) {
			int randomValue = (int) (Math.random()*maxRandomValue);
			this.logger.debug("RANDOM GET {}", randomValue);
			if(randomValue < testCriteria) {
				observable.somethingUpdate("[ OBSERVERABLE RESULT : " + randomValue);
				flag = false;
				break;
			}
			Thread.sleep(1000L);
		}
		return flag;
	}
}
```

``` java
package com.harm.unit.pattern.observer;

import java.util.Observable;

public class ObservableExte extends Observable {
	public void somethingUpdate(String textInfo) {
		this.setChanged();
		this.notifyObservers(textInfo);
	}
}
```

``` java
package com.harm.unit.pattern.observer;

import java.util.Observable;
import java.util.Observer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ObserverImpl implements Observer {
	private Logger logger = LoggerFactory.getLogger(ObserverImpl.class);
	@Override
	public void update(Observable o, Object arg) {
		if(arg instanceof String) {
			this.logger.debug("{} : got this : {}", this.hashCode(), (String)arg);
		}
	}
}
```
