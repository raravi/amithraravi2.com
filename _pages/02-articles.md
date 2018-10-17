---
layout: archive
title: Articles
permalink: /articles/
---
**All** / [Tech](/articles/tech) / [Personal](/articles/personal)

<div class="tiles">
{% for post in site.posts %}
	{% if post.layout == "article" %}
		{% include post-grid.html %}
	{% endif %}
{% endfor %}
</div><!-- /.tiles -->
