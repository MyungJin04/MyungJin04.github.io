---
layout: carla_chapter
title: Why Did It Fail?
subtitle: 낯선 장애물 배치에서 드러난 replanning과 drivable-area constraint의 한계
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

개발 과정에서는 일반적인 승용차 크기의 장애물을 주로 테스트했다. 한 차선 정도 옆으로 이동하는 회피 경로로 대부분 통과할 수 있었지만, 낯선 환경에서는 대형 버스가 도로를 대각선으로 넓게 차단하는 사례가 나타났다.

기존 planner가 한 번의 회피 경로를 생성했지만 그 경로만으로 버스의 occupied area를 완전히 벗어나지 못했다. 이후 필요한 추가 replanning이 이루어지지 않아 충돌했다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual reconstruction of observed bus failure</span>
  <img src="{{ '/assets/img/projects/carla/bus_failure.svg' | relative_url }}" alt="Top-view conceptual reconstruction of a diagonal bus blocking the road and a single avoidance path that remains inside the occupied area" width="960" height="500" loading="lazy" decoding="async">
  <figcaption>제공된 영상에서 해당 bus failure를 명확한 실제 screenshot으로 확인하지 못해, 관찰된 실패 조건을 top-view schematic으로만 재구성했다.</figcaption>
</figure>

<div class="carla-callout">
  <small>Retrospective Improvement Ideas · Not Implemented</small>
  <p>Obstacle size와 occupied area를 고려한 candidate generation, initial avoidance가 충분하지 않을 때의 iterative replanning, fixed one-lane avoidance assumption 제거가 필요했다.</p>
</div>

## Case 2 — Collision-free ≠ Drivable

Lattice는 장애물과 충돌하지 않는 후보 경로를 만들 수 있었지만 drivable road area가 constraint로 명시되어 있지 않았다. 그 결과 일부 obstacle placement에서는 장애물을 피하면서도 path가 sidewalk 방향으로 생성되었다.

<div class="carla-callout carla-callout--plain">
  <small>Failure Condition</small>
  <h3>Collision-free ≠ Drivable</h3>
  <p>장애물과 겹치지 않는 것만으로는 실제 차량이 주행할 수 있는 경로가 되지 않았다.</p>
</div>

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/carla/drivable_constraint.svg' | relative_url }}" alt="Top-view comparison of obstacle avoidance without a road constraint leading toward the sidewalk and avoidance with a drivable-area constraint" width="960" height="500" loading="lazy" decoding="async">
  <figcaption>Obstacle avoidance without road constraint와 drivable-area constraint를 적용한 향후 개선 방향의 비교. 오른쪽은 당시 구현 결과가 아니다.</figcaption>
</figure>

<div class="carla-callout">
  <small>Retrospective Improvement Ideas · Not Implemented</small>
  <p>Drivable-area constraint, road-boundary awareness, candidate-path validation을 경로 생성 조건에 포함하는 방향을 도출했다.</p>
</div>
