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

{% assign counter = 1 %}
<div class="articles-tiles">
{% for post in site.posts %}
	{% if post.layout == "article" %}
		{% assign remainder = counter | modulo: 6 %}
		{% if remainder == 0 %}
			<div class="col {{post.categories[1]}} ad">
			{% include advertising-grid.html %}
			</div>
		{% endif %}
		<div class="col {{post.categories[1]}}">
		{% include post-grid.html %}
		</div>
		{% assign counter = counter | plus:1 %}
	{% endif %}
{% endfor %}
</div><!-- /.tiles -->
