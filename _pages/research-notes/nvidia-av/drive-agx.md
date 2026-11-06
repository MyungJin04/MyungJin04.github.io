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

### 개발 키트에서 실제로 연결하는 것

DRIVE AGX Thor는 차량 내부에서 여러 센서와 모델을 연결하는 연산 플랫폼이다. 기술 글의 개발 키트는 **Blackwell GPU와 Arm CPU, 64 GB LPDDR5X 메모리, 256 GB UFS 저장장치**를 포함한다. 카메라 연결에는 GMSL을, 다른 장치나 데이터 통신에는 이더넷 등을 쓴다. 글은 실험실 AC 전원에 맞춘 **Bench** 구성과 차량 DC 전원에 맞춘 **In-Vehicle** 구성을 구분한다. 모델 파일을 넣는 일 외에도 카메라와 차량 네트워크, 전원 및 냉각을 연결해야 차량에 가까운 환경에서 시험할 수 있다.

### DriveOS에서 기능을 나누는 방식

| 구성 | 역할 |
| --- | --- |
| DriveOS 7 | 차량용 운영체제 및 소프트웨어 기반과 안전·보안 기능 |
| DriveWorks | 센서 접근 및 자율주행 개발용 기능 |
| CUDA 13 | GPU에서 연산을 실행하고 메모리 전송 등을 관리할 프로그래밍 환경 |
| TensorRT 10 | 모델을 대상 하드웨어에서 효율적으로 추론하도록 최적화 |
| DriveOS LLM SDK | C++ 환경에서 언어·시각 언어 모델을 실행하는 런타임과 예제 |

글은 낮은 정밀도를 사용하는 양자화, 이전 토큰의 계산을 재사용하는 **KV 캐시**, 생성 토큰 후보를 먼저 만들고 검증하는 추측 디코딩 등을 설명한다. 개발·생산·시험 프로파일의 목적은 개발 편의와 실제 배포 조건을 구분하는 데 있다. 플랫폼이 겨냥하는 안전·보안 기준과 이 키트에 올린 개별 응용 프로그램의 검증은 범위가 다르다.

### 최대 연산 성능과 실제 지연

정밀도별 최대 연산 성능은 장치가 지원하는 계산의 규모를 보여준다. 실제 차량에서는 센서 데이터를 메모리로 옮기고 전처리하는 시간, 모델을 실행하는 시간, 궤적을 제어기로 전달하는 시간이 이어진다. 여러 카메라를 함께 사용할 때 센서 연결과 동기화, 처리량이 충분한지까지 봐야 하므로 사양표의 최대 수치만으로 주행 주기를 판단할 수 없다.

{% include research_note_figure.liquid file="thor-kit.webp" alt="DRIVE AGX Thor 개발 키트의 Bench와 In-Vehicle 버전 비교" caption="기술 블로그 그림 1. 두 개발 키트는 차량 장착과 실험실 사용에 맞춰 전원 구성이 다르다." source_id=21 %}

{% include research_note_figure.liquid file="driveos-stack.webp" alt="DriveOS에서 추론 런타임과 센서·안전 관련 기능이 연결된 그림" caption="기술 블로그 그림 2. 센서 처리, 추론, 안전 기능을 실행할 소프트웨어 기반을 보여준다." source_id=21 %}

**원문** · [Accelerate AV Development with the DRIVE AGX Thor Developer Kit](https://developer.nvidia.com/blog/accelerate-autonomous-vehicle-development-with-the-nvidia-drive-agx-thor-developer-kit/)

## 22. 차량에서 VLA의 추론 지연을 줄이는 방법
{: #resource-22 }

### 엣지 추론 런타임의 역할

글의 **TensorRT Edge-LLM**은 DRIVE AGX Thor와 Jetson Thor 같은 임베디드 환경에서 LLM·VLM을 실행하는 C++ 추론 런타임이다. 차량과 로봇은 전력·메모리·응답시간 제약을 동시에 받으므로, 연구용 모델을 장치에서 실행할 때는 계산량과 메모리 사용을 줄이는 방법이 필요하다. 글은 예를 들어 **MoE** 모델에서 토큰별로 일부 전문가만 활성화해 매번 필요한 계산을 줄이는 방식, 이미지 이해와 물리 상황 추론을 엣지에서 수행하는 **Cosmos Reason 2** 사례를 설명한다. 음성 인식·합성 예시는 주행 정책과 별개의 입력·출력 작업에서 반응시간이 중요한 경우다.

### Alpamayo 주행 경로를 단계별로 보기

1. 여러 카메라의 관측과 과거 자차 궤적을 모아 모델 입력으로 표현한다.
2. 시각 인코더가 카메라 영상을 모델이 읽을 수 있는 표현으로 바꾸고, 시각·언어 추론 부분이 장면과 행동 근거를 해석한다.
3. 행동 생성 부분이 이를 바탕으로 미래 궤적을 만든다. 추론 텍스트와 궤적은 출력 형식과 주행 시스템에서 쓰는 방식이 다르다.

기술 글은 DRIVE Thor의 Alpamayo 1 예에서 **비전 트랜스포머를 FP8로 가속**하는 방법을 보여준다. 정밀도를 줄이면 메모리와 계산 부담을 덜 수 있지만, 입력이 가려지거나 멀리 있는 물체처럼 어려운 장면에서 모델 결과가 달라지는지도 확인해야 한다.

### 차량 탑재 시 확인할 지연과 품질

센서 동기화, 영상 전처리, 시각 인코딩, 토큰 생성, 궤적 생성 시간을 나누면 느려진 원인을 찾을 수 있다. 평균뿐 아니라 지연이 큰 구간도 봐야 제어기에 필요한 주기를 지킬 수 있는지 판단할 수 있다. 처리 속도가 빨라졌다면 메모리·전력 사용과 함께 궤적 정확도, 추론과 궤적의 일치, 폐루프 주행 결과를 살펴보고 최적화 전후의 차이를 읽는다.

{% include research_note_figure.liquid file="edge-vla.webp" alt="인지, 계획, 제어를 나눈 접근과 VLA 주행 계획을 비교한 NVIDIA 도식" caption="기술 블로그 그림 1. 모델이 관측에서 계획까지 담당하는 범위를 보여준다." source_id=22 %}

**원문** · [Build Physical AI with Edge-First LLMs for Autonomous Vehicles](https://developer.nvidia.com/blog/build-next-gen-physical-ai-with-edge%E2%80%91first-llms-for-autonomous-vehicles-and-robotics/)
