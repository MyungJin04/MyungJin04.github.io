---
layout: carla_chapter
title: Hybrid Approach
subtitle: Learned driving과 Rule-based reference를 함께 운용하도록 처음부터 설계한 비교 방식
description: Hybrid CARLA driving architecture combining imitation learning with a rule-based reference and fallback.
permalink: /projects/01-carla-hybrid/hybrid-approach/
nav: false
chapter: 3
chapter_key: hybrid
previous_url: /projects/01-carla-hybrid/imitation-learning/
previous_label: Imitation Learning
next_url: /projects/01-carla-hybrid/unseen-evaluation/
next_label: Evaluation under Unseen Conditions
---

## Planned from the Beginning

Hybrid는 Imitation Learning이 실패한 뒤 임시로 덧붙인 방식이 아니다. limited data, lightweight CNN, unseen test environment라는 조건에서 Imitation Learning만으로 완전한 주행이 어려울 가능성을 예상했고, 프로젝트 시작 단계부터 Rule-based, Imitation Learning, Hybrid를 비교 대상으로 두었다.

목표는 learning-based driving의 비교적 부드러운 행동과 기존 planning 방식의 predictability를 한 시스템 안에서 비교하고 결합해보는 것이었다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/carla/hybrid_architecture.svg' | relative_url }}" alt="Hybrid architecture comparing imitation-policy driving against a continuously generated rule-based reference and selecting imitation or fallback control" width="960" height="500" loading="lazy" decoding="async">
  <figcaption><strong>Hybrid architecture.</strong> Imitation result와 Rule-based reference의 차이를 비교해 Imitation control 또는 Rule-based fallback을 선택한다.</figcaption>
</figure>

## Switching Logic

Imitation Learning이 기본적으로 차량을 주행하는 동안 Rule-based planner도 동시에 기준 경로를 계속 생성했다. Imitation result와 Rule-based reference의 차이가 설정 기준보다 커지면 Rule-based control로 전환하고, 차이가 다시 줄어들면 Imitation Learning으로 복귀하도록 구성했다.

당시 사용한 정확한 switching threshold 값은 보존된 자료에서 확인하지 못해 이 페이지에 숫자로 적지 않았다.

Rule-based planner는 reference와 fallback으로 사용했으며, formal safety guarantee를 제공하는 구조로 해석하지 않았다.

<!-- Source: KakaoTalk_20260909_104923008.mp4; trim: 00:00:05–00:00:17; original preserved. -->
<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/carla/unseen_town03_demo.mp4" poster="/assets/img/projects/carla/unseen_town03_poster.webp" aria_label="Driving evaluation in unseen Town03 with randomized obstacle placement" controls=true %}
  <figcaption>Town03 반복 평가 장면. 개발에 사용하지 않은 CARLA 환경에서 obstacle placement를 바꾸어 평가했으며, 이 구간에서는 대각선 차량과의 상호작용을 확인할 수 있다.</figcaption>
</figure>

<div class="carla-callout carla-callout--plain">
  <small>Evaluation Goal</small>
  <p>Hybrid가 항상 최선이라고 전제하지 않고, Imitation Learning의 실패를 얼마나 줄이는지와 Rule-based baseline보다 실제로 나은지를 반복 실험으로 확인했다.</p>
</div>
