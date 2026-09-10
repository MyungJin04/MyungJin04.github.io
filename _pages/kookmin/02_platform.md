---
layout: kookmin_chapter
title: Recovering the Vehicle After the Platform Switch
subtitle: 대회 약 2주 전 Nano PC에서 Jetson으로 전환한 뒤 끊긴 VESC 통신을 복구
description: Diagnosing and restoring Jetson-to-VESC communication before the Kookmin competition.
permalink: /projects/02-kookmin-2026/platform-switch-recovery/
nav: false
chapter_badge: Chapter 2 of 6
chapter_key: platform
previous_url: /projects/02-kookmin-2026/full-driving-stack/
previous_label: Full Driving Stack
next_url: /projects/02-kookmin-2026/lane-perception-lighting/
next_label: Lane Perception
---

## Why the Platform Changed

초기 개발에는 Nano PC를 사용했다. 대회 약 2주 전 연산 플랫폼을 Jetson으로 바꾸면서 Lane perception은 약 15 Hz, Object perception은 약 10 Hz로 동작할 수 있었다. 그러나 플랫폼을 바꾼 직후 기존 5-pin USB 연결로는 Jetson과 VESC 사이 통신이 되지 않아 차량을 구동할 수 없었다.

## Diagnosis Before Rewiring

ST-Link로 VESC의 STM32가 동작하는 것을 확인했다. 이 확인으로 controller 자체가 완전히 정지한 상황과 Jetson–VESC 통신 경로 문제를 구분했다. 당시 전기적 문제 가능성을 고려했지만 역전류 등 하나의 원인으로 확정하지는 않았다.

<figure class="project-media project-media--concept">
  <span class="concept-label">Conceptual Diagram</span>
  <img src="{{ '/assets/img/projects/kookmin/platform_switch.svg' | relative_url }}" alt="Platform switch from Nano PC to Jetson and restoration of VESC UART communication with an isolated USB-to-TTL adapter" width="960" height="480" loading="lazy" decoding="async">
  <figcaption>Nano PC에서 Jetson으로 전환한 뒤 VESC UART 통신을 복구한 진단 및 연결 흐름.</figcaption>
</figure>

## Communication Recovery

PC와 VESC의 전원 경로를 분리하고 isolated USB-to-TTL adapter를 사용해 통신 신호만 전달했다. GND, TX, RX를 UART로 연결한 뒤 Jetson에서 VESC 명령과 상태 topic을 다시 확인했다.

<div class="carla-analysis-grid" aria-label="Platform recovery evidence">
  <div><small>Before</small><p>Jetson 전환 후 기존 5-pin USB 통신 실패</p></div>
  <div><small>Hardware Check</small><p>ST-Link에서 VESC STM32 동작 확인</p></div>
  <div><small>Change</small><p>전원 경로 분리 후 isolated USB-to-TTL의 GND/TX/RX로 UART 연결</p></div>
  <div><small>Verified</small><p>Jetson–VESC 통신과 차량 명령 전달 복구</p></div>
</div>

이 변경은 연산 장치를 바꾸는 일이 software 설정만의 문제가 아니라 전원과 통신 경계를 함께 검토해야 하는 작업임을 보여 주었다.
