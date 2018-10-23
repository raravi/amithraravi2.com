---
layout: archive
title: Articles
permalink: /articles/tech/
---
[All](/articles) / **Tech** / [Personal](/articles/personal)

<div class="articles-tiles">
{% for category in site.categories %}
  {% if category[0] == "tech" %}
		{% for post in category[1] %}
        <div class="col">
        {% include post-grid.html %}
        </div>
		{% endfor %}
	{% endif %}
{% endfor %}
</div><!-- /.tiles -->
