---
layout: carla_chapter
title: Why Did It Fail?
subtitle: 낯선 장애물 배치에서 드러난 replanning과 drivable area 제약 조건의 한계
description: Failure analysis of large-obstacle replanning and collision-free but non-drivable Lattice paths.
permalink: /projects/01-carla-hybrid/failure-analysis/
nav: false
chapter: 5
chapter_key: failure
previous_url: /projects/01-carla-hybrid/unseen-evaluation/
previous_label: Evaluation under Unseen Conditions
next_url: /projects/01-carla-hybrid/question-evolution/
next_label: What This Project Led Me To
---

## Case 1 — Large Obstacle, Insufficient Replanning

<div class="carla-analysis-grid" aria-label="Large bus failure analysis">
  <div><small>Observation</small><p>개발 과정에서는 일반적인 승용차 크기의 장애물을 주로 테스트했다. Town03 낯선 환경 평가에서는 대형 버스가 도로를 대각선으로 넓게 차단했고, 기존의 한 차선 정도 회피 경로만으로 점유 영역을 벗어나지 못했다.</p></div>
  <div><small>Why</small><p>개발 과정에서 “한 번의 한 차선 회피로 충분하다”는 가정을 두고 있었다.</p></div>
  <div><small>What Was Missing</small><p>장애물 크기와 점유 영역을 반영한 후보 경로 생성, 예상 충돌이 남을 때의 추가 replanning이 없었다.</p></div>
  <div><small>Future Improvement · Not Implemented</small><p>고정된 횡방향 회피 범위를 완화하고 multiple avoidance candidates와 iterative replanning을 검토할 수 있다.</p></div>
</div>

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Reconstruction</span>
  <img src="{{ '/assets/img/projects/carla/bus_failure.svg' | relative_url }}" alt="Top-view conceptual reconstruction of a diagonal bus blocking the road and a single avoidance path that remains inside the occupied area" width="960" height="500" loading="lazy" decoding="async">
  <figcaption><strong>Conceptual reconstruction of the observed large-obstacle failure.</strong> 실제 영상 장면이 아니라 Town03 평가에서 관찰한 상황을 설명하는 top-view schematic이다.</figcaption>
</figure>

## Case 2 — Collision-free ≠ Drivable

<div class="carla-analysis-grid" aria-label="Drivable-area failure analysis">
  <div><small>Observation</small><p>Town03의 일부 장애물 배치에서는 회피 과정에서 생성된 주행이 의도한 drivable area 밖으로 향했다.</p></div>
  <div><small>Why</small><p>경로 후보를 선택할 때 장애물과 겹치지 않는지를 중심으로 판단했고, 도로 경계와 drivable area는 명시적인 제약 조건에 포함하지 않았다.</p></div>
</div>

<div class="carla-callout carla-callout--plain">
  <small>Failure Condition</small>
  <h3>Collision-free ≠ Drivable</h3>
  <p>장애물과 겹치지 않는 것만으로는 실제 차량이 주행할 수 있는 경로가 되지 않았다.</p>
</div>

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Explanation</span>
  <img src="{{ '/assets/img/projects/carla/drivable_constraint.svg' | relative_url }}" alt="Top-view comparison of obstacle avoidance without a road constraint leading toward the sidewalk and avoidance with a drivable-area constraint" width="960" height="500" loading="lazy" decoding="async">
  <figcaption><strong>Conceptual explanation of the observed road-area violation.</strong> 오른쪽의 drivable-area constraint는 당시 구현 결과가 아니라 향후 개선 방향이다.</figcaption>
</figure>

<div class="carla-analysis-grid" aria-label="Drivable-area failure follow-up">
  <div><small>What Was Missing</small><p>생성한 경로가 실제 주행 가능 영역 안에 있는지 확인하는 도로 경계 인식과 경로 검증이 없었다.</p></div>
  <div><small>Future Improvement · Not Implemented</small><p>drivable area와 도로 경계를 후보 경로의 생성 및 검증 조건에 포함하는 방향을 도출했다.</p></div>
</div>
