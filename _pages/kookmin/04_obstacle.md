---
layout: kookmin_chapter
title: Detecting Obstacles Before It Was Too Late
subtitle: Camera 확인을 기다리다 늦어진 회피를 LiDAR-first 후보 생성 흐름으로 변경
description: Camera-first to LiDAR-first obstacle perception redesign for real-vehicle avoidance timing.
permalink: /projects/02-kookmin-2026/obstacle-detection-timing/
nav: false
chapter_badge: Chapter 4 of 6
chapter_key: obstacle
previous_url: /projects/02-kookmin-2026/lane-perception-lighting/
previous_label: Lane Perception
next_url: /projects/02-kookmin-2026/s-curve-failure-analysis/
next_label: S-Curve Failure Analysis
---

## Initial Camera-first Flow

초기 구조는 YOLO bounding box를 먼저 얻은 뒤, 대응 영역의 LiDAR point를 확인해 장애물로 판단했다. Camera와 LiDAR 측정 시점이 어긋나는 순간에는 확인이 늦어졌고, 회피 명령이 충분히 일찍 시작되지 않아 충돌한 주행이 있었다.

정밀한 Camera–LiDAR extrinsic calibration을 수행한 것은 아니었다.

### Actual Evidence — Late Confirmation

`drive_diag_20260820_112716_static_fail` rosbag에서 전방 Camera에 정적 장애물이 보인 뒤에도 obstacle state가 안정적으로 유지되지 않았고, 차량이 장애물에 매우 가까워진 시점에 `E_STOP`이 기록되었다.

<!-- Source: drive_diag_20260820_112716_static_fail; raw Camera frames at bag-relative 32.730 s and 34.349 s. -->
<div class="carla-figure-grid" aria-label="Actual rosbag frames showing late static-obstacle confirmation">
  <figure>
    <img src="{{ '/assets/img/projects/kookmin/obstacle_late_confirmation_before.webp' | relative_url }}" alt="Actual front camera frame with a static obstacle visible ahead before a valid obstacle position was maintained" width="640" height="480" loading="lazy" decoding="async">
    <figcaption><strong>Actual rosbag frame · 32.730 s.</strong> 정적 장애물이 전방에 보이지만 `/obstacle_state`는 `distance_m=999.0`, `position=none`이었다.</figcaption>
  </figure>
  <figure>
    <img src="{{ '/assets/img/projects/kookmin/obstacle_late_confirmation_estop.webp' | relative_url }}" alt="Actual front camera frame at the E-STOP transition with the static obstacle immediately in front of the vehicle" width="640" height="480" loading="lazy" decoding="async">
    <figcaption><strong>Actual rosbag frame · 34.349 s.</strong> 장애물이 차량 바로 앞에 도달한 시점에 `distance_m=0.0`, `position=right`와 `E_STOP`이 기록되었다.</figcaption>
  </figure>
</div>

<p class="carla-metric-note">해당 Camera frame 직전의 motor duty command는 0.1225였고, 34.577 s에 0.0000이 기록되었다.</p>

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/kookmin/obstacle_pipeline_comparison.svg' | relative_url }}" alt="Before and after comparison of camera-first and LiDAR-first obstacle perception pipelines" width="960" height="470" loading="lazy" decoding="async">
  <figcaption>Camera-first와 LiDAR-first의 처리 순서 및 센서 간 시점 차이로 확인이 늦어진 지점을 비교한 도식.</figcaption>
</figure>

## Revised LiDAR-first Flow

수정 후에는 LiDAR의 도로 ROI에서 cluster를 먼저 만들고 물리적인 장애물 후보를 생성했다. 그 후보를 YOLO 결과로 확인해 불필요한 대상을 줄이는 순서로 바꿨다. Camera 결과가 도착한 뒤에야 모든 처리를 시작하던 흐름에서, LiDAR로 공간 후보를 먼저 만드는 흐름으로 변경한 것이다.

<div class="carla-analysis-grid" aria-label="Obstacle perception redesign">
  <div><small>Before</small><p>YOLO bbox → 대응 LiDAR point 확인 → 회피 판단</p></div>
  <div><small>Observed Failure</small><p>센서 시점 차이에서 확인과 회피 시작이 늦어져 충돌</p></div>
  <div><small>After</small><p>LiDAR road ROI → clustering → 물리 후보 → YOLO 확인</p></div>
  <div><small>Retest Focus</small><p>인지 결과뿐 아니라 obstacle state와 차량 명령이 시작되는 시점을 함께 확인</p></div>
</div>

이 구조는 임의의 장애물을 처리하는 일반 planner가 아니라 대회 코스와 정해진 미션 조건에 맞춘 실차 인지 및 판단 절차였다.
