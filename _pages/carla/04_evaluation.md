---
layout: carla_chapter
title: Evaluation under Unseen Conditions
subtitle: 한 번의 성공적인 시연이 아니라 Town03의 무작위 장애물 배치에서 각 방식을 30회 평가
description: Repeated CARLA evaluation of rule-based, imitation-learning, and hybrid driving under unseen conditions.
permalink: /projects/01-carla-hybrid/unseen-evaluation/
nav: false
chapter: 4
chapter_key: evaluation
previous_url: /projects/01-carla-hybrid/hybrid-approach/
previous_label: Hybrid Approach
next_url: /projects/01-carla-hybrid/failure-analysis/
next_label: Failure Analysis
---

## From Town04 to Town03

개발과 기존 조건 평가는 Town04에서 진행했다. 최종 일반화 평가는 Town03으로 환경을 바꾸고 장애물 배치를 무작위로 변경했다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/carla/environment_comparison.svg' | relative_url }}" alt="Evaluation setup comparing development in Town04 with final repeated evaluation in Town03 using randomized obstacle placement" width="960" height="400" loading="lazy" decoding="async">
  <figcaption><strong>Evaluation setup diagram.</strong> 실제 CARLA screenshot이 아니라 Town04 개발 조건과 Town03 최종 평가 조건의 차이를 정리한 도식이다.</figcaption>
</figure>

## Why 30 Runs?

한 번 잘 주행했다고 방법이 안정적이라고 결론 내릴 수 없다고 판단해 각 방법을 30회씩 반복했다. 초반 몇 번의 Rule-based와 Hybrid 주행은 문제가 없는 것처럼 보였지만, 장애물 배치를 바꾸며 반복하자 특정 배치에서 실패가 나타났다.

<!-- Source: KakaoTalk_20260909_104923008.mp4; trim: 00:00:05–00:00:17; original preserved. -->
<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/carla/evaluation_town03.mp4" poster="/assets/img/projects/carla/evaluation_town03_poster.webp" aria_label="Unseen-condition evaluation in Town03 with randomized obstacle placement" controls=true %}
  <figcaption><strong>Unseen-condition evaluation in Town03 with randomized obstacle placement.</strong> 개발에 사용하지 않은 CARLA 환경에서 장애물 배치를 변경하며 반복 평가한 실제 장면이다.</figcaption>
</figure>

## Collision-free Runs under Unseen Conditions

최종 자료에서 직접 기록한 지표는 collision count였다. 아래 collision-free runs는 30회에서 해당 collision count를 뺀 값으로 표시했다.

<figure class="project-media project-media--concept">
  <img src="{{ '/assets/img/projects/carla/collision_free_runs.svg' | relative_url }}" alt="Bar chart showing 23 of 30 collision-free rule-based runs, 20 of 30 hybrid runs, and 0 of 30 imitation-learning runs" width="960" height="500" loading="lazy" decoding="async">
  <figcaption><strong>Collision-free Runs under Unseen Conditions.</strong> Rule-based 23/30, Hybrid 20/30, Imitation Learning 0/30.</figcaption>
</figure>

<p class="carla-metric-note"><strong>Corresponding collision counts:</strong> Rule-based 7/30 · Hybrid 10/30 · Imitation Learning 30/30.</p>

Hybrid는 Imitation Learning보다 collision이 발생한 주행을 크게 줄였지만 Rule-based baseline을 넘지는 못했다. 따라서 Hybrid가 일반화 문제를 해결했거나 가장 우수한 방식이었다고 결론 내리지 않았다.

## Town04 Reference Results

동일한 세 방식의 개발 환경 결과도 함께 남겼다. Imitation Learning은 장애물 대응 과정에서 완주하지 못했으므로 주행 시간을 다른 두 방식과 직접 비교하지 않았다.

<table class="metric-table">
  <thead>
    <tr><th>Metric</th><th>Rule-based</th><th>Imitation Learning</th><th>Hybrid</th></tr>
  </thead>
  <tbody>
    <tr><td>목표 도달</td><td>성공</td><td>실패 · Manual Stop</td><td>성공</td></tr>
    <tr><td>충돌</td><td>0</td><td>1</td><td>0</td></tr>
    <tr><td>최소 장애물 거리</td><td>2.709 m</td><td>0 m</td><td>2.433 m</td></tr>
    <tr><td>평균 조향 변화량</td><td>0.0535</td><td>0.0376</td><td>0.0476</td></tr>
    <tr><td>급제동 횟수</td><td>52</td><td>7</td><td>77</td></tr>
  </tbody>
</table>

Town04에서 Hybrid는 충돌 없이 목표에 도달했지만 급제동은 77회로 세 방식 중 가장 많았다. 완주 여부만으로 Hybrid가 가장 우수하다고 판단할 수 없었다.
