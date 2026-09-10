---
layout: kookmin_chapter
title: Building the Full Driving Stack
subtitle: 여러 미션 모듈을 하나의 ROS2 주행 흐름으로 연결
description: Kookmin competition XYCAR perception, mission decision, path tracking, and vehicle control stack.
permalink: /projects/02-kookmin-2026/full-driving-stack/
nav: false
chapter_badge: Chapter 1 of 6
chapter_key: stack
previous_url: /projects/02-kookmin-2026/
previous_label: Overview
next_url: /projects/02-kookmin-2026/platform-switch-recovery/
next_label: Platform Switch Recovery
---

## One Vehicle, Multiple Mission Paths

차선 주행, 라바콘, 정적·동적 장애물, 신호등, 좌회전과 shortcut은 서로 다른 인지 및 경로 생성 절차를 사용했다. 각 모듈의 출력은 Mission Manager가 현재 미션에 맞게 선택하고, 최종 속도 및 조향 명령을 XYCAR에 전달하도록 구성했다.

<figure class="project-media project-media--concept">
  <span class="concept-label">System Overview</span>
  <img src="{{ '/assets/img/projects/kookmin/system_architecture.svg' | relative_url }}" alt="ROS2 driving stack with camera and LiDAR perception, mission decision, path tracking, and XYCAR control" width="960" height="560" loading="lazy" decoding="async">
  <figcaption>ROS2 코드와 rosbag topic을 바탕으로 정리한 시스템 구성도.</figcaption>
</figure>

## Core Modules

<div class="carla-analysis-grid" aria-label="Autonomous driving stack modules">
  <div><small>Lane</small><p>Camera 영상에서 YOLO와 OpenCV 차선 결과를 만들고 center curve와 차선 제어 상태를 생성했다.</p></div>
  <div><small>Obstacle</small><p>LiDAR cluster와 Camera 검출을 결합해 주행 차로의 장애물 후보를 판단했다.</p></div>
  <div><small>Cone</small><p>좌·우 라바콘 cluster의 중간점을 경로점으로 만들고 Pure Pursuit으로 추종했다.</p></div>
  <div><small>Mission</small><p>신호등과 구간 상태를 포함한 미션 출력을 Mission Manager에서 차량 명령으로 연결했다.</p></div>
</div>

## Integration Work

팀 통합 과정에서 인지, 장애물 회피, 미션 로직, 차선 제어, 라바콘 경로 및 실차 tuning 전반의 코드를 직접 수정하고 검증했다. 기능 하나가 정상이어도 다른 모듈의 상태 전환이나 명령 시점과 결합하면 주행이 달라졌기 때문에, 통합 rosbag에 Camera, LiDAR, 주행 상태, Stanley debug와 motor command를 함께 기록했다.

<div class="carla-callout carla-callout--plain">
  <small>Validation Principle</small>
  <p>모듈별 성공 여부보다 입력 센서에서 최종 차량 명령까지 이어지는 순서를 한 기록에서 확인했다.</p>
</div>
