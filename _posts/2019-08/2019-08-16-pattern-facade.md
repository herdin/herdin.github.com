---
layout: post
title: "Facade pattern"
date: 2019-08-14
tags: design-pattern
---

Facade 의 사전적 의미
> 파사드(프랑스어: Façade)는 건물의 출입구로 이용되는 정면 외벽 부분을 가리키는 말이다.  
> 한글화하여 순화하려면 '정면'(正面)이 무난할 것으로 여겨진다.
> 건축에서 파사드의 궁극적 목적은 '소통'이다. 건물의 입면이 다양해지면서 파사드는 건물 외피 전체를 의미하기도 한다.
> [wiki](https://ko.wikipedia.org/wiki/파사드)

어떤 작업을 할때 작업단위의 일련의 작업을 한다고하면, 일련의 작업을 단순화 시키는 패턴을 의미한다. [좀더 자세하고 명확한 해설은 wiki 로](https://ko.wikipedia.org/wiki/퍼사드_패턴)

똥을 싸기위해

1. 양변기뚜껑을 열고
2. 바지를 내리고
3. 팬티를 내리고
4. 힘을 준다

라는 일련의 작업이 있으면 이를

1. 똥을 싼다.

로 줄이는 것을 말한다.

코드로 보면..

먼저 변기 클래스

``` java
package com.harm.unit.pattern.facade;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Toilet {
    private Logger logger = LoggerFactory.getLogger(Toilet.class);
    public int openCover(int sequence) throws Exception {
        if(sequence == 0) {
            this.logger.debug("OPEN COVER");
        } else {
            throw new Exception("NO PROPER SEQUENCE");
        }
        return ++sequence;
    }
}
```

바지 클래스

``` java
package com.harm.unit.pattern.facade;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Pants {
    private Logger logger = LoggerFactory.getLogger(Pants.class);
    public int lower(int sequence) throws Exception {
        if(sequence == 1) {
            this.logger.debug("LOWER PANTS");
        } else {
            throw new Exception("NO PROPER SEQUENCE");
        }
        return ++sequence;
    }
}
```

팬티 클래스

``` java
package com.harm.unit.pattern.facade;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Underwear {
    private Logger logger = LoggerFactory.getLogger(Underwear.class);
    public int lower(int sequence) throws Exception {
        if(sequence == 2) {
            this.logger.debug("LOWER UNDERWEAR");
        } else {
            throw new Exception("NO PROPER SEQUENCE");
        }
        return ++sequence;
    }
}
```

궁둥이 클래스

``` java
package com.harm.unit.pattern.facade;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Ass {
    private Logger logger = LoggerFactory.getLogger(Ass.class);
    public int bigShoot(int sequence) throws Exception {
        if(sequence == 3) {
            this.logger.debug("POOOOOOOOOOOOOOOO-POOOOOOOOOOOOOOOO-");
        } else {
            throw new Exception("NO PROPER SEQUENCE");
        }
        return ++sequence;
    }
}
```

위의 `Toilet`, `Pants`, `Underwear`, `Ass` class 들은 논리적으로 긴밀하게 연결되어 있다.  
순서가 잘못되면 오류가 난다. 위의 4개의 class 를 이용해서 똥을 싸려면.

``` java
package com.harm.unit.pattern.facade;

import com.harm.unit.Unit;

public class FacadeStudy001 implements Unit {

    @Override
    public Object execute(Object[] obj) throws Exception {
        int sequence = -1;

        sequence = 0;
        sequence = new Toilet().openCover(sequence);
        sequence = new Pants().lower(sequence);
        sequence = new Underwear().lower(sequence);
        sequence = new Ass().bigShoot(sequence);

        return null;
    }
}
```

위와 같은 과정을 거쳐야 하지만...  
`Facade` pattern 을 적용한 `DoNumberTwo` class 를 설계한다면..

``` java
package com.harm.unit.pattern.facade;

public class DoNumberTwo {
    private Toilet toilet;
    private Pants pants;
    private Underwear underwear;
    private Ass ass;
    public DoNumberTwo(Toilet toilet, Pants pants, Underwear underwear, Ass ass) {
        this.toilet = toilet;
        this.pants = pants;
        this.underwear = underwear;
        this.ass = ass;
    }
    public void bigShoot(int sequence) throws Exception {
        sequence = this.toilet.openCover(sequence);
        sequence = this.pants.lower(sequence);
        sequence = this.underwear.lower(sequence);
        sequence = this.ass.bigShot(sequence);
    }
}
```

아래와 같이 코드가 줄어듬과 동시에 가독성이 좋아지게 된다.

``` java
package com.harm.unit.pattern.facade;

import com.harm.unit.Unit;

public class FacadeStudy001 implements Unit {

    @Override
    public Object execute(Object[] obj) throws Exception {
        int sequence = -1;

        sequence = 0;
        new DoNumberTwo(new Toilet(), new Pants(), new Underwear(), new Ass()).bigShoot(sequence);

        return null;
    }
}
```
