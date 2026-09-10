---
layout: carla_chapter
title: What This Project Led Me To
subtitle: 자연스러운 주행에서 시작해 generalization failure와 safety evaluation으로 이어진 질문
description: How the CARLA comparison led to research questions about generalization, failure analysis, and safety evaluation.
permalink: /projects/01-carla-hybrid/question-evolution/
nav: false
chapter: 6
chapter_key: questions
previous_url: /projects/01-carla-hybrid/failure-analysis/
previous_label: Failure Analysis
next_url: /projects/01-carla-hybrid/
next_label: Back to Overview
---

## Question Evolution

처음에는 Rule-based보다 자연스러운 주행을 만드는 것이 주요 관심이었다. 그러나 Town03에서 obstacle placement를 바꾸고 각 방식을 반복 평가하면서, 잘 주행하는 demo 자체보다 새로운 조건에서 언제 실패하는지와 그 실패를 어떻게 측정하고 원인을 나눌지가 더 중요한 질문이 되었다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/carla/question_evolution.svg' | relative_url }}" alt="Question evolution from rule-based driving through imitation learning, hybrid driving, repeated evaluation, failure analysis, and generalization and safety" width="960" height="430" loading="lazy" decoding="async">
  <figcaption><strong>Question Evolution Timeline.</strong> 구현 순서와 실험 이후 이어진 연구 질문을 함께 정리한 도식.</figcaption>
</figure>

<div class="carla-question-grid" aria-label="Evolution of the project research question">
  <div class="carla-question">
    <small>Initial Question</small>
    <p>Can learning-based driving be smoother than Rule-based driving?</p>
  </div>
  <div class="carla-question">
    <small>After Experiment</small>
    <p>Why does a learning-based policy fail when the environment changes?</p>
  </div>
</div>

<div class="carla-callout">
  <small>Current Question</small>
  <h3>How can those failures be systematically detected, evaluated, and reduced?</h3>
</div>

Imitation Learning만으로 학습 기반 제어 경험을 마무리한 점은 아쉬움으로 남았다. 향후에는 Reinforcement Learning도 직접 구현하고 비교해보고 싶다. 동시에 학습 코드를 실행하는 데서 끝내지 않고, 모델의 작동 원리와 실패 조건을 이해한 상태에서 실험을 설계하고 분석하는 것을 다음 목표로 두고 있다.

이 프로젝트는 “더 부드럽게 주행하는가?”라는 질문을 “환경이 바뀌면 왜 실패하는가?”, “그 실패를 어떻게 반복적으로 평가하고 줄일 수 있는가?”라는 질문으로 확장한 계기가 되었다.
