---
layout: project
title: V2I 기반 사각지대 대응 E2E 자율주행 시스템 설계
subtitle: 차량 단독 인지와 V2I-assisted 주행의 안전성 비교를 위한 설계
description: 주차 차량 뒤에서 갑자기 등장하는 보행자를 대표 시나리오로 두고, 차량 단독 인지와 V2I-assisted 주행의 안전성을 비교하는 시스템을 설계하고 있다.
importance: 7
year: 2026
selected: false
current_featured: true
categories: [course, ongoing]
type: Course · 스마트운행체설계프로젝트
period: 2026.09–2026.12
team: 5인
status: Ongoing
last_updated: Sep. 2026
environment: [1/5 Scale Autonomous Vehicle · 예정]
languages: []
card_tags: [V2I, E2E Driving, Safety Evaluation]
technologies: [V2I, E2E Driving, Occlusion, Safety Evaluation]
results: []
thumbnail:
image:
image_alt:
resources: []
---

## Overview

차량 자체 센서만으로 보기 어려운 사각지대 위험을 도로 인프라 센서로 먼저 인식하고, 해당 정보를 V2I를 통해 차량의 판단과 제어에 활용하는 시스템을 설계하고 있다.

현재 대표 시나리오는 주차된 차량 뒤에서 어린이가 갑자기 도로로 진입하는 상황이다.

## Motivation

초기에는 여러 V2I 상황을 검토했으나 한 학기 안에 검증 가능한 문제로 범위를 좁혀, 현재는 “주차 차량 뒤에서 어린이가 갑자기 등장하는 상황”을 대표 시나리오로 두고 있다.

연구 질문은 다음과 같다.

> 차량이 직접 볼 수 없는 보행자를 인프라가 먼저 알려줄 경우, 자율주행 차량의 안전성이 얼마나 향상되는가?

<figure class="project-media project-media--concept">
  <img src="{{ '/assets/img/projects/v2i/v2i_concept.svg' | relative_url }}" alt="주차 차량에 가려진 보행자를 인프라 센서가 먼저 감지해 자율주행 차량으로 전달하는 V2I 제안 시나리오" width="960" height="540" loading="lazy" decoding="async">
  <figcaption><strong>Concept Diagram.</strong> Proposed occlusion scenario; 실제 구현 결과가 아닌 현재 설계 방향을 나타낸다.</figcaption>
</figure>

## Evaluation Plan

- **Baseline:** Vehicle Sensor Only
- **Proposed:** Vehicle Sensor + V2I Information

후보 평가 지표는 다음과 같으며 현재 검토 중이다.

- 충돌 여부 / 충돌률
- 보행자 최초 인지 시점
- 제동 시작 시점
- 최소 보행자 거리
- TTC
- 정지 성공률

## E2E Direction

팀 전체의 최종 방향은 E2E 주행으로 정하였다. 차량 자체 센서 정보와 V2I를 통해 받은 사각지대 정보를 차량의 판단과 제어에 활용하는 구조를 목표로 한다.

현재 Infrastructure sensor, V2I 통신 방식, E2E 모델 구조와 입출력은 설계 중이다.

## Next Steps

- Infrastructure sensor 선정
- V2I로 전달할 정보 정의
- Vehicle-only baseline 구성
- V2I-assisted E2E 구조 구현
- 동일 시나리오에서 반복 평가
