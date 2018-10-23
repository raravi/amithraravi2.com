---
layout: archive
title: Articles
permalink: /articles/personal/
---
[All](/articles) / [Tech](/articles/tech) / **Personal**

<div class="articles-tiles">
{% for category in site.categories %}
  {% if category[0] == "personal" %}
		{% for post in category[1] %}
        <div class="col">
        {% include post-grid.html %}
        </div>
		{% endfor %}
	{% endif %}
{% endfor %}
</div><!-- /.tiles -->
