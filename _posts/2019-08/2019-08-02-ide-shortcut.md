---
layout: post
title: "Eclipse intelliJ Atom 단축키"
date: 2019-08-02
tags: ide
---

> `VSCode` 는 쓰다가 관둬서 정보가 별로 없다.

### CODE DEVELOP REL.
> intelliJ
> - extends selection
>   - `Ctrl+W` 인데, 다른 툴에서 해당 단축키는 창닫기로 쓰고 있기 때문에 일관성을 위해 `Alt+W` 로 변경했다.
> - delete line
>   - `Ctrl+Y` 인데, 마찬가지 이유로 `Ctrl+D` 로 변경하고, `Ctrl+D` 의 line copy 는 그냥 안쓰기로했다.

<table class="pure-table">
<thead>
  <tr>
    <th>descriptioin</th>
    <th>Eclipse</th>
    <th>intelliJ</th>
    <th>Atom</th>
    <th>VSCode</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>delete line</td>
    <td>Ctrl+D</td>
    <td>Ctrl+Y >> Ctrl+D</td>
    <td>Ctr+Shift+K</td>
    <td>Ctrl+D</td>
  </tr>
  <tr>
    <td>jump to declaration</td>
    <td>F3</td>
    <td>Ctrl+B</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>backward</td>
    <td>Alt+Left</td>
    <td>Ctrl+Alt+Left</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>forward</td>
    <td>Alt+Right</td>
    <td>Ctrl+Alt+Right</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>next method</td>
    <td>Ctrl+Shift+Up</td>
    <td>Alt+Up</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>previous method</td>
    <td>Ctrl+Shift+Down</td>
    <td>Alt+Down</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>auto correction</td>
    <td>Ctrl+Shift</td>
    <td>Alt+Enter</td>
    <td></td>
    <td></td>
  </tr>  
  <tr>
    <td>auto import</td>
    <td>Ctrl+Shift+O</td>
    <td>Ctrl+Alt+O</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>extends selection</td>
    <td></td>
    <td>Ctrl+W >> Alt+W</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>next highlighted error</td>
    <td>Ctrl+. (dot)</td>
    <td>F2</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>previous highlighted error</td>
    <td>Ctrl+, (comma)</td>
    <td>Shift+F2</td>
    <td></td>
    <td></td>
  </tr>
</tbody>
</table>

### NAVIGATE EDITOR REL.
<table class="pure-table">
<thead>
  <tr>
    <th>descriptioin</th>
    <th>Eclipse</th>
    <th>intelliJ</th>
    <th>Atom</th>
    <th>VSCode</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>previous editor</td>
    <td>Ctrl+PageDown</td>
    <td>Alt+Left</td>
    <td>Ctrl+PageDown</td>
    <td>Ctrl+PageDown</td>
  </tr>
  <tr>
    <td>next editor</td>
    <td>Ctrl+PageUp</td>
    <td>Alt+Right</td>
    <td>Ctrl+PageUp</td>
    <td>Ctrl+PageUp</td>
  </tr>
  <tr>
    <td>close editor</td>
    <td>Ctrl+W</td>
    <td>Ctrl+F4</td>
    <td>Ctrl+W</td>
    <td>Ctrl+W</td>
  </tr>
  <tr>
    <td>open resource</td>
    <td>Ctrl+Shift+R</td>
    <td>Ctrl+Shift+N</td>
    <td>Ctrl+P</td>
    <td>Ctrl+P</td>
  </tr>
  <tr>
    <td>open class</td>
    <td></td>
    <td>Ctrl+N</td>
    <td></td>
    <td></td>
  </tr>
</tbody>
</table>

### FIND & REPLACE REL.
<table class="pure-table">
<thead>
  <tr>
    <th>descriptioin</th>
    <th>Eclipse</th>
    <th>intelliJ</th>
    <th>Atom</th>
    <th>VSCode</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>only find</td>
    <td>Ctrl+F</td>
    <td>=</td>
    <td>=</td>
    <td>=</td>
  </tr>
  <tr>
    <td>find and replace</td>
    <td>Ctrl+F</td>
    <td>Ctrl+F</td>
    <td>Ctrl+F</td>
    <td>Ctrl+H</td>
  </tr>
  <tr>
    <td>after find, replace all</td>
    <td>Alt+A</td>
    <td></td>
    <td>Ctrl+Enter</td>
    <td>Ctrl+Alt+Enter</td>
  </tr>
</tbody>
</table>

### BUILD / RUN / DEBUG REL.
> `Eclipse` 개인적인 취향으로 아래 단축키를 사용한다.
> - `Run` = `Alt+Shift+X (eXecute)` + `J (Java application)`
> - `Debug` = `Alt+Shift+D (Debug)`  + `J (Java application)`
>
> `intelliJ` - `Debug` 관련 단축키는 좀 이상한듯?

<table class="pure-table">
<thead>
  <tr>
    <th>descriptioin</th>
    <th>Eclipse</th>
    <th>intelliJ</th>
    <th>Atom</th>
    <th>VSCode</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Build</td>
    <td>Ctrl+B</td>
    <td>Ctrl+F9</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Run</td>
    <td>Ctrl+F11</td>
    <td>Shift+10</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Step Over</td>
    <td>F6</td>
    <td>F8</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Step Into</td>
    <td>F5</td>
    <td>F7</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Step Out</td>
    <td>F7</td>
    <td>Shift+F8</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Resume Program</td>
    <td>F8</td>
    <td>F9</td>
    <td></td>
    <td></td>
  </tr>
</tbody>
</table>

### NAVIGATE VIEW REL.
> `Eclipse` 아래와 같이 변경하면 편하다.
> - `Next View` = `Ctrl+F7(default)` >>  `F7`
> - `Next Perspective` = `Ctrl+F8(default)` >> `F8`

<table class="pure-table">
<thead>
  <tr>
    <th>descriptioin</th>
    <th>Eclipse</th>
    <th>intelliJ</th>
    <th>Atom</th>
    <th>VSCode</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus to project view</td>
    <td>Ctrl+F7 >> F7</td>
    <td>Alt+1</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>show run console</td>
    <td>Ctrl+F7 >> F7</td>
    <td>Alt+4</td>
    <td></td>
    <td>Ctrl+Shift+Y</td>
  </tr>
  <tr>
    <td>show debug console</td>
    <td>Ctrl+F8 >> F8</td>
    <td>Alt+5</td>
    <td></td>
    <td></td>
  </tr>
</tbody>
</table>
