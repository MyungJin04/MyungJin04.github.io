---
layout: project
title: 2025 HL FMA 자율주행 경진대회 시뮬레이션 부문
subtitle: MORAI 기반 자율주행 경로 추종 및 장애물 회피
description: MORAI의 IONIQ 5 차량에서 waypoint 추종, 장애물 회피와 GPS 사용 불가 구간 주행을 수행하였다.
importance: 5
year: 2025
selected: false
current_featured: false
categories: [competition]
type: Competition
period: 2025.08–2025.09
team: 5인
status: Completed
environment: [MORAI Simulator, ROS1, Hyundai IONIQ 5]
languages: [Python, C++]
card_tags: [MORAI, Pure Pursuit, Lattice]
technologies: [MORAI, ROS1, Pure Pursuit, Lattice, YOLO, LiDAR]
results:
  - 예선 통과
  - 본선 진출
  - 장려상
thumbnail:
image:
image_alt:
resources: []
---

## Overview

MORAI Simulator의 IONIQ 5 차량으로 운전면허시험 코스와 일반 도로 형태의 미션을 수행하였다. 예선에서는 waypoint 기반 주행, 본선에서는 정적·동적 장애물 회피와 GPS 비가용 구간 주행이 주요 과제였다.

<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/hlfma_2025/hlfma_2025_demo.mp4" poster="/assets/img/projects/hlfma_2025/hlfma_2025_poster.webp" aria_label="MORAI and RViz waypoint tracking clip" %}
  <figcaption>MORAI simulation run.</figcaption>
</figure>

## Driving System

### Waypoint Tracking

전역 waypoint를 추종하기 위해 Pure Pursuit을 적용하였다.

### Obstacle Perception

LiDAR clustering으로 주변 물체 후보를 만들고 카메라에서는 YOLO로 장애물을 검출하였다. YOLO로 검출된 객체와 LiDAR cluster의 위치가 겹치는 경우 장애물 판단에 활용하였다.

### Lattice Planning

장애물 회피에는 대회에서 제공한 기본 예제를 참고하여 Lattice 기반 local path generation을 적용하였다.

### GPS Unavailable Section

GPS를 사용할 수 없는 구간에서는 카메라와 OpenCV 기반 차선 인식으로 주행을 이어갔다.

## Results

- 예선 통과
- 본선 진출
- 장려상

## What Came Next

Pure Pursuit과 Lattice 기반 주행을 반복해서 보면서 일부 움직임이 사람이 운전하는 것보다 경직되어 보였다. “학습 기반 방식은 더 부드럽게 주행할 수 있을까?”라는 궁금증이 생겼고, 이후 CARLA에서 Rule-based·Imitation Learning·Hybrid를 비교하는 프로젝트로 이어졌다.
