---
layout: post
title: "Little-endian, Big-endian"
date: 2019-07-23
tags: binary
---

`Little-endian` , `Big-endian` 은 여러 바이트를 메모리에 순차적으로 배치할 때, 어떤 순서로 배치할 지에 대한 `byte order` 를 뜻한다. 여러 바이트를 배치할 때의 순서기 때문에 한바이트 안에서는 의미가 없다. `byte` 나 `char` 같은 `1 byte` 자료형은 상관이 없음. `2 byte` 이상의 `int`, `short`, `float`, `double`, `string` 등이 연관이 생긴다.
`Little-endian` 은 주로 intel 프로세스 계열,
`Big-endian` 은 Unix 계열의 RISC 프세서 계열에서 사용한다.
`Middle-endian` 이라는 둘다 되는 애도 있다고 한다.
`0x12345678` 이란 데이터와 `0x48656C6C6F` (Hello) 이런 데이터를 테이블로 예시를 들어보면..

<style>
/*table, td, th {
  border: 1px solid black;
  border-collapse: collapse;
}*/
</style>

<table class="pure-table">
  <thead>
    <tr>
      <th>memory address>>></th>
      <th>0x0100</th>
      <th>0x0101</th>
      <th>0x0102</th>
      <th>0x0103</th>
      <th>0x0104</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Little-endian 0x12345678</td>
      <td>0x78</td>
      <td>0x56</td>
      <td>0x34</td>
      <td>0x12</td>
      <td> - </td>
    </tr>
    <tr>
      <td>Big-endian 0x12345678</td>
      <td>0x12</td>
      <td>0x34</td>
      <td>0x56</td>
      <td>0x78</td>
      <td> - </td>
    </tr>
    <tr>
      <td>Little-endian 0x48656C6C6F</td>
      <td>0x48</td>
      <td>0x65</td>
      <td>0x6C</td>
      <td>0x6C</td>
      <td>0x6F</td>
    </tr>
    <tr>
      <td>Big-endian 0x48656C6C6F</td>
      <td>0x6F</td>
      <td>0x6C</td>
      <td>0x6C</td>
      <td>0x65</td>
      <td>0x48</td>
    </tr>
  </tbody>
</table>

`Little-endian` 은 메모리의 낮은 주소에 값의 작은 자리 수 부터 적고,
> 위의 표를 참고하면,
0x0100 (메모리의 낮은 주소 0x0100 < 0x0103) 에 0x12345678 의 0x78 (작은 자리 수)
`Big-endian` 은 낮은 주소에 값의 큰 자리 수 부터 적는다.
> 0x0100 (메모리의 낮은 주소 0x0100 < 0x0103) 에 0x12345678 의 0x12 (큰 자리 수)

따라서 수의 비교처리는 `Big-endian` 이 빠르고, 가산연산은 `Little-endian` 이 빠르다는 말이 있지만,
요즘 프로세서는 가산연산을 할 때,  동시처리를 하기 때문에 `Little-endian` 이 `Big-endian` 보다 가산연산이 빠르진 않다고 한다.
또 다른 이점으로는 `Big-endian` 은 사람이 읽는 순서대로 바이트를 적기 때문에 디버깅이 편하다고 하는데... 디버깅을 바이트코드를 보며 한지가 오래되서 잘 모르겠다.
네트워크 상에서 데이터를 주고 받을때는 `Big-endian` 으로 한다고 한다.

> Big-endian 은 윈도우에서 쓰니까 사람한테 편하게 적고
Little-endian 은 유닉스에서 쓰니까 기계한테 편하게 적는다
라고 내맘대로 외어버림.
