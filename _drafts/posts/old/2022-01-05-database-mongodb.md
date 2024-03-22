---
layout: post
title: "about mongodb"
date: 2022-01-05
tags: database nosql mongodb
---

# Replica Set

PSS: Primary, Secondary, Secondary
PSA: Primary, Secondary, Arbiter

데이터 서빙은 Primary 에서만. fail-over 발생 시 secondary 가 primary 로 승격되는 듯?

# Shard

말그대로 데이터를 나눠 가지며 shard 들 앞에 mongos 라는 router 서비스가 라우팅해준다.

# RDBMS 와 비교
rdbms = mongo
database = database
collection = table
row = document
column = field
table join = embedding or linking
primary key = object id

# 강의 요약
* document model database 중에서는 가장 많이 쓰인다
* basic concepts
    1. DBMS level scale out (sharding) : dbms 자체에 샤딩기능이 있다
    2. json style query language
    3. secondary index (document model 에서는 별로 없는 기능이다)
    4. schemaless (but noschema)
    5. performance
    6. consistency
* 15년도 3.0 버전 기준으로 많이 달라짐 (엔진이 달라져서 많이 빨라짐. 마치 mysql 의 MyISAM 과 InnoDB 처럼)
* 특징
    * 대소문자구분을 한다
    * max size of document : 16MB
* object id
    * 따로 _id field 를 정의하지 않으면 알아서 넣어준다
    * timestamp, machine, pid, increment 로 유니크하게 만든다
* 서버구성
    * replica set
        * primary, secondary 구조
        * fail-over 시 과반수 (50%초과) 멤버가 살아있어야한다 (투표로 primary 선정)
        * data 는 없고 vote 만하는 arbiter 라는 멤버를 둘 수 있다.
    * sharded cluster
        * router, config server, replica sets.. 구조
        * router 가 query 를 받으면 config server 를 통해 replica set 들에게 전달
        * collection 을 chunk 라는 논리적 단위로 나누어 관리
        * query 를 병렬처리할 수 있고 장비당 리소스/디스크 사용량이 감소
        * 분산 룰 선정이 어렵고, chunk migration 이 클러스터 전체에 영향을 줄 수 있음
* fail-over 시 primary 가 될 수 없는 경우
    * 설정에 secondary-only 로 설정한 경우
    * hidden secondary 인 경우 (batch,admin 용도?)
    * delayed secondary 인 경우
    * arbiter 인 경우
* consistency
    * write concern
        * 1 로 설정한 경우 primary 에만 쓰기 작업 완료 가 1 transaction
        * 2 인경우 primary, secondary (1) 에 쓰기 작업

```sql
-- #####################################
-- database
-- #####################################
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
-- #####################################
-- collection
-- #####################################
-- show all collection (table)
show collections
-- collection (table) drop
db.${collection}.drop()
-- collection (table) rename
db.${oldCollection}.renameCollection("newCollection")
;
db.${collection}.insert(documentJson)
db.${collection}.remove(criteria[, justOne])
-- #####################################
-- index
-- #####################################
-- 인덱스 만들기
db.${collection}.createIndex(document[, options])
-- 단일 필드 인덱스
db.${collection}.createIndex(
    { ${index_target_column1}: 1 } -- 1:asc -1:desc
)
-- 가중치 포함한 텍스트인덱스를 만들 경우
db.${collection}.createIndex(
    { ${index_target_column1}: "text", ${index_target_column2}: "text", ${index_target_column3}: "text"},
    { weights: {
        ${index_target_column1}: 2,
        ${index_target_column2}: 1.5,
        ${index_target_column3}: 1
    }}
)
-- 생성된 index 확인
db.${collection}.getIndexes()
db.${collection}.dropIndex(document)
-- index 삭제
db.${collection}.dropIndex() -- _id index 빼고 모두 삭제
-- text search 를 위한 index 생성
db.${collection}.createIndex(
    {}, -- keys
    {}, -- options
    {}, -- commitQuorum
)
db.${collection}.createIndex({ category: 1 }) -- 단일 인덱스 category column 에 asc(1) index
-- 복합 인덱스 category column 에 asc(1), score column 에 desc(-1) index
-- 이런 경우에는 index 순서가 중요하다. score 하나로 검색할 경우 성능이 나오지않음. category 정렬안에서 score 가 정렬되기 때문
db.${collection}.createIndex({ category: 1, score: -1 })

db.${collection}.createIndex(
    -- keys
    {
        ${target_column_name} : "text"
        -- text, geospatial, hashed indexes
        -- ... 여러컬럼 가능
        -- 모든 컬럼에 대해서 하려면
        -- "$**" : "text"
    },
    -- options
    {

    },
    -- commitQuorum
    {

    }
);
-- #####################################
-- select : db.collection.find( <query>, <filter>, <options> )
-- #####################################
-- select insert
db.${insertCollection}.insertMany(
    db.${selectCollection}.aggregate([{ $sample: { size: 5000 } }]).toArray()
)
;
-- select : text search
db.${collection}.find(
    { $text: { $search: "${search target text}" } },
    { score: { $meta: "textScore" } }
)
.sort(
    { score: { $meta: "textScore" } }
)
-- explain : https://www.mongodb.com/docs/manual/reference/explain-results/
db.${collection}.find().explain()
db.${collection}.find().explain("executionStats").executionStats.executionTimeMillis

-- hint 해당 조건으로 인덱스가 있는지? 확인? 이건 잘 안봄
db.${collection}.find().hint({})
-- select : column name 만 사용
db.${collection}.find(
    {
        "_id.your.key.path": NumberLong("123")
        -- "_id.your.key.path": 123 -- 그냥 이렇게 해도 된다
        "_id.your.oanother.key.path":  NumberLong("456")
    },
)
-- select : $eq 사용
db.${collection}.find(
    {
        "_id.your.key.path": {
            $eq: NumberLong("123")
        },
        "_id.your.oanother.key.path": {
            $eq: NumberLong("456")
        },
    },
)
;
-- select : $gt 사용, date time 인 경우
db.${collection}.find(
    {
        "created": {
            "$gte" : ISODate("2024-02-02T09:48:44.282Z")
        }
    }
)
;
-- 인덱스 사용 통계
db.${collection}.aggregate( [ { $indexStats: { } } ] )
;
-- select join by aggregation
db.${collection}.aggregate(
    -- left join 같은거
    {
        $lookup: {
            from: "${lookUpTargetCollection}",
            localField: "${field of this collection}",
            foreignField: "${field of lookUpTargetCollection}",
            as: "${alias of lookUpTargetCollection}"
        }
    },
    -- id 로 lookup 했을 경우 하나만 나오기 때문에 array 를 하나의 object 로 풀어준다
    {
        $unwind: "${alias of lookUpTargetCollection}"
    },
    -- 이런식으로 count 를 할 수도 있다.
    {
        $count: "artist_nm"
    }
)
;
-- #####################################
-- aggregate : db.collection.aggregate( <pipeline: array>, <options: document> )
-- pipeline 은 aggregate stage 들로 구성된다. : https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/
-- stage 안에서 사용할 수 있는 operator 들 : https://www.mongodb.com/docs/manual/reference/operator/aggregation/add/
-- #####################################
-- created : 2024-02-18T17:32:46.069Z 이런 필드가 있다면 zone 을 변경해서 보기위해 아래와 같이 할 수 있다.
db.artistGroupInfo.aggregate(
    {
        -- stage
        $addFields: {
            createdKST: {
                -- operator
                $add: [ "$created", 9*60*60*1000 ]
            }
        }
    }
)
;

-- aggregation 을 활용한 join delete
db.${collection}.aggregate(
    {
        $lookup: {
            from: "test2",
            localField: "id",
            foreignField: "id",
            as: "test2"
        }
    },
    -- 이부분은 필요 없긴 함
    {
        $unwind: "$test2"
    }
).forEach(function(doc) {
    db.test1.deleteMany({ "id": doc["id"]})
})
;
-- update
db.${collection}.update(
    {}, -- query : find 의 query 와 동일
    {}, -- update
)
;
-- update : example
db.${collection}.update(
    {
        "_id.someInnerId": 5,
    },
    {
        $set: {
            "age": 22
        }
    }
)
;
-- #####################################
-- mapReduce : db.collection.mapReduce( .. )
-- Performs map-reduce aggregation for large data sets.
-- 이런게 있는데 나중에 알아보장
-- #####################################
```

참고
- [MongoDB 명령어 (database, collection, document, query, cursor, index)](https://sjh836.tistory.com/100)
* [MongoDB - Replica와 Shard 기본 개념](https://velog.io/@ysong0504/MongoDB-Replica%EC%99%80-Shard-%EA%B8%B0%EB%B3%B8-%EA%B0%9C%EB%85%90)
* [MongoDB 명령어](https://sjh836.tistory.com/100)