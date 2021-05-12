---
layout: post
title: "Blocking vs None Blocking vs Sync vs ASync"
date: 2021-05-12
tags: async
---

> 내맘대로 이해한 blocking vs none blocking vs sync vs async  
> 뭔가 좀 석연찮지만, 조금 더 이해가 된 것 같다.

#### Blocking - Sync

``` javascript
let user = blockingSelectUserFromDatabase(); //데이터베이스에서 데이터를 가져올 떄까지 return 되지 않는다. cpu 도 기다린다. -> blocking

if(user.isDeleted()) { //데이터를 가져올 때까지 기다린 다음 바로 연관된 작업을 한다 -> sync
  deleteUserAction();
}

return user;
```

#### Blocking - Async

``` javascript
let user = await blockingSelectUserFromDatabase(); //데이터베이스에서 데이터를 가져올 떄까지 return 되지 않지만, cpu 는 다른 작업을 수행한다. -> blocking, async

if(user.isDeleted()) { //데이터를 가져올 때까지 기다린 다음 바로 연관된 작업을 한다 -> sync ... ?
  deleteUserAction();
}

return user;
```

#### None Blocking - Sync

``` javascript
let futureUser = noneblockingSelectUserFromDatabase(); //데이터베이스에서 데이터를 가져오든말든 return 된다. -> none blocking

while(!futureUser.isDone()) {
  doSomethingOther(); //데이터베이스에서 데이터를 가져올때 까지, 딴짓을 한다. -> none blocking
}

if(futureUser.isDeleted()) { //데이터를 가져올 때까지 기다린 다음 바로 연관된 작업을 한다 -> sync
  deleteUserAction();
}

return user;
```

#### None Blocking - Async

``` javascript
let futureUser = noneblockingSelectUserFromDatabase(); //데이터베이스에서 데이터를 가져오든말든 return 된다. -> none blocking

futerUser.then((user) => { //return 된 객체에서 callback 함수 등록 -> async
  if(user.isDeleted()) {
    deleteUserAction();
  }
});

//연관된 작업을 하지 않는다. -> async

return futerUser;
```
