---
layout: project
title: IR 센서와 PID 제어를 활용한 차선 추종 및 장애물 정지
subtitle: 다채널 IR 센서 배열과 PID 제어를 이용한 소형 차량 주행
description: 다채널 IR 센서 배열로 주행선을 인식하고 PID 제어로 추종하였으며, 전방 장애물 정지 기능을 구성하였다.
importance: 6
year: 2025
selected: false
current_featured: false
categories: [course]
type: Course · Mechatronics
period: 2025.09–2025.12
team: 4인
status: Completed
environment: []
languages: [C++]
card_tags: [PID Control, IR Sensor, C++]
technologies: [C++, PID Control, IR Sensor, Ultrasonic Sensor]
results:
  - 미션 성공
  - 수업 내 1위
thumbnail:
image:
image_alt:
resources: []
---

## Overview

다채널 IR 센서 배열을 이용해 바닥의 주행선을 인식하고, PID 제어를 이용하여 차량이 선을 따라 주행하도록 구현하였다.

최종 단계에서는 전방 초음파 센서를 이용해 장애물이 일정 거리 이내에 존재하면 차량을 정지하도록 구성하였다.

<figure class="project-media project-media--still">
  <img src="{{ '/assets/img/projects/mechatronics/mechatronics_sensor_test.webp' | relative_url }}" alt="다채널 IR 센서 배열 테스트 보드" width="720" height="540" loading="lazy" decoding="async">
  <figcaption>다채널 IR 센서 배열 테스트.</figcaption>
</figure>

## PID Tuning

팀원들과 반복 주행을 하면서 P, I, D gain을 직접 조정하였다. P를 높이면 차선 오차에 빠르게 반응했지만 좌우 진동이 커질 수 있었고, D를 조정해 흔들림을 줄이는 방향으로 반복 튜닝하였다.

차선 추종이 안정적으로 유지되면서도 기록을 줄일 수 있도록 반복 주행을 통해 gain을 조정하였다.

## Results

- 차선 추종 및 장애물 정지 미션 성공
- 수업 전체 팀 중 가장 빠른 기록으로 1위
