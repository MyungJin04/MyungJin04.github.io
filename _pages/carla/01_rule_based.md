---
layout: carla_chapter
title: Rule-based Baseline
subtitle: Waypoint 추종과 장애물 회피를 연결하면서 조기 경로 복귀 문제를 수정한 과정
description: CARLA Rule-based baseline의 obstacle perception, tracking, classification, and control.
permalink: /projects/01-carla-hybrid/rule-based-baseline/
nav: false
chapter: 1
chapter_key: rule-based
previous_url: /projects/01-carla-hybrid/
previous_label: Overview
next_url: /projects/01-carla-hybrid/imitation-learning/
next_label: Imitation Learning
---

## Baseline Driving System

전역 waypoint 추종에는 Pure Pursuit을 사용하고, 장애물 회피에는 Lattice 기반 후보 경로를 적용했다. YOLO의 객체 정보와 LiDAR의 거리 정보를 함께 사용해 주행에 필요한 장애물 판단에 활용하고, 상황에 따라 회피, 추종, 정지를 구분했다. 이 단계는 이후 Imitation Learning과 Hybrid를 비교하기 위한 기준 주행이었지만, 처음부터 안정적으로 완성된 것은 아니었다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/carla/rule_based_pipeline.svg' | relative_url }}" alt="Camera and LiDAR perception followed by tracking and classification, behavior selection, and vehicle control" width="960" height="360" loading="lazy" decoding="async">
  <figcaption><strong>System pipeline.</strong> Camera / LiDAR → Obstacle Perception → Tracking &amp; Classification → Lattice / Follow / Stop → Vehicle Control.</figcaption>
</figure>

## Problem — Returning Before the Obstacle Was Passed

초기 회피 완료 조건은 “카메라에서 장애물이 더 이상 보이지 않는가”에 의존했다. 장애물이 카메라 시야에서 사라지면 이미 회피를 마쳤다고 판단했기 때문에, 차량이 장애물을 완전히 지나치기 전에 원래 waypoint 경로로 복귀하는 문제가 생겼다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/carla/early_return_comparison.svg' | relative_url }}" alt="Before and after comparison of early return logic using camera visibility versus track ID and ego-relative position" width="960" height="430" loading="lazy" decoding="async">
  <figcaption>실제 화면을 재현한 이미지가 아니라, 프로젝트에서 관찰한 조기 복귀 문제와 수정된 판단 흐름을 설명하는 도식이다.</figcaption>
</figure>

## Fix — Tracking the Obstacle Relative to the Ego Vehicle

장애물마다 `track_id`를 부여하고 로컬 좌표계에서 자차와의 상대 위치를 추적했다. 카메라에서 보이지 않는지만 확인하는 대신, 장애물이 차량 뒤로 지나갔는지를 확인한 뒤 waypoint 경로로 복귀하도록 판단 기준을 변경했다.

동일한 장애물 처리 방식만으로는 상황별 행동을 구분하기 어려워 동작 상태도 나눴다.

<div class="carla-state-grid" aria-label="Obstacle motion states and vehicle behavior">
  <div class="carla-state"><h3>STATIC</h3><p>정지 장애물 · Lattice 회피</p></div>
  <div class="carla-state"><h3>SLOW_MOVING_IN_LANE</h3><p>느린 선행차 · 안전 거리 유지와 추종</p></div>
  <div class="carla-state"><h3>CUT_IN/CROSSING</h3><p>끼어드는 차량 또는 보행자 · 감속이나 정지</p></div>
  <div class="carla-state"><h3>OTHER_LANE_MOVING</h3><p>다른 차선의 이동 객체 · 현재 경로에서 제외</p></div>
</div>

이 분류를 이용해 회피가 필요한 정적 장애물, 추종해야 하는 느린 선행차, 정지가 필요한 횡방향 진입 객체를 서로 다른 행동으로 연결했다.

## Final Rule-based Driving

<!-- Source: 585471514-9653dc23-5306-4e5c-a1d0-36722e1f2732.mp4; trim: 00:01:16–00:01:30; original preserved. -->
<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/carla/rule_based_final.mp4" poster="/assets/img/projects/carla/rule_based_final_poster.webp" aria_label="Final Rule-based driving with CARLA and RViz visualization" controls=true %}
  <figcaption>Final Rule-based driving in CARLA with RViz visualization.</figcaption>
</figure>
