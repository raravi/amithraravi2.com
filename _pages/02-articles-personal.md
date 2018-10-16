---
layout: archive
title: Articles
permalink: /articles/personal/
---
[All](/articles) / [Tech](/articles/tech) / **Personal** 

<div class="tiles">
{% for category in site.categories %}
  {% if category[0] == "personal" %}
		{% for post in category[1] %}
			{% include post-grid.html %}
		{% endfor %}
	{% endif %}
{% endfor %}
</div><!-- /.tiles -->
