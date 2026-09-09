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

Hi, I’m Myungjin Song, an undergraduate student in Smart Vehicle Engineering at Konkuk University. Most of my hands-on work so far has been in autonomous driving. I have worked with MORAI and CARLA simulators, an XYCAR platform, a 1/5-scale autonomous vehicle, and a ROS2/Gazebo ground-vehicle–drone project. Across these projects, I have worked on waypoint tracking, obstacle avoidance, camera–LiDAR perception, mission logic, and imitation-learning-based driving.

One experience that shaped my interests was comparing rule-based, imitation-learning, and hybrid driving in CARLA. A method that worked in a familiar environment behaved very differently when obstacle layouts changed. Later, during a real-vehicle competition, I spent a large part of the testing process replaying rosbag logs to trace failures across perception, mission logic, and control. These experiences made me increasingly interested not only in making an autonomous system work, but also in understanding when and why it fails.

I am currently interested in learning-based decision and control, multimodal perception, and the evaluation of autonomous systems under changing or unseen conditions. Although most of my projects have been vehicle-centered, I would like to extend this experience toward broader robotic systems and gain research experience in learning-based autonomy and reliable real-world behavior.

  </div>
</section>

<section aria-labelledby="research-interests-heading">
  <h2 id="research-interests-heading">Research Interests</h2>
  <div class="interest-grid">
    <article class="interest-card">
      <h3>Autonomous Driving &amp; Robotic Systems</h3>
      <p>Vehicle autonomy and robotic systems operating in real-world environments</p>
    </article>
    <article class="interest-card">
      <h3>Perception &amp; Multimodal Sensor Fusion</h3>
      <p>Vision and multi-sensor perception for reliable environment understanding</p>
    </article>
    <article class="interest-card">
      <h3>Learning-based Decision &amp; Control</h3>
      <p>Learning-based policies for planning, decision-making, and control</p>
    </article>
    <article class="interest-card">
      <h3>Simulation, Generalization &amp; Safety Evaluation</h3>
      <p>Closed-loop evaluation, failure analysis, and behavior under unseen conditions</p>
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
