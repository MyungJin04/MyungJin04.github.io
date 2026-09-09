---
layout: home
title: About
permalink: /
nav: false
profile_image: /assets/img/profile/myungjin-song.webp
profile_image_alt: Myungjin Song profile photo
cv_pdf:
---

<section aria-labelledby="about-me-heading">
  <h2 id="about-me-heading">About Me</h2>
  <div class="about-copy" markdown="1">

안녕하세요. 건국대학교 스마트운행체공학과에 재학 중인 송명진입니다.

자율주행 대회와 수업 프로젝트를 통해 MORAI·CARLA 시뮬레이션, XYCAR 실차, 1/5 스케일 차량, ROS2 기반 차량–드론 시스템 등을 경험했습니다. 그 과정에서 경로 추종과 장애물 회피, 카메라·LiDAR 기반 인식, 모방학습 기반 주행 등을 직접 적용해봤습니다.

특히 주행이 실패했을 때 rosbag이나 실험 결과를 보면서 어디서 문제가 시작됐는지 찾고, 수정한 뒤 다시 주행해보는 과정에 흥미를 느꼈습니다. 최근에는 학습 기반 자율주행과 다양한 환경에서의 안전성 평가에 관심을 넓히고 있으며, 모바일 로봇을 포함한 자율 시스템 전반을 더 경험해보고 싶습니다.

  </div>
</section>

<section aria-labelledby="research-interests-heading">
  <h2 id="research-interests-heading">Research Interests</h2>
  <div class="interest-grid">
    <article class="interest-card">
      <h3>Autonomous Driving &amp; Mobile Robotics</h3>
      <p>자율주행 차량 및 다양한 모바일 로봇 시스템</p>
    </article>
    <article class="interest-card">
      <h3>Perception, Planning &amp; Decision-Making</h3>
      <p>환경 인식부터 경로 계획과 행동 결정까지의 자율 시스템 구성</p>
    </article>
    <article class="interest-card">
      <h3>Learning-based Autonomous Systems</h3>
      <p>Imitation Learning, E2E 등 학습 기반 판단 및 제어</p>
    </article>
    <article class="interest-card">
      <h3>Simulation &amp; Safety Evaluation</h3>
      <p>다양한 조건의 반복 실험, 실패 분석, 자율 시스템의 안전성 평가</p>
    </article>
  </div>
</section>

<section aria-labelledby="selected-projects-heading">
  <div class="section-heading">
    <div>
      <h2 id="selected-projects-heading">Selected Projects</h2>
    </div>
    <a href="{{ '/projects/' | relative_url }}">View all projects →</a>
  </div>
  {% assign selected_projects = site.projects | where: "selected", true | sort: "importance" %}
  <div class="project-grid">
    {% for project in selected_projects %}
      {% include project_card.liquid project=project %}
    {% endfor %}
  </div>
</section>

<section class="current-project" aria-labelledby="current-project-heading">
  <h2 id="current-project-heading">Current Project</h2>
  {% assign current_project = site.projects | where: "current_featured", true | first %}
  {% if current_project %}
    <div class="project-grid">
      {% include project_card.liquid project=current_project %}
    </div>
  {% endif %}
</section>
