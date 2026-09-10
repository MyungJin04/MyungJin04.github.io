---
layout: project
title: "When Simulation Wasn't Enough: Debugging a Real Autonomous Driving Stack"
display_title: "When Simulation Wasn't Enough:<br>Debugging a Real Autonomous Driving Stack"
subtitle: 2026 국민대학교 자율주행 경진대회에서 인지·판단·제어 failure를 분석하고 개선한 과정
description: 실차 자율주행 stack을 통합하고 rosbag으로 인지·판단·제어 failure를 추적해 전 코스를 완주한 프로젝트.
importance: 2
year: 2026
selected: true
current_featured: false
categories: [competition]
type: Competition
period: Jul. 2026 – Aug. 2026
team: 5-person team
status: Completed
environment: [XYCAR, ROS2, Python, C++]
languages: [Python, C++]
card_tags: [YOLO, LiDAR, rosbag]
technologies: [ROS2, YOLO, OpenCV, LiDAR, Stanley, Pure Pursuit, rosbag]
results:
  - 7th / 114 teams
  - Full-course completion
thumbnail:
image:
image_alt:
resources: []
---

{% include kookmin_chapter_nav.liquid current="overview" %}

## Project Overview

초기 simulation과 실내 테스트에서 동작하던 모듈을 XYCAR 실차에 연결하자 조명, 센서 시점, 하드웨어 통신, 상태 전환이 서로 영향을 주며 새로운 failure가 나타났다. 팀은 주행을 rosbag으로 기록하고 인지 결과, 미션 상태, 속도 및 조향 명령을 같은 시간축에서 확인한 뒤 코드를 수정하고 다시 주행했다. 이 과정을 반복해 최종 대회에서 전 코스를 완주했으며 114개 팀 중 7위를 기록했다.

<!-- Source: official competition broadcast; 10-second derivative montage already used by this project. -->
<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/kookmin/kookmin_demo.mp4" poster="/assets/img/projects/kookmin/kookmin_poster.webp" aria_label="2026 Kookmin University autonomous driving competition run montage" controls=true %}
  <figcaption>2026 Kookmin Autonomous Driving Competition. <a href="https://www.youtube.com/watch?v=CcfXS3UFL0A&t=17782s" target="_blank" rel="noopener noreferrer">Competition Run ↗</a></figcaption>
</figure>

## System Overview

<figure class="project-media project-media--concept">
  <span class="concept-label">System Overview</span>
  <img src="{{ '/assets/img/projects/kookmin/system_architecture.svg' | relative_url }}" alt="Kookmin autonomous driving system from camera and LiDAR perception through mission decision, path tracking, and XYCAR control" width="960" height="560" loading="lazy" decoding="async">
  <figcaption>실제 코드와 기록된 ROS2 topic을 바탕으로 정리한 전체 주행 stack. 각 미션의 출력은 Mission Manager를 거쳐 차량 제어로 연결된다.</figcaption>
</figure>

## My Contribution in the Team

5인 팀의 통합 과정에서 YOLO/OpenCV 차선 인식, Camera–LiDAR 정보 결합 기반 장애물 인식, 정적·동적 장애물 회피, 차선/Stanley tuning, 라바콘 경로, 신호등, Mission Manager, rosbag 분석과 실차 tuning 전반의 코드를 직접 수정하고 검증했다. 각 기능은 팀원이 함께 개발한 전체 시스템 안에서 통합했다.

## From First Stack to Final Run

<div class="timeline" aria-label="Development process from initial stack to competition">
  <div><strong>Build</strong><span>차선, 장애물, 라바콘, 신호등 모듈 구성</span></div>
  <div><strong>Integrate</strong><span>Mission Manager와 실차 제어 연결</span></div>
  <div><strong>Diagnose</strong><span>failure 주행을 rosbag으로 기록하고 원인 구간 추적</span></div>
  <div><strong>Retest</strong><span>코드 수정과 반복 주행 후 전 코스 완주</span></div>
</div>

## Read the Research Story

<div class="carla-chapter-grid">
  <a class="carla-chapter-card" href="{{ '/projects/02-kookmin-2026/full-driving-stack/' | relative_url }}">
    <small>CHAPTER 01</small><strong>Building the Full Driving Stack</strong>
    <p>차선, 장애물, 라바콘, 신호등과 차량 제어를 하나의 ROS2 stack으로 연결한 과정.</p><b>Open chapter →</b>
  </a>
  <a class="carla-chapter-card" href="{{ '/projects/02-kookmin-2026/platform-switch-recovery/' | relative_url }}">
    <small>CHAPTER 02</small><strong>Recovering the Vehicle After the Platform Switch</strong>
    <p>Nano PC에서 Jetson으로 전환한 뒤 VESC 통신을 다시 연결한 과정.</p><b>Open chapter →</b>
  </a>
  <a class="carla-chapter-card" href="{{ '/projects/02-kookmin-2026/lane-perception-lighting/' | relative_url }}">
    <small>CHAPTER 03</small><strong>When Lane Perception Met Real Lighting</strong>
    <p>형광등 반사로 흔들린 차선 결과를 비교하고 YOLO/OpenCV 우선순위를 바꾼 과정.</p><b>Open chapter →</b>
  </a>
  <a class="carla-chapter-card" href="{{ '/projects/02-kookmin-2026/obstacle-detection-timing/' | relative_url }}">
    <small>CHAPTER 04</small><strong>Detecting Obstacles Before It Was Too Late</strong>
    <p>늦은 장애물 확인을 Camera-first에서 LiDAR-first 흐름으로 바꾼 과정.</p><b>Open chapter →</b>
  </a>
  <a class="carla-chapter-card" href="{{ '/projects/02-kookmin-2026/s-curve-failure-analysis/' | relative_url }}">
    <small>CHAPTER 05</small><strong>Why the Vehicle Accelerated Inside an S-Curve</strong>
    <p>상태 전환, 속도, 조향을 같은 시간축에서 확인한 대표 failure analysis.</p><b>Open chapter →</b>
  </a>
  <a class="carla-chapter-card" href="{{ '/projects/02-kookmin-2026/mission-integration-result/' | relative_url }}">
    <small>CHAPTER 06</small><strong>Missions, Final Integration &amp; Competition Result</strong>
    <p>고정된 미션 규칙을 통합하고 실제 대회에서 전 코스를 완주한 결과.</p><b>Open chapter →</b>
  </a>
  <a class="carla-chapter-card" href="{{ '/projects/02-kookmin-2026/what-followed/' | relative_url }}">
    <small>FINAL</small><strong>What This Project Led Me To</strong>
    <p>기능 구현에서 실차 failure의 원인 사슬과 검증 방법으로 확장된 질문.</p><b>Open final page →</b>
  </a>
</div>
