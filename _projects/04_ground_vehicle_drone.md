---
layout: project
title: ROS2·Gazebo 기반 지상차량–드론 협동 미션 구현
subtitle: 지상 차량이 드론을 운반하고, 드론이 ArUco marker 탐색을 마친 뒤 차량 위에 자동 착륙하는 미션을 ROS2·Gazebo 환경에서 구현하였다.
description: 지상 차량 주행, 드론 이륙, ArUco ID 탐색과 차량 위 자동 착륙을 하나의 미션 흐름으로 연결하였다.
importance: 4
year: 2026
selected: true
current_featured: false
categories: [course]
type: Course · AUTONOMOUS SYSTEM PLATFORM
period: 2026.03–2026.06
team: 4인
status: Completed
environment: [ROS2, Gazebo Sim, PX4]
languages: [Python, C++]
card_tags: [ROS2, Gazebo Sim, ArUco]
technologies: [ROS2, Gazebo Sim, PX4, ArUco, Multi-Robot]
results:
  - 전체 미션 성공
  - 수업 내 1위
thumbnail:
image:
image_alt:
resources: []
---

## Overview

ROS2와 Gazebo Sim을 이용해 지상 차량과 드론이 순차적으로 임무를 수행하는 시스템을 구현하였다. 지상 차량이 드론을 탑재한 채 waypoint를 따라 이동하면 지정 위치에서 드론 임무가 자동으로 시작되고, 드론은 여러 waypoint를 방문하며 서로 다른 ArUco marker ID 10개를 인식한 뒤 차량 위에 자동 착륙하도록 구성하였다.

## Mission Flow

<div class="mission-flow">
  <span>Ground Vehicle Navigation</span><b aria-hidden="true">→</b>
  <span>Drone Takeoff</span><b aria-hidden="true">→</b>
  <span>Waypoint Flight</span><b aria-hidden="true">→</b>
  <span>10 ArUco IDs</span><b aria-hidden="true">→</b>
  <span>Return</span><b aria-hidden="true">→</b>
  <span>Vehicle Landing</span>
</div>

드론 비행에는 수업에서 지정된 PX4 환경을 사용하였으며, 프로젝트에서는 PX4 자체의 비행 제어보다 차량 주행·드론 임무·ArUco 인식·자동 착륙을 하나의 흐름으로 연결하는 데 초점을 두었다.

<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/vehicle_drone/vehicle_drone_demo.mp4" poster="/assets/img/projects/vehicle_drone/vehicle_drone_poster.webp" aria_label="Ground vehicle navigation followed by drone mission in Gazebo Sim" %}
  <figcaption>Ground vehicle navigation and drone mission in Gazebo Sim.</figcaption>
</figure>

## Implementation Highlights

### ArUco Marker Recognition

드론 카메라를 통해 ArUco marker를 검출하고 marker ID를 판별하였다. 서로 다른 ID 10개를 모두 인식하는 것이 미션 조건 중 하나였다.

### Autonomous Mission Transition

지상 차량이 지정 waypoint에 도착하면 별도의 수동 명령 없이 드론 임무가 시작되도록 하였고, ArUco 탐색을 마친 뒤에는 차량으로 복귀하여 자동 착륙하도록 연결하였다.

## Results

- 서로 다른 ArUco marker ID 10개 인식
- 차량 주행에서 드론 임무로 자동 전환
- 차량 위 자동 착륙
- 전체 미션 완료
- 수업 내 1위

## Takeaways

차량 주행, 드론 비행, ArUco 인식이 각각 동작하는 것만으로는 미션이 완성되지 않았다. 차량이 특정 위치에 도착한 뒤 드론이 이륙하고, 탐색을 끝낸 뒤 다시 차량 위에 착륙하기까지 각 기능이 순서대로 이어져야 했다.

이 프로젝트에서 ROS2를 이용해 여러 로봇과 기능을 하나의 미션 흐름으로 연결해보았다.
