---
layout: research_note
title: Cosmos
subtitle: 월드 모델로 주행 데이터와 시뮬레이션 확장하기
permalink: /research-notes/nvidia-autonomous-driving/cosmos/
chapter: 2
lang: ko
---

월드 모델이 자율주행에서 하는 일을 **장면 해석, 조건을 바꾼 데이터 생성, 행동에 반응하는 다음 관측 생성**으로 나누었다. 같은 ‘영상 생성’이라도 데이터 증강과 폐루프 평가에서 요구되는 조건은 다르다.

<div class="research-resource-index" markdown="1">

**자료별로 이동** · [12. 월드 모델이 정책 개발을 돕는 세 가지 방식](#resource-12) · [13. 도로 구조를 보존하면서 조건을 바꾸는 합성 데이터](#resource-13) · [14. 녹화 영상의 예측에서 행동에 반응하는 시뮬레이션으로](#resource-14)

</div>

## 12. 월드 모델이 정책 개발을 돕는 세 가지 방식
{: #resource-12 }

이 GTC 세션은 **Reason**으로 영상 속 물리적 상황을 해석하고, **Predict**로 조건을 받은 뒤의 장면을 예측하고, **Transfer**로 구조적 제어 조건에 맞는 영상을 생성하는 예를 설명한다. 로봇의 경우 행동 후보별로 미래 관측과 가치를 예측하고, 좋은 결과를 낼 것으로 추정되는 후보를 고르는 예도 나온다. 미래를 생성하는 모델을 정책의 학습 자료에만 쓰는 게 아니라, 계획과 평가에 연결할 수 있다는 사례다.

자율주행에 대입하면, 같은 도로에서 가속·제동 등 행동을 바꿨을 때 관측이 어떻게 달라지는지를 만드는 데 월드 모델을 쓸 수 있다. 생성된 장면을 평가에 쓰려면 앞선 행동이 다음 관측에 제대로 반영되는지 봐야 한다.

**원문** · [How Open World Models Are Powering Breakthroughs in Physical AI](https://www.nvidia.com/en-us/on-demand/session/gtc26-s81667/)

## 13. 도로 구조를 보존하면서 조건을 바꾸는 합성 데이터
{: #resource-13 }

Cosmos Transfer의 자율주행 예제에서는 HD 맵, LiDAR 깊이, 차선·객체 같은 구조 조건과 텍스트를 넣어 영상의 날씨나 조명을 바꾼다. 한 시점의 영상을 여러 카메라로 확장할 때는 각 영상이 그럴듯한지뿐 아니라 **같은 차량이 각 카메라의 기하에 맞는 위치에 보이는지**가 중요하다.

글은 Reason 계열 모델을 활용해 품질이 낮은 결과를 걸러내는 단계도 소개한다. 합성 데이터를 추가했을 때 효과를 비교하려면 같은 평가 세트에서 실제 데이터만 쓴 학습과 합성 데이터를 더한 학습을 비교하고, 조건별 성능이 어떻게 달라지는지 확인할 수 있다.

{% include research_note_figure.liquid file="cosmos-carla.webp" alt="왼쪽은 맑은 날의 CARLA 주행 화면, 오른쪽은 도로가 젖은 날씨의 생성 예시" caption="공식 기술 블로그 영상 2에서 발췌한 두 장면. CARLA의 도로 구조를 바탕으로 날씨와 노면의 시각적 조건을 바꾼 예다." source_id=13 %}

**원문** · [Simplify End-to-End AV Development with Cosmos World Foundation Models](https://developer.nvidia.com/blog/simplify-end-to-end-autonomous-vehicle-development-with-new-nvidia-cosmos-world-foundation-models/)

## 14. 녹화 영상의 예측에서 행동에 반응하는 시뮬레이션으로
{: #resource-14 }

발표는 실주행 영상을 3D로 복원하는 방식과, 정책의 행동을 조건으로 다음 카메라 영상을 생성하는 **AlpaDreams** 방식을 비교한다. 생성형 폐루프에서는 정책이 행동을 고르면 시뮬레이션 상태가 갱신되고, 그에 맞는 영상이 다음 정책 입력으로 돌아온다. 고정 길이 영상을 한 번에 만드는 방식에서 순차적으로 관측을 갱신하는 방식으로 넘어갈 때는 지연과 시간적 일관성이 중요해진다.

재구성은 실제 장면을 토대로 하지만 원래 경로에서 멀어지면 관측이 부족한 영역이 드러날 수 있다. 생성은 장면을 더 다양하게 만들 수 있지만 물체나 차선의 위치가 갑자기 달라지면 정책의 성능을 공정하게 비교하기 어렵다. 발표의 두 접근을 실제 장면 보존, 조건 다양성, 일관성의 관점에서 비교했다.

**원문** · [Advancing Autonomous Vehicles With World Models](https://www.nvidia.com/en-us/on-demand/session/gtc26-s82446/)
