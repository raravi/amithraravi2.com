---
layout: archive
title: Articles
permalink: /articles/tech/
---
[All](/articles) / **Tech** / [Personal](/articles/personal) 

<div class="tiles">
{% for category in site.categories %}
  {% if category[0] == "tech" %}
		{% for post in category[1] %}
			{% include post-grid.html %}
		{% endfor %}
	{% endif %}
{% endfor %}
</div><!-- /.tiles -->
