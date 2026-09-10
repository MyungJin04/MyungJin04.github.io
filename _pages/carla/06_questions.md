---
layout: carla_chapter
title: What This Project Led Me To
subtitle: 자연스러운 주행에서 시작해 일반화 실패와 안전성 평가로 이어진 질문
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

프로젝트를 시작할 때에는 Rule-based보다 더 자연스러운 학습 기반 주행을 만드는 것이 주요 관심이었다. 그러나 Town03에서 장애물 배치를 바꾸며 반복 평가하자, 몇 번의 좋은 주행 결과보다 새로운 조건에서 언제 실패하는지를 확인하고 그 원인을 분석하는 과정에 더 관심이 생겼다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/carla/question_evolution.svg' | relative_url }}" alt="Question evolution from smoother learning-based driving through comparison and repeated evaluation to systematic failure evaluation" width="960" height="430" loading="lazy" decoding="async">
  <figcaption><strong>Question Evolution.</strong> 시작 질문, 세 방식의 비교, 반복 평가에서의 관찰, 그리고 이후 연구 관심으로 이어진 흐름을 정리한 도식.</figcaption>
</figure>

<div class="carla-question-grid" aria-label="Research directions that followed from the project">
  <div class="carla-question">
    <small>Generalization &amp; Failure Evaluation</small>
    <p>새로운 조건에서 learning-based driving이 언제 실패하는지 반복적으로 평가하고 그 원인을 분석하는 문제에 관심이 커졌다.</p>
  </div>
  <div class="carla-question">
    <small>Learning-based Decision &amp; Control</small>
    <p>Imitation Learning에서 더 나아가 Reinforcement Learning도 직접 경험하고, 학습 방식의 원리와 failure mechanism을 이해한 상태에서 실험을 설계하고 싶다는 관심이 생겼다.</p>
  </div>
</div>

<div class="carla-callout">
  <small>Next Interest</small>
  <h3>How can these failures be systematically evaluated and reduced?</h3>
</div>
