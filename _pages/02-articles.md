---
layout: archive
title: Articles
permalink: /articles/
---
<div class="filters-button-group">
		<button class="filters-button is-checked button-all" data-filter="*">All</button>
		<button class="filters-button button-tech" data-filter=".tech">Tech</button>
	  <button class="filters-button button-personal" data-filter=".personal">Personal</button>
</div>
<div class="div-20-high"></div>
{% assign counter = 1 %}
<div class="articles-tiles-grid">
	{%- for post in site.posts %}
		{%- if post.layout == "article" -%}
			{%- assign remainder = counter | modulo: 6 -%}
			{%- if remainder == 0 %}
			<div class="col tech personal">
				{% include advertising-grid.html -%}
			</div>
			{%- endif %}
			<article class="article-tile col {{post.categories[1]}}">
				<a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">
					<p class="post-teaser">
						{%- if post.teaser %}
						<img src="{{ site.url }}{{ site.images }}{{ post.teaser }}" alt="teaser">
						{%- else %}
						<img src="{{ site.url }}{{ site.images }}{{ site.teaser }}" alt="teaser">
						{%- endif %}
					</p>
					{%- if post.date %}
						<p class="entry-date date published">
							<time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date: "%B %d, %Y" }}</time>
						</p>
					{%- endif %}
				<h2 class="post-title">{{ post.title }}</h2>
				<p class="post-excerpt">{{ post.excerpt | strip_html | strip | truncate: 160 }}</p></a>
			</article><!-- /.tile -->
			{%- assign counter=counter | plus:1 -%}
		{%- endif -%}
	{%- endfor %}
</div><!-- /.tiles -->
