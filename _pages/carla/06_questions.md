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

프로젝트를 시작할 때에는 Rule-based보다 더 자연스러운 learning-based driving을 만드는 것이 주요 관심이었다. 그러나 Town03에서 obstacle placement를 바꾸며 반복 평가하자, 몇 번의 좋은 주행 결과보다 새로운 조건에서 언제 실패하는지를 확인하고 그 원인을 분석하는 과정에 더 관심이 생겼다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/carla/question_evolution.svg' | relative_url }}" alt="Question evolution from smoother learning-based driving through comparison and repeated evaluation to systematic failure evaluation" width="960" height="430" loading="lazy" decoding="async">
  <figcaption><strong>Question Evolution.</strong> 시작 질문, 세 방식의 비교, 반복 평가에서의 관찰, 그리고 이후 연구 관심으로 이어진 흐름을 정리한 도식.</figcaption>
</figure>

<div class="carla-question-grid carla-question-grid--three" aria-label="Evolution of the project research question">
  <div class="carla-question">
    <small>Initial Question</small>
    <p>Can learning-based driving be smoother than Rule-based driving?</p>
  </div>
  <div class="carla-question">
    <small>Observation</small>
    <p>A method that looked successful in several demonstrations could still fail under different obstacle configurations.</p>
  </div>
  <div class="carla-question">
    <small>New Question</small>
    <p>When and why does a learned driving policy fail under unseen conditions?</p>
  </div>
</div>

<div class="carla-callout">
  <small>Next Interest</small>
  <h3>How can these failures be systematically evaluated and reduced?</h3>
</div>

Imitation Learning만으로 프로젝트를 마친 점은 아쉬움으로 남아 향후 Reinforcement Learning도 직접 경험하고 싶어졌다. 단순히 모델을 실행하는 데 그치지 않고, 학습 방식의 원리와 failure mechanism을 이해한 상태에서 실험을 설계하고 분석하는 것을 다음 목표로 두고 있다.
