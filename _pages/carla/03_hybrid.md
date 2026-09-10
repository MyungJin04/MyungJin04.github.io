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

목표는 learning-based driving의 비교적 부드러운 행동과 Rule-based reference의 안정성을 결합할 수 있는지 확인하는 것이었다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/carla/hybrid_architecture.svg' | relative_url }}" alt="Hybrid architecture comparing imitation-policy driving against a continuously generated rule-based reference and selecting imitation or fallback control" width="960" height="500" loading="lazy" decoding="async">
  <figcaption><strong>Hybrid architecture.</strong> Imitation result와 Rule-based reference의 차이를 비교해 Imitation control 또는 Rule-based fallback을 선택한다.</figcaption>
</figure>

## Switching Logic

Imitation Learning이 기본적으로 차량을 주행하는 동안 Rule-based planner도 동시에 기준 경로를 계속 생성했다. Imitation result와 Rule-based reference의 차이가 설정 기준보다 커지면 Rule-based control로 전환하고, 차이가 다시 줄어들면 Imitation Learning으로 복귀하도록 구성했다.

당시 사용한 정확한 switching threshold 값은 보존된 자료에서 확인하지 못해 이 페이지에 숫자로 적지 않았다.

<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/carla/hybrid_town04_demo.mp4" poster="/assets/img/projects/carla/hybrid_town04_poster.webp" aria_label="Town04 hybrid driving demonstration in CARLA" %}
  <figcaption><strong>Town04 Hybrid Driving Demo.</strong> 제공된 71초 원본에서 대표적인 12초 구간을 추출한 실제 프로젝트 영상.</figcaption>
</figure>

<div class="carla-callout carla-callout--plain">
  <small>Evaluation Goal</small>
  <p>Hybrid가 항상 최선이라고 전제하지 않고, Imitation Learning의 실패를 얼마나 줄이는지와 Rule-based baseline보다 실제로 나은지를 반복 실험으로 확인했다.</p>
</div>
