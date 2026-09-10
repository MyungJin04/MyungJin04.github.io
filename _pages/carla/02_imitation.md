---
layout: carla_chapter
title: Imitation Learning
subtitle: Demonstration data에서 빠져 있던 recovery behavior를 찾아 보완한 과정
description: CARLA imitation-learning data collection, recovery driving data, and training workflow setback.
permalink: /projects/01-carla-hybrid/imitation-learning/
nav: false
chapter: 2
chapter_key: imitation
previous_url: /projects/01-carla-hybrid/rule-based-baseline/
previous_label: Rule-based Baseline
next_url: /projects/01-carla-hybrid/hybrid-approach/
next_label: Hybrid Approach
---

## Why Imitation Learning?

E2E driving을 처음 구현하기 위한 현실적인 learning approach로 Imitation Learning을 선택했다. 직접 demonstration data를 만들 수 있고, Reinforcement Learning보다 프로젝트 기간과 사용 가능한 하드웨어 안에서 주행 정책을 구현하기 적합했다.

기본 주행 데이터는 Rule-based vehicle을 주행시켜 수집했다. Lattice보다 부드러운 장애물 회피 동작을 보여주기 위한 demonstration은 keyboard driving으로 추가했다. 모델은 경량 CNN을 사용했으며, architecture 자체보다 closed-loop 주행에서 나타나는 행동과 실패를 비교하는 데 초점을 두었다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/carla/imitation_data_comparison.svg' | relative_url }}" alt="Comparison between normal driving demonstrations and recovery demonstrations returning from deviation to the lane center" width="960" height="410" loading="lazy" decoding="async">
  <figcaption><strong>Normal vs Recovery Demonstration.</strong> 정상 상태의 주행뿐 아니라 편차가 생긴 상태에서 차선 중앙으로 돌아오는 과정이 필요했다.</figcaption>
</figure>

## Problem — No Recovery Behavior in the Dataset

정상 주행 데이터 위주로 학습한 모델은 차선에서 벗어나거나 yaw가 틀어진 뒤 정상 경로로 돌아오는 행동을 학습하지 못했다. 작은 초기 조향 오차가 누적되면 lane departure로 이어졌고, dataset 안에 복귀 과정이 없기 때문에 스스로 원래 경로를 회복하지 못했다.

<div class="carla-figure-grid">
  <figure>
    <img src="{{ '/assets/img/projects/carla/imitation_lane_departure.webp' | relative_url }}" alt="CARLA vehicle outside the lane after imitation-learning lane departure" width="960" height="540" loading="lazy" decoding="async">
    <figcaption><strong>Observed problem.</strong> lane departure 이후 도로 가장자리로 벗어난 실제 프로젝트 장면.</figcaption>
  </figure>
  <figure>
    <img src="{{ '/assets/img/projects/carla/imitation_recovery.webp' | relative_url }}" alt="CARLA vehicle driving within the lane after adding recovery demonstrations" width="960" height="540" loading="lazy" decoding="async">
    <figcaption><strong>Recovery-data run.</strong> recovery demonstration을 보강한 뒤 기록한 실제 프로젝트 장면.</figcaption>
  </figure>
</div>

## Solution — Add Recovery Driving Data

다양한 yaw error와 lateral deviation 상태에서 차선 중앙으로 돌아오는 과정을 직접 수집했다. 정상 주행만 반복하는 대신, 편차가 생긴 상태와 복귀 조향을 dataset에 포함하고 <strong>54,000장의 recovery images</strong>를 추가했다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/carla/recovery_dataset.svg' | relative_url }}" alt="Recovery dataset composition with yaw error, lateral deviation, return trajectory, and 54,000 added images" width="960" height="410" loading="lazy" decoding="async">
  <figcaption><strong>Recovery dataset composition.</strong> yaw·lateral deviation 상태와 차선 중앙으로 돌아오는 과정을 포함해 54,000장을 추가했다.</figcaption>
</figure>

## Engineering Setback — Training Data Loss

<div class="carla-callout">
  <small>Engineering Setback</small>
  <h3>SSD failure during long-running training</h3>
  <p>학교 컴퓨터에서 장시간 학습하던 중 SSD failure가 발생해 당시 저장되어 있던 학습 데이터와 진행 결과가 손실되었다. 남은 기간에는 두 대의 개인 PC를 이용해 데이터 수집과 학습을 다시 진행했다.</p>
  <p>이 사건은 주행 실패의 원인과는 별개의 research-workflow setback이다. 이후 dataset, model checkpoint, experiment result를 별도 저장소에 정기적으로 백업할 필요가 있었다.</p>
</div>

<figure class="project-media">
  <img src="{{ '/assets/img/projects/carla/training_data_loss.webp' | relative_url }}" alt="Photograph of the school computer displaying an SSD I/O and critical medium error" width="1260" height="540" loading="lazy" decoding="async">
  <figcaption>당시 학교 컴퓨터에서 확인한 SSD I/O error. 제공된 프로젝트 발표 자료에 포함된 실제 사진을 crop해 사용했다.</figcaption>
</figure>
