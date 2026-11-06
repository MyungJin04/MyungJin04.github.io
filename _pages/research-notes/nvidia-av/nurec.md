---
layout: research_note
title: Omniverse NuRec
subtitle: 실주행 기록을 다시 움직일 수 있는 3D 장면으로 복원하기
permalink: /research-notes/nvidia-autonomous-driving/nurec/
chapter: 3
lang: ko
---

CARLA에서 시뮬레이션을 만들 때는 월드와 장애물 배치를 설정했다. NuRec 자료는 반대로 **실제로 수집한 장면을 출발점으로 삼아**, 기록 당시와 다른 위치와 경로에서 관측할 수 있는 시험 환경을 만드는 방법을 다룬다.

<div class="research-resource-index" markdown="1">

**자료별로 이동** · [15. 실주행 기록을 CARLA에서 바꿔가며 실행하기](#resource-15) · [16. 새로운 시점의 복원 오류와 Fixer](#resource-16)

</div>

## 15. 실주행 기록을 CARLA에서 바꿔가며 실행하기
{: #resource-15 }

Omniverse NuRec은 주행 중 관측한 센서 기록에서 **Gaussian 기반 3D 장면**을 만들고 새로운 위치의 센서 관측을 렌더링한다. Gaussian 표현은 위치, 모양, 색과 불투명도를 갖는 요소를 3D 공간에 배치하고, 새 시점에서 그 요소를 합성해 화면을 만든다. NVIDIA 글은 3DGUT 기반 복원 장면을 CARLA에 연결해 원래 주행을 재현하거나 새 경로와 카메라 위치를 시험하는 흐름을 보여준다. 이 방식에서는 자차가 기록 경로에서 벗어나면 새 위치에 맞는 관측을 렌더링할 수 있다.

이 흐름에서 **NuRec은 실장면의 복원과 렌더링**, **CARLA는 차량 상태·물리와 시나리오의 실행**, **Cosmos Transfer는 날씨·조명 등 관측 조건의 변형**을 맡는다. 교통 참여자의 반응을 바꾸는 일은 교통 행동 모델이나 시나리오 설정에 해당한다.

{% include research_note_figure.liquid file="nurec-workflow.webp" alt="Foretellix와 CARLA를 연결해 만든 눈 덮인 교차로 시뮬레이션 화면" caption="공식 기술 블로그의 시뮬레이션 소개 화면. 왼쪽 위에 객체 수준의 장면 표현, 본 화면에 카메라 관측 예가 보인다." source_id=15 %}

**원문** · [Accelerating AV Simulation with Neural Reconstruction and World Foundation Models](https://developer.nvidia.com/blog/accelerating-av-simulation-with-neural-reconstruction-and-world-foundation-models/)

## 16. 새로운 시점의 복원 오류와 Fixer
{: #resource-16 }

원래 카메라가 보지 못한 위치에서 렌더링하면 가려져 있던 부분에 구멍, 번짐, 불안정한 질감이 나타날 수 있다. **NuRec Fixer**는 Cosmos Predict 기반의 확산 모델로 이런 렌더링 결과를 보정한다. 글은 재구성 과정에서 오프라인으로 사용하는 경우와, 렌더링된 프레임에 온라인으로 적용하는 경우를 구분한다.

예제 장면에서 픽셀 기반 지표인 PSNR은 **16.5809 → 16.6147 dB**로 변했다. 이 값은 해당 예제의 결과다. 주행 평가에 쓰려면 화면의 선명도 외에도 보정 전후의 차선 경계, 보행자와 장애물 위치가 일관되게 보이는지 확인해야 한다.

{% include research_note_figure.liquid file="nurec-fixer.webp" alt="왼쪽은 Fixer를 적용하지 않은 도로 화면, 오른쪽은 Cosmos 기반 Fixer를 적용한 도로 화면" caption="공식 Fixer 데모의 보정 전후 예시. 서로 다른 프레임을 발췌했으며, 정량 비교는 글의 예제 결과를 참조했다." source_id=16 %}

**원문** · [How to Enhance 3D Gaussian Reconstruction Quality for Simulation](https://developer.nvidia.com/blog/how-to-enhance-3d-gaussian-reconstruction-quality-for-simulation/)

## CARLA 프로젝트와 연결한 질문

같은 장애물을 원래 관측 경로에서 볼 때와 차량이 옆으로 피한 시점에서 볼 때, 복원 오류가 장애물 인식과 회피 행동을 얼마나 바꾸는지 비교할 수 있다. 이렇게 하면 장면 표현의 오차와 주행 정책의 오차를 구분해 분석할 수 있다.
