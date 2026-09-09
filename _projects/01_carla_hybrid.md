---
layout: project
title: CARLA 환경에서 Rule-based·모방학습·Hybrid 자율주행 비교
subtitle: Rule-based, 모방학습, Hybrid 주행을 동일한 CARLA 환경에서 구현하고 기존 환경과 낯선 환경에서의 주행 결과를 비교하였다.
description: Rule-based, Imitation Learning, Hybrid 주행을 동일한 CARLA 환경에서 구현하고 기존 환경과 처음 보는 환경의 성능을 비교하였다.
importance: 1
year: 2026
selected: true
current_featured: false
categories: [independent]
type: Independent Project
period: 2026.03–2026.06
team: 2인
status: Completed
environment: [CARLA Simulator, ROS2]
languages: [Python, C++]
card_tags: [CARLA, Imitation Learning, Hybrid Driving]
technologies: [CARLA, ROS2, Pure Pursuit, Lattice, Imitation Learning, Hybrid Driving]
results:
  - 낯선 환경 30회 반복 평가
thumbnail:
image:
image_alt:
resources: []
---

## Overview

Pure Pursuit과 Lattice 기반 주행을 반복하면서 일부 차량 움직임이 사람의 주행보다 경직되어 보였다. 이를 계기로 “모방학습은 Rule-based보다 더 부드럽게 주행할 수 있을까?”, “제한된 데이터에서도 장애물 상황까지 안전하게 대응할 수 있을까?”라는 질문에서 프로젝트를 시작하였다.

동일한 CARLA 환경에서 Rule-based, Imitation Learning, 두 방식을 결합한 Hybrid 주행을 구현하고 기존 환경과 낯선 환경에서의 결과를 비교하였다.

## Project Timeline

<div class="timeline">
  <div><strong>March</strong><span>CARLA + ROS2 환경 구성</span></div>
  <div><strong>April</strong><span>Rule-based 자율주행 구현</span></div>
  <div><strong>May</strong><span>주행 데이터 수집 및 Imitation Learning</span></div>
  <div><strong>June</strong><span>Hybrid 주행 구현 및 낯선 환경 평가</span></div>
</div>

<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/carla/carla_demo.mp4" poster="/assets/img/projects/carla/carla_poster.webp" aria_label="CARLA simulator driving clip" %}
  <figcaption>CARLA simulator에서 기록한 주행 장면.</figcaption>
</figure>

## Driving Approaches

### Rule-based Driving

Waypoint 기반 전역 경로 추종에는 Pure Pursuit을 사용하였다. 일반 장애물은 Lattice 기반 후보 경로를 생성하여 회피하고, 보행자와 같이 회피보다 정지가 적합한 상황에서는 차량을 정지한 뒤 다시 출발하도록 구성하였다.

### Imitation Learning

- **기본 주행 데이터:** Rule-based 차량을 주행시키며 수집하였다.
- **장애물 회피 데이터:** Lattice보다 부드러운 회피 동작을 학습시키기 위해 직접 키보드로 차량을 조작하여 추가하였다.

소형 CNN 기반 Imitation Learning 모델을 적용하였으며, 모델 구조 자체보다 실제 closed-loop 주행 성능 비교에 초점을 두었다.

### Hybrid Driving

Hybrid 방식에서는 Imitation Learning이 기본 주행을 담당하고, Rule-based planner가 background에서 기준 경로를 계속 생성하도록 구성하였다. Imitation Learning이 향하는 경로와 Rule-based reference 사이의 차이가 일정 범위보다 커지면 Rule-based 주행으로 전환하고, 두 경로의 차이가 다시 줄어들면 Imitation Learning으로 복귀하도록 하였다. Rule-based planner는 reference와 fallback으로 활용하였다.

## Results

### Town04

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

Imitation Learning의 평균 조향 변화량은 세 방식 중 가장 작았지만 장애물 대응 과정에서 완주하지 못하였다.

Hybrid는 충돌 없이 목표에 도달했지만 급제동 횟수는 77회로 세 방식 중 가장 많았다. 따라서 완주 여부만으로 Hybrid가 가장 우수하다고 보기는 어려웠다.

Imitation Learning은 완주하지 못했으므로 주행 시간을 다른 두 방식과 직접 비교하지 않았다.

### Unseen Environment · Town03

장애물 위치를 바꿔 각 방식을 30회씩 주행하였다.

<table class="metric-table">
  <thead>
    <tr><th>Metric</th><th>Rule-based</th><th>Imitation Learning</th><th>Hybrid</th></tr>
  </thead>
  <tbody>
    <tr><td>충돌 횟수</td><td>7 / 30</td><td>30 / 30</td><td>10 / 30</td></tr>
  </tbody>
</table>

충돌은 Rule-based 7회, Hybrid 10회, Imitation Learning 30회였다. Hybrid가 모방학습의 실패를 크게 줄이기는 했지만 Rule-based보다 더 안전하지는 않았다.

두 방식을 결합하는 것만으로 낯선 환경 문제가 해결되지는 않았다.

## Technical Challenges

### Collision-free path와 Drivable path의 차이

장애물을 피한다고 해서 실제로 주행 가능한 경로가 되는 것은 아니었다. 도로 영역을 고려하지 않은 상태에서 생성한 Lattice 경로가 인도 방향으로 향하는 경우가 있었고, 실제 주행 가능 영역을 경로 생성 조건에 포함할 필요가 있었다.

### 큰 장애물에 대한 단일 회피 경로의 한계

대각선 버스와 같이 큰 장애물이 경로를 넓게 막으면 최초 후보 경로까지 차단되는 경우가 있었다. 이를 대비해 추가 후보를 생성하거나 다시 계획하는 구조가 필요했다.

## Takeaways

Town04에서는 동작하던 방식도 장애물 위치가 달라지자 결과가 크게 달라졌다. 특히 모방학습은 Town03의 30회 주행에서 모두 충돌하여 학습 데이터 밖의 상황에 취약했다.

Lattice 회피에서는 장애물과 충돌하지 않는 것만으로 충분하지 않았고 실제 도로 영역과 재계획까지 함께 고려해야 했다. 이 프로젝트 이후에는 알고리즘의 평균 성능과 함께 어떤 조건에서 실패하는지를 반복 실험으로 확인하는 문제에도 관심을 갖게 되었다.
