---
layout: kookmin_chapter
title: Why the Vehicle Accelerated Inside an S-Curve
subtitle: 도로가 직선처럼 보이는 시점과 차량이 실제로 안정되는 시점의 차이를 rosbag으로 추적
description: Rosbag-based analysis of premature Straight-state transition, acceleration, and oscillation in an S-curve.
permalink: /projects/02-kookmin-2026/s-curve-failure-analysis/
nav: false
chapter_badge: Chapter 5 of 6
chapter_key: scurve
previous_url: /projects/02-kookmin-2026/obstacle-detection-timing/
previous_label: Obstacle Detection
next_url: /projects/02-kookmin-2026/mission-integration-result/
next_label: Mission Integration & Result
---

## Observation — Acceleration Before Stabilization

S-curve의 변곡점과 출구에서 차량이 갑자기 가속한 뒤 횡방향 오차가 커지고 좌우로 흔들리는 문제가 나타났다. 전방 영상에서는 도로가 잠시 직선처럼 보였지만, 차량의 heading과 횡방향 위치는 아직 다음 곡선에 맞게 안정되지 않은 상태였다.

<!-- Source: drive_diag_20260821_162803 rosbag; source time: 00:01:36.200–00:01:43.800; this is the actual S-curve immediately after the Lane-page clip. -->
<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/kookmin/scurve_state_failure.mp4" poster="/assets/img/projects/kookmin/scurve_state_failure_poster.webp" aria_label="Source-synchronized replay of an actual S-curve vehicle run" controls=true %}
  <figcaption><strong>Offline rosbag replay analysis.</strong> Lane 페이지 영상 직후 이어지는 실제 S자 주행. Camera, YOLO 중앙선 검출과 center path에 같은 시점의 상태 및 제어 명령을 함께 표시했다.</figcaption>
</figure>

## Trace the Chain in rosbag

인지 결과, lane-control state, 횡방향 오차, heading, 속도 명령, 조향 명령을 같은 source time에 맞춰 다시 확인했다. Lane 영상이 끝나는 96.20초부터 S자 구간이 시작되며, 96.58초에 `Curve`로 전환된 뒤 연속 곡선이 끝날 때까지 `Straight`로 다시 바뀌지 않았다. CTE와 heading, 조향 명령의 부호가 순서대로 바뀌는 모습에서도 좌우 곡선이 이어지는 실제 S자 주행을 확인할 수 있다.

아래 세 그래프는 영상과 동일한 실제 S자 주행 rosbag의 96.20–103.80초를 같은 source time으로 정렬한 분석이다. 옅은 파란색 구간은 `Curve` 상태가 유지된 구간이며, 회색 점선은 S자 진입 시점의 상태 전환을 나타낸다.

<figure class="project-media">
  <img src="{{ '/assets/img/projects/kookmin/scurve_state_speed_timeline.webp' | relative_url }}" alt="Offline rosbag timeline of lane state and speed command through the actual S-curve" width="1121" height="623" loading="lazy" decoding="async">
  <figcaption><strong>Offline rosbag replay analysis.</strong> 96.58초에 `Curve`로 전환된 뒤 실제 S자 구간이 끝날 때까지 짧은 `Straight` 전환 없이 상태가 유지된다.</figcaption>
</figure>

<figure class="project-media">
  <img src="{{ '/assets/img/projects/kookmin/scurve_cte_heading_timeline.webp' | relative_url }}" alt="Offline rosbag timeline of cross-track error and heading through consecutive S-curve bends" width="1116" height="623" loading="lazy" decoding="async">
  <figcaption><strong>Offline rosbag replay analysis.</strong> 연속된 좌우 곡선에서 CTE와 heading의 방향이 바뀌는 실제 S자 주행 상태.</figcaption>
</figure>

<figure class="project-media">
  <img src="{{ '/assets/img/projects/kookmin/scurve_steering_timeline.webp' | relative_url }}" alt="Offline rosbag timeline of alternating steering commands through the actual S-curve" width="1101" height="623" loading="lazy" decoding="async">
  <figcaption><strong>Offline rosbag replay analysis.</strong> 연속 곡선의 방향 변화에 따라 조향 명령의 부호가 음→양→음으로 바뀐다.</figcaption>
</figure>

## Fix — Delay the State Transition

도로가 직선으로 보였다는 이유만으로 즉시 가속하지 않도록, `Straight` 조건이 검출된 뒤에도 약 0.2초 동안 `Curve` 상태를 유지하고 차량이 안정된 다음 전환하도록 수정했다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/kookmin/scurve_state_transition.svg' | relative_url }}" alt="S-curve state transition before and after adding an approximately 0.2-second Curve-state hold" width="960" height="420" loading="lazy" decoding="async">
  <figcaption>관찰한 상태 전환과 실제 적용한 약 0.2초 hold를 정리한 도식.</figcaption>
</figure>

수정 후 실차 재주행에서는 같은 조기 가속과 흔들림이 다시 나타나지 않았다. 이 사례에서 핵심은 “도로가 직선으로 보임”과 “차량이 안정됨”을 같은 조건으로 취급하지 않는 것이었다.
