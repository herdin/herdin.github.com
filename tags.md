---
layout: page
title: Tags
permalink: /tags/
---
{% for tag in site.tags %}
  <h2>{{ tag.title }}</h2>
  <p>{{ tag.description }}</p>
  <p><a href="{{ tag.url }}">{{ tag.title }}</a></p>
{% endfor %}
