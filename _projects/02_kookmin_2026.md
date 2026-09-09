---
layout: project
title: 2026 국민대학교 자율주행 경진대회
subtitle: 실차 자율주행 시스템 개발 및 주행 실패 분석
description: XYCAR에서 카메라와 LiDAR 인식, 차선 경로 생성, 차량 제어와 여러 미션을 하나의 실차 시스템으로 통합하였다.
importance: 2
year: 2026
selected: true
current_featured: false
categories: [competition]
type: Competition
period: 2026.07–2026.08
team: 5인
status: Completed
environment: [XYCAR, ROS2]
languages: [Python, C++]
card_tags: [YOLO, LiDAR, rosbag]
technologies: [ROS2, YOLO, OpenCV, LiDAR, Stanley, rosbag]
results:
  - 114팀 중 7위
  - 전 코스 완주
thumbnail:
image:
image_alt:
resources: []
---

## Overview

XYCAR 플랫폼에서 카메라와 LiDAR를 활용한 환경 인식, 차선 기반 경로 생성, 차량 제어, 라바콘·장애물·신호등 등 여러 미션을 하나의 실차 자율주행 시스템으로 통합하였다.

<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/kookmin/kookmin_demo.mp4" poster="/assets/img/projects/kookmin/kookmin_poster.webp" aria_label="2026 Kookmin University autonomous driving competition run montage" %}
  <figcaption>2026 Kookmin Autonomous Driving Competition. <a href="https://www.youtube.com/watch?v=CcfXS3UFL0A&t=17782s" target="_blank" rel="noopener noreferrer">Competition Run ↗</a></figcaption>
</figure>

## Key Contributions

- YOLO·OpenCV 기반 차선 인식 초기 구성
- Camera–LiDAR 기반 장애물 인식 구조 구성
- S자·라바콘 구간 반복 튜닝
- rosbag 기반 실차 주행 실패 분석

## Driving System

### Lane Perception & Tracking

YOLO를 기본 차선 인식에 사용했지만 S자 구간에서는 검출 결과가 흔들리는 경우가 있었다. 이때 OpenCV로 얻은 차선 결과가 더 안정적인 경우에는 이를 보정 정보로 사용하였다.

차선 기반 경로는 Stanley Controller를 이용해 추종하였다. 대회 준비 후반에 팀원들과 실제 차량에서 Stanley 관련 파라미터 및 속도 정책을 반복적으로 튜닝하였다.

### Camera–LiDAR Association

YOLO로 객체를 검출하고 LiDAR에서는 인접한 측정점을 묶어 물체 후보를 생성하였다. 초기에는 중간 측정점이 빠지면 cluster가 쉽게 끊기는 문제가 있어 짧은 beam 누락을 허용하도록 조건을 수정하였다. 카메라 객체 검출과 LiDAR cluster의 위치 관계를 함께 사용하였다.

### Cone Course

LiDAR로 좌·우 라바콘 위치를 구하고, 양쪽 라바콘의 상대 위치를 이용해 코스 중앙 방향의 경로점을 생성하였다. 생성된 경로는 Pure Pursuit으로 추종하였다.

### Static / Dynamic Obstacles

차선과 중앙선을 이용해 두 차로의 위치를 추정하고, 장애물이 있는 차로를 판단하여 반대 차로로 회피하였다. 동적 장애물도 별도의 추종 대상으로 두지 않고 동일한 회피 대상으로 처리하였다.

### Traffic Light / Route Decision

YOLO의 `red`, `green`, `left` class 인식 결과가 실제 route decision으로 이어지도록 구성하였다. `red`에서는 정지하고, `green`에서는 기존 경로를 유지하며, `left`에서는 좌회전 경로에 진입하도록 하였다.

## Technical Challenges

### S자 구간의 조기 가속과 경로 이탈

직선 속도를 높인 뒤 S자에 진입하면 차량이 곡선을 충분히 추종하기 전에 다시 가속하거나, 변곡점에서 상태가 너무 일찍 직선으로 바뀌며 경로를 벗어나는 문제가 있었다.

주행 로그를 확인하면서 전방 도로가 직선으로 보이는 시점과 차량의 횡방향 오차·heading이 실제로 안정되는 시점이 다르다는 것을 확인하였다.

### rosbag Failure Analysis

문제가 발생한 주행은 rosbag으로 기록하고 차선 인식 결과, 미션 상태, 속도 명령, 조향 명령을 시간 순서로 다시 확인하였다.

인식, 경로 생성, 상태 전환, 제어 중 어느 단계에서 문제가 시작됐는지 구분해 보려고 했다. 대회 준비 후반에는 대부분의 주행 문제를 rosbag으로 다시 확인하면서 수정하였다.

## Results

- 전 코스 완주
- 114개 팀 중 7위

## Takeaways

실차에서는 작은 인식 변화도 제어 결과까지 이어졌다. LiDAR point가 빠지거나 차선 인식이 순간적으로 흔들리는 것처럼 짧은 변화도 주행 경로와 조향에 영향을 줬다.

그래서 문제가 생겼을 때 바로 controller gain을 바꾸기보다 rosbag에서 인식 결과부터 조향 명령까지 시간 순서로 확인하는 습관이 생겼다.
