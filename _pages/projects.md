---
layout: default
title: Projects
permalink: /projects/
nav: true
nav_order: 2
description: Myungjin Song's autonomous driving and autonomous systems projects
---

<div class="projects-page">
  <h1>Projects</h1>
  <p class="page-intro">수업, 대회 및 개인적으로 진행한 자율주행·자율 시스템 프로젝트를 정리했습니다.</p>

  {% assign projects_2026 = site.projects | where: "year", 2026 | sort: "importance" %}
  <section class="project-year" aria-labelledby="projects-2026">
    <h2 id="projects-2026">2026</h2>
    <div class="project-grid">
    {% for project in projects_2026 %}
      {% include project_card.liquid project=project %}
    {% endfor %}
    </div>
  </section>

  {% assign projects_2025 = site.projects | where: "year", 2025 | sort: "importance" %}
  <section class="project-year" aria-labelledby="projects-2025">
    <h2 id="projects-2025">2025</h2>
    <div class="project-grid">
    {% for project in projects_2025 %}
      {% include project_card.liquid project=project %}
    {% endfor %}
    </div>
  </section>
</div>
