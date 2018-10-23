---
layout: archive
title: Articles
permalink: /articles/
---
**All** / [Tech](/articles/tech) / [Personal](/articles/personal)

<div class="articles-tiles">
{% for post in site.posts %}
	{% if post.layout == "article" %}
		<div class="col">
		{% include post-grid.html %}
		</div>
	{% endif %}
{% endfor %}
</div><!-- /.tiles -->
