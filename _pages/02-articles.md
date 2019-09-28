---
layout: archive
title: Articles
permalink: /articles/
---

<div class="article-header">
	<div class="page-title">
		<h2>{{ page.title }}</h2>
	</div>
	<div class="filters-button-group">
		<button class="filters-button is-checked button-all" data-filter="*">All</button>
		<button class="filters-button button-tech" data-filter=".tech">Tech</button>
	  <button class="filters-button button-personal" data-filter=".personal">Personal</button>
	</div>
</div>

<div class="articles-tiles-grid effect-6" id="tiles-grid">
	{%- for post in site.posts %}
		{%- if post.layout == "article" -%}
			<article class="article-tile col {{post.categories[1]}}">
				<a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">
					<p class="post-teaser">
						{%- if post.teaser %}
						<img src="{{ site.imagekiturl }}{{ site.images }}{{ site.teaser }}" data-src="{{ site.imagekiturl }}{{ site.images }}{{ post.teaser }}" alt="teaser">
						{%- else %}
						<img src="{{ site.imagekiturl }}{{ site.images }}{{ site.teaser }}" alt="teaser">
						{%- endif %}
					</p>
					{%- if post.date %}
						<p class="entry-date date published">
							<time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date: "%B %d, %Y" }}</time>
						</p>
					{%- endif %}
				<h2 class="post-title">{{ post.title }}</h2>
				<p class="post-excerpt">{{ post.excerpt | strip_html | strip | truncate: 160 }}</p></a>
			</article>
		{%- endif -%}
	{%- endfor %}
</div>
