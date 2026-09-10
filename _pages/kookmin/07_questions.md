---
layout: kookmin_chapter
title: What This Project Led Me To
subtitle: 기능 구현에서 실차 system failure의 원인 사슬과 검증 방법으로 이어진 질문
description: Research questions about real-vehicle failure analysis, validation, and learning-based autonomy under uncertainty.
permalink: /projects/02-kookmin-2026/what-followed/
nav: false
chapter_badge: Final
chapter_key: questions
previous_url: /projects/02-kookmin-2026/mission-integration-result/
previous_label: Mission Integration & Result
next_url: /projects/02-kookmin-2026/
next_label: Back to Overview
---

## Question Evolution

<div class="carla-question-grid carla-question-grid--three" aria-label="Question evolution during the project">
  <div class="carla-question"><small>Before</small><p>How can I make each autonomous-driving function work?</p></div>
  <div class="carla-question"><small>During Integration</small><p>Why does a module that works alone fail after it is connected to the full vehicle?</p></div>
  <div class="carla-question"><small>After Log Analysis</small><p>Where does a real system begin to fail, and how can its logs reveal the chain?</p></div>
</div>

대회 준비 과정에서는 Camera나 LiDAR의 짧은 변화가 state transition과 차량 명령까지 이어졌다. 그래서 하나의 모듈 정확도만 보는 대신, failure가 처음 나타난 단계와 이후 명령에 전달되는 순서를 실제 기록에서 확인하는 문제가 남았다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/kookmin/failure_trace_flow.svg' | relative_url }}" alt="Conceptual failure-tracing flow from perception through state transition, planning, control, and failure analysis" width="960" height="480" loading="lazy" decoding="async">
  <figcaption>실차 failure가 처음 시작된 단계를 센서 입력에서 차량 명령까지 역추적하는 흐름.</figcaption>
</figure>

## Research Directions

<div class="carla-question-grid" aria-label="Research directions that followed from the project">
  <div class="carla-question">
    <small>Real-vehicle Failure Analysis &amp; Validation</small>
    <p>실차에서 인지·판단·제어가 연결될 때 발생하는 failure를 재현하고, sensor와 command log를 시간축으로 연결해 원인을 검증하는 문제.</p>
  </div>
  <div class="carla-question">
    <small>Learning-based Autonomous Systems under Real-world Uncertainty</small>
    <p>조명, 센서 누락과 지연처럼 실제 조건이 변할 때 학습 기반 시스템의 동작과 한계를 반복 실험으로 확인하는 문제.</p>
  </div>
</div>

<div class="carla-callout">
  <small>Next Question</small>
  <h3>How can real-world autonomous-system failures be reproduced, explained, and reduced?</h3>
</div>
