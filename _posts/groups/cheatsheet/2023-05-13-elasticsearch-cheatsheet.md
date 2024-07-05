---
layout: post
title: "elasticsearch cheatsheet"
date: 2023-05-13
tags: es cheatsheet
---


``` shell
# cluster health 확인
GET /_cat/health?v

# 모든 index 확인
GET /_cat/indices?v

# index 삭제
DELETE /{your index name}

# count
GET /{your index name}/_count
{
  "query": {
    "match_all": {}
  }
}

# max result window 설정
PUT /{your index name}/_settings
{
  "index": {
    "max_result_window": 500000
  }
}

# get
GET /{your index name}/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "_id": "1234567890"
          }
        }
      ]
    }
  }
}

GET /{your index name}/_search
{
  "query": {
    "match_all": {}
  },
  "size": 200
}

GET /{your index name}/_search
{
  "query": {
    "match": {
      "my-id": "wow-my-id-12345"
    }
  },
  "size": 200
}

GET /{your index name}/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "my-id": "wow-my-id-12345" } }
        # { "match": { "__deleted": "true" } }
      ]
    }
  }
}

# 전체 삭제
POST /{your index name}/_delete_by_query
{
  "query": {
    "match_all": {}
  }
}

POST /{your index name}/_delete_by_query
{
  "query": {
    "match": {
      "my-name" : "hello 1234"
    }
  }
}
```