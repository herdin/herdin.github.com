---
layout: post
title: "about mongodb"
date: 2022-01-05
tags: database nosql mongodb
---

collection = table

```sql
--current db
db

--db list
show dbs

-- use db
use ${db name}

-- db status
db.stats()

-- drop database
db.dropDatabase()


show collections

db.${collection}.drop()

db.${oldCollection}.renameCollection("newCollection")

db.${collection}.insert(documentJson)

db.${collection}.remove(criteria[, justOne])

db.${collection}.createIndex(document[, options])
db.${collection}.getIndexes()
db.${collection}.dropIndex(document)

```

참고
- [MongoDB 명령어 (database, collection, document, query, cursor, index)](https://sjh836.tistory.com/100)