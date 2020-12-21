---
layout: post
title: "PostgreSQL 기본"
date: 2020-01-14
tags: database postgresql opensource 
---

사내 스터디 `hamhuman` 에서 진행하는 각자 서비스 만들기 에서 정한 databse 는 PostgreSQL.

학습해본다. 클라이언트는 `psql` 를 사용했다.
> 단순 DML 은 intelliJ 의 client 를 사용했다. `\d` 같은 명령어라던지, multiple primary key 같은 경우는 intelliJ 의 client 에서 에러가 난다.

# psql 로 접속하기

> 왜 비밀번호는 묻지않는지 잘 모르겠다

``` shell
Connection options:
  -h, --host=HOSTNAME      database server host or socket directory (default: "local socket")
  -p, --port=PORT          database server port (default: "5432")
  -U, --username=USERNAME  database user name (default: "root")
  -w, --no-password        never prompt for password
  -W, --password           force password prompt (should happen automatically)

$ psql -U postgres
$ psql --dbname=<DB_NAME> --username=<USER_NAME>
```

# 정보 확인

```
# database 의 relation 확인
$ \d
# database 의 System table 확인
$ \dS
# database 의 table 확인
$ \dt
# database 의 view 확인
$ \dv
# 다른 databse 에 접속
$ \c <DATABSE_NAME>
```
# ORACLE -> PostgreSQL 다른 점

``` sql
select 1 from dual        /*->*/ select 1
select sysdate from dual  /*->*/ select now()
select nvl(null, 'this is null') from dual /*->*/ select coalesce(null, 'this is null')
select sequence_name.nextval from dual /*->*/ select nextval('sequence_name')
```

# 데이터 타입

char 는 고정형
varchar 는 가변형
> 뭐 특이할건 없군

# DATABASE 관리

``` sql
-- 데이터베이스 목록 조회
\l
-- 데이터베이스 접속
\c DATABASE_NAME
select datname from pg_database;
create database database_name;
drop database database_name
```

# USER 관리

``` sql
--user 확인
select usename from pg_user;
--user 만들기
create user mytestuser;

--user 권한 확인
select * from pg_shadow;
--user 권한설정
grant update on accounts to joe;
grant select on accounts to group staff;
revoke all on accounts from public;
grant all privileges on database mytestdb to mytestuser;
grant all privileges on TABLE_NAME to USER

--user 비밀번호 변경
alter user mytestuser password 'password1234'

```
# TABLE 관리
``` sql
-- 테이블 목록 조회
\dt
-- 테이블 정보 조회
\d TABLE_NAME
-- 테이블 권한 조회
\z TABLE_NAME

create table TABLE_NAME (
  COLUMN_NAME varchar(100),
  constraint CONSTRAINT_NAME primary key(COLUMN_NAMES, ...)
);
```

# CONSTRAINT 관리
``` sql
--table constraints 조회
select * from information_schema.table_constraints where table_name = 'TABLE_NAME'
--constraint 컬럼 조회
select * from information_schema.constraint_column_usage where constraint_name = 'CONSTRAINT_NAME';
--table constraints 추가
alter table TABLE_NAME add constraint CONSTRAINT_NAME primary key(COLUMN_NAMES, ...);
--table constraints 삭제
alter table TABLE_NAME drop constraint [if exists] CONSTRAINT_NAME column_name [restrict | cascade]
--table column 추가
alter table TABLE_NAME add column COLUMN_NAME COLUMN_TYPE
--table column 변경
alter table TABLE_NAME rename column

ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ]
    action [, ... ]
ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ]
    RENAME [ COLUMN ] column_name TO new_column_name
ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ]
    RENAME CONSTRAINT constraint_name TO new_constraint_name
ALTER TABLE [ IF EXISTS ] name
    RENAME TO new_name
ALTER TABLE [ IF EXISTS ] name
    SET SCHEMA new_schema

where action is one of:

    ADD [ COLUMN ] column_name data_type [ COLLATE collation ] [ column_constraint [ ... ] ]
    DROP [ COLUMN ] [ IF EXISTS ] column_name [ RESTRICT | CASCADE ]
    ALTER [ COLUMN ] column_name [ SET DATA ] TYPE data_type [ COLLATE collation ] [ USING expression ]
    ALTER [ COLUMN ] column_name SET DEFAULT expression
    ALTER [ COLUMN ] column_name DROP DEFAULT
    ALTER [ COLUMN ] column_name { SET | DROP } NOT NULL
    ALTER [ COLUMN ] column_name SET STATISTICS integer
    ALTER [ COLUMN ] column_name SET ( attribute_option = value [, ... ] )
    ALTER [ COLUMN ] column_name RESET ( attribute_option [, ... ] )
    ALTER [ COLUMN ] column_name SET STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN }
    ADD table_constraint [ NOT VALID ]
    ADD table_constraint_using_index
    VALIDATE CONSTRAINT constraint_name
    DROP CONSTRAINT [ IF EXISTS ]  constraint_name [ RESTRICT | CASCADE ]
    DISABLE TRIGGER [ trigger_name | ALL | USER ]
    ENABLE TRIGGER [ trigger_name | ALL | USER ]
    ENABLE REPLICA TRIGGER trigger_name
    ENABLE ALWAYS TRIGGER trigger_name
    DISABLE RULE rewrite_rule_name
    ENABLE RULE rewrite_rule_name
    ENABLE REPLICA RULE rewrite_rule_name
    ENABLE ALWAYS RULE rewrite_rule_name
    CLUSTER ON index_name
    SET WITHOUT CLUSTER
    SET WITH OIDS
    SET WITHOUT OIDS
    SET ( storage_parameter = value [, ... ] )
    RESET ( storage_parameter [, ... ] )
    INHERIT parent_table
    NO INHERIT parent_table
    OF type_name
    NOT OF
    OWNER TO new_owner
    SET TABLESPACE new_tablespace

and table_constraint_using_index is:

    [ CONSTRAINT constraint_name ]
    { UNIQUE | PRIMARY KEY } USING INDEX index_name
    [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]
```

# SEQUENCE 관련

``` sql
create sequence SEQUENCE_NAME start 1;
nextval('user_seq');
currval('user_seq'); --현재세션에서 시퀀스가 없으면 에러가 난다.
drop sequence SEQUENCE_NAME;
```

- [CREATE SEQUENCE](https://www.postgresql.org/docs/9.5/sql-createsequence.html)

# 시간 데이터 관련

``` sql
select date'2020-01-14'
select current_date
select to_timestamp('2020-01-14', 'YYYY-MM-DD') + interval '12'
select to_timestamp('2020-02-18 00:00:00' , 'YYYY-MM-DD HH24:MI:SS')
```

# INSERT

> insert 시 특정컬럼에 대해 conflict 가 생겼을 떄, 어떻게 할 지 정할 수 있다. 아래 예제는 아무것도 안함.
``` sql
insert into test_table values('test', 'data') on conflict(column) do nothing;
```

간단하게 쓰기엔 더 특이한게 없고, SQL Syntax 는 문서에 잘나와있어서 여기서 마친다.





참조
- [PostgreSQL 기본강좌](http://www.gurubee.net/postgresql/basic)
- [to_char 쓰면 망함!](https://hamait.tistory.com/208)
- [ORACLE쿼리에서 postgreSQL쿼리 변환 ](https://m.blog.naver.com/PostView.nhn?blogId=wiseyoun07&logNo=221135110180&proxyReferer=https%3A%2F%2Fwww.google.com%2F)
- [postgreSQL 날짜/시간 함수](https://walkingfox.tistory.com/90)
- [ALTER TABLE](https://www.postgresql.org/docs/9.5/sql-altertable.html)
