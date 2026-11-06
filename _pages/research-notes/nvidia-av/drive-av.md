---
layout: research_note
title: DRIVE AV
subtitle: 주행 모델을 차량 시스템으로 통합하고 안전성 검증하기
permalink: /research-notes/nvidia-autonomous-driving/drive-av/
chapter: 4
lang: ko
---

DRIVE AV 자료에서는 주행 모델 성능을 **차량 수준의 안전과 운행 가능 조건**으로 확장해 정리했다. 모델이 무엇을 인식하고 어떤 궤적을 냈는지에 더해, 시험할 상황과 배포 판단에 필요한 증거를 살펴봤다.

<div class="research-resource-index" markdown="1">

**자료별로 이동** · [17. 레벨 4 로보택시의 개발과 운영을 나눠 보기](#resource-17) · [18. 픽셀 단위로 보는 주행 장면의 구성](#resource-18) · [19. 시나리오 시험과 센서 시험을 연결하기](#resource-19) · [20. 안전 표준과 안전 근거를 구분하기](#resource-20)

</div>

## 17. 레벨 4 로보택시의 개발과 운영을 나눠 보기
{: #resource-17 }

GTC 발표는 차량용 주행 정책을 **클라우드에서 학습하고, 시뮬레이션에서 검증한 뒤, 차량에서 실행하는 과정**을 OEM·자율주행 개발사·운송 서비스 사업자의 협업과 함께 설명한다. Hyperion은 센서와 컴퓨팅 등 차량 통합에 필요한 레퍼런스 구성을 제공하고, DRIVE AV는 그 위에서 주행 기능을 담당하는 소프트웨어다.

레벨 4에서는 시스템이 정해진 운행설계영역(ODD) 내에서 주행과 필요한 비상 대응을 담당한다. ODD에는 지역, 도로 유형, 기상처럼 운행 가능한 조건을 명시할 수 있다. 모델의 궤적 품질과 함께 차량 통합, 운행 조건, 실패 시 대응, 운영 절차를 고려해야 한다.

**원문** · [Advancing Level 4 Autonomy: Scalable, Safe AVs and Robotaxis](https://www.youtube.com/watch?v=vUBytUceIjM) · [NVIDIA GTC 세션 안내](https://www.nvidia.com/gtc/session-catalog/sessions/gtc26-s81713/)

## 18. 픽셀 단위로 보는 주행 장면의 구성
{: #resource-18 }

2019년 DRIVE Labs 사례는 **파놉틱 세그멘테이션(panoptic segmentation)**을 소개한다. 시맨틱 세그멘테이션은 각 픽셀이 도로·인도 같은 어떤 범주인지 구분하고, 인스턴스 세그멘테이션은 같은 범주의 서로 다른 차량·사람을 개별 객체로 나눈다. 파놉틱 세그멘테이션은 두 관점을 하나의 픽셀 수준 장면 표현으로 결합한다.

공사 구간에서 사각형 검출 결과만 보면 콘의 정확한 경계나 주행 가능한 도로와의 관계를 알기 어렵다. 이 사례에서 E2E는 한 신경망이 인지 결과를 생성하는 범위를 가리킨다. Alpamayo 자료에서 말하는 E2E는 관측에서 미래 주행 궤적까지 이어지는 더 넓은 범위다.

{% include research_note_figure.liquid file="drive-labs-panoptic.webp" alt="NVIDIA DRIVE Labs의 픽셀 단위 인지 소개 영상 이미지" caption="NVIDIA DRIVE Labs 영상의 공식 미리보기. 인지 출력의 공간 해상도가 중요한 사례다." source_id=18 %}

**원문** · [How AI Helps Autonomous Vehicles See Outside the Box](https://www.youtube.com/watch?v=HS1wV9NMLr8) · [DRIVE Labs 기술 설명](https://blogs.nvidia.com/blog/drive-labs-panoptic-segmentation/)

## 19. 시나리오 시험과 센서 시험을 연결하기
{: #resource-19 }

Foretellix 사례의 **Foretify**는 어떤 주행 상황을 시험하고 결과를 어떻게 관리할지 정하는 도구다. **Omniverse Sensor RTX**를 연동하면 객체의 위치와 행동으로 표현한 시험 장면에서 센서 수준의 관측도 생성할 수 있다. 같은 보행자 횡단이라도 조명·가림 조건을 바꾸면 인지에서 어려움이 생길 수 있다.

시험을 설계할 때는 ‘보행자가 횡단했다’는 장면 이름보다 자차 속도, 가림의 정도, 횡단 시점, 성공 기준을 함께 정하는 것이 중요하다. 예를 들어 충돌 여부 외에도 최소 거리와 제동 개시 시점을 비교하면 인지 문제와 대응 정책 문제를 구분하는 데 도움이 된다.

**원문** · [How Simulation Enables Safer Autonomous Vehicles](https://www.nvidia.com/en-us/on-demand/session/ces25-foretellix/) · [Sensor RTX와 Foretify 연동 설명](https://blogs.nvidia.com/blog/omniverse-sensor-rtx-autonomous-machines/)

## 20. 안전 표준과 안전 근거를 구분하기
{: #resource-20 }

패널은 **ISO 26262**를 전기·전자 시스템의 오작동과 관련된 기능 안전, **ISO 21448(SOTIF)**를 의도된 기능의 성능 한계에서 발생할 수 있는 위험, **ISO/PAS 8800**을 자동차 AI 안전을 다루는 지침으로 설명한다. 예를 들어 센서 고장과, 고장 없이 정상 작동하는 센서가 특정 역광 조건에서 충분한 정보를 주지 못하는 상황은 원인이 다르다.

**안전 논증(safety case)**에는 정의된 범위에서 시스템이 받아들일 수 있을 만큼 안전하다는 주장, 그 주장을 뒷받침하는 요구사항과 검증 증거를 연결한다. 패널이 소개한 TÜV Rheinland 평가는 NVIDIA의 레벨 4 **안전 관리 계획**에 대한 평가였다. 특정 차량의 모든 운행 조건에 대한 승인과는 범위가 다르다. 요구사항, 시험 데이터, 독립 검토, 변경 후 재평가를 이어서 보는 이유도 여기에 있다.

{% include research_note_figure.liquid file="safety-evidence.svg" alt="운행 조건에서 위험과 요구사항을 정하고 시험 결과를 검토하는 안전 근거 흐름" caption="운행 조건을 명시하고, 각 요구사항이 어떤 시험과 증거로 연결되는지 정리한 도식." source_id=undefined %}

**원문** · [Safety in the Loop: Scaling AV Safety Through Industry Standards](https://www.nvidia.com/en-us/on-demand/session/alpamayo26-s1/)
