---
layout: carla_chapter
title: Rule-based Baseline
subtitle: Waypoint tracking과 obstacle avoidance를 연결하면서 조기 경로 복귀 문제를 수정한 과정
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

전역 waypoint tracking에는 Pure Pursuit을 사용하고, 장애물 회피에는 Lattice 기반 후보 경로를 적용했다. Camera와 LiDAR 정보로 장애물을 판단한 뒤 상황에 따라 회피, 추종, 정지를 구분했다. 이 단계는 이후 Imitation Learning과 Hybrid를 비교하기 위한 기준 주행이었지만, 처음부터 안정적으로 완성된 것은 아니었다.

<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/carla/lattice_baseline_demo.mp4" poster="/assets/img/projects/carla/lattice_baseline_poster.webp" aria_label="CARLA and RViz view during early Lattice obstacle avoidance development" %}
  <figcaption>초기 Lattice 개발 장면. CARLA 주행 화면과 RViz의 경로·장애물 시각화를 함께 기록한 실제 프로젝트 영상이다.</figcaption>
</figure>

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/carla/rule_based_pipeline.svg' | relative_url }}" alt="Camera and LiDAR perception followed by tracking and classification, behavior selection, and vehicle control" width="960" height="360" loading="lazy" decoding="async">
  <figcaption><strong>System pipeline.</strong> Camera / LiDAR → Obstacle Perception → Tracking &amp; Classification → Lattice / Follow / Stop → Vehicle Control.</figcaption>
</figure>

## Problem — Returning Before the Obstacle Was Passed

초기 회피 완료 조건은 “camera에서 장애물이 더 이상 보이지 않는가”에 의존했다. 장애물이 camera 시야에서 사라지면 이미 회피를 마쳤다고 판단했기 때문에, 차량이 장애물을 완전히 지나치기 전에 원래 waypoint path로 복귀하는 문제가 생겼다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/carla/early_return_comparison.svg' | relative_url }}" alt="Before and after comparison of early return logic using camera visibility versus track ID and ego-relative position" width="960" height="430" loading="lazy" decoding="async">
  <figcaption>실제 화면을 재현한 이미지가 아니라, 프로젝트에서 관찰한 조기 복귀 문제와 수정된 판단 흐름을 설명하는 도식이다.</figcaption>
</figure>

## Fix — Tracking the Obstacle Relative to the Ego Vehicle

장애물마다 `track_id`를 부여하고 local coordinate에서 ego vehicle과의 상대 위치를 추적했다. camera에서 보이지 않는지만 확인하는 대신, 장애물이 차량 뒤로 지나갔는지를 확인한 뒤 waypoint path로 복귀하도록 판단 기준을 변경했다.

동일한 장애물 처리 방식만으로는 상황별 행동을 구분하기 어려워 motion state도 나눴다.

<div class="carla-state-grid" aria-label="Obstacle motion states and vehicle behavior">
  <div class="carla-state"><h3>STATIC</h3><p>정지 장애물 · Lattice 회피</p></div>
  <div class="carla-state"><h3>SLOW_MOVING_IN_LANE</h3><p>느린 선행차 · 안전 거리 유지와 follow</p></div>
  <div class="carla-state"><h3>CUT_IN/CROSSING</h3><p>끼어드는 차량 또는 보행자 · 감속이나 stop</p></div>
  <div class="carla-state"><h3>OTHER_LANE_MOVING</h3><p>다른 차선의 이동 객체 · 현재 경로에서 제외</p></div>
</div>

이 분류를 이용해 회피가 필요한 정적 장애물, 추종해야 하는 느린 선행차, 정지가 필요한 횡방향 진입 객체를 서로 다른 행동으로 연결했다.
