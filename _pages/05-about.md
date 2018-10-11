---
layout: media
title: About
permalink: /about/
---

<div class="row">
{% for content in site.data.aboutgrid %}
	{% include about-grid.html %}
{% endfor %}
</div>

{% include about-me.html %}
