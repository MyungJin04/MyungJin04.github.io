---
layout: default
title: CV
permalink: /cv/
nav: true
nav_order: 3
description: Curriculum vitae of Myungjin Song
cv_pdf:
published: false
---

<div class="cv-page">
  <h1>CV</h1>
  {% if page.cv_pdf %}
    <p><a class="portfolio-button portfolio-button--primary" href="{{ page.cv_pdf | relative_url }}">Download CV</a></p>
  {% else %}
    <div class="coming-soon">
      <strong>Coming Soon</strong>
      <p>CV는 현재 준비 중이다. 파일이 추가되면 이 페이지에서 확인할 수 있다.</p>
    </div>
  {% endif %}
</div>
