---
layout: research_note
title: DRIVE AGX
subtitle: 차량의 연산·메모리·시간 제약 안에서 모델 실행하기
permalink: /research-notes/nvidia-autonomous-driving/drive-agx/
chapter: 5
lang: ko
---

학습과 시뮬레이션을 마친 주행 모델은 차량에서 센서 입력을 처리하고 주기적으로 다음 계획을 계산해야 한다. 이 장에서는 **차량용 연산 하드웨어, 운영체제, 모델 추론 최적화**의 역할을 나눠 보았다.

<div class="research-resource-index" markdown="1">

**자료별로 이동** · [21. Thor 개발 키트와 DriveOS의 역할](#resource-21) · [22. 차량에서 VLA의 추론 지연을 줄이는 방법](#resource-22)

</div>

## 21. Thor 개발 키트와 DriveOS의 역할
{: #resource-21 }

DRIVE AGX Thor Developer Kit는 차량용 연산 플랫폼을 개발 환경에 가져온다. 기술 글은 AC 전원을 쓰는 **Bench** 구성과 DC 전원으로 차량에 연결하는 **In-Vehicle** 구성을 구분한다. 카메라와 이더넷 등의 연결, 메모리, 센서 입력을 함께 검토해야 실제 차량에 가까운 조건에서 시험할 수 있다.

**DriveOS 7**은 차량용 소프트웨어 기반을 제공한다. **DriveWorks**는 센서와 자율주행 개발 기능을, **CUDA**는 가속 연산 환경을, **TensorRT**는 신경망 추론 최적화를 담당한다. 데이터 정밀도에 따른 최대 연산 수치는 하드웨어 능력을 비교하는 지표다. 실제 카메라 입력부터 궤적 생성까지 걸리는 시간은 모델과 전체 처리 경로에 따라 측정해야 한다.

{% include research_note_figure.liquid file="thor-kit.webp" alt="DRIVE AGX Thor 개발 키트의 Bench와 In-Vehicle 버전 비교" caption="기술 블로그 그림 1. 두 개발 키트는 차량 장착과 실험실 사용에 맞춰 전원 구성이 다르다." source_id=21 %}

{% include research_note_figure.liquid file="driveos-stack.webp" alt="DriveOS에서 추론 런타임과 센서·안전 관련 기능이 연결된 그림" caption="기술 블로그 그림 2. 센서 처리, 추론, 안전 기능을 실행할 소프트웨어 기반을 보여준다." source_id=21 %}

**원문** · [Accelerate AV Development with the DRIVE AGX Thor Developer Kit](https://developer.nvidia.com/blog/accelerate-autonomous-vehicle-development-with-the-nvidia-drive-agx-thor-developer-kit/)

## 22. 차량에서 VLA의 추론 지연을 줄이는 방법
{: #resource-22 }

이 기술 글의 자율주행 예제는 다중 카메라와 과거 자차 궤적을 토큰으로 바꾸고, 언어 추론과 미래 궤적을 생성하는 Alpamayo 실행 경로를 설명한다. **TensorRT Edge-LLM**은 임베디드 환경용 C++ 추론 런타임이며, 글은 DRIVE Thor에서 Alpamayo 1의 비전 인코더를 **FP8**로 가속하는 사례를 소개한다. 낮은 정밀도를 적용할 때는 빨라진 정도와 출력 품질 변화를 함께 봐야 한다.

차량 탑재를 생각하면 평균 추론 시간 외에 지연이 길어지는 상황과 메모리 사용량도 중요하다. 카메라 동기화와 영상 전처리, 비전 인코딩, 언어 토큰 생성, 연속 궤적 생성 중 어느 단계가 시간을 쓰는지 나눠 측정하면 최적화 대상이 분명해진다. 기존 소프트웨어와의 통합을 검토할 때는 제어기가 사용할 수 있는 형식과 주기로 궤적을 전달하는지도 확인할 수 있다.

{% include research_note_figure.liquid file="edge-vla.webp" alt="인지, 계획, 제어를 나눈 접근과 VLA 주행 계획을 비교한 NVIDIA 도식" caption="기술 블로그 그림 1. 모델이 관측에서 계획까지 담당하는 범위를 보여준다." source_id=22 %}

**원문** · [Build Physical AI with Edge-First LLMs for Autonomous Vehicles](https://developer.nvidia.com/blog/build-next-gen-physical-ai-with-edge%E2%80%91first-llms-for-autonomous-vehicles-and-robotics/)

## 후속 연구 질문

동일한 주행 정책을 차량용 하드웨어에서 경량화할 경우, 지연이 줄어든 정도와 함께 궤적 정확도, 장면별 폐루프 실패율이 어떻게 변하는지 비교할 수 있다. 복잡한 장면에서 추론이 길어지는 경우까지 포함하면, 모델 성능과 실시간성 사이의 관계를 구체적으로 평가할 수 있다.
