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

<!-- Source: drive_diag_20260821_124059 rosbag; source time: 00:00:38.500–00:00:42.764; actual Camera and synchronized diagnostics. -->
<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/kookmin/scurve_state_failure.mp4" poster="/assets/img/projects/kookmin/scurve_state_failure_poster.webp" aria_label="Source-synchronized replay of an actual S-curve vehicle run" controls=true %}
  <figcaption><strong>Offline rosbag replay analysis.</strong> 실제 S자 연속 곡선 주행의 Camera와 center path. 같은 주행의 `Straight`/`Curve` 상태와 제어 명령은 아래 그래프에 source time으로 정렬했다.</figcaption>
</figure>

## Trace the Chain in rosbag

인지 결과, lane-control state, 횡방향 오차, heading, 속도 명령, 조향 명령을 같은 source time에 맞춰 다시 확인했다. S-curve로 이어지는 변곡 구간에서 `Straight` 상태가 유지되는 동안 속도 명령이 증가했지만, CTE와 heading 관련 상태는 아직 안정되지 않았다.

아래 세 그래프는 실제 S자 주행 rosbag의 38.40–40.20초를 같은 source time으로 정렬한 분석이다. 옅은 노란색 구간은 `Straight` 상태가 유지된 구간이며, 회색 점선 뒤에서 `Curve` 상태가 다시 시작된다.

<figure class="project-media">
  <img src="{{ '/assets/img/projects/kookmin/scurve_state_speed_timeline.webp' | relative_url }}" alt="Offline rosbag timeline of lane state and speed command before the S-curve Curve state resumes" width="1085" height="623" loading="lazy" decoding="async">
  <figcaption><strong>Offline rosbag replay analysis.</strong> 차량 상태가 `Straight`로 남아 있는 동안 속도 명령이 증가한 뒤 `Curve` 상태가 다시 시작된다.</figcaption>
</figure>

<figure class="project-media">
  <img src="{{ '/assets/img/projects/kookmin/scurve_cte_heading_timeline.webp' | relative_url }}" alt="Offline rosbag timeline of cross-track error and heading during the S-curve state transition" width="1116" height="623" loading="lazy" decoding="async">
  <figcaption><strong>Offline rosbag replay analysis.</strong> `Straight` 상태가 유지되는 동안 CTE가 남아 있고 heading도 계속 변해 차량 정렬이 끝나지 않았음을 보여준다.</figcaption>
</figure>

<figure class="project-media">
  <img src="{{ '/assets/img/projects/kookmin/scurve_steering_timeline.webp' | relative_url }}" alt="Offline rosbag timeline of the steering command before and after the Curve state resumes" width="1101" height="623" loading="lazy" decoding="async">
  <figcaption><strong>Offline rosbag replay analysis.</strong> `Curve` 상태가 다시 시작되기 전에도 조향 명령의 방향과 크기가 계속 변한다.</figcaption>
</figure>

## Fix — Delay the State Transition

도로가 직선으로 보였다는 이유만으로 즉시 가속하지 않도록, `Straight` 조건이 검출된 뒤에도 약 0.2초 동안 `Curve` 상태를 유지하고 차량이 안정된 다음 전환하도록 수정했다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/kookmin/scurve_state_transition.svg' | relative_url }}" alt="S-curve state transition before and after adding an approximately 0.2-second Curve-state hold" width="960" height="420" loading="lazy" decoding="async">
  <figcaption>관찰한 상태 전환과 실제 적용한 약 0.2초 hold를 정리한 도식.</figcaption>
</figure>

수정 후 실차 재주행에서는 같은 조기 가속과 흔들림이 다시 나타나지 않았다. 이 사례에서 핵심은 “도로가 직선으로 보임”과 “차량이 안정됨”을 같은 조건으로 취급하지 않는 것이었다.
