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

<!-- Source: 룩어헤드 변함 v2 s자 차선이탈_08_06.mp4; trim: 00:12–00:24; crop: Centerlane Tracer window; original preserved. -->
<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/kookmin/scurve_state_failure.mp4" poster="/assets/img/projects/kookmin/scurve_state_failure_poster.webp" aria_label="Recorded S-curve state transition failure during real vehicle testing" controls=true %}
  <figcaption><strong>Observed S-curve failure.</strong> 실제 실차 주행에서 Camera 경로와 `Straight`/`Curve` 상태가 바뀌는 구간. 원본 desktop 녹화에서 관련 창만 crop했다.</figcaption>
</figure>

## Trace the Chain in rosbag

인지 결과, lane-control state, 횡방향 오차, heading, 속도 명령, 조향 명령을 같은 source time에 맞춰 다시 확인했다. 변곡점에서 차량이 안정되기 전에 `Straight`로 분류된 약 0.2초 구간이 있었고, 이 상태 전환이 속도 증가와 이어졌다.

<figure class="project-media">
  <img src="{{ '/assets/img/projects/kookmin/scurve_camera_sequence.webp' | relative_url }}" alt="Consecutive real vehicle camera frames with reconstructed center path, cross-track error, and steering command" width="1200" height="676" loading="lazy" decoding="async">
  <figcaption><strong>Offline rosbag replay analysis.</strong> 실제 Camera frame에 center path, CTE와 steering command를 시간 순서로 맞춘 분석 결과.</figcaption>
</figure>

아래 세 패널은 모두 개선 전 주행을 offline rosbag replay로 정렬한 분석이다. 녹색 점선은 제어기가 활성화된 첫 frame, 보라색 점선은 짧게 `Straight`로 판단된 구간의 시작을 나타낸다.

<figure class="project-media">
  <img src="{{ '/assets/img/projects/kookmin/scurve_analysis_speed_command.webp' | relative_url }}" alt="Offline rosbag analysis panel of speed command, CTE gain, and heading weight around the brief Straight-state transition" width="1225" height="640" loading="lazy" decoding="async">
  <figcaption><strong>Offline rosbag replay analysis.</strong> 제어 상태 전환 구간의 속도 명령과 CTE 및 heading gain 변화.</figcaption>
</figure>

<figure class="project-media">
  <img src="{{ '/assets/img/projects/kookmin/scurve_analysis_lateral_target.webp' | relative_url }}" alt="Offline rosbag analysis panel comparing reconstructed lateral error and the LaneControlState target used as Stanley CTE input" width="1225" height="675" loading="lazy" decoding="async">
  <figcaption><strong>Offline rosbag replay analysis.</strong> 복원한 횡방향 오차와 Stanley CTE 입력으로 사용된 LaneControlState target의 변화.</figcaption>
</figure>

<figure class="project-media">
  <img src="{{ '/assets/img/projects/kookmin/scurve_analysis_steering_command.webp' | relative_url }}" alt="Offline rosbag analysis panel decomposing heading and CTE terms in the steering command" width="1225" height="660" loading="lazy" decoding="async">
  <figcaption><strong>Offline rosbag replay analysis.</strong> heading term과 CTE term이 합쳐진 조향 명령의 변화.</figcaption>
</figure>

<p class="carla-metric-note"><a href="{{ '/assets/img/projects/kookmin/oscillation_evidence_chain.webp' | relative_url }}">View full analysis ↗</a></p>

## Fix — Delay the State Transition

도로가 직선으로 보였다는 이유만으로 즉시 가속하지 않도록, `Straight` 조건이 검출된 뒤에도 약 0.2초 동안 `Curve` 상태를 유지하고 차량이 안정된 다음 전환하도록 수정했다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/kookmin/scurve_state_transition.svg' | relative_url }}" alt="S-curve state transition before and after adding an approximately 0.2-second Curve-state hold" width="960" height="420" loading="lazy" decoding="async">
  <figcaption>관찰한 상태 전환과 실제 적용한 약 0.2초 hold를 정리한 도식.</figcaption>
</figure>

수정 후 실차 재주행에서는 같은 조기 가속과 흔들림이 다시 나타나지 않았다. 이 사례에서 핵심은 “도로가 직선으로 보임”과 “차량이 안정됨”을 같은 조건으로 취급하지 않는 것이었다.
