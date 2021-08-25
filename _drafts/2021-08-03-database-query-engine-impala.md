---
layout: post
title: "Impala 사용"
date: 2021-08-03
tags: impala query-engine hadoop
---


#### TO_TIMESTAMP(BIGINT unixtime) : TIMESTAMP, TO_TIMESTAMP(STRING date, STRING pattern) : TIMESTAMP
Purpose: Converts an integer or string representing a date/time value into the corresponding TIMESTAMP value.

Added in: Impala 2.3.0

```sql
select to_timestamp('2021/08/03', 'yyyy/MM/dd');
--2021-08-03 00:00:00
select to_timestamp('2015-10-31 23:24:25', 'yyyy-MM-dd HH:mm:ss')
--2015-10-31 23:24:25
```

#### TO_DATE(TIMESTAMP ts) : STRING
Purpose: Returns a string representation of the date field from the ts argument.

```sql
select to_date(to_timestamp('2021/08/03', 'yyyy/MM/dd'))
--2021-08-03
```

#### DATE_ADD(TIMESTAMP / DATE date, INT / BIGINT days), DATE_ADD(TIMESTAMP / DATE date, interval_expression)
Purpose: Adds a specified number of days to the date argument.
With an INTERVAL expression as the second argument, you can calculate a delta value using other units such as weeks, years, hours, seconds, and so on; see TIMESTAMP Data Type for details.
Return type:
If date is TIMESTAMP, returns TIMESTAMP.
If date is DATE, returns DATE.

```sql
select to_timestamp('2021/08/03', 'yyyy/MM/dd'), date_add(to_timestamp('2021/08/03', 'yyyy/MM/dd'), 1)
--2021-08-03 00:00:00	2021-08-04 00:00:00
```

#### CONCAT(STRING a, STRING b...) : STRING
Purpose: Returns a single string representing all the argument values joined together. If any argument is NULL, it returns NULL.

``` sql
select concat(to_date(to_timestamp('2021/08/03', 'yyyy/MM/dd')), '-hello')
--2021-08-03-hello	
```

#### CAST(expression AS type) : type
Purpose: Returns expression converted to the type data type.

For details of casts from each kind of data type, see the description of the appropriate type: TINYINT Data Type, SMALLINT Data Type, INT Data Type, BIGINT Data Type, FLOAT Data Type, DOUBLE Data Type, DECIMAL Data Type, STRING Data Type, CHAR Data Type, VARCHAR Data Type, TIMESTAMP Data Type, BOOLEAN Data Type

``` sql
select length(cast(12345678 as string))
--8
```


참고
- [Impala Date and Time Functions](https://impala.apache.org/docs/build/html/topics/impala_datetime_functions.html)
- [Impala String Functions](https://impala.apache.org/docs/build/html/topics/impala_string_functions.html)
- [Impala Type Conversion Functions](https://impala.apache.org/docs/build/html/topics/impala_conversion_functions.html#conversion_functions__cast)