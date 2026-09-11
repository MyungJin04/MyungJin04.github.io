---
layout: kookmin_chapter
title: When Lane Perception Met Real Lighting
subtitle: 실내 형광등 반사에서 흔들린 차선 결과를 rosbag으로 비교하고 인식 우선순위를 변경
description: Lane perception debugging under real indoor lighting using YOLO, OpenCV, and rosbag replay.
permalink: /projects/02-kookmin-2026/lane-perception-lighting/
nav: false
chapter_badge: Chapter 3 of 6
chapter_key: lane
previous_url: /projects/02-kookmin-2026/platform-switch-recovery/
previous_label: Platform Switch Recovery
next_url: /projects/02-kookmin-2026/obstacle-detection-timing/
next_label: Obstacle Detection
---

## From Simulation to the Competition Venue

simulation과 초기 실내 주행에서는 OpenCV 차선 결과를 기본으로 사용하고, 차선 중심이 크게 이동할 때 YOLO 결과를 보조로 적용했다. 대회장 바닥에서는 형광등 반사가 차선과 비슷한 밝은 선으로 나타났고, OpenCV와 YOLO 결과가 모두 순간적으로 이동하거나 끊기는 구간이 생겼다.

<!-- Source: drive_diag_20260821_162803 rosbag; source time: 00:01:33.800–00:01:36.200; actual Camera, YOLO detections, center path, and control topics. -->
<figure class="project-media">
  {% include project_video.liquid src="/assets/video/projects/kookmin/lane_perception_debug.mp4" poster="/assets/img/projects/kookmin/lane_perception_debug_poster.webp" aria_label="Stable YOLO lane perception during an actual indoor vehicle run" controls=true %}
  <figcaption><strong>Offline rosbag replay analysis.</strong> 통합 주행의 `LANE` 구간에서 기록한 전방 Camera, YOLO 중앙선 검출과 최종 center path.</figcaption>
</figure>

## Compare the Failure Frames

같은 rosbag 구간에서 Camera frame, OpenCV 기반 선분과 선택된 target의 변화를 함께 확인했다. 특정 frame 하나만 보는 대신 target이 갑자기 이동하기 전·현재·다음 frame을 묶어 비교했다.

<figure class="project-media">
  <img src="{{ '/assets/img/projects/kookmin/lane_target_jumps.webp' | relative_url }}" alt="Offline contact sheet of consecutive lane perception frames around large target jumps" width="1200" height="600" loading="lazy" decoding="async">
  <figcaption><strong>Offline rosbag replay analysis.</strong> target 이동 폭이 컸던 구간의 연속 frame과 OpenCV 디버그 출력을 묶은 실제 기록.</figcaption>
</figure>

## Change the Priority

기록을 반복 비교했을 때 해당 조명 조건에서는 YOLO 결과가 전반적으로 더 안정적이었다. 그래서 YOLO를 기본 차선 결과로 사용하고, 큰 jump가 생기는 경우 OpenCV 결과로 보정하도록 우선순위를 바꿨다. 두 방식 중 하나를 항상 옳다고 가정하지 않고 실제 주행 조건에서 나타난 흔들림을 기준으로 역할을 다시 나눴다.

<div class="carla-analysis-grid" aria-label="Lane perception priority before and after">
  <div><small>Initial</small><p>OpenCV main → 큰 jump에서 YOLO fallback</p></div>
  <div><small>Revised</small><p>YOLO main → 큰 jump에서 OpenCV correction</p></div>
</div>
