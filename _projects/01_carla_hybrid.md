---
layout: project
title: "When Learning Fails: Rule-based, Imitation, and Hybrid Driving under Unseen Conditions in CARLA"
subtitle: 낯선 환경에서 드러난 학습 기반 자율주행의 한계와 Hybrid 접근
description: Rule-based, Imitation Learning, Hybrid 주행을 설계하고 CARLA의 낯선 환경에서 반복 평가한 연구 이야기.
importance: 1
year: 2026
selected: true
current_featured: false
categories: [independent]
type: Independent Project
period: Mar. 2026 – Jun. 2026
team: 2-person team
status: Completed
environment: [CARLA, ROS2, Python, C++]
languages: [Python, C++]
card_tags: [CARLA, Imitation Learning, Hybrid Driving]
technologies: [CARLA, ROS2, Pure Pursuit, Lattice, Imitation Learning, Hybrid Driving]
results:
  - Town03 무작위 장애물 배치에서 각 방식 30회 평가
thumbnail:
image:
image_alt:
resources: []
---

{% include carla_chapter_nav.liquid current="overview" %}

## Starting Questions

<div class="carla-question-grid" aria-label="Project research questions">
  <div class="carla-question">
    <small>Question 01</small>
    <p>Can learning-based driving be smoother than Rule-based driving?</p>
  </div>
  <div class="carla-question">
    <small>Question 02</small>
    <p>Can a lightweight imitation-learning policy generalize with limited data and hardware?</p>
  </div>
</div>

## From Rule-based Driving to a Comparative Study

[2025 HL FMA Simulation]({{ '/projects/05-hlfma-sim-2025/' | relative_url }})에서 Pure Pursuit과 Lattice를 이용한 Rule-based autonomous driving을 경험했다. 비교적 안정적으로 주행했지만 일부 상황의 움직임은 경직되어 보였다. 당시 E2E autonomous driving이 주요 연구 방향으로 발전하고 있었고, learning-based driving을 직접 경험하기 위한 현실적인 시작점으로 Imitation Learning을 선택했다.

직접 demonstration data를 수집할 수 있고 프로젝트 기간 안에 구현할 수 있다는 점이 선택의 배경이었다. 다만 데이터와 하드웨어가 제한적이고 경량 CNN을 사용하며 Reinforcement Learning까지 수행하지 않는 조건에서는, Imitation Learning이 낯선 환경까지 완전하게 일반화하지 않을 가능성을 처음부터 예상했다.

따라서 하나의 방법을 완성하는 대신 프로젝트 시작 단계에서 세 가지 접근을 같은 조건에서 비교하도록 설계했다.

<div class="carla-approach-grid" aria-label="Compared driving approaches">
  <div class="carla-approach"><h3>Rule-based</h3><p>Pure Pursuit과 Lattice를 이용한 기준 주행</p></div>
  <div class="carla-approach"><h3>Imitation Learning</h3><p>직접 수집한 demonstration data로 학습한 경량 정책</p></div>
  <div class="carla-approach"><h3>Hybrid</h3><p>학습 기반 주행과 Rule-based reference 및 fallback의 결합</p></div>
  <div class="carla-approach"><h3>Repeated Evaluation</h3><p>낯선 환경에서 각 방식 30회 반복 평가와 실패 분석</p></div>
</div>

## Project Timeline

<div class="timeline" aria-label="Project timeline from March to June 2026">
  <div><strong>Mar. 2026</strong><span>CARLA + ROS2 environment setup</span></div>
  <div><strong>Apr. 2026</strong><span>Rule-based driving</span></div>
  <div><strong>May 2026</strong><span>Imitation Learning</span></div>
  <div><strong>Jun. 2026</strong><span>Hybrid + unseen-condition evaluation</span></div>
</div>

## Read the Research Story

<div class="carla-chapter-grid">
  <a class="carla-chapter-card" href="{{ '/projects/01-carla-hybrid/rule-based-baseline/' | relative_url }}">
    <small>CHAPTER 01</small><strong>Rule-based Baseline</strong>
    <p>Obstacle perception, Lattice planning, and an early-return problem.</p><b>Open chapter →</b>
  </a>
  <a class="carla-chapter-card" href="{{ '/projects/01-carla-hybrid/imitation-learning/' | relative_url }}">
    <small>CHAPTER 02</small><strong>Imitation Learning</strong>
    <p>Demonstration data, missing recovery behavior, and a practical setback.</p><b>Open chapter →</b>
  </a>
  <a class="carla-chapter-card" href="{{ '/projects/01-carla-hybrid/hybrid-approach/' | relative_url }}">
    <small>CHAPTER 03</small><strong>Hybrid Approach</strong>
    <p>A planned comparison between learned driving and a Rule-based reference.</p><b>Open chapter →</b>
  </a>
  <a class="carla-chapter-card" href="{{ '/projects/01-carla-hybrid/unseen-evaluation/' | relative_url }}">
    <small>CHAPTER 04</small><strong>Evaluation under Unseen Conditions</strong>
    <p>Town03, randomized obstacle placement, and 30 repeated runs per method.</p><b>Open chapter →</b>
  </a>
  <a class="carla-chapter-card" href="{{ '/projects/01-carla-hybrid/failure-analysis/' | relative_url }}">
    <small>CHAPTER 05</small><strong>Failure Analysis</strong>
    <p>Insufficient replanning and the difference between collision-free and drivable.</p><b>Open chapter →</b>
  </a>
  <a class="carla-chapter-card" href="{{ '/projects/01-carla-hybrid/question-evolution/' | relative_url }}">
    <small>CHAPTER 06</small><strong>What This Project Led Me To</strong>
    <p>How the original driving question became a generalization and safety question.</p><b>Open chapter →</b>
  </a>
</div>
