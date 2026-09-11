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

실차 튜닝 과정에서 S-curve의 변곡점과 curve exit 부근에서 차량이 아직 곡선을 따라 정렬되는 중인데도 잠깐 `Straight` state로 전환되며 가속하는 현상을 관찰했다. 전방 도로는 순간적으로 직선처럼 보였지만, 차량의 heading과 횡방향 위치는 다음 곡선에 맞게 안정되지 않은 상태였다.

### Actual S-Curve Driving Context

<!-- Source: drive_diag_20260821_162803 rosbag; source time: 00:01:36.200–00:01:43.800; this is the actual S-curve immediately after the Lane-page clip. -->
<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/kookmin/scurve_state_failure.mp4" poster="/assets/img/projects/kookmin/scurve_state_failure_poster.webp" aria_label="Actual S-curve driving context from the real vehicle test" controls=true %}
  <figcaption><strong>Actual S-Curve Driving Context.</strong> 문제를 분석한 S자 구간의 실제 주행 장면. 도로 형상과 차량 거동을 보여주기 위한 영상이며, brief `Straight` transition 자체의 직접 증거로 사용하지 않는다.</figcaption>
</figure>

## What the Logs Showed

영상만으로는 짧은 상태 전환의 원인을 확인하기 어려워 rosbag에서 lane-control state, speed command, CTE, heading, steering command를 같은 시간축으로 비교했다. brief `Straight` transition 자체가 영상이나 아래 그래프에 직접 기록된 것은 아니므로, 이 자료를 해당 순간의 증거로 사용하지 않았다.

아래 애니메이션은 수정 후 실차 재주행의 실제 rosbag 측정값을 시간 순서대로 보여준다. CTE와 heading은 S자 구간을 지나는 동안 큰 폭으로 계속 변했으며, 전방 도로가 잠시 직선처럼 보이는 순간에도 차량은 직진 주행이 가능할 만큼 정렬된 상태가 아니었다.

<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/kookmin/scurve_cte_heading_timeline.mp4" poster="/assets/img/projects/kookmin/scurve_cte_heading_timeline.webp" aria_label="Animated offline rosbag plot showing CTE and heading continuing to change through the S-curve" %}
  <figcaption><strong>Offline rosbag replay analysis.</strong> S자 구간을 통과하는 동안 CTE와 heading이 계속 크게 변했다. 차량이 아직 곡선 주행에서 벗어나 직진 주행 상태로 정렬되지 않았음을 보여준다.</figcaption>
</figure>

## Fix — Delay the State Transition

도로가 직선으로 보였다는 이유만으로 즉시 가속하지 않도록, `Straight` 조건이 검출된 뒤에도 약 0.2초 동안 `Curve` 상태를 유지하고 차량이 안정된 다음 전환하도록 수정했다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/kookmin/scurve_state_transition.svg' | relative_url }}" alt="S-curve state transition before and after adding an approximately 0.2-second Curve-state hold" width="960" height="420" loading="lazy" decoding="async">
  <figcaption>관찰한 상태 전환과 실제 적용한 약 0.2초 hold를 정리한 도식.</figcaption>
</figure>

## Verification After the Fix

약 0.2초 `Curve`-state hold를 적용한 뒤 실차로 다시 주행했다. 아래 애니메이션은 Lane 영상이 끝나는 96.20초부터 이어지는 S자 구간의 lane-control state와 speed command를 같은 시간축으로 보여준다. 96.58초에 `Curve`로 전환된 뒤 연속 곡선이 끝날 때까지 상태가 유지되었고, 이전에 관찰했던 짧은 `Straight` transition은 이 재주행에서 다시 나타나지 않았다.

<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/kookmin/scurve_state_speed_timeline.mp4" poster="/assets/img/projects/kookmin/scurve_state_speed_timeline.webp" aria_label="Animated post-fix verification showing Curve state maintained through the actual S-curve" %}
  <figcaption><strong>Offline rosbag replay analysis · Curve state maintained after fix.</strong> 약 0.2초 Curve-state hold 적용 후, 실제 S자 구간에서 <code>Curve</code> state가 유지되었음을 보여주는 수정 후 검증 자료다.</figcaption>
</figure>

이 사례의 핵심은 “앞 도로가 직선으로 보인다”는 것과 “차량이 직진 주행이 가능할 만큼 안정화되었다”는 것을 같은 조건으로 취급하지 않는 것이었다.
