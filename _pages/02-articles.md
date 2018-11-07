---
layout: archive
title: Articles
permalink: /articles/
---
<div class="new-button-group filters-button-group">
		<button class="new-button is-checked" data-filter="*">All</button>
		<button class="new-button" data-filter=".tech">Tech</button>
	  <button class="new-button" data-filter=".personal">Personal</button>
</div>

<div class="articles-tiles">
{% for post in site.posts %}
	{% if post.layout == "article" %}
		<div class="col {{post.categories[1]}}">
		{% include post-grid.html %}
		</div>
	{% endif %}
{% endfor %}
</div><!-- /.tiles -->
