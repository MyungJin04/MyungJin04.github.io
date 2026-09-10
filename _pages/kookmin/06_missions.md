---
layout: kookmin_chapter
title: Missions, Final Integration & Competition Result
subtitle: 고정된 대회 미션 규칙을 하나의 차량에 통합하고 최종 전 코스를 완주
description: Final Kookmin competition mission integration and verified 7th-place full-course completion.
permalink: /projects/02-kookmin-2026/mission-integration-result/
nav: false
chapter_badge: Chapter 6 of 6
chapter_key: missions
previous_url: /projects/02-kookmin-2026/s-curve-failure-analysis/
previous_label: S-Curve Failure Analysis
next_url: /projects/02-kookmin-2026/what-followed/
next_label: What This Project Led Me To
---

## Mission Integration

최종 차량에는 차선 및 S-curve 주행, 라바콘, 정적·동적 장애물, 신호등, 좌회전과 shortcut 미션을 연결했다. Mission Manager가 구간과 인지 상태에 따라 해당 제어 출력을 선택하도록 구성했다.

<div class="mission-flow" aria-label="Competition mission flow">
  <span>Lane / S-Curve</span><b>→</b><span>Cone Path</span><b>→</b><span>Static / Dynamic Obstacles</span><b>→</b><span>Traffic Light</span><b>→</b><span>Left Turn / Shortcut</span>
</div>

## Scope of the Avoidance Logic

장애물 구간의 이동 패턴은 대회 환경에서 정해져 있었다. 정적·동적 장애물을 판단한 뒤 `lane 1 → lane 2`처럼 미리 정한 차로 전환 규칙으로 회피했다. 따라서 이 구현을 임의 환경의 장애물에 대응하는 일반 경로 계획기로 설명하지 않는다.

라바콘 구간에서는 좌·우 cluster의 중간점을 경로로 만들고 Pure Pursuit으로 추종했다. 신호등은 YOLO의 `red`, `green`, `left` 결과를 정지, 직진 유지, 좌회전 진입으로 연결했다.

## Competition Run

<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/kookmin/kookmin_demo.mp4" poster="/assets/img/projects/kookmin/kookmin_poster.webp" aria_label="Final Kookmin autonomous driving competition mission montage" controls=true %}
  <figcaption><strong>Official competition broadcast derivative.</strong> 실제 대회 주행의 차선, 라바콘과 후반 주행 장면을 10초로 정리했다. 방송 watermark를 유지했다. <a href="https://www.youtube.com/watch?v=CcfXS3UFL0A&t=17782s" target="_blank" rel="noopener noreferrer">Full competition run ↗</a></figcaption>
</figure>

## Result

<div class="carla-result-grid" aria-label="Kookmin competition result">
  <div><small>FINAL STANDING</small><strong>7th / 114</strong><span>teams</span></div>
  <div><small>COURSE</small><strong>Completed</strong><span>full autonomous-driving course</span></div>
  <div><small>SYSTEM</small><strong>Integrated</strong><span>perception, mission logic, and control</span></div>
</div>

공개 결과표에는 9위로 표시되어 있으나, 같은 결과 페이지의 규정 위반 공지에 따라 상위 두 팀이 제외되어 최종 순위는 7위였다. <a href="https://auto-contest.kookmin.ac.kr/%EA%B2%BD%EA%B8%B0%EA%B2%B0%EA%B3%BC" target="_blank" rel="noopener noreferrer">Official Results ↗</a>

<div class="carla-callout carla-callout--plain">
  <small>Final Outcome</small>
  <p>실차 stack을 전 코스에 연결한 뒤 failure 주행을 기록하고 수정·재시험한 결과, 대회에서 전 코스를 완주했다.</p>
</div>
