---
layout: post
title: "IntelliJ 가 좋은 이유, 자주쓰는 단축키"
date: 2019-08-02
tags: ide writing
---

`IntelliJ` 가 좋다고 다들 칭찬만하고 뭐가 좋은지 안알려줘서 약간 맥 빠는 것 처럼 갬성 드립치는게 아닌가 싶어서 근거 없는 약간의 반감을 갖고 있었다.

그러던 중, `Eclipse` 기반의 `STS (Spring Tool Suit)` 이 좀 느린 것 같아서 대체제를 찾다가 `VSCode` 를 접하게 되었고 `IDE` 라기보다 `Editor` 에  가까운 기능과 그에 맞는 기동속도에 반해서 사용하다가 `Java EE` 개발에는 여러모로 불편한점이 많아서... 결국 `IntelliJ` 로 오게 되었다.

계속 쓰다보니 자잘하고 디테일하게 좋은 점들이 자꾸 보여서 정리해보려한다. 생각날때마다 적어야겠다.

> 현재 사용 중인 버전은 아래와 같다.

![사용중인 버전](/assets/images/posts/2019-08-02-ide-why-intellij-01.png)

[공식홈페이지](https://www.jetbrains.com/idea/) 에서는 `Capable and Ergonomic IDE for JVM` 라고 한줄 설명을 하고 있다.

- 코드 어시스턴트 기능이 쩐다.
  - 내가 어떤 변수/함수를 호출하고 싶은지 아는 것처럼 추천을 해준다. 첫 글자를 대소문자 가리는건 약간 거슬리지만.
- 단축키 설정시 단축키를 직접 눌러서 해당 단축키를 사용 중인 기능을 찾을 수 있다.
  - 이클립스에선 필터에 `Ctrl+F9` 를 직접 쳐야한다.
- `Lambda` 식을 추천해준다. 코드가 간결해짐.
  - `Lambda` 식이 익숙해 지지가 않는데, 익숙해질 필요가 없다고 생각이 든다. `IntelliJ` 가 추천해주는걸 보다보면 익숙해지겠지.. 라고 생각 했는데 결국 익숙해져서 `Lambda` 식 추천은 사용하지 않는다.
  - 쓰다보니 그냥 `Lambda` 식이 익숙해져버림;;
- Debugging 이 더 쉬운 것 같다.
  - 그냥 Debugger 를 사용하다 보니까 그런건지도 모르겠다.

자주쓰는 단축키
* 프로젝트 뷰 (프로젝트 파일을 계층적으로 볼 수 있는 좌측 화면)
	- window : `Alt` + `1`
	- mac os : `Command` + `1`
* Run Console
	- window : `Alt` + `4`
	- mac os : `Command` + `4`
* 함수/변수 정의부로 이동, 이클립스에서 `F3` 과 동일
	- window : `Ctrl` + `B` : 
	- mac os : `Command` + `B`
* class search
	- window : `Ctrl` + `N`
	- mac os : `Command` + `O`
* file search
	- window : `Ctrl` + `Shift` + `N`
	- mac os : `Command` + `Shift` + `O`
* find in file (디렉토리 내부의 파일에서 텍스트 찾기)
	- window :
	- mac os : `Command` + `Shift` + `F`

* Navigate Back/Foward (이전/다음 보던 에디터로 넘어가기)
	- window :
	- mac os : `Command` + `Alt` + `⭠` / `⭢`
* Select Next/Previous Tab (왼쪽/오른쪽 에디터로 넘어가기)
	- window : 
	- mac os : `Command` + `Shift` + `[` / `]`
* Optimize Import (임포트 정리)
	- window : `Ctrl` + `Alt` + `O`
	- mac os : `Ctrl` + `Alt` + `O`
* Reformat File
	- window : `Ctrl` + `Alt` + `L`
	- mac os : `Command` + `Alt` + `L` 

* Preferences
	- window : 
	- mac os : `Command` + `,`
* Project Structure
	- window : 
	- mac os : `Command` + `;`

* 다른 Intellij window 로 전환
	- window : `Alt` + `Tab`
	- mac os : `Command` + `backtick`

* return value auto generate (반환변수 자동생성)
	window : `Ctrl`    + `Alt` + `V`
	mac os : `Command` + `Alt` + `V`

* bookmark set/unset
  window :
  mac os : `F3`
  
* bookmark list
  window :
  mac os : `Command` + `F3`


+ : 키 조합 (한 번에 같이 누른다.)
⇢ : 다음 단계 키 누르기
⌘ : Mac Command Key
⌃ : Mac Control Key
⌥ : Mac Option Key (Alt)
⇧ : Mac Shift Key
⇪ : Mac Capslock Key
↩ : Mac Return
⭠ : 화살표 왼쪽
⭢ : 화살표 오른쪽
⭡ : 화살표 위
⭣ : 화살표 아래





## 뭐야 메뉴가 왜 없어졌어?
Command + Shift + A -> Edit Custom Properties
apple.laf.useScreenMenuBar=false

## 한글이 자꾸 씹힐때
Command + Shift + P -> 표시언어구성 -> 한글(ko) 선택 -> 재시작


참고
- [IntelliJIDEA_ReferenceCard.pdf](https://resources.jetbrains.com/storage/products/intellij-idea/docs/IntelliJIDEA_ReferenceCard.pdf)
- [IntelliJ & Code 내가 주로 쓰는 단축키 Shortcut](https://secondmemory.kr/567)