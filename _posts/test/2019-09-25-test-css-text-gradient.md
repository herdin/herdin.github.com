---
layout: post
title: CSS text gradient
date: 2019-09-25
tags: opensource
---

글자색에 그라데이션을 넣는 방법은 없는 듯하고
글자 뒤에 배경에 그라데이션을 넣고 그위의 글자를 투명하게 하는 식으로
글자색에 그라데이션을 먹이는 것처럼 보이는 방법이 있다.

<style>
.herdin-gradient {
  font-size: large;
  font-weight: bold;

}
.herdin-gradient-vertical {
  background: -webkit-linear-gradient(#ffffff, #8a23eb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.herdin-gradient-horizontal {
  background: linear-gradient(to right, #ffffff, #8a23eb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>

<div class="herdin-gradient herdin-gradient-vertical">이곳의 텍스트는 수직 그라데이션이 먹는다</div>

<div class="herdin-gradient herdin-gradient-horizontal">이곳의 텍스트는 수평 그라데이션이 먹는다</div>
