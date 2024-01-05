---
layout: post
title: "tensorflow 찍먹"
date: 2023-12-04
tags: ml
---

아 어제 한참 java 환경 구성을 했는데 지원종료라는군...
m1 환경에서 compile 해서 사용할 수 있는 것 처럼 보이는데, cpp preset 인지가 지원을 안해서 사용못하는 것 같음.
아무튼 [tensorflow java](https://www.tensorflow.org/install/lang_java_legacy?hl=ko) 는 접자.

---

youtube 무료 강의를 들어본다


--- 

inflearn 에서 무료강의를 들어본다
[핵심만 빠르게, 입문자를 위한 딥러닝(Deep Learnig)과 텐서플로(Tensorflow)](https://www.inflearn.com/course/%ED%95%B5%EC%8B%AC-%EC%9E%85%EB%AC%B8-%EB%94%A5%EB%9F%AC%EB%8B%9D-%ED%85%90%EC%84%9C%ED%94%8C%EB%A1%9C/dashboard)

google coaboratory 란 것도 있네.
web notebook? 같은건가?

요기서 실습중
https://colab.research.google.com/drive/1FSLdPdhImzzcD05JVpEdnKEKlNwmjylm?hl=ko#scrollTo=WRCRe2afVyrg

## [코드] 선형회귀(Linear Regression)와 경사하강(Gradient Descent)
h(x) = wx + b

## 분류(Classification)를 위한 로지스틱회귀(Logistic Regression)
선형회귀는 직선을 사용하는것? w(a) + b
x 와 y 간의 관계를 1차 방정식(직선)으로 표현할 수 있었음

하지만 시험의 합/불은 직선으로 표현하기 힘듬, 이진분류
시그모이드 함수를 사용한다

## [개념] 다중분류(Multiple Classification)를 위한 소프트맥스회귀(Softmax Regression)
로지스틱회귀는 이진분류에서 사용 (?)
이진분류는 합/불 처럼 레이블 값이 단 두개만 존재할때
3개 이상의 레이블값이 존재하는 문제를 다중클래스라고 부른다

꼬리 | 귀 | 몸통 | 견종
14 | 5 | 30 | 말티즈
16 | 6 | 45 | 푸들
... | 치와와
...

선형회귀에서은 1차 함수를 가설로 사용
로지스틱회귀에서는 시그모이드 함수를 가설로 사용
소프트맥스회귀에서는 소프트맥스 함수를 가설로 사용

소프트맥스 함수는 시그모이드와 비슷하게 0~1사이 값을 출력하며, 전체 출력 값의 합이 1이 되도록 만듬

분류하고싶은 클래스 수만큼 k 를 설정. 여기서는 말티즈/푸들/치와와 3종류를 구분하고 싶기 때문에 3.


x1 = a*w1 + b*w2 + c*w3
value(a) -> tail(w1)  (layer x1) (...) (soft max) -> 0.3
value(b) -> ear(w2)   (layer x2) (...) (soft max) -> 0.4
value(c) -> body(w3)  (layer x3) (...) (soft max) -> 0.3

다중 클래스 분류에서 소프트 맥스 회귀 모델을 훈련하기 위해서는 크로스 엔트로피를 활용하면된다 (로지스틱 회귀의 목적함수이기도 함)
하지만 이진 분류에서는 결과가 true(1) or false(0) 로 단순했지만 다중 클래스에 그대로 적용하면 문제가 생김

자기 클래스에 해당하는 인덱스 부분만 1로 설정하고 나머지를 0 으로 설정하는 기법을 원-핫 인코딩이라한다
말티즈 = [1, 0, 0]
푸들 =  [0, 1, 0]
치와와 = [0, 0, 1]

## [개념] 딥러닝에서 사용되는 개념 (MLP, Loss, Optimizer, Epoch, Batch)..

선형회귀, 로지스틱회귀, 소프트맥스회귀 등은 예측하고 분류하는 작업을 수행함.
수학적 모델을 가설로 세우고(선형 함수일 것이다, 시그모이드 함수일 것이다 등등) 참값과 예측값 차이를 계산하여 이를 오차라 정의
오차를 최적화하기 위한 최적화 함수를 도입하였고 이를 옵티마이저라고 정의

이제 딥러닝을 배울텐데, 위에서 여러 회귀는 1개의 layer 로 구성된 신경망이었음.
이를 single layer perceptron 이라 한다

복잡한 문제를 풀기위해서는 여러 layer 가 필요하고 이를 multi layer perceptron (MLP) 라 부른다
딥러닝 역시 가설을 세우고 오차를 측정하고 이를 최소화하는 방식인데, 기본 모델을 MLP 를 쓰는 것 뿐이다.


* Loss Function
    * Mean Square Error = MSE
        linear regression 에서 활용했던 cost function
        참값과 예측값의 차이를 제곱하여 평균
    * Binary Cross Entropy
        logistic regression, softmax regression 에서 사용
        logistic : 참값이 1, 0일때 log loss 를 다르게 적용
        softmax : one-hot vector 로 encoding 된 값과 예측값의 차이 계산
            다양한 카테고리가 있는 모델에서 사용
* Optimizer
gradient descent : 기울기를 바탕으로 방향을 찾는다
    momentum : 기울기를 고려하되 관성을 고려
    adagrad : 에이다그레디언트
        탐색해본구간은 크게
        그렇지않으면 세밀하게
            RMSProp : step 을 작게할때는 이전영향을 고려
결국은 Adam : momentum + RMSProp 이걸 쓰나봄

Epoch : total data 가 학습된 횟수
batch : total data 를 한꺼번에 넣어주면 정교하게 gd 를 수행할 수 있지만, computational cost 가 너무크다
    그래서 잘게 쪼개서 학습한다
iteration : 설정한 batch size 로 total data 가 학습되기 위한 반복횟수

---

