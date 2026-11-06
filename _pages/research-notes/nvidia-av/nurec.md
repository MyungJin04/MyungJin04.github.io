---
layout: research_note
title: Omniverse NuRec
subtitle: 실주행 기록을 다시 움직일 수 있는 3D 장면으로 복원하기
permalink: /research-notes/nvidia-autonomous-driving/nurec/
chapter: 3
lang: ko
---

NuRec 자료는 **실제로 수집한 장면을 출발점으로 삼아**, 기록 당시와 다른 위치와 경로에서 관측할 수 있는 시험 환경을 만드는 방법을 다룬다. 첫 번째 글은 장면 복원과 시뮬레이터 연동, 두 번째 글은 복원 영상의 오류를 줄이는 Fixer에 초점을 둔다.

<div class="research-resource-index" markdown="1">

**자료별로 이동** · [15. 실주행 기록을 CARLA에서 바꿔가며 실행하기](#resource-15) · [16. 새로운 시점의 복원 오류와 Fixer](#resource-16)

</div>

## 15. 실주행 기록을 CARLA에서 바꿔가며 실행하기
{: #resource-15 }

### 주행 기록으로부터 3D 장면을 만드는 단계

NuRec은 센서 기록을 정리하고, **Gaussian 기반으로 장면을 복원한 뒤, 새 관측 시점에서 센서 화면을 렌더링**하는 도구다. Gaussian 표현은 위치, 모양, 색, 불투명도를 갖는 요소를 3D 공간에 놓고, 이를 여러 관측 영상에 맞도록 조정한다. 기술 글은 **3DGUT** 기반 표현과 Gaussian 렌더링을 통해 실제 장면을 시뮬레이터에 연결하는 흐름을 설명한다.

기록 영상을 재생하면 촬영 당시 카메라의 이동 경로에 머문다. 3D 장면으로 복원하면 자차의 초기 위치를 옮기거나 새 궤적을 따라갈 때도 카메라 관측을 만들 수 있다. CARLA는 차량 운동, 물리, 시나리오의 진행을 맡고, NuRec은 그 위치에서 보이는 실제 기반 장면을 렌더링한다. 원래 카메라가 보지 못한 부분이 드러날 때는 흐림이나 빈 영역이 생길 수 있으며, 글은 렌더링 보정에 **NuRec Fixer**를 활용하는 방법을 소개한다.

### 장면을 바꾸는 세 가지 층위

- **시점 변경** — 새 위치·자세에서 같은 복원 장면을 렌더링한다. 예를 들어 차로 중앙에서 옆으로 이동했을 때 보이는 장애물을 다시 관찰한다.
- **관측 조건 변경** — Cosmos Transfer에 장면 구조나 렌더링 결과와 텍스트 조건을 줘 눈, 역광, 저녁 조명 같은 변형을 만든다.
- **교통 행동 변경** — Foretellix 시나리오나 Inverted AI의 교통 행동 모델 등으로 다른 차량의 진입 시점과 움직임을 바꾼다.

이 세 가지를 구분하면 같은 장면의 기상만 바꿔 인지의 변화가 있는지, 교통 행동을 바꿔 주행 정책의 대응이 달라지는지를 따로 시험할 수 있다. 글은 공개 실제 주행·재구성 자료를 출발점으로 삼아 이러한 변형을 만들어 평가 범위를 넓히는 개발 과정을 보여준다.

{% include research_note_figure.liquid file="nurec-workflow.webp" alt="Foretellix와 CARLA를 연결해 만든 눈 덮인 교차로 시뮬레이션 화면" caption="공식 기술 블로그의 시뮬레이션 소개 화면. 왼쪽 위에 객체 수준의 장면 표현, 본 화면에 카메라 관측 예가 보인다." source_id=15 %}

**원문** · [Accelerating AV Simulation with Neural Reconstruction and World Foundation Models](https://developer.nvidia.com/blog/accelerating-av-simulation-with-neural-reconstruction-and-world-foundation-models/)

## 16. 새로운 시점의 복원 오류와 Fixer
{: #resource-16 }

### 복원 영상이 새 위치에서 깨지는 이유

3DGS나 3DGUT로 장면을 복원해도, 주행 당시 카메라가 물체 뒤편을 관측하지 못했거나 멀리 있는 곳의 영상이 부족하면 그 부분의 3D 표현에 제약이 적다. 새로운 카메라 위치에서 렌더링하면 원본에서 가려져 있던 영역의 빈틈, 질감이 번지는 현상, 실제와 다른 형상이 나타날 수 있다. 학습·평가에 렌더링 영상을 쓰는 경우 이런 오류는 차선과 객체를 관측하는 데도 영향을 줄 수 있다.

### Fixer의 입력과 두 가지 적용 방식

**NuRec Fixer**는 Cosmos Predict 기반의 확산 모델로, 재구성에서 그려낸 영상을 받아 시각적 오류를 줄인다. 기술 글은 **오프라인**에서 장면 재구성 과정에 적용하는 방식과, **온라인**에서 렌더링된 프레임에 적용하는 방식을 구분한다. 튜토리얼은 공개 NuRec 장면의 미리보기 영상을 받아 프레임을 추출하고, 사전학습한 Fixer에 넣어 결과를 비교한다. 이 온라인 사용 예에서 보정 모델의 직접 입력은 USD 장면 파일 자체가 아니라 **그 장면에서 렌더링한 이미지**다.

### 보정 효과를 확인한 사례

글의 한 샘플에서 픽셀 차이를 바탕으로 한 PSNR은 **16.5809 → 16.6147 dB**였다. 전체 수치 변화는 작아도 영상의 특정 구멍이나 흐림이 줄어드는지 육안으로 볼 수 있다. 별도의 시연은 카메라를 원래 위치에서 왼쪽으로 3 m 옮겨 새 시점에서 보정하기 전과 후를 비교한다. 주행용 관측으로 사용할 때는 화면이 더 자연스러운지에 더해 **차선과 장애물의 위치, 카메라 사이 일관성, 연속 프레임에서의 안정성**도 확인해야 한다.

{% include research_note_figure.liquid file="nurec-fixer.webp" alt="왼쪽은 Fixer를 적용하지 않은 도로 화면, 오른쪽은 Cosmos 기반 Fixer를 적용한 도로 화면" caption="공식 Fixer 데모의 보정 전후 예시. 서로 다른 프레임을 발췌했으며, 정량 비교는 글의 예제 결과를 참조했다." source_id=16 %}

**원문** · [How to Enhance 3D Gaussian Reconstruction Quality for Simulation](https://developer.nvidia.com/blog/how-to-enhance-3d-gaussian-reconstruction-quality-for-simulation/)
